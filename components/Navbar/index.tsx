import Link from 'next/link';
import styles from './Navbar.module.css';
import { navigationLinks } from '../../utils/data';
import { useRouter } from 'next/router';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useState } from 'react';

const NavBar = () => {
    const router = useRouter()
    const { data: session } = useSession();
    const [path, setPath] = useState(router.locale);

    const handleLang = (e: string) => {
        router.push(router.pathname, router.pathname, { locale: e })
    }

    return (
        <div className={styles.container}>
            <ul className={styles.navbar}>
                {navigationLinks.map((link, index) => (
                    <li key={index} className={`${styles.navbar} ${link.path.includes(router.pathname) ? styles.active : null}`}>
                        <Link href={link.path[0]}>{link.label}</Link>
                    </li>
                ))}
                <li>
                    {session &&
                        <button onClick={() => signOut()}>Sair</button>
                    }

                    {!session &&
                        <button onClick={() => signIn()}>Entrar</button>
                    }
                </li>
                <ul>
                    {router.locales.map((item, key) => (
                        <li key={key}>
                            <Link href={router.pathname} locale={item}>
                                <a className={router.locale == item ? styles.selected : ''}>{item}</a>
                            </Link>
                        </li>
                    ))}
                </ul>
                <select value={router.locale} onChange={e => handleLang(e.target.value)}>
                    {router.locales.map((item, key) => (
                        <option value={item} key={key}>{item}</option>
                    ))}
                </select>
            </ul>
            <div className={styles.lang}>{router.locale} - {router.pathname}</div>
        </div >
    )
}

export default NavBar;