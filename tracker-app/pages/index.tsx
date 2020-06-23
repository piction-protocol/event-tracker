import Link from 'next/link'
import Layout from '../components/Layout'
import styled from 'styled-components'
import React, { useState, useEffect } from "react";
import Router from 'next/router'

const name = "Event Tracker"

function getName(str: string): string {
  return "Hello, " + str + " Go Token"
}

const BtnGood = styled.button``

export default function Home() {

  const [isLogin, setLogin] = useState(false)

  useEffect(() => {
    const {pathname} = Router
    if(pathname == '/' ){
        Router.push('/login')
    }
  });

  return (
    <div>
      <Layout title="Welcome">
        <p>
          <h1 className="title">
            Welcome to <a href="https://nextjs.org">Next.js!</a>
          </h1>
        </p>

        <p className="description">
          Get started by editing <code>pages/index.js</code>
        </p>

        <p>
          <BtnGood>
            <Link href="/token">
              <a>{getName(name)}</a>
            </Link>
          </BtnGood>
        </p>
        
      </Layout>
    </div>
  )
}