import { Page, Locator } from "@playwright/test";

export class CartPage {
  // 페이지
  readonly page: Page;

  // 전체 항목 체크박스
  readonly allCheckBox: Locator;
  // 전체 항목 체크박스 상태
  readonly allCheckBoxStatus: Locator;

  // 첫 번째 상품 체크박스
  readonly firstCheckBox: Locator;
  // 첫 번째 상품 체크박스 상태
  readonly firstCheckBoxStatus: Locator;

  // 선택 삭제 버튼
  readonly deleteCheckedButton: Locator;
  // 삭제 모달
  readonly deleteConfirmModal: Locator;
  // 삭제 모달 > 확인 버튼
  readonly deleteConfirmButton: Locator;

  // 첫 번째 상품 정보 (아이템, 이름, 옵션, 디자인옵션, 가격)
  readonly firstItem: Locator;
  readonly firstItemName: Locator;
  readonly firstItemOption: Locator;
  readonly firstItemDesignOption: Locator;
  readonly firstItemPrice: Locator;

  // 빈 장바구니 안내 텍스트
  readonly emptyCartText: Locator;
  // 장바구니 상품 추가 버튼
  readonly addItemButton: Locator;

  // 주문하기 버튼
  readonly orderButton: Locator;

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
    this.deleteCheckedButton = page.locator("button[data-f='HT-b472']");
    this.deleteConfirmModal = page.locator("div[data-f='MD-0757']");
    this.deleteConfirmButton = page.locator(".css-jnkmry", {
      hasText: "삭제",
    });

    this.firstItem = page.locator("div[data-f='UD-668d']").nth(0);
    this.firstItemName = this.firstItem.locator("h3[data-f='US-7a77']");
    this.firstItemOption = this.firstItem
      .locator("li[data-f='UL-7371']")
      .nth(0);
    this.firstItemDesignOption = this.firstItem.locator(
      "span[data-f='DH-44ec']"
    );
    this.firstItemPrice = this.firstItem.locator("span[data-f='UT-3003']");

    this.emptyCartText = this.page.locator("figcaption[data-f='SD-3b41']");
    this.addItemButton = this.page.locator("button[data-f='CB-e46e']");

    this.orderButton = this.page.locator('button:has-text("주문하기")');
  }

  // 전체 상품 개수 확인
  async countItems() {
    await this.page.waitForSelector("div[data-f='UD-668d']", {
      state: "visible",
    });
    return await this.page.locator("div[data-f='UD-668d']").count();
  }

  // 첫 번째 상품 정보 리턴
  async firstItemInfo() {
    const name = await this.firstItemName.textContent();
    const option = await this.firstItemOption.textContent();
    const designOption = await this.firstItemDesignOption.textContent();
    const price = await this.firstItemPrice.textContent();

    // 출력 예 : 기본 명함 코팅스노우 219g 파일주문 10,600원
    return `${name ?? ""} ${option ?? ""} ${designOption ?? ""} ${price ?? ""}`;
  }

  // 전체 아이템 선택
  async selectAllCheckBox() {
    const boxStatus = await this.allCheckBoxStatus.textContent();

    if (boxStatus === "false") {
      await this.allCheckBox.click();
    }
  }

  // 선택 아이템 삭제
  async deleteCheckedBox() {
    await this.deleteCheckedButton.click();
    await this.deleteConfirmModal.waitFor({ state: "visible" });
    await this.deleteConfirmButton.click();
  }
}
