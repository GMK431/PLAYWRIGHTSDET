// Post request with data using in json file which is in test-data folder

import { test, expect } from '@playwright/test'
import fs from 'fs';

test("Create Post Request using Json file", async ({ request }) => {

    const jsonFilePath = "test-data/post_request_body.json";
    const requestBody = JSON.parse(fs.readFileSync(jsonFilePath, "utf-8"));


    const response = await request.post("https://restful-booker.herokuapp.com/booking", { data: requestBody });

    const responseBody = await response.json();
    console.log(responseBody);

    //Validate status and status code
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    //validate response body attrbutes
    expect(responseBody).toHaveProperty("bookingid");
    expect(responseBody).toHaveProperty("booking");
    expect(responseBody).toHaveProperty("booking.additionalneeds");

    //validate booking details
    const booking = responseBody.booking;


    expect(booking).toMatchObject({
        firstname: requestBody.firstname,
        lastname: requestBody.lastname,
        totalprice: requestBody.totalprice,
        depositpaid: requestBody.depositpaid,
        additionalneeds: requestBody.additionalneeds
    });

    //Validate booking dates(nested json object)
    expect(booking.bookingdates).toMatchObject({
        checkin: requestBody.bookingdates.checkin,
        checkout: requestBody.bookingdates.checkout
    })
})