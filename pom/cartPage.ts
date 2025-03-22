import { Page, Locator } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly allCheckBox: Locator;
  readonly allCheckBoxStatus: Locator;
  readonly firstCheckBox: Locator;
  readonly firstCheckBoxStatus: Locator;

  readonly firstItem: Locator;
  readonly firstItemName: Locator;
  readonly firstItemOption: Locator;
  readonly firstItemDesignOption: Locator;
  readonly firstItemPrice: Locator;

  constructor(page: Page) {
    this.page = page;
    this.allCheckBox = page.locator("label[data-f='HC-7ac4']");
    this.allCheckBoxStatus = this.allCheckBox.locator(
      "input[data-f='HC-36f1']"
    );
    this.firstCheckBox = page.locator("label[data-f='UL-f2a6']").nth(0);
    this.firstCheckBoxStatus = this.firstCheckBox.locator(
      "input[data-f='UC-55c7']"
    );

    this.firstItem = page.locator("div[data-f='UD-668d']").nth(0);
    this.firstItemName = this.firstItem.locator("h3[data-f='US-7a77']");
    this.firstItemOption = this.firstItem
      .locator("li[data-f='UL-7371']")
      .nth(0);
    this.firstItemDesignOption = this.firstItem.locator(
      "span[data-f='DH-44ec']"
    );
    this.firstItemPrice = this.firstItem.locator("span[data-f='UT-3003']");
  }

  async firstItemInfo() {
    const name = await this.firstItemName.textContent();
    const option = await this.firstItemOption.textContent();
    const designOption = await this.firstItemDesignOption.textContent();
    const price = await this.firstItemPrice.textContent();

    // 출력 예 : 기본 명함 코팅스노우 219g 파일주문 10,600원
    return `${name ?? ""} ${option ?? ""} ${designOption ?? ""} ${price ?? ""}`;
  }

  async checkItem() {
    const getAllCheckBoxStatus = await this.allCheckBoxStatus.getAttribute(
      "aria-checked"
    );

    if (getAllCheckBoxStatus === "false") {
      await this.allCheckBox.click();
    }
  }
}
