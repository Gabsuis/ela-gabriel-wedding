import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Google Sheets Web App URL - You'll need to set this up
    // Instructions:
    // 1. Create a Google Sheet with columns: Timestamp, Name, Email, Phone, Guests, Dietary, Message, Mairie, Oriental, Kiddush, Huppa
    // 2. Go to Extensions > Apps Script
    // 3. Paste the script below and deploy as web app
    // 4. Replace GOOGLE_SHEETS_WEBHOOK_URL with your deployed URL

    const GOOGLE_SHEETS_WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

    if (GOOGLE_SHEETS_WEBHOOK_URL) {
      const response = await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit to Google Sheets');
      }
    } else {
      // For development/testing - just log the data
      console.log('RSVP Submission:', data);
    }

    return NextResponse.json({ success: true, message: 'RSVP submitted successfully' });
  } catch (error) {
    console.error('RSVP submission error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit RSVP' },
      { status: 500 }
    );
  }
}

/*
=== GOOGLE APPS SCRIPT FOR YOUR GOOGLE SHEET ===
Copy this script to your Google Sheet's Apps Script editor:

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      data.timestamp,
      data.name,
      data.email,
      data.phone,
      data.guests,
      data.dietary,
      data.message,
      data.mairie,
      data.oriental,
      data.kiddush,
      data.huppa
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

Deploy as:
- Execute as: Me
- Who has access: Anyone

*/
