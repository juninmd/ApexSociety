import asyncio
from playwright.async_api import async_playwright
import time

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        print("Navigating to app...")
        await page.goto("http://localhost:3000/")
        await page.wait_for_load_state("networkidle")

        time.sleep(2)

        print("Clicking 'ACESSAR O APP WEB'")
        await page.locator("text='ACESSAR O APP WEB'").click()
        await page.wait_for_timeout(2000)

        viewport_size = page.viewport_size
        width = viewport_size['width']
        height = viewport_size['height']
        print("Clicking Menu (Bottom center)")
        await page.mouse.click(width / 2, height - 40)
        await page.wait_for_timeout(1000)

        # 1. Drive Mode Screenshot (to see Panic Button)
        print("Clicking MODO DIREÇÃO")
        try:
            await page.locator("text='MODO DIREÇÃO'").click()
            await page.wait_for_timeout(2000)
            await page.screenshot(path="drive_mode.png")
            print("Captured drive_mode.png")
        except Exception as e:
            print("Could not find MODO DIREÇÃO, maybe menu didn't open.")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
