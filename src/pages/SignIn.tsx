import React, { useEffect, useState } from 'react';
import TemplateSign from '../components/TemplateSign';
import InputForm from '../components/InputForm';
import RemenberAndFogotLink from '../components/RemenberAndFogotLink';
import ButtonSubmit from '../components/ButtoSbmit';

import isValidEmail from '../utils/IsvalidEmail';

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [viewPassword, setViewPassword] = useState(false);
    const [remenberSignIn, setRemenberSignIn] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

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

    return (
        <div className="signIn">
            <TemplateSign goBack={true}>
                <form>
                    <legend>Fazer Login</legend>

                    <InputForm
                        type="email"
                        label="Email"
                        value={ email }
                        handleOnChanged={ handleValueEmail }
                    />

                    <InputForm
                        type={ viewPassword ? "text" : "password" }
                        typeViewPassword={ true }
                        label="Senha"
                        value={ password }
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
                    
                    <ButtonSubmit text="Entar" isFilled={isFilled} />
                </form>
            </TemplateSign>
        </div>
    );
}