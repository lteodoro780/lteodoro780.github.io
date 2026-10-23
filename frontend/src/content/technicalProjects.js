// Projetos públicos do GitHub. Sem URLs de sistemas internos ou métricas institucionais.
export const TECHNICAL_PROJECTS = [
  {
    id: "tluizlabs",
    name: "TLuizLabs",
    category: "Infraestrutura",
    status: "Documentação pública",
    kicker: "LINUX / REDES / AUTOMAÇÃO",
    description: "Registros técnicos de administração Linux, integração com Active Directory, automação de implantação e estudos de redes. O repositório usa exemplos adaptados e não expõe configurações institucionais no portfólio.",
    stack: ["Linux", "AD / GPO", "Bash", "Redes"],
    repo: "https://github.com/lteodoro780/tluizlabs",
    documentation: "https://github.com/lteodoro780/tluizlabs/tree/main/kubuntu-enterprise",
    evidence: [
      "Implantação e padronização de estações Linux",
      "Integração de estações com serviços de domínio",
      "Diagnóstico de configurações e conectividade",
    ],
  },
  {
    id: "infra-labs",
    name: "Infra TI Labs",
    category: "Laboratórios",
    status: "Laboratórios documentados",
    kicker: "LINUX / MONITORAMENTO / ITSM",
    description: "Coleção de estudos práticos e exemplos sanitizados em infraestrutura: Linux, Windows Server, redes, virtualização, GLPI, OCS Inventory, Zabbix e automações.",
    stack: ["Zabbix", "GLPI / OCS", "Docker", "XCP-ng"],
    repo: "https://github.com/lteodoro780/infra-ti-labs",
    documentation: "https://github.com/lteodoro780/infra-ti-labs#readme",
    evidence: [
      "Anotações de configuração e troubleshooting",
      "Integração de ferramentas de suporte e inventário",
      "Exemplos e práticas de sanitização",
    ],
  },
  {
    id: "hermes",
    name: "HERMES Security Portable",
    category: "IA local",
    status: "Projeto aberto",
    kicker: "IA LOCAL / SUPORTE DEFENSIVO",
    description: "Assistente portátil para diagnóstico defensivo de infraestrutura, uso offline e consulta a uma base local de conhecimento. Possui monitoramento da própria máquina e não executa correções automáticas.",
    stack: ["Python", "llama.cpp", "SQLite", "Offline-first"],
    repo: "https://github.com/lteodoro780/hermes-security-portable",
    documentation: "https://github.com/lteodoro780/hermes-security-portable#readme",
    evidence: [
      "Chat local com modelo GGUF opcional",
      "Diagnóstico de rede e hardware",
      "Histórico, alertas e backup local",
    ],
  },
];

export const TECHNICAL_CATEGORIES = ["Todos", "IA local", "Infraestrutura", "Laboratórios"];
