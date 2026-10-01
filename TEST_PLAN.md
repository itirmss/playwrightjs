# Test Plan

## Scope and approach

The suite covers the main path a shopper takes on Sauce Demo: **log in → browse and sort → manage the cart → check out**. All tests use `standard_user` (except `locked_out_user` in TC02), run in Chromium, and are built on page objects so each test reads as a list of user steps.

## What is automated, and why

| ID | Scenario | Why it matters |
|---|---|---|
| TC01 | Valid login | Nothing else in the app works without it. |
| TC02 | Invalid login (4 cases, data-driven) | Negative cases: each wrong input must give the user a clear, specific message. Running them from one data table makes it easy to add more cases. |
| TC03 | Add two products | The cart badge and the cart page must agree with what the user picked. |
| TC04 | Remove a product | Checks the reverse of TC03, including the badge disappearing once the cart is empty. |
| TC05 | Complete checkout | The money path. Expected totals are **calculated from the product prices**, not copied from the screen, so a pricing or tax bug would be caught. |
| TC06 | Checkout form validation (3 cases) | Negative cases for each required field; the user must not move on with missing data. |
| TC07 | Sort by price, low to high | First confirms the default order is *not* ascending, so the test proves the sort actually did something. |

The three defects in [BUGS.md](BUGS.md) are also automated as **expected failures** (`test.fail()`). This keeps the main suite green and flags each bug automatically once it is fixed.

## Out of scope for now

Other browsers, the other sort options, the side menu (logout, reset app state), the product detail page, and visual layout checks.

## What I would automate next

1. **Remaining sort options** (A–Z, Z–A, high–low), as one data-driven test like TC02.
2. **Logout and session handling.** After logout, opening `/inventory.html` directly should send the user back to login.
3. **Cart persistence.** The cart should keep its contents after moving between pages and after a reload. "Reset App State" should empty it.
4. **Product detail page.** The name and price should match the product list, and adding to cart from there should work.
5. **Cross-browser runs** in Firefox and WebKit (a small config change).
6. **Login via saved storage state**, to skip the login form in tests that aren't about login. This would make the suite faster.
7. **Visual comparison tests** with `toHaveScreenshot()`, which would catch layout bugs like the ones seen with `visual_user`.
8. **API tests** against Restful Booker with Playwright's `request` fixture: create, read and update a booking.
