import React from 'react';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import FlowrateGauge from '../../Components/FlowrateGauge/FlowrateGauge';

export default function AboutPage(props) {
    let data = [
        {
            id: 1,
            title: "Spray Bars",
            thresholds: [0, 5, 10, 20, 50, 60],
            value: 24
        }
    ]

    return (
        <Container fluid>
            <Row>
                <Col>
                    <FlowrateGauge data={data[0]}></FlowrateGauge>
                </Col>
                <Col>
                    <FlowrateGauge data={data[0]}></FlowrateGauge>
                </Col>
            </Row>
        </Container>
    );
}