import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { FormControl } from '@material-ui/core';
import EventParamRow from 'components/EventParamRow'
import useAPI from 'hooks/useAPI'
import EventDialogData from 'model/EventDialogData'
import EventParam from 'model/EventParam';
import Event from 'model/Event'

interface validationText {
    error: boolean
    helperText: string
}

const useStyles = makeStyles((theme) => ({
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    formControlText: {
        margin: theme.spacing(1),
        minWidth: 500,
    },
}))

export default function EventDialog(props: EventDialogData) {
    if (!props.show) {
        return null
    }

    const classes = useStyles()
    const [name, setName] = React.useState(props.selected ? props.selected.name : '')
    const [params, setParams] = React.useState(props.selected ? props.selected.params : null)
    const [description, setDescription] = React.useState(props.selected ? props.selected.description : '')
    const [nameValidation, setNameValidation] = React.useState({ error: false, helperText: "" } as validationText)

    const [loading, setLoading] = React.useState(false)

    const API = useAPI()
    const update = async () => {
        try {
            const response = props.selected
                ? await API.event.edit(props.contractId, props.selected.id, { name: name, description: description, params: params } as Event)
                : await API.event.create(props.contractId, { name: name, description: description, params: (params) ? params : [] } as Event)
            console.log(`response : ${response}`)
            console.log('response status : ' + response.status)
            console.log('response data : ' + response.data)

            setLoading(false)
            props.handle(true)
        } catch (e) {
            console.log(e)
            setLoading(false)
        }
    }

    const validation = () => {
        setNameValidation({ error: false, helperText: "" } as validationText)

        let error = false
        if (name === '') {
            setNameValidation({ error: true, helperText: "Input Name." })
            error = true
        }

        if (error) {
            return
        }

        setLoading(true)
        update()
    }

    const paramsUpdater = (params: Array<EventParam>) => {
        setParams(params)
    }

    return (
        <Dialog
            open={props.show}
            onClose={() => { props.handle(false) }}
            aria-labelledby="form-dialog-title"
            disableBackdropClick={loading}
            disableEscapeKeyDown={loading}
            fullWidth={true}
            maxWidth="md">
            <DialogTitle id="form-dialog-title">Event {props.selected ? 'Edit' : 'Create'}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    
                </DialogContentText>
                <FormControl
                    className={classes.formControlText}
                    disabled={loading}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="name"
                        type="text"
                        required
                        fullWidth={true}
                        error={nameValidation.error}
                        helperText={nameValidation.helperText}
                        value={name}
                        disabled={loading}
                        onChange={(e) => { setName(e.target.value) }}
                    />
                </FormControl>
                <br />
                <FormControl
                    className={classes.formControlText}
                    disabled={loading}>
                    <TextField
                        margin="dense"
                        id="description"
                        label="description"
                        type="text"
                        fullWidth={true}
                        value={description}
                        disabled={loading}
                        onChange={(e) => { setDescription(e.target.value) }}
                    />
                </FormControl>
                <EventParamRow loading={loading} rowData={params} updater={paramsUpdater}/>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => { props.handle(false) }}
                    color="primary"
                    disabled={loading}>
                    Cancel
                </Button>
                <div className={classes.wrapper}>
                    <Button
                        onClick={validation}
                        color="primary"
                        disabled={loading}>
                        Confirm
                    </Button>
                    {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                </div>
            </DialogActions>
        </Dialog>
    )
}