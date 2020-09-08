import React from 'react';
import ReactSpeedometer from 'react-d3-speedometer'

export default function Gauge(props) {
    let data = {
        value: 46.45,
        thresholds: [0, 10, 20, 30, 40, 50]
    }

    return (
        <ReactSpeedometer
            needleHeightRatio={0.7}
            maxSegmentLabels={6}
            segments={3}
            maxValue={data.thresholds[data.thresholds.length - 1]}
            customSegmentStops={data.thresholds}
            segmentColors={["crimson", "gold", "limegreen", "gold", "crimson"]}
            value={data.value}
            width={300}
        />
    )
}