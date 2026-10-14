# Integração L0·NOC V3: código React e fotos

## Estado

- Branch de destino: `v3-react-fotos-integracao-20261014`.
- Origem: `v3-sobre-carreira-20261014` (base do PR #3).
- **Nenhuma alteração será publicada automaticamente.**
- Os arquivos da raiz (`index.html`, `static/` etc.) continuam correspondendo à V3 estática enquanto o React é homologado.
- Código React, galeria e 10 fotos WebP ficam em `frontend/` após a importação local.
- A branch `main` e o PR #3 não são alterados pela importação.

## Importar pelo Bazzite / Distrobox

Use o arquivo `L0-NOC-V3-Fotos-Reais-React.zip` já aprovado e o script
[`scripts/importar-v3-react-fotos.sh`](scripts/importar-v3-react-fotos.sh).

No terminal do Distrobox com Git e Python disponíveis:

```bash
# 1. Baixe o importador usando o arquivo 'Raw' do GitHub; leia antes de executá-lo.
# 2. Execute o script baixado:
bash ~/Downloads/importar-v3-react-fotos.sh   ~/Downloads/L0-NOC-V3-Fotos-Reais-React.zip

# 3. Após confirmar 's', o script cria commit e envia apenas a branch de integração.
```

A importação é isolada em `~/Projetos/l0-noc-v3-integracao`; não sobrescreve
a instalação local que você já testou no Bazzite. Ela requer autenticação normal
do GitHub no `git push`, e não deve solicitar que você salve tokens no código.

## Verificações

1. `python3 frontend/scripts/validate-static.py` e `git diff --cached --check` no importador.
2. Após o push, o workflow
   [`react-v3-build.yml`](.github/workflows/react-v3-build.yml)
   instala dependências, compila o frontend, valida HTML e executa testes Chromium
   no celular e no desktop.
3. O workflow salva a pasta `build/` como artefato **não publicado**, além de
   capturas de tela para revisão.
4. **Somente depois da aprovação** será considerado substituir os arquivos
   compilados na raiz do GitHub Pages e incorporar a branch à `main`.

## Observações de privacidade

A importação utiliza as fotos otimizadas e previamente selecionadas, não a coleção
original. Nunca enviar capturas de Zabbix, CFTV, IPs, topologias internas, dados
pessoais, chaves ou `.env` ao GitHub. A checagem automática é pontual e não
substitui revisão humana.

## Publicação

Não mesclar ou publicar sem confirmação expressa. A entrada de código React
em `frontend/` sozinha **não altera o site público**.
