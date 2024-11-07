import { test, expect } from '../../../fixtures/testFixture';
import { createUnitFillingInSectionsWithTwoPhotos } from '../../../helpers/profileHelper';
import { validValues } from '../../../constants/validValues';
import { invalidValues } from '../../../constants/invalidValues';
import { AlertMsgColors } from '../../../constants/enumsColors';
import { faker } from '@faker-js/faker';

const dynamicText = faker.string.alpha({ length: 10 });

test.describe("tests for unit services section", () => {
  test.beforeEach(
    async ({ page, profilePage }) => {
      await createUnitFillingInSectionsWithTwoPhotos(page);
      await profilePage.nextButton.click();
    }
  );

  test('C410 - Verify creating new service', async ({ profilePage }) => {
    await profilePage.serviceInput.fill(dynamicText);
    await expect(profilePage.servicesParagraphNotExistText).toBeVisible();
    await expect(profilePage.addNewServicesBtn).toBeVisible();
    await expect(profilePage.servicesParagraphNotExistText).toHaveText(
      `На жаль, послугу “${dynamicText}“ не знайдено в нашій базі.
Ви можете додати послугу в категорію “Користувацькі”:`
    );
    await expect(profilePage.addNewServicesIconPlusIcon).toHaveClass(
      /AddNewItem_iconWrapper/
    );

    await expect(profilePage.addNewServicesBtn).toHaveText(/Створити послугу/);

    await profilePage.addNewServicesBtn.click();
    await expect(profilePage.selectedServices).toBeVisible();
  });

  test("C411 - Verify choosing multiple services", async ({ profilePage }) => {
    await profilePage.serviceInput.fill("Г");

    const serviceCount = await profilePage.searchItemServicesResult.count();

    for (let index = 0; index < serviceCount; index++) {
      const service = profilePage.searchItemServicesResult.nth(index);

      if (index < 3) {
        await expect(service).toContainText(new RegExp(validValues.services[index], "i"));
        await service.click();
      }
    }

    await expect(profilePage.selectedServices).toHaveCount(3);
  });

  test("C412 - Verify removing variants from choosed list", async ({ profilePage }) => {
    await profilePage.serviceInput.fill("Г");

    for (let index = 0; index < 2; index++) {
      await profilePage.searchItemServicesResult.nth(index).click();
    }

    await expect(profilePage.selectedServices).toHaveCount(2);
    await expect(profilePage.technicalServiceDescription).toBeVisible();

    for (let index = 1; index >= 0; index--) {
      await profilePage.removeServiceBtns.nth(index).click();
    }

    await expect(profilePage.selectedServices).toHaveCount(0);
    await expect(profilePage.technicalServiceDescription).not.toBeVisible();
  });

  test("C413 - Verify 'Назад' button", async ({ profilePage }) => {
    await expect(profilePage.prevButton).toHaveText(validValues.profilePagePrevButtonText);
    if (await profilePage.telegramCrossButton.isVisible()) {
      await profilePage.telegramCrossButton.click();
    }
    await profilePage.prevButton.click();
 
    for(let i = 0; i < 5; i++) {
      if(i === 1) {
          continue;
      }
      await expect(profilePage.tabNumbers.nth(i)).not.toHaveAttribute('class', /CustomLabel_labelActive/);
    }
  });

  test("C414 - Verify 'Далі' button", async ({ profilePage }) => {
    await expect(profilePage.nextButon).toHaveText(validValues.nextButtonText);
    
    await profilePage.nextButon.click();
    await expect(profilePage.servicesInfoClue).toHaveCSS(
      "color",
      AlertMsgColors.RED
    );
    await profilePage.serviceInput.fill("Г");
    await profilePage.searchItemServicesResult.nth(0).click();
    await profilePage.nextButon.click();

    for(let i = 0; i < 5; i++) {
      if(i === 3) {
          continue;
      }
      await expect(profilePage.tabNumbers.nth(i)).not.toHaveAttribute('class', /CustomLabel_labelActive/);
    }
  });

  test("C632 - Verify entering special characters in the 'Послуги' input", async ({ profilePage }) => {
    await profilePage.serviceInput.fill(invalidValues.specialSymbols);
    await expect(profilePage.serviceInput).toHaveValue("");

    await profilePage.serviceInput.fill(invalidValues.drillingwithinvalidSymbols);
    await expect(profilePage.serviceInput).toHaveValue(validValues.drilling);
    await expect(profilePage.searchedServicesWrapper).toBeVisible();
  });

  test("C633 - Verify data length for 'Послуги' input field", async ({ profilePage }) => {
    await profilePage.serviceInput.fill(invalidValues.dot);

    for (const service of await profilePage.searchItemServicesResult.allTextContents()) {
      expect(service).toContain(invalidValues.dot);
    }

    await profilePage.serviceInput.clear();
    await expect(profilePage.serviceInput).toHaveValue("");
    await profilePage.serviceInput.fill(faker.string.alpha({ length: 101 }));
    expect(await profilePage.serviceInput.inputValue()).toHaveLength(100);
  });

  test("C634 - Verify the search function is not sensetive to upper or lower case", async ({ profilePage }) => {
    await profilePage.serviceInput.fill(validValues.diggingInLowwerCase);

    for (const service of await profilePage.searchItemServicesResult.allTextContents()) {
      expect(service).toMatch(new RegExp(validValues.diggingInLowwerCase, "i"));
    }
  
    await profilePage.serviceInput.fill(validValues.diggingInUpperCase);
    for (const services of await profilePage.searchItemServicesResult.allTextContents()) {
      expect(services).toMatch(new RegExp(validValues.diggingInLowwerCase, "i"));
    }
  });

  test("C591 - Verify 'Послуги' input with invalid data", async ({ profilePage }) => {
    await profilePage.serviceInput.fill(invalidValues.specialSymbols);
    await expect(profilePage.serviceInput).toHaveValue("");
  });

  test("C592 - Verify 'Послуги' input choosing of existing service", async ({ profilePage }) => {
    await expect(profilePage.servicesInputTitle).toHaveText(/^Знайдіть послуги, які надає Ваш технічний засіб.*\*$/);
    await expect(profilePage.servicesInfoClue).toBeVisible();
    await expect(profilePage.servicesInfoClue).toHaveText(validValues.addAtLeastOneService);
    await expect(profilePage.serviceInput).toHaveAttribute(
      "placeholder",
      validValues.servicesInputPlaceholder
    );
    await profilePage.serviceInput.fill("Б");
    await expect(profilePage.searchedServicesWrapper).toBeVisible();
    await profilePage.serviceInput.clear();
    await profilePage.serviceInput.fill(validValues.diggingInLowwerCase);
    const resultsForDiggingInLowwerCase = await profilePage.searchItemServicesResult.allTextContents()
    await profilePage.serviceInput.fill(validValues.diggingInUpperCase);
    const resultsForDiggingInUpperCase = await profilePage.searchItemServicesResult.allTextContents()
    expect(resultsForDiggingInLowwerCase).toEqual(resultsForDiggingInUpperCase);
    await profilePage.searchItemServicesResult.nth(0).click();
    await expect(profilePage.selectedServices).toBeVisible();
    await expect(profilePage.selectedServices).toHaveText(validValues.excavationForFoundations);
    await expect(profilePage.technicalServiceDescription).toHaveText(validValues.servicesProvidedByTechnicalMeans);
    await expect(profilePage.removeServiceBtns.nth(0)).toBeVisible();
  });
});
