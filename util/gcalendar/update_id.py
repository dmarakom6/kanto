import json

def get_last_id(json_data) -> int:
    """Gets the last id from the calendar json file.

    Args:
        json_data (string): the json file (calendar.json)
    """
    with open(f"../front/data/{json_data}") as cal: # this is run from the parent folder, util/
        content = [int(i) for i in list(json.loads(cal.read()).keys())] #list of all ids (sorted)
        return content[-1]
        
def increment_id(id: int) -> int: return id + 1

# if __name__ == "__main__":
#     print(increment_id(get_last_id("calendar.json")))