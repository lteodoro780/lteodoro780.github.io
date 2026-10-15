# L0·NOC V8 — datacenter / HUD de referência

## Objetivo
Reproduzir no portfólio React, com componentes reais, a direção visual aprovada:
datacenter escuro azul/ciano, quatro plataformas holográficas com servidores, painéis
técnicos, iluminação neon e uma janela "Sobre" com fotografia e áreas de atuação.

## O que permanece funcionando
- Desktop de janelas arrastáveis, ícones, barra de tarefas e menu.
- Aplicativos Sobre, Projetos, Competências, Projetos Técnicos, Carreira, Contato e Galeria.
- Links públicos de recrutamento, currículo, fotos autorizadas e projetos reais.
- Apresentação própria para telas pequenas.

## Implementação
- `frontend/src/components/noc/LayerStack.jsx`: SVG isométrico em camadas,
  com movimento sutil ao cursor; não é um mapa da infraestrutura real.
- `frontend/src/components/noc/DataCenterHUD.jsx`: quatro painéis descritivos
  das áreas de trabalho e tecnologias com as quais o autor possui experiência.
- `frontend/src/components/os/Wallpaper.jsx`: integração da paisagem de datacenter.
- `frontend/src/components/os/apps/Sobre.jsx`: fotografia e fatos profissionais
  verificáveis com destaque visual.
- `frontend/src/App.css`: iluminação e adaptação de layouts.

## Integridade de informações
A imagem de inspiração contém números de CPU, tráfego, uptime e estados online
que não são medições do ambiente do autor. Nenhum desses indicadores foi
replicado como dado real no site. Os racks, conexões e níveis são arte abstrata.

## Testes
Ação da branch: `.github/workflows/revisar-datacenter-v8.yml`.
Executa build, validação estática e testes Playwright em desktop e celular.
As capturas de tela são anexadas à execução no GitHub Actions.

## Publicação
- Revisão: https://github.com/lteodoro780/lteodoro780.github.io/pull/9
- Branch: `v8-datacenter-hud-fiel-imagem-20261015`
- A V7 permanece publicada em `main` até aprovação expressa.
