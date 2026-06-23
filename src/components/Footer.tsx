import { Mail, Github } from "lucide-react";

export function Footer() {
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
        
          href="mailto:gervicorado@yahoo.com?subject=Landas AI — Feedback"
          className="shrink-0 inline-flex items-center gap-2 px-5 py-3 bg-black text-white rounded-2xl font-bold text-sm hover:scale-[0.98] active:scale-95 transition-all"
        >
          <Mail size={16} /> Get in touch
        </a>
      </div>
      <p className="text-center text-xs text-gray-300 mt-6">
        © {new Date().getFullYear()} Gervi Paulo Corado · Data grounded in PSA Labor Force Survey
      </p>
    </footer>
  );
}
