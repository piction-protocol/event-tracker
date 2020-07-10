import React, { forwardRef } from 'react'
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import Container from '@material-ui/core/Container'
import MaterialTable from "material-table"
import TopBar from '../components/TopBar'
import ContractDialog from '../components/ContractDialog'
import AlertDialog from '../components/AlertDialog';
import ContractItem from '../model/ContractItem'
import PageParam from '../model/PageParam';
import useAPI from '../hooks/useAPI'

import AddBox from '@material-ui/icons/AddBox'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'

import DeleteIcon from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit'
import FindInPageIcon from '@material-ui/icons/FindInPage';
import ContractsResponse from '../model/ContractsResponse';

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
    const router = useRouter()
    const API = useAPI()

    const tableRef = React.useRef();
    const [alertDialog, setAlertDialog] = React.useState({ show: false, title: '', msg: ``, handle: (confirm: boolean)=> {}})
    const [contractDialog, setContractDialog] = React.useState(false)
    const [selectedContract, setSelectedContract] = React.useState(null)

    const refreshContracts = () => {
        (tableRef.current as any)?.onQueryChange()
    }

    const getContractss = async (pageParam: PageParam) => {
        return await API.contract.getAll(pageParam)
    }

    const removeContract = async (contract: ContractItem) => {
        try {
            const response = await API.contract.delete(contract.id)
            refreshContracts()
        } catch (e) {
            console.log(e)
        }
    }

    const handleToggleContractDialog = (refresh: boolean) => {
        setContractDialog(!contractDialog)
        if (refresh) {
            refreshContracts()
        }
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <TopBar />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <MaterialTable
                        title="Contract"
                        tableRef={tableRef}
                        icons={tableIcons}
                        options={{
                            search: false,
                            sorting: false,
                            actionsColumnIndex: -1,
                        }}
                        columns={[
                            { title: "Id", field: "id", type: "numeric" },
                            { title: "Name", field: "name", type: "string" },
                            { title: "Address(0x)", field: "address", type: "string" },
                            { title: "description", field: "description", type: "string" },
                        ]}
                        data={query =>
                            new Promise((resolve, reject) => {
                                getContractss({ size: query.pageSize, page: query.page + 1 })
                                    .then(result => result.data as ContractsResponse)
                                    .then(result => {
                                        resolve({
                                            data: result.content,
                                            page: result.pageable.pageNumber,
                                            totalCount: result.totalElements,
                                        })
                                    })
                            })}
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
                                icon: DeleteIcon,
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
                    />
                </Container>

                <ContractDialog show={contractDialog} selected={selectedContract} handle={handleToggleContractDialog} />
                <AlertDialog show={alertDialog.show} title={alertDialog.title} msg={alertDialog.msg} handle={alertDialog.handle} />
            </main>
        </div>
    )
}