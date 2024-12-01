import { google } from 'googleapis';
import fs from 'fs';

export async function GET(req) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code'); // Extract the authorization code

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  try {
    const { tokens } = await oauth2Client.getToken(code);

    // Save the refresh token securely
    if (tokens.refresh_token) {
      fs.appendFileSync('.env.local', `GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}\n`);
      console.log('Refresh token saved to .env.local');
    }

    return new Response(JSON.stringify({ message: 'Tokens received successfully', tokens }), { status: 200 });
  } catch (error) {
    console.error('Error retrieving tokens:', error.message);
    return new Response(JSON.stringify({ error: 'Failed to retrieve tokens' }), { status: 500 });
  }
}
