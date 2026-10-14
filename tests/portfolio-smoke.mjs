import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const BASE = 'http://127.0.0.1:8765';
const browser = await chromium.launch({headless: true});
mkdirSync('test-artifacts', {recursive:true});
const results = [];
const failures = [];
const widths = [
  {label:'mobile-390', width:390, height:844},
  {label:'desktop-1366', width:1366, height:900},
];

async function run(name, task) {
  try { await task(); results.push('PASS ' + name); }
  catch (err) { failures.push('FAIL ' + name + ': ' + err.message); }
}
async function openPage(page, path, includes) {
  const response = await page.goto(BASE + path, {waitUntil:'domcontentloaded', timeout:25000});
  assert.equal(response?.status(), 200, 'HTTP 200 esperado: '+path);
  try {
    if (path === '/') {
      await page.locator('nav.recruiter-links a').first().waitFor({state:'visible',timeout:15000});
    } else {
      await page.waitForFunction(expected => document.body?.innerText.toLocaleLowerCase('pt-BR').includes(expected.toLocaleLowerCase('pt-BR')), includes, {timeout:15000});
    }
  } catch (err) {
    const body=(await page.locator('body').innerText().catch(()=>'' )).slice(0,350);
    throw new Error('Falha em '+path+' [esperado: '+includes+'] '+err.message+' | texto: '+body);
  }
}
async function mobileOverflow(page) {
  const dim=await page.evaluate(() => ({w:innerWidth,doc:document.documentElement.scrollWidth}));
  assert.ok(dim.doc<=dim.w+2, 'Rolagem horizontal: '+JSON.stringify(dim));
}
try {
  for(const device of widths){
    await run('rotas e acesso direto / '+device.label, async()=>{
      const page=await browser.newPage({viewport:{width:device.width,height:device.height}});
      const pageErrors=[];
      page.on('pageerror', e=>pageErrors.push(e.message));
      try {
        await openPage(page,'/','L0·NOC');
        await page.locator('nav.recruiter-links a[href="./projetos.html"]').waitFor();
        await page.locator('[data-testid="boot-screen"]').waitFor({state:'hidden',timeout:20000});
        await page.waitForTimeout(1700); // aguarda animações iniciais antes da captura
        await page.screenshot({path:'test-artifacts/home-'+device.label+'.png',fullPage:true});
        assert.equal(await page.locator('nav.recruiter-links a').count(),3);
        await page.locator('nav.recruiter-links a[href="./projetos.html"]').click();
        assert.ok(page.url().endsWith('/projetos.html'));
        for (const img of await page.locator('.project img').all()) {
          await img.scrollIntoViewIfNeeded();
          await img.evaluate(el => el.decode());
        }
        await page.screenshot({path:'test-artifacts/projects-'+device.label+'.png',fullPage:true});
        await mobileOverflow(page);
        for(const [slug,label] of [
          ['sistema-de-selos','Sistema'],
          ['sala-vanguardeira','Vanguardeira'],
          ['sentinela-ai','Sentinela'],
        ]){
          await openPage(page,'/casos/'+slug+'.html',label);
          await page.screenshot({path:'test-artifacts/case-'+slug+'-'+device.label+'.png',fullPage:true});
          await mobileOverflow(page);
        }
        await openPage(page,'/curriculo.html','Luis O. Florencio');
        await page.screenshot({path:'test-artifacts/resume-'+device.label+'.png',fullPage:true});
        assert.ok(await page.locator('button[onclick="window.print()"]').count()===1);
        assert.equal(await page.locator('a[href^="mailto:"]').count()>=1,true);
        await mobileOverflow(page);
        assert.equal(pageErrors.length,0,'Erros de JavaScript: '+pageErrors.join('; '));
      } finally {await page.close();}
    });
  }
  await run('desktop interativo / contato sem ticket fictício', async()=>{
    const page=await browser.newPage({viewport:{width:1366,height:900}});
    try {
      await page.goto(BASE, {waitUntil:'domcontentloaded'});
      const btn=page.locator('[data-testid="desktop-icon-ticket"]');
      await btn.waitFor({state:'visible',timeout:20000});
      await btn.click();
      const contact=page.locator('[data-testid="app-ticket"]');
      await contact.waitFor({state:'visible',timeout:12000});
      assert.ok((await contact.innerText()).includes('não registra tickets'));
      assert.equal(await contact.locator('[data-testid="contact-send-email"]').getAttribute('href'),'mailto:lteodoro780@gmail.com?subject=Contato%20via%20L0-NOC');
      assert.equal(await contact.locator('form').count(),0);
      const metricsBtn=page.locator('[data-testid="desktop-icon-metricas"]');
      await metricsBtn.click();
      const evidence=page.locator('[data-testid="app-metricas"]');
      await evidence.waitFor({state:'visible',timeout:12000});
      assert.ok((await evidence.innerText()).includes('Não utilizo percentuais subjetivos'));
      assert.ok((await evidence.locator('article').count())>=6);
    } finally{await page.close();}
  });
} finally {await browser.close();}
results.forEach(x=>console.log(x));
failures.forEach(x=>console.error(x));
if(failures.length)process.exitCode=1;
