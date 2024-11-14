import { useState } from 'react';
import './welcome.css';

export default function Welcome() {
    const [isVisible, setIsVisible] = useState(true);
    const [isHidden, setIsHidden] = useState(false);

    const handleClick = () => {
        setIsVisible(false);
        setTimeout(() => setIsHidden(true), 500);
    };

    return (
        !isHidden && (
            <div className={`welcome-container ${isVisible ? 'visible' : 'hidden'}`}>
                <div className="welcome-container--box">
                    <h1>Κάν' το!</h1>
                    <p>Γίνε μέλος της ομάδας μας και δραστηριοποιήσου μαζί μας σήμερα. Μαζί, θα κάνουμε τα <i>λόγια</i>, <b>πράξη</b>. Σε περιμένουμε στον <a href="#">κοινό μας χώρο</a>.</p>
                    <button onClick={handleClick}>Κάν'το Τώρα</button>
                </div>
            </div>
        )
    );
}
