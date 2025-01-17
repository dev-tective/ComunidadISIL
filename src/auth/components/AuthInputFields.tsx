import {useAppContext} from "../../context/hooks/useAppContext.ts";
import InputField, {InputFieldProps} from "../../components/form/InputField.tsx";
import SelectField from "../../components/form/SelectField.tsx";
import {handleErrorEmpty, handleErrorMail} from "../../components/form/utils/errorConditions.ts";
import ModalMessage from "../../components/modales/ModalMessage.tsx";
import Anchor from "../../components/navigators/Anchor.tsx";
import {useAuthAction} from "../hooks/useAuthAction.ts";
import useForm from "../../components/hooks/useForm.ts";
import FormFields from "../../components/form/FormFields.tsx";

//Login fields
export const AuthLoginInputFields = () => {
    const { form, onInputChange } = useForm({
        email: '',
        password: '',
    });
    const { email, password } = form;
    const {
        navigateToAuth,
        handleAuthInvited,
        handleAuthLogin,
        modalInfo, isLoading,
        modalState,
        hideModal
    } = useAuthAction();

    return (
        <>
            {modalState && (
                <ModalMessage
                    onClose={hideModal}
                    title={modalInfo.title}
                    message={modalInfo.message}
                />
            )}
            <div className={'login-fields'}>
                <InputField
                    name={'email'}
                    placeholder={'Ingresa tu correo electrónico'}
                    type={'email'}
                    value={email}
                    onChange={onInputChange}
                    errorConditions={handleErrorMail}
                />
                <InputField
                    placeholder={'Ingresa tu contraseña'}
                    name={'password'}
                    type={'password'}
                    value={password}
                    onChange={onInputChange}
                    errorConditions={handleErrorEmpty}
                />
                <button
                    className={'primaryButton'}
                    onClick={() => handleAuthLogin(email, password)}
                    disabled={isLoading} // Deshabilita el botón si está cargando
                >
                    {isLoading ? 'Accediendo...' : 'Acceder'}
                </button>
            </div>
            <div className="auth-anchors">
                <Anchor
                    onLinkClick={() => navigateToAuth('register')}
                    text={'¿Eres nuevo por aquí?'}
                    linkText={'Regístrate en segundos.'}
                />
                <Anchor
                    onLinkClick={handleAuthInvited}
                    text={"¿Estás de chismoso?"}
                    linkText={"Ingresa como Invitado"}
                />
            </div>
        </>
    );
};


//Register Fields
export const AuthRegisterInputFields = () => {
    const { form, onInputChange } = useForm({
        email: '',
        password: '',
        username: '',
        confirmPassword: '',
        careerSelect: '',
    })
    const { email, password, username, confirmPassword, careerSelect } = form;
    const formFields: InputFieldProps[] = [
        {
            name: 'username',
            placeholder: 'Ingresa un nombre',
            value: username,
            onChange: onInputChange,
            errorConditions: handleErrorEmpty,
        },
        {
            placeholder: 'Ingresa tu correo electrónico',
            name: 'email',
            value: email,
            type: 'email',
            onChange: onInputChange,
            errorConditions: handleErrorMail,
        },
        {
            placeholder: 'Ingresa una contraseña',
            name: 'password',
            value: password,
            type: 'password',
            onChange: onInputChange,
            errorConditions: handleErrorEmpty,
        },
        {
            placeholder: 'Confirme su contraseña',
            name: 'confirmPassword',
            value: confirmPassword,
            type: 'password',
            onChange: onInputChange,
            errorConditions: handleErrorEmpty,
        }
    ]

    const { careers } = useAppContext();
    const {
        navigateToAuth,
        handleAuthRegister,
        handleAuthInvited,
        modalInfo, isLoading,
        modalState,
        hideModal
    } = useAuthAction();



    return (
        <>
            {modalState && (
                <ModalMessage
                    onClose={hideModal}
                    title={modalInfo.title}
                    message={modalInfo.message}
                />
            )}
            <div className={'login-fields'}>
                <SelectField
                    title={"Seleccionar carrera"}
                    value={careerSelect}
                    name={'careerSelect'}
                    onChange={onInputChange}
                    options={careers}
                />
                <FormFields fields={formFields} />
                <button
                    onClick={() =>
                        handleAuthRegister(email, password, username, confirmPassword, careerSelect)}
                    className={'primaryButton'}
                    disabled={isLoading} // Deshabilita el botón si está cargando
                >
                    {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
                </button>
            </div>
            <div className="auth-anchors">
                <Anchor
                    onLinkClick={() => navigateToAuth('')}
                    text={'¿Ya tienes cuenta?'}
                    linkText={'Inicia sesión'}
                />
                <Anchor
                    onLinkClick={handleAuthInvited}
                    text={"¿Estás de chismoso?"}
                    linkText={"Ingresa como Invitado"}
                />
            </div>
        </>
    );
};