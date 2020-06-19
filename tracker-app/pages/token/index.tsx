import Layout from "../../components/Layout";
import Link from "next/link";

const TestPage: React.FunctionComponent = () => (
    <Layout title="Token">
        <h1>Token</h1>
        <p>This is the test token page</p>
        <p>
            <Link href = "/">
                <a> Go home</a>
            </Link>
        </p>
    </Layout>
)

export default TestPage