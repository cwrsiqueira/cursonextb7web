import { Layout } from '../components/Layout';
import Head from 'next/head';
import styles from '../styles/ErrorPages.module.css';
import React from 'react';
import Link from 'next/link';

const Custom404 = () => {
    return (
        <Layout>
            <div className={styles.container}>
                <Head>
                    <title>Página não encontrada</title>
                </Head>
                <h1>404</h1>
                <p>Página não encontrada</p>
                Volta à página{' '}
                <Link href={'/'}>
                    <a className={styles.link}>Home</a>
                </Link>
            </div>
        </Layout>
    );
}

export default Custom404;