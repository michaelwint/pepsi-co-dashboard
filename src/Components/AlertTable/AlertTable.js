import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import './AlertTable.css'

export default function AlertTable(props) {
    const columns = [
        { dataField: 'message', text: 'Anomalies' }
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
            data={[]}
            columns={ columns }
            rowClasses={ rowClasses }
            pagination={ paginationFactory(paginationOptions) }
            hover
        />
    )
}