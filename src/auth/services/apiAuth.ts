import {Message, MessageTitle, MessageType} from "../../components/modales/models/Message.ts";
import supabase from "../../supabaseClient.ts";
import Cookies from "js-cookie";
import {User} from "../../models/User.ts";

export const signIn = async (
    email: string, password: string
): Promise<Message|User> => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error && error.message) {
        switch (error.message) {
            case "Invalid login credentials":
                return {
                    type: MessageType.ERROR,
                    title: MessageTitle.ERROR,
                    message: 'Las credenciales ingresadas no son correctas. Por favor, inténtalo de nuevo.'
                } as Message;
            case "Email not confirmed":
                return {
                    type: MessageType.ERROR,
                    title: MessageTitle.ERROR,
                    message: 'Tu correo no ha sido confirmado. Revisa tu bandeja de entrada para confirmar.'
                } as Message;
            default:
                return {
                    type: MessageType.ERROR,
                    title: MessageTitle.ERROR,
                    message: 'Ha ocurrido un error inesperado. Por favor, inténtalo nuevamente.'
                } as Message;
        }
    }

    if (data) {
        const { data: profile, error: profileError } = await supabase.rpc('get_profile_by_user_id', {
            user_id: data.user?.id,
        }).single();

        if (profileError) {
            console.error('Error al obtener el perfil del usuario:', profileError.message);
            return {
                type: MessageType.ERROR,
                title: MessageTitle.ERROR,
                message: 'Error al obtener el perfil del usuario.'
            } as Message;
        }
        if (profile) {
            const user = {
                token: data.session?.access_token,
                email: data.user?.email,
                profile,
            } as User;

            Cookies.set('user', JSON.stringify(user), {
                path: '/',
                expires: 7,
                secure: true,
                sameSite: 'strict',
            });

            console.log('Datos del usuario guardados en cookies:', user);
            return user;
        }
    }

    return {
        type: MessageType.ERROR,
        title: MessageTitle.ERROR,
        message: 'Ha ocurrido un error inesperado',
    } as Message;
};

export const signUp = async (
    email: string, password: string, username: string, careerId: string
): Promise<Message> => {
    const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
    });

    if (authError) {
        console.error("Error al registrar usuario:", authError.message);
        return {
            type: MessageType.ERROR,
            title: MessageTitle.ERROR,
            message: 'Error al tratar de registrar el usuario.',
        } as Message;
    }

    if (authData) {
        // Si el registro fue exitoso, insertar el perfil del usuario
        const { error: profileError } = await supabase
            .from("profiles")
            .insert({
                username,
                user_id: authData.user?.id,
                career_id: careerId,
            });

        if (profileError) {
            console.error(
                "Error al insertar perfil del usuario:",
                profileError.message
            );
            return {
                type: MessageType.ERROR,
                title: MessageTitle.ERROR,
                message: "Este correo electrónico ya está vinculado a otra cuenta."
            } as Message;
        }

        return {
            type: MessageType.SUCCESS,
            title: MessageTitle.SUCCESS,
            message: "Registro realizado con éxito. Ahora puedes iniciar sesión."
        } as Message;
    }

    return {
        type: MessageType.ERROR,
        title: MessageTitle.ERROR,
        message: "Error desconocido al registrar usuario."
    } as Message;
};

export const signOut = async (): Promise<Message> => {
    const { error } = await supabase.auth.signOut()

    if (error){
        console.error('Error al cerrar sesión:', error.message)
        return {
            type: MessageType.ERROR,
            title: MessageTitle.ERROR,
            message: 'Error al cerrar sesión.'
        } as Message;
    }

    Cookies.remove('user');
    return {
        type: MessageType.SUCCESS,
        title: MessageTitle.SUCCESS,
        message: "Se cerro la sesión exitosamente."
    } as Message;
}

export const signInvited = () => {
    const existingUser = Cookies.get('user');
    if (existingUser) {

        const user = JSON.parse(existingUser);
        if (user.email) {
            return {
                type: MessageType.ERROR,
                title: MessageTitle.ERROR,
                message: "Ya estás autenticado como usuario.",
            } as Message;
        }
    }
    return {
        type: MessageType.SUCCESS,
        title: MessageTitle.SUCCESS,
        message: "Ingresaste como invitado. Disfruta tu estadía en Comunidad ISIL." +
            " Si quieres compartir tus opiniones o experiencias, debes autenticarte.",
    } as Message;
};