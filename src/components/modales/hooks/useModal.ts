import { useState } from "react";
import { Message } from "../models/Message.ts";
import {useNavigate} from "react-router-dom";

export function useModal() {
    const [modalDirection, setModalDirection] = useState<string|null>(null)
    const [modalState, setModalState] = useState<boolean>(false);
    const [modalInfo, setModalInfo] = useState<Message>({
        title: '',
        message: ''
    });
    const navigate = useNavigate();

    // Muestra el modal con los datos proporcionados
    const showModal = (data: Message) => {
        setModalInfo(data);
        setModalState(true);
    };

    // Oculta el modal
    const hideModal = () => {
        setModalState(false);
        if (modalDirection) {
            navigate(`/${modalDirection}`);
        }
    };

    return {
        setModalDirection,
        modalState,
        modalDirection,
        setModalState,
        modalInfo,
        showModal,
        hideModal,
    };
}
