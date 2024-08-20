import axios from "axios";
import { Cookies } from 'react-cookie';


export const AuthCheckComponent = () => {
    const cookies = new Cookies();
    const token = cookies.get('token');
    let is_login = 0;

    if (token) {
        const refresh = cookies.get('refresh');
        if (ExpiredCheck(token) === 1) {
            if (ExpiredCheck(refresh) !== 1) {
                let formData = new FormData();
                formData.append('refresh', refresh);

                axios.post('https://api.umkt.ac.id/auth/sso/refresh', formData)
                    .then(response => {
                        cookies.set('token', response.data.access);
                        is_login = 1;

                    }).catch(err => console.error(err));
            }
        } else {
            is_login = 1;
        }
    }

    return is_login
};

export function ExpiredCheck(token: string) {
    const now = new Date();
    const payload = JSON.parse(atob(token.split(".")[1]));
    let is_expired = 0;

    if (now.getTime().toString().slice(0, -3) > payload.exp) {
        is_expired = 1;
    }

    return is_expired
}

export function BearerToken() {
    const cookies = new Cookies();
    return `Bearer ${cookies.get('token')}`
}
