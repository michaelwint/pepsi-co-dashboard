import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter, numberFilter, dateFilter } from 'react-bootstrap-table2-filter';
import './AlertTable.css'

export default function AlertTable(props) {
    let data = [
        { id: 1, valveGroup: "V3301", measure: 26.5, date: "2020-04-16 12:00:00"},
        { id: 2, valveGroup: "V3401", measure: 24.2, date: "2020-04-16 12:30:00"},
        { id: 3, valveGroup: "V3401", measure: 33.3, date: "2020-04-16 13:00:00"},
        { id: 4, valveGroup: "V3301", measure: undefined, date: "2020-04-16 14:00:00"},
        { id: 5, valveGroup: "V3301", measure: 26.5, date: "2020-04-16 12:00:00"},
        { id: 6, valveGroup: "V3401", measure: 24.2, date: "2020-04-16 12:30:00"},
        { id: 7, valveGroup: "V3401", measure: 33.3, date: "2020-04-16 13:00:00"},
        { id: 8, valveGroup: "V3301", measure: undefined, date: "2020-04-16 14:00:00"},
        { id: 9, valveGroup: "V3301", measure: 26.5, date: "2020-04-16 12:00:00"},
        { id: 10, valveGroup: "V3401", measure: 24.2, date: "2020-04-16 12:30:00"},
        { id: 11, valveGroup: "V3401", measure: 33.3, date: "2020-04-16 13:00:00"},
        { id: 12, valveGroup: "V3301", measure: undefined, date: "2020-04-16 14:00:00"},
        { id: 13, valveGroup: "V3301", measure: 26.5, date: "2020-04-16 12:00:00"},
        { id: 14, valveGroup: "V3401", measure: 24.2, date: "2020-04-16 12:30:00"},
        { id: 15, valveGroup: "V3401", measure: 33.3, date: "2020-04-16 13:00:00"},
        { id: 16, valveGroup: "V3301", measure: undefined, date: "2020-04-16 14:00:00"},
    ]

    const columns = [
        { dataField: 'id', text: '#' },
        { dataField: 'valveGroup', text: 'Valve Name', filter: textFilter() },
        { dataField: 'measure', text: 'Measure', filter: numberFilter() },
        { dataField: 'date', text: 'Date', filter: dateFilter() }
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
            data={ data }
            columns={ columns }
            filter={ filterFactory() }
            filterPosition="top"
            rowClasses={ rowClasses }
            pagination={ paginationFactory(paginationOptions) }
            hover
        />
    )
}