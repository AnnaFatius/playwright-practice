import { expect, type Locator, type Page } from '@playwright/test';
import BasePage from '../BasePage';


export default class HomePage extends BasePage{
  private readonly signUnButton: Locator = this.page.locator('//button[contains(@class,"btn-primary")]');

    async open(){
        await this.page.goto('');
      }

    async clickSignUpButton (){
        await this.signUnButton.click();
    }


}