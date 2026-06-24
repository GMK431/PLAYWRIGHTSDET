import { test, expect } from '@playwright/test'

//Hook - BeforeEach --> where it executes before of every test
test.beforeEach('Before-Each', async () => {
    console.log("Before Each");

})
//Hook - AfterEach --> where it executes after of every test
test.afterEach('After-Each', async () => {
    console.log("After Each");

})
//Hook - BeforeAll --> where it executes before of first test
test.beforeAll('Before-All', async () => {
    console.log("Before All");

})
//Hook - AfterAll --> where it executes after all the test
test.afterAll('After-All', async () => {
    console.log("After All");

})
test("Test1", async () => {
    console.log("----Test 1----")
})

test("Test2", async () => {
    console.log("----Test 2----")
})

test("Test3", async () => {
    console.log("----Test 3----")
})

test("Test4", async () => {
    console.log("----Test 4----")
})