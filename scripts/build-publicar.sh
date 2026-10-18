#!/usr/bin/env bash
# Gera o build do React e copia o resultado para a raiz do repositório,
# que é o que o GitHub Pages publica (main / root).
# Uso: ./scripts/build-publicar.sh   (rode da raiz do repositório)
set -euo pipefail

cd "$(dirname "$0")/.."
[[ -f frontend/package.json ]] || { echo "Rode este script a partir do repositório do portfólio." >&2; exit 1; }

echo "== build =="
(
  cd frontend
  [[ -d node_modules ]] || yarn install --frozen-lockfile --non-interactive
  CI=false PUBLIC_URL=. yarn build
)

echo "== copiando frontend/build para a raiz =="
rm -rf static
cp -r frontend/build/. .

echo "== pronto =="
echo "Arquivos alterados:"
git status --short -- index.html asset-manifest.json static 404.html | head -20
echo
echo "Confira localmente (python3 -m http.server 8765) e rode os testes antes de commitar."
