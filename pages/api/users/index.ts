import { NextApiHandler } from "next";
import { Users } from '../../../utils/users'

const HandlerGet: NextApiHandler = (req, res) => {
    const { limit, offset } = req.query

    res.status(200).json({ limit, offset })
}

const HandlerPost: NextApiHandler = (req, res) => {
    const { id, name, email } = req.body

    res.status(201).json({ id, name, email })
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