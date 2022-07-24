import { NextApiHandler } from "next";
import api from "../../../libs/api";
import prisma from "../../../libs/prisma";

// GET ONE USER
const HandlerGet: NextApiHandler = async (req, res) => {
    const { id } = req.query
    const response = await api.getOneUser(id)
    if (response.error) {
        res.status(400).json({ response })
        return;
    }
    res.status(201).json({ response: { user: response } })
}

// UPDATE USER
const handlerPut: NextApiHandler = async (req, res) => {
    const { id } = req.query
    let { name, active, role } = req.body
    if (req.body.active) {
        active = req.body.active == 'true' || req.body.active == '1'
    }
    const response = await api.updateUser(id, name, active, role)
    if (response.error) {
        res.status(400).json({ response })
        return;
    }
    res.status(201).json({ response: { user: response } })
}

// DELETE USER
const handlerDelete: NextApiHandler = async (req, res) => {
    const { id } = req.query

    const response = await api.deleteUser(id)
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