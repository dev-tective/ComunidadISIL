export interface User {
    email: string;
    token: string;
    profile: {
        career_id: number;
        id: number;
        picture: string;
        username: string;
        user_id: string;
    }
}

// Función para verificar si el objeto es de tipo User
export const isUser = (obj: any): obj is User => {
    return (
        typeof obj.id === 'string' &&
        typeof obj.name === 'string' &&
        typeof obj.email === 'string'
    )
};