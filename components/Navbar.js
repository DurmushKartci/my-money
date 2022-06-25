import Link from "next/link"

const Navbar = () =>(
    <nav className="navbar">
        <Link href="/">
            <a className="navbar-brand col-lg-6">My Money</a>
        </Link>

        <Link href="/">
            <a className="create col-lg-1">Anasayfa</a>
        </Link>
        <Link href="/gelir">
            <a className="create col-lg-1">Gelir</a>
        </Link>
        <Link href="/gider">
            <a className="create col-lg-1">Gider</a>
        </Link>
        <Link href="/gider">
            <a className="create col-lg-1">Profil</a>
        </Link>
    </nav>
)

export default Navbar;
