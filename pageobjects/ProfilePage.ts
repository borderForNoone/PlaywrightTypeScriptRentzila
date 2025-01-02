import { BasePage } from './BasePage';
import { Page, Locator } from '@playwright/test';

export class ProfilePage extends BasePage {
    readonly fields: Record<string, Locator>;
    readonly buttons: Record<string, Locator>;
    readonly elements: Record<string, Locator>;

    constructor(page: Page) {
        super(page);

        this.fields = {
            phoneNumber: page.locator('[data-testid="input_OwnerProfileNumber"]'),
            categoryField: page.locator('[data-testid="buttonDiv"]'),
            categoryFieldErrorMessage: page.locator('[class*="tegorySelect_errorTextVisible"]'),
            imageInput: page.locator('[data-testid="input_ImagesUnitFlow"]'),
            unitNameInputField: page.locator('[data-testid="custom-input"]').nth(0),
            vehicleManufacturerSectionInput: page.locator('[data-testid="input-customSelectWithSearch"]'),
            vehicleLocationDivisionInput: page.locator('[data-testid="mapLabel"]'),
            serviceInput: page.locator('input[placeholder*="Наприклад"]'),
        };
    
        this.buttons = {
            addNewServices: page.locator('[data-testid="btn-addNewItem"]'),
            nextButton: page.locator('[data-testid="nextButton"]'),
            confirmAdressButton: page.locator('[class*="MapPopup_body"] [class*="ItemButtons_wrapper"]').nth(1),
            selectOnMapButton: page.locator('button[class*="AddressSelectionBlock_locationBtn"]'),
            addNewServicesBtn: page.locator('[data-testid="btn-addNewItem"]'),
            removeServiceBtns: page.locator('[data-testid="remove-servicesUnitFlow"]'),
            prevButton: page.locator('[data-testid="prevButton"]'),
            showMoreCardsButton: page.locator('[data-testid="unitCard"]'),
        };
    
        this.elements = {
            tabTitles: page.locator('[class*="CustomLabel_labelTitle"]'),
            tabNumbers: page.locator('[data-testid="labelNumber"]'),
            categoryTitle: page.locator('[class*="CategorySelect_title"]'),
            categorySelectText: page.locator('[class*="CategorySelect_content"]'),
            categorySideArrow: page.locator('[class*="CategorySelect_wrapper"] [alt="Arrow-down"]'),
            categoryPopupTitle: page.locator('[class*="CategoryPopup_title"]'),
            firstColumnElements: page.locator('[class*=FirstCategoryList_content]'),
            secondColumnElements: page.locator('[class*="SecondCategory_radio_flex"]'),
            thirdColumnElements: page.locator('[class*="ThirdCategory_wrapper"]'),
            dropdownOptions: page.locator('[data-testid="item-customSelectWithSearch"]'),
            popupAddress: page.locator('[data-testid="address"]'),
            mapPopup: page.locator('[data-testid="div-mapPopup"]'),
            servicesToChoose: page.locator('[data-testid="searchItem-servicesUnitFlow"]'),
            createUnitTitle: page.locator('[class*="CreateEditFlowLayout_title"]'),
            servicesParagraphNotExistText: page.locator('[class*="AddNewItem_paragraph"]'),
            addNewServicesIconPlusIcon: page.locator('[data-testid="svg-plus-addNewItem"]'),
            selectedServices: page.locator('[class*="ServicesUnitFlow_servicesWrapper"] [data-testid="item-servicesUnitFlow"]'),
            searchItemServicesResult: page.locator('[class*="ServicesUnitFlow_flexForServices"]'),
            technicalServiceDescription: page.locator('//div[contains(text(), "Послуги, які надає технічний засіб:")]'),
            servicesInfoClue: page.locator('[data-testid="add-info"]'),
            searchedServicesWrapper: page.locator('[class*="ServicesUnitFlow_searchedServicesCatWrapper"]'),
            servicesInputTitle: page.locator('[class*="ServicesUnitFlow_paragraph"]'),
            categoriesToChoose: page.locator('[data-testid="leftsideCategory"]'),
            categoryVariants: page.locator('[data-testid="variant"]'),
            unitCards: page.locator('[data-testid="unitCard"]'),
            emptyBlockTitle: page.locator('[data-testid="title"]'),
            pendingUnits: page.locator('.MuiButtonBase-root'),
        };
    }
}