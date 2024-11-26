import "./EventCalendar.css"

export default function EventCalendar() {
    return(
        <div className="event-calendar--outer">
        <div className="event-calendar">
            <h1>Ημερολόγιο</h1>
            <div className="event-calendar--container">
            <iframe className="event-calendar--iframe" src="https://calendar.google.com/calendar/embed?height=600&wkst=2&ctz=Europe%2FAthens&showTz=0&showTabs=0&mode=WEEK&title=%CE%A0%CF%81%CE%BF%CF%83%CE%B5%CF%87%CF%8E%CF%82%20-%20%CE%9A%CE%AC%CE%BD%CE%84%CF%84%CE%BF&src=a29pbm9zY2hvcm9za2FudG9AZ21haWwuY29t&color=%23039BE5"></iframe>
            </div>
        </div>
        </div>
    )
}