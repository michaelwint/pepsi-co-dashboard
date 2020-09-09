import React from 'react';
import ReactSpeedometer from 'react-d3-speedometer'
import Badge from 'react-bootstrap/Badge'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import './FlowrateGauge.css'

export default function FlowrateGauge(props) {
    return (
        <Container fluid>
            <Row>
                <Col>
                    <h4>{props.data.title}</h4>
                    <h6>{props.data.date}</h6>
                </Col>
            </Row>
            <Row>
                <Col className='gauge-container'>
                    {
                        (props.data.open !== undefined) ? ((props.data.open) ? <Badge variant="success">Open</Badge> : <Badge variant="danger">Closed</Badge>) : <></>
                    }
                    <ReactSpeedometer
                        needleHeightRatio={0.8}
                        maxValue={props.data.thresholds[props.data.thresholds.length - 1]}
                        customSegmentStops={props.data.thresholds}
                        segmentColors={["crimson", "gold", "limegreen", "gold", "crimson"]}
                        value={props.data.value}
                        width={props.data.size ? props.data.size : 270}
                        paddingVertical={30}
                        currentValueText={"${value} m3/h"}
                        needleTransition={'easeElastic'}
                        needleTransitionDuration={2000}
                    />
                </Col>
            </Row>
        </Container>
    )
}