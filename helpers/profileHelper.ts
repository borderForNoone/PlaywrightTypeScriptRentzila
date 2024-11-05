import { HomePage } from '../pageobjects/HomePage';
import { ProfilePage } from '../pageobjects/ProfilePage';
import { endpoints } from '../constants/endpoints';
import { validValues } from '../constants/validValues';
import { faker } from '@faker-js/faker';
import path from 'path';
import fs from 'fs';
import { Page } from '@playwright/test';
import { expect } from '@playwright/test';

const imageDir = path.join(__dirname, '../images/validImages');
let files: string[] = [];

export async function createUnitFillingInSectionsWithEightPhotos(page: Page) {
    const profilePage = new ProfilePage(page);

    files = fs.readdirSync(imageDir)
        .filter(file => ['.jpg', '.jpeg', '.png'].includes(path.extname(file).toLowerCase()))
        .map(file => path.join(imageDir, file));

    await createUnitFillingInFirstSection(page);

    const input = profilePage.imageInput;

    await makeInputForImagesVisible(page);

    const remoteFilePaths = files.map(file => file);

    for (let i = 0; i < 8; i++) {
        await input.setInputFiles(remoteFilePaths[i]);
    }
}

export async function createUnitFillingInSectionsWithTwoPhotos(page: Page) {
    const profilePage = new ProfilePage(page);

    files = fs.readdirSync(imageDir)
        .filter(file => ['.jpg', '.jpeg', '.png'].includes(path.extname(file).toLowerCase()))
        .map(file => path.join(imageDir, file));

    await createUnitFillingInFirstSection(page);

    const input = profilePage.imageInput;

    await makeInputForImagesVisible(page);

    const remoteFilePaths = files.map(file => file);

    for (let i = 0; i < 2; i++) {
        await input.setInputFiles(remoteFilePaths[i]);
    }
}

export async function createUnitFillingInFirstSection(page: Page) {
    const profilePage = new ProfilePage(page);
    const homePage = new HomePage(page);

    await page.goto(endpoints.createUnitPage.url);
    if (!(await profilePage.createUnitTitle.isVisible())) {
        await homePage.emailField.waitFor({ state: 'visible', timeout: 5000 });
        await homePage.passwordField.waitFor({ state: 'visible', timeout: 5000 });

        await homePage.emailField.fill(process.env.ADMIN_USERNAME || '');
        await homePage.passwordField.fill(process.env.ADMIN_PASSWORD || '');

        await homePage.submitButton.click();
    }

    await profilePage.categoryField.click();
    await profilePage.firstColumnElements.nth(0).click();
    await profilePage.secondColumnElements.nth(0).click();
    await profilePage.thirdColumnElements.nth(0).click();

    await profilePage.unitNameInputField.fill(faker.string.alpha(10));

    await profilePage.vehicleManufacturerSectionInput.fill(validValues.vehicleManufacturerSectionInputValue);
    await profilePage.dropdownOptions.nth(0).click();

    await selectLocationOnMap(page);
    const expectedText = await profilePage.popupAddress.textContent();

    await profilePage.confirmAdressButton.click();

    expect(await profilePage.vehicleLocationDivisionInput.textContent()).toEqual(expectedText);

    await profilePage.nextButton.click();
}

export async function selectLocationOnMap(page: Page) {
    const profilePage = new ProfilePage(page);

    await profilePage.selectOnMapButton.click();
    await expect(profilePage.popupAddress).toHaveText(validValues.popupAddress);

    const boundingBox = await profilePage.mapPopup.boundingBox();
    if (boundingBox) {
        const { x, y, width, height } = boundingBox;
        const centerX = Math.floor(x + width / 2);
        const centerY = Math.floor(y + height / 2 - 10);

        await page.mouse.move(centerX, centerY);
        await page.waitForTimeout(500);
        await page.mouse.down();
        await page.waitForTimeout(500);
        await page.mouse.up();
        await page.waitForTimeout(1000);
    } else {
        throw new Error("The map popup is not visible or has been detached from the DOM.");
    }
}

export async function clickOutsideOfPopUp(page: Page) {
    await page.mouse.click(0, 0);
}

export async function makeInputForImagesVisible(page: Page) {
    await page.evaluate(() => {
        const element = document.querySelector('[data-testid="input_ImagesUnitFlow"]') as HTMLElement;
        if (element) {
            element.style.display = 'block';
            element.style.visibility = 'visible';
            element.style.opacity = '1';
        }
    });
}