import React from "react"
import useAPI from 'hooks/useAPI'
import Router from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import { Container, CssBaseline, Typography, TextField, Button } from '@material-ui/core'
import LockIcon from '@material-ui/icons/Lock'


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
}))


export default function LoginPage() {
    
    const [username, setUsername] = React.useState("")
    const [password, setPassword] = React.useState("")
    const classes = useStyles()
    const API = useAPI()

    const onSubmit = async () => {
        try {
            const response = await API.session.create({ username: username, password: password })
            Router.replace('/')
        } catch (e) {
            console.log(e)
        }
    }

    const onKeyPress = (e: { key: string }) => {
        if (e.key === "Enter") {
            onSubmit()
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
                        onKeyPress={onKeyPress}
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
}