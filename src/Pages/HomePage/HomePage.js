import React, { useState, useContext, useEffect } from 'react';

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import FlowrateGauge from '../../Components/FlowrateGauge/FlowrateGauge';
import AlertTable from '../../Components/AlertTable/AlertTable'
import Spinner from 'react-bootstrap/Spinner'
import { FaSync } from 'react-icons/fa'
import { store } from '../../Store/store'
import { LOADING_STARTED, LOADING_FINISHED, LOAD_CURRENT_PROD_SEGMENT_FLOWRATES, LOAD_VALVE_GROUP_CURRENT_FLOWRATES, SET_REFRESH_RATE } from '../../Store/Action Types/actionTypes'
import { isEmptyObject } from 'jquery';

export default function HomePage(props) {
    const axios = require('axios').default;
    const { dispatch } = useContext(store);
    const serverUrl = useContext(store).state.serverUrl;
    const isLoading = useContext(store).state.HomePage.isLoading;
    const refreshRate = useContext(store).state.HomePage.refreshRate;
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

    const loadData = async () => {
        dispatch({ type: LOADING_STARTED });

        // Load the current Production flowrate in the main gauge
        await axios.get(serverUrl + "currentProductionFlowrates").then(response => {
            let responseData = response.data._embedded.currentProductionFlowrates[0];

            let customData = {
                title: responseData.product_name + " / Stage " + responseData.stage_name + " " + responseData.stage_description,
                thresholds: [
                    0,
                    responseData.limits_alertflowratemin,
                    responseData.limits_warnflowratemin,
                    responseData.limits_warnflowratemax,
                    responseData.limits_alertflowratemax,
                    responseData.limits_alertflowratemax * 1.1
                ],
                value: responseData.flowratemean,
                size: 550,
                date: responseData.timestamp
            }

            dispatch({ type: LOAD_CURRENT_PROD_SEGMENT_FLOWRATES, payload: customData });
        }).then(() => {

            // Load the flowrate for every Valve Group
            axios.get(serverUrl + "valveGroupCurrentFlowrates").then(response => {
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
                dispatch({ type: LOADING_FINISHED });
            })
        })
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
          loadData()
        }, refreshRate)
      
        return () => clearInterval(intervalId);
      
      }, [serverUrl, useState])

    useEffect(() => {
        loadData();
    }, [])

    const onRefreshClick = () => {
        loadData();
    }

    const setRefreshRate = (selectedRefreshRate) => {
        dispatch({ type: SET_REFRESH_RATE, payload: selectedRefreshRate })
    }

    return (
        <Container fluid>
            <Row>
                <Col xs={2}>
                    <Row>
                        <Col xs={2}>
                            <Button variant="primary" disabled={isLoading} onClick={onRefreshClick}>
                                { isLoading ? <Spinner animation="border" size="sm"/> : <FaSync></FaSync> }
                            </Button>
                        </Col>
                        <Col xs={2}>
                            <DropdownButton title={(refreshRate / 1000) + "s"}>
                                <Dropdown.Item onSelect={() => setRefreshRate(5000)}>5s</Dropdown.Item>
                                <Dropdown.Item onSelect={() => setRefreshRate(10000)}>10s</Dropdown.Item>
                                <Dropdown.Item onSelect={() => setRefreshRate(30000)}>30s</Dropdown.Item>
                            </DropdownButton>
                        </Col>
                    </Row>
                </Col>
            </Row>
            { !isEmptyObject(valveGroupCurrentFlowrates) &&
            <Row>
                <Col xs={6}>
                    <FlowrateGauge data={currentProductionFlowrates}></FlowrateGauge>
                    <br /><br /><br />
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