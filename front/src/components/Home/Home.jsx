import EventCalendar from "./EventCalendar/EventCalendar";
import Navbar from "./Navbar/Navbar";
import PastEvents from "./PastEvents/PastEvents";
import Vision from "./Vision/Vision";


export default function Home() {
    return(
        <>
        <Navbar />
        <EventCalendar />
        <PastEvents />
        <Vision />
        </>
    )
}