"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type LoginResult = { error: string };

export async function login(formData: FormData): Promise<LoginResult> {
  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    return { error: "E-mail ou senha inválidos." };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    // Regra 7 da spec: mensagem genérica única, igual para e-mail
    // inexistente, senha errada ou e-mail não confirmado — não revela
    // qual foi a causa (previne enumeração de usuários).
    return { error: "E-mail ou senha inválidos." };
  }

  redirect("/dashboard");
}
