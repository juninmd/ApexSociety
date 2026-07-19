// Standalone E2E homologation: serves the exported web build and drives the
// core ApexSociety flows (map, events, RSVP, crews, join crew, profile),
// capturing a screenshot of each step under e2e/screenshots/.
import { chromium } from '@playwright/test';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(process.cwd(), 'dist');
const SHOTS = path.join(__dirname, 'screenshots');
const PORT = 8099;

const MIME = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.ico': 'image/x-icon',
    '.ttf': 'font/ttf',
    '.svg': 'image/svg+xml',
    '.map': 'application/json',
};

function serve() {
    return http
        .createServer((req, res) => {
            const urlPath = decodeURIComponent(req.url.split('?')[0]);
            let filePath = path.join(DIST, urlPath);
            if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
                const asHtml = path.join(DIST, urlPath + '.html');
                filePath = fs.existsSync(asHtml) ? asHtml : path.join(DIST, 'index.html');
            }
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.writeHead(404);
                    res.end('not found');
                    return;
                }
                res.writeHead(200, {
                    'Content-Type': MIME[path.extname(filePath)] || 'application/octet-stream',
                });
                res.end(data);
            });
        })
        .listen(PORT);
}

async function main() {
    fs.mkdirSync(SHOTS, { recursive: true });
    const server = serve();
    const browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 420, height: 900 } });
    const base = `http://localhost:${PORT}`;
    const shot = async (name) => {
        await page.screenshot({ path: path.join(SHOTS, `${name}.png`), fullPage: true });
        console.log(`captured ${name}`);
    };

    await page.goto(base, { waitUntil: 'networkidle' });
    await page.getByText('MAPA').first().waitFor({ timeout: 60000 });
    await shot('01-map');

    // Events (deep-link)
    await page.goto(`${base}/events`, { waitUntil: 'networkidle' });
    await page.getByText('PARTICIPAR').first().waitFor({ timeout: 30000 });
    await shot('02-events');

    // RSVP: confirm attendance on the first event
    await page.getByText('PARTICIPAR').first().click();
    await page.getByText('CONFIRMADO').first().waitFor({ timeout: 10000 });
    await shot('03-event-rsvp');

    // Create Event form
    await page.goto(`${base}/create-event`, { waitUntil: 'networkidle' });
    await page.getByText('PUBLICAR EVENTO').first().waitFor({ timeout: 20000 });
    await page.getByPlaceholder('Ex: Encontro de Sexta à Noite').fill('TRACK DAY - GUARAPIRANGA');
    await page.getByPlaceholder('DD/MM/AAAA').fill('12/08/2026');
    await page.getByPlaceholder('HH:MM').fill('20:00');
    await page.getByPlaceholder('Onde vamos nos encontrar?').fill('AUTÓDROMO DE INTERLAGOS');
    await shot('04-create-event');

    // Crews (deep-link)
    await page.goto(`${base}/crews`, { waitUntil: 'networkidle' });
    await page.getByText('CRIAR EQUIPE').first().waitFor({ timeout: 20000 });
    await shot('05-crews');

    // Open crew details
    await page.getByText('OS CORREDORES').first().click();
    await page.getByText('GERENCIAR').first().waitFor({ timeout: 20000 });
    await shot('06-crew-details');

    // Profile (deep-link)
    await page.goto(`${base}/profile`, { waitUntil: 'networkidle' });
    await page.getByText('EDIT PROFILE').waitFor({ timeout: 20000 });
    await shot('07-profile');

    await browser.close();
    server.close();
    console.log('E2E homologation complete.');
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
