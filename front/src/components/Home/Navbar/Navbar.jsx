import { useState } from 'react'
import './Navbar.css'
import biglogo from '/biglogo.png'

export default function Navbar() {

    const [active, setActive] = useState(0)
    const Links = {
        "Ημερολόγιο": "#imerologio",
        "Δραστηριότητες": "#drastiriotites",
        "Τι θέλουμε": "#orama"
    }

    return (
        <nav className='nav'>
            <img className='nav--bigLogo' src={biglogo} alt="Logo"></img>
            <div className="nav--links">
                {Object.entries(Links).map(([key, value], index) => (
                    <a
                        key={index}
                        href={value}
                        className={active === index ? 'active-link' : ''}
                        onClick={() => setActive(index)}
                    >
                        {key}
                    </a>
                ))}
            </div>
        </nav>
    )
}