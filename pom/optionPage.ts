import { Page, Locator } from "@playwright/test";

export class OptionPage {
  // 페이지
  readonly page: Page;
  // 상세페이지 아이템 이름
  readonly itemTitle: Locator;
  // 라벨 목록
  readonly labelList: Locator;
  // 드롭다운 리스트
  readonly dropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.itemTitle = page.locator("div[data-f='DD-7627']");
    this.labelList = page.locator("div[data-f='OL-c464']");
    this.dropdown = page.locator("div[data-f='OO-402f']");
  }

  // // 옵션 선택 및 적용 확인
  // async selectOption(labelText: string, optionText: string) {
  //   await this.labelList.waitFor({ state: "visible" });

  //   const labelBlock = this.page.locator(
  //     `div[data-f="DW-46b9"]:has(span[data-f="DT-1899"]:has-text("${labelText}"))`
  //   );

  //   const dropdownTrigger = labelBlock.locator("div[data-f='DC-ffdc']");
  //   await dropdownTrigger.click();

  //   const optionList = labelBlock.locator("div[data-f='OG-1d41']");
  //   await optionList.waitFor({ state: "visible" });

  //   const option = optionList.locator(
  //     `div[data-f='OD-289a']:has-text("${optionText}")`
  //   );
  //   const setOptionText = labelBlock.locator("div[data-f='OT-4420']");

  //   await this.dropdown.waitFor({ state: "visible" });
  //   await option.click();
  //   await this.dropdown.waitFor({ state: "detached" });

  //   return await setOptionText.textContent();
  // }

  async selectOption(labelText: string, optionText: string) {
    await this.labelList.waitFor({ state: "visible" });

    const labelBlock = this.page.locator(
      `div[data-f="DW-46b9"]:has(span[data-f="DT-1899"]:has-text("${labelText}"))`
    );

    const dropdownTrigger = labelBlock.locator("div[data-f='OD-6f12']");
    await dropdownTrigger.click();

    const dropdown = labelBlock.locator("div[data-f='OG-1d41']");
    await dropdown.waitFor({ state: "visible" });

    const option = dropdown.locator(
      `div[data-f='OD-289a']:has-text("${optionText}")`
    );
    await option.click();

    // ✅ selectedOptionList 파라미터 붙을 때까지 기다림
    await this.page.waitForFunction(() => {
      return window.location.href.includes("selectedOptionList");
    });

    // ✅ 그 다음 1초 대기
    await this.page.waitForTimeout(1000);

    const selectedOption = dropdownTrigger.locator("div[data-f='OT-4420']");

    return await selectedOption.textContent();
  }
}
