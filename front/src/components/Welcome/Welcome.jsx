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
                                <h1>Μια κοινότητα σε κίνηση </h1>
                            </div>
                            <p>Ξεκινήσαμε σαν μια παρέα που αγαπούσε τον κινηματογράφο. Συζητώντας για τις ταινίες που βλέπαμε, ανακαλύψαμε τι σημαίνει να αποδέχεσαι τη ματιά του άλλου και να εμπλουτίζεις τη δική σου μέσα από αυτήν. Κάπου εκεί γεννήθηκε η ιδέα να πάμε ένα βήμα παραπέρα. Έτσι βρισκόμαστε τώρα στον σύλλογό μας, «Κοινός Χώρος – Κάν’ το».  Σε ένα χώρο κοινό, όπου ο καθένας μπορεί να εκφράσει την άποψή του και να υλοποιήσει τις ιδέες του. Μακριά από κλισέ και στερεότυπα που μας φυλακίζουν, μακριά από ταμπέλες κομμάτων, μιλάμε σαν προσωπικότητες, χωρίς ξύλινη γλώσσα. Μας ενδιαφέρουν όλοι οι παράδεισοι που ο καθένας έχει ανακαλύψει για τον εαυτό του και έχουν καταχωνιαστεί κάτω από το άγχος, το κυνήγι, τον τρόμο και την υπακοή που μας έχουν επιβάλει οι κάθε είδους «ειδικοί». Ιδέες, έκφραση, δημιουργία, εθελοντισμός. Αυτά θα θέλαμε εμείς. Αλλά πάντα, όσοι και να είμαστε, θα επιδιώκουμε να λειτουργούμε σαν παρέα. Ξεχωριστές προσωπικότητες που συζητάμε, ακούμε και κάνουμε πράξεις μέχρι εκεί που φτάνει το χέρι μας.</p>

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
