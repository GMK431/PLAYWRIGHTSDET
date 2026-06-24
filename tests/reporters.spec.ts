import { test, expect, Locator } from '@playwright/test'

test.beforeEach("Launching App", async ({ page }) => {

    await page.goto("https://demowebshop.tricentis.com/")
})
test("Logo Test", async ({ page }) => {

    await expect(page).toHaveURL("https://demowebshop.tricentis.com/");
    const logo: Locator = page.getByAltText("Tricentis Demo Web Shop");
    await expect(logo).toBeVisible();
})

test("Title Test", async ({ page }) => {

    await expect(page).toHaveTitle("Demo Web Shop");

})

//-------------Not preferab;e mostly ------------------
//By default report saves in playwright-report folder ---> to change we need to configure in config file under reporter
//Whenever test pass, it wont open ---> so if we want to open always or dont open on any case --->configure in config file under reporter
//reporter :[['html',{open:'always',outputFolder:'html-report'}]] ---> Here creates html-report folder and add the rport index.html

//By using command prompt we can give ---> npx playwright test reporters.spec.ts --headed --reporter html

/* ----Built-In reports which can be configure under config file

reporter: [['html', { open: 'on-failure', outputFolder: 'html-report' }],
            //['list'],
            //['line'],
            //['dot'],
              ['junit',{outputFile:'junit/results.xml'}],// Name of file
              ['json',{outputFile:'json/results.json'}]// Name of file
          ],

*/