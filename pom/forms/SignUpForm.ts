import { expect, type Locator } from '@playwright/test';
import BasePage from '../BasePage';


export default class SignUpForm extends BasePage {

  public readonly signUpModal: Locator = this.page.locator('app-signup-modal');
  public readonly nameField: Locator = this.page.locator('#signupName');
  public readonly lastNameField: Locator = this.page.locator('#signupLastName');
  public readonly emailField: Locator = this.page.getByRole('textbox', { name: 'Email' });
  public readonly passwordField: Locator = this.page.locator('#signupPassword');
  public readonly reEnterPasswordField: Locator = this.page.locator('#signupRepeatPassword');        
  public readonly registerButton: Locator = this.page.getByText('Register');
  public readonly closeButton: Locator = this.page.locator('//button[@class="close"]');

  public readonly nameFieldError: Locator = this.page.locator('//input[@id="signupName"]//..//*[@class="invalid-feedback"]//p');
  public readonly lastNameFieldError: Locator = this.page.locator('//input[@id="signupLastName"]//..//*[@class="invalid-feedback"]//p');
  public readonly emailFieldError: Locator = this.page.locator('//input[@id="signupEmail"]//..//*[@class="invalid-feedback"]//p');
  public readonly passwordFieldError: Locator = this.page.locator('//input[@id="signupPassword"]//..//*[@class="invalid-feedback"]//p');
  public readonly reEnterPasswordFieldError: Locator = this.page.locator('//input[@id="signupRepeatPassword"]//..//*[@class="invalid-feedback"]//p');

  async expectFormElementsToBeVisible() {
    await expect(this.nameField).toBeVisible();
    await expect(this.lastNameField).toBeVisible();
    await expect(this.emailField).toBeVisible();
    await expect(this.passwordField).toBeVisible();
    await expect(this.reEnterPasswordField).toBeVisible();
    await expect(this.closeButton).toBeVisible();
    await expect(this.registerButton).toBeVisible();
    await expect(this.registerButton).toBeDisabled();
  }

  async confirmSignUpModalClosed(){
    await this.closeButton.click();
    await expect(this.signUpModal).toBeVisible({visible: false});
  }

  async clickRegisterButton(){
    await this.registerButton.click();
  }

  async disabledRegisterButton(){
    await expect(this.registerButton).toBeDisabled();
  }

  async enterDataInField(field: Locator, value: string){
    await field.fill(value);
    await field.evaluate(el => el.blur());
  }

  async verifyEmptyFieldError(field: Locator, fieldError: Locator){
    await field.focus();
    await field.evaluate(el => el.blur());
    await fieldError.isVisible();
  }

  async verifyValidationErrorForField(errorLocator: Locator, expectedMessages: string | string[]){
    const actualError = await errorLocator.textContent();
    expect(expectedMessages).toContain(actualError);
  }

  async expectAllBordersToBeRed() {
    const redBorder = 'rgb(220, 53, 69)';
    await expect(this.nameField).toHaveCSS('border-color', redBorder);
    await expect(this.lastNameField).toHaveCSS('border-color', redBorder);
    await expect(this.emailField).toHaveCSS('border-color', redBorder);
    await expect(this.passwordField).toHaveCSS('border-color', redBorder);
    await expect(this.reEnterPasswordField).toHaveCSS('border-color', redBorder);
  }
}