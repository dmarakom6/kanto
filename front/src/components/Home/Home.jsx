import "./home.css"

import EventCalendar from "./EventCalendar/EventCalendar";
import Navbar from "./Navbar/Navbar";
import PastEvents from "./PastEvents/PastEvents";
import Vision from "./Vision/Vision";
import Footer from "./Footer/Footer";


export default function Home() {
    return(
        <>
        <Navbar />
        <EventCalendar />
        <PastEvents />
        <Vision />
        <Footer />
        </>
    )
}