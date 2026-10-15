# L0·NOC V7 — Cyber HUD

A V7 integra três inspirações visuais — profundidade Ghost OS, atmosfera ASCII/terminal Cyberpunk OS e iluminação Sci-Fi HUD — ao layout funcional já existente da V6.

## Alterações visuais

- Canvas 2D local com partículas ASCII, rede abstrata e feixes de luz verde/ciano.
- Efeito de iluminação preservando a topologia central, atalhos, janelas, ticker, barra de tarefas e cartão mobile.
- Sem acesso a infraestrutura, dados internos ou métricas de monitoramento fictícias.
- Sem dependência de CDN, iframe, GSAP ou Unicorn Studio.
- O fundo não recebe cliques, limita quadros a aproximadamente 30 FPS, pausa quando a aba está oculta e respeita `prefers-reduced-motion`.

## Validação

- PR: https://github.com/lteodoro780/lteodoro780.github.io/pull/8
- Workflow de testes mobile e desktop: https://github.com/lteodoro780/lteodoro780.github.io/actions/runs/38733579677
- Backup anterior: `backup-v6-antes-cyber-hud-v7-20261015`
- O código-fonte React vive em `frontend/`; a saída compilada está na raiz do repositório para GitHub Pages.

A V7 é liberada publicamente apenas após aprovação e merge na `main`.
