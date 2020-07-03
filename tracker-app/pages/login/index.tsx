import React, { useState, useCallback } from "react";
import useAPI from '../../hooks/useAPI';
import Router from 'next/router'
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockIcon from '@material-ui/icons/Lock';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


export default function LoginPage() {
    
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const classes = useStyles()
    const API = useAPI()

    const onSubmit = async () => {
        try {
            const response = await API.session.create({ username: username, password: password })
            Router.back()
        } catch (e) {
            console.log(e)
        }
    }
    
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />

            <div className={classes.paper} >
                <LockIcon style={{ fontSize: 60 }} />
                <Typography variant="h2" gutterBottom>
                    Login
                </Typography>

                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="userName"
                        label="Name"
                        name="userName"
                        autoFocus
                        onChange={(e) => { setUsername(e.target.value) }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="Password"
                        name="password"
                        type="password"
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                </form>
                
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={onSubmit}>
                    LOGIN
                </Button>
            
            </div>
        </Container>
    )
};