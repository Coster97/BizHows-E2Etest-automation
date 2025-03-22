import { Page, Locator } from "@playwright/test";

export class DesignPage {
  readonly page: Page;
  readonly nextButton: Locator;
  readonly fileUploadOption: Locator;
  readonly fileAddButton: Locator;
  readonly fileInput: Locator;
  readonly fileDelete: Locator;
  readonly addCartButton: Locator;
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

  async selectDesignMethod() {
    await this.nextButton.waitFor({ state: "visible" });
    await this.nextButton.click();
    await this.fileUploadOption.waitFor({ state: "visible" });
    await this.fileUploadOption.click();
  }

  async selectDesignFile() {
    await this.page.$eval(
      'input[type="file"]',
      (el) => (el.style.display = "block")
    );
    await this.fileInput.setInputFiles("tests/fixtures/비즈하우스.pdf");

    await this.fileDelete.waitFor({ state: "visible" });
    await this.addCartButton.click();
  }
}
