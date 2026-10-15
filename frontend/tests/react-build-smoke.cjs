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
        assert.equal(await page.locator('[data-testid="desktop-icon-telemetria"]').count(),1);
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
        await page.locator('[data-testid="desktop-icon-telemetria"]').click();
        const telemetry = page.locator('[data-testid="app-telemetria"]');
        await telemetry.waitFor({timeout:10000});
        assert.ok((await telemetry.locator('[data-testid="telemetry-stat-projects"]').innerText()).includes('4'));
        assert.ok((await telemetry.locator('[data-testid="telemetry-stat-cases"]').innerText()).includes('3'));
        assert.ok((await telemetry.locator('[data-testid="telemetry-stat-photos"]').innerText()).includes('10'));
        assert.ok((await telemetry.locator('[data-testid="telemetry-stat-arm"]').innerText()).includes('60+'));
        assert.equal(await telemetry.locator('[data-testid^="telemetry-project-"]').count(),3);
        assert.ok((await telemetry.innerText()).includes('não acessa sistemas internos'));
        assert.equal(await telemetry.locator('[data-testid^="telemetry-photo-"]').count(),4);
        await page.screenshot({path:`artifacts/telemetria-${label}.png`});
        await page.goto(base+'/curriculo.html');
        assert.ok(await page.locator('button[onclick="window.print()"]') .isVisible());
        await page.goto(base+'/');
        await page.locator('[data-testid="desktop-icon-ticket"]').click();
        const contact=page.locator('[data-testid="app-ticket"]');
        await contact.waitFor({timeout:10000});
        assert.ok((await contact.innerText()).includes('não registra tickets'));
        assert.equal(await contact.locator('form').count(),0);
        assert.equal(errors.length,0,`Erros JS: ${errors.join('; ')}`);
        console.log(`PASS: React V3 ${label}, navegação, imagens e contato.`);
      } finally {await page.close()}
    }
  } finally {await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
