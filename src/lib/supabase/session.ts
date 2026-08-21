import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

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

  if (!user && request.nextUrl.pathname.startsWith("/dashboard")) {
    // TODO(Fase C): preservar a rota de destino (ex.: ?redirect=/dashboard/x)
    // para retornar o usuário a ela depois do login, quando a tela existir.
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // IMPORTANTE: retorne supabaseResponse como está. Criar uma NextResponse
  // nova aqui sem copiar os cookies já setados acima dessincroniza
  // browser e servidor e encerra a sessão do usuário prematuramente.
  return supabaseResponse;
}
