import { expect, type Locator, type Page } from '@playwright/test';
import BasePage from '../BasePage';

export default class GaragePage extends BasePage{
    private readonly pageHeader: Locator = this.page.locator('//h1', { hasText: 'Garage' });
    private readonly addNewCarButton: Locator = this.page.locator('//button[contains(@class, "btn-primary")]');
    private readonly brandDropdown: Locator = this.page.locator('//select[@id="addCarBrand"]');
    private readonly modelDropdown: Locator = this.page.locator('//select[@id="addCarModel"]');
    private readonly mileageField: Locator = this.page.locator('//input[@id="addCarMileage"]');
    private readonly submitAddingCarButton: Locator = this.page.locator('//app-add-car-modal//button[contains(@class, "btn-primary")]');
    private readonly allAddedCarNames: Locator = this.page.locator('//p[contains(@class,"car_name")]');
    private readonly editCarButtonOnAddedCar: Locator  = this.page.locator('//span[@class="icon icon-edit"]')
    private readonly removeCarButtonOnEditCarModel: Locator = this.page.locator('//button[@class="btn btn-outline-danger"]')
    private readonly removeCarButtonRemovePpoUp: Locator = this.page.locator('//button[@class="btn btn-danger"]')

    async open(){
        await this.page.goto('/panel/garage');
      }

    async addNewCar(brand: string, model: string, mileage: string){
        await this.addNewCarButton.click();
        await this.brandDropdown.selectOption(brand);
        await this.modelDropdown.selectOption(model);
        await this.mileageField.fill(mileage);
        await this.submitAddingCarButton.click();
    }

    async verifyLastAddedCarName(expectedName: string){
        await expect(this.allAddedCarNames.first()).toHaveText(expectedName);
    }

    async verifyPageIsOpen(){
        await expect(this.pageHeader).toBeVisible();
    }

    async removeCar(){
        await this.editCarButtonOnAddedCar.first().click();
        await this.removeCarButtonOnEditCarModel.click();
        await this.removeCarButtonRemovePpoUp.click();
    }

}