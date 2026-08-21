import type { EmailOtpType } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

const VALID_EMAIL_OTP_TYPES: EmailOtpType[] = [
  "email",
  "recovery",
  "invite",
  "email_change",
];

function isEmailOtpType(value: string | null): value is EmailOtpType {
  return value !== null && (VALID_EMAIL_OTP_TYPES as string[]).includes(value);
}

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type");

  if (token_hash && isEmailOtpType(type)) {
    const supabase = await createClient();

    const { error } = await supabase.auth.verifyOtp({ token_hash, type });

    // Garantia "tudo ou nada": só seguimos para o dashboard se verifyOtp
    // teve sucesso completo. Em qualquer erro — token ausente, inválido,
    // expirado, OU já usado (link de confirmação clicado uma segunda vez:
    // o Supabase invalida o token no primeiro uso e retorna erro aqui,
    // nunca sucesso silencioso) — nenhuma sessão é escrita em cookies, e
    // caímos direto para o redirect de erro abaixo.
    if (!error) {
      // TODO: em produção atrás de proxy (Vercel), `origin` (derivado de
      // request.nextUrl/request.url) pode não refletir o host público real
      // sem configuração adicional — considerar x-forwarded-host ou a URL
      // pública fixa do deploy se isso vier a ser um problema.
      return NextResponse.redirect(new URL("/dashboard", origin));
    }
  }

  return NextResponse.redirect(new URL("/auth/auth-code-error", origin));
}
