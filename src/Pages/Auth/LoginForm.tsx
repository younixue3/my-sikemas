import axios from "axios";
import { Cookies } from "react-cookie";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import { AuthCheckComponent } from "../../Components/Auth/AuthCheckComponent";


export const LoginForm = () => {
    const cookies = new Cookies();
    const navigate = useNavigate();
    let [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        let { username, password } = document.forms[0];

        let formData = new FormData();
        formData.append('username', username.value);
        formData.append('password', password.value);

        axios.post('https://api.umkt.ac.id/auth/sso/login', formData)
            .then(response => {
                console.log(response.data)
                cookies.set('token', response.data.access);
                cookies.set('refresh', response.data.refresh);
                cookies.set('username', username.value);

                if (AuthCheckComponent() === 0) {
                    navigate('/login');
                } else {
                    navigate('/');
                }

            }).catch(() => {
                setErrorMessage('Username atau Password salah');
            });
    };

    return (
        <>
            {errorMessage !== '' ? (
                <div className="text-center">
                    <p className="badge badge-danger text-danger"><b>{errorMessage}</b></p>
                </div>
            ) : ('')
            }

            <form onSubmit={handleSubmit}>
                <input type="text" name="username" className="form-control"
                    placeholder="Masukkan username ..." />
                <br />
                <input type="password" name="password" className="form-control"
                    placeholder="Masukkan password ..." />
                <br />
                <button type="submit" className="btn bg-gradient-dark w-100 my-4 mb-2">Submit</button>
            </form>
        </>
    );
};