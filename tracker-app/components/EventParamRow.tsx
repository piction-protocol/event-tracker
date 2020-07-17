import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import { Select, MenuItem, Grid, FormControl, InputLabel, Typography } from '@material-ui/core'
import { ParamType } from 'model/ParamType'
import EventParamRowData from 'model/EventParamRowData'
import EventParam from 'model/EventParam'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    formControlText: {
        margin: theme.spacing(1),
        minWidth: 200,
    },
    formControlBtn: {
        marginTop: theme.spacing(2),
        minWidth: 50,
    },
    addBtn: {
        margin: theme.spacing(1),
    }
}),
);

export default function EventParamRow(props: EventParamRowData) {

    const classes = useStyles();
    const [rowData, setRowData] = React.useState(props.rowData)
    const range = (start: number, stop: number, step: number) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step))
    const decimals = range(0, 18, 1)

    const addRow = () => {
        if (rowData) {
            setRowData((state) => [...state, { 
                id: 0,
                name: "",
                type: ParamType.address,
                index: false,
                decimal: 0,
                priority: 0,
                event: null
             } as EventParam])
        } else {
            setRowData([{ 
                id: 0,
                name: "",
                type: ParamType.address,
                index: false,
                decimal: 0,
                priority: 0,
                event: null
             } as EventParam])
        }
    }

    const removeRow = (index: number) => {
        let temp = [...rowData]
        temp.splice(index, 1)
        setRowData(temp)
    }

    const handleChangeName = (event: React.ChangeEvent<{ value: unknown}>, index: number) => {
        rowData[index].name = event.target.value as string
        setRowData((rowData) => [...rowData])
    }

    const handleChangeType = (event: React.ChangeEvent<{ value: unknown}>, index: number) => {
        rowData[index].type = event.target.value as string
        setRowData((rowData) => [...rowData])
    }

    const handleChangeDecimal = (event: React.ChangeEvent<{ value: unknown}>, index: number) => {
        rowData[index].decimal = event.target.value as number
        setRowData((rowData) => [...rowData])
    }

    const handleChangeIndex = (event: React.ChangeEvent<{ value: unknown}>, index: number) => {
        rowData[index].index = event.target.value as boolean
        setRowData((rowData) => [...rowData])
    }


    return (
        <div className={classes.root}>
            <Typography variant="subtitle1" display="block" gutterBottom>
                Params
            </Typography> 
            {rowData ? (
                rowData.map((eventParam: EventParam, index) =>
                    <div>
                        <Grid 
                            container 
                            spacing={0}>
                                
                            <Grid item xs={3}>
                            <FormControl 
                                className={classes.formControlText}
                                disabled={props.loading} >
                                <TextField
                                    id="name"
                                    label="name"
                                    type="text"
                                    required
                                    value={rowData[index].name}
                                    onChange={(event) => { handleChangeName(event, index) }}
                                    disabled={props.loading} />
                                    </FormControl>
                            </Grid>

                            <Grid item xs={2}>
                                <FormControl 
                                className={classes.formControl}
                                disabled={props.loading}>
                                    <InputLabel>Type</InputLabel>
                                    <Select
                                        value={rowData[index].type}
                                        onChange={(event) => { handleChangeType(event, index) }}
                                    >
                                        <MenuItem value={ParamType.address}>{ParamType.address}</MenuItem>
                                        <MenuItem value={ParamType.uint256}>{ParamType.uint256}</MenuItem>
                                        <MenuItem value={ParamType.uint}>{ParamType.uint}</MenuItem>
                                        <MenuItem value={ParamType.bool}>{ParamType.bool}</MenuItem>
                                        <MenuItem value={ParamType.utf8String}>{ParamType.utf8String}</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={2}>
                            <FormControl 
                                className={classes.formControl}
                                disabled={props.loading}>
                                    <InputLabel>Decimal</InputLabel>
                                    <Select
                                        value={rowData[index].decimal}
                                        onChange={(event) => { handleChangeDecimal(event, index) }}
                                    >
                                        {
                                        decimals.map((decimal) => {
                                            return <MenuItem value={decimal}>{decimal}</MenuItem>
                                        })
                                    }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={2}>
                                <FormControl 
                                className={classes.formControl}
                                disabled={props.loading}>
                                    <InputLabel>Index</InputLabel>
                                    <Select
                                        value={rowData[index].index}
                                        onChange={(event) => { handleChangeIndex(event, index) }}
                                    >
                                        <MenuItem value="true">true</MenuItem>
                                        <MenuItem value="false">false</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={2}>
                                <FormControl 
                                    className={classes.formControlBtn}
                                    disabled={props.loading}>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={() => removeRow(index)}>
                                            삭제
                                        </Button>
                                    </FormControl>
                            </Grid>
                        </Grid>
                    </div>
                )) : null}

            <Button
                className={classes.addBtn}
                variant="outlined"
                color="primary"
                onClick={addRow}
                disabled={props.loading}>
                추가
            </Button>
        </div>
    )
}