import "./Vision.css"

export default function Vision() {
    return (
        <div className="vision--outer">
            <div className="vision">
                <svg width="100%" height="100%">
                    <defs>
                        <filter id="blur-and-invert">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
                            <feColorMatrix type="saturate" values="1" result="fbSourceGraphic" />
                            <feColorMatrix in="fbSourceGraphic" values="-1 0 0 0 1 0 -1 0 0 1 0 0 -1 0 1 0 0 0 1 0 " />
                        </filter>
                    </defs>
                    <foreignObject width="100%" height="100%" filter="url(#blur-and-invert)">
                        {/* <!-- Here goes the content --> */}
                        <h1>Sanity Check</h1>
                    </foreignObject>
                </svg>
            </div>
        </div>
    )
}