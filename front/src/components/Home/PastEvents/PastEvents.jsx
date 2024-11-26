import './PastEvents.css'

import ActivityCategories from './ActivityCategories'

export default function PastEvents() {
    return (
        <div className="past-events--outer">
            <div className="past-events">
                <h1 id='drastiriotites'>Δραστηριότητες</h1>
                <div className="activity-categories-container">
                    <ActivityCategories />
                </div>
            </div>
        </div>
    )
}