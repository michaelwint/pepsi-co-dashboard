import React, { useContext, useEffect } from 'react';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import FlowrateGauge from '../../Components/FlowrateGauge/FlowrateGauge';
import AlertTable from '../../Components/AlertTable/AlertTable'
import Spinner from 'react-bootstrap/Spinner'
import { store } from '../../Store/store'
import { LOADING_FINISHED } from '../../Store/Action Types/actionTypes'

export default function HomePage(props) {
    let productionSegmentData = {
        id: 1,
        title: 'production segment',
        thresholds: [0, 5, 10, 20, 50, 60],
        value: 16,
        size: 550,
        date: '2020-04-16 12:30:00'
    }

    let data = [
        {
            id: 2,
            title: "Spray Bars 2",
            thresholds: [0, 10, 20, 40, 70, 100],
            value: 36,
            open: true
        },
        {
            id: 3,
            title: "Spray Bars 3",
            thresholds: [0, 10, 20, 40, 70, 100],
            value: 0,
            open: false
        },
        {
            id: 4,
            title: "Spray Bars 4",
            thresholds: [0, 10, 20, 40, 70, 100],
            value: 32,
            open: true
        },
        {
            id: 5,
            title: "Spray Bars 5",
            thresholds: [0, 5, 10, 20, 50, 60],
            value: 0,
            open: false
        },
        {
            id: 4,
            title: "Spray Bars 4",
            thresholds: [0, 10, 20, 40, 70, 100],
            value: 32,
            open: true
        },
        {
            id: 5,
            title: "Spray Bars 5",
            thresholds: [0, 5, 10, 20, 50, 60],
            value: 0,
            open: false
        },
        {
            id: 5,
            title: "Spray Bars 5",
            thresholds: [0, 5, 10, 20, 50, 60],
            value: 28,
            open: true
        },
        {
            id: 5,
            title: "Spray Bars 5",
            thresholds: [0, 5, 10, 20, 50, 60],
            value: 34,
            open: true
        },
        {
            id: 5,
            title: "Spray Bars 5",
            thresholds: [0, 5, 10, 20, 50, 60],
            value: 55,
            open: true
        },
        {
            id: 5,
            title: "Spray Bars 5",
            thresholds: [0, 5, 10, 20, 50, 60],
            value: 55,
            open: true
        }
    ]

    const isLoading = useContext(store).state.isLoading
    const { dispatch } = useContext(store);
    const axios = require('axios').default;


    useEffect(() => {
        // TODO: Wait for a route for the relevant data here
        // axios.get("url").then(response => {
        //     dispatch({ type: LOADING_FINISHED })
        // })
    }, [])

    return (
        <Container fluid>
            { isLoading ? <Spinner animation="border" variant="primary" /> :
            <Row>
                <Col xs={6}>
                    <FlowrateGauge data={productionSegmentData}></FlowrateGauge>
                    <br />
                    <br />
                    <br />
                    <AlertTable></AlertTable>
                </Col>
                <Col xs={6}>
                    <Row>
                        { data.map((currGauge) => {
                            return <Col xs={4}>
                                <FlowrateGauge data={currGauge}></FlowrateGauge>
                            </Col>
                        })}
                    </Row>
                </Col>
            </Row>
            }
        </Container>
    );
}