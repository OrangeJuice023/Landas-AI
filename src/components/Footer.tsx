import { useState } from "react";
import { Mail, Check } from "lucide-react";

export function Footer() {
  const [copied, setCopied] = useState(false);
  const email = "gervicorado@yahoo.com";

  const handleContact = () => {
    navigator.clipboard?.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => { /* clipboard unavailable, ignore */ });
    // Also attempt to open a mail client for those who have one
    window.open(`mailto:${email}?subject=Landas AI — Feedback`, "_blank");
  };

  return (
    <footer className="relative max-w-5xl mx-auto px-6 pb-12 pt-8">
      <div className="bg-white border border-gray-100 rounded-3xl p-8 md:p-10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h3 className="text-lg font-bold tracking-tight">Landas AI</h3>
          <p className="text-sm text-gray-500 mt-1 max-w-md">
            A Philippine labor market intelligence platform. Built as a personal project by Gervi Paulo Corado.
          </p>
          <p className="text-xs text-gray-400 mt-3">
            Still in active development — feedback and suggestions welcome.
          </p>
        </div>
        <div className="shrink-0 flex flex-col items-start md:items-end gap-2">
          <button
            onClick={handleContact}
            className="inline-flex items-center gap-2 px-5 py-3 bg-black text-white rounded-2xl font-bold text-sm hover:scale-[0.98] active:scale-95 transition-all"
          >
            {copied ? <><Check size={16} /> Email copied!</> : <><Mail size={16} /> Get in touch</>}
          </button>
          <span className="text-xs text-gray-400 font-medium select-all">{email}</span>
        </div>
      </div>
      <p className="text-center text-xs text-gray-300 mt-6">
        © {new Date().getFullYear()} Gervi Paulo Corado · Data grounded in PSA Labor Force Survey
      </p>
    </footer>
  );
}
