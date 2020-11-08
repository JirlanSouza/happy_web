import api from './api';

interface SignInResponse {
    token?: string;
    user?: {
        name: string;
        email: string;
    }
    error?: string
}

interface forgotPasswordDataResponse {
    message: string;
    error: string;
}

export default {
    signIn(email: string, password: string) {
        return api.post<SignInResponse>("/users/signin", { email, password }, {
            headers: {
                "Content-Type": "application/json"
            },
            validateStatus: function (status) {
                return (status >= 200 && status < 300) || status === 401
            },
        })
        .then(response => {

            return response.data as SignInResponse
        }).catch(() => {
            return { error: "Error in sigIn, try again!"} as SignInResponse;
        })
    },

    forgotPassword(email: string) {
        const hostFrontEnd = window.location.origin + "/reset_password"
        return api.post<forgotPasswordDataResponse>("/users/forgot", { email, hostFrontEnd }, {
            headers: {
                "Content-Type": "application/json"
            },
            validateStatus: function (status) {
                return (status >= 200 && status < 300) || status === 406
            },
        })
        .then(response => {
            const dataResponse = response.data as forgotPasswordDataResponse

            if (dataResponse.message) {
                return { message: dataResponse.message, error: null };
            }

            if (dataResponse.error) {
                return {message: null, error: dataResponse.error};
            }

            return { message: null, error: null }
        }).catch(result => {
            return { message: null, error: "Error to send email, try again!" };
        })
    },

    resetPassword(newPassword: string, token: string) {
        return api.put<forgotPasswordDataResponse>(`/users/resete_password/${token}` , { newPassword }, {
            headers: {
                "Content-Type": "application/json"
            },
            validateStatus: function (status) {
                return (status >= 200 && status < 300) || status === 401
            },
        })
        .then(response => {
            const dataResponse = response.data as forgotPasswordDataResponse
            
            if (dataResponse.message) {
                return { message: dataResponse.message, error: null};
            }

            if (dataResponse.error) {
                return { message: null, error: dataResponse.error};
            }

            return { message: null, error: null }
        }).catch(result => {
            return { message: null, error: "Error when resetting password, try again!" }
        })
    }
}