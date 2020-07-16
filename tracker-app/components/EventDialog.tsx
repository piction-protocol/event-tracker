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
import EventParamRow from 'components/EventParamRow'
import useAPI from 'hooks/useAPI'
import DialogData from 'model/DialogData'
import Event from 'model/Event'
import { FormControl } from '@material-ui/core';

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

export default function EventDialog(props: DialogData<Event>) {
    if (!props.show) {
        return null
    }

    const classes = useStyles()
    const [name, setName] = React.useState(props.selected.name != '' ? props.selected.name : '')
    const [params, setParams] = React.useState(props.selected.name != '' ? props.selected.signature : '')
    const [description, setDescription] = React.useState(props.selected.name != '' ? props.selected.description : '')

    const [nameValidation, setNameValidation] = React.useState({ error: false, helperText: "" } as validationText)
    const [paramsValidation, setParamsValidation] = React.useState({ error: false, helperText: "" } as validationText)

    const [loading, setLoading] = React.useState(false)

    const API = useAPI()
    const update = async () => {
        try {
            const response = props.selected.name != ''
                ? await API.event.edit(props.selected.contract_id, 0)//{ name, params, description } as Event)
                : await API.event.create(props.selected.contract_id) // { name, params, description } as Event)
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
        setParamsValidation({ error: false, helperText: "" } as validationText)

        let error = false
        if (name === '') {
            setNameValidation({ error: true, helperText: "이름을 입력해주세요." })
            error = true
        }

        if (params === '') {
            setParamsValidation({ error: true, helperText: "Params를 입력해주세요." })
            error = true
        }

        if (error) {
            return
        }

        setLoading(true)
        update()
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
            <DialogTitle id="form-dialog-title">Event {props.selected.name != '' ? '수정' : '생성'}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Tracking 하고자 하는 Event를 {props.selected.name != '' ? '수정' : '생성'}해주세요. 
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
                <EventParamRow loading={loading} rowData={null} />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => { props.handle(false) }}
                    color="primary"
                    disabled={loading}>
                    취소
                </Button>
                <div className={classes.wrapper}>
                    <Button
                        onClick={validation}
                        color="primary"
                        disabled={loading}>
                        {props.selected.name != '' ? '수정' : '확인'}
                    </Button>
                    {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                </div>
            </DialogActions>
        </Dialog>
    )
}