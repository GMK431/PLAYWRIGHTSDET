// Post request with data declared in test

import { test, expect } from '@playwright/test'

test("Create Post Request using Static Body", async ({ request }) => {

    const requestBody = {
        firstname: "Dedeepya",
        lastname: "Siddabathuni",
        totalprice: 1110,
        depositpaid: true,
        bookingdates: {
            checkin: "2026-06-20",
            checkout: "2026-06-21"
        },
        additionalneeds: "Breakfast"
    }

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
        firstname: "Dedeepya",
        lastname: "Siddabathuni",
        totalprice: 1110,
        depositpaid: true,
        additionalneeds: "Breakfast"
    });

    //Validate booking dates(nested json object)
    expect(booking.bookingdates).toMatchObject({
        checkin: "2026-06-20",
        checkout: "2026-06-21"
    })
})