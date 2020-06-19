import Link from 'next/link'
import Layout from '../components/Layout'
import styled from 'styled-components'
import { GetServerSideProps } from 'next'
import { InferGetServerSidePropsType } from 'next'

const name = "Event Tracker"

function getName(str: string): string {
  return "Hello, " + str + " Go Token"
}

const BtnGood = styled.button``

export default function Home({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
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

        <p>
          {data.map( (categorie: Categories) => (
            <li>piction categorie name: { categorie.name }</li>
          ))}
          
        </p>

      </Layout>
    </div>
  )
}

interface Categories {
  id: number
  name: string
  priority: number
  thumbnail: string
  categorizedCount: number
  status: boolean
  createdAt: number
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`https://api.piction.network/categories`)
  const data: Array<Categories> = await res.json()

  return { props: { data } }
}