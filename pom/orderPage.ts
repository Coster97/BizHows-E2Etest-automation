import { Page, Locator } from "@playwright/test";

export class OrderPage {
  // 페이지
  readonly page: Page;

  // 주문 상품 개수
  readonly orderItemCount: Locator;

  // 첫 번째 상품 정보 (아이템, 이름, 옵션, 디자인옵션, 가격)
  readonly firstItem: Locator;
  readonly firstItemName: Locator;
  readonly firstItemOption: Locator;
  readonly firstItemDesignOption: Locator;
  readonly firstItemPrice: Locator;

  // 주문자 정보 > 연락처 인풋
  readonly userPhone: Locator;

  // ---------- 배송지정보 ----------
  // 연락처
  readonly deliveryPhone: Locator;
  // 우편번호 찾기 버튼
  readonly zipCodeButton: Locator;
  // 주소 검색 모달
  readonly addressModal: Locator;
  // 도로명 주소 인풋
  readonly address1Input: Locator;
  // 상세주소 인풋
  readonly address2Input: Locator;
  // 요청 사항 리스트 드롭다운
  readonly deliveryMemoDropdown: Locator;
  // 요청 사항 드롭다운 열림 확인용 (요청 사항)
  readonly deliveryMemo: Locator;

  // 결제수단 > 신용카드
  readonly paymentCreditCard: Locator;
  // 주문내용 확인 및 결과동의 체크박스
  readonly agreePayment: Locator;
  // 결제하기 버튼
  readonly payButton: Locator;

  // ---------- 필수 항목 미설정 에러 확인 ----------

  // 주문자 연락처 미입력 에러 아이콘
  readonly userPhoneEmptyIcon: Locator;
  // 주문내용 확인 및 결과동의 체크박스 미설정 에러 아이콘
  readonly agreePaymentErrorMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.orderItemCount = page.locator("span[data-f='CC-cacc']");

    this.firstItem = page.locator("li[data-f='CL-6fd5']").nth(0);
    this.firstItemName = this.firstItem.locator("h3[data-f='CT-ea6a']");
    this.firstItemOption = this.firstItem
      .locator("li[data-f='CL-2fc3']")
      .nth(0);
    this.firstItemDesignOption = this.firstItem.locator("h3[data-f='NH-ccc4']");
    this.firstItemPrice = this.firstItem.locator("span[data-f='CP-7db1']");

    this.payButton = this.page.locator("button[data-f='SB-82be']");

    this.userPhone = this.page.locator(
      'section:nth-of-type(2) input[id="mobileNo"]'
    );

    this.deliveryPhone = this.page.locator(
      `section:nth-of-type(3) input[id="mobileNo"]`
    );
    this.zipCodeButton = this.page.locator("button[data-f='AB-5caa']");
    this.address2Input = this.page.locator("input[data-f='AO-943b']");

    this.deliveryMemoDropdown = this.page.locator("button[data-f='DB-1daf']");
    this.deliveryMemo = this.page.locator("li[data-f='DO-0301']").nth(0);

    this.paymentCreditCard = this.page.locator("input[data-f='PV-8f45']", {
      hasText: "신용카드",
    });

    this.agreePayment = this.page.locator("label[data-f='CL-48fc']").nth(0);

    this.userPhoneEmptyIcon = this.page.locator(
      'section:nth-child(2) div[data-f="ID-6508"] span[data-f="OS-0ac9"]'
    );
    this.agreePaymentErrorMessage = this.page.locator("p[data-f='ST-1e8c']");
  }

  // 주문 예정 상품 개수 카운트
  async orderItemCounting() {
    return await this.orderItemCount.textContent();
  }
  // 첫 번째 상품 정보 리턴
  async firstItemInfo() {
    const name = await this.firstItemName.textContent();
    const option = await this.firstItemOption.textContent();
    const designOption = await this.firstItemDesignOption.textContent();
    const price = await this.firstItemPrice.textContent();

    // 출력 예 : 기본 명함 코팅스노우 219g 파일 주문 10,600원
    return `${name ?? ""} ${option ?? ""} ${designOption ?? ""} ${price ?? ""}`;
  }

  // 주문자 정보(연락처) 입력
  async fillUserInfo(userPhoneNum: string) {
    await this.userPhone.waitFor({ state: "attached" });
    await this.userPhone.fill(userPhoneNum);
  }

  // 배송지 정보(연락처) 입력
  async fillDeliveryInfo(deliveryPhoneNum: string) {
    await this.deliveryPhone.waitFor({ state: "attached" });
    await this.deliveryPhone.fill(deliveryPhoneNum);
  }
  // 배송지 정보(배송메모) 설정
  async setDeliveryMemo(memo: string) {
    await this.deliveryMemoDropdown.click();
    await this.deliveryMemo.waitFor({ state: "visible" });

    const deliveryMemo = this.page.locator("li[data-f='DO-0301']", {
      hasText: `${memo}`,
    });

    await deliveryMemo.click();
  }

  // 신용카드, 계좌이체 옵션에 한하여 결제 옵션을 선택할 수 있는 함수
  async setPaymentOption(option: string) {
    await this.page
      .locator("input[data-f='PV-8f45']", {
        hasText: `${option}`,
      })
      .click();
  }
}
