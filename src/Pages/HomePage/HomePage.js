import React, { useState, useContext, useEffect } from 'react';

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import FlowrateGauge from '../../Components/FlowrateGauge/FlowrateGauge';
import AlertTable from '../../Components/AlertTable/AlertTable'
import Spinner from 'react-bootstrap/Spinner'
import { FaSync } from 'react-icons/fa'
import { store } from '../../Store/store'
import { TOGGLE_LOADING, LOAD_CURRENT_PROD_SEGMENT_FLOWRATES, LOAD_VALVE_GROUP_CURRENT_FLOWRATES } from '../../Store/Action Types/actionTypes'

export default function HomePage(props) {
    const axios = require('axios').default;
    const { dispatch } = useContext(store);
    const serverUrl = useContext(store).state.serverUrl;
    const isLoading = useContext(store).state.HomePage.isLoading;
    const currentProductionFlowrates = useContext(store).state.HomePage.currentProductionFlowrates;
    const valveGroupCurrentFlowrates = useContext(store).state.HomePage.valveGroupCurrentFlowrates;

    let productionSegmentData = {
        id: 1,
        title: 'production segment',
        thresholds: [0, 5, 10, 20, 50, 60],
        value: 16,
        size: 550,
        date: '2020-04-16 12:30:00'
    }

    const loadData = () => {

        // axios.get(serverUrl + "currentProductionFlowrates").then(response => {
        //     let responseData = response.data._embedded.currentProductionFlowrates;

        //     let customData = {
        //         title: responseData.productName + " " + responseData.stage_description,
        //         thresholds: [
        //             0,
        //             responseData.limits_alertflowratemin,
        //             responseData.limits_warnflowratemin,
        //             responseData.limits_warnflowratemax,
        //             responseData.limits_alertflowratemax,
        //             responseData.limits_alertflowratemax * 1.1
        //         ],
        //         value: responseData.flowratemean,
        //         size: 550,
        //         date: responseData.timestamp
        //     }

        //     dispatch({ type: LOAD_CURRENT_PROD_SEGMENT_FLOWRATES, payload: customData });
        // }).then(() => {
        axios.get(serverUrl + "valveGroupCurrentFlowrates").then(response => {
            debugger;
            let responseData = response.data._embedded.valveGroupCurrentFlowrates;
            let customData = [];

            responseData.map((currValve) => {
                customData.push({
                    title: currValve.valvegroup_name,
                    thresholds: [
                        0,
                        currValve.limits_alertflowratemin,
                        currValve.limits_warnflowratemin,
                        currValve.limits_warnflowratemax,
                        currValve.limits_alertflowratemax,
                        currValve.limits_alertflowratemax * 1.1
                    ],
                    value: currValve.measure,
                    open: currValve.open,
                    date: currValve.starttime
                })
            })

            dispatch({ type: LOAD_VALVE_GROUP_CURRENT_FLOWRATES, payload: customData });
            dispatch({ type: TOGGLE_LOADING });
        })
        // })
    }

    useEffect(() => {
        loadData();
    }, [])

    const onRefreshClick = () => {
        dispatch({ type: TOGGLE_LOADING });
        loadData();
        dispatch({ type: TOGGLE_LOADING });
    }

    return (
        <Container fluid>
            <Row>
                <Col xs={1}>
                    <Button variant="success" disabled={isLoading} onClick={onRefreshClick}><FaSync></FaSync></Button>
                </Col>
            </Row>
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
                        { valveGroupCurrentFlowrates.map((currValve) => {
                            return <Col xs={4}>
                                <FlowrateGauge data={currValve}></FlowrateGauge>
                            </Col>
                        })}
                    </Row>
                </Col>
            </Row>
            }
        </Container>
    );
}