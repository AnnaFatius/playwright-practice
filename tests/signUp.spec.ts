
// кнопка не активна поки не будуть введені коректні дані
// <span _ngcontent-ruu-c48="" aria-hidden="true">×</span> працює

import test, { expect } from "@playwright/test";

test.beforeEach((async ({ page }) => {
    await page.goto('');
}));

test.describe('Sign up tests', () => {


    test('Valid user data in the registration form', async ({ page }) => {
        const signUnButton = page.locator('//button[contains(@class,"btn-primary")]');
        const nameField = page.locator('#signupName');
        const lastNameField = page.locator('#signupLastName');
        const emailField = page.getByRole('textbox', { name: 'Email' });
        const randomEmail = `aqa_${Date.now()}@testmail.com`;
        const passwordField = page.locator('#signupPassword');
        const reEnterPasswordField = page.locator('#signupRepeatPassword');        
        const registerButton = page.getByText('Register');

        await signUnButton.click(); 
        await nameField.fill('Alisa');
        await lastNameField.fill('Govard');
        await emailField.fill(randomEmail);
        await passwordField.fill('QWErtuiop86#');
        await reEnterPasswordField.fill('QWErtuiop86#');
        await registerButton.click();
    });

    test('Messages about an empty field and border color', async ({page}) => {
        const signUnButton = page.locator('//button[contains(@class,"btn-primary")]');
        const nameField = page.locator('#signupName');
        const lastNameField = page.locator('#signupLastName');
        const emailField = page.getByRole('textbox', { name: 'Email' });
        const passwordField = page.locator('#signupPassword');
        const reEnterPasswordField = page.locator('#signupRepeatPassword');

        const nameFieldError = page.locator('//input[@id="signupName"]//..//*[@class="invalid-feedback"]//p');
        const lastNameFieldError = page.locator('//input[@id="signupLastName"]//..//*[@class="invalid-feedback"]//p');
        const emailFieldError = page.locator('//input[@id="signupEmail"]//..//*[@class="invalid-feedback"]//p');
        const passwordFieldError = page.locator('//input[@id="signupPassword"]//..//*[@class="invalid-feedback"]//p');
        const reEnterPasswordFieldError = page.locator('//input[@id="signupRepeatPassword"]//..//*[@class="invalid-feedback"]//p');

        await signUnButton.click(); 
        await nameField.focus();
        await lastNameField.focus();
        await emailField.focus();
        await passwordField.focus();
        await reEnterPasswordField.focus();
        await passwordField.focus();

        await expect(nameFieldError).toContainText('Name required');
        await expect(lastNameFieldError).toContainText('Last name required');
        await expect(emailFieldError).toContainText('Email required');
        await expect(passwordFieldError).toContainText('Password required');
        await expect(reEnterPasswordFieldError).toContainText('Re-enter password required');   
        
        await expect(page.locator('#signupName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator('#signupLastName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator('#signupEmail')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator('#signupPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator('#signupRepeatPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('Invalid user data in the registration form', async ({page}) => {
        const signUnButton = page.locator('//button[contains(@class,"btn-primary")]');
        const nameField = page.locator('#signupName');
        const lastNameField = page.locator('#signupLastName');
        const emailField = page.getByRole('textbox', { name: 'Email' });
        const passwordField = page.locator('#signupPassword');
        const reEnterPasswordField = page.locator('#signupRepeatPassword');
        const registerButton = page.getByText('Register');

        await signUnButton.click(); 

        //name
        await nameField.fill('&d');
        await nameField.evaluate(el => el.blur());
        const nameFieldError = page.locator('//input[@id="signupName"]//..//*[@class="invalid-feedback"]//p');
        const nameErrorText = await nameFieldError.textContent();
        expect([
        'Name has to be from 2 to 20 characters long',
        'Name is invalid'
        ]).toContain(nameErrorText);

        //last name
        await lastNameField.fill('rdfrwkjvysjfrfdhjyvbgrd');
        await lastNameField.evaluate(el => el.blur());
        const lastNameFieldError = page.locator('//input[@id="signupLastName"]//..//*[@class="invalid-feedback"]//p');
        const lastNameErrorText = await lastNameFieldError.textContent();
        expect([
        'Last name has to be from 2 to 20 characters long',
        'Last name is invalid'
        ]).toContain(lastNameErrorText);

        //email
        await emailField.fill('ohjhgc76');
        await emailField.evaluate(el => el.blur());
        const emailFieldError = page.locator('//input[@id="signupEmail"]//..//*[@class="invalid-feedback"]//p');
        await expect(emailFieldError).toContainText('Email is incorrect');

        //password
        await passwordField.fill('ojnaGbf');
        await passwordField.evaluate(el => el.blur());
        const passwordFieldError = page.locator('//input[@id="signupPassword"]//..//*[@class="invalid-feedback"]//p');
        await expect(passwordFieldError).toContainText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');

        //password2
        await reEnterPasswordField.fill('penkcoe');
        await reEnterPasswordField.evaluate(el => el.blur());
        const reEnterPasswordFieldError = page.locator('//input[@id="signupRepeatPassword"]//..//*[@class="invalid-feedback"]//p');
        const errorText = await reEnterPasswordFieldError.textContent();
        expect([
        'Passwords do not match',
        'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
        ]).toContain(errorText); 

        await expect(page.locator('#signupName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator('#signupLastName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator('#signupEmail')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator('#signupPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(page.locator('#signupRepeatPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');

        //register Button
        await registerButton.isDisabled();
    });

});