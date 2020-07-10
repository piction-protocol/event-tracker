import React, { forwardRef } from 'react'
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import Container from '@material-ui/core/Container'
import MaterialTable from "material-table"
import TopBar from '../components/TopBar'
import ContractDialog from '../components/ContractDialog'
import AlertDialog from '../components/AlertDialog';
import Contract from '../model/Contract'
import ContractItem from '../model/ContractItem'
import useAPI from '../hooks/useAPI'

import AddBox from '@material-ui/icons/AddBox'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'

import DeleteOutline from '@material-ui/icons/DeleteOutline'
import Edit from '@material-ui/icons/Edit'
import FindInPageIcon from '@material-ui/icons/FindInPage';

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

export default function Home() {
    const classes = useStyles()
    const [alertDialog, setAlertDialog] = React.useState({ show: false, title: '', msg: ``, handle: (confirm: boolean)=> {}})
    const [contractDialog, setContractDialog] = React.useState(false)
    const [selectedContract, setSelectedContract] = React.useState(null)
    const router = useRouter()

    const [contracts, setContracts] = React.useState(Array<Contract>())


    const API = useAPI()
    const getContractsData = async () => {
        try {
            const response = await API.contract.getAll({page: 1, size: 5})
            console.log(`getContractsData response status: ${response.status}`)
            setContracts(response.data.content)
        } catch (e) {
            console.log(e)
        }
    }

    const removeContract = async (contract: ContractItem) => {
        try {
            const response = await API.contract.delete(contract.id)
            getContractsData()
        } catch (e) {
            console.log(e)
        }
    }

    const handleToggleContractDialog = (refresh: boolean) => {
        setContractDialog(!contractDialog)
        if (refresh) {
            getContractsData()
        }
    }

    React.useEffect(() => {
        getContractsData()
    },[])

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
                            { title: "Address(0x)", field: "address", type: "string" },
                            { title: "description", field: "description", type: "string" },
                        ]}
                        data={ contracts }
                        onRowClick={(event, rowData) => {
                            console.log('event: ' + event)
                            console.log('rowData: ' + rowData)
                            let row = rowData as ContractItem
                            router.replace('/contract/'+row.id+'/events')
                        }}
                        actions={[
                            {
                                icon: AddBox,
                                tooltip: 'Add Contract',
                                isFreeAction: true,
                                onClick: (event) => { 
                                    setSelectedContract(null)
                                    handleToggleContractDialog(false)
                                }
                            },
                            rowData => ({
                                icon: Edit,
                                tooltip: 'Edit Contract',
                                onClick: (event, rowData) => { 
                                    setSelectedContract(rowData)
                                    handleToggleContractDialog(false)
                                }
                            }),
                            rowData => ({
                                icon: DeleteOutline,
                                tooltip: 'Delete Contract',
                                onClick: (event, rowData) => {
                                    let row = rowData as ContractItem
                                    setAlertDialog({ 
                                        show: true, 
                                        title: 'Delete', 
                                        msg: `Do you want to delete the '${row.name}'?`, 
                                        handle: (confirm: boolean)=> { 
                                            if (confirm) {
                                                removeContract(row)
                                            }
                                            setAlertDialog({ show: false, title: '', msg: ``, handle: (confirm: boolean)=> {}})
                                        }})
                                }
                            }),
                            rowData => ({
                                icon: FindInPageIcon,
                                tooltip: 'Show Klaytn Scope',
                                onClick: (event, rowData) => {
                                    let row = rowData as ContractItem
                                    window.location.href = `https://scope.klaytn.com/account/${row.address}`
                                }
                            }),
                        ]}
                        title="Contract"
                    />
                </Container>

                <ContractDialog show={contractDialog} selected={selectedContract} handle={handleToggleContractDialog} />
                <AlertDialog show={alertDialog.show} title={alertDialog.title} msg={alertDialog.msg} handle={alertDialog.handle} />
            </main>
        </div>
    )
}