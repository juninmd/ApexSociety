from playwright.sync_api import sync_playwright

def run_cuj(page):
    page.goto("http://localhost:3000")
    page.wait_for_timeout(2000)

    # Note: Application might redirect to login if not authenticated.
    try:
        page.fill('input[placeholder="Ex: DriftKingBR"]', 'test_user')
        page.fill('input[placeholder="Sua senha secreta"]', 'password123')

        login_btn = page.locator("text=ENTRAR").first
        if login_btn.is_visible():
            login_btn.click()
            page.wait_for_timeout(2000)
    except Exception as e:
        print("Login flow exception or not needed:", e)

    page.screenshot(path="/home/jules/verification/screenshots/post_login.png")

    # In this app architecture based on App.tsx, the paths for deep linking config:
    #             Main: {
    #                 screens: {
    #                     Map: 'map',
    #                     Events: 'events',
    #                     Menu: 'menu',
    #                     Crews: 'crews',
    #                     Profile: 'profile',
    #                 },
    #             },
    # Let's navigate to menu using JS clicking on the Bottom Tab Nav if possible
    try:
        menu_tab = page.locator('div[role="button"]:has-text("Menu")').first
        if menu_tab.is_visible():
            menu_tab.click()
            page.wait_for_timeout(2000)
        else:
             print("Menu div button not visible")
    except Exception as e:
        print("Menu tab error:", e)

    page.screenshot(path="/home/jules/verification/screenshots/menu.png")

    # Click on the AMIGOS button which should navigate to FriendsListScreen
    try:
        amigos_btn = page.locator("text=AMIGOS").first
        if amigos_btn.is_visible():
            amigos_btn.click()
            page.wait_for_timeout(2000)

            # Take screenshot of friends list
            page.screenshot(path="/home/jules/verification/screenshots/amigos.png")
            page.wait_for_timeout(1000)

            menu_tab = page.locator('div[role="button"]:has-text("Menu")').first
            if menu_tab.is_visible():
                menu_tab.click()
                page.wait_for_timeout(1000)
        else:
            print("AMIGOS button not visible")
    except Exception as e:
        print("AMIGOS button error:", e)

    # Click on NOTIFICAÇÕES button
    try:
        notif_btn = page.locator("text=NOTIFICAÇÕES").first
        if notif_btn.is_visible():
            notif_btn.click()
            page.wait_for_timeout(2000)

            # Take screenshot of notification center
            page.screenshot(path="/home/jules/verification/screenshots/notificacoes.png")
            page.wait_for_timeout(1000)
        else:
            print("NOTIFICAÇÕES button not visible")
    except Exception as e:
        print("NOTIFICAÇÕES button error:", e)

if __name__ == "__main__":
    import os
    os.makedirs("/home/jules/verification/screenshots", exist_ok=True)
    os.makedirs("/home/jules/verification/videos", exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos",
            viewport={"width": 375, "height": 812},
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
