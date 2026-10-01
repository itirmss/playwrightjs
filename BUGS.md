# Bug Reports – Sauce Demo

Defects found while exploring https://www.saucedemo.com with the `problem_user` and `error_user` accounts.

**Environment (all bugs):** Chromium (Playwright 1.63.0 bundled browser), Windows 11, 1280×800 viewport. Password for all accounts: `secret_sauce`. Tested on 1 October 2026.

**Severity scale used**

| Severity | Meaning |
|---|---|
| Critical | A core business flow (placing an order) fails, with no workaround and no clear feedback to the user. |
| High | A core flow is blocked, but the user sees that something went wrong. |
| Medium | A feature does not work, but the user can still reach their goal another way. |
| Low | Cosmetic issue with no functional impact. |

---

## BUG-01: Typing in "Last Name" on checkout writes into "First Name" instead

| | |
|---|---|
| **Severity** | High |
| **Account** | `problem_user` |
| **Browser** | Chromium |
| **Page** | Checkout: Your Information (`/checkout-step-one.html`) |

**Steps to reproduce**
1. Log in as `problem_user`.
2. Click **Add to cart** on "Sauce Labs Backpack".
3. Open the cart and click **Checkout**.
4. Type `Ram` in **First Name**.
5. Click **Last Name** and type `Sharma`.
6. Type `44600` in **Zip/Postal Code**.
7. Click **Continue**.

**Expected result**
First Name shows `Ram` and Last Name shows `Sharma`. Clicking Continue opens the Checkout: Overview page.

**Actual result**
- Each key typed in Last Name replaces the First Name value, so First Name ends up as `a` (the last character of "Sharma").
- Last Name stays empty.
- Clicking Continue shows **"Error: Last Name is required"**, so the user cannot get past this step and cannot buy anything.

**Evidence:** [docs/screenshots/bug1-problem-user-last-name.png](docs/screenshots/bug1-problem-user-last-name.png)

**Why High:** checkout is completely blocked for this user, but they do see an error, so the failure is visible.

---

## BUG-02: Clicking "Finish" does not place the order

| | |
|---|---|
| **Severity** | Critical |
| **Account** | `error_user` |
| **Browser** | Chromium |
| **Page** | Checkout: Overview (`/checkout-step-two.html`) |

**Steps to reproduce**
1. Log in as `error_user`.
2. Click **Add to cart** on "Sauce Labs Backpack".
3. Open the cart and click **Checkout**.
4. Enter First Name `Ram`, Last Name `Sharma`, Postal Code `44600`, then click **Continue**.
5. On Checkout: Overview, click **Finish**.

**Expected result**
The Checkout: Complete! page appears with "Thank you for your order!", and the cart is emptied.

**Actual result**
- Nothing visible happens. The user stays on Checkout: Overview and the cart badge still shows 1.
- No error message is shown to the user.
- The browser console shows an error-reporting request that fails: `Access to fetch at 'https://submit.backtrace.io/...' ... blocked by CORS policy`. This means the app hit an error while handling Finish.

**Evidence:** [docs/screenshots/bug2-error-user-finish.png](docs/screenshots/bug2-error-user-finish.png) (taken 2 seconds after clicking Finish), plus the console output above.

**Why Critical:** this is the final step of the purchase flow. The order is never placed, and the user gets no feedback, so they may believe the order went through.

---

## BUG-03: Sorting products has no effect

| | |
|---|---|
| **Severity** | Medium |
| **Account** | `problem_user` |
| **Browser** | Chromium |
| **Page** | Products (`/inventory.html`) |

**Steps to reproduce**
1. Log in as `problem_user`.
2. Open the sort dropdown and choose **Price (low to high)**.

**Expected result**
Products are reordered by price in ascending order ($7.99, $9.99, $15.99, $15.99, $29.99, $49.99), and the dropdown shows "Price (low to high)".

**Actual result**
- The product order does not change: $29.99, $9.99, $15.99, $49.99, $7.99, $15.99.
- The dropdown goes back to **"Name (A to Z)"**.

**Evidence:** [docs/screenshots/bug3-problem-user-sort.png](docs/screenshots/bug3-problem-user-sort.png)

**Why Medium:** the feature is broken, but there are only six products, so the user can still find what they want by scrolling.

**Also seen in the same screenshot (not counted above):** every product shows the same dog image instead of its own product photo. The image file requested is `/assets/sl-404-*.jpg`. Severity: Low to Medium.

---

## Other observations (not logged as separate bugs)

- `visual_user`: product prices are different every time the page is reloaded (for example, the Backpack showed $21.09 and then $20.58). The cart icon is also displaced from its usual top-right position.
- `error_user`: the Last Name field does not accept typed input, yet the form still lets the user continue to the overview step without a last name.
