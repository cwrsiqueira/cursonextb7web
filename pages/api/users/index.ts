import { NextApiHandler } from "next";
import api from "../../../libs/api";
import prisma from "../../../libs/prisma";

// GET ALL USERS
const HandlerGet: NextApiHandler = async (req, res) => {
    const { perPage, page, active } = req.query;
    const users = await api.getAllUsers(parseInt(perPage as string), parseInt(page as string), active == 'true')
    res.status(200).json({ status: 200, users })
}

// CREATE USER
const HandlerPost: NextApiHandler = async (req, res) => {
    const { name, email } = req.body
    const response = await api.createUser(name, email)
    if (response.error) {
        res.status(400).json({ response })
        return;
    }
    res.status(201).json({ response: { user: response } })
}

// DEFINE METHOD
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