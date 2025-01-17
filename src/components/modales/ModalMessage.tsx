import {createPortal} from "react-dom";
import {useClickOutside} from "../hooks/useClickOutside";
import {Message} from "./models/Message.ts";

export interface ModalMessageProps extends Message {
    onClose: () => void,
}

function ModalMessage(
    { title, message, onClose } : ModalMessageProps
) {
    const modalRef = useClickOutside(onClose);

    return createPortal(
        <section className={'modal'}>
            <span className={`modal-message`}
                  ref={modalRef}
            >
                <h1>{title}</h1>
                <pre>{message}</pre>
                <button className={'primaryButton'}
                        onClick={onClose}
                >Cerrar</button>
            </span>
        </section>,
        document.body
    )
}

export default ModalMessage;