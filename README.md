# L0·NOC — portfólio de Luis O. Florencio

Portfólio de **Analista de Infraestrutura de TI** publicado em **https://lteodoro780.github.io/**.

A página inicial é um "desktop" de NOC: ícones abrem janelas (Sobre, Estudos de caso, Laboratório, Competências, Carreira, Contato, Galeria) e uma pilha 3D mostra as quatro áreas de atuação (L0 suporte e redes, L1 Windows Server e AD, L2 Linux e monitoramento, L3 automação e IA local). Cada camada leva à janela correspondente.

## O que tem aqui

| Caminho | Conteúdo |
|---|---|
| `frontend/src/` | Código-fonte React (desktop, janelas, pilha 3D, conteúdo em `content.js`) |
| `frontend/public/` | Páginas estáticas: estudos de caso (`casos/`), `projetos.html`, `curriculo.html`, `bastidores.html`, `404.html`, imagens |
| raiz (`index.html`, `static/`, `casos/`…) | **Build publicado** pelo GitHub Pages (main / root). Não edite à mão: gere com o script abaixo |
| `tests/portfolio-smoke.mjs` | Teste de fumaça do site publicado (rotas, celular e desktop) |
| `frontend/tests/react-build-smoke.cjs` | Teste de fumaça do build React (pilha 3D, navegação, celular) |
| `scripts/build-publicar.sh` | Gera o build e copia para a raiz |

## Rodar e publicar

Requer Node.js 22 e Yarn 1.22 (`corepack enable && corepack prepare yarn@1.22.22 --activate`).

```bash
# desenvolvimento
cd frontend && yarn install && yarn start

# gerar o build e atualizar a raiz (o que o Pages publica)
./scripts/build-publicar.sh

# conferir localmente
python3 -m http.server 8765        # na raiz; abra http://127.0.0.1:8765/
```

Testes (com o servidor local acima rodando e o Playwright instalado):

```bash
node tests/portfolio-smoke.mjs
cd frontend && node tests/react-build-smoke.cjs
```

Fluxo recomendado: trabalhe numa branch, rode o script e os testes, abra um pull request e só então mescle na `main`. O Pages publica a `main` em 1 a 2 minutos; o navegador pode guardar a versão anterior por alguns minutos (Ctrl+F5).

## Decisões

- **Funciona sem JavaScript:** o `index.html` traz nome, cargo, resumo e links em HTML; o React substitui esse bloco ao carregar. Robôs de busca, prévias de link e ferramentas de triagem leem o conteúdo.
- **Movimento respeita o sistema:** com "reduzir movimento" ligado (`prefers-reduced-motion`), a flutuação, a inclinação pelo mouse e os pacotes de dados param. No Linux isso vem de `gtk-enable-animations`; no Windows, de "Efeitos de animação".
- **Rótulos fora do contexto 3D:** conteúdo dentro da pilha com `preserve-3d` quebrava a composição no Chromium; os rótulos ficam numa camada plana e seguem um marcador vazio no canto de cada placa.
- **Teclado:** Esc fecha a janela em foco (ou o menu), o foco entra na janela aberta e volta para quem a abriu.
- **Honestidade do conteúdo:** os estudos de caso descrevem versões públicas sanitizadas, separam o que foi validado do que não foi e não apresentam métricas sem fonte.

## Contato

lteodoro780@gmail.com · [GitHub](https://github.com/lteodoro780)
