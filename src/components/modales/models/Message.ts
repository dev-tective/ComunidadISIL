export interface Message {
    type?: MessageType
    title: string;
    message: string;
}

export enum MessageType {
    ERROR,
    SUCCESS,
}

export enum MessageTitle {
    ERROR = '¡Ups! Error inesperado',
    SUCCESS = '¡Éxito! Operación exitosa',
}

// Función para verificar si el objeto es de tipo Message
export const isMessage = (obj: any): obj is Message => {
    return (
        typeof obj.type === 'string' &&
        typeof obj.title === 'string' &&
        typeof obj.message === 'string'
    )
};