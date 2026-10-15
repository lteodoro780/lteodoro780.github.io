"""Valida URLs locais e acessibilidade básica das páginas do portfólio.
Execução: python3 scripts/validate-static.py
"""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
from pathlib import PurePosixPath

PUB = Path(__file__).resolve().parent.parent / "public"
PAGES = [PUB / "projetos.html", PUB / "bastidores.html", PUB / "curriculo.html", *sorted((PUB / "casos").glob("*.html"))]

class Assets(HTMLParser):
    def __init__(self):
        super().__init__()
        self.urls = []
        self.bad_alt = 0
        self.has_title = False
        self.has_viewport = False

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "title": self.has_title = True
        if tag == "meta" and a.get("name") == "viewport": self.has_viewport = True
        if tag == "img" and "alt" not in a: self.bad_alt += 1
        u = a.get("href") if tag in ("a", "link") else a.get("src") if tag in ("img", "script") else None
        if u and not u.startswith(("https:","http:","mailto:","tel:","#","data:","javascript:")):
            self.urls.append(u)

issues=[]
for page in PAGES:
    parsed=Assets();parsed.feed(page.read_text(encoding="utf-8"))
    if not parsed.has_title:issues.append(f"{page.name}: sem title")
    if not parsed.has_viewport:issues.append(f"{page.name}: sem viewport")
    if parsed.bad_alt:issues.append(f"{page.name}: {parsed.bad_alt} imagens sem alt")
    for u in parsed.urls:
        path=unquote(urlsplit(u).path)
        if not (page.parent / path).resolve().is_file():
            issues.append(f"{page.relative_to(PUB)}: URL local inválida {u}")
print(f"Páginas verificadas: {len(PAGES)}. Erros: {len(issues)}")
for issue in issues:print('FALHA:',issue)
if issues:raise SystemExit(1)
