import React, { useContext } from 'react'
import { flowratesPageStore } from '../../Store/flowratesPageStore'
import { LineChart, Line } from 'recharts'
import FlowrateChart from '../../Components/FlowrateChart/FlowrateChart';

export default function FlowratesPage(props) {
    const isLoading = useContext(flowratesPageStore).isLoading;
    console.log(useContext(flowratesPageStore))
    console.log("isLoading = " + isLoading)

    return (
        <FlowrateChart></FlowrateChart>
    )
}


