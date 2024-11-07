import { test as baseTest } from '@playwright/test';
import { HomePage } from '../pageobjects/HomePage';
import { ProfilePage } from '../pageobjects/ProfilePage';
import { faker } from '@faker-js/faker';
import path from 'path';
import fs from 'fs';

const imageDir = path.join(__dirname, '../images/validImages');
let files: string[] = [];

type Product = {
    category: string;
    subcategory: string;
    productName: string;
};

const test = baseTest.extend<{
    homePage: HomePage,
    profilePage: ProfilePage,
    product: Product,
}>({
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        
        await use(homePage);
    },
    profilePage: async ({ page }, use) => {
        const cartPage = new ProfilePage(page);
        await use(cartPage);
    },
    product: async ({ }, use) => {
        const product = {
            category: 'Women',
            subcategory: 'Jackets',
            productName: 'Desired Product Name'
        };
        await use(product);
    },
});

export { test };
export { expect } from '@playwright/test';