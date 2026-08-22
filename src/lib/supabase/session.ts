import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Postura SECURE-BY-DEFAULT: toda rota é PROTEGIDA, a menos que esteja
// explicitamente nesta allowlist. Uma rota nova (ex.: /financeiro,
// /imoveis) fica protegida automaticamente, sem exigir que alguém lembre
// de adicionar uma checagem — o oposto de "proteger só /dashboard por
// nome", que deixava tudo mais público por omissão.
const PUBLIC_ROUTES = ["/", "/login", "/signup"];

function isPublicRoute(pathname: string): boolean {
  if (PUBLIC_ROUTES.includes(pathname)) return true;
  // /auth/* cobre o callback de confirmação de e-mail (/auth/confirm) e a
  // página de erro (/auth/auth-code-error) — precisam ser acessíveis sem
  // sessão: é o próprio fluxo que estabelece a sessão ou informa a falha.
  if (pathname.startsWith("/auth/")) return true;
  return false;
}

// Se o usuário JÁ tem sessão, essas rotas não fazem sentido para ele —
// redireciona pro dashboard em vez de mostrar login/cadastro de novo.
const AUTH_ONLY_ROUTES = ["/login", "/signup"];

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Não execute nenhuma lógica entre createServerClient e getUser() —
  // um desvio aqui pode deslogar usuários aleatoriamente sem erro visível.
  // getUser() (não getSession()) força a validação do token contra o
  // servidor de Auth, é o que de fato renova a sessão nesta camada.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  if (!user && !isPublicRoute(pathname)) {
    // TODO(Fase C): preservar a rota de destino (ex.: ?redirect=/financeiro)
    // para retornar o usuário a ela depois do login, quando fizer sentido.
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (user && AUTH_ONLY_ROUTES.includes(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  // IMPORTANTE: retorne supabaseResponse como está. Criar uma NextResponse
  // nova aqui sem copiar os cookies já setados acima dessincroniza
  // browser e servidor e encerra a sessão do usuário prematuramente.
  return supabaseResponse;
}
