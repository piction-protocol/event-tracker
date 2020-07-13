import React, { forwardRef } from 'react'
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import Container from '@material-ui/core/Container'
import MaterialTable from "material-table"
import TopBar from 'components/TopBar'
import Event from 'model/Event'
import useAPI from 'hooks/useAPI'

import AddBox from '@material-ui/icons/AddBox'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import Edit from '@material-ui/icons/Edit'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'

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
    const cId = router.query
    
    console.log('events cid : '+cId)

    const API = useAPI()
    const getEvents = async () => {
        try {
            //const response = await API cId.
            
        } catch (e) {
            console.log(e)
        }
    }

    let event: Event = {
        id: 0,
        name: 'Transfer',
        description: '이벤트 셈플데이터',
        contract_id: 1,
        signature: 'from(Address indexed), to(Address indexed), value(Uint256)',
        updated_at: 2000,
        created_at: 3000
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <TopBar />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <MaterialTable
                        icons={tableIcons}
                        options={{
                            search: false,
                            sorting: false,
                            actionsColumnIndex: -1
                        }}
                        columns={[
                            { title: "Id", field: "id", type: "numeric" },
                            { title: "Name", field: "name", type: "string" },
                            { title: "Params", field: "params", type: "string" },
                            { title: "Description", field: "description", type: "string" },
                        ]}
                        data={[
                            {
                                id: event.id,
                                name: event.name,
                                params: event.signature,
                                description: event.description,
                            },
                        ]}
                        onRowClick={(event, rowData) => {
                            console.log('event: ' + event)
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
                                icon: DeleteOutline,
                                tooltip: 'Remove Event',
                                onClick: (event, rowData) => {

                                }
                            })
                        ]}
                        title="Events"
                    />
                </Container>
            </main>
        </div>
    )
}