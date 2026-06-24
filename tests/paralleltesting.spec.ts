import { test } from '@playwright/test'

//test.describe.configure({ mode: 'serial' })

test.describe("Parallel Testing", async () => {

    test("Test 1", async () => {
        console.log("----------Test 1------------")
    })
    test("Test 2", async () => {
        console.log("----------Test 2------------")
    })
    test("Test 3", async () => {
        console.log("----------Test 3------------")
    })
    test("Test 4", async () => {
        console.log("----------Test 4------------")
    })
    test("Test 5", async () => {
        console.log("----------Test 5------------")
    })

})
/*
---fullyParallel :false --->Runs in order with 1 worker sequentially
---For single test group, we want to run them sequentially, we can configure in file itself like above. It overrides config file parameter
---For parallel execution, if we wont specify workers, then it will take how many no.of tests(5)-> no.of workers(5). But, if we provide
    in config file, workers : 2, then it will take only 2 workers.
--- If I want to run parallel execution on particular browser only, all others in sequential mode then in config file under projects config
    under browsers, need to add fullyParallel :true 
--- If we assign worker : 1 and fullyParallel:true, then it go with serial execution only not parallel.
--- To want to change workers at run time, we can specify command as npx playwright test paralleltesting.spec.ts --workers=5,
    where it will override workers in config file.
*/
