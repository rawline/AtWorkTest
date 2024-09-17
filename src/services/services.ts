import { useHttp } from "../hooks/http.hook";

export interface UserCard {
    id: number;
    name: string;
    username: string;
    email: string;
    city: string;
    phone: string;
    companyName: string;
    archived: boolean;
}

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        city:string;
    }
    phone: string;
    company: {
        name: string;
    }
    archived: boolean;
}

const useStaffService = () => {

    const {loading, request, error, clearError} = useHttp();
    const _apiBase = "https://jsonplaceholder.typicode.com/";

    const getUsers = async () => {
        const res = await request(`${_apiBase}users`);
        return res.slice(0, 6).map(_transformUsers)
    }

    const _transformUsers = (user: User):UserCard => {

        return {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            city: user.address.city,
            phone: user.phone,
            companyName: user.company.name,
            archived: false
        }
    }

    return {loading, error, getUsers, clearError};
}

export default useStaffService;