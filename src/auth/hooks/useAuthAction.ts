import {useEffect, useState} from "react";
import {useAppContext} from "../../context/hooks/useAppContext.ts";
import {useNavigate} from "react-router-dom";
import {signIn, signInvited, signUp} from "../services/apiAuth.ts";
import {isMessage, MessageTitle, MessageType} from "../../components/modales/models/Message.ts";
import {useModal} from "../../components/modales/hooks/useModal.ts";

export function useAuthAction() {
    const [isLoading, setIsLoading] = useState(false);
    const { setModalDirection, modalInfo, showModal, modalState, hideModal } = useModal();
    const { user, setUser } = useAppContext();
    const navigate = useNavigate();

    const handleAuthLogin = async (email: string, password: string) => {
        setIsLoading(true); // Inicia el estado de carga
        try {
            const result = await signIn(email, password);
            if (isMessage(result)) {
                showModal({
                    type: result.type,
                    title: result.title,
                    message: result.message,
                });
                return;
            }
            setUser(result)
            navigate('home');
        } finally {
            setIsLoading(false); // Finaliza el estado de carga
        }
    };

    const handleAuthRegister = async (
        email: string, password: string, username: string, confirmPassword: string, careerSelect: string
    ) => {
        if (email && password && username && confirmPassword && careerSelect) {
            if (password !== confirmPassword) {
                showModal({
                    type: MessageType.ERROR,
                    title: MessageTitle.ERROR,
                    message: 'Las contraseñas no coinciden.',
                });
                return;
            }

            setIsLoading(true); // Inicia el estado de carga
            try {
                const result = await signUp(email, password, username, careerSelect);
                showModal({
                    type: result.type,
                    title: result.title,
                    message: result.message,
                });
                if (result.type === MessageType.SUCCESS) setModalDirection(' ');
                return;
            } finally {
                setIsLoading(false); // Finaliza el estado de carga
            }
        }

        showModal({
            type: MessageType.ERROR,
            title: MessageTitle.ERROR,
            message: 'Completa e ingresa los datos correctamente.',
        });
    };

    const handleAuthInvited = () => {
        console.log("Auth invited successfully");
        const result = signInvited();
        showModal({
            type: result.type,
            title: result.title,
            message: result.message,
        })
        console.log(result);
        if (result.type === MessageType.SUCCESS) setModalDirection('home');
    }

    const navigateToAuth = (direction: string) => {
        navigate(`/${direction}`);
    }

    useEffect(() => {
        if (user){
            navigate('/home');
        }
    },[navigate, user])

    return {
        modalInfo,
        modalState,
        hideModal,
        isLoading,
        navigateToAuth,
        handleAuthLogin,
        handleAuthRegister,
        handleAuthInvited,
    };
}