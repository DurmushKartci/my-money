import Link from "next/link"

const Navbar = () =>(
    <nav className="navbar">
        <Link href="/">
            <a className="navbar-brand">Ana Sayfa</a>
        </Link>
        <Link href="/gelir">
            <a className="create">Gelir</a>
        </Link>
        <Link href="/gider">
            <a className="create">Gider</a>
        </Link>
        <Link href="/profil">
            <a className="create">Anasayfa</a>
        </Link>
    </nav>
)

export default Navbar;
