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
import ContractDialogData from '../model/ContractDialogData'
import useAPI from '../hooks/useAPI'

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
}))

export default function ContractDialog(props: ContractDialogData) {
    if (!props.show) {
        return null
    }

    const classes = useStyles()
    const [name, setName] = React.useState(props.selected != null ? props.selected.name : '')
    const [address, setAddress] = React.useState(props.selected != null ? props.selected.address : '')
    const [description, setDescription] = React.useState(props.selected != null ? props.selected.description : '')

    const [nameValidation, setNameValidation] = React.useState({ error: false, helperText: "" } as validationText)
    const [addressValidation, setAdressValidation] = React.useState({ error: false, helperText: "" } as validationText)

    const [loading, setLoading] = React.useState(false)

    const API = useAPI()
    const update = async () => {
        try {
            //const response = await API.
        } catch (e) {
            console.log(e)
        }
    }

    const validation = () => {
        setNameValidation({ error: false, helperText: "" } as validationText)
        setAdressValidation({ error: false, helperText: "" } as validationText)

        let error = false
        if (name === '') {
            setNameValidation({ error: true, helperText: "이름을 입력해주세요." })
            error = true
        }

        if (address === '') {
            setAdressValidation({ error: true, helperText: "주소를 입력해주세요." })
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
            onClose={props.handle} 
            aria-labelledby="form-dialog-title"
            disableBackdropClick={loading}
            disableEscapeKeyDown={loading}>
            <DialogTitle id="form-dialog-title">Contract {props.selected != null ? '수정' : '생성'}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Contract {props.selected != null ? '수정' : '생성'}
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="name"
                    type="text"
                    fullWidth
                    required
                    error={nameValidation.error}
                    helperText={nameValidation.helperText}
                    value={name}
                    disabled={loading}
                    onChange={(e) => { setName(e.target.value) }}
                />
                <TextField
                    margin="dense"
                    id="address"
                    label="address"
                    type="text"
                    fullWidth
                    required
                    error={addressValidation.error}
                    helperText={addressValidation.helperText}
                    value={address}
                    disabled={loading}
                    onChange={(e) => { setAddress(e.target.value) }}
                />
                <TextField
                    margin="dense"
                    id="description"
                    label="description"
                    type="text"
                    fullWidth
                    value={description}
                    disabled={loading}
                    onChange={(e) => { setDescription(e.target.value) }}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={props.handle}
                    color="primary"
                    disabled={loading}>
                    취소
                </Button>
                <div className={classes.wrapper}>
                    <Button
                        onClick={validation}
                        color="primary"
                        disabled={loading}>
                        {props.selected != null ? '수정' : '확인'}
                    </Button>
                    {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                </div>
            </DialogActions>
        </Dialog>
    )
}