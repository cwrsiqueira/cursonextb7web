import { useTranslation } from 'next-i18next'
import { ReactElement } from 'react'
import NavBar from '../Navbar'
import styles from './Layout.module.css'

type Props = {
    children: ReactElement
}

export const Layout = ({ children }: Props) => {
    const { t } = useTranslation('common')

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>{t('My Header')}</h1>
            </header>

            <NavBar />

            <main>{children}</main>

            <footer className={styles.footer}>
                {t('footer.All rights reserved')}
            </footer>

        </div>
    )
}
