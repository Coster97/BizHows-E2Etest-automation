import { Page, Locator } from "@playwright/test";

export class DesignPage {
  // 페이지
  readonly page: Page;
  // 상품 상세페이지 내 다음 버튼
  readonly nextButton: Locator;
  // 파일 업로드 옵션
  readonly fileUploadOption: Locator;
  // 파일 업로드 버튼
  readonly fileAddButton: Locator;
  // 파일 업로드 인풋
  readonly fileInput: Locator;
  // 파일 삭제 버튼
  readonly fileDelete: Locator;
  // 장바구니 담기 버튼
  readonly addCartButton: Locator;
  // 장바구니 페이지 타이틀
  readonly cartTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nextButton = page.locator("button[data-f='OM-e0a1']");
    this.fileUploadOption = page.locator("div[data-f='DD-62b2']", {
      hasText: "파일 업로드하기",
    });
    this.fileAddButton = page.locator("button[data-f='FB-db61']");
    this.fileInput = page.locator("input[data-f='FI-c147']");
    this.fileDelete = page.locator("div[data-f='FD-54f4']");
    this.addCartButton = page.locator(".css-1d6ioa8", {
      hasText: "장바구니 담기",
    });
    this.cartTitle = page.locator("div[data-f='HD-64cd']");
  }

  // 디자인 파일 업로드 옵션 선택
  async selectDesignFileMethod() {
    await this.nextButton.click({ trial: true });
    await this.nextButton.click();
    await this.fileUploadOption.click({ trial: true });
    await this.fileUploadOption.click();
  }

  // 디자인 파일 선택 및 업로드
  async selectDesignFile() {
    await this.page.$eval(
      'input[type="file"]',
      (el) => (el.style.display = "block")
    );
    await this.fileInput.setInputFiles("tests/fixtures/비즈하우스.pdf");

    await this.fileDelete.waitFor({ state: "visible" });
    await this.fileDelete.click({ trial: true });
    await this.addCartButton.click();
  }
}
