import { NextApiHandler } from "next";
import prisma from "../../../libs/prisma";

const HandlerGet: NextApiHandler = async (req, res) => {
    const { page } = req.query
    let take = 2
    let currentPage = parseInt(page as string) > 0 ? parseInt(page as string) : 1
    let skip = (currentPage - 1) * take || 0
    const users = await prisma.user.findMany({
        take,
        skip,
        where: {
            active: true
        },
        select: {
            id: true,
            name: true,
            email: true,
            active: true,
        },
        orderBy: {
            name: 'asc'
        }
    }).catch((e) => {
        // throw e
        res.status(400).json({ status: 400, error: '400 Bad Request' })
    })

    res.status(200).json({ status: 200, users })
}

const HandlerPost: NextApiHandler = async (req, res) => {
    const { name, email } = req.body

    const newUser = await prisma.user.create({
        data: { name, email }
    }).catch((e) => {
        res.status(400).json({ status: 400, error: '400 Bad Request', e })
    })

    res.status(201).json({ status: 200, user: newUser })
}

const Handler: NextApiHandler = (req, res) => {
    switch (req.method) {
        case 'GET':
            HandlerGet(req, res)
            break;
        case 'POST':
            HandlerPost(req, res)
            break;

        default:
            res.status(405).json({ error: '405 Method Not Allowed' })
            break;
    }
}

export default Handler;