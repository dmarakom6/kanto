from datetime import datetime,timezone
import os.path
import json

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

# If modifying these scopes, delete the file gcaltoken.json.
SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"]


def fetch_past_events(n, credentials):
  """
  Returns info of the past n events on the user's calendar.
  """
  creds = None
  # The file gcaltoken.json stores the user's access and refresh tokens, and is
  # created automatically when the authorization flow completes for the first
  # time.
  if os.path.exists("gcaltoken.json"):
    creds = Credentials.from_authorized_user_file("gcaltoken.json", SCOPES)
  # If there are no (valid) credentials available, let the user log in.
  if not creds or not creds.valid:
    if creds and creds.expired and creds.refresh_token:
      creds.refresh(Request())
    else:
      flow = InstalledAppFlow.from_client_config(
          dict(credentials) , SCOPES
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
        new_event_info.append({
                               'title': event["summary"], 
                               'date': start_date,
                               'category': event["location"] if event["location"] else None,
                               'url': event["description"] if event["description"] else ""
                              })

    return(new_event_info)


  except HttpError as error:
    print(f"An http error occurred: {error}")


# if __name__ == "__main__":
#   fetch_past_events(10)