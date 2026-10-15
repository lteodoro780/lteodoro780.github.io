# L0·NOC V8 — Neon Datacenter

## Objetivo
Reproduzir no portfólio real a linguagem da referência visual futurista aprovada, mantendo a estrutura de desktop interativo, projetos, fotos, galeria, estudos de caso, currículo e apresentação mobile.

## Composição
- Plano de fundo estilizado como corredores de um data center, com grade técnica e iluminação ciano.
- Maquete central em SVG vetorial com cinco níveis isométricos, mini gabinetes e luzes (ilustração, não infraestrutura inventariada).
- Quatro cartões decorativos à esquerda com áreas profissionais reais: aplicações, serviços, infraestrutura e automação.
- Atmosfera ASCII da V7 mantida no fundo, com redução de intensidade no celular.
- Acabamento HUD nas janelas, botões e menus existentes.

## Transparência
**Nenhuma estatística de CPU, RAM, tráfego, quantidade de servidores ou disponibilidade é apresentada como real.** A arte de referência continha dados inventados, substituídos aqui por categorias técnicas e estrutura ilustrativa. A implementação é uma aproximação React/CSS/SVG da composição, não a importação literal da imagem (que incluiria texto e fotografia duplicados).

## Qualidade
- Build React e validações estáticas via GitHub Actions.
- Testes Playwright em desktop 1366x900 e mobile 390x844, navegando por projetos, galeria, estudos de caso e contato.
- Screenshots no artefato do workflow `revisar-neon-v8.yml`.
- SVG sem scripts, sem acesso à rede ou dependências externas.
- Fundo sem captura de cliques; animações respeitam `prefers-reduced-motion`.

## Versionamento
- Branch de trabalho: `v8-neon-datacenter-concept-20261015`.
- Pull Request: https://github.com/lteodoro780/lteodoro780.github.io/pull/10
- Cópia restaurável da V7: `backup-v7-antes-neon-datacenter-v8-20261015`.
