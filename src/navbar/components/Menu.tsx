import {Option} from "../models/Option.ts";
import {useNavigate} from "react-router-dom";
import {useClickOutside} from "../../components/hooks/useClickOutside.ts";
import {Icon} from "@iconify/react";

interface MenuProps {
    show: boolean;
    setShow: (show: boolean) => void;
}

const Menu = (
    { show, setShow }: MenuProps
) => {
    const navRef = useClickOutside<HTMLDivElement>(() =>
        setShow(false));
    const navigate = useNavigate();

    return(
        <aside
            className="options-nav"
            style={{left: show ? "0" : "-100%"}}
            ref={navRef}
        >
            <div className="options-nav-content">
                {options.map((option, index) => (
                    <span key={index}
                          className="options-nav-option"
                          onClick={() => {
                              setShow(false)
                              navigate(`/${option.direction}`)
                          }}
                    >
                        <Icon icon={option.icon} />
                        <p>{option.text}</p>
                    </span>
                ))}
                <i
                    className="fa-solid fa-x close"
                    onClick={() => setShow(false)}
                ></i>
            </div>
        </aside>
    )
}

const options: Option[] = [
    {
        icon: "typcn:home",
        text: "Inicio",
        direction: "home"
    },
    {
        icon: "fontisto:calculator",
        text: "Calcular Notas",
        direction: "calculator"
    },
    {
        icon: "material-symbols:reviews-rounded",
        text: "Reseñas",
        direction: "reviews"
    },
    {
        icon: 'fa6-solid:comments',
        text: "Experiencias ISIL",
        direction: "experiences"
    }
];

export default Menu;