import { AppProps } from 'next/app'
import React, { useEffect } from "react";
import useAPI from '../hooks/useAPI';

function MyApp({ Component, pageProps }: AppProps) {

    const API = useAPI()

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
    }, []);

  return <Component {...pageProps} />
}

export default MyApp