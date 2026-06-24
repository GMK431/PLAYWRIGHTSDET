// Post request with data created randomly using faker, if we dont know what data need to pass exactly

import { test, expect } from '@playwright/test'
import {faker} from '@faker-js/faker'
import {DateTime} from 'luxon';

test("Create Post Request using Json file", async ({ request }) => {


    const fakefirstname = faker.person.firstName();
    const fakelastname = faker.person.lastName();
    const faketotalprice = faker.number.int({min:1000, max :5000});
    const fakedepositpaid = faker.datatype.boolean();
    const checkinDate = DateTime.now().toFormat("yyyy-MM-dd");
    const checkoutDate = DateTime.now().plus({day:5}).toFormat("yyyy-MM-dd")

   const additionalneeds = "Break Fast";

   const requestBody = {
        firstname: fakefirstname,
        lastname: fakelastname,
        totalprice: faketotalprice,
        depositpaid: fakedepositpaid,
        bookingdates: {
            checkin: checkinDate,
            checkout: checkoutDate
        },
        additionalneeds: additionalneeds
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