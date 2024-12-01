import { google } from 'googleapis';

export async function GET() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });

  try {
    const accountId = process.env.GOOGLE_ACCOUNT_ID;
    const locationId = process.env.GOOGLE_LOCATION_ID;

    const response = await oauth2Client.request({
      url: `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/reviews`,
      method: 'GET',
    });


    return new Response(JSON.stringify(response.data || {}), { status: 200 });
  } catch (error) {
    console.error('Error fetching Google reviews:', error.response?.data || error.message);
    return new Response(JSON.stringify({ error: 'Failed to fetch Google reviews' }), { status: 500 });
  }
}
