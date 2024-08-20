import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState} from "react";

export const Organisasi = () => {
    let [organisasis, setOrganisasi] = useState<Array<any>>([]);

    const [formData, setFormdata] = useState<any>({kantaya: true});
    const onChange = (e:any) => {
        setFormdata((prevstate:any) => ({
            ...prevstate,
            [e.target.name]: e.target.value
        }))
    }
    let [mahasiswa, setMahasiswa] = useState<Array<any>>([]);
    function Get_mahasiswa() {
        useEffect(() => {
            axios.get(process.env.REACT_APP_BASE_URL + '/api/users/')
                .then(response => {
                    setMahasiswa(response.data)
                })
                .catch(e => {
                    console.log(e)
                })
                .finally(() => {
                    console.log('Success')
                });
        }, [])
    }
    const navigate = useNavigate()
    const insert_organisasi = () => {
        axios.post(process.env.REACT_APP_BASE_URL + '/ormawa/kantaya-organisasi-ormawa/insertOrganisasi/', formData)
            .then(() => {
                
                Get_organisasi()
            })
            .catch(e => {
                console.log(e)
            })
            .finally(() => {
                navigate(0)
            })
    }

    Get_organisasi()
    Get_mahasiswa()
    function Get_organisasi() {
        useEffect(() => {
            axios.get(process.env.REACT_APP_BASE_URL + '/ormawa/organisasi-ormawa/')
                .then(response => {
                    setOrganisasi(response.data.results)
                })
                .catch(e => {
                    console.log(e)
                })
                .finally(() => {
                    console.log('Success')
                });
        }, [])
    }

    return (
        <>
            <div className={'card p-1 pt-3'}>
                <div className={''}>
                    <div className="px-3">
                        <button className="nav-link btn btn-icon btn-3 rounded-pill btn-success d-flex" data-bs-toggle="modal"
                                data-bs-target="#modalNewOrganisasi" type="button">
                            <span className="btn-inner--icon d-flex m-auto me-2"><i
                                className="m-auto ni ni-fat-add"></i></span>
                            <span className="btn-inner--text">Tambah Organisasi</span>
                        </button>
                        <div className="modal fade" id="modalNewOrganisasi"  role="dialog" aria-labelledby="modalNewOrganisasi"
                            aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Tambah Organisasi</h5>
                                    </div>
                                    <div className="modal-body">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <label >Nama Organisasi</label>
                                                    <input type="text" className="form-control" name="nama_organisasi" id="Nama Organisasi" onChange={onChange}></input>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <label>Ketua Organisasi</label>
                                                    <select className="form-control" name="ketua_organisasi" onChange={onChange}>
                                                        {mahasiswa.map((item) => {
                                                            return (
                                                                <option value={item.id}>{item.username} - {item.first_name} {item.last_name}</option>
                                                            )
                                                        })}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="form-group">
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="form-group">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="submit" onClick={() => insert_organisasi()} className="btn btn-primary">Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-flush" id="datatable-search">
                            <thead className="thead-light">
                                <tr>
                                    <th>No</th>
                                    <th>Nama</th>
                                    <th className="text-center">Ketua Organisasi</th>
                                    <th className="text-center">SK Kepengurusan</th>
                                    <th className="text-center">Program Kerja</th>
                                    <th className="text-center">Kegiatan</th>
                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {organisasis ?
                                organisasis.map((item, id) => {
                                    return (
                                        <Report item={item} key={id} />
                                    )
                                })
                                :
                            <></>
                            }
                            </tbody>
                        </table>
                    </div >
                </div >
            </div >
        </>
    );

    function Report(item: any) {
        const id: any = item.item.id
        const nama: any = item.item.nama
        if (item.item.anggota[0]){
            const nama_ketua: any = item.item.anggota[0].first_name + " " + item.item.anggota[0].last_name
        }

        const sk_kepengurusan: any = item.item.file_sk_kepengurusan[0] ? item.item.file_sk_kepengurusan[0] : null
        const proker: any = item.item.file_proker[0] ? item.item.file_proker[0] : null

        return (
            <>
                <tr>
                    <td className="text-sm font-weight-normal">{id}</td>
                    <td className="text-sm font-weight-normal">
                        {nama}
                    </td>
                    <td className="text-sm font-weight-normal">
                        {/*{nama_ketua}*/}
                    </td>
                    <td>
                        {sk_kepengurusan ? <ButtonValidasi getorg={Get_organisasi} file={sk_kepengurusan} type="sk" url_validasi={"/ormawa/kantaya-organisasi-ormawa/"+sk_kepengurusan.id+"/updateFile/"} /> : ''}
                    </td>
                    <td>
                        {sk_kepengurusan ? <ButtonValidasi getorg={Get_organisasi} file={proker} type="proker" url_validasi={"/ormawa/kantaya-organisasi-ormawa/"+proker.id+"/updateFile/"} /> : ''}
                    </td>
                    <td>
                        <Link className="text-primary"
                            to={'/organisasi/'+id+'/kegiatan'}>Kegiatan</Link>
                    </td>
                    <td>
                        <ButtonModalForm data={item.item} url={"/ormawa/kantaya-organisasi-ormawa/"+ id +"/updateOrganisasi/"} />
                    </td>
                </tr>

            </>
        )
    }

    function ButtonValidasi(file: any) {
        const [formData, setFormdata] = useState<any>({file: file.type});
        const onChange = (e:any) => {
            setFormdata((prevstate:any) => ({
                ...prevstate,
                [e.target.id]: e.target.value
            }))
        }
        const navigate = useNavigate()
        const update_validasi = (url_validasi: string) => {
            axios.put(process.env.REACT_APP_BASE_URL + url_validasi, formData)
                .then(() => {
                    
                })
                .catch(e => {
                    console.log(e)
                })
                .finally(() => {
                    navigate(0)
                })
        }

        return (
            <>
                <div style={{ display: "flex" }}>
                    <button type="button" className={`m-auto btn ${file.file.status_approval == 1 ? "btn-primary" : file.file.status_approval == 2 ? "btn-danger" : "btn-success"}`}
                        data-bs-toggle="modal"
                        data-bs-target={"#modalFile" + file.type + file.file.id}>
                        {file.file.status_approval == 1 ? "Diproses" : file.file.status_approval == 2 ? "Ditolak" : "Diterima"}
                    </button>
                    <div className="modal fade" id={"modalFile" + file.type + file.file.id} 
                        aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div className="modal-body" id="bodyModalFile">
                                <div className="row">
                                        <div className="col-12">
                                            <div className="form-group">
                                                <label>Status</label>
                                                <select className="form-control" id="status" name="status" onChange={onChange}>
                                                    <option>Pilih Validasi</option>
                                                    <option value="3">Setuju</option>
                                                    <option value="2">Tolak</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="form-group">
                                                <label>Ketua Organisasi</label>
                                                <textarea name="pesan" className="form-control" id="pesan" onChange={onChange}></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="form-group">
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button onClick={() => update_validasi(file.url_validasi)} type="submit" className="btn btn-primary">Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="m-auto">
                        <a className="text-sm mx-3 text-primary" target="_blank" href={file.file.file}>Open File</a>
                    </div>
                </div>
            </>
        )
    }

    function ButtonModalForm(data: any) {
        console.log(data)
        const [formData, setFormdata] = useState<any>({nama_organisasi:data.data.nama, ketua_organisasi: data.data.anggota[0] ? data.data.anggota[0].id : '0', kantaya:true});
        const onChange = (e:any) => {
            setFormdata((prevstate:any) => ({
                ...prevstate,
                [e.target.name]: e.target.value
            }))
        }
        let [mahasiswa, setMahasiswa] = useState<Array<any>>([]);
        function Get_mahasiswa() {
            useEffect(() => {
                axios.get(process.env.REACT_APP_BASE_URL + '/api/users/')
                    .then(response => {
                        setMahasiswa(response.data)
                    })
                    .catch(e => {
                        console.log(e)
                    })
                    .finally(() => {
                        console.log('Success')
                    });
            }, [])
        }
        Get_mahasiswa()
        const navigate = useNavigate()
        const update_organisasi = (url: string) => {
            axios.put(process.env.REACT_APP_BASE_URL + url, formData)
                .then(() => {
                    
                })
                .catch(e => {
                    console.log(e)
                })
                .finally(() => {
                    navigate(0)
                })
        }

        console.log(data)
        return (
            <>
                <button type="button"
                    className="btn btn-success btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target={'#ModalFormOrg' + data.data.id}
                >
                    <i className="fa-solid fa-plus"></i>
                    Edit
                </button>
                <div className="modal fade" id={"ModalFormOrg"+data.data.id}  role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content" id="modal">
                            <div className="modal-header">
                                <h5 className="modal-title">Detail Organisasi</h5>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group">
                                            <label>Nama Organisasi</label>
                                            <input type="text" className="form-control" name="nama_organisasi" id="Nama Organisasi" onChange={onChange} value={data.data.nama}></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group">
                                            <label>Ketua Organisasi</label>
                                            <select className="form-control" name="ketua_organisasi" onChange={onChange}>
                                            {mahasiswa.map((item) => {
                                                return (
                                                    <option selected={item.id === formData.ketua_organisasi ? true : false} value={item.id}>{item.username} - {item.first_name} {item.last_name}</option>
                                                    // <></>
                                                )
                                            })}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="form-group">
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button onClick={() => update_organisasi(data.url)} type="submit" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
};