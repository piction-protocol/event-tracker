import React from 'react'
import AlertDialogData from 'model/AlertDialogData'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialog(props: AlertDialogData) {
    if (!props.show) {
        return null
    }

    return (
        <Dialog
            open={props.show}
            onClose={() => props.handle(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {props.msg}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.handle(false)} color="primary">
                    Disagree
                </Button>
                <Button onClick={() => props.handle(true)} color="primary" autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    )
}