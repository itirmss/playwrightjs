# Reflection

<!-- DRAFT: replace every [TODO] with your own words, then delete this comment. -->

## What was new to me

[TODO: For example: Playwright itself, async/await, locators vs. selectors, web-first assertions, the Page Object Model, fixtures, running tests in CI.]

## Resources that helped most

- [Playwright docs](https://playwright.dev/docs/intro): getting started, locators, assertions, test fixtures
- [TODO: any tutorials, videos or courses you used]

## Where I got stuck and how I resolved it

[TODO: Your own experience. Things that came up in this project that you may want to describe:]
- My first tests used `waitForTimeout` to make them pass. I learned this is a fixed wait that makes tests slow and flaky. Playwright's assertions such as `toHaveText` already wait and retry, so the fixed waits were removed.
- My first locators mixed CSS classes, IDs and `data-test`. I moved to `getByTestId` (with `testIdAttribute: 'data-test'`) and `getByRole`.
- TC05 originally hard-coded the expected totals. I changed it to calculate them from the product prices so it checks the logic, not just the text.
- [TODO]

## Where I used AI tools

I used **Claude Code** (Anthropic's AI coding assistant, running in VS Code) for:
- Reading the assessment brief and reviewing my first test drafts against it. It pointed out the fixed waits, the missing Page Object Model and a failing sample test.
- Setting up the Git workflow and connecting the local project to GitHub.
- Refactoring my TC01–TC07 drafts into page objects and fixtures, and making TC05 compute its totals.
- Reproducing the defects for `BUGS.md` in a scripted browser and capturing the screenshots. [TODO: say whether you also checked these manually yourself.]
- Drafting `README.md`, `TEST_PLAN.md`, `BUGS.md` and the outline of this file.

The first drafts of the tests (commit "test: add first drafts of TC01-TC07 specs") were [TODO: written by me / written with help from …].

I reviewed all the generated code, ran it myself, and can explain each part: [TODO: add anything you changed or learned while reviewing].
