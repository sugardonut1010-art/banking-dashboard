import { User } from "@/types/user"

export let user: User = {
    id: "user_1",
    name: "Jamie",
    email: "jamieleecurtis997@gmail.com",
}

export function updateUser(data: Partial<User>) {
    user = { ...user, ...data }
}
