import Head from "next/head"
import { Layout } from "../components/Layout"
import api from "../libs/api"
import { User } from "../types/User"
import styles from '../styles/Usuarios.module.css'

type Props = {
    users: User[]
}

const Usuarios = ({ users }: Props) => {
    return (
        <Layout>
            <div>
                <Head>
                    <title>Usuários</title>
                </Head>

                <h1>Página Usuários</h1>

                <ul>
                    {users.map((item, index) => (
                        <li key={index}>{item.name}</li>
                    ))}
                </ul>
            </div>
        </Layout>
    )
}

export const getServerSideProps = async () => {

    const users = await api.getAllUsers(4, 2, true)

    return {
        props: {
            users
        }
    }
}

export default Usuarios;