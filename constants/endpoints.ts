require('dotenv').config();

export const endpoints = {
    erroInputField: /CustomReactHookInput_error_input/,
    phoneNumberInputVerification: /OwnerProfileNumber_inputVerification/,
    consultationFormError: /ConsultationForm_error/,
    categorySelectError: /CategorySelect_error/,
    lableActive: /CustomLabel_labelActive/,
    modalNameInputError: /inputError/,
    vehicleLocationDivisionInputError: /labelError/,
    searchResultErrorField: /searchResultError/,
    privacyPolicy: { url: `${process.env.BASE_URL}` + 'privacy-policy/', pageTitle: 'Політика конфіденційності' }, 
    cookiePolicy: { url: `${process.env.BASE_URL}` + 'cookie-policy/', pageTitle: 'Політика використання файлів cookie' },
    termsConditions: { url: `${process.env.BASE_URL}` + 'terms-conditions/', pageTitle: 'Угода користувача' }, 
    products: { url: `${process.env.BASE_URL}` + 'products/', inputFieldText: 'Пошук оголошень або послуг' },
    homePage: { url: `${process.env.BASE_URL}`, pageTitle: 'Сервіс пошуку послуг спецтехніки' },
    tendersMap: { url: `${process.env.BASE_URL}` + 'tenders-map/', inputFieldText: 'Пошук тендера за ключовими словами' },
    createUnitPage: { url: `${process.env.BASE_URL}` + '/create-unit/' },
    profilePage: { url: `${process.env.BASE_URL}` + 'owner-cabinet/' },
};