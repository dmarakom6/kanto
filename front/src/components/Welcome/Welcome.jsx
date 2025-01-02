import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import './welcome.css';

export default function Welcome() {
    const [isVisible, setIsVisible] = useState(true);
    const [isHidden, setIsHidden] = useState(false);
    const [cookies, setCookie] = useCookies(['welcomeDismissed']);

    useEffect(() => {
        // console.log('Current cookie value:', cookies.welcomeDismissed);
        if (cookies.welcomeDismissed === true) {
            setIsVisible(false);
            setIsHidden(true);
        }
    }, [cookies]);

    const handleClick = () => {
        setIsVisible(false);
        setCookie('welcomeDismissed', true, { path: '/', maxAge: 3600 * 24 });
        setTimeout(() => setIsHidden(true), 500);
    };

    return (
        !isHidden && (
            <>

                <div className={`welcome-container ${isVisible ? 'visible' : 'hidden'}`}>
                    <img src="fulllogo.jpg" alt="Κάντο!" />

                    <div className="welcome-container--box">
                        <div className="intro">
                            <div className='intro-header'>
                                <h1>Χωρίς Μεγάλα Λόγια - Ψευδοσοφίες - Φανφάρες.</h1>
                                <small>Δείτε μας στο Χάρτη πατώντας <a href='https://www.google.com/maps/place//data=!4m2!3m1!1s0x14a1bd5a1968954d:0xa6192a8eb73845bd?sa=X&ved=1t:8290&ictx=111'>εδώ</a>.</small>
                            </div>

                            <ul><b>Δεν</b> ισχυριζόμαστε:
                                <li>ότι έχουμε τη σωστή απάντηση για ό,τι γίνεται γύρω μας. Θέλουμε την προσωπική σου γνώμη. </li>
                                <li>ότι μπορούμε να τα κάνουμε εμείς. Θέλουμε τη δική σου συμμετοχή.</li>
                                <li>ότι είμαστε πρωτοπόροι. Απλά συντονίζουμε.</li>
                            </ul>
                        </div>
                        <div className="button-container">
                            <button onClick={handleClick}>Πατήστε εδώ</button>
                        </div>
                    </div>
                </div>
            </>
        )
    );
}
