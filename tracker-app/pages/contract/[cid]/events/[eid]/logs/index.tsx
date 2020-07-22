import React, { forwardRef, useState } from 'react'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import Container from '@material-ui/core/Container'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import MaterialTable from "material-table"
import TopBar from 'components/TopBar'
import PageResponse from 'model/PageResponse'
import useAPI from 'hooks/useAPI'
import Event from 'model/Event'
import EventLog from 'model/EventLog'
import PageParam from 'model/PageParam'

const tableIcons = {
    FirstPage: forwardRef<SVGSVGElement>((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef<SVGSVGElement>((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef<SVGSVGElement>((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef<SVGSVGElement>((props, ref) => <ChevronLeft {...props} ref={ref} />),
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    appBarSpacer: theme.mixins.toolbar,
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    table: {
        maxWidth: '100%'
    },
}))

export default function Logs() {
    const classes = useStyles()
    const router = useRouter()
    const API = useAPI()
    const { cid, eid } = router.query

    const [event, setEvent] = React.useState(null)
    const [columns, setColumns] = React.useState(null)

    const getLogs = async (pageParam: PageParam) => {
        return await API.event.getLogs(cid as string, eid as string, pageParam)
    }

    const newColumns = (event: Event) => {
        let newColumns: Array<any> = new Array();

        newColumns.push({ title: "transactionHash", field: "transactionHash", type: "string", width: 100 })
        
        event.params.forEach((param) => {
            newColumns.push({ title: param.name, field: param.name, type: "string"})
        })
        
        newColumns.push({ title: "block Time", field: "blockTime", type: "datetime"})
        setColumns(newColumns)
    }

    const getEvent = async () => {
        try {
            const result = await API.event.get(cid as string, eid as string)
            setEvent(result.data)
            newColumns(result.data)
        } catch (e) {
            console.log(e)
        }
    }

    const getNewRow = (log: EventLog) => {
        var newRow = new Object();
        columns.forEach((column: { field: string }) => {
            if (log[column.field]) {
                newRow[column.field] = log[column.field]
            } else {
                (event as Event).params.forEach((param, index) => {
                    if (param.name === column.field) {
                        newRow[column.field] = log.values[index]
                        return
                    }
                })
            }
        })
        return newRow
    }

    if (eid && event == null) {
        getEvent()
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <TopBar />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                {cid && eid && event && columns ? <Container maxWidth="lg" className={classes.container}>
                    <MaterialTable
                        title="Logs"
                        icons={tableIcons}
                        options={{
                            search: false,
                            sorting: false,
                            actionsColumnIndex: -1
                        }}
                        columns={columns}
                        data={query =>
                            new Promise((resolve, reject) => {
                                getLogs({ size: query.pageSize, page: query.page + 1 })
                                    .then(result => result.data as PageResponse<EventLog>)
                                    .then(result => {
                                        if (result) {
                                            resolve({
                                                data: result.content.map((log) => {
                                                    return getNewRow(log)
                                                }),
                                                page: result.pageable.pageNumber,
                                                totalCount: result.totalElements,
                                            })
                                        } else {
                                            reject("getLogs error")
                                        }
                                    })
                            })}
                        onRowClick={(event, rowData) => {
                            let row = rowData as EventLog
                            window.open(`https://scope.klaytn.com/tx/${row.transactionHash}`, '_blank')
                        }}
                    />
                </Container> : null}
            </main>
        </div>
    )
}