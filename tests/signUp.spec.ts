import test, { expect, type Locator } from "@playwright/test";

let signUnButton: Locator, 
nameField: Locator, 
lastNameField: Locator, 
emailField: Locator, 
passwordField: Locator, 
reEnterPasswordField: Locator,
registerButton: Locator,
nameFieldError: Locator,
lastNameFieldError: Locator,
emailFieldError: Locator,
passwordFieldError: Locator,
reEnterPasswordFieldError: Locator,
closeButton: Locator


test.beforeEach((async ({ page }) => {
    await page.goto('');
    signUnButton = page.locator('//button[contains(@class,"btn-primary")]');
    nameField = page.locator('#signupName');
    lastNameField = page.locator('#signupLastName');
    emailField = page.getByRole('textbox', { name: 'Email' });
    passwordField = page.locator('#signupPassword');
    reEnterPasswordField = page.locator('#signupRepeatPassword');        
    registerButton = page.getByText('Register');
    nameFieldError = page.locator('//input[@id="signupName"]//..//*[@class="invalid-feedback"]//p');
    lastNameFieldError = page.locator('//input[@id="signupLastName"]//..//*[@class="invalid-feedback"]//p');
    emailFieldError = page.locator('//input[@id="signupEmail"]//..//*[@class="invalid-feedback"]//p');
    passwordFieldError = page.locator('//input[@id="signupPassword"]//..//*[@class="invalid-feedback"]//p');
    reEnterPasswordFieldError = page.locator('//input[@id="signupRepeatPassword"]//..//*[@class="invalid-feedback"]//p');
    closeButton = page.locator('//button[@class="close"]');
    await signUnButton.click();
}));

test.describe('Sign up tests', () => {
    
    test('Displaying all items in the "Registration" pop-up window', async ({page}) => {
        await expect(nameField).toBeVisible();
        await expect(lastNameField).toBeVisible();
        await expect(emailField).toBeVisible();
        await expect(passwordField).toBeVisible();
        await expect(reEnterPasswordField).toBeVisible();
        await expect(closeButton).toBeVisible();
        await expect(registerButton).toBeVisible();
        await expect(registerButton).toBeDisabled();
    });

    test('Valid user data in the registration form', async ({ page }) => {
        const randomEmail = `aqa_${Date.now()}@testmail.com`;

        await nameField.fill('Alisa');
        await lastNameField.fill('Govard');
        await emailField.fill(randomEmail);
        await passwordField.fill('QWErtuiop86#');
        await reEnterPasswordField.fill('QWErtuiop86#');
        await registerButton.click();
    });

    test('Messages about an empty field and border color', async ({page}) => {

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
        await registerButton.isDisabled();
    });

    test('Invalid user data in the registration form', async ({page}) => {

        //name
        await nameField.fill('&d');
        await nameField.evaluate(el => el.blur());
        const nameErrorText = await nameFieldError.textContent();
        expect([
        'Name has to be from 2 to 20 characters long',
        'Name is invalid'
        ]).toContain(nameErrorText);

        //last name
        await lastNameField.fill('rdfrwkjvysjfrfdhjyvbgrd');
        await lastNameField.evaluate(el => el.blur());
        const lastNameErrorText = await lastNameFieldError.textContent();
        expect([
        'Last name has to be from 2 to 20 characters long',
        'Last name is invalid'
        ]).toContain(lastNameErrorText);

        //email
        await emailField.fill('ohjhgc76');
        await emailField.evaluate(el => el.blur());
        await expect(emailFieldError).toContainText('Email is incorrect');

        //password
        await passwordField.fill('ojnaGbf');
        await passwordField.evaluate(el => el.blur());
        await expect(passwordFieldError).toContainText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');

        //password2
        await reEnterPasswordField.fill('penkcoe');
        await reEnterPasswordField.evaluate(el => el.blur());
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