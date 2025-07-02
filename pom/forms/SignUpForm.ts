import { expect, type Locator } from '@playwright/test';
import BasePage from '../BasePage';


export default class SignUpForm extends BasePage {

  private readonly signUpModal: Locator = this.page.locator('app-signup-modal');
  private readonly nameField: Locator = this.page.locator('#signupName');
  private readonly lastNameField: Locator = this.page.locator('#signupLastName');
  private readonly emailField: Locator = this.page.getByRole('textbox', { name: 'Email' });
  private readonly passwordField: Locator = this.page.locator('#signupPassword');
  private readonly reEnterPasswordField: Locator = this.page.locator('#signupRepeatPassword');        
  private readonly registerButton: Locator = this.page.getByText('Register');
  private readonly closeButton: Locator = this.page.locator('//button[@class="close"]');

  private readonly nameFieldError: Locator = this.page.locator('//input[@id="signupName"]//..//*[@class="invalid-feedback"]//p');
  private readonly lastNameFieldError: Locator = this.page.locator('//input[@id="signupLastName"]//..//*[@class="invalid-feedback"]//p');
  private readonly emailFieldError: Locator = this.page.locator('//input[@id="signupEmail"]//..//*[@class="invalid-feedback"]//p');
  private readonly passwordFieldError: Locator = this.page.locator('//input[@id="signupPassword"]//..//*[@class="invalid-feedback"]//p');
  private readonly reEnterPasswordFieldError: Locator = this.page.locator('//input[@id="signupRepeatPassword"]//..//*[@class="invalid-feedback"]//p');

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
  async closeSignUpModal(){
    await this.closeButton.click();
    await expect(this.signUpModal).toBeVisible({visible: false});
  }

  async enterName(value: string){
    await this.nameField.fill(value);
    await this.nameField.evaluate(el => el.blur());
  }

  async enterLastName(value: string){
    await this.lastNameField.fill(value);
    await this.lastNameField.evaluate(el => el.blur());
  }

  async enterRandomEmail(email: string){
    await this.emailField.fill(email);
    await this.emailField.evaluate(el => el.blur());
  }

  async enterEmail(value: string){
    await this.emailField.fill(value);
    await this.emailField.evaluate(el => el.blur());
  }

  async enterPassword(value: string){
    await this.passwordField.fill(value);
    await this.passwordField.evaluate(el => el.blur());
  }

  async enterReEnterPassword(value: string){
    await this.reEnterPasswordField.fill(value);
    await this.reEnterPasswordField.evaluate(el => el.blur());
  }

  async clickRegisterButton(){
    await this.registerButton.click();
  }

  async disabledRegisterButton(){
    await expect(this.registerButton).toBeDisabled();
  }

  async emptyNameFieldError(){
    await this.nameField.focus();
    await this.nameField.blur();
    await this.nameFieldError.isVisible();
  }

  async emptyLastNameFieldError(){
    await this.lastNameField.focus();
    await this.lastNameField.blur();
    await this.lastNameFieldError.isVisible();
  }

  async emptyEmailFieldError(){
    await this.emailField.focus();
    await this.emailField.blur();
    await this.emailFieldError.isVisible();
  }

  async emptyPasswordFieldError(){
    await this.passwordField.focus();
    await this.passwordField.blur();
    await this.passwordFieldError.isVisible();
  }

  async emptyReEnterPasswordFieldError(){
    await this.reEnterPasswordField.focus();
    await this.reEnterPasswordField.blur();
    await this.reEnterPasswordFieldError.isVisible();
  }

  async expectAllBordersToBeRed() {
    const redBorder = 'rgb(220, 53, 69)';
    await expect(this.nameField).toHaveCSS('border-color', redBorder);
    await expect(this.lastNameField).toHaveCSS('border-color', redBorder);
    await expect(this.emailField).toHaveCSS('border-color', redBorder);
    await expect(this.passwordField).toHaveCSS('border-color', redBorder);
    await expect(this.reEnterPasswordField).toHaveCSS('border-color', redBorder);
  }

  async invalidDataInNameField(messages: string[]) {
    const actualError = await this.nameFieldError.textContent();
    expect(messages).toContain(actualError);
  }

  async invalidDataInLastNameField(messages: string[]) {
    const actualError = await this.lastNameFieldError.textContent();
    expect(messages).toContain(actualError);
  }

  async invalidDataInEmailField(messages: string) {
    const actualError = await this.emailFieldError.textContent();
    expect(messages).toContain(actualError);
  }

  async invalidDataInPasswordField(messages: string) {
    const actualError = await this.passwordFieldError.textContent();
    expect(messages).toContain(actualError);
  }

  async invalidDataInReEnterPasswordField(messages: string[]) {
    const actualError = await this.reEnterPasswordFieldError.textContent();
    expect(messages).toContain(actualError);
  } 
}