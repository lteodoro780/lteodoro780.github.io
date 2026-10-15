import { Copy, Github, Linkedin, Mail } from "lucide-react";
import { toast } from "sonner";
import { PROFILE } from "../../../content";

const Channels = () => {
  const copy = () => {
    if (!navigator.clipboard?.writeText) return toast.message(PROFILE.email);
    navigator.clipboard.writeText(PROFILE.email).then(
      () => toast.success("E-mail copiado"),
      () => toast.message(PROFILE.email)
    );
  };
  return (
    <div className="mt-6 grid gap-2 font-mono text-sm sm:grid-cols-3">
      <button type="button" data-testid="contact-copy-email" onClick={copy} className="flex min-w-0 items-center justify-between gap-2 border border-noc-line px-3 py-2.5 text-left text-slate-200 hover:border-noc-ok">
        <span className="flex min-w-0 items-center gap-2"><Mail size={14} className="shrink-0 text-emerald-400"/><span className="truncate">{PROFILE.email}</span></span><Copy size={13} className="shrink-0 text-slate-400"/>
      </button>
      <a data-testid="contact-github" href={`https://${PROFILE.github}`} target="_blank" rel="noopener noreferrer" className="flex min-w-0 items-center gap-2 border border-noc-line px-3 py-2.5 text-slate-200 hover:border-noc-ok"><Github size={14} className="shrink-0 text-emerald-400"/><span className="truncate">{PROFILE.github}</span></a>
      <a data-testid="contact-linkedin" href={`https://${PROFILE.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex min-w-0 items-center gap-2 border border-noc-line px-3 py-2.5 text-slate-200 hover:border-noc-ok"><Linkedin size={14} className="shrink-0 text-emerald-400"/><span className="truncate">{PROFILE.linkedin}</span></a>
    </div>
  );
};

export const TicketApp = () => (
  <div data-testid="app-ticket">
    <p className="mb-5 font-mono text-sm leading-relaxed text-slate-300">
      Contato profissional direto. Este site não registra tickets nem envia mensagens automaticamente. Escolha um canal abaixo e confirme o envio no seu aplicativo de e-mail.
    </p>
    <div className="grid gap-3 sm:grid-cols-2">
      <a data-testid="contact-send-email" href={`mailto:${PROFILE.email}?subject=Contato%20via%20L0-NOC`} className="inline-flex items-center justify-center border border-noc-ok bg-noc-ok px-4 py-3 font-mono text-sm font-semibold text-noc-bg hover:bg-emerald-300">Escrever e-mail →</a>
      <a data-testid="contact-cv" href={`${process.env.PUBLIC_URL}/curriculo.html`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center border border-noc-line2 px-4 py-3 font-mono text-sm text-slate-100 hover:border-noc-ok">Ver currículo →</a>
    </div>
    <Channels />
  </div>
);
