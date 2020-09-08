import React from 'react';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import FlowrateGauge from '../../Components/FlowrateGauge/FlowrateGauge';
import AlertTable from '../../Components/AlertTable/AlertTable'

export default function HomePage(props) {
    let data = [
        {
            id: 1,
            title: "Spray Bars",
            thresholds: [0, 5, 10, 20, 50, 60],
            value: 12,
            size: 600
        },
        {
            id: 2,
            title: "Spray Bars 2",
            thresholds: [0, 10, 20, 40, 70, 100],
            value: 26
        },
        {
            id: 3,
            title: "Spray Bars 3",
            thresholds: [0, 10, 20, 40, 70, 100],
            value: 0
        },
        {
            id: 4,
            title: "Spray Bars 4",
            thresholds: [0, 10, 20, 40, 70, 100],
            value: 51
        },
        {
            id: 5,
            title: "Spray Bars 5",
            thresholds: [0, 5, 10, 20, 50, 60],
            value: 12
        }
    ]

    return (
        <Container fluid>
            <Row>
                <Col xs={6}>
                    <FlowrateGauge data={data[0]}></FlowrateGauge>
                    <AlertTable></AlertTable>
                    <AlertTable></AlertTable>
                </Col>
                <Col xs={6}>
                    <Row>
                        { data.filter((currGauge) => { return currGauge.size === undefined }).map((currGauge) => {
                            return <Col xs={4}>
                                <FlowrateGauge data={currGauge}></FlowrateGauge>
                            </Col>
                        })}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}