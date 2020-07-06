import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import ContractDialogData from '../model/ContractDialogData'
import useAPI from '../hooks/useAPI'

export default function ContractDialog(props: ContractDialogData) {
    if (!props.show) {
        return null
    }

    const [name, setName] = React.useState(props.selected != null ? props.selected.name : '')
    const [address, setAddress] = React.useState(props.selected != null ? props.selected.address : '')
    const [description, setDescription] = React.useState(props.selected != null ? props.selected.description : '')

    const API = useAPI()
    const update = async () => {
        try {
            //const response = await API.
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Dialog open={props.show} onClose={props.handle} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Contract { props.selected != null ? '편집' : '생성' }</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Contract { props.selected != null ? '편집' : '생성' }
                        </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="name"
                    type="text"
                    fullWidth
                    required
                    value={name}
                    onChange={(e) => { setName(e.target.value) }}
                />
                <TextField
                    margin="dense"
                    id="address"
                    label="address"
                    type="text"
                    fullWidth
                    required
                    value={address}
                    onChange={(e) => { setAddress(e.target.value) }}
                />
                <TextField
                    margin="dense"
                    id="description"
                    label="description"
                    type="text"
                    fullWidth
                    value={description}
                    onChange={(e) => { setDescription(e.target.value) }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handle} color="primary">
                    취소
                        </Button>
                <Button onClick={update} color="primary">
                    { props.selected != null? '수정' : '확인' }
                        </Button>
            </DialogActions>
        </Dialog>
    )
}