import React, { forwardRef } from 'react'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import { CssBaseline, Container, Breadcrumbs, Link, Typography } from '@material-ui/core'
import { AddBox, ChevronLeft, ChevronRight, FirstPage, LastPage, Delete, Edit } from '@material-ui/icons'
import MaterialTable from "material-table"
import TopBar from 'components/TopBar'
import Event from 'model/Event'
import EventItem from 'model/EventItem'
import AlertDialog from 'components/AlertDialog'
import PageParam from 'model/PageParam'
import PageResponse from 'model/PageResponse'
import useAPI from 'hooks/useAPI'
import EventDialog from 'components/EventDialog'
import EventParam from 'model/EventParam';
import Contract from 'model/Contract'

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
    breadcrumbs: {
        paddingBottom: theme.spacing(4),
    },
    table: {
        maxWidth: '100%'
    },
}))

export default function Events() {
    const classes = useStyles()
    const router = useRouter()
    const API = useAPI()
    const { cid } = router.query

    const tableRef = React.useRef()
    const [alertDialog, setAlertDialog] = React.useState({ show: false, title: '', msg: ``, handle: (confirm: boolean) => { } })
    const [eventDialog, setEventDialog] = React.useState(false)
    const [selectedEvent, setSelectedEvent] = React.useState(null)
    const [events, setEvents] = React.useState({} as Array<Event>)
    const [contract, setContract] = React.useState(null)

    const refreshTable = () => {
        (tableRef.current as any)?.onQueryChange()
    }

    const getEvents = async (pageParam: PageParam) => {
        return await API.event.getAll(cid as string, pageParam)
    }

    const removeEvent = async (eventItem: EventItem) => {
        try {
            const response = await API.event.delete(cid as string, eventItem.id)
            refreshTable()
        } catch (e) {
            console.log(e)
        }
    }

    const getContract = async () => {
        try {
            const result = await API.contract.get(cid as string)
            setContract(result.data)
        } catch (e) {
            console.log(e)
        }
    }

    const showEventDialog = (event: Event) => {
        if (event) {
            setSelectedEvent(event)
        } else {
            setSelectedEvent(null)
        }

        setEventDialog(true)
    }

    const hideEventDialog = (refresh: boolean) => {
        setEventDialog(false)
        if (refresh) {
            refreshTable()
        }
    }

    const paramsToString = (eventParams: Array<EventParam>) => {
        let params = ''
        eventParams.forEach((param) => {
            params = params.concat(`${param.name}(${param.type}) `)
        })
        return params
    }

    if (cid && contract == null) {
        getContract()
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <TopBar />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                {cid && contract ? <Container maxWidth="lg" className={classes.container}>
                    <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumbs}>
                        <Link color="inherit" href="/" >
                            Contract
                        </Link>
                        <Typography color="textPrimary">{(contract as Contract).name}</Typography>
                    </Breadcrumbs>
                    <MaterialTable
                        title="Event"
                        tableRef={tableRef}
                        icons={tableIcons}
                        options={{
                            search: false,
                            sorting: false,
                            actionsColumnIndex: -1
                        }}
                        columns={[
                            { title: "Id", field: "id", type: "numeric", width: 100 },
                            { title: "Name", field: "name", type: "string" },
                            { title: "Params", field: "params", type: "string" },
                            { title: "Description", field: "description", type: "string" },
                        ]}
                        data={query =>
                            new Promise((resolve, reject) => {
                                getEvents({ size: query.pageSize, page: query.page + 1 })
                                    .then(result => result.data as PageResponse<Event>)
                                    .then(result => {
                                        if (result) {
                                            setEvents(result.content)
                                            resolve({
                                                data: result.content.map((event) => {
                                                    return {
                                                        id: event.id,
                                                        name: event.name,
                                                        params: paramsToString(event.params),
                                                        description: event.description
                                                    }
                                                }),
                                                page: result.pageable.pageNumber,
                                                totalCount: result.totalElements,
                                            })
                                        } else {
                                            reject("getEvent error")
                                        }
                                    })
                            })}
                        onRowClick={(event, rowData) => {
                            console.log('event: ' + event)
                            console.log('rowData: ' + rowData)
                            let row = rowData as EventItem
                            router.replace(`/contract/${cid as string}/events/${row.id}/logs`)
                        }}
                        actions={[
                            {
                                icon: AddBox,
                                tooltip: 'Add Event',
                                isFreeAction: true,
                                onClick: (event) => {
                                    showEventDialog(null)
                                }
                            },
                            rowData => ({
                                icon: Edit,
                                tooltip: 'Edit Event',
                                onClick: (event, rowData) => {
                                    showEventDialog(events.find((item) => item.id === (rowData as EventItem).id))
                                }
                            }),
                            rowData => ({
                                icon: Delete,
                                tooltip: 'Delete Event',
                                onClick: (event, rowData) => {
                                    let row = rowData as EventItem
                                    setAlertDialog({
                                        show: true,
                                        title: 'Delete',
                                        msg: `Do you want to delete the '${row.name}'`,
                                        handle: (confirm: boolean) => {
                                            if (confirm) {
                                                removeEvent(row)
                                            }
                                            setAlertDialog({ show: false, title: '', msg: ``, handle: (confirm: boolean)=> {}})
                                        }
                                    })
                                }
                            })
                        ]}
                    />
                </Container> : null}
                
                <EventDialog show={eventDialog} contractId={cid as string} selected={selectedEvent} handle={hideEventDialog} />
                <AlertDialog show={alertDialog.show} title={alertDialog.title} msg={alertDialog.msg} handle={alertDialog.handle} />
            </main>
        </div>
    )
}