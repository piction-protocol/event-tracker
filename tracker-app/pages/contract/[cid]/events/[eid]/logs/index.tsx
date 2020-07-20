import React, { forwardRef } from 'react'
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

    const getLogs = async (pageParam: PageParam) => {
        return await API.event.getLogs(cid as string, eid as string, pageParam)
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <TopBar />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                {cid && eid ? <Container maxWidth="lg" className={classes.container}>
                    <MaterialTable
                        title="Logs"
                        icons={tableIcons}
                        options={{
                            search: false,
                            sorting: false,
                            actionsColumnIndex: -1
                        }}
                        columns={[
                            { title: "TransactionHash", field: "transactionHash", type: "string", width: 100 },
                            { title: "From", field: "from", type: "string" },
                            { title: "To", field: "to", type: "string" },
                            { title: "Value", field: "value", type: "string" },
                            { title: "Block Time", field: "block_time", type: "datetime" },
                        ]}
                        data={query =>
                            new Promise((resolve, reject) => {
                                getLogs({ size: query.pageSize, page: query.page + 1 })
                                    .then(result => result.data as PageResponse<EventLog>)
                                    .then(result => {
                                        console.log(result)
                                        if (result) {
                                            resolve({
                                                data: result.content.map((log) => {
                                                    return {
                                                        transactionHash: log.transactionHash,
                                                        from: log.values[0],
                                                        to: log.values[1],
                                                        value: log.values[2],
                                                        block_time: log.blockTime
                                                    }
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
                            console.log('rowData: ' + rowData)
                        }}
                    />
                </Container> : null}
            </main>
        </div>
    )
}