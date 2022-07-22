import { NextApiHandler } from "next";
import { Users } from "../../../utils/users";

const Handler: NextApiHandler = (req, res) => {
    if (req.method === 'POST') {
        const { id } = req.query
        const { name, email } = req.body
        res.status(201).json({ id, name, email })
        return;
    }
    res.status(405).json({ error: '405 Method Not Allowed' })
}

export default Handler;