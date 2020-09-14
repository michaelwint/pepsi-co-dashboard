import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import './AnomaliesTable.css'

export default function AnomaliesTable(props) {
    const columns = [
        { dataField: 'message', text: 'Anomalies' },
        { dataField: 'detectionTime', text: 'Detection Time' }
    ]

    const paginationOptions = {
        paginationSize: 5,
        pageStartIndex: 1,
        hideSizePerPage: true,
        hidePageListOnlyOnePage: true,
        showTotal: true,
        sizePerPageList: [{
            text: '5', value: 5
        }]
    }

    const rowClasses = (row) => {
        return (row.measure === undefined) ? "resolved-anomaly-row" : "unresolved-anomaly-row"
    }

    return (
        <BootstrapTable
            keyField='id'
            data={props.data}
            columns={ columns }
            rowClasses={ rowClasses }
            pagination={ paginationFactory(paginationOptions) }
            hover
        />
    )
}