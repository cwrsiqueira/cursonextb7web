import Link from 'next/link';
import styles from './Navbar.module.css';
import { navigationLinks } from '../../utils/data';
import { useRouter } from 'next/router';

const NavBar = () => {
    const router = useRouter()
    return (
        <div className={styles.container}>
            <ul className={styles.navbar}>
                {navigationLinks.map((link, index) => (
                    <li key={index} className={`${styles.navbar} ${link.path.includes(router.pathname) ? styles.active : null}`}>
                        <Link href={link.path[0]}>{link.label}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default NavBar;