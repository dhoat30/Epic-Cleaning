
import { NextResponse } from 'next/server'
const { google } = require('googleapis');


// GET handler
export async function GET(req) {
  return NextResponse.json({message: "This Worked"});

  // try {
  //   // Replace these with your actual account and location IDs
  //   const accountId = process.env.GOOGLE_ACCOUNT_ID; // Example: '1234567890'
  //   const locationId = process.env.GOOGLE_LOCATION_ID; // Example: '987654321'

  //   // Fetch reviews
  //   const reviews = await fetchGoogleReviews(accountId, locationId);

  //   // Return reviews in JSON format
    
  //   return NextResponse.json({ reviews });
  // } catch (error) {
  //   return NextResponse.json(
  //     { error: error.message || 'An error occurred' },
  //     { status: 404 }
  //   );
  // }
}
export async function POST(req, res) {
  return NextResponse.json({message: "This Worked"});

 
};