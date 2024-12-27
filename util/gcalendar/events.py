from datetime import datetime,timezone
from dotenv import load_dotenv
import json
import os

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

load_dotenv(dotenv_path=".tokens/.env")

token_data = {
    "token": os.getenv("TOKEN"),
    "refresh_token": os.getenv("REFRESH_TOKEN"),
    "token_uri": os.getenv("TOKEN_URI"),
    "client_id": os.getenv("CLIENT_ID"),
    "client_secret": os.getenv("CLIENT_SECRET"),
    "scopes": ["https://www.googleapis.com/auth/calendar.readonly"],
    "universe_domain": os.getenv("UNIVERSE_DOMAIN"),
    "account": os.getenv("ACCOUNT"),
    "expiry": os.getenv("EXPIRY"),
}

with open("./gcaltoken.json", "w") as gcal:
    json.dump(token_data, gcal, indent=4)

# If modifying these scopes, delete the file gcaltoken.json.
SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"]


def fetch_past_events(n):
  """
  Returns info of the past n events on the user's calendar.
  """
  creds = None
  # The file gcaltoken.json stores the user's access and refresh tokens, and is
  # created automatically when the authorization flow completes for the first
  # time.
  creds = Credentials.from_authorized_user_file("gcaltoken.json", SCOPES)
  # If there are no (valid) credentials available, let the user log in.
  if not creds or not creds.valid:
    if creds and creds.expired and creds.refresh_token:
      creds.refresh(Request())
    else:
      flow = InstalledAppFlow.from_client_secrets_file(
          ".tokens/credentials.json" , SCOPES
      )
      creds = flow.run_local_server(port=0)
    # Save the credentials for the next run
    with open("gcaltoken.json", "w") as token:
      token.write(creds.to_json())

  try:
    service = build("calendar", "v3", credentials=creds)

    # Call the Calendar API
    now = datetime.now(timezone.utc).isoformat()  # ISO format includes 'Z' for UTC automatically
    events_result = (
        service.events()
        .list(
            calendarId="primary",
            timeMax=now,
            maxResults=n,
            singleEvents=True,
            orderBy="startTime",
        )
        .execute()
    )
    events = events_result.get("items", [])

    if not events:
      print("No past events found.")
      return

    new_event_info = []
    for event in events:
        start = event["start"].get("dateTime", event["start"].get("date"))
        start_date = datetime.strptime(start.split("T")[0], "%Y-%m-%d").strftime("%d-%m-%Y")
        try:
          new_event_info.append({
                               'title': event["summary"], 
                               'date': start_date,
                               'category': event["location"] or "Χωρίς Κατηγορία",
                               'url': event["description"]
                              })
        except KeyError:
          new_event_info.append({
                               'title': event["summary"], 
                               'date': start_date,
                               'category': event["location"],
                               'url': ""
                              })
          

    return new_event_info


  except HttpError as error:
    print(f"An http error occurred: {error}")


# if __name__ == "__main__":
#   fetch_past_events(10)