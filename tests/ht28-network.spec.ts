import { expect, test } from "@playwright/test";
import HomePage from "../pom/pages/HomePage";
import SignInForm from "../pom/forms/SignInForm";
import { usersList } from "../test-data/users";

let homePage: HomePage;
let signInForm: SignInForm;

test.beforeEach((async ({ page }) => {
    homePage = new HomePage(page);
    signInForm = new SignInForm(page);
}));

test('Change user name', async ({ page }) => {
    await page.route('**/api/users/profile', async route => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
              status: "ok",
              data: {
                userId: 227789,
                photoFilename: "default-user.png",
                name: "Anna",
                lastName: "New",
                dateBirth: "2021-03-17T15:21:05.000Z",
                country: "Ukraine"
              }
            }),
        });
    });
    await homePage.open();
    await homePage.clickSignInButton();
    await signInForm.loginWithCredentials(usersList.mainUser.email, usersList.mainUser.password);
    await page.getByRole('link', { name: /profile/i }).click()

    await expect(page.getByText('Anna')).toBeVisible();
    await expect(page.getByText('New')).toBeVisible();
});