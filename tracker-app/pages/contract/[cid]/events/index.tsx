import React, { forwardRef } from 'react'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import Container from '@material-ui/core/Container'
import AddBox from '@material-ui/icons/AddBox'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import DeleteIcon from '@material-ui/icons/Delete'
import Edit from '@material-ui/icons/Edit'
import MaterialTable from "material-table"
import TopBar from 'components/TopBar'
import Event from 'model/Event'
import EventItem from 'model/EventItem'
import AlertDialog from 'components/AlertDialog'
import PageParam from 'model/PageParam'
import PageResponse from 'model/PageResponse'
import useAPI from 'hooks/useAPI'

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

export default function Events() {
    const classes = useStyles()
    const router = useRouter()
    const tableRef = React.useRef()
    const API = useAPI()
    const { cid } = router.query

    const [alertDialog, setAlertDialog] = React.useState({ show: false, title: '', msg: ``, handle: (confirm: boolean) => { } })

    const refreshTable = () => {
        (tableRef.current as any)?.onQueryChange()
    }

    const getEvents = async (pageParam: PageParam) => {
        return await API.event.getAll(cid as string, pageParam)
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <TopBar />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                {cid ? <Container maxWidth="lg" className={classes.container}>
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
                            { title: "Id", field: "id", type: "numeric" },
                            { title: "Name", field: "name", type: "string" },
                            { title: "Params", field: "signature", type: "string" },
                            { title: "Description", field: "description", type: "string" },
                        ]}
                        data={query =>
                            new Promise((resolve, reject) => {
                                getEvents({ size: query.pageSize, page: query.page + 1 })
                                    .then(result => result.data as PageResponse<Event>)
                                    .then(result => {
                                        if (result) {
                                            resolve({
                                                data: result.content,
                                                page: result.pageable.pageNumber,
                                                totalCount: result.totalElements,
                                            })
                                        } else {
                                            reject("getEvent error")
                                        }
                                    })
                            })}
                        onRowClick={(event, rowData) => {
                            console.log('rowData: ' + rowData)
                        }}
                        actions={[
                            {
                                icon: AddBox,
                                tooltip: 'Add Event',
                                isFreeAction: true,
                                onClick: (event) => {

                                }
                            },
                            rowData => ({
                                icon: Edit,
                                tooltip: 'Edit Event',
                                onClick: (event, rowData) => {

                                }
                            }),
                            rowData => ({
                                icon: DeleteIcon,
                                tooltip: 'Delete Event',
                                onClick: (event, rowData) => {
                                    let row = rowData as EventItem
                                }
                            })
                        ]}
                    />
                </Container> : null}

                <AlertDialog show={alertDialog.show} title={alertDialog.title} msg={alertDialog.msg} handle={alertDialog.handle} />
            </main>
        </div>
    )
}