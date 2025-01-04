def reset_calendar():
    try:
        with open("../front/data/calendar.json", "w") as cal:
            cal.write("""{
    "1": {
        "title": "",
        "date": "",
        "category": "",
        "url": "",
        "recurring": false
        }
}""")
    
            return "Calendar reset."
    
    except:
        raise("An Error Occured. Calendar not reset.")
    
    
if __name__ == "__main__":
    print(reset_calendar())