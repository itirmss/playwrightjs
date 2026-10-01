# Reflection

## What was new to me

Playwright, async/await, locators vs. selectors, web-first assertions, the Page Object Model, fixtures, running tests.

## Resources that helped most

- [Playwright docs](https://playwright.dev/docs/intro): getting started, locators, assertions, test fixtures
- Youtube: https://youtu.be/ASYCV3P2AYU?si=0WQ-7znc8T5qo46t
- Claude

## Where I got stuck and how I resolved it

At first, I had trouble installing Node.js and setting up Playwright. I didn't know which version to download or how to check if it was working.

Then I got confused by async/await. I learned that I need to put await before every Playwright step, or the test doesn't work properly.

In my first tests, I used waitForTimeout to make them pass. Later, I learned this just waits for a fixed time, which makes tests slow and sometimes fail. Checks like toHaveText already wait on their own, so I removed the fixed waits.

I was also confused between locators and selectors. At first, I used a mix of CSS classes, IDs and data-test. Then I switched to getByTestId and getByRole, which are easier to read and work better.


## Where I used AI tools

I used **Claude Code** (Anthropic's AI coding assistant, running in VS Code) for:
- Reading the assessment brief and reviewing my first test drafts against it. It pointed out the fixed waits, the missing Page Object Model and failing sample test.
- Setting up the Git workflow and connecting the local project to GitHub.
- Refactoring my TC01–TC07 drafts into page objects and fixtures, and making TC05 compute its totals.
- Reproducing the defects for `BUGS.md` in a scripted browser and capturing the screenshots. I also checked these manually.
- Drafting `README.md`, `TEST_PLAN.md`, `BUGS.md` and the outline of this file.

The first drafts of the tests (commit "test: add first drafts of TC01-TC07 specs") were written by me with help from AI.
I reviewed all the generated code and ran it myself.
