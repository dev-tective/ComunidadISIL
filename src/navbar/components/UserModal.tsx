import {useClickOutside} from "../../components/hooks/useClickOutside.ts";
import {createPortal} from "react-dom";
import Invited from '/invited.svg';
import {useNavigate} from "react-router-dom";
import {useModal} from "../../components/modales/hooks/useModal.ts";
import {Message, MessageType} from "../../components/modales/models/Message.ts";
import {signOut} from "../../auth/services/apiAuth.ts";
import ModalMessage from "../../components/modales/ModalMessage.tsx";
import {useAppContext} from "../../context/hooks/useAppContext.ts";
import {User} from "../../models/User.ts";

interface UserModalProps {
    user: User | null;
    onClose: () => void;
}

const UserModal = (
    { user, onClose }: UserModalProps
) => {
    const modalRef = useClickOutside(onClose);
    const navigate = useNavigate();
    const modal = useModal();
    const { setUser } = useAppContext();

    const handleAuthLogout = async (
        showModal: (info: Message) => void
    ) => {
        const result = await signOut();
        showModal({
            type: result.type,
            title: result.title,
            message: result.message,
        })
        if (result.type === MessageType.SUCCESS) {
            setUser(null);
        }
    }

    return createPortal(
        <>
            {modal.modalState && (
                <ModalMessage onClose={modal.hideModal}
                              title={modal.modalInfo.title}
                              message={modal.modalInfo.message}
                />
            )}
            <span className="user-menu-modal"
                ref={modalRef}
            >
                <header>
                    <span className="modal-close">
                        <i className="fa-solid fa-x close"
                           onClick={onClose}
                        ></i>
                    </span>
                    <img style={{borderRadius: '100%'}}
                         src={user? user.profile.picture : Invited}
                         alt="user"/>
                    <h1>Hola {user? user.profile.username : 'Invitado'}!</h1>
                </header>
                <aside>
                    {user && (
                        <span>
                            <i className="fas fa-gear"></i>
                            <p>Configurar</p>
                        </span>
                    )}
                    <span>
                        <i className="fas fa-dollar-sign"></i>
                        <p>Contribuir</p>
                    </span>
                    <span onClick={() => user?
                        handleAuthLogout(modal.showModal)
                        : navigate('/login')}>
                        <p>{user? 'Cerrar Sesión' : 'Iniciar Sesión'}   </p>
                    </span>
                </aside>
            </span>
        </>,
        document.body
    );
}

export default UserModal