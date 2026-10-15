const {chromium} = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');

(async()=>{
  const browser = await chromium.launch({headless: true});
  fs.mkdirSync('artifacts', {recursive:true});
  try {
    for(const [label,width,height] of [['mobile',390,844],['desktop',1366,900]]) {
      const page = await browser.newPage({viewport:{width,height}});
      const errors=[];
      page.on('pageerror',e=>errors.push(e.message));
      try {
        const base='http://127.0.0.1:8765';
        const res=await page.goto(base+'/',{waitUntil:'domcontentloaded'});
        assert.equal(res.status(),200);
        await page.locator('nav.recruiter-links a').first().waitFor({timeout:20000});
        await page.locator('[data-testid="boot-screen"]').waitFor({state:'hidden',timeout:20000});
        await page.waitForTimeout(1400);
        assert.equal(await page.locator('nav.recruiter-links a').count(),3);
        const atmosphere = page.locator('[data-testid="v7-cyber-atmosphere"]');
        assert.equal(await atmosphere.count(),1, 'Canvas de atmosfera não foi montado');
        assert.equal(await atmosphere.isVisible(),true);
        const canvasState = await atmosphere.evaluate(el => ({
          width: el.width, height: el.height,
          pointerEvents: getComputedStyle(el).pointerEvents,
          context: !!el.getContext('2d'),
        }));
        assert.ok(canvasState.width > 0 && canvasState.height > 0, 'Canvas com tamanho inválido');
        assert.equal(canvasState.pointerEvents, 'none', 'Canvas não pode bloquear interação');
        assert.equal(canvasState.context, true);
        assert.equal(await page.locator('iframe[srcdoc]').count(),0, 'V7 não deve carregar iframe de terceiros');
        assert.equal(await page.locator('.v8-neon-stack svg').count(),1);
        assert.equal(await page.locator('.v8-wallpaper').count(),1,'Novo tema V8 ausente');
        assert.equal(await page.locator('.v8-datacenter-scene').count(),1,'Fundo data center ausente');
        assert.equal(await page.locator('.v8-svg-tier').count(),5,'Cinco níveis do data center ausentes');
        assert.equal(await page.locator('.v8-svg-cube').count(),46,'Mini racks da maquete ausentes');
        assert.equal(await page.locator('.v8-system-labels > div').count(),4);
        if(label === 'mobile') {
          assert.equal(await page.locator('.v8-system-labels').isVisible(),false,
            'Cards visuais não devem disputar espaço na versão mobile');
        } else {
          assert.equal(await page.locator('.v8-datacenter-scene').isVisible(),true);
        }
        assert.equal(await page.locator('.cyber-ticker').count(),1);
        assert.equal(await page.locator('.cyber-taskbar').count(),1);

        assert.equal(await page.locator('[data-testid="desktop-icon-telemetria"]').count(),0);
        assert.equal(await page.locator('[data-testid="desktop-icon-tecnicos"]').count(),1);
        assert.equal(await page.locator('[data-testid="incident-trigger"]').count(),0);
        assert.equal(await page.locator('[data-testid="desktop-icon-incidente"]').count(),0);
        if(label === 'mobile') {
          const intro=page.locator('[data-testid="mobile-intro"]');
          assert.equal(await intro.isVisible(),true,'Apresentação mobile não apareceu');
          assert.ok((await intro.innerText()).includes('Analista de Infraestrutura'));
          assert.equal(await intro.locator('a[href*="linkedin.com"]').count(),1);
          assert.equal(await intro.locator('a[href*="github.com"]').count(),1);
          await intro.locator('[data-testid="mobile-cta-projects"]').click();
          await page.locator('[data-testid="window-servicos"]').waitFor({timeout:10000});
          await page.locator('[data-testid="window-close-servicos"]').click();
        } else {
          assert.equal(await page.locator('[data-testid="mobile-intro"]').isVisible(),false);
        }
        assert.ok(!(await page.locator('body').innerText()).includes('PING DEMO'));
        await page.screenshot({path:`artifacts/home-${label}.png`});
        const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth);
        assert.ok(overflow<3,`Home com overflow horizontal: ${overflow}px`);
        await page.locator('nav.recruiter-links a[href$="projetos.html"]').click();
        await page.waitForURL('**/projetos.html');
        assert.equal(await page.locator('article.project').count(),3);
        for(const img of await page.locator('article.project img').all()){
          await img.scrollIntoViewIfNeeded();
          await img.evaluate(el=>el.decode());
        }
        await page.screenshot({path:`artifacts/projetos-${label}.png`,fullPage:true});
        for(const slug of ['sistema-de-selos','sala-vanguardeira','sentinela-ai']) {
          const r=await page.goto(base+`/casos/${slug}.html`);
          assert.equal(r.status(),200);
          assert.ok((await page.locator('h1').innerText()).length>0);
          assert.ok(await page.locator('body').isVisible());
        }
        const galleryPage=await page.goto(base+'/bastidores.html');
        assert.equal(galleryPage.status(),200);
        assert.equal(await page.locator('.photo:not([hidden])').count(),10);
        await page.locator('button[data-filter="Linux"]').click();
        assert.equal(await page.locator('.photo:not([hidden])').count(),2);
        await page.locator('button[data-filter="Tudo"]').click();
        await page.screenshot({path:`artifacts/bastidores-${label}.png`,fullPage:true});
        const photos=page.locator('.photo img');
        for(const image of await photos.all()) {
          await image.scrollIntoViewIfNeeded();
          await image.evaluate(el=>el.decode());
        }
        assert.equal(await photos.count(),10);
        await page.goto(base+'/');
        await page.locator('[data-testid="desktop-icon-galeria"]').click();
        const gallery=page.locator('[data-testid="app-galeria"]');
        await gallery.waitFor({timeout:10000});
        assert.equal(await gallery.locator('[data-testid^="gallery-thumb-"]').count(),10);
        await gallery.locator('button[aria-pressed="false"]').first().click();
        assert.ok((await gallery.locator('[data-testid^="gallery-thumb-"]').count()) >= 1);
        await gallery.locator('button[aria-pressed="false"]').first().click();
        await page.goto(base+'/');
        await page.locator('[data-testid="desktop-icon-tecnicos"]').click();
        const technical = page.locator('[data-testid="app-projetos-tecnicos"]');
        await technical.waitFor({timeout:10000});
        assert.equal(await technical.locator('[data-testid^="technical-project-"]:not([data-testid="technical-project-grid"])').count(),3);
        for(const id of ['hermes','tluizlabs','infra-labs']) {
          const repoLink = technical.locator(`[data-testid="technical-repository-${id}"]`);
          assert.equal(await repoLink.count(),1);
          assert.ok((await repoLink.getAttribute('href')).startsWith('https://github.com/lteodoro780/'));
          assert.equal(await repoLink.getAttribute('target'),'_blank');
          assert.equal(await repoLink.getAttribute('rel'),'noopener noreferrer');
          assert.equal(await technical.locator(`[data-testid="technical-docs-${id}"]`).count(),1);
        }
        assert.ok((await technical.innerText()).toLowerCase().includes('hermes security portable'));
        await technical.locator('[data-testid="technical-filter-ia"]').click();
        assert.equal(await technical.locator('article[data-testid^="technical-project-"]').count(),1);
        assert.equal(await technical.locator('[data-testid="technical-project-hermes"]').count(),1);
        await technical.locator('[data-testid="technical-filter-todos"]').click();
        assert.equal(await technical.locator('article[data-testid^="technical-project-"]').count(),3);
        await page.screenshot({path:`artifacts/tecnicos-${label}.png`});
        await page.goto(base+'/curriculo.html');
        assert.ok(await page.locator('button[onclick="window.print()"]') .isVisible());
        await page.goto(base+'/');
        await page.locator('[data-testid="desktop-icon-ticket"]').click();
        const contact=page.locator('[data-testid="app-ticket"]');
        await contact.waitFor({timeout:10000});
        assert.ok((await contact.innerText()).includes('não registra tickets'));
        assert.equal(await contact.locator('form').count(),0);
        assert.equal(await page.locator('.cyber-window').count() >= 1,true);
        assert.equal(errors.length,0,`Erros JS: ${errors.join('; ')}`);
        console.log(`PASS: React V3 ${label}, navegação, imagens e contato.`);
      } finally {await page.close()}
    }
  } finally {await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
