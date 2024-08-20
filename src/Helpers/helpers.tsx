import axios from "axios";
import { Cookies } from "react-cookie";
import { AuthCheckComponent } from "../Components/Auth/AuthCheckComponent";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// AUTHENTICATION

export const get_civitas_token = () => {
    let formData = new FormData();
    formData.append('username', 'Haris');
    formData.append('password', 'Haris');
    formData.append('grant_type', 'password');
    formData.append('client_id', 'web');

    axios.post('https://apiumkt.civitas.id/access_token', formData)
        .then(response => {
            console.log(response)
            return response
        })
}

export const validateDosen = (formData: any, username: string) => {
    axios.get('https://sihrd.umkt.ac.id/umar/v3/profil/', { params: { uniid: username } })
        .then(() => {
            loginAuth(formData)
        })
        .catch(e => {
            console.log(e)
        })
}

export const loginAuth = (formData: any) => {

    const cookies = new Cookies();
    const navigate = useNavigate();
    let [errorMessage, setErrorMessage] = useState('');
    console.log(errorMessage)

    axios.post('https://api.umkt.ac.id/' + 'auth/sso/login', formData)
        .then(response => {
            console.log(response.data)
            cookies.set('token', response.data.access);
            cookies.set('refresh', response.data.refresh);
            cookies.set('username', formData['username']);

            if (AuthCheckComponent() === 0) {
                navigate('/login');
            } else {
                navigate('/');
            }

        })
        .catch((e) => {
            setErrorMessage(e.response.data.pesan);
        });
}