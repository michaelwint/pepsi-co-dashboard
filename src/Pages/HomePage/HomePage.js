import React, { useState, useContext, useEffect } from 'react';

import { Container, Row, Col } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Toast from 'react-bootstrap/Toast'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import FlowrateGauge from '../../Components/FlowrateGauge/FlowrateGauge'
import AnomaliesTable from '../../Components/AnomaliesTable/AnomaliesTable'
import Spinner from 'react-bootstrap/Spinner'
import { FaSync } from 'react-icons/fa'
import { store } from '../../Store/store'
import { homePageStore } from '../../Store/homePageStore'
import { LOADING_STARTED, LOADING_FINISHED, LOAD_CURRENT_PROD_SEGMENT_FLOWRATES, LOAD_VALVE_GROUP_CURRENT_FLOWRATES, SET_REFRESH_RATE, LOAD_HARD_SOFT_FLOWRATES, LOAD_UNACCOUNTED_FLOWRATES, LOAD_ANOMALIES_DATA } from '../../Store/ActionTypes/actionTypes'
import { isEmptyObject } from 'jquery'
import FlowrateChart from '../../Components/FlowrateChart/FlowrateChart';
import { MDBCard, MDBContainer } from "mdbreact"

import './HomePage.css'
import BarChart from '../../Components/BarChart/BarChart';

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
    const unaccountedFlowratesData = useContext(store).state.HomePage.unaccountedFlowratesData;
    const anomaliesData = useContext(store).state.HomePage.anomaliesData;
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
            let responseData = response.data.content[0];

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
                let responseData = response.data.content;
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

            // Load the Hard & Soft flowrates
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

                // Init Hard & Soft Water given values
                for (let i = responseData.summaries.length - 1; i >= 0; i--) {
                    hardWaterData.values.push([responseData.summaries[i].timestamp, responseData.summaries[i].h2O_Hard]);
                    softWaterData.values.push([responseData.summaries[i].timestamp, responseData.summaries[i].h2O_Zacht]);
                }

                dispatch({ type: LOAD_HARD_SOFT_FLOWRATES, payload: { hardWaterData, softWaterData } })
            })
        }).catch(error => displayError(error)).then(() => {

            // Load the Unaccounted Sources Flowrates
            axios.get(serverUrl + "flowrateChanges/last?limit=20").then(response => {
                let customData = {
                    maxVal: 0,
                    minVal: 0,
                    values: []
                };

                // Init Hard & Soft Water given values
                for (let i = response.data.length - 1; i >= 0; i--) {
                    customData.maxVal = (customData.maxVal < response.data[i].model_k_a_delta) ? response.data[i].model_k_a_delta : customData.maxVal;
                    customData.minVal = (customData.minVal > response.data[i].model_k_a_delta) ? response.data[i].model_k_a_delta : customData.minVal;
                    customData.values.push([response.data[i].startTime, response.data[i].model_k_a_delta]);
                }

                dispatch({ type: LOAD_UNACCOUNTED_FLOWRATES, payload: customData })
            })
        }).catch(error => displayError(error)).then(() => {

            // Load the Anomalies
            axios.get(serverUrl + "anomalies/last?limit=200").then(response => {
                let customData = [];

                response.data.map((currVal) => {
                    customData.push({
                        message: currVal.message,
                        detectionTime: new Date(currVal.detectionTime).toLocaleString()
                    })
                })

                dispatch({ type: LOAD_ANOMALIES_DATA, payload: customData })
                dispatch({ type: LOADING_FINISHED });
            })
        }).catch(error => displayError(error))
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
            <Button className="refresh-button" variant="primary" disabled={isLoading} onClick={onRefreshClick}>
                { isLoading ? <Spinner animation="border" size="sm"/> : <FaSync></FaSync> }
            </Button>
            {/* <DropdownButton title={(refreshRate / 1000) + "s"}>
                <Dropdown.Item onSelect={() => setRefreshRate(5000)}>5s</Dropdown.Item>
                <Dropdown.Item onSelect={() => setRefreshRate(10000)}>10s</Dropdown.Item>
                <Dropdown.Item onSelect={() => setRefreshRate(30000)}>30s</Dropdown.Item>
            </DropdownButton> */}
            { !isEmptyObject(valveGroupCurrentFlowrates) && !isEmptyObject(hardWaterData) && !isEmptyObject(softWaterData) &&
            <Row>
                <Col xs={6}>
                    <FlowrateGauge data={currentProductionFlowrates}></FlowrateGauge>
                    <br /><br /><br />
                    <FlowrateChart title="Hard Water" data={hardWaterData} color={"green"}></FlowrateChart>
                    <FlowrateChart title="Soft Water" data={softWaterData} color={"teal"}></FlowrateChart>
                    <BarChart title="Unaccounted Flowrates" data={unaccountedFlowratesData}></BarChart>
                    <br />
                    <AnomaliesTable data={anomaliesData}></AnomaliesTable>
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
                    <Toast.Body><strong>Error loading information</strong></Toast.Body>
                </Toast>
            </div>
        </Container>
    );
}