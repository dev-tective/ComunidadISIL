import {AuthRegisterInputFields} from "./components/AuthInputFields.tsx";
import './Auth.css';

function AuthRegister() {
    return (
        <div className="auth">
            <header className="login-title" style={{marginTop: '30px'}}>
                <h1>¡Únete a la Comunidad <strong>ISIL</strong>!</h1>
                <p>Regístrate para compartir, opinar y descubrir lo que todos dicen.</p>
            </header>
            <section className={"login-body"} style={{marginBottom: '30px'}}>
                <AuthRegisterInputFields/>
            </section>
        </div>
    )
}

export default AuthRegister;