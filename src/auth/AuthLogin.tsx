import {AuthLoginInputFields} from "./components/AuthInputFields.tsx";
import './Auth.css';

function AuthLogin() {
    return (
        <div className="auth">
            <header className="login-title" style={{marginTop: '25px'}}>
                <h1>¡Bienvenido a Comunidad <strong>ISIL</strong>!</h1>
                <p>Accede a tu cuenta y enterate de todo lo que pasa en nuestro instituto.</p>
            </header>
            <section className={"login-body"} style={{marginBottom: '25px'}}>
                <AuthLoginInputFields/>
            </section>
        </div>
    )
}

export default AuthLogin;