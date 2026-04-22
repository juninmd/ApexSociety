import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        # Set a very tall viewport so everything is visible without scrolling
        page = await browser.new_page(viewport={"width": 1280, "height": 3000})
        await page.goto('http://localhost:3000')
        await page.wait_for_load_state('networkidle')
        await asyncio.sleep(2)

        # Click on the 'PERFIL' tab
        try:
            await page.get_by_text('PERFIL', exact=True).click(timeout=5000)
        except Exception:
            print("Failed to click by text, trying to click near the bottom right area...")
            await page.mouse.click(1150, 2900)

        await asyncio.sleep(3)

        # Take a screenshot
        await page.screenshot(path='/home/jules/verification/screenshots/verification4.png')
        await browser.close()

if __name__ == '__main__':
    asyncio.run(run())
