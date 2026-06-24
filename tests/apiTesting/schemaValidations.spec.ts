import { test, expect } from '@playwright/test'
import ajv, { Ajv } from 'ajv';
import fs from 'fs';

test("Validate JSON Scehma", async ({ request }) => {

    const response = await request.get("https://mocktarget.apigee.net/json");
    const responseBody = await response.json();
    console.log(responseBody);

    const schema = JSON.parse(fs.readFileSync("test-data/schema.json", 'utf-8'));

    const ajv = new Ajv();
    const validate = ajv.compile(schema); //returns a validator func.
    const isValid: boolean = validate(responseBody); // Validates the schema with response and returns boolean value
    expect(isValid).toBeTruthy();

})