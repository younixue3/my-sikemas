
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { AuthCheckComponent } from "../../Components/Auth/AuthCheckComponent";

export const Login = () => {
    const cookies = new Cookies();
    const navigate = useNavigate();
    let [errorMessage, setErrorMessage] = useState('');

    function contains(arr:any, key:any, val:any) {
        for (var i = 0; i < arr.length; i++) {
          if (arr[i][key] === val) return true;
        }
        return false;
      }

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        let { username, password } = document.forms[0];
        let formGetProfile = new FormData();
        formGetProfile.append('username', 'shs500')
        formGetProfile.append('password', 'Ilkomerz2007*')
        let formData = new FormData();
        formData.append('username', username.value);
        formData.append('password', password.value);
        axios.post('https://api.umkt.ac.id/auth/sso/login', formGetProfile)
        .then((response) => {
            axios.get('https://api.umkt.ac.id/managemen/karyawan/' + username.value, {headers: {'Authorization' : 'Bearer ' + response.data.access}})
            .then((response) => {
                console.log(response.data.rows.user[0].groups)
                if (response.data.rows.jabatan === true && response.data.rows.jabatan.filter((item:any) => item.nama_jabatan === 'Kaprodi')) {
                    cookies.set('kaprodi', true)  
                } else {    
                    cookies.set('kaprodi', false)
                }
                cookies.set('groups', response.data.rows.user[0].groups)
                console.log(response.data.rows.user[0].groups)
                if (contains(response.data.rows.user[0].groups, 'name', 'Dosen Tetap')|| contains(response.data.rows.user[0].groups, 'name', 'Dosen')|| contains(response.data.rows.user[0].groups, 'name', 'Dosen PNS (DPK)')|| contains(response.data.rows.user[0].groups, 'name', 'Dosen Tidak Tetap')|| contains(response.data.rows.user[0].groups, 'name', 'Dosen Tetap Profesi')) {
                    cookies.set('dosen', true)
                } else {
                    cookies.set('dosen', false)
                }
                if (contains(response.data.rows.user[0].groups, 'name', 'DTT Penjabat')|| contains(response.data.rows.user[0].groups, 'name', 'Tendik')|| contains(response.data.rows.user[0].groups, 'name', 'Tendik Tetap')) {
                    cookies.set('pegawai', true)
                } else {
                    cookies.set('pegawai', false)
                }
                
                
                if (response.data.message) {
                    axios.post('https://api.umkt.ac.id/' + 'auth/sso/login', formData)
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
                        })
                        .catch((e) => {
                            setErrorMessage(e.response.data.pesan);
                            // navigate('/login');
                        });
                }
            })
        })
    };

    const messageError = () => {
        if (errorMessage) {
            return <div className="text-start w-40" style={{ paddingRight: '20px' }}>
                <div className={'w-100 height-400 bg-danger bg-gradient p-4'} style={{
                    borderRadius: '1rem'
                }}>
                    <h2 className={'h-25'} style={{ color: 'white' }}>Login</h2>
                    <div className={'h-75'}>
                        <div style={{ color: 'white', fontSize: '20px', marginTop: '-10px' }}>
                            {errorMessage}
                        </div>
                    </div>
                </div>
            </div>
        } else {
            return <div className="text-start w-40" style={{ paddingRight: '20px' }}>
                <div className={'w-100 height-400 bg-primary bg-gradient p-4'} style={{
                    borderRadius: '1rem'
                }}>
                    <h2 className={'h-25'} style={{ color: 'white' }}>Login</h2>
                    <div className={'h-75'}>
                        <div style={{ color: 'white', fontSize: '13px' }}>
                            Welcome to
                        </div>
                        <div style={{ color: 'white', fontSize: '20px', marginTop: '-10px' }}>
                            Admin Sikemas
                        </div>
                    </div>
                </div>
            </div>
        }
    };

    return (
        <>
            <div className="d-flex" style={{
                height: '100vh'
            }}>
                <div className="row m-auto w-100 justify-content-center">
                    <div className="col-xl-6 col-lg-5 col-md-7 mx-auto">
                        <div className="card z-index-0 p-xl-3 p-lg-2 p-md-2">
                            <div className={'card-body d-flex p-xl-3 p-lg-2 p-md-2'}>
                                {messageError()}
                                <div className='w-60 m-auto'>
                                    <form onSubmit={handleSubmit}>
                                        <input type="text" name="username" className="form-control"
                                            placeholder="Masukkan username ..." />
                                        <br />
                                        <input type="password" name="password" className="form-control"
                                            placeholder="Masukkan password ..." />
                                        <br />
                                        <button type="submit" className="btn bg-gradient-dark w-100 my-4 mb-2">Submit
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};