import { test } from '../fixtures/userGaragePage';

test.describe('Garage Page tests', () => {

    test('Add Audi Q7 to Garage', async ({ garagePage }) => {
        await garagePage.verifyPageIsOpen();
        await garagePage.addNewCar('Audi', 'Q7', '4337');
        await garagePage.verifyLastAddedCarName('Audi  Q7');
        await garagePage.removeCar();
    });

    test('Add Porsche Panamera to Garage', async ({ garagePage }) => {
        await garagePage.verifyPageIsOpen();
        await garagePage.addNewCar('Porsche', 'Panamera', '765');
        await garagePage.verifyLastAddedCarName('Porsche Panamera');
        await garagePage.removeCar();
    });

    test('Add Fiat Ducato to Garage', async ({ garagePage }) => {
        await garagePage.verifyPageIsOpen();
        await garagePage.addNewCar('Fiat', 'Ducato', '234');
        await garagePage.verifyLastAddedCarName('Fiat Ducato');
        await garagePage.removeCar();
    });

    test('Add BMW X5', async ({ garagePage }) => {
        await garagePage.verifyPageIsOpen();
        await garagePage.addNewCar('BMW', 'X5', '999');
        await garagePage.verifyLastAddedCarName('BMW X5');
        await garagePage.removeCar();
    });
});