import { test, expect } from '@playwright/test'


//Path Parameter
test("Get BookingDetails by ID", async ({ request }) => {

    const bookingID = 1153;

    const response = await request.get(`https://restful-booker.herokuapp.com/booking/${bookingID}`);
    const responseBody = await response.json();

    console.log(responseBody);

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
})


//Query Parameter
test.only("Get BookingDetails by Name", async ({ request }) => {

    const firstName = "Jim";
    const lastName = "Brown"

    const response = await request.get("https://restful-booker.herokuapp.com/booking", { params: { firstName, lastName } });
    const responseBody = await response.json();

    console.log(responseBody);

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    expect(responseBody.length).not.toBe(0); //Response should have something

    //Assertion for all booking ID's in response ----> Used for loop
    for (const item of responseBody) {
        expect(item).toHaveProperty("bookingid");
        expect(typeof item.bookingid).toBe("number");
        expect(item.bookingid).not.toBe(0);
    }
})