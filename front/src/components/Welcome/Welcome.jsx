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
            <div className={`welcome-container ${isVisible ? 'visible' : 'hidden'}`}>
                <div className="welcome-container--box">
                    <h1>Κάν&apos; το!</h1>
                    <p>
                        Γίνε μέλος της ομάδας μας και δραστηριοποιήσου μαζί μας σήμερα. Μαζί, θα κάνουμε τα <i>λόγια</i>, <b>πράξη</b>. Σε περιμένουμε στον{' '}
                        <a href="#">κοινό μας χώρο</a>.
                    </p>
                    <button onClick={handleClick}>Κάν&apos;το Τώρα</button>
                </div>
            </div>
        )
    );
}
