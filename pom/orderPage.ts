import { Page, Locator } from "@playwright/test";

export class OrderPage {
  readonly page: Page;
  readonly firstItem: Locator;
  readonly firstItemName: Locator;
  readonly firstItemOption: Locator;
  readonly firstItemDesignOption: Locator;
  readonly firstItemPrice: Locator;
  readonly payButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.firstItem = page.locator("li[data-f='CL-6fd5']").nth(0);
    this.firstItemName = this.firstItem.locator("h3[data-f='CT-ea6a']");
    this.firstItemOption = this.firstItem
      .locator("li[data-f='CL-2fc3']")
      .nth(0);
    this.firstItemDesignOption = this.firstItem.locator("h3[data-f='NH-ccc4']");
    this.firstItemPrice = this.firstItem.locator("span[data-f='CP-7db1']");

    this.payButton = this.page.locator("button[data-f='SB-82be']");
  }

  async firstItemInfo() {
    const name = await this.firstItemName.textContent();
    const option = await this.firstItemOption.textContent();
    const designOption = await this.firstItemDesignOption.textContent();
    const price = await this.firstItemPrice.textContent();

    // 출력 예 : 기본 명함 코팅스노우 219g 파일 주문 10,600원
    return `${name ?? ""} ${option ?? ""} ${designOption ?? ""} ${price ?? ""}`;
  }
}
