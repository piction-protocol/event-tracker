import React, { forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import TopBar from '../components/TopBar';
import Container from '@material-ui/core/Container';
import MaterialTable from "material-table";
import Contract from '../model/Contract';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef<SVGSVGElement>((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef<SVGSVGElement>((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef<SVGSVGElement>((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef<SVGSVGElement>((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef<SVGSVGElement>((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef<SVGSVGElement>((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef<SVGSVGElement>((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef<SVGSVGElement>((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef<SVGSVGElement>((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef<SVGSVGElement>((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef<SVGSVGElement>((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef<SVGSVGElement>((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef<SVGSVGElement>((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef<SVGSVGElement>((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef<SVGSVGElement>((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef<SVGSVGElement>((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef<SVGSVGElement>((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    appBarSpacer: theme.mixins.toolbar,
    table: {
        maxWidth: '100%'
    },
}))

export default function Home() {
    const classes = useStyles();
    let contrast: Contract = {
        id: 0, 
        name: 'pxl', 
        address: '0x000000000', 
        description: '셈플데이터', 
        user_id: 1, 
        updated_at: 1000, 
        created_at: 2000}
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
                        }}
                        onRowClick={(event, rowData) => {
                            console.log('event: ' + event)
                            console.log('rowData: ' + rowData)
                        }}
                        columns={[
                            { title: "Id", field: "id", type: "numeric" },
                            { title: "Name", field: "name", type: "string" },
                            { title: "Address(0x)", field: "address", type: "string" },
                            { title: "description", field: "description", type: "string" },
                        ]}
                        data={[
                            {
                                id: contrast.id,
                                name: contrast.name,
                                address: contrast.address,
                                description: contrast.description,
                            },
                        ]}
                        title="Contract"
                    />
                </Container>
            </main>
        </div>
    )
}