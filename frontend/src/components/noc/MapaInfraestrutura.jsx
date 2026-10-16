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
  { id: "infraestrutura", d: "M222 125H271L317 250", end: [317, 250] },
  { id: "linux", d: "M733 125H691L653 251", end: [653, 251] },
  { id: "monitoramento", d: "M764 323H748L704 353", end: [704, 353] },
  { id: "automacao", d: "M754 483H738L705 432", end: [705, 432] },
  { id: "sistemas", d: "M213 481H261L304 407", end: [304, 407] },
  { id: "usuarios", d: "M488 549V490L488 462", end: [488, 462] },
];

const IconServer = ({ x, y, scale = 1 }) => (
  <g transform={"translate(" + x + " " + y + ") scale(" + scale + ")"} fill="none" stroke="#43d6d0" strokeWidth="1.5" strokeLinejoin="round">
    <rect x="-26" y="-34" width="52" height="68" rx="3" fill="#08232a" />
    {[-20, 1, 21].map((oy, i) => (
      <g key={oy}>
        <rect x="-19" y={oy} width="38" height="14" rx="1.5" fill="#06171f" />
        <path d={"M-12 " + (oy+5) + "H4"} opacity=".6"/>
        <circle cx="12" cy={oy+7} r="2.2" fill={i===1?"#67e8f9":"#10b981"} stroke="none"/>
      </g>
    ))}
  </g>
);

const MapArt = memo(({ active }) => (
  <svg data-testid="infra-map-svg" className="infra-map-art" viewBox="0 0 960 610"
    role="img" focusable="false"
    aria-label="Mapa conceitual aberto com núcleo central de servidores, firewall, Linux, monitoramento, automação, projetos e usuários">
    <defs>
      <linearGradient id="infra-panel-gradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#07313a" stopOpacity=".66"/>
        <stop offset="1" stopColor="#04151d" stopOpacity=".96"/>
      </linearGradient>
      <radialGradient id="infra-hub-ambient">
        <stop offset="0" stopColor="#10b981" stopOpacity=".26"/>
        <stop offset=".65" stopColor="#0a555e" stopOpacity=".08"/>
        <stop offset="1" stopColor="#0a555e" stopOpacity="0"/>
      </radialGradient>
      <pattern id="infra-dot-field" width="8" height="8" patternUnits="userSpaceOnUse">
        <circle cx="3" cy="3" r="1.1" fill="#22d3ee" opacity=".64"/>
      </pattern>
      <pattern id="infra-fine-grid" width="24" height="24" patternUnits="userSpaceOnUse">
        <path d="M24 0H0V24" fill="none" stroke="#10b981" strokeWidth=".55" opacity=".23"/>
      </pattern>
      <clipPath id="infra-map-inside">
        <path d="M130 171 L372 194 L480 169 L598 194 L850 171 V489 L598 467 L480 492 L373 468 L130 488Z"/>
      </clipPath>
    </defs>

    <ellipse cx="485" cy="337" rx="270" ry="210" fill="url(#infra-hub-ambient)" opacity=".8"/>
    <g data-testid="infra-map-open-panels" className="infra-map-fold">
      <path d="M130 171L372 194 373 468 130 488Z" fill="url(#infra-panel-gradient)" stroke="#1bc6be" strokeWidth="1.4"/>
      <path d="M372 194L480 169 598 194 598 467 480 492 373 468Z" fill="#061e27" stroke="#40d9d0" strokeWidth="1.5"/>
      <path d="M598 194L850 171V489L598 467Z" fill="url(#infra-panel-gradient)" stroke="#1bc6be" strokeWidth="1.4"/>
      <g clipPath="url(#infra-map-inside)">
        <rect x="130" y="169" width="720" height="324" fill="url(#infra-fine-grid)" opacity=".9"/>
        <g fill="url(#infra-dot-field)" stroke="none" opacity=".44">
          <path d="M187 276L216 254 249 244 275 251 299 275 294 294 269 301 256 325 238 322 212 348 197 327 198 303 183 293Z"/>
          <path d="M266 339L286 345 310 367 307 399 287 421 291 452 277 463 265 432 256 399Z"/>
          <path d="M359 242L392 227 413 237 425 262 405 276 390 263 378 283 360 266Z"/>
          <path d="M401 278L434 293 446 320 440 354 425 389 405 370 400 337Z"/>
          <path d="M515 239L559 224 612 235 641 259 680 259 720 286 706 311 678 313 664 333 638 327 622 350 590 332 563 305 521 286Z"/>
          <path d="M664 373L707 371 739 394 721 418 676 414 657 396Z"/>
        </g>
        <g stroke="#30c6c6" opacity=".17" fill="none" strokeWidth=".75">
          <path d="M130 265Q480 288 850 249 M130 365Q480 335 850 365 M130 446Q480 417 850 443"/>
          <path d="M259 179Q247 336 259 477 M475 178V488 M724 178Q738 333 724 474"/>
        </g>
      </g>
      <path d="M372 194L373 468 M598 194V467" stroke="#5eead4" strokeWidth="1" strokeOpacity=".45" strokeDasharray="3 7"/>
      <g stroke="#22d3ee" strokeWidth="1" fill="none" opacity=".65">
        <path d="M147 188H181 M147 188V216 M829 188H798 M829 188V213"/>
        <path d="M147 472H177 M147 472V449 M829 475H798 M829 475V452"/>
      </g>
    </g>

    <g data-testid="infra-map-core" className="infra-map-core" strokeLinecap="round" strokeLinejoin="round">
      {/* Core hub e anéis sob o servidor central */}
      <ellipse cx="486" cy="384" rx="121" ry="46" fill="none" stroke="#0e777d" strokeWidth="1.5"/>
      <ellipse cx="486" cy="384" rx="102" ry="36" fill="none" stroke="#22d3ee" strokeWidth="1.8" strokeOpacity=".75"/>
      <ellipse cx="486" cy="384" rx="72" ry="23" fill="#06404a" fillOpacity=".24" stroke="#10b981" strokeOpacity=".6"/>
      <path d="M365 384H346 M607 384H627 M486 336V320 M486 434V449" stroke="#2dd4bf" strokeWidth="1.3" opacity=".67"/>
      {[[365,384],[607,384],[486,426]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="3" fill="#22d3ee"/>)}
      {/* Empilhamento isométrico, totalmente vetorial */}
      <g transform="translate(450 273)">
        <path d="M0 12L39 0 77 11 38 24Z" fill="#0b4450" stroke="#6ee7b7" strokeWidth="1.5"/>
        <path d="M0 12L38 24V125L0 111Z" fill="#092b34" stroke="#22d3ee" strokeWidth="1.5"/>
        <path d="M38 24L77 11V110L38 125Z" fill="#041820" stroke="#34d399" strokeWidth="1.3"/>
        {[35,60,85].map((n,i)=>(
          <g key={n}>
            <path d={"M7 "+n+"L30 "+(n+7)+"V"+(n+22)+"L7 "+(n+15)+"Z"} fill="#06171f" stroke="#5eead4" strokeWidth="1.1"/>
            <path d={"M44 "+(n+5)+"L69 "+(n-2)} fill="none" stroke="#1d7c80" strokeWidth="1"/>
            <circle cx="24" cy={n+14} r="1.6" fill={i===1?"#67e8f9":"#10b981"}/>
          </g>
        ))}
      </g>
      <text x="485" y="253" textAnchor="middle" fontSize="10" fontFamily="monospace" letterSpacing="2" fill="#5eead4">CORE / SERVIÇOS</text>
    </g>

    {/* Ícones operacionais, ligados ao núcleo e aos módulos de navegação. */}
    <g className="infra-map-devices" data-testid="infra-map-devices" fill="none" stroke="#32d7d1" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round">
      <g transform="translate(319 267)">
        <IconServer x={0} y={0} scale={.73}/>
        <path d="M-43 21L-28 -1 -20 21Z" fill="#07323a" stroke="#10b981"/>
        <path d="M-33 9L-28 15 -22 7" stroke="#67e8f9"/>
      </g>
      <g transform="translate(649 268)">
        <IconServer x={0} y={0} scale={.9}/>
        <path d="M42 -13Q54 -27 66 -12 Q80 -10 77 2 H40 Q30 -5 42 -13Z" fill="#06282e" stroke="#22d3ee"/>
      </g>
      <g transform="translate(705 352)">
        <rect x="-33" y="-24" width="66" height="48" rx="2" fill="#061922"/>
        <path d="M-22 10L-11 1 -3 7 9 -13 23 -3 M-14 29H14 M0 23V29" stroke="#67e8f9" strokeWidth="1.5"/>
        <path d="M-26 -15H-15" opacity=".55"/>
      </g>
      <g transform="translate(704 431)">
        <circle r="15" fill="#06242b"/>
        <circle r="6"/>
        <path d="M0 -23V-16 M0 16V23 M-23 0H-16 M16 0H23 M-16 -16L-11 -11 M11 11L16 16 M-16 16L-11 11 M11 -11L16 -16"/>
      </g>
      <g transform="translate(302 401)">
        <rect x="-35" y="-24" width="64" height="46" rx="2" fill="#061923"/>
        <path d="M-23 -8L-12 5 -1 -9 M-21 28H19 M-2 22V28"/>
      </g>
      <g transform="translate(486 464)">
        <circle cy="-12" r="9" fill="#06232d"/>
        <path d="M-18 12Q-18 -1 0 -1 Q18 -1 18 12" />
        <path d="M-29 5L-37 13 M29 5L37 13" opacity=".5"/>
      </g>
      {/* Conexões sutis sempre presentes entre os equipamentos */}
      <g stroke="#2dd4bf" strokeOpacity=".46" strokeWidth="1" strokeDasharray="3 5">
        <path d="M341 291L405 341 M630 291L558 345 M668 352H614 M672 418L604 397 M336 403L383 392 M485 442V434"/>
      </g>
    </g>

    {LINKS.map(link=>(
      <g key={link.id} className="infra-map-link" data-link={link.id} data-active={active===link.id?"true":"false"}>
        <path className="infra-map-link__base" d={link.d} fill="none" strokeWidth="1.3"/>
        <path className="infra-map-link__flow" d={link.d} fill="none" strokeWidth="1.5" strokeDasharray="3 11"/>
        <circle cx={link.end[0]} cy={link.end[1]} r="3.9" className="infra-map-link__endpoint"/>
      </g>
    ))}

    {/* Símbolo de internet acima do mapa aberto: totalmente ilustrativo. */}
    <g transform="translate(486 146)" fill="none" stroke="#5eead4" strokeWidth="2" strokeLinejoin="round">
      <path d="M-32 8Q-36 -10 -18 -15Q-13 -41 10 -35Q30 -33 33 -11Q51 -9 50 10Q47 24 30 24H-26Q-43 22 -42 7Q-41 -2 -32 8Z" fill="#08303a" />
      <path d="M-7 -4V15 M-13 2L-7 -4L-1 2 M9 15V-4 M3 10L9 16L15 10" strokeWidth="1.5"/>
      <path d="M0 27V59" stroke="#10b981" strokeDasharray="4 7" strokeWidth="1"/>
      <circle cx="0" cy="59" r="3" fill="#10b981" stroke="none"/>
      <text x="0" y="41" fontFamily="monospace" textAnchor="middle" fontSize="8" stroke="none" fill="#b6f6eb" letterSpacing="1">INTERNET</text>
    </g>

    <g fontFamily="monospace" fontSize="9" letterSpacing="1.5" fill="#6ee7b7" opacity=".7">
      <text x="146" y="192">L0 / INFRASTRUCTURE</text>
      <text x="708" y="474">PORTFÓLIO / TI</text>
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
