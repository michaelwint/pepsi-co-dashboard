import React, { useState, useContext, useEffect } from 'react';

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Toast from 'react-bootstrap/Toast'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import FlowrateGauge from '../../Components/FlowrateGauge/FlowrateGauge'
import AlertTable from '../../Components/AlertTable/AlertTable'
import Spinner from 'react-bootstrap/Spinner'
import { FaSync } from 'react-icons/fa'
import { store } from '../../Store/store'
import { homePageStore } from '../../Store/homePageStore'
import { LOADING_STARTED, LOADING_FINISHED, LOAD_CURRENT_PROD_SEGMENT_FLOWRATES, LOAD_VALVE_GROUP_CURRENT_FLOWRATES, SET_REFRESH_RATE, LOAD_HARD_SOFT_FLOWRATES } from '../../Store/ActionTypes/actionTypes'
import { isEmptyObject } from 'jquery'
import FlowrateChart from '../../Components/FlowrateChart/FlowrateChart';

import './HomePage.css'

export default function HomePage(props) {
    const axios = require('axios').default;
    const { dispatch } = useContext(store);
    const serverUrl = useContext(store).state.serverUrl;
    const isLoading = useContext(store).state.HomePage.isLoading;
    const refreshRate = useContext(store).state.HomePage.refreshRate;
    const currentProductionFlowrates = useContext(store).state.HomePage.currentProductionFlowrates;
    const valveGroupCurrentFlowrates = useContext(store).state.HomePage.valveGroupCurrentFlowrates;
    const hardWaterData = useContext(store).state.HomePage.hardWaterData;
    const softWaterData = useContext(store).state.HomePage.softWaterData;
    const [showAlert, setShowAlert] = useState(false);

    const displayError = (error) => {
        dispatch({ type: LOADING_FINISHED})
        setShowAlert(true);
        console.log(error)
    }

    const loadData = async () => {
        dispatch({ type: LOADING_STARTED });

        // Load the current Production flowrate in the main gauge
        await axios.get(serverUrl + "currentProductionFlowrates").then(response => {
            let responseData = response.data._embedded.currentProductionFlowrates[0];

            let customData = {
                title: responseData.product_name + " / Stage - " + responseData.stage_name + " " + responseData.stage_description,
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
        }).catch(error => displayError(error)).then(() => {

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
            })
        }).catch(error => displayError(error)).then(() => {

            // Load the Har d& Soft flowrates
            axios.get(serverUrl + "pepsicoSummary/latest?secondsBack=360").then(response => {
                let responseData = response.data;

                // Init Hard Water min & max values
                let hardWaterData = {
                    maxVal: responseData.h2O_Hard_max,
                    minVal: responseData.h2O_Hard_min,
                    values: []
                };

                // Init Soft Water min & max values
                let softWaterData = {
                    maxVal: responseData.h2O_Zacht_max,
                    minVal: responseData.h2O_Zacht_min,
                    values: []
                };

                for (let i = responseData.summaries.length - 1; i >= 0; i--) {
                    hardWaterData.values.push([responseData.summaries[i].timestamp, responseData.summaries[i].h2O_Hard]);
                    softWaterData.values.push([responseData.summaries[i].timestamp, responseData.summaries[i].h2O_Zacht]);
                }

                // Init Hard & Soft Water given values
                // responseData.summaries.map((currVal) => {
                //     // hardWaterData.values.push({
                //     //     timestamp: currVal.timestamp,
                //     //     measure: currVal.h2O_Hard
                //     // });

                //     hardWaterData.values.push([currVal.timestamp, currVal.h2O_Hard * 100]);
                //     softWaterData.values.push([currVal.timestamp, currVal.h2O_Zacht]);
                // })

                console.log(hardWaterData);

                dispatch({ type: LOAD_HARD_SOFT_FLOWRATES, payload: { hardWaterData, softWaterData } })
                dispatch({ type: LOADING_FINISHED });
            }).catch(error => displayError(error))
        })
    }

    // Load the data on component initial mount
    useEffect(() => {
        if (isEmptyObject(currentProductionFlowrates) || isEmptyObject(valveGroupCurrentFlowrates))
            loadData();
    }, []);

    // Refresh the display every x seconds (Default is every 5 seconds)
    useEffect(() => {
        const intervalId = setInterval(() => {
            loadData();
        }, refreshRate)
      
        return () => clearInterval(intervalId);
      
      }, [/*serverUrl, useState*/]
    );

    // Occurs when clicking the Refresh button
    const onRefreshClick = () => {
        loadData();
    }

    // Occurs when selecting a refresh rate in the display
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
                        {/* <Col xs={2}>
                            <DropdownButton title={(refreshRate / 1000) + "s"}>
                                <Dropdown.Item onSelect={() => setRefreshRate(5000)}>5s</Dropdown.Item>
                                <Dropdown.Item onSelect={() => setRefreshRate(10000)}>10s</Dropdown.Item>
                                <Dropdown.Item onSelect={() => setRefreshRate(30000)}>30s</Dropdown.Item>
                            </DropdownButton>
                        </Col> */}
                    </Row>
                </Col>
            </Row>
            { !isEmptyObject(valveGroupCurrentFlowrates) && !isEmptyObject(hardWaterData) && !isEmptyObject(softWaterData) &&
            <Row>
                <Col xs={6}>
                    <FlowrateGauge data={currentProductionFlowrates}></FlowrateGauge>
                    <br /><br /><br />
                    <FlowrateChart title="Hard Water" data={hardWaterData} color={"green"}></FlowrateChart>
                    <FlowrateChart title="Soft Water" data={softWaterData} color={"teal"}></FlowrateChart>
                    <AlertTable></AlertTable>
                </Col>
                <Col xs={6}>
                    <Row>
                        { valveGroupCurrentFlowrates.map((currValve) => {
                            return <Col key={currValve.valvegroup_id} xs={4}>
                                <FlowrateGauge data={currValve}></FlowrateGauge>
                            </Col>
                        })}
                    </Row>
                </Col>
            </Row>
            }
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '300px', margin: '20px'}} >
                <Toast style={{color: 'white', backgroundColor: '#ff3043'}} autohide show={showAlert} onClose={() => setShowAlert(false)} >
                    <Toast.Body><strong >Error loading information</strong></Toast.Body>
                </Toast>
            </div>
        </Container>
    );
}