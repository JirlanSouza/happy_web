import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import TemplateSign from '../components/TemplateSign';
import InputForm from '../components/InputForm';
import ButtonSubmit from '../components/ButtoSbmit';

import isValidEmail from '../utils/IsvalidEmail';
import useAuth from '../contexts/auth';

export default function ForgotPassword() {
    const history = useHistory();
    const { signed, forgotPassword }= useAuth();

    const [email, setEmail] = useState("");
    const [isFilled, setIsFilled] = useState(false);
    const [messageForgotPassword, setMessageForgotPassword] = useState<string | null>(null)
    const [errorForgotPassword, setErrorForgotPassword] = useState<string | null>(null);

    useEffect(() => {
            if (isValidEmail(email) ) {
                setIsFilled(true);
                return
            }
            setIsFilled(false);
        },
        [email]
    );

    function handleValueEmail(value: string) {
        setEmail(value);
    }

    async function handleSubmit(event: React.MouseEvent) {
        event.preventDefault();
        if (!isFilled) {
            return
        }

        const response = await forgotPassword(email);
        if (response.error) {
            setErrorForgotPassword(response.error);
        }

        if (response.message) {
            setMessageForgotPassword(response.message);
        }

        if (signed) {
            history.push("/dashboard")
        }
    }

    return (
        <div className="signIn">
            <TemplateSign goBack={true}>
                <form>
                    <legend>Esqucí a senha</legend>

                    <div className="explanation">
                        <strong>
                            Sua redefinição de senha será enviada
                            para o e-mail cadastrado.
                        </strong>
                    </div>

                    { (errorForgotPassword || messageForgotPassword) && (
                        <div className={ messageForgotPassword ? "messageWarning" : "errorWarning" }>
                            <strong>
                                { messageForgotPassword ? messageForgotPassword : errorForgotPassword }
                            </strong>
                        </div>
                    )}
                    <InputForm
                        type="email"
                        label="E-mail"
                        value={ email }
                        isFilled={ isFilled }
                        handleOnChanged={ handleValueEmail }
                    />
                    
                    <ButtonSubmit text="Enviar" isFilled={isFilled} onClick={ (event: React.MouseEvent) => handleSubmit(event) } />
                </form>
            </TemplateSign>
        </div>
    );
}