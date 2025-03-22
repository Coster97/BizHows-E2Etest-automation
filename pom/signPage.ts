import { Page, Locator } from "@playwright/test";

export class SignPage {
  // 페이지
  readonly page: Page;
  // 회원가입 버튼
  readonly signButton: Locator;
  // 구글로 시작하기 버튼
  readonly googleJoinButton: Locator;
  // 약관 동의 전체 선택 체크박스
  readonly termsCheckAll: Locator;
  // 약관 동의 하단 다음 버튼
  readonly termsNextButton: Locator;
  // 약관 미동의 가이드 메시지
  readonly termsCheckGuide: Locator;
  // 필수 정보 미입력 가이드 메시지
  readonly requiredInfo: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signButton = page.locator(".css-ntr3r1", { hasText: "회원가입" });
    this.googleJoinButton = page.locator(".auth-modal-cache-1e8atw1");
    this.termsCheckAll = page.locator("input[data-f='FC-e0c0']");
    this.termsNextButton = page.locator('button:has-text("다음")');
    this.termsCheckGuide = page.locator("span[data-f='ES-2848']");
    this.requiredInfo = page.locator(".auth-modal-cache-bivg7p");
  }

  async goto() {
    await this.page.goto("https://www.bizhows.com/", { waitUntil: "commit" });
  }

  async googleJoin(email: string, pass: string) {
    await this.signButton.click();
    await this.page.waitForSelector(".auth-modal-cache-135ljes", {
      state: "visible",
    });
    await this.googleJoinButton.click();

    // 팝업 창이 열리는 것을 감지
    const popupPromise = this.page.context().waitForEvent("page");
    const popup = await popupPromise;

    await popup.waitForSelector("input[class*='whsOnd'][class*='zHQkBf']");
    await popup.fill('input[type="email"]', email);
    await popup.click("text=Next");

    await popup.fill('input[type="password"]', pass);
    await popup.click("text=Next");

    // 비즈하우스 계정 이용 동의 "계속" 버튼이 2초 안에 나타나면 클릭, 없으면 스킵
    if (await popup.isVisible("button:has-text('계속')", { timeout: 2000 })) {
      await popup.locator("button:has-text('계속')").click();
    } else {
    }
  }

  async termsCheck() {
    await this.page.waitForSelector(".auth-modal-cache-135ljes");
    await this.termsCheckAll.click();
    await this.termsNextButton.click();
  }

  async termsNoCheck() {
    await this.page.waitForSelector(".auth-modal-cache-135ljes");
    await this.termsNextButton.click();
  }

  async getTermsCheckGuid() {
    await this.page.waitForSelector("span[data-f='ES-2848']", {
      state: "visible",
    });
    return this.termsCheckGuide.textContent();
  }

  async fillRequiredInfo(name: string) {
    await this.page.waitForSelector(".auth-modal-cache-135ljes");
    await this.page.fill("input[data-f='II-bd65']", name);
    await this.page.locator("button[data-f='FM-8db3']").click();
  }

  async getRequiredInfoGuide() {
    await this.page.waitForSelector(".auth-modal-cache-bivg7p");
    return this.requiredInfo.textContent();
  }
}
