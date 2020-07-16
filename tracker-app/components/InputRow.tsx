import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import { Select, MenuItem, Grid, FormControl, InputLabel, Typography } from '@material-ui/core'

interface Sample {
    name: string
    value: string
}

enum Type {
    address = 'Address',
    uint256 = 'Uint256',
    uint = 'Uint',
    bool = 'Bool',
    utf8String = 'Utf8String'
}

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

export default function InputRow(props) {

    const sampleData = [{
        name: "soso",
        value: "18"
    },
    {
        name: "good",
        value: "10"
    },
    {
        name: "cap",
        value: "12"
    }]

    const classes = useStyles();
    const [rowData, setRowData] = React.useState(sampleData as Array<Sample>)

    const range = (start: number, stop: number, step: number) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step))
    const decimals = range(0, 18, 1)

    const addRow = () => {
        setRowData((state) => [...state, { name: "", value: "" } as Sample])
    }

    const removeRow = (index: number) => {
        let temp = [...rowData]
        temp.splice(index, 1)
        setRowData(temp)
    }

    return (
        <div className={classes.root}>
            <Typography variant="subtitle1" display="block" gutterBottom>
                Params
            </Typography> 
            {rowData.length > 0 ? (
                rowData.map((sample: Sample, index) =>
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
                                    value={sample.name}
                                    disabled={props.loading} />
                                    </FormControl>
                            </Grid>

                            <Grid item xs={2}>
                                <FormControl 
                                className={classes.formControl}
                                disabled={props.loading}>
                                    <InputLabel>Type</InputLabel>
                                    <Select
                                        //value={age}
                                        //onChange={handleChange}
                                    >
                                        <MenuItem value={Type.address}>{Type.address}</MenuItem>
                                        <MenuItem value={Type.uint256}>{Type.uint256}</MenuItem>
                                        <MenuItem value={Type.uint}>{Type.uint}</MenuItem>
                                        <MenuItem value={Type.bool}>{Type.bool}</MenuItem>
                                        <MenuItem value={Type.utf8String}>{Type.utf8String}</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={2}>
                            <FormControl 
                                className={classes.formControl}
                                disabled={props.loading}>
                                    <InputLabel>Decimal</InputLabel>
                                    <Select
                                        //value={age}
                                        //onChange={handleChange}
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
                                        //value={age}
                                        //onChange={handleChange}
                                    >
                                        <MenuItem value={1}>true</MenuItem>
                                        <MenuItem value={0}>false</MenuItem>
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