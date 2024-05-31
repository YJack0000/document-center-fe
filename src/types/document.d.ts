type Document = {
    id: string,
    title: string,
    content: string,
    status: string,
    updatedAt: string,
    createdAt: string,
    owner: UserInfo
}

type UserInfo = {
    id: string,
    name: string,
}

type DocumentDTO = {
    id: string,
    title: string,
    content: string,
    status: string,
    updateAt: string,
    createAt: string,
    owner: {
        id: string,
        name: string
    }
}