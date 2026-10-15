import { memo } from "react";

// Cinco pontos do globo ligados às janelas reais da V7.
// SVG estático: nenhum canvas, WebGL, timer ou atualização por frame.
export const GLOBE_NODES = Object.freeze([
  { id: "infraestrutura", label: "INFRAESTRUTURA", detail: "Redes · AD / GPO", app: "metricas" },
  { id: "linux", label: "LINUX", detail: "Servidores · Docker", app: "tecnicos" },
  { id: "monitoramento", label: "MONITORAMENTO", detail: "Zabbix · Observabilidade", app: "metricas" },
  { id: "automacao", label: "AUTOMAÇÃO", detail: "Scripts · Integrações", app: "tecnicos" },
  { id: "sistemas", label: "SISTEMAS", detail: "Projetos · Soluções", app: "servicos" },
]);

const GlobeArt = memo(() => (
  <svg
    data-testid="globe-svg"
    className="globe-art"
    viewBox="0 0 600 460"
    role="img"
    aria-label="Representação ilustrativa de conectividade e infraestrutura em um globo digital"
    focusable="false"
  >
    <defs>
      <radialGradient id="globe-fill" cx="44%" cy="39%" r="65%">
        <stop offset="0" stopColor="#0c3d42" stopOpacity=".48"/>
        <stop offset=".72" stopColor="#0a232a" stopOpacity=".43"/>
        <stop offset="1" stopColor="#06111a" stopOpacity=".9"/>
      </radialGradient>
      <pattern id="globe-world-dots" patternUnits="userSpaceOnUse" width="6" height="6">
        <circle cx="2.8" cy="2.8" r="1" fill="#34d9ce" opacity=".75"/>
      </pattern>
      <clipPath id="globe-circle-clip"><circle cx="300" cy="222" r="155"/></clipPath>
    </defs>

    <g className="globe-orbit-back" fill="none" stroke="#10b981" strokeWidth=".9" opacity=".35">
      <ellipse cx="300" cy="222" rx="213" ry="70" transform="rotate(-21 300 222)" strokeDasharray="5 9" className="globe-orbit-track"/>
      <ellipse cx="300" cy="222" rx="211" ry="83" transform="rotate(33 300 222)" strokeDasharray="7 11" className="globe-orbit-track"/>
    </g>

    <circle cx="300" cy="222" r="158" fill="none" stroke="#10b981" strokeOpacity=".33" strokeWidth="1"/>
    <circle cx="300" cy="222" r="155" fill="url(#globe-fill)" stroke="#22d3ee" strokeOpacity=".67" strokeWidth="1.2"/>
    <g clipPath="url(#globe-circle-clip)">
      <g fill="none" stroke="#14b8a6" strokeOpacity=".27" strokeWidth=".75">
        <ellipse cx="300" cy="222" rx="26" ry="155"/>
        <ellipse cx="300" cy="222" rx="70" ry="155"/>
        <ellipse cx="300" cy="222" rx="114" ry="155"/>
        <path d="M145 222H455 M156 163Q300 201 444 163 M171 125Q300 170 429 125 M156 282Q300 244 444 282 M171 320Q300 275 429 320"/>
        <path d="M145 222C198 274 403 274 455 222 M145 222C199 170 403 170 455 222" strokeOpacity=".43"/>
      </g>
      <g fill="url(#globe-world-dots)" stroke="#2dd4bf" strokeOpacity=".22" strokeWidth=".8">
        <path d="M164 145L195 119 241 108 266 125 249 145 264 161 246 175 228 174 210 201 194 209 183 187 169 182 166 161Z"/>
        <path d="M220 193L247 198 260 220 255 236 241 230 230 213Z"/>
        <path d="M249 237L284 234 309 251 302 275 290 293 284 322 271 347 262 326 263 299 252 281 247 256Z"/>
        <path d="M289 148L309 143 322 151 333 145 349 153 352 171 336 176 323 167 309 178 293 168Z"/>
        <path d="M309 190L339 184 367 197 376 226 363 245 357 269 339 306 319 285 311 259 302 236Z"/>
        <path d="M348 142L380 112 419 128 446 150 451 176 429 185 419 207 394 200 382 219 361 208 369 182 351 171Z"/>
        <path d="M395 279L432 275 452 295 434 312 404 309 392 296Z"/>
        <path d="M356 263L365 270 363 285 356 287Z"/>
      </g>
      <path d="M190 170Q306 92 417 183 M228 318Q308 286 398 226 M236 192Q330 281 414 170" fill="none" stroke="#10b981" strokeWidth="1" strokeOpacity=".62" strokeDasharray="3 8"/>
      <g fill="#10b981" stroke="#a7f3d0" strokeWidth=".8">
        <circle cx="202" cy="171" r="3.5"/>
        <circle cx="412" cy="177" r="3.5"/>
        <circle cx="341" cy="278" r="3.5"/>
        <circle cx="265" cy="301" r="3.5"/>
        <circle cx="365" cy="199" r="3.5"/>
      </g>
    </g>
    <g className="globe-orbit-front" fill="none" stroke="#2dd4bf" strokeWidth="1" strokeOpacity=".53">
      <path className="globe-orbit-track" d="M112 286C176 385 430 401 500 224" strokeDasharray="8 10"/>
      <path d="M114 237C183 150 424 157 497 267" strokeDasharray="3 12" opacity=".5"/>
    </g>
    <g fill="#10b981" opacity=".65">
      <circle cx="184" cy="178" r="2"/>
      <circle cx="451" cy="274" r="2"/>
      <circle cx="272" cy="382" r="2"/>
    </g>

    <g className="globe-connectors" fill="none" stroke="#10b981" strokeWidth="1" strokeOpacity=".75">
      <path d="M120 125L175 125 205 172"/>
      <path d="M455 101L414 101 398 152"/>
      <path d="M468 234L432 234 410 205"/>
      <path d="M455 356L416 356 364 305"/>
      <path d="M131 302L182 302 253 317"/>
    </g>
    <text x="299" y="438" fontSize="10" fontFamily="monospace" fill="#64748b" textAnchor="middle" letterSpacing="2">
      L0 / INFRAESTRUTURA INTERCONECTADA
    </text>
  </svg>
));

export const GloboDigital = ({ onSelect }) => (
  <div data-testid="interactive-globe" className="globe-scene" aria-label="Navegação por áreas da infraestrutura">
    <GlobeArt />
    {GLOBE_NODES.map((node) => (
      <button
        key={node.id}
        type="button"
        data-testid={`globe-node-${node.id}`}
        className={`globe-node globe-node--${node.id}`}
        onClick={() => onSelect(node.app)}
        aria-label={`Abrir ${node.label}: ${node.detail}`}
        title={`${node.label} — ${node.detail}`}
      >
        <span className="globe-node__dot" aria-hidden="true"/>
        <span className="globe-node__copy">
          <span className="globe-node__label">{node.label}</span>
          <span className="globe-node__detail">{node.detail}</span>
        </span>
        <span className="globe-node__arrow" aria-hidden="true">↗</span>
      </button>
    ))}
  </div>
);
