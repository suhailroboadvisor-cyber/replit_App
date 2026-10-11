import "server-only";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getAuthEnv } from "../../env/auth";
export async function serverAuth() {
  const env = getAuthEnv();
  const store = await cookies();
  return createServerClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      getAll: () => store.getAll(),
      setAll(values) {
        // Server Components cannot write cookies; the private proxy refreshes.
        for (const {name, value, options} of values) {
          try { store.set(name, value, options); } catch (error) {
            if (!(error instanceof Error) || !error.message.includes("Cookies can only be modified")) throw error;
          }
        }
      },
    },
  });
}
