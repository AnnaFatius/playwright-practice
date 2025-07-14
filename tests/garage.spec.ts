// import test from '@playwright/test';
import GaragePage from '../pom/pages/GaragePage';
import HomePage from '../pom/pages/HomePage';
import SignInForm from '../pom/forms/SignInForm';
import { test } from '../fixtures/userGaragePage'; 

let garagePage: GaragePage,
signInForm: SignInForm,
homePage: HomePage

test.describe('Garage Page tests', () => {

    test.use({storageState: 'test-data/states/mainUserState.json'});
    test.beforeEach(async ({ page }) => {
        garagePage = new GaragePage(page);
        signInForm = new SignInForm(page);
        homePage = new HomePage(page);

        await garagePage.open();
    });

    test('Add BMW X5 to Garage', async () => {
        await garagePage.addNewCar('BMW', 'X5', '15');
        await garagePage.verifyLastAddedCarName('BMW X5');
    });

    test('Add Audi Q7 to Garage', async () => {
        await garagePage.addNewCar('Audi', 'Q7', '4337');
        await garagePage.verifyLastAddedCarName('Audi  Q7');
    });

    test('Add Porsche Panamera to Garage', async () => {
        await garagePage.addNewCar('Porsche', 'Panamera', '765');
        await garagePage.verifyLastAddedCarName('Porsche Panamera');
    });

    test('Add Audi R8 to Garage', async () => {
        await garagePage.addNewCar('Audi', 'R8', '123');
        await garagePage.verifyLastAddedCarName('Audi R8');
    });

    test('Add Fiat Ducato to Garage', async () => {
        await garagePage.addNewCar('Fiat', 'Ducato', '234');
        await garagePage.verifyLastAddedCarName('Fiat Ducato');
    });
})