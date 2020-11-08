import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import TemplateSign from '../components/TemplateSign';
import InputForm from '../components/InputForm';
import ButtonSubmit from '../components/ButtoSbmit';

import useAuth from '../contexts/auth';

interface resetPasswordParams {
    token: string;
}

export default function ResetPassword() {
    const params = useParams<resetPasswordParams>()
    const history = useHistory();
    const { resetPassword }= useAuth();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [viewPassword, setViewPassword] = useState(false);
    const [viewConfirmPassword, setViewConfirmPassword] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [messageResetPassword, setMessageResetPassword] = useState<string | null>(null);
    const [errorResetPassword, setErrorResetPassword] = useState<string | null>(null);

    useEffect(() => {
            if (password.length >= 6 && password === confirmPassword) {
                setIsFilled(true);
                return
            }
            setIsFilled(false);
        },
        [password, confirmPassword]
    );

    function handleValuePassword(value: string) {
        setPassword(value);
    }

    function handleValueConfirmPassword(value: string) {
        setConfirmPassword(value);
    }
    
    function handleViewPassword() {
        setViewPassword(true);
    }

    function handleNotViewPassword() {
        setViewPassword(false);
    }

    function handleViewConfirmPassword() {
        setViewConfirmPassword(true);
    }

    function handleNotViewConfirmPassword() {
        setViewConfirmPassword(false);
    }

    async function handleSubmit(event: React.MouseEvent) {
        event.preventDefault();
        if (!isFilled) {
            return
        }
        
        const response = await resetPassword(password, params.token);
        if (response.error) {
            setErrorResetPassword(response.error);
        }

        if (response.message) {
            setMessageResetPassword(response.message);
            
            setTimeout(() => {
                history.push("/dashboard")
            }, 1500);
        }
    }

    return (
        <div className="signIn">
            <TemplateSign goBack={true}>
                <form>
                    <legend>Redefinir senha</legend>
                        <div className="explanation">
                            <strong>
                                Escolha uma nova senha para você
                                acessar o dashboard do Happy
                            </strong>
                        </div>

                        { (errorResetPassword || messageResetPassword) && (
                        <div className={ messageResetPassword ? "messageWarning" : "errorWarning" }>
                            <strong>
                                { messageResetPassword ? messageResetPassword : errorResetPassword }
                            </strong>
                        </div>
                    )}
                    <InputForm
                        type={ viewPassword ? "text" : "password" }
                        typeViewPassword={ true }
                        label="Nova Senha"
                        value={ password }
                        isFilled={ isFilled }
                        handleOnChanged={ handleValuePassword }
                        handleViewPassword={ handleViewPassword }
                        handleNotViewPassword={ handleNotViewPassword }
                    />

                    <InputForm
                        type={ viewConfirmPassword ? "text" : "password" }
                        typeViewPassword={ true }
                        label="Repitir a senha"
                        value={ confirmPassword }
                        isFilled={ isFilled }
                        handleOnChanged={ handleValueConfirmPassword }
                        handleViewPassword={ handleViewConfirmPassword }
                        handleNotViewPassword={ handleNotViewConfirmPassword }
                    />
                    
                    <ButtonSubmit text="Savar" isFilled={isFilled} onClick={ (event: React.MouseEvent) => handleSubmit(event) } />
                </form>
            </TemplateSign>
        </div>
    );
}