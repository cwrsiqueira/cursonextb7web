import Head from "next/head"
import { Layout } from "../../components/Layout"
import api from "../../libs/api"
import { User } from "../../types/User"
import styles from '../../styles/Usuarios.module.css'
import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"

type Props = {
    users: User[]
}

const Usuarios = ({ users }: Props) => {
    const router = useRouter()
    const [userList, setUserList] = useState(users)
    const [loading, setLoading] = useState(false)
    const [pageCount, setPageCount] = useState(1)
    const [btnActive, setBtnActive] = useState(true)
    const [perPage, setPerPage] = useState(5)

    const handleLoadMore = async () => {
        if (!loading) {
            setLoading(true)
            const req = await fetch(`/api/users?perPage=${perPage}&page=${pageCount + 1}&active=true`)
            const json = await req.json()
            if (json.status == 200) {
                setUserList([...userList, ...json.users])
            }
            if (json.users.length < perPage) {
                setBtnActive(false)
            }
            setLoading(false)
            setPageCount(pageCount + 1)
        }
    }

    const handleDelete = async (id: number) => {
        const req = await fetch(`/api/users/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await req.json()
        if (json.error) {
            alert('Erro ao excluir')
        }
        document.querySelector('.id' + id).remove()
    }

    return (
        <Layout>
            <div>
                <Head>
                    <title>Usuários</title>
                </Head>

                <h1>Página Usuários</h1>

                <Link href={`/usuarios/novo`}><button>Adicionar Usuário</button></Link>

                <ul>
                    {userList.map((item, index) => (
                        <li className={`${styles.li} id${item.id}`} key={index}>{item.name} - <button onClick={() => handleDelete(item.id)}>[ X ]</button></li>
                    ))}
                </ul>

                {btnActive &&
                    <button onClick={handleLoadMore}>Carregar mais...</button>
                }
            </div>
        </Layout >
    )
}

export const getServerSideProps = async () => {

    const users = await api.getAllUsers()

    return {
        props: {
            users
        }
    }
}

export default Usuarios;