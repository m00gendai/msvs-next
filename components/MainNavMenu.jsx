import Link from "next/link"
import styles from '../styles/Navbar.module.css'

export default function Nav(){
    return(
        <nav className={styles.navbar}>
            <ul className={styles.navbarList}>
                <li className={styles.navbarItem}>
                    <Link href="/" className={styles.navbarItemLink}>
                        Home
                    </Link>
                </li>
            </ul>
        </nav>
    )
}
