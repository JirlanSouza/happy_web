import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import TemplateSign from '../components/TemplateSign';
import InputForm from '../components/InputForm';
import RemenberAndFogotLink from '../components/RemenberAndFogotLink';
import ButtonSubmit from '../components/ButtoSbmit';

import isValidEmail from '../utils/IsvalidEmail';
import useAuth from '../contexts/auth';

export default function SignIn() {
    const history = useHistory();
    const { signed, signIn }= useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [viewPassword, setViewPassword] = useState(false);
    const [remenberSignIn, setRemenberSignIn] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [errorSignIn, setErrorSignIn] = useState<string | null>(null);

    useEffect(() => {
            if (isValidEmail(email) && password.length >= 6 ) {
                setIsFilled(true);
                return
            }
            setIsFilled(false);
        },
        [email, password]
    );

    function handleValueEmail(value: string) {
        setEmail(value);
    }

    function handleValuePassword(value: string) {
        setPassword(value);
    }
    
    function handleViewPassword() {
        setViewPassword(true);
    }

    function handleNotViewPassword() {
        setViewPassword(false);
    }

    function handleRemenberSignIn() {
        remenberSignIn ? setRemenberSignIn(false) : setRemenberSignIn(true);
    }

    async function handleSubmit(event: React.MouseEvent) {
        event.preventDefault();
        if (!isFilled) {
            return
        }
        const error = await signIn(email, password, remenberSignIn);

        if (error) {
            setErrorSignIn(error);
        }
    }

    return (
        <div className="signIn">
            <TemplateSign goBack={true}>
                <form>
                    <legend>Fazer Login</legend>

                    { errorSignIn && (
                        <div className="errorWarning">
                            <strong>{errorSignIn}</strong>
                        </div>
                    )}
                    <InputForm
                        type="email"
                        label="Email"
                        value={ email }
                        isFilled={ isFilled }
                        handleOnChanged={ handleValueEmail }
                    />

                    <InputForm
                        type={ viewPassword ? "text" : "password" }
                        typeViewPassword={ true }
                        label="Senha"
                        value={ password }
                        isFilled={ isFilled }
                        handleOnChanged={ handleValuePassword }
                        handleViewPassword={ handleViewPassword }
                        handleNotViewPassword={ handleNotViewPassword }
                    />

                    <RemenberAndFogotLink
                        remenberLabel="Lembrar-me"
                        forgotLabel="Esqucí minha senha"
                        forgotLink="/forgot_password"
                        remenberSignIn={ remenberSignIn }
                        handleRemenberSignIn={ handleRemenberSignIn }
                    />
                    
                    <ButtonSubmit text="Entar" isFilled={isFilled} onClick={ (event: React.MouseEvent) => handleSubmit(event) } />
                </form>
            </TemplateSign>
        </div>
    );
}