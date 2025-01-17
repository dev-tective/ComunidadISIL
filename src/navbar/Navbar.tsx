import {useState} from "react";
import './Navbar.css';
import {Outlet} from "react-router-dom";
import Menu from "./components/Menu.tsx";
import {useModal} from "../components/modales/hooks/useModal.ts";
import UserModal from "./components/UserModal.tsx";
import {useAppContext} from "../context/hooks/useAppContext.ts";
import Invited from '/invited.svg';

export function NavBar() {
    const [optionsShow, setOptionsShow] = useState<boolean>(false);
    const { modalState, setModalState, hideModal } = useModal();
    const { user } = useAppContext();

    return (
        <>
            <nav className="navbar">
                <i
                    className="fas fa-bars"
                    style={{opacity: !optionsShow ? 1 : 0}}
                    onClick={() => setOptionsShow(!optionsShow)}
                ></i>
                <h1>Comunidad <strong>ISIL</strong></h1>
                <img src={user? user.profile.picture : Invited}
                     alt={"user-picture"}
                     onClick={() => setModalState(true)}
                />
                <Menu
                    show={optionsShow}
                    setShow={setOptionsShow}
                />
                {modalState && (
                    <UserModal user={user}
                               onClose={hideModal}
                    />
                )}
            </nav>
            <Outlet />
        </>
    );
}