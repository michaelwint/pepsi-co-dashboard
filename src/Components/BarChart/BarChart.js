import React from 'react';
import { Resizable, Charts, ChartContainer, ChartRow, YAxis, BarChart as BaseBarChart, styler} from "react-timeseries-charts";
import { Container, Row, Col } from 'react-bootstrap'
import { TimeSeries, Index } from 'pondjs';
import Baseline from 'react-timeseries-charts/lib/components/Baseline';

export default function BarChart(props) {
    const series = new TimeSeries({
        name: "flowrate_timeseries",
        columns: ["index", "value"],
        points: props.data.values.map(([d, value]) => [
            Index.getIndexString("1s",new Date(d)),
            value
        ])
      });

    const style = styler([
        { key: "value", color: "#5208ff", width: "10px" },
    ]);

    return (
        <Container>
            <Row>
                <Col>
                    <strong>{props.title}</strong>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Resizable>
                        <ChartContainer timeRange={series.range()} >
                            <ChartRow height="250">
                                <YAxis
                                    id="flowrate"
                                    label="Flowrate (m3/h)"
                                    type="linear"
                                    max={props.data.maxVal}
                                    min={props.data.minVal}
                                />
                                <Charts>
                                    <BaseBarChart
                                        axis="flowrate"
                                        style={style}
                                        spacing={1}
                                        columns={["value"]}
                                        series={series}
                                    />
                                    <Baseline axis="flowrate" style={style} value={0} />
                                </Charts>
                            </ChartRow>
                        </ChartContainer>
                    </Resizable>
                </Col>
            </Row>
        </Container>

    )
}