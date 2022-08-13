import { Layout } from '../components/Layout';
import Head from 'next/head';
import styles from '../styles/ErrorPages.module.css';
import React from 'react';
import Link from 'next/link';

const Custom500 = () => {
    return (
        <Layout>
            <div className={styles.container}>
                <Head>
                    <title>Erro interno do servidor</title>
                </Head>
                <h1>404</h1>
                <p>Erro interno do servidor</p>
                Volta à página{' '}
                <Link href={'/'}>
                    <a className={styles.link}>Home</a>
                </Link>
            </div>
        </Layout>
    );
}

export default Custom500;