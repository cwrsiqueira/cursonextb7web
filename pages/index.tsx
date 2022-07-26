import React from "react"
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Layout } from "../components/Layout"
import { useSession, signIn, signOut } from 'next-auth/react'
import { GetServerSideProps } from "next"
import api from "../libs/api"
import { AuthUser } from "../types/AuthUser"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from "next-i18next"

type Props = {
  loggedUser: AuthUser
}

export default function Home({ loggedUser }: Props) {
  const { data: session } = useSession()
  const { t } = useTranslation('common')

  if (session) {
    return (
      <Layout>
        <div className={styles.container}>
          <Head>
            <title>{t('Create Next App')}</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <main>
            <div className={styles.imgArea}>
              <Image src={session.user.image} alt="userImg" width={80} height={80} />
            </div>

            <h1> {t('welcome', { user: session.user.name })}</h1>
          </main>

        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>{t('Create Next App')}</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <h1>{t('disconected')}</h1>
        </main>

      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // const session = await unstable_getServerSession(context.req, context.res, authOptions);
  // if (!session) return { redirect: { destination: '/auth/login', permanent: true } }

  const users = await api.getAllUsers()

  return {
    props: {
      // loggedUser: session.user,
      ...(await serverSideTranslations(context.locale as string, ['common'])),
      users
    }
  }
}
