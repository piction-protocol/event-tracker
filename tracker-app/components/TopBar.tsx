import React, { useState, useEffect } from "react"
import Link from 'next/link'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import useAPI from 'hooks/useAPI'
import ToggleMenu from 'components/ToggleMenu'

const useStyles = makeStyles((theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    title: {
        flexGrow: 1,
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
}))

const API = useAPI()

export default function TopBar() {

    const classes = useStyles()
    const [username, setUsername] = useState("")

    const getMe = async () => {
        try {
            const response = await API.users.get()
            console.log(response)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getMe()
    }, [])

    return (
        <div>
            <AppBar position="absolute" className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Link href='/'>
                        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                            Event Tracker
                        </Typography>
                    </Link>
                    <ToggleMenu />
                </Toolbar>
            </AppBar>

        </div>
    )
}