# PlaywrightTypeScriptRentzila

The TypeScript Node.js Playwright project.

# Preconditions

1. Install Node.js(latest version, or at least 21);
2. Clone the repository where the project is stored:
    - `git clone https://github.com/borderForNoone/PlaywrightTypeScriptRentzila`
3. Install Dependencies;
    - `npm install`

# Steps to run

Run the command below to run all tests in headlees mode

```
npx playwright test
```

Running All Tests in Chrome Headed Mode

```
npx playwright test --headed
```

Run Tests in a Specific Browser
To run tests in a specific browser, like Chrome, Firefox, or Safari, use the --project flag:

```
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

Run a Single Test File
To run a specific test file:

```
npx playwright test tests/example.spec.ts
```

Run Tests with a Specific Tag
To run only tests that are tagged with a specific tag (e.g., @smoke), use the --grep flag:

```
npx playwright test --grep @smoke
```

Run Tests in Debug Mode
To debug tests step-by-step with additional logging and pause-on-failure enabled:

```
npx playwright test --debug
```

View Test Results with HTML Report
After running tests, you can view a detailed HTML report:

```
npx playwright show-report
```

Report on CI:

https://borderfornoone.github.io/PlaywrightTypeScriptRentzila/