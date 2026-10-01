# Sauce Demo – Playwright UI Tests

Automated UI tests for [Sauce Demo](https://www.saucedemo.com), written with [Playwright Test](https://playwright.dev) in JavaScript, using the Page Object Model.

## Prerequisites

- [Node.js](https://nodejs.org) LTS (developed on v24)
- Git

## Setup

```bash
git clone https://github.com/itirmss/playwrightjs.git
cd playwrightjs
npm ci
npx playwright install chromium
```

`npm ci` installs the exact dependency versions from `package-lock.json`. The second command downloads the Chromium browser Playwright uses.

## Running the tests

| Command | What it does |
|---|---|
| `npm test` | Run the whole suite headless in Chromium |
| `npm run test:headed` | Same, but with a visible browser window |
| `npx playwright test tests/tc05-complete-checkout.spec.js` | Run one file |
| `npx playwright test -g "TC02"` | Run tests whose title matches the text |
| `npx playwright test --ui` | Open Playwright's interactive UI mode |
| `npm run report` | Open the HTML report from the last run |

A successful run looks like `15 passed`. Three of those are the known-bug tests: they show an `x` mark because they fail *as expected* (see below).

## Reports and debugging artefacts

- Every run writes an HTML report to `playwright-report/`. Open it with `npm run report`.
- When a test fails, a **screenshot** and a **trace** are saved in `test-results/` and linked from the report. Open a trace with `npx playwright show-trace <path-to-trace.zip>` to step through every action.

## Project structure

```
├── pages/                  Page objects (one class per screen)
│   ├── LoginPage.js
│   ├── InventoryPage.js    Products list, sorting, cart badge
│   ├── CartPage.js
│   └── CheckoutPage.js     Information, overview and confirmation steps
├── tests/                  Test specs, one file per scenario (TC01–TC07)
│   └── known-bugs.spec.js  Documented defects, marked as expected failures
├── test-data/users.js      Usernames and the shared password
├── utils/price.js          Turns "$29.99" into the number 29.99
├── fixtures.js             Gives each test the page objects it needs
├── playwright.config.js    baseURL, reporter, screenshots/traces, browsers
├── BUGS.md                 Bug reports from exploratory testing
├── TEST_PLAN.md            What is automated and why
└── REFLECTION.md           Learning notes
```

## Test scenarios

| ID | File | What it checks |
|---|---|---|
| TC01 | `tc01-login.spec.js` | Valid login opens the Products page and shows the products |
| TC02 | `tc02-invalid-login.spec.js` | Correct error for wrong password, empty username, empty password and a locked-out user (one data-driven test) |
| TC03 | `tc03-add-to-cart.spec.js` | After adding 2 products the badge shows 2 and the cart lists exactly those products |
| TC04 | `tc04-remove-from-cart.spec.js` | Removing products updates the badge and the cart contents |
| TC05 | `tc05-complete-checkout.spec.js` | Item total, 8% tax and final total are calculated correctly, and the order is confirmed |
| TC06 | `tc06-checkout-validation.spec.js` | Each missing checkout field shows the right error (data-driven) |
| TC07 | `tc07-sort-by-price.spec.js` | Sorting by price (low to high) puts prices in ascending order |

## Design choices

- **Page Object Model.** Locators and actions live in `pages/`, so the tests read like user steps. If the UI changes, only the page class needs updating.
- **Fixtures.** `fixtures.js` extends Playwright's `test`, so a test can just ask for `loginPage`, `cartPage` and so on. Each test still gets its own fresh browser context, so tests are independent and can run in any order or in parallel.
- **Locators.** The site has `data-test` attributes on every element we need. The config sets `testIdAttribute: 'data-test'`, so page objects use `page.getByTestId(...)`. Buttons inside a product card are found by role and name (`getByRole('button', { name: 'Add to cart' })`). There are no CSS class or XPath chains.
- **No fixed waits.** There is no `waitForTimeout` anywhere. The tests rely on Playwright's auto-waiting and web-first assertions such as `toHaveText` and `toHaveCount`, which retry until they pass or time out.
- **Real outcomes.** TC05 does not hard-code the totals. It reads each product's price, calculates the expected subtotal, tax and total, and compares them with what the overview page shows.

## Known-bug tests

`tests/known-bugs.spec.js` automates the three defects in [BUGS.md](BUGS.md). Each test checks the *correct* behaviour and is marked with `test.fail()`, so:
- while the bug exists, the test fails as expected and the suite still passes;
- if the bug is ever fixed, Playwright reports an unexpected pass, which tells us to remove the marker.

## Continuous integration

[.github/workflows/playwright.yml](.github/workflows/playwright.yml) runs the suite on GitHub Actions for every push and pull request to `main`. The HTML report is uploaded as a build artefact.

## Assumptions

- Sauce Demo is a public site, so the tests need an internet connection. The site's data (6 products, fixed prices, 8% tax) is assumed to stay as it is today.
- Tax is assumed to be 8% of the item total, rounded to the nearest cent. This matches what the site shows.
- Only Chromium is configured, as the brief requires.
- TC02 uses Playwright's standard data-driven pattern: one test body that loops over a data table and produces one test per row. A failure report then names the exact case that failed.
