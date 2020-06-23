import Layout from "../../components/Layout";
import Link from "next/link";
import Button from '@material-ui/core/Button';

const LoginPage: React.FunctionComponent = () => (
    <div>
    <h1>Login</h1>
        <p>This is the login page</p>

        <p>
            <Button>
                <Link href = "/">
                    <a> Go home</a>
                </Link>
            </Button>
        </p>
    </div>
)

export default LoginPage