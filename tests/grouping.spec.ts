import { test, expect } from '@playwright/test'
//All tests run in parallel, so it wont follow order here. But, to make it run in parallel in config file, make fullyParallel = false.

//test.describe to group the tests.
//To run particular group --> npx playwright test grouping.spec --grep Group1
test.describe("Group1", async () => {

    test("Test1", async () => {
        console.log("----Test 1----")
    })

    test("Test2", async () => {
        console.log("----Test 2----")
    })
})


test.describe("Group2", async () => {
    test("Test3", async () => {
        console.log("----Test 3----")
    })

    test("Test4", async () => {
        console.log("----Test 4----")
    })

})






