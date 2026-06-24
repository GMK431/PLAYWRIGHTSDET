/*
--Create Booking ID -- POST
-- Save Booking ID from response
---Get Booking ID
--Create Token
-- Will update same booking -- PUT
-- Delete Booking
*/

import { test, expect } from '@playwright/test'
import fs from 'fs';

//Utility Function to read json data
function readJsonFile(filePath: string) {

    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));

}
test("Delete Booking", async ({ request }) => {


    const requestBody = readJsonFile("test-data/post_request_body.json");
    const createResponse = await request.post("https://restful-booker.herokuapp.com/booking", { data: requestBody });

    expect(createResponse.ok()).toBeTruthy();

    const responseBody = await createResponse.json();
    console.log(responseBody);

    const bookingid = responseBody.bookingid; // Reading bookingid from response body
    console.log("-----------Booking ID is : =====>", bookingid);

    //Get Booking ID
    const getBookingIDResponse = await request.get(`https://restful-booker.herokuapp.com/booking/${bookingid}`);
    const getBookingIDResponseBody = await getBookingIDResponse.json();
    console.log("Booking Details are ----------", getBookingIDResponseBody);

    //Create Token

    const tokenRequestBody = readJsonFile("test-data/token_request_body.json")
    const tokenResponse = await request.post("https://restful-booker.herokuapp.com/auth", { data: tokenRequestBody });

    expect(tokenResponse.ok()).toBeTruthy();

    const tokenResponseBody = await tokenResponse.json();
    const token = tokenResponseBody.token;
    console.log("Token Generated is : ",token);


    // Update Booking Details

    const updateRequestBody = readJsonFile("test-data/patch_request_body.json");
    const updateResponse = await request.patch(`https://restful-booker.herokuapp.com/booking/${bookingid}`,
        {
            headers: { Cookie: `token=${token}` },
            data: updateRequestBody
        }
    );
    expect(updateResponse.ok()).toBeTruthy();
    expect(updateResponse.status()).toBe(200);

    const updateResponseBody = await updateResponse.json();
    console.log("Updated Details ----------------", updateResponseBody);
    console.log("-----------Updated Succesfully-----------------");

    // Delete Booking Details
    const deleteResponse = await request.delete(`https://restful-booker.herokuapp.com/booking/${bookingid}`, {
        headers: { Cookie: `token=${token}` }
    });

    expect(deleteResponse.status()).toBe(201);
    expect(deleteResponse.statusText()).toBe("Created");
    console.log("-----------Deleted Successfully-----------------");
});