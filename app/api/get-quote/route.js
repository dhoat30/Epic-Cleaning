

import { quoteCalculation } from '@/utils/quoteCalculation';
import { NextResponse } from 'next/server'

export async function POST(req, res) {
    const request = await req.json();
    const price = quoteCalculation(request)
    request["quote"] = price
    request["app_used"] = "quote-calculator"

    const payload = JSON.stringify({
        "properties": request
    })

    var postOptions = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.HUBSPOT_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: payload,
        redirect: 'follow'
    };
    var patchOptions = {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${process.env.HUBSPOT_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: payload,
        redirect: 'follow'
    };

    try {
        // create contact 
        let response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', postOptions)
        response = await response.json();


        // update contact 
        if (response.status === "error") {
            response = await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${request.email}?idProperty=email`, patchOptions)
            response = await response.json();
        }
        return NextResponse.json({ message: "This Worked", success: true, data: response, price: price });
    } catch (error) {
        console.error(error);
        // const err = await error.json();

        return NextResponse.json({ message: error, success: false });
        // res.status(500).send('Error sending email');

    }
}

export async function GET(req, res) {
    return NextResponse.json(res)

};