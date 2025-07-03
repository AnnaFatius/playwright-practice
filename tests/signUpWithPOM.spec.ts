import {test, expect } from "@playwright/test";
import BasePage from "../pom/BasePage";
import SignUpForm from "../pom/forms/SignUpForm";
import HomePage from "../pom/pages/HomePage";

let basePage: BasePage;
let homePage: HomePage;
let signUpForm: SignUpForm;

test.describe('Sign up tests', () => {
    
    test.beforeEach((async ({ page }) => {
    basePage = new BasePage(page);
    homePage = new HomePage(page);
    signUpForm = new SignUpForm(page);

    await homePage.open();
    await homePage.clickSignUpButton();
    }));

    test('Registration modal displays all required fields and buttons', async () => {
        await signUpForm.expectFormElementsToBeVisible();
    });

    test('Registration modal closes on close button click', async () => {
        await signUpForm.confirmSignUpModalClosed();
    });

    test('Valid user data in the registration form', async () => {
        const randomEmail = `aqa_${Date.now()}@testmail.com`;

        await signUpForm.enterDataInField(signUpForm.nameField, 'Alisa');
        await signUpForm.enterDataInField(signUpForm.lastNameField, 'Govard');
        await signUpForm.enterDataInField(signUpForm.emailField, randomEmail);
        await signUpForm.enterDataInField(signUpForm.passwordField, 'QWErtuiop86#');
        await signUpForm.enterDataInField(signUpForm.reEnterPasswordField, 'QWErtuiop86#');
        await signUpForm.clickRegisterButton();
    });

    test('Messages about an empty field and border color', async () => {
        await signUpForm.verifyEmptyFieldError(signUpForm.nameField, signUpForm.nameFieldError);
        await signUpForm.verifyEmptyFieldError(signUpForm.lastNameField, signUpForm.lastNameFieldError);
        await signUpForm.verifyEmptyFieldError(signUpForm.emailField, signUpForm.emailFieldError);
        await signUpForm.verifyEmptyFieldError(signUpForm.passwordField, signUpForm.passwordFieldError);
        await signUpForm.verifyEmptyFieldError(signUpForm.reEnterPasswordField, signUpForm.reEnterPasswordFieldError);
        await signUpForm.expectAllBordersToBeRed();
        await signUpForm.disabledRegisterButton();
    });

    test('Invalid user Name data in the registration form', async () => {  
        await signUpForm.enterDataInField(signUpForm.nameField, '&d');
        await signUpForm.verifyValidationErrorForField(signUpForm.nameFieldError, [
        'Name has to be from 2 to 20 characters long',
        'Name is invalid']);
        await signUpForm.disabledRegisterButton();
    });

    test('Invalid user Last Name data in the registration form', async () => {
        await signUpForm.enterDataInField(signUpForm.lastNameField, 'rdfrwkjvysjfrfdhjyvbgrd');
        await signUpForm.verifyValidationErrorForField(signUpForm.lastNameFieldError,[
        'Last name has to be from 2 to 20 characters long',
        'Last name is invalid']); 
        await signUpForm.disabledRegisterButton();
    });

    test('Invalid user Email data in the registration form', async () => { 
        await signUpForm.enterDataInField(signUpForm.emailField, 'mhgck67t');
        await signUpForm.verifyValidationErrorForField(signUpForm.emailFieldError, 'Email is incorrect');
        await signUpForm.disabledRegisterButton();
    });

    test('Invalid user Password and Re-enter Password data in the registration form', async () => {
        await signUpForm.enterDataInField(signUpForm.passwordField, 'mhkG7t');
        await signUpForm.verifyValidationErrorForField(signUpForm.passwordFieldError, 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');

        await signUpForm.enterDataInField(signUpForm.reEnterPasswordField, 'penkcoe');
        await signUpForm.verifyValidationErrorForField(signUpForm.reEnterPasswordFieldError,[
        'Passwords do not match',
        'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter']); 
        await signUpForm.disabledRegisterButton();
    });
})