import { test, expect } from '../../../fixtures/testFixture';
import { endpoints } from '../../../constants/endpoints';
import apiService from '../../../api/rentzilla.api';
import { faker } from '@faker-js/faker';

test.describe("API tests", () => {
    let unitId: number;
    const unitName = faker.commerce.productName();
    const unitPrice = faker.number.int({ min: 1000, max: 1000000 });

    test("Create API request for 'Create Unit'", async ({ page, profilePage }) => {
        const unitResponse = await apiService.createUnit(unitName, unitPrice);
        expect(unitResponse).toHaveProperty('id');
        unitId = unitResponse.id;

        for (let i = 1; i <= 3; i++) {
            const imageResponse = await apiService.uploadUnitImage(unitId, `images/image${i}.jpg`, i === 1);
            expect(imageResponse).toHaveProperty('id');
        }
        
        await apiService.deleteUnit(unitId);
    });
});