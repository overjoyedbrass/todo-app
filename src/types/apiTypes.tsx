export type List = {
    id: string,
    name: string,
    finished: boolean
}

export type Item = {
    id: string,
    listId: string,
    title: string,
    description: string,
    deadline: number,
    finished: boolean
}