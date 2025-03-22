import { Page, Locator } from "@playwright/test";

export class SignPage {
  // 페이지
  readonly page: Page;
  // 회원가입 버튼
  readonly signButton: Locator;
  // 회원가입 모달
  readonly signModal: Locator;
  // 구글로 시작하기 버튼
  readonly googleJoinButton: Locator;
  // 약관 및 필수정보 모달
  readonly termsModal: Locator;
  // 약관 동의 전체 선택 체크박스
  readonly termsCheckAll: Locator;
  // 약관 동의 하단 다음 버튼
  readonly termsNextButton: Locator;
  // 약관 미동의 가이드 메시지
  readonly termsCheckGuide: Locator;
  // 필수 정보 입력 필드
  readonly requiredInput: Locator;
  // 필수 정보 미입력 가이드 메시지
  readonly requiredInfo: Locator;
  // 필수 정보 제출 버튼
  readonly requiredInfoSubmmit: Locator;
  // 프로필 버튼
  readonly profileButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signButton = page.locator(".css-ntr3r1", { hasText: "회원가입" });
    this.signModal = page.locator("div[data-f='HC-05c9']");
    this.googleJoinButton = page.locator(".auth-modal-cache-1e8atw1");
    this.termsModal = page.locator("div[data-f='HC-05c9']");
    this.termsCheckAll = page.locator("input[data-f='FC-e0c0']");
    this.termsNextButton = page.locator('button:has-text("다음")');
    this.termsCheckGuide = page.locator("span[data-f='ES-2848']");
    this.requiredInput = page.locator("input[data-f='II-bd65']");
    this.requiredInfo = page.locator("div[data-f='IE-8c3f']");
    this.requiredInfoSubmmit = page.locator("button[data-f='FM-8db3']");
    this.profileButton = page.locator("button[data-f='MB-b42d']").nth(5);
  }

  // 비즈하우스 홈페이지로 이동
  async goto() {
    await this.page.goto("https://www.bizhows.com/", { waitUntil: "commit" });
  }

  // ---------- 구글 회원가입 ----------

  // 구글 소셜 회원가입
  async googleJoin(email: string, pass: string) {
    await this.signButton.click();
    await this.signModal.waitFor({ state: "visible" });

    await this.googleJoinButton.click();

    // 팝업 창이 열리는 것을 감지
    const popupPromise = this.page.context().waitForEvent("page");
    const popup = await popupPromise;

    await popup.waitForSelector("input[class*='whsOnd'][class*='zHQkBf']");
    await popup.fill('input[type="email"]', email);
    await popup.click("text=Next");

    await popup.fill('input[type="password"]', pass);
    await popup.click("text=Next");

    if (await popup.isVisible("button:has-text('계속')", { timeout: 1000 })) {
      await popup.locator("button:has-text('계속')").click();
    } else {
    }
  }

  // 회원가입 약관 동의 상태에서 제출 시도
  async termsCheck() {
    await this.termsModal.waitFor({ state: "visible" });
    await this.termsCheckAll.click();
    await this.termsNextButton.click();
  }

  // 회원가입 약관 미동의 상태에서 제출 시도
  async termsNoCheck() {
    await this.termsModal.waitFor({ state: "visible" });
    await this.termsNextButton.click();
  }

  // 회원가입 약관 미동의 시 약관 동의 요구 가이드 출력 확인
  async getTermsCheckGuid() {
    await this.termsCheckGuide.waitFor({
      state: "visible",
    });
    return this.termsCheckGuide.textContent();
  }

  // 회원가입 필수 정보 입력 (이름)
  async fillRequiredInfo(name: string) {
    await this.termsModal.waitFor({ state: "visible" });
    await this.requiredInput.fill(name);
    await this.requiredInfoSubmmit.click();
  }

  // 회원가입 필수 정보 미입력 시 입력 요구 가이드 출력 확인
  async getRequiredInfoGuide() {
    await this.termsModal.waitFor({ state: "visible" });
    return this.requiredInfo.textContent();
  }
}
