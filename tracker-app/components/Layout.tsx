import * as React from 'react'
import Link from 'next/link'
import Head from 'next/head'

type Props = {
    title?: string
}

const Layout: React.FunctionComponent<Props> = ({
    children,
    title = 'This is the default title'
}) => (
    <div>
        <Head>
            <title>{title}</title>
        </Head>
        <header>
            <nav>
                <Link href="/">
                    <a>Home</a>
                </Link>
                {' '} | {' '}
                <Link href="/token">
                    <a>Token</a>
                </Link>
            </nav>
        </header>
        {children}
        <footer>
            <hr />
        <span>I'm here to stay (Footer)</span>
        </footer>
    </div>
)

export default Layout