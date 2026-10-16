import { memo, useState } from "react";
import { Activity, Blocks, Code2, Network, Server, Users } from "lucide-react";

// Mapa conceitual do portfólio, não uma representação da rede interna real.
// Todos os atalhos usam IDs de janelas já existentes na V7.
export const MAP_NODES = Object.freeze([
  { id: "infraestrutura", label: "INFRAESTRUTURA", detail: "Redes · AD / GPO", app: "metricas" },
  { id: "linux", label: "LINUX", detail: "Servidores · Docker", app: "tecnicos" },
  { id: "monitoramento", label: "MONITORAMENTO", detail: "Zabbix · Observabilidade", app: "metricas" },
  { id: "automacao", label: "AUTOMAÇÃO", detail: "Python · Scripts", app: "tecnicos" },
  { id: "sistemas", label: "SISTEMAS", detail: "Projetos · Soluções", app: "servicos" },
  { id: "usuarios", label: "USUÁRIOS", detail: "Experiência · Suporte", app: "sobre" },
]);
const ICONS = {
  infraestrutura: Network,
  linux: Server,
  monitoramento: Activity,
  automacao: Code2,
  sistemas: Blocks,
  usuarios: Users,
};

const LINKS = [
  { id: "infraestrutura", d: "M248 143 H321 L367 235 H418" , end: [418,235] },
  { id: "linux", d: "M708 142 H663 L616 235 H573", end: [573,235] },
  { id: "monitoramento", d: "M804 314 H700 L640 336 H585", end: [585,336] },
  { id: "automacao", d: "M758 474 H700 L631 404 H591", end: [591,404] },
  { id: "sistemas", d: "M215 450 H270 L360 390 H421", end: [421,390] },
  { id: "usuarios", d: "M486 508 V460 L488 426", end: [488,426] },
];

