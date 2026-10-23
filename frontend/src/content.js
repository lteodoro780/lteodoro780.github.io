// Dados profissionais reconciliados com a V3; sem métricas inventadas.
export const BRAND = "L0·NOC";
export const PROFILE = {
  "first": "LUIS O.",
  "last": "FLORENCIO",
  "node": "luis-o-florencio-01",
  "role": "Analista de Infraestrutura de TI",
  "location": "Três Corações, MG · Brasil",
  "bio": "Sou Analista de Infraestrutura de TI, formado em Análise e Desenvolvimento de Sistemas. Atuo desde 2021 com Linux, Windows Server, redes, Active Directory, GPO e monitoramento. Liderei a migração de mais de 300 estações para Kubuntu integrado ao Active Directory e desenvolvi o Sistema de Selos em Django. Automatizo rotinas com PowerShell, Bash e Python.",
  "email": "lteodoro780@gmail.com",
  "github": "github.com/lteodoro780",
  "linkedin": "linkedin.com/in/luis-o-florencio"
};
export const SERVICES = [
  {
    "id": "01",
    "name": "MIGRAÇÃO KUBUNTU",
    "cover": "./img/kubuntu.webp",
    "status": "operational",
    "desc": "Liderança da migração de mais de 300 estações para Kubuntu integrado ao Active Directory: implantação por imagem clonada, GPO no Linux e automação de hostname, antivírus, atualizações e impressoras.",
    "stack": [
      "Kubuntu",
      "Active Directory",
      "Bash"
    ],
    "sla": null,
    "repo": "https://github.com/lteodoro780/tluizlabs/blob/main/kubuntu-enterprise/deployment-300-estacoes.md",
    "demo": "./casos/migracao-kubuntu.html"
  },
  {
    "id": "02",
    "name": "SISTEMA DE SELOS",
    "cover": "./img/selos.webp",
    "status": "operational",
    "desc": "Sistema de gestão veicular em Python e Django: cadastro de pessoas e veículos, emissão e consulta de selos por QR Code, importações e ocorrências.",
    "stack": [
      "Python",
      "Django",
      "QR Code"
    ],
    "sla": null,
    "repo": "https://github.com/lteodoro780/sistema-selos-veiculares",
    "demo": "./casos/sistema-de-selos.html"
  },
  {
    "id": "03",
    "name": "SALA VANGUARDEIRA",
    "cover": "./img/registro/lab-debian.webp",
    "status": "operational",
    "desc": "Participação no reaproveitamento de mais de 60 TV Boxes ARM como estações Linux/Armbian para uso educacional e em laboratório.",
    "stack": [
      "Linux",
      "Armbian",
      "ARM"
    ],
    "sla": null,
    "repo": "https://github.com/lteodoro780/vanguardeira-project",
    "demo": "./casos/sala-vanguardeira.html"
  },
  {
    "id": "04",
    "name": "SENTINELA",
    "cover": "./img/sentinela.webp",
    "status": "degraded",
    "desc": "Assistente de IA local para apoio ao suporte e à documentação técnica. Utiliza Docker, Ollama, Open WebUI e consulta dados de monitoramento pelo Zabbix.",
    "stack": [
      "Docker",
      "Ollama",
      "Zabbix API"
    ],
    "sla": null,
    "repo": "https://github.com/lteodoro780/SENTINELA-AI",
    "demo": "./casos/sentinela-ai.html"
  },
  {
    "id": "05",
    "name": "MAPA CFTV",
    "cover": "./img/cftv.webp",
    "status": "degraded",
    "desc": "Projeto interno em evolução para organizar e visualizar câmeras e pontos de infraestrutura CFTV, facilitando a identificação e a documentação.",
    "stack": [
      "CFTV IP",
      "Hikvision",
      "Inventário"
    ],
    "sla": null,
    "repo": "",
    "demo": ""
  }
];
export const SKILL_GROUPS = [
  "Tudo",
  "Infra",
  "Automação",
  "Observabilidade",
  "Linguagens"
];
export const SKILLS = [
  {
    "name": "Implantação em massa",
    "group": "Infra",
    "evidence": "Liderança da migração de 300+ estações para Kubuntu: imagem clonada (Rescuezilla), ingresso no AD e GPO no Linux (CID)."
  },
  {
    "name": "Windows Server / AD",
    "group": "Infra",
    "evidence": "Suporte a Active Directory, políticas GPO, autenticação e serviços de rede."
  },
  {
    "name": "Linux",
    "group": "Infra",
    "evidence": "Administração de Debian e Ubuntu, serviços systemd, conectividade e troubleshooting."
  },
  {
    "name": "PowerShell / Bash",
    "group": "Automação",
    "evidence": "Scripts de administração e automação de rotinas operacionais."
  },
  {
    "name": "Docker",
    "group": "Automação",
    "evidence": "Implantação e manutenção de stack Ollama / Open WebUI no Sentinela AI."
  },
  {
    "name": "Zabbix",
    "group": "Observabilidade",
    "evidence": "Monitoramento e testes de consultas à API do Zabbix em laboratório."
  },
  {
    "name": "GLPI / OCS",
    "group": "Observabilidade",
    "evidence": "Suporte, inventário e diagnóstico de integrações de autenticação LDAP."
  },
  {
    "name": "Python / Django",
    "group": "Linguagens",
    "evidence": "Aplicação Sistema de Selos: cadastros, QR Code, relatórios e LPR."
  },
  {
    "name": "SQL / SQLite",
    "group": "Linguagens",
    "evidence": "Persistência e verificações de integridade de banco SQLite na aplicação de Selos."
  }
];
export const INCIDENTS = [
  {
    "ts": "2021 — atual",
    "type": "DEPLOY",
    "company": "ESCOLA DE SARGENTOS DAS ARMAS",
    "role": "Infraestrutura de TI · Redes e Sistemas",
    "summary": "Atuação em suporte, administração e manutenção de infraestrutura de TI em ambiente institucional, com foco em sistemas, redes, monitoramento e automação.",
    "details": [
      "Liderança da migração de mais de 300 estações para Kubuntu integrado ao Active Directory, com implantação por imagem clonada e GPO no Linux.",
      "Desenvolvimento do Sistema de Selos Veiculares (Python/Django): cadastros, QR Code, ocorrências e revisão de leituras de placas.",
      "Administração e suporte a Linux, Windows Server, Active Directory, políticas GPO e serviços de rede.",
      "Diagnóstico de incidentes de conectividade, autenticação, estações de trabalho, servidores e aplicações.",
      "Uso de Zabbix no monitoramento e GLPI/OCS Inventory no suporte, inventário e gestão operacional.",
      "Automação de rotinas e padronização de configurações com PowerShell, Bash e GPO."
    ]
  },
  {
    "ts": "2025",
    "type": "MIGRAÇÃO",
    "company": "SALA VANGUARDEIRA",
    "role": "Reaproveitamento de hardware · Linux ARM",
    "summary": "Participação na conversão de mais de 60 TV Boxes ARM em estações Linux/Armbian para ambiente educacional.",
    "details": [
      "Preparação de dispositivos, implantação Linux, ajustes de rede e testes.",
      "Projeto com foco em reaproveitamento tecnológico e uso educacional de baixo custo."
    ]
  },
  {
    "ts": "2023 — 2026",
    "type": "BOOT",
    "company": "ESTÁCIO",
    "role": "Tecnólogo em Análise e Desenvolvimento de Sistemas",
    "summary": "Graduação em Análise e Desenvolvimento de Sistemas concluída em 2026.",
    "details": [
      "Formação aplicada ao desenvolvimento de sistemas, integração de serviços e dados.",
      "Estudos complementares em redes, proteção cibernética e automação."
    ]
  }
];
export const MARQUEE = ["LINUX", "INFRAESTRUTURA", "AUTOMAÇÃO", "PYTHON", "MONITORAMENTO", "SEGURANÇA", "SISTEMAS"];
