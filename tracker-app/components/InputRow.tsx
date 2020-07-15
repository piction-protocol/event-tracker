import React, { useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { createStyles, makeStyles, withStyles, Theme } from '@material-ui/core/styles';
import { Typography, Select, MenuItem } from '@material-ui/core'

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

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        margin: {
            margin: theme.spacing(1),
        },
        center: {
            alignItems: 'center',
            width: '100%',
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

    const range = (start: number, stop: number, step: number) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step))
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
        <div>
            {rowData.length > 0 ?
                rowData.map((sample: Sample, index) =>
                    <div className={classes.center}>
                        <TextField
                            margin="dense"
                            id="name"
                            label="name"
                            type="text"
                            required
                            value={sample.name}
                            disabled={props.loading} />

                        <Select
                            className={classes.margin}
                            disabled={props.loading}
                        >
                            <MenuItem value={Type.address}>{Type.address}</MenuItem>
                            <MenuItem value={Type.uint256}>{Type.uint256}</MenuItem>
                            <MenuItem value={Type.uint}>{Type.uint}</MenuItem>
                            <MenuItem value={Type.bool}>{Type.bool}</MenuItem>
                            <MenuItem value={Type.utf8String}>{Type.utf8String}</MenuItem>
                        </Select>
                        <Select
                            className={classes.margin}
                        >
                            {
                                decimals.map((decimal) => {
                                    return <MenuItem value={decimal}>{decimal}</MenuItem>
                                })
                            }
                        </Select>
                    
                        <Select
                            className={classes.margin}
                            disabled={props.loading}
                        >
                            <MenuItem value={1}>true</MenuItem>
                            <MenuItem value={0}>false</MenuItem>
                        </Select>
                        <Button
                            onClick={() => removeRow(index)}
                        >
                            삭제
                        </Button>
                    </div>
                ) : null}
            <Button
                onClick={addRow}
                color="primary"
                disabled={props.loading}>
                추가
            </Button>
        </div>
    )
}