"use server";

import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";

export type SignupResult = { ok: boolean; message: string };

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NEUTRAL_MESSAGE =
  "Enviamos um link de confirmação para o e-mail informado.";

// Regra 11: tetos de tamanho antes de qualquer processamento pesado ou
// chamada ao Supabase — a Server Action é alcançável por POST direto, não
// só pela UI, então o input real não é limitado pelo que o browser permite.
const EMAIL_MAX_LENGTH = 254; // limite prático da RFC 5321
const PASSWORD_MAX_LENGTH = 72; // limite efetivo do bcrypt (trunca além disso)

// Regra 12: caracteres de controle (\x00-\x1F, \x7F) e caracteres
// invisíveis/de formatação Unicode — zero-width space/non-joiner/joiner
// (U+200B-U+200D) e overrides bidirecionais (U+202A-U+202E, U+2066-U+2069)
// — vetor conhecido de spoofing visual de nome. Não é proteção contra XSS
// (o React já escapa na renderização); é higiene de integridade do dado.
const UNSAFE_NAME_CHARS_REGEX =
  /[\u0000-\u001F\u007F\u200B-\u200D\u202A-\u202E\u2066-\u2069]/g;

export async function signup(formData: FormData): Promise<SignupResult> {
  const rawFullName = formData.get("full_name");
  const rawEmail = formData.get("email");
  const rawPassword = formData.get("password");

  if (
    typeof rawFullName !== "string" ||
    typeof rawEmail !== "string" ||
    typeof rawPassword !== "string"
  ) {
    return { ok: false, message: "Preencha todos os campos." };
  }

  const full_name = rawFullName
    .trim()
    .replace(UNSAFE_NAME_CHARS_REGEX, "");
  const email = rawEmail.trim();
  const password = rawPassword;

  if (full_name.length === 0) {
    return { ok: false, message: "Informe seu nome completo." };
  }
  if (full_name.length > 100) {
    return {
      ok: false,
      message: "O nome completo deve ter no máximo 100 caracteres.",
    };
  }
  if (email.length > EMAIL_MAX_LENGTH) {
    // Mesma mensagem genérica de e-mail inválido — não revela "muito
    // longo" para não dar dica de limite a quem está testando o formulário.
    return { ok: false, message: "Informe um e-mail válido." };
  }
  if (!EMAIL_REGEX.test(email)) {
    return { ok: false, message: "Informe um e-mail válido." };
  }
  if (password.length < 8) {
    return {
      ok: false,
      message: "A senha deve ter ao menos 8 caracteres.",
    };
  }
  if (password.length > PASSWORD_MAX_LENGTH) {
    return {
      ok: false,
      message: "A senha deve ter no máximo 72 caracteres.",
    };
  }

  const supabase = await createClient();

  const headersList = await headers();
  const origin =
    headersList.get("origin") ?? `http://${headersList.get("host")}`;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name },
      emailRedirectTo: `${origin}/auth/confirm`,
    },
  });

  if (error) {
    if (error.status === 429) {
      return {
        ok: false,
        message: "Muitas tentativas. Tente novamente em instantes.",
      };
    }
    // Não vaze o erro técnico cru. Também não tente distinguir "e-mail já
    // cadastrado" aqui: com confirmação de e-mail habilitada, o Supabase
    // já não retorna erro nesse caso (ver Regra 8) — só chegamos neste
    // bloco para falhas genuínas (infra, validação que escapou, etc.).
    return {
      ok: false,
      message: "Não foi possível concluir o cadastro. Tente novamente.",
    };
  }

  // Regras 8 e 9: sucesso e "e-mail já existente" são indistinguíveis por
  // design do próprio Supabase quando a confirmação de e-mail está
  // habilitada — os dois casos chegam aqui com error === null, então a
  // resposta observável já é idêntica sem nenhuma lógica extra nossa.
  return { ok: true, message: NEUTRAL_MESSAGE };
}
