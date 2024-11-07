import { test, expect } from '../../../fixtures/testFixture';
import { createUnitFillingInSectionsWithTwoPhotos } from '../../../helpers/profileHelper';
import { validValues } from '../../../constants/validValues';
import { invalidValues } from '../../../constants/invalidValues';
import { AlertMsgColors } from '../../../constants/enumsColors';
import { faker } from '@faker-js/faker';

const dynamicText = faker.string.alpha({ length: 10 });

test.describe("Tests for unit services section", () => {
  test.beforeEach(
    async ({ page, profilePage }) => {
      await createUnitFillingInSectionsWithTwoPhotos(page);
      await profilePage.buttons.nextButton.click();
    }
  );

  test('C410 - Verify creating new service', async ({ profilePage }) => {
    await profilePage.fields.serviceInput.fill(dynamicText);
    await expect(profilePage.elements.servicesParagraphNotExistText).toBeVisible();
    await expect(profilePage.buttons.addNewServicesBtn).toBeVisible();
    await expect(profilePage.elements.servicesParagraphNotExistText).toHaveText(
      `На жаль, послугу “${dynamicText}“ не знайдено в нашій базі.
Ви можете додати послугу в категорію “Користувацькі”:`
    );
    await expect(profilePage.elements.addNewServicesIconPlusIcon).toHaveClass(
      /AddNewItem_iconWrapper/
    );

    await expect(profilePage.buttons.addNewServicesBtn).toHaveText(validValues.addNewServicesBtnText);

    await profilePage.buttons.addNewServicesBtn.click();
    await expect(profilePage.elements.selectedServices).toBeVisible();
  });

  test("C411 - Verify choosing multiple services", async ({ profilePage }) => {
    await profilePage.fields.serviceInput.fill("Г");

    const serviceCount = await profilePage.elements.searchItemServicesResult.count();

    for (let index = 0; index < serviceCount; index++) {
      const service = profilePage.elements.searchItemServicesResult.nth(index);

      if (index < 3) {
        await expect(service).toContainText(new RegExp(validValues.services[index], "i"));
        await service.click();
      }
    }

    await expect(profilePage.elements.selectedServices).toHaveCount(3);
  });

  test("C412 - Verify removing variants from choosed list", async ({ profilePage }) => {
    await profilePage.fields.serviceInput.fill("Г");

    for (let index = 0; index < 2; index++) {
      await profilePage.elements.searchItemServicesResult.nth(index).click();
    }

    await expect(profilePage.elements.selectedServices).toHaveCount(2);
    await expect(profilePage.elements.technicalServiceDescription).toBeVisible();

    for (let index = 1; index >= 0; index--) {
      await profilePage.buttons.removeServiceBtns.nth(index).click();
    }

    await expect(profilePage.elements.selectedServices).toHaveCount(0);
    await expect(profilePage.elements.technicalServiceDescription).not.toBeVisible();
  });

  test("C413 - Verify 'Назад' button", async ({ profilePage }) => {
    await expect(profilePage.buttons.prevButton).toHaveText(validValues.profilePagePrevButtonText);
    if (await profilePage.telegramCrossButton.isVisible()) {
      await profilePage.telegramCrossButton.click();
    }
    await profilePage.buttons.prevButton.click();
 
    for(let i = 0; i < 5; i++) {
      if(i === 1) {
          continue;
      }
      await expect(profilePage.elements.tabNumbers.nth(i)).not.toHaveAttribute('class', /CustomLabel_labelActive/);
    }
  });

  test("C414 - Verify 'Далі' button", async ({ profilePage }) => {
    await expect(profilePage.buttons.nextButton).toHaveText(validValues.nextButtonText);
    
    await profilePage.buttons.nextButton.click();
    await expect(profilePage.elements.servicesInfoClue).toHaveCSS(
      "color",
      AlertMsgColors.RED
    );
    await profilePage.fields.serviceInput.fill("Г");
    await profilePage.elements.searchItemServicesResult.nth(0).click();
    await profilePage.buttons.nextButton.click();

    for(let i = 0; i < 5; i++) {
      if(i === 3) {
          continue;
      }
      await expect(profilePage.elements.tabNumbers.nth(i)).not.toHaveAttribute('class', /CustomLabel_labelActive/);
    }
  });

  test("C632 - Verify entering special characters in the 'Послуги' input", async ({ profilePage }) => {
    await profilePage.fields.serviceInput.fill(invalidValues.specialSymbols);
    await expect(profilePage.fields.serviceInput).toHaveValue("");

    await profilePage.fields.serviceInput.fill(invalidValues.drillingwithinvalidSymbols);
    await expect(profilePage.fields.serviceInput).toHaveValue(validValues.drilling);
    await expect(profilePage.elements.searchedServicesWrapper).toBeVisible();
  });

  test("C633 - Verify data length for 'Послуги' input field", async ({ profilePage }) => {
    await profilePage.fields.serviceInput.fill(invalidValues.dot);

    for (const service of await profilePage.elements.searchItemServicesResult.allTextContents()) {
      expect(service).toContain(invalidValues.dot);
    }

    await profilePage.fields.serviceInput.clear();
    await expect(profilePage.fields.serviceInput).toHaveValue("");
    await profilePage.fields.serviceInput.fill(faker.string.alpha({ length: 101 }));
    expect(await profilePage.fields.serviceInput.inputValue()).toHaveLength(100);
  });

  test("C634 - Verify the search function is not sensetive to upper or lower case", async ({ profilePage }) => {
    await profilePage.fields.serviceInput.fill(validValues.diggingInLowwerCase);

    for (const service of await profilePage.elements.searchItemServicesResult.allTextContents()) {
      expect(service).toMatch(new RegExp(validValues.diggingInLowwerCase, "i"));
    }
  
    await profilePage.fields.serviceInput.fill(validValues.diggingInUpperCase);
    for (const services of await profilePage.elements.searchItemServicesResult.allTextContents()) {
      expect(services).toMatch(new RegExp(validValues.diggingInLowwerCase, "i"));
    }
  });

  test("C591 - Verify 'Послуги' input with invalid data", async ({ profilePage }) => {
    await profilePage.fields.serviceInput.fill(invalidValues.specialSymbols);
    await expect(profilePage.fields.serviceInput).toHaveValue("");
  });

  test("C592 - Verify 'Послуги' input choosing of existing service", async ({ profilePage }) => {
    await expect(profilePage.elements.servicesInputTitle).toHaveText(validValues.servicesInputTitle);
    await expect(profilePage.elements.servicesInfoClue).toBeVisible();
    await expect(profilePage.elements.servicesInfoClue).toHaveText(validValues.addAtLeastOneService);
    await expect(profilePage.fields.serviceInput).toHaveAttribute(
      "placeholder",
      validValues.servicesInputPlaceholder
    );
    await profilePage.fields.serviceInput.fill("Б");
    await expect(profilePage.elements.searchedServicesWrapper).toBeVisible();
    await profilePage.fields.serviceInput.clear();
    await profilePage.fields.serviceInput.fill(validValues.diggingInLowwerCase);
    const resultsForDiggingInLowwerCase = await profilePage.elements.searchItemServicesResult.allTextContents()
    await profilePage.fields.serviceInput.fill(validValues.diggingInUpperCase);
    const resultsForDiggingInUpperCase = await profilePage.elements.searchItemServicesResult.allTextContents()
    expect(resultsForDiggingInLowwerCase).toEqual(resultsForDiggingInUpperCase);
    await profilePage.elements.searchItemServicesResult.nth(0).click();
    await expect(profilePage.elements.selectedServices).toBeVisible();
    await expect(profilePage.elements.selectedServices).toHaveText(validValues.excavationForFoundations);
    await expect(profilePage.elements.technicalServiceDescription).toHaveText(validValues.servicesProvidedByTechnicalMeans);
    await expect(profilePage.buttons.removeServiceBtns.nth(0)).toBeVisible();
  });
});
