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

    test('Displaying all items in the "Registration" pop-up window', async () => {
        await signUpForm.expectFormElementsToBeVisible();
    });

    test('Close button in the "Registration" pop-up window', async () => {
        await signUpForm.closeSignUpModal();
    });

    test('Valid user data in the registration form', async () => {
        const randomEmail = `aqa_${Date.now()}@testmail.com`;

        await signUpForm.enterName('Alisa');
        await signUpForm.enterLastName('Govard');
        await signUpForm.enterRandomEmail(randomEmail);
        await signUpForm.enterPassword('QWErtuiop86#');
        await signUpForm.enterReEnterPassword('QWErtuiop86#');
        await signUpForm.clickRegisterButton();
    });

    test('Messages about an empty field and border color', async () => {
        await signUpForm.emptyNameFieldError();
        await basePage.verifyErrorIsDisplayed('Name required');

        await signUpForm.emptyLastNameFieldError();
        await basePage.verifyErrorIsDisplayed('Last name required');

        await signUpForm.emptyEmailFieldError();
        await basePage.verifyErrorIsDisplayed('Email required');

        await signUpForm.emptyPasswordFieldError();
        await basePage.verifyErrorIsDisplayed('Password required');

        await signUpForm.emptyReEnterPasswordFieldError();
        await basePage.verifyErrorIsDisplayed('Re-enter password required');

        await signUpForm.expectAllBordersToBeRed();
    });

    test('Invalid user data in the registration form', async () => {
        
    //name
    await signUpForm.enterName('&d');
    await signUpForm.invalidDataInNameField([
    'Name has to be from 2 to 20 characters long',
    'Name is invalid'
    ]);

    //last name
    await signUpForm.enterLastName('rdfrwkjvysjfrfdhjyvbgrd');
    await signUpForm.invalidDataInLastNameField([
    'Last name has to be from 2 to 20 characters long',
    'Last name is invalid'
    ]); 

    //email
    await signUpForm.enterEmail('mhgck67t');
    await signUpForm.invalidDataInEmailField('Email is incorrect');

    //password
    await signUpForm.enterPassword('ojnaGbf');
    await signUpForm.invalidDataInPasswordField('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'); 
    
    //password2
    await signUpForm.enterReEnterPassword('penkcoe');
    await signUpForm.invalidDataInReEnterPasswordField([
    'Passwords do not match',
    'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
    ]);
    
    //register Button
    await signUpForm.disabledRegisterButton();
    });
})