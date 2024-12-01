import { google } from 'googleapis';

export async function GET(req) {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI // Example: 'http://localhost:3000/api/oauth2callback'
  );

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline', // Ensures a refresh token is generated
    scope: ['https://www.googleapis.com/auth/business.manage'], // Required scope for fetching reviews
  });

  return new Response(JSON.stringify({ authUrl }), { status: 200 });
}