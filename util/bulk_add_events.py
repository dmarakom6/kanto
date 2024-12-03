import time
import json

from gcalendar.update_id import *

def bulk_add():
    """Bulk adds events to calendar.json."""
    print("BULK ADD EVENTS TO CALENDAR.JSON")
    print("================================")

    # Load the existing JSON
    with open("../front/data/calendar.json", 'r') as cal_file:
        events = json.load(cal_file)

    i = 0
    title = input(f"#{i+1} | event.title: ")
    while title.lower() != "quit":
        i += 1
        date = input("event.date [DD-MM-YYYY]: ")
        category = input("event.category: ")
        url = input("event.url [or '']: ")

        # Add the new event with a unique ID
        new_id = increment_id(get_last_id("calendar.json"))
        events[str(new_id)] = {
            "title": title,
            "date": date,
            "category": category,
            "url": url
        }

        # Save the updated JSON
        with open("../front/data/calendar.json", 'w') as cal_file:
            json.dump(events, cal_file, indent=4, ensure_ascii=False)

        print("\nOK\n")
        time.sleep(1)

        title = input(f"#{i+1} | event.title: ")

    print(f"Added {i} event{'s' if i > 1 else ''}.")

if __name__ == "__main__":
    bulk_add()
