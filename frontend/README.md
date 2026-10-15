# L0·NOC — React editável (reconciliação V3)

Este pacote reúne o código-fonte recuperado do Emergent e as personalizações de conteúdo da V3 do portfólio. Preserva o desktop React (janelas, topologia, incidentes simulados, animações) e adiciona estudos de caso, fotos de projeto, contato direto e currículo imprimível.

**Estado:** fonte candidata integrada; ainda não homologada visualmente após a recompilação. A V3 já publicada em forma compilada, testada no GitHub, permanece referência de comparação. **Não faça deploy automático nem sobrescreva a `main` sem testar.**

## Estrutura

- `src/content.js` — perfil, quatro projetos, competências fundamentadas e carreira.
- `src/components/os/` — desktop, janelas, componentes e `RecruiterLinks.jsx`.
- `src/components/os/apps/` — sobre, projetos, competências, carreira, telemetria e contato.
- `src/components/noc/` — topologia e widgets de demonstração.
- `src/App.css` — estilos originais mais acabamentos visuais V2/V3.
- `public/img/` — foto e imagens usadas na V3.
- `public/casos/`, `public/projetos.html`, `public/curriculo.html` — páginas verificadas da V3.
- `public/index.html` — página base sem scripts externos do editor Emergent.

## Build no Bazzite

Se o webpack reclamar de `Cannot resolve /img/luis-florencio.webp`, esta versão já inclui a correção no CSS e uma cópia da fotografia em `src/assets/luis-florencio.webp`. Consulte `../CORRECAO-BAZZITE.md`.

## Desenvolvimento

Requer Node.js e Yarn Classic, com conexão à internet para baixar dependências.

```bash
cd frontend
corepack enable
corepack prepare yarn@1.22.22 --activate
yarn install
yarn start
```

Para gerar a versão estática (GitHub Pages):

```bash
yarn build
```

A pasta `build/` é o artefato de publicação. Verifique o carregamento de todas as imagens, janelas, rotas de estudos de caso, currículo e `mailto:` no desktop e no celular. O `homepage` do `package.json` é relativo (`.`) para publicação na raiz do GitHub Pages.

O `yarn.lock` foi preservado da recuperação original; ele pode conter entradas de dependências usadas apenas pelo Emergent. As dependências do editor foram retiradas do `package.json`. Gere e revise um lockfile atualizado em ambiente conectado antes do deploy de produção.

## Testes e segurança

- O bundle V3 de referência (do GitHub) passou em GitHub Actions/Chromium antes da recuperação do fonte; isso **não equivale** a testar este React reconstruído.
- Esta cópia foi inspecionada estaticamente e pode exigir ajustes depois do primeiro `yarn install && yarn build`.
- Nenhum `.env`, `node_modules`, backup ou credencial foi incluído neste ZIP.
- A seção de telemetria e o incidente do desktop são **dados sintéticos**; não são métricas profissionais.
- O contato é por `mailto:`: nenhum chamado é registrado ou enviado automaticamente.

Referência da V3 revisada: https://github.com/lteodoro780/lteodoro780.github.io/pull/3

## Verificação adicional desta entrega

O arquivo `../VALIDACAO-REACT.md` apresenta os resultados da validação estática, o bloqueio de instalação/compilação no ambiente atual e a rotina de testes no GitHub Actions. **Não publicar a fonte antes de executar o build e os testes de Chromium.**
