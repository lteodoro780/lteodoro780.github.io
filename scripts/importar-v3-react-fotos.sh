#!/usr/bin/env bash
set -euo pipefail

# Importa apenas frontend/ na branch V3 de integracao, nunca na main.
REPO="https://github.com/lteodoro780/lteodoro780.github.io.git"
BRANCH="v3-react-fotos-integracao-20261014"
ZIP_FILE="$HOME/Downloads/L0-NOC-V3-Fotos-Reais-React.zip"
WORKTREE="$HOME/Projetos/l0-noc-v3-integracao"
if [[ $# -ge 1 ]]; then ZIP_FILE="$1"; fi
if [[ $# -ge 2 ]]; then WORKTREE="$2"; fi

for command in git python3; do
  command -v "$command" >/dev/null || { echo "Falta: $command" >&2; exit 1; }
done
[[ -f "$ZIP_FILE" ]] || { echo "ZIP nao encontrado: $ZIP_FILE" >&2; exit 1; }
[[ ! -e "$WORKTREE" ]] || { echo "Pasta ja existe; escolha outra: $WORKTREE" >&2; exit 1; }

echo "Clonando somente a branch de integracao..."
git clone --single-branch --branch "$BRANCH" "$REPO" "$WORKTREE"

python3 - "$ZIP_FILE" "$WORKTREE" <<'PY'
from pathlib import Path, PurePosixPath
from zipfile import ZipFile
import re, stat, sys
archive = Path(sys.argv[1]).expanduser().resolve()
worktree = Path(sys.argv[2]).expanduser().resolve()
required = {
    'frontend/package.json', 'frontend/yarn.lock',
    'frontend/src/App.js', 'frontend/src/content/galleryPhotos.js',
    'frontend/public/bastidores.html', 'frontend/scripts/validate-build.mjs',
    'frontend/public/img/registro/lab-debian.webp',
}
ignored = {'node_modules', 'build', '.git', '.env', '.env.local', '.env.production', '.env.development'}
with ZipFile(archive) as z:
    names = set(z.namelist())
    missing = required - names
    if missing:
        raise SystemExit('ZIP incompleto: ' + ', '.join(sorted(missing)))
    files = 0
    for member in z.infolist():
        name = PurePosixPath(member.filename)
        if not name.parts or name.parts[0] != 'frontend' or member.is_dir():
            continue
        if name.is_absolute() or '..' in name.parts or any(part in ignored or part.startswith('.env') for part in name.parts):
            raise SystemExit('Entrada suspeita: ' + member.filename)
        if stat.S_ISLNK(member.external_attr >> 16):
            raise SystemExit('Link simbolico proibido: ' + member.filename)
        destination = worktree.joinpath(*name.parts)
        if not destination.resolve().is_relative_to(worktree):
            raise SystemExit('Caminho fora do repositorio: ' + member.filename)
        destination.parent.mkdir(parents=True, exist_ok=True)
        content = z.read(member)
        if destination.suffix.lower() in {'.js','.jsx','.json','.html','.css','.md','.mjs','.cjs','.py','.yml','.yaml','.txt','.sh'}:
            for label, pattern in [
                ('private key', rb'-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----'),
                ('GitHub token', rb'gh[pousr]_[A-Za-z0-9]{20,}'),
                ('API key', rb'sk-(?:proj-)?[A-Za-z0-9_-]{25,}'),
                ('AWS key', rb'AKIA[0-9A-Z]{16}'),
            ]:
                if re.search(pattern, content):
                    raise SystemExit(f'Possivel segredo em {name}: {label}')
        destination.write_bytes(content)
        files += 1
print(f'{files} arquivos do frontend extraidos em {worktree / "frontend"}')
PY

cd "$WORKTREE"
python3 frontend/scripts/validate-static.py
# A raiz continua com o site compilado anterior ate a aprovacao final.
git add -A -- frontend
git diff --cached --check
if git diff --cached --quiet; then
  echo "Sem diferencas para enviar."
  exit 0
fi

echo
printf 'Branch de destino: %s\n' "$BRANCH"
echo 'Arquivos a adicionar (resumo):'
git diff --cached --stat
printf '\nCONFIRME para criar commit e enviar SOMENTE a branch de integracao [s/N]: '
read -r answer
if [[ "$answer" != "s" && "$answer" != "S" ]]; then
  echo 'Nada foi enviado ao GitHub. A copia local permanece disponivel.'
  exit 0
fi

git commit -m "feat(portfolio): integrar fonte React V3 e galeria real"
git push -u origin "$BRANCH"
printf '\nIntegracao enviada a %s. Nenhuma alteracao na main.\n' "$BRANCH"
