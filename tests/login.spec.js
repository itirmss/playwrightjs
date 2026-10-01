const {test,expect}=require("@playwright/test")

test("Valid Login",async function({page}){

    await page.goto("https://www.saucedemo.com/")

    await page.getByPlaceholder("Username").fill("standard_user")

    await page.locator("input[name='password']").fill("secret_sauce")

    await page.locator('#login-button').click();
   //  await page.locator("input[@id='login-button']").click();

   await page.waitForTimeout(5000)

   await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    await expect(page.locator('.title')).toHaveText("Products");
});
