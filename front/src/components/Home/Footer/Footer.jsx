import './Footer.css'

export default function Footer() {
    return (
        <footer className="footer">
            <h1 className='footer--title'>Για τον Πολιτισμό, το Περιβάλλον, την Έκφραση, τη Δημιουργία... <span style={{color: 'var(--fg-third)'}}>Κάν΄το!</span></h1>
            <div className="footer--copyright">&copy;{new Date().getFullYear()} <a href='https://www.instagram.com/dimitrismarako'>Δημήτρης Μαρακομιχελάκης</a>. All Rights Reserved.</div>
        </footer>
    )
}