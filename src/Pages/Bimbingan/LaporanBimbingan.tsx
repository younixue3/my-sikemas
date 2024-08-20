import axios from "axios";
import {FaDatabase, FaUser, FaTimes, FaSearch} from "react-icons/fa";
import {useEffect, useState} from "react";
import {Cookies} from "react-cookie";

export const LaporanBimbingan = () => {
    const cookies = new Cookies();
    let [bimbingan, setBimbingan] = useState<Array<any>>([]);

    let [loading, setLoading] = useState({isLoading: false});

    function Set_loading(order: any) {
        setLoading(() => ({
            'isLoading': order
        }))
    }

    function Get_mahasiswa(username: any = 0) {
        useEffect(() => {
            Set_loading(false)
            console.log(loading)
            axios.get(process.env.REACT_APP_BIMBINGAN_URL + '/bimbingan/bimbingan_pa/list_laporan/')
                .then(response => {
                    setBimbingan(response.data)
                    console.log(response.data)
                })
                .catch(e => {
                    console.log(e)
                })
                .finally(() => {
                    console.log('Success')
                    Set_loading(true)
                });
        }, [])
    }

    if (cookies.get('dosen') != 'true') {
        Get_mahasiswa()
    }

    const [formData, setFormdata] = useState({nim: 0});

    function Search_mahasiswa(e: any = 0) {
        setFormdata((prevstate: any) => ({
            ...prevstate,
            [e.target.name]: e.target.value
        }))
    }

    let [chart, setResultChart] = useState([])

    function Result_search() {
        Set_loading(false)
        if (cookies.get('dosen') == 'true') {
            axios.get(process.env.REACT_APP_BIMBINGAN_URL + '/bimbingan/bimbingan_pa/' + formData.nim + '/detail_laporan/')
                .then(response => {
                    setBimbingan(response.data)
                    console.log(response.data)
                })
                .catch(e => {
                    console.log(e)
                })
                .finally(() => {
                    console.log('Success')
                    Set_loading(true)
                });
        } else {
            if (!formData.nim) {
                Set_loading(false)
                console.log(loading)
                axios.get(process.env.REACT_APP_BIMBINGAN_URL + '/bimbingan/bimbingan_pa/list_laporan/')
                    .then(response => {
                        setBimbingan(response.data)
                        console.log(response.data)
                    })
                    .catch(e => {
                        console.log(e)
                    })
                    .finally(() => {
                        console.log('Success')
                        Set_loading(true)
                    });
            } else {
                axios.get(process.env.REACT_APP_BIMBINGAN_URL + '/bimbingan/bimbingan_pa/' + formData.nim + '/detail_laporan/')
                    .then(response => {
                        setBimbingan(response.data)
                        console.log(response.data)
                    })
                    .catch(e => {
                        console.log(e)
                    })
                    .finally(() => {
                        console.log('Success')
                        Set_loading(true)
                    });
            }
        }
    }

    return (
        <>
            <div className="container-fluid h-100">
                <div className="row">
                    <div className="w-30">
                        <div className="input-group">
                            <input onChange={Search_mahasiswa} className="form-control h-100 rounded"
                                   name="nim" id="choices-button" placeholder="NIM"/>
                            <button onClick={Result_search} className="btn btn-success mx-2 p-2 text-lg rounded">
                                <FaSearch/></button>
                        </div>
                    </div>
                </div>
                <div className="row pt-4">
                    <div className="card">
                        <table className="table table-flush" id="datatable-search">
                            <thead className="thead-light">
                            <tr>
                                <th>Nim</th>
                                <th className="text-center">Mahasiswa</th>
                                <th className="text-center">#</th>
                            </tr>
                            </thead>
                            <tbody>
                            {loading.isLoading ?
                                <>
                                    {bimbingan.map((item, id) => {
                                        return (
                                            <LaporanList item={item} key={id}></LaporanList>
                                        )
                                    })}
                                </>
                                :
                                <>
                                    {cookies.get('dosen') == 'true' ?
                                        <>
                                            <div className="p-3 font-weight-bold">
                                                <i>
                                                    *Masukkan NIM pada kolom search di atas*
                                                </i>
                                            </div>
                                        </>
                                        :
                                        <>
                                            <tr className="loading-skeleton">
                                                <td className="text-sm font-weight-normal">
                                                    <label>skeleton</label>
                                                </td>
                                                <td>
                                                    <label>skeleton</label>
                                                </td>
                                                <td className="d-flex gap-2">
                                                    <button type="button"
                                                            className="btn btn-primary btn-xs text-sm">
                                                        <FaDatabase/>
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr className="loading-skeleton">
                                                <td className="text-sm font-weight-normal">
                                                    <label>skeleton</label>
                                                </td>
                                                <td>
                                                    <label>skeleton</label>
                                                </td>
                                                <td className="d-flex gap-2">
                                                    <button type="button"
                                                            className="btn btn-primary btn-xs text-sm">
                                                        <FaDatabase/>
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr className="loading-skeleton">
                                                <td className="text-sm font-weight-normal">
                                                    <label>skeleton</label>
                                                </td>
                                                <td>
                                                    <label>skeleton</label>
                                                </td>
                                                <td className="d-flex gap-2">
                                                    <button type="button"
                                                            className="btn btn-primary btn-xs text-sm">
                                                        <FaDatabase/>
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr className="loading-skeleton">
                                                <td className="text-sm font-weight-normal">
                                                    <label>skeleton</label>
                                                </td>
                                                <td>
                                                    <label>skeleton</label>
                                                </td>
                                                <td className="d-flex gap-2">
                                                    <button type="button"
                                                            className="btn btn-primary btn-xs text-sm">
                                                        <FaDatabase/>
                                                    </button>
                                                </td>
                                            </tr>
                                        </>}
                                </>
                            }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )

    function LaporanList(item: any) {
        const id: any = item.item.id
        const name: any = item.item.name

        const [formData, setFormdata] = useState<any>({user: cookies.get('username')});
        let [loading, setLoading] = useState({isLoading: false});

        function Set_loading(order: any) {
            setLoading(() => ({
                'isLoading': order
            }))
        }

        let [profile, setProfile] = useState({
            fotoContentUrl: '',
            nama: '',
            idMahasiswa: '',
            prodi: {nama: ''},
            tempatLahir: '',
            tanggalLahir: '',
            negara: {nama: ''},
            kodeGender: '',
            golDarah: '',
            alamat: '',
            rt: '',
            rw: '',
            kelurahan: '',
            kota: '',
            kodePos: '',
            telepon: '',
            asalSekolah: '',
            alamatAsalSekolah: '',
            tahunLulus: '',
            namaAyah: '',
            alamatAyah: '',
            kotaAyah: '',
            ponselAyah: '',
            pekerjaanAyah: {nama: ''},
            pendidikanAyah: {nama: ''},
            namaIbu: '',
            alamatIbu: '',
            kotaIbu: '',
            ponselIbu: '',
            pekerjaanIbu: {nama: ''},
            pendidikanIbu: {nama: ''},
            namaWali: '',
            alamatWali: '',
            kotaWali: '',
            ponselWali: '',
            pekerjaanWali: {nama: ''},
            pendidikanWali: {nama: ''},


            // sa
        })

        const onChange = (e: any) => {
            setFormdata((prevstate: any) => ({
                ...prevstate,
                [e.target.name]: e.target.value
            }))
        }

        function Detail_laporan(id: any) {
            window.open(process.env.REACT_APP_BIMBINGAN_URL + '/bimbingan/bimbingan_pa/' + id + '/get_laporan/?start=' + formData['start'] + '&end=' + formData['end'] + '&type=' + formData['type'], '_blank', 'noreferrer');
        }

        function Profile_mahasiswa(nim: any) {
            axios.post(process.env.REACT_APP_BASE_URL + "/api/profile-mahasiswa/", {
                nim: nim
            })
                .then(resp => {
                    setProfile(resp.data)
                })
                .catch(e => {
                    console.log(e)
                })
                .finally(() => {
                    document.getElementById('Modal' + id)?.classList.remove('loading-skeleton')
                })
        }

        return (
            <>
                <tr>
                    <td className="text-sm font-weight-normal">
                        {id}
                    </td>
                    <td>
                        {name}
                    </td>
                    <td className="d-flex gap-2">
                        <button type="button"
                                className="btn btn-xs text-sm bg-gradient-primary"
                                data-bs-toggle="modal" title="Laporan"
                                data-bs-target={'#exampleModal' + id}>
                            <FaDatabase/>
                        </button>
                        {cookies.get('dosen') === 'true' ?
                            <>
                                <button onClick={() => Profile_mahasiswa(id)} type="button"
                                        className="btn btn-xs text-sm bg-gradient-primary"
                                        data-bs-toggle="modal" title="Laporan"
                                        data-bs-target='#profileModal'>
                                    <FaUser/>
                                </button>
                                <div className="modal fade" style={{zIndex: 9999999}} id='profileModal'
                                     role="dialog"
                                     aria-hidden="true">
                                    <div className="modal-dialog modal-lg z-3 modal-dialog-centered"
                                         role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <button type="button" className="btn btn-close text-dark"
                                                        data-bs-dismiss="modal"
                                                        aria-label="Close">
                                                    <FaTimes/>
                                                </button>
                                            </div>
                                            <div id={"Modal" + id} className="modal-body loading-skeleton">
                                                <div className="row">
                                                    <div className="col-3">
                                                        <img className="w-100" src={profile.fotoContentUrl}></img>
                                                    </div>
                                                    <div className="col-9">
                                                        <div className="card p-3 border">
                                                            <div>
                                                                <h5>A. Mahasiswa</h5>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-3 font-weigth-bold">Nama Lengkap
                                                                </div>
                                                                <div className="col-1 font-weight-bold">:</div>
                                                                <label className="col">{profile.nama}</label>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-3 font-weigth-bold">NIM</div>
                                                                <div className="col-1 font-weight-bold">:</div>
                                                                <label className="col">{profile.idMahasiswa}</label>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-3 font-weigth-bold">Prodi</div>
                                                                <div className="col-1 font-weight-bold">:</div>
                                                                <label className="col">{profile.prodi.nama}</label>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-3 font-weigth-bold">Tempat, Tanggal
                                                                    Lahir
                                                                </div>
                                                                <div className="col-1 font-weight-bold">:</div>
                                                                <label
                                                                    className="col">{profile.tempatLahir}, {profile.tanggalLahir}</label>
                                                            </div>
                                                            <div className="row">
                                                                <div
                                                                    className="col-3 font-weigth-bold">Kewarganegaraan
                                                                </div>
                                                                <div className="col-1 font-weight-bold">:</div>
                                                                <label className="col">{profile.negara.nama}</label>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-3 font-weigth-bold">Jenis Kelamin
                                                                </div>
                                                                <div className="col-1 font-weight-bold">:</div>
                                                                <label className="col">{profile.kodeGender}</label>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-3 font-weigth-bold">Golongan Darah
                                                                </div>
                                                                <div className="col-1 font-weight-bold">:</div>
                                                                <label className="col">{profile.golDarah}</label>
                                                            </div>
                                                            <div className="row mt-3">
                                                                <div className="col-3 font-weigth-bold">Alamat</div>
                                                                <div className="col">
                                                                    <div className="row">
                                                                        <div className="col-2">Jalan</div>
                                                                        <div className="col-1 font-weight-bold">:</div>
                                                                        <label
                                                                            className="col">{profile.alamat}, {profile.kelurahan}, {profile.kota}</label>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col-2">RT</div>
                                                                        <div className="col-1 font-weight-bold">:</div>
                                                                        <label className="col">{profile.rt}</label>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col-2">RW</div>
                                                                        <div className="col-1 font-weight-bold">:</div>
                                                                        <label className="col">{profile.rw}</label>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col-2">Kode Pos</div>
                                                                        <div className="col-1 font-weight-bold">:</div>
                                                                        <label className="col">{profile.kodePos}</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row mt-3">
                                                                <div className="col-3 font-weigth-bold">Pendidikan
                                                                    Terakhir
                                                                </div>
                                                                <div className="col">
                                                                    <div className="row">
                                                                        <div className="col-3 font-weigth-bold">Nama
                                                                            Instansi
                                                                        </div>
                                                                        <div className="col-1 font-weight-bold">:</div>
                                                                        <label
                                                                            className="col">{profile.asalSekolah}</label>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col-3 font-weigth-bold">Alamat
                                                                            Instansi
                                                                        </div>
                                                                        <div className="col-1 font-weight-bold">:</div>
                                                                        <label
                                                                            className="col">{profile.alamatAsalSekolah}</label>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col-3 font-weigth-bold">Tahun
                                                                            Lulus
                                                                        </div>
                                                                        <div className="col-1 font-weight-bold">:</div>
                                                                        <label
                                                                            className="col">{profile.tahunLulus}</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="card mt-4 p-3 border">
                                                            <div>
                                                                <h5>B. Data Wali Mahasiswa</h5>
                                                            </div>
                                                            <div className="my-3">
                                                                <div className="row">
                                                                    <div className="col-3 font-weigth-bold">Nama Ayah
                                                                    </div>
                                                                    <div className="col-1 font-weight-bold">:</div>
                                                                    <label className="col">{profile.namaAyah}</label>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-3 font-weigth-bold">Pekerjaan
                                                                    </div>
                                                                    <div className="col-1 font-weight-bold">:</div>
                                                                    <label
                                                                        className="col">{profile.pekerjaanAyah.nama}</label>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-3 font-weigth-bold">Pendidikan
                                                                    </div>
                                                                    <div className="col-1 font-weight-bold">:</div>
                                                                    <label
                                                                        className="col">{profile.pendidikanAyah.nama}</label>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-3 font-weigth-bold">Alamat</div>
                                                                    <div className="col-1 font-weight-bold">:</div>
                                                                    <label className="col">{profile.alamatAyah}</label>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-3 font-weigth-bold">Ponsel</div>
                                                                    <div className="col-1 font-weight-bold">:</div>
                                                                    <label className="col">{profile.ponselAyah}</label>
                                                                </div>
                                                            </div>
                                                            <div className="my-3">
                                                                <div className="row">
                                                                    <div className="col-3 font-weigth-bold">Nama Ibu
                                                                    </div>
                                                                    <div className="col-1 font-weight-bold">:</div>
                                                                    <label className="col">{profile.namaIbu}</label>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-3 font-weigth-bold">Pekerjaan
                                                                    </div>
                                                                    <div className="col-1 font-weight-bold">:</div>
                                                                    <label
                                                                        className="col">{profile.pekerjaanIbu.nama}</label>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-3 font-weigth-bold">Pendidikan
                                                                    </div>
                                                                    <div className="col-1 font-weight-bold">:</div>
                                                                    <label
                                                                        className="col">{profile.pendidikanIbu.nama}</label>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-3 font-weigth-bold">Alamat</div>
                                                                    <div className="col-1 font-weight-bold">:</div>
                                                                    <label className="col">{profile.alamatIbu}</label>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-3 font-weigth-bold">Ponsel</div>
                                                                    <div className="col-1 font-weight-bold">:</div>
                                                                    <label className="col">{profile.ponselIbu}</label>
                                                                </div>
                                                            </div>
                                                            {profile.namaWali != '' ?
                                                                <>
                                                                    <div className="my-3">
                                                                        <div className="row">
                                                                            <div className="col-3 font-weigth-bold">Nama
                                                                                Wali
                                                                            </div>
                                                                            <div className="col-1 font-weight-bold">:
                                                                            </div>
                                                                            <label
                                                                                className="col">{profile.namaWali}</label>
                                                                        </div>
                                                                        <div className="row">
                                                                            <div
                                                                                className="col-3 font-weigth-bold">Pekerjaan
                                                                            </div>
                                                                            <div className="col-1 font-weight-bold">:
                                                                            </div>
                                                                            <label
                                                                                className="col">{profile.pekerjaanWali.nama}</label>
                                                                        </div>
                                                                        <div className="row">
                                                                            <div
                                                                                className="col-3 font-weigth-bold">Pendidikan
                                                                            </div>
                                                                            <div className="col-1 font-weight-bold">:
                                                                            </div>
                                                                            <label
                                                                                className="col">{profile.pendidikanWali.nama}</label>
                                                                        </div>
                                                                        <div className="row">
                                                                            <div
                                                                                className="col-3 font-weigth-bold">Alamat
                                                                            </div>
                                                                            <div className="col-1 font-weight-bold">:
                                                                            </div>
                                                                            <label
                                                                                className="col">{profile.alamatWali}</label>
                                                                        </div>
                                                                        <div className="row">
                                                                            <div
                                                                                className="col-3 font-weigth-bold">Ponsel
                                                                            </div>
                                                                            <div className="col-1 font-weight-bold">:
                                                                            </div>
                                                                            <label
                                                                                className="col">{profile.ponselWali}</label>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                                :
                                                                <></>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </> : <></>}


                        <div className="modal fade" id={'exampleModal' + id}
                             role="dialog" aria-labelledby="exampleModalLabel"
                             aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered"
                                 role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <button type="button" className="btn btn-close text-dark"
                                                data-bs-dismiss="modal"
                                                aria-label="Close">
                                            <FaTimes/>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <div id="form_cari">
                                            {/* {% csrf_token %} */}
                                            <div>
                                                <label>Tanggal Mulai</label>
                                                <input onInput={onChange} className="form-control datepicker"
                                                       type="date"
                                                       name="start"></input>
                                            </div>
                                            <div>
                                                <label>Tanggal Mulai</label>
                                                <input onInput={onChange} className="form-control datepicker"
                                                       type="date"
                                                       name="end"></input>
                                            </div>
                                            <div className="mt-2">
                                                <div>
                                                    <label>Tipe Laporan</label>
                                                </div>
                                                <div>
                                                    <input onInput={onChange} name="type" type="radio"
                                                           value="1"></input>
                                                    Akademis
                                                </div>
                                                <div>
                                                    <input onInput={onChange} name="type" type="radio"
                                                           value="2"></input>
                                                    Non Akademis
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button onClick={() => Detail_laporan(id)}
                                                className="btn bg-gradient-primary">
                                            Set Filter
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>

            </>
        )
    }
}