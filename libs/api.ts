import prisma from "./prisma"

const api = {
    getAllUsers: async (perPage: number = 5, page: number = 0, active: boolean = true) => {

        let take = perPage || 5
        let currentPage = page > 0 ? page : 1
        let skip = (currentPage - 1) * take || 0

        const users = await prisma.user.findMany({
            take,
            skip,
            where: {
                active: active
            },
            select: {
                id: true,
                name: true,
                email: true,
                active: true,
            },
            orderBy: {
                id: 'asc'
            }
        })

        return users
    },

    createUser: async (name, email) => {
        const response = await prisma.user.create({
            data: { name, email }
        }).catch((e) => {
            return { error: e };
        })

        return response;
    },

    getOneUser: async (id) => {
        const response = await prisma.user.findUnique({
            where: {
                id: parseInt(id as string)
            }
        }).catch((e) => {
            return { error: e };
        })

        if (!response) {
            return { error: 'Usuário não encontrado' }
        }

        return response;
    },

    updateUser: async (id, name?, active?, role?) => {
        const response = await prisma.user.update({
            where: {
                id: parseInt(id as string)
            },
            data: {
                name,
                active,
                role
            }
        }).catch((e) => {
            return { error: e };
        })

        if (!response) {
            return { error: 'Erro ao editar usuário' }
        }

        return response;
    },

    deleteUser: async (id) => {
        return await prisma.user.delete({
            where: {
                id: parseInt(id as string)
            }
        }).catch((e) => {
            return { error: e };
        })
    }
}

export default api;