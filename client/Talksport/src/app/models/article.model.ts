import { User } from "./user.model";

export interface Article{
    _id: string,
    title: string,
    imageUrl: string,
    description: string,
    userId: string,
    user: User
}