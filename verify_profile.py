from playwright.sync_api import sync_playwright

def run_cuj(page):
    page.goto("http://localhost:3000/")
    page.wait_for_timeout(2000)

    # Login - Just click blindly where the login button is.
    page.mouse.click(200, 450)
    page.wait_for_timeout(2000)

    # Web View map - go to web app
    page.mouse.click(200, 600)
    page.wait_for_timeout(2000)

    # Click Menu tab
    page.mouse.click(200, 760)
    page.wait_for_timeout(1000)

    # Click MODO DIREÇÃO on menu
    page.mouse.click(200, 250)
    page.wait_for_timeout(2000)

    page.screenshot(path="/home/jules/verification/screenshots/verification.png")

if __name__ == "__main__":
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