const MapArt = memo(({ active }) => (
  <svg
    data-testid="infra-map-svg"
    className="infra-map-art"
    viewBox="0 0 960 610"
    role="img"
    aria-label="Mapa aberto ilustrativo de uma infraestrutura interconectada"
    focusable="false"
  >
    <defs>
      <linearGradient id="infra-map-surface" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stopColor="#082a30" stopOpacity=".7"/>
        <stop offset="1" stopColor="#061019" stopOpacity=".94"/>
      </linearGradient>
      <pattern id="infra-map-dot-grid" width="9" height="9" patternUnits="userSpaceOnUse">
        <circle cx="4.5" cy="4.5" r="1" fill="#2dd4bf" opacity=".55"/>
      </pattern>
      <pattern id="infra-map-grid" width="24" height="24" patternUnits="userSpaceOnUse">
        <path d="M24 0H0V24" fill="none" stroke="#0e6a68" strokeOpacity=".3" strokeWidth=".6"/>
      </pattern>
      <clipPath id="infra-map-fold-mask">
        <path d="M90 155 L348 175 L482 162 L613 176 L873 154 V464 L612 482 L481 461 L349 484 L90 467 Z"/>
      </clipPath>
    </defs>

    {/* Três folhas abertas em perspectiva discreta, sem WebGL ou Canvas. */}
    <g className="infra-map-fold">
      <path d="M90 155L348 175 349 484 90 467Z" fill="url(#infra-map-surface)" stroke="#0b9e99" strokeWidth="1.2"/>
      <path d="M348 175L482 162 613 176 612 482 481 461 349 484Z" fill="#071b24" stroke="#14b8a6" strokeWidth="1.3"/>
      <path d="M613 176L873 154V464L612 482Z" fill="url(#infra-map-surface)" stroke="#0b9e99" strokeWidth="1.2"/>
      <path d="M348 175L349 484 M613 176L612 482" stroke="#6ee7b7" strokeOpacity=".43" strokeWidth=".9" strokeDasharray="3 7"/>
      <g clipPath="url(#infra-map-fold-mask)">
        <rect x="85" y="145" width="800" height="350" fill="url(#infra-map-grid)"/>
        <g fill="url(#infra-map-dot-grid)" opacity=".4">
          <path d="M195 240L226 216 270 212 307 232 313 261 295 287 279 302 256 294 235 326 212 309 209 278 189 262Z"/>
          <path d="M278 312L311 325 331 346 325 375 304 396 305 428 291 453 274 431 270 394 256 366Z"/>
          <path d="M387 265L413 248 448 258 464 294 445 311 426 306 408 334 392 317Z"/>
          <path d="M442 328L473 331 493 361 485 394 473 416 460 399 451 371Z"/>
          <path d="M511 247L560 218 615 228 653 258 693 246 735 277 729 312 697 321 687 353 654 342 642 372 614 358 581 329 540 313 515 289Z"/>
          <path d="M671 377L724 379 746 400 729 420 694 425 674 411Z"/>
        </g>
        <g fill="none" stroke="#0f766e" strokeOpacity=".26">
          <path d="M98 230Q480 260 861 224 M98 340Q480 306 861 341 M95 438Q480 403 869 428"/>
          <path d="M210 150Q186 322 210 471 M470 166Q446 321 476 467 M744 154Q768 322 744 470"/>
        </g>
      </g>
      <g fill="none" stroke="#2dd4bf" strokeOpacity=".22" strokeWidth="1">
        <path d="M117 181H166 M117 181V211 M847 185H802 M847 185V216"/>
        <path d="M117 443H158 M117 443V416 M847 442H804 M847 442V420"/>
      </g>
    </g>

    {/* Nós e links revelam visualmente a área focada, sem representar tráfego real. */}
    {LINKS.map(link => (
      <g key={link.id} className="infra-map-link" data-link={link.id} data-active={active === link.id ? "true" : "false"}>
        <path className="infra-map-link__base" d={link.d} fill="none" strokeWidth="1.4"/>
        <path className="infra-map-link__flow" d={link.d} fill="none" strokeWidth="1.8" strokeDasharray="3 11"/>
        <circle cx={link.end[0]} cy={link.end[1]} r="4.2" className="infra-map-link__endpoint"/>
      </g>
    ))}

    <g className="infra-map-devices" fill="none" stroke="#2dd4bf" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <g transform="translate(463 270)">
        <rect x="-44" y="-30" width="88" height="76" rx="3" fill="#071721" stroke="#14b8a6"/>
        <rect x="-28" y="-16" width="56" height="16" rx="2"/>
        <rect x="-28" y="10" width="56" height="16" rx="2"/>
        <circle cx="19" cy="-8" r="2" fill="#10b981" stroke="none"/>
        <circle cx="19" cy="18" r="2" fill="#10b981" stroke="none"/>
        <path d="M-18 37H18 M0 46V54"/>
      </g>
      <g transform="translate(230 278)">
        <rect x="-17" y="-21" width="34" height="52" rx="2"/>
        <path d="M-9 -10H9 M-9 2H9 M-9 14H9"/>
        <circle cx="9" cy="23" r="2" fill="#10b981" stroke="none"/>
      </g>
      <g transform="translate(726 273)">
        <rect x="-21" y="-19" width="42" height="40" rx="2"/>
        <path d="M-14 10L-4 0 4 4 14 -10 M-13 15H15"/>
      </g>
      <g transform="translate(259 380)">
        <rect x="-22" y="-16" width="44" height="32" rx="2"/>
        <path d="M-11 -4L-3 4 8 -8 M-13 20H13"/>
      </g>
      <g transform="translate(724 397)">
        <circle r="15"/><circle r="6"/>
        <path d="M0 -22V-15 M0 15V22 M-22 0H-15 M15 0H22 M-16 -16L-11 -11 M11 11L16 16 M-16 16L-11 11 M11 -11L16 -16"/>
      </g>
      <g transform="translate(482 422)">
        <circle cy="-6" r="8"/><path d="M-16 15Q-15 2 0 2 15 2 16 15"/>
      </g>
    </g>

    <g fontFamily="monospace" fontSize="10" letterSpacing="1.3">
      <text x="105" y="177" fill="#5eead4">L0 / MAPA ABERTO</text>
      <text x="704" y="454" fill="#64748b">PORTFÓLIO / TI</text>
    </g>
  </svg>
));

const MapNode = ({ node, active, onFocus, onSelect }) => {
  const Icon = ICONS[node.id];
  return (
    <button
      type="button"
      data-testid={`infra-map-node-${node.id}`}
      className={`infra-map-node infra-map-node--${node.id}`}
      data-active={active ? "true" : "false"}
      onMouseEnter={() => onFocus(node.id)}
      onFocus={() => onFocus(node.id)}
      onClick={() => onSelect(node.app)}
      aria-label={`Explorar ${node.label}: ${node.detail}`}
      aria-pressed={active}
    >
      <Icon size={17} strokeWidth={1.5} aria-hidden="true"/>
      <span className="infra-map-node__text">
        <strong>{node.label}</strong>
        <small>{node.detail}</small>
      </span>
      <span className="infra-map-node__arrow" aria-hidden="true">↗</span>
    </button>
  );
};

export const MapaInfraestrutura = ({ onSelect }) => {
  const [active, setActive] = useState("infraestrutura");
  return (
    <section
      data-testid="interactive-infra-map"
      className="infra-map-scene"
      data-map-selected={active}
      aria-label="Explore o mapa de infraestrutura do portfólio"
    >
      <MapArt active={active}/>
      {MAP_NODES.map(node => (
        <MapNode key={node.id} node={node} active={active===node.id} onFocus={setActive} onSelect={onSelect}/>
      ))}
      <p className="infra-map-legend" aria-hidden="true">MAPA CONCEITUAL · PASSE O MOUSE OU SELECIONE UM MÓDULO</p>
    </section>
  );
};
