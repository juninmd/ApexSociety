from playwright.sync_api import sync_playwright

def run_cuj(page):
    page.goto("http://localhost:3000/")
    page.wait_for_timeout(2000)

    # Web View map - go to web app
    page.mouse.click(200, 600) # ACESSAR O APP WEB roughly here
    page.wait_for_timeout(2000)

    # Login
    page.locator('input[placeholder="Ex: DriftKingBR"]').fill("DriftKingBR")
    page.wait_for_timeout(500)
    page.locator('input[placeholder="Sua senha secreta"]').fill("password")
    page.wait_for_timeout(500)

    # Click ENTRAR
    page.mouse.click(200, 450)
    page.wait_for_timeout(2000)

    # Click Menu tab
    page.mouse.click(200, 760)
    page.wait_for_timeout(1000)

    # Click MODO DIREÇÃO on menu
    page.mouse.click(200, 250)
    page.wait_for_timeout(2000)

    page.screenshot(path="/home/jules/verification/screenshots/verification2.png")

if __name__ == "__main__":
    import os
    os.makedirs("/home/jules/verification/videos", exist_ok=True)
    os.makedirs("/home/jules/verification/screenshots", exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos",
            viewport={'width': 400, 'height': 800} # Mobile viewport
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
