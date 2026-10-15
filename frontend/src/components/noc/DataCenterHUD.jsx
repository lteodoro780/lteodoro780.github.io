// Cartões descritivos: sem telemetria, disponibilidade ou contadores fictícios.
// Visual inspirado em interfaces NOC, baseado apenas nas áreas de atuação do portfólio.
const GROUPS = [
  {
    title: "APLICAÇÕES",
    items: ["Python / Django", "Docker / containers", "Projetos web"],
  },
  {
    title: "SERVIÇOS",
    items: ["Active Directory", "DNS / DHCP", "GLPI / inventário"],
  },
  {
    title: "INFRAESTRUTURA",
    items: ["Linux / Windows", "Redes / virtualização", "Monitoramento"],
  },
  {
    title: "AUTOMAÇÃO",
    items: ["PowerShell", "Python / Bash", "IA local"],
  },
];

const TOPICS = [
  { title: "OBSERVABILIDADE", glyph: "⌁", words: ["Zabbix", "GLPI", "OCS Inventory"] },
  { title: "SISTEMAS", glyph: "▤", words: ["Linux", "Windows Server", "Docker"] },
  { title: "SEGURANÇA", glyph: "◇", words: ["GPO", "Hardening", "Revisão de código"] },
  { title: "LABORATÓRIOS", glyph: "▦", words: ["HERMES", "TLuizLabs", "Infra TI Labs"] },
];

export const DataCenterHUD = () => (
  <div data-testid="v8-datacenter-hud" aria-hidden="true" className="v8-hud-stage pointer-events-none absolute inset-0 hidden xl:block">
    <div className="v8-hud-left">
      {GROUPS.map((group, i) => (
        <div key={group.title} className="v8-hud-section">
          <div className="v8-hud-section-title">
            <span className="v8-hud-index">{String(i + 1).padStart(2, "0")}</span>
            <strong>{group.title}</strong>
          </div>
          <div className="v8-hud-list">{group.items.map(item => <span key={item}>{item}</span>)}</div>
        </div>
      ))}
    </div>
    <div className="v8-hud-right">
      {TOPICS.map(topic => (
        <div key={topic.title} className="v8-hud-module">
          <div className="v8-hud-module-title"><span className="v8-hud-glyph">{topic.glyph}</span>{topic.title}</div>
          <div className="v8-hud-module-words">{topic.words.map(word => <span key={word}>{word}</span>)}</div>
        </div>
      ))}
    </div>
    <div className="v8-hud-footnote">ÁREAS E TECNOLOGIAS / SEM DADOS OPERACIONAIS EM TEMPO REAL</div>
  </div>
);
