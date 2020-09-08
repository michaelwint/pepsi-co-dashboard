import React from 'react';
import ReactSpeedometer from 'react-d3-speedometer'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import './FlowrateGauge.css'

export default function FlowrateGauge(props) {
    return (
        <Container>
            <Row>
                <Col>
                    <h4>{props.data.title}</h4>
                </Col>
            </Row>
            <Row>
                <Col className='gauge-container'>
                    <ReactSpeedometer
                        needleHeightRatio={0.8}
                        maxValue={props.data.thresholds[props.data.thresholds.length - 1]}
                        customSegmentStops={props.data.thresholds}
                        segmentColors={["crimson", "gold", "limegreen", "gold", "crimson"]}
                        value={props.data.value}
                    />
                </Col>
            </Row>
        </Container>
    )
}