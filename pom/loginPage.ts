import { Page, Locator } from "@playwright/test";

export class LoginPage {
  // 페이지
  readonly page: Page;
  // 로그인 모달
  readonly loginModal: Locator;
  // 로그인 버튼
  readonly loginButton: Locator;
  // 구글 로그인 버튼
  readonly googleLoginButton: Locator;
  // 프로필 버튼
  readonly profileButton: Locator;
  // 회원가입 약관 동의 모달
  readonly termsModal: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginModal = page.locator("div[data-f='HC-05c9']");
    this.loginButton = page.locator(".css-ntr3r1", { hasText: "로그인" });
    this.googleLoginButton = page.locator(".auth-modal-cache-17tk4rp");
    this.profileButton = page.locator("button[data-f='MB-b42d']").nth(5);
    this.termsModal = page.locator("div[data-f='HC-05c9']");
  }

  // 비즈하우스 홈페이지로 이동
  async goto() {
    await this.page.goto("https://www.bizhows.com/", { waitUntil: "commit" });
  }

  // ---------- 구글 로그인 ----------

  // 구글 로그인
  async googleLogin(email: string, pass: string) {
    await this.loginButton.click();
    await this.loginModal.waitFor({
      state: "visible",
    });
    await this.googleLoginButton.click();

    // 팝업 창이 열리는 것을 감지
    const popupPromise = this.page.context().waitForEvent("page");
    const popup = await popupPromise;

    await popup.waitForSelector("input[class*='whsOnd'][class*='zHQkBf']");
    await popup.fill('input[type="email"]', email);
    await popup.click("text=Next");

    await popup.fill('input[type="password"]', pass);
    await popup.click("text=Next");
  }
}
