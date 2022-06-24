import Head from "next/head"
import Navbar from "./Navbar"

const Layout = ({ children }) => (
    <>
        <Head>
            <title>My Money</title>
        </Head>
        <Navbar />
        {children}
    </>
)

export default Layout;
