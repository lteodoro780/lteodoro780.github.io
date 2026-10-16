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
        assert.equal(await page.locator('[data-testid="v7-cyber-atmosphere"]').count(),0, 'Canvas ASCII deve ter sido removido');
        assert.equal(await page.locator('iframe[srcdoc]').count(),0, 'V7 não deve carregar iframe de terceiros');
        assert.equal(await page.locator('[data-testid="interactive-globe"], [data-testid="interactive-infra-map"]').count(),0,'Mapa e globo devem sair');
        assert.equal(await page.locator('[data-testid="infra-map-svg"], [data-testid="globe-svg"], canvas').count(),0,'Sem Canvas nem mapas');
        assert.equal(await page.locator('[data-testid="wallpaper-name"]').count(),0,'Nome gigante removido');
        assert.equal(await page.locator('.wallpaper-photo').count(),0,'Foto do rack não deve reaparecer');
        assert.equal(await page.locator('.portfolio-wallpaper-solid').evaluate(el=>getComputedStyle(el).backgroundColor),'rgb(6, 19, 27)','Fundo sólido original da V7');
        const stack=page.locator('[data-testid="hero-layer-stack"]');
        assert.equal(await stack.count(),1,'Topografia V3 ausente');
        const plates=stack.locator('[data-testid="topology-plate"]');
        assert.equal(await plates.count(),4,'Devem existir quatro placas');
        assert.equal(await stack.locator('.layer-grid').count(),4,'Grade fina da V3 ausente');
        const dims=await plates.evaluateAll(els=>els.map(el=>({w:parseFloat(getComputedStyle(el).width),h:parseFloat(getComputedStyle(el).height)})));
        assert.ok(dims.every(d=>d.w/d.h>1.4),'As placas devem ser retangulares');
        const centers=await plates.evaluateAll(els=>els.map(el=>{const r=el.getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2};}));
        for(let i=1;i<centers.length;i++){
          assert.ok(Math.hypot(centers[i].x-centers[i-1].x,centers[i].y-centers[i-1].y)>14,'Camadas sem separação visível');
        }
        assert.equal(await plates.first().evaluate(el=>getComputedStyle(el).animationName),'v3-plate-float','Flutuação CSS única esperada');
        await page.emulateMedia({reducedMotion:'reduce'});
        assert.equal(await plates.first().evaluate(el=>getComputedStyle(el).animationName),'none','prefers-reduced-motion nas placas');
        await page.emulateMedia({reducedMotion:'no-preference'});
        assert.equal(await page.locator('[data-testid="mobile-infra-shortcuts"] button').count(),6,'Manter seis atalhos mobile');
        assert.equal(await page.locator('div.grain').count(),0,'Textura de ruído SVG deve estar ausente');
        assert.equal(await page.locator('[data-testid="v7-background-hud"]').count(),0,'HUD extra da V7 deve sair para manter visual V3');
        assert.equal(await page.locator('.cyber-scan-overlay').count(),0,'Sobreposição neon da V7 deve sair');
        assert.equal(await page.locator('.cyber-ambient-glow').count(),0,'Glow de fundo da V7 deve sair');
        const ticker = page.locator('[data-testid="ticker-v3-track"]');
        assert.equal(await ticker.count(),1,'Barra superior com estética V3');
        assert.equal(await ticker.locator('[aria-hidden="true"]').count(),1,'Marquee precisa de uma cópia acessível e outra decorativa');
        assert.equal(await ticker.evaluate(el => getComputedStyle(el).animationName),'marquee','Palavras devem deslizar como na V3');
        await page.emulateMedia({reducedMotion:'reduce'});
        assert.equal(await ticker.evaluate(el => getComputedStyle(el).animationName),'none','Preferência de movimento reduzido respeitada na barra');
        await page.emulateMedia({reducedMotion:'no-preference'});
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
          const panel = page.locator('[data-testid="window-servicos"]');
          assert.equal(await panel.evaluate(el => getComputedStyle(el).backdropFilter),'none','Janela não deve usar blur');
          await page.locator('[data-testid="window-close-servicos"]').click();
          await page.locator('[data-testid="window-servicos"]').waitFor({state:'hidden',timeout:10000});
          await page.waitForTimeout(250); // permitir concluir a transição de saída no celular
          assert.equal(await plates.count(),4,'Topologia presente no mobile');
          await page.locator('[data-testid="mobile-infra-node-linux"]').click();
          await page.locator('[data-testid="window-tecnicos"]').waitFor({timeout:10000});
          await page.locator('[data-testid="window-close-tecnicos"]').click();
          await page.locator('[data-testid="window-tecnicos"]').waitFor({state:'hidden',timeout:10000});
        } else {
          assert.equal(await page.locator('[data-testid="mobile-intro"]').isVisible(),false);
          const closeSobre = page.locator('[data-testid="window-close-sobre"]');
          if (await closeSobre.isVisible()) {
            await closeSobre.click();
            await page.locator('[data-testid="window-sobre"]').waitFor({state:'hidden',timeout:10000});
          }
          await page.locator('[data-testid="desktop-icon-tecnicos"]').click();
          await page.locator('[data-testid="window-tecnicos"]').waitFor({timeout:10000});
          await page.locator('[data-testid="window-close-tecnicos"]').click();
          await page.locator('[data-testid="window-tecnicos"]').waitFor({state:'hidden',timeout:10000});
          await page.locator('[data-testid="desktop-icon-metricas"]').click();
          await page.locator('[data-testid="window-metricas"]').waitFor({timeout:10000});
          await page.locator('[data-testid="window-close-metricas"]').click();
          await page.locator('[data-testid="window-metricas"]').waitFor({state:'hidden',timeout:10000});
          await page.screenshot({path:'artifacts/topografia-v3-desktop.png'});
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
        assert.equal(await page.locator('.cyber-window').first().evaluate(el => getComputedStyle(el).backdropFilter),'none','Blur de janela removido');
        assert.equal(errors.length,0,`Erros JS: ${errors.join('; ')}`);
        console.log(`PASS: React V7 com topografia V3 ${label}, navegação, imagens e contato.`);
      } finally {await page.close()}
    }
  } finally {await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
