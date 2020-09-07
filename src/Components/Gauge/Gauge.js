import React from 'react';
import ReactSpeedometer from 'react-d3-speedometer'

export default function Gauge(props) {
    let data = {
        value: 46.45,
        thresholds: []
    }

    return (
        <ReactSpeedometer
            needleHeightRatio={0.7}
            maxSegmentLabels={5}
            segments={3}
            customSegmentStops={[0, 500, 750, 900, 1000]}
            segmentColors={["firebrick", "tomato", "gold", "limegreen"]}
            value={333}
        />
    )
}