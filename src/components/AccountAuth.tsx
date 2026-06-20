import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { LogIn, LogOut, Mail, X, Loader2, CheckCircle2 } from "lucide-react";
import type { User } from "@supabase/supabase-js";

export function AccountButton() {
  const [user, setUser] = useState<User | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const isSignedIn = !!user && !user.is_anonymous;

  const signOut = async () => {
    await supabase.auth.signOut();
    await supabase.auth.signInAnonymously();
  };

  if (isSignedIn) {
    return (
      <div className="flex items-center gap-2">
        <span className="hidden sm:block text-xs font-bold text-gray-500 max-w-[140px] truncate">
          {user.email}
        </span>
        <button
          onClick={signOut}
          className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border border-gray-100 bg-white/50 text-gray-500 hover:text-black hover:bg-black/5 transition-all"
        >
          <LogOut size={13} /> Sign out
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="flex items-center gap-1.5 text-xs font-bold px-4 py-1.5 rounded-full bg-black text-white shadow-md hover:scale-[0.98] active:scale-95 transition-all"
      >
        <LogIn size={13} /> Sign in
      </button>
      {modalOpen && <AuthModal onClose={() => setModalOpen(false)} />}
    </>
  );
}

function AuthModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const oauthSignIn = async (provider: "google" | "github") => {
    setErrorMsg(null);
    const { data: { user } } = await supabase.auth.getUser();
    const options = { redirectTo: window.location.origin };

    if (user?.is_anonymous) {
      const { error } = await supabase.auth.linkIdentity({ provider, options });
      if (error) {
        if (/already/i.test(error.message)) {
          const { error: e2 } = await supabase.auth.signInWithOAuth({ provider, options });
          if (e2) setErrorMsg(e2.message);
        } else {
          setErrorMsg(error.message);
        }
      }
    } else {
      const { error } = await supabase.auth.signInWithOAuth({ provider, options });
      if (error) setErrorMsg(error.message);
    }
  };

  const emailSignIn = async () => {
    const addr = email.trim();
    if (!addr) return;
    setStatus("sending");
    setErrorMsg(null);

    const { data: { user } } = await supabase.auth.getUser();

    if (user?.is_anonymous) {
      const { error } = await supabase.auth.updateUser({ email: addr });
      if (error) {
        if (/already/i.test(error.message)) {
          const { error: e2 } = await supabase.auth.signInWithOtp({
            email: addr,
            options: { emailRedirectTo: window.location.origin },
          });
          if (e2) { setErrorMsg(e2.message); setStatus("idle"); return; }
        } else {
          setErrorMsg(error.message); setStatus("idle"); return;
        }
      }
    } else {
      const { error } = await supabase.auth.signInWithOtp({
        email: addr,
        options: { emailRedirectTo: window.location.origin },
      });
      if (error) { setErrorMsg(error.message); setStatus("idle"); return; }
    }
    setStatus("sent");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-sm bg-white rounded-[28px] shadow-2xl p-8">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-gray-300 hover:text-black transition-colors">
          <X size={18} />
        </button>

        {status === "sent" ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 mx-auto mb-5 bg-green-50 text-green-500 flex items-center justify-center rounded-2xl">
              <CheckCircle2 size={26} />
            </div>
            <h3 className="text-xl font-bold mb-2">Check your email</h3>
            <p className="text-sm text-gray-500">
              We sent a link to <span className="font-bold">{email}</span>. Click it to finish signing in.
            </p>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-bold mb-1">Save your progress</h3>
            <p className="text-sm text-gray-500 mb-6">
              Sign in to keep your saved paths across devices and unlock a higher daily analysis limit. Your current saved paths come with you.
            </p>

            <button
              onClick={() => oauthSignIn("google")}
              className="w-full py-3.5 bg-black text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:scale-[0.98] active:scale-95 transition-all mb-3"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81z" />
              </svg>
              Continue with Google
            </button>

            <button
              onClick={() => oauthSignIn("github")}
              className="w-full py-3.5 bg-white border border-gray-200 text-gray-800 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:border-black transition-all mb-4"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.34.85 0 1.7.12 2.5.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z" />
              </svg>
              Continue with GitHub
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="h-px flex-1 bg-gray-100" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-300">or</span>
              <div className="h-px flex-1 bg-gray-100" />
            </div>

            <div className="space-y-3">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && emailSignIn()}
                placeholder="you@email.com"
                type="email"
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 text-sm outline-none focus:border-gray-300 transition-all"
              />
              <button
                onClick={emailSignIn}
                disabled={status === "sending" || !email.trim()}
                className="w-full py-3.5 bg-white border border-gray-200 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:border-black transition-all disabled:opacity-50"
              >
                {status === "sending" ? (
                  <span className="flex items-center gap-2"><Loader2 size={15} className="animate-spin" /> Sending link...</span>
                ) : (
                  <span className="flex items-center gap-2"><Mail size={15} /> Email me a magic link</span>
                )}
              </button>
            </div>

            {errorMsg ? <p className="mt-4 text-xs text-amber-600 text-center font-medium">{errorMsg}</p> : null}
          </>
        )}
      </div>
    </div>
  );
}
