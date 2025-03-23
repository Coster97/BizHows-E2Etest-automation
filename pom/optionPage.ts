import { Page, Locator } from "@playwright/test";

export class OptionPage {
  // 페이지
  readonly page: Page;
  // 상세페이지 아이템 이름
  readonly itemTitle: Locator;
  // 라벨 목록
  readonly labelList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.itemTitle = page.locator("div[data-f='DD-7627']");
    this.labelList = page.locator("div[data-f='OL-c464']");
  }

  // 옵션 선택 및 적용 확인
  async selectOption(labelText: string, optionText: string) {
    await this.labelList.waitFor({ state: "visible" });

    const labelBlock = this.page.locator(
      `div[data-f="DW-46b9"]:has(span[data-f="DT-1899"]:has-text("${labelText}"))`
    );

    const dropdownTrigger = labelBlock.locator("div[data-f='DC-ffdc']");
    await dropdownTrigger.click();

    const optionList = labelBlock.locator("div[data-f='OG-1d41']");
    await optionList.waitFor({ state: "visible" });

    const option = optionList.locator(
      `div[data-f='OD-289a']:has-text("${optionText}")`
    );
    await option.click();

    await this.page.waitForTimeout(3000);

    // 실제 반영된 옵션 값 확인 (텍스트 변경 기다림)
    return await dropdownTrigger.locator("div[data-f='OT-4420']").textContent();
  }
}
