# L0·NOC — Telemetria documental V5

A janela `evidencias.dashboard` reúne evidências públicas do portfólio profissional. Não faz consultas a servidores, redes privadas, Zabbix ou sistemas de monitoramento.

## Dados do painel

| Indicador | Fonte |
| --- | --- |
| Projetos listados | `SERVICES.length`, em `frontend/src/content.js` |
| Estudos de caso | Projetos com campo `demo` válido em `SERVICES` |
| Fotografias | `GALLERY_PHOTOS.length`, em `frontend/src/content/galleryPhotos.js` |
| Estações ARM 60+ | Participação no projeto colaborativo Sala Vanguardeira, conforme o estudo de caso |
| Fotos por categoria | Contagem do campo `group` no acervo |
| Competências por grupo | Contagem do campo `group` em `SKILLS` |

Os números representam registros publicados e projeto documentado, nunca SLA, percentuais de proficiência, produção em tempo real ou indicadores de segurança interna.

## Revisão e publicação

- PR de publicação: https://github.com/lteodoro780/lteodoro780.github.io/pull/6
- Build React e smoke tests mobile e desktop: https://github.com/lteodoro780/lteodoro780.github.io/actions/runs/38661105650
- Backup da V4: `backup-v4-antes-telemetria-v5-20261014`
- A publicação da V5 ocorre exclusivamente após revisão do PR e merge na `main`.
