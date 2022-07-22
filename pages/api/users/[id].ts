import { NextApiHandler } from "next";
import prisma from "../../../libs/prisma";

const HandlerGet: NextApiHandler = async (req, res) => {
    const { id } = req.query

    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(id as string)
        }
    })

    if (user) {
        res.status(200).json({ status: 200, user })
        return;
    }

    res.status(404).json({ status: 404, error: '404 User Not Found' })
}

const handlerPut: NextApiHandler = async (req, res) => {
    const { id } = req.query
    let { name, active, role } = req.body

    if (req.body.active) {
        active = req.body.active == 'true' || req.body.active == '1'
    }

    const user = await prisma.user.update({
        where: {
            id: parseInt(id as string)
        },
        data: {
            name,
            active,
            role
        }
    })

    if (user) {
        res.status(200).json({ status: 200, user })
        return
    }

    res.status(400).json({ status: 400, error: '400 Bad Request' })
}

const handlerDelete: NextApiHandler = async (req, res) => {
    const { id } = req.query

    const user = await prisma.user.delete({
        where: {
            id: parseInt(id as string)
        }
    }).catch(() => {
        res.status(404).json({ status: 404, error: '404 User Not Found' })
        return;
    })

    res.status(200).json({ status: 200 })
}

const Handler: NextApiHandler = (req, res) => {
    switch (req.method) {
        case 'GET':
            HandlerGet(req, res)
            break;
        case 'PUT':
            handlerPut(req, res)
            break;
        case 'DELETE':
            handlerDelete(req, res)
            break;

        default:
            res.status(405).json({ error: '405 Method Not Allowed' })
            break;
    }
}

export default Handler;