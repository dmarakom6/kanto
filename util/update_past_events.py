from gcalendar.events import *
from gcalendar.update_id import *

import json
import sys

with open("../front/data/calendar.json", "r") as file:
    existing_events = json.load(file)

past_event_info = fetch_past_events(10, str(json.loads(sys.argv[0]))) #default

# Create a set of existing event values for quick comparison, might find a quicker way in the future
existing_event_values = {json.dumps(event, sort_keys=True) for event in existing_events.values()}

past_events = {}
id = increment_id(get_last_id("calendar.json"))

# Add only unique events
for event in past_event_info:
    # Serialize the event to a string and check for duplicates
    if json.dumps(event, sort_keys=True) not in existing_event_values:
        past_events[f"{id}"] = event
        id += 1

# Merge past_events into existing_events
existing_events.update(past_events)

# Write updated events back to the JSON file
with open("../front/data/calendar.json", "w") as file:
    json.dump(existing_events, file, indent=4, ensure_ascii=False)

print(f"Added {len(past_events)} new events.")
