import { useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { GALLERY_PHOTOS, PHOTO_GROUPS } from "../../../content/galleryPhotos";

const asset = (src) => `${process.env.PUBLIC_URL}${src}`;

export const GaleriaApp = () => {
  const [filter, setFilter] = useState("Tudo");
  const photos = filter === "Tudo" ? GALLERY_PHOTOS : GALLERY_PHOTOS.filter((photo) => photo.group === filter);
  const [selected, setSelected] = useState(0);
  const active = photos[Math.min(selected, photos.length - 1)];
  const go = (direction) => setSelected((current) => (current + direction + photos.length) % photos.length);


  return (
    <section data-testid="app-galeria" tabIndex={0} aria-label="Bastidores técnicos e fotos reais" onKeyDown={(e) => { if (e.key === "ArrowLeft" || e.key === "ArrowRight") { e.preventDefault(); go(e.key === "ArrowLeft" ? -1 : 1); } }}>
      <p className="mb-3 font-mono text-xs leading-relaxed text-slate-300">
        Registros reais de hardware ARM, laboratório Linux e testes técnicos. Imagens selecionadas e tratadas para divulgação pública.
      </p>
      <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="Filtrar fotografias">
        {PHOTO_GROUPS.map((group) => (
          <button key={group} type="button" aria-pressed={filter === group} onClick={() => { setFilter(group); setSelected(0); }}
            className={`border px-3 py-2 font-mono text-[11px] uppercase tracking-wider transition-colors ${filter === group ? "border-noc-ok bg-noc-ok text-noc-bg" : "border-noc-line text-slate-200 hover:border-noc-ok"}`}>
            {group}
          </button>
        ))}
      </div>
      <figure className="m-0">
        <div className="relative flex aspect-[16/10] max-h-[60vh] items-center justify-center overflow-hidden border border-noc-line bg-noc-panel/80">
          <img key={active.id} src={asset(active.src)} alt={active.alt} data-testid="gallery-active-photo"
            className="h-full w-full object-contain" decoding="async" fetchPriority="high" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-noc-bg/60 via-transparent to-transparent" />
          <button data-testid="gallery-prev" aria-label="Foto anterior" type="button" onClick={() => go(-1)}
            className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center border border-noc-line2 bg-noc-bg/85 text-slate-100 transition-colors hover:border-noc-ok hover:text-emerald-400"><ChevronLeft size={20} /></button>
          <button data-testid="gallery-next" aria-label="Próxima foto" type="button" onClick={() => go(1)}
            className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center border border-noc-line2 bg-noc-bg/85 text-slate-100 transition-colors hover:border-noc-ok hover:text-emerald-400"><ChevronRight size={20} /></button>
        </div>
        <figcaption className="mt-3 flex items-start justify-between gap-3 font-mono text-xs text-slate-300" aria-live="polite">
          <span data-testid="gallery-caption"><strong className="mb-1 block text-sm text-slate-50">{active.title}</strong>{active.caption}</span>
          <span className="shrink-0 tabular-nums text-emerald-400">{Math.min(selected + 1, photos.length)}/{photos.length}</span>
        </figcaption>
      </figure>
      <div className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-5" aria-label="Escolher fotografia">
        {photos.map((photo, index) => (
          <button key={photo.id} type="button" data-testid={`gallery-thumb-${index}`} aria-label={`Mostrar: ${photo.title}`} aria-current={index === selected ? "true" : undefined}
            onClick={() => setSelected(index)} className={`aspect-[4/3] overflow-hidden border transition-[border-color,opacity] duration-200 ${index === selected ? "border-noc-ok" : "border-noc-line opacity-65 hover:border-noc-ok hover:opacity-100"}`}>
            <img src={asset(photo.thumb)} loading="lazy" decoding="async" alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
      <a href={`${process.env.PUBLIC_URL}/bastidores.html`} className="mt-5 inline-flex items-center gap-2 border border-noc-ok px-4 py-3 font-mono text-xs text-emerald-400 hover:bg-noc-ok hover:text-noc-bg">
        VER GALERIA COMPLETA <ExternalLink size={14} />
      </a>
    </section>
  );
};
