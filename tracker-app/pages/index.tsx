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
import FindInPageIcon from '@material-ui/icons/FindInPage'
import MaterialTable from "material-table"
import TopBar from 'components/TopBar'
import ContractDialog from 'components/ContractDialog'
import AlertDialog from 'components/AlertDialog'
import ContractItem from 'model/ContractItem'
import PageParam from 'model/PageParam'
import PageResponse from 'model/PageResponse'
import Contract from 'model/Contract'
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

export default function Home() {
    const classes = useStyles()
    const router = useRouter()
    const API = useAPI()

    const tableRef = React.useRef()
    const [alertDialog, setAlertDialog] = React.useState({ show: false, title: '', msg: ``, handle: (confirm: boolean)=> {}})
    const [contractDialog, setContractDialog] = React.useState(false)
    const [selectedContract, setSelectedContract] = React.useState(null)

    const refreshTable = () => {
        (tableRef.current as any)?.onQueryChange()
    }

    const getContracts = async (pageParam: PageParam) => {
        return await API.contract.getAll(pageParam)
    }

    const removeContract = async (contract: ContractItem) => {
        try {
            const response = await API.contract.delete(contract.id)
            refreshTable()
        } catch (e) {
            console.log(e)
        }
    }

    const showContractDialog = (contract: ContractItem) => {
        if (contract) {
            setSelectedContract(contract)
        } else {
            setSelectedContract(null)
        }

        setContractDialog(true)
    }

    const hideContractDialog = (refresh: boolean) => {
        setContractDialog(false)
        
        if (refresh) {
            refreshTable()
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
                            { title: "Id", field: "id", type: "numeric", width: 100 },
                            { title: "Name", field: "name", type: "string" },
                            { title: "Address(0x)", field: "address", type: "string" },
                            { title: "description", field: "description", type: "string" },
                        ]}
                        data={ query =>
                            new Promise((resolve, reject) => {
                                getContracts({ size: query.pageSize, page: query.page + 1 })
                                    .then(result => result.data as PageResponse<Contract>)
                                    .then(result => {
                                        if (result) {
                                            resolve({
                                                data: result.content,
                                                page: result.pageable.pageNumber,
                                                totalCount: result.totalElements,
                                            })
                                        } else {
                                            reject("getContracts error")
                                        }
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
                                    showContractDialog(null)
                                }
                            },
                            rowData => ({
                                icon: Edit,
                                tooltip: 'Edit Contract',
                                onClick: (event, rowData) => {
                                    showContractDialog(rowData as ContractItem)
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

                <ContractDialog show={contractDialog} selected={selectedContract} handle={hideContractDialog} />
                <AlertDialog show={alertDialog.show} title={alertDialog.title} msg={alertDialog.msg} handle={alertDialog.handle} />
            </main>
        </div>
    )
}