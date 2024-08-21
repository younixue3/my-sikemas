import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
// import { ExportCSV } from "../../Components/Export/ExportToCSV";
import { BarChartComponent } from "../../Components/Chart/BarChartComponent";

export const Prestasi = () => {
    let [prestasi, setPrestasi] = useState([]);
    let [resultPrestasi, setResultPrestasi] = useState([]);
    // let [chart, setResultChart] = useState({})
    // setResultChart({
    //     datasets: [
    //       {
    //         label: 'Dataset 1',
    //         data: [0],
    //         backgroundColor: 'rgba(255, 99, 132, 0.5)',
    //       },
    //       {
    //         label: 'Dataset 2',
    //         data: [0],
    //         backgroundColor: 'rgba(53, 162, 235, 0.5)',
    //       },
    //     ],
    //   })
    // let [prodi, setProdi] = useState([]);
    const prodiData : any = [{
        "idFakultas": "01",
        "perguruanTinggi": {
            "idPerguruanTinggi": "111024",
            "yayasan": {
                "idYayasan": "1111024",
                "nama": "YAYASAN PP MUHAMMADIYAH"
            },
            "nama": "Universitas Muhammadiyah Kalimantan Timur",
            "nama2": "",
            "kota": "Samarinda"
        },
        "nama": "Sains dan Teknologi",
        "nama2": "Science and Technology",
        "nipPimpinan": "0610116204",
        "namaPimpinan": "Prof. Ir. Sarjito, M.T., Ph.D., IPM.",
        "alamat": "-",
        "namaPudek": "",
        "nipPudek": ""
    },
    {
        "idFakultas": "02",
        "perguruanTinggi": {
            "idPerguruanTinggi": "111024",
            "yayasan": {
                "idYayasan": "1111024",
                "nama": "YAYASAN PP MUHAMMADIYAH"
            },
            "nama": "Universitas Muhammadiyah Kalimantan Timur",
            "nama2": "",
            "kota": "Samarinda"
        },
        "nama": "Kesehatan Masyarakat",
        "nama2": "Public Health",
        "nipPimpinan": "1114077102",
        "namaPimpinan": "Ghozali M.H., M.Kes., Ph.D.",
        "alamat": "-",
        "namaPudek": "",
        "nipPudek": ""
    },
    {
        "idFakultas": "03",
        "perguruanTinggi": {
            "idPerguruanTinggi": "111024",
            "yayasan": {
                "idYayasan": "1111024",
                "nama": "YAYASAN PP MUHAMMADIYAH"
            },
            "nama": "Universitas Muhammadiyah Kalimantan Timur",
            "nama2": "",
            "kota": "Samarinda"
        },
        "nama": "Keguruan dan Ilmu Pendidikan",
        "nama2": "Teacher Training and Education",
        "nipPimpinan": "0027025101",
        "namaPimpinan": "Prof. Ali Saukah, M.A., Ph.D",
        "alamat": "-",
        "namaPudek": "",
        "nipPudek": ""
    },
    {
        "idFakultas": "04",
        "perguruanTinggi": {
            "idPerguruanTinggi": "111024",
            "yayasan": {
                "idYayasan": "1111024",
                "nama": "YAYASAN PP MUHAMMADIYAH"
            },
            "nama": "Universitas Muhammadiyah Kalimantan Timur",
            "nama2": "",
            "kota": "Samarinda"
        },
        "nama": "Ekonomi Bisnis dan Politik",
        "nama2": "Economics Business and Politics",
        "nipPimpinan": "0604075802",
        "namaPimpinan": "Prof. Dr. H. Muhammad Wahyuddin, M.S.",
        "alamat": "-",
        "namaPudek": "",
        "nipPudek": ""
    },
    {
        "idFakultas": "05",
        "perguruanTinggi": {
            "idPerguruanTinggi": "111024",
            "yayasan": {
                "idYayasan": "1111024",
                "nama": "YAYASAN PP MUHAMMADIYAH"
            },
            "nama": "Universitas Muhammadiyah Kalimantan Timur",
            "nama2": "",
            "kota": "Samarinda"
        },
        "nama": "Hukum",
        "nama2": "Law",
        "nipPimpinan": "0001016801",
        "namaPimpinan": "Prof. Dr. Aidul Fitriciada Azhari, S.H., M.Hum",
        "alamat": "-",
        "namaPudek": "",
        "nipPudek": ""
    },
    {
        "idFakultas": "06",
        "perguruanTinggi": {
            "idPerguruanTinggi": "111024",
            "yayasan": {
                "idYayasan": "1111024",
                "nama": "YAYASAN PP MUHAMMADIYAH"
            },
            "nama": "Universitas Muhammadiyah Kalimantan Timur",
            "nama2": "",
            "kota": "Samarinda"
        },
        "nama": "Psikologi",
        "nama2": "Psychology",
        "nipPimpinan": "0601077201",
        "namaPimpinan": "Dr. R. Yudhi Satria R. A., M.Si",
        "alamat": "-",
        "namaPudek": "",
        "nipPudek": ""
    },
    {
        "idFakultas": "07",
        "perguruanTinggi": {
            "idPerguruanTinggi": "111024",
            "yayasan": {
                "idYayasan": "1111024",
                "nama": "YAYASAN PP MUHAMMADIYAH"
            },
            "nama": "Universitas Muhammadiyah Kalimantan Timur",
            "nama2": "",
            "kota": "Samarinda"
        },
        "nama": "Ilmu Keperawatan",
        "nama2": "Nursing Science",
        "nipPimpinan": "8830940017",
        "namaPimpinan": "Dr. Hj. Nunung Herlina, S.Kp., M.Pd",
        "alamat": "-",
        "namaPudek": "",
        "nipPudek": ""
    },
    {
        "idFakultas": "08",
        "perguruanTinggi": {
            "idPerguruanTinggi": "111024",
            "yayasan": {
                "idYayasan": "1111024",
                "nama": "YAYASAN PP MUHAMMADIYAH"
            },
            "nama": "Universitas Muhammadiyah Kalimantan Timur",
            "nama2": "",
            "kota": "Samarinda"
        },
        "nama": "Farmasi",
        "nama2": "Pharmacy",
        "nipPimpinan": "1113059301",
        "namaPimpinan": "Dr. Hasyrul Hamzah, S.Farm., M.Sc.",
        "alamat": "-",
        "namaPudek": "",
        "nipPudek": ""
    },
    {
        "idFakultas": "09",
        "perguruanTinggi": {
            "idPerguruanTinggi": "111024",
            "yayasan": {
                "idYayasan": "1111024",
                "nama": "YAYASAN PP MUHAMMADIYAH"
            },
            "nama": "Universitas Muhammadiyah Kalimantan Timur",
            "nama2": "",
            "kota": "Samarinda"
        },
        "nama": "Pertanian dan Bisnis Digital",
        "nama2": "",
        "nipPimpinan": ".",
        "namaPimpinan": ".",
        "alamat": "Kabupaten Paser",
        "namaPudek": "",
        "nipPudek": ""
    }]

    function Get_prestasi() {
        useEffect(() => {
            axios.post(process.env.REACT_APP_BASE_URL + "/dashboard/jenis-chart-get", formData)
                .then(resp => {
                    setData(resp.data)
                    console.log(resp.data)
                })
                .catch(e => console.log(e))
            axios.get(process.env.REACT_APP_BASE_URL + '/prestasi/kantaya-prestasi-mahasiswa/')
                .then(response => {
                    setPrestasi(response.data)
                    setResultPrestasi(response.data)
                })
                .catch(e => {
                    console.log(e)
                })
                .finally(() => {
                    console.log('Success')
                });
        }, [])
    }

    const [data, setData] = useState([
        {
            label: 'Dataset 1',
            data: [1,3,4,5,6],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Dataset 1',
            data: [1,3,4,5,6],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
    ]);

    const [formData, setFormdata] = useState({'fakultas': 0});
    function Result_search() {
        axios.post(process.env.REACT_APP_BASE_URL + "/dashboard/jenis-chart-get", formData)
                .then(resp => {
                    setData(resp.data)
                    console.log(resp.data)
                })
                .catch(e => console.log(e))
        if (formData.fakultas != 0 && formData.fakultas) {
            setResultPrestasi(
                prestasi.filter((item:any) => {
                    if (item.mahasiswa.some((item:any) => item.fakultas.toUpperCase().includes(formData.fakultas))) {
                        return item.mahasiswa.some((item:any) => item.fakultas.toUpperCase().includes(formData.fakultas))
                    }
                })
            )
        } else {
        setResultPrestasi(prestasi)
        }
    }
    function Search_prestasi(e:any = 0) {
        setFormdata(() => ({
            'fakultas': e.target.value
        }))
    }

    Get_prestasi()

    const getData = (max:number) => {
        let array = [];
        for (let i = 0; i < max; i++) {
            array.push(Math.floor(100 + Math.random() * 900))
        }
        return array
    }

    return (
        <>
            <div className="d-flex gap-3">
            {/* <ExportCSV csvData={prestasi} fileName="rekap-laporan-prestasi" /> */}
            <div className="w-30">
                <div className="input-group">
                    <select onChange={Search_prestasi} className="form-control h-100 rounded-0 rounded-start" name="choices-button" id="choices-button">
                    <option value='0' selected>Semua Fakultas</option>
                    {prodiData.map((item:any, id:any) => {
                        return (
                            <option value={item.idFakultas}>{item.nama}</option>
                            // <div>{item}</div>
                        )
                    })}
                    </select>
                    <button onClick={Result_search} className="btn btn-outline-primary bg-white rounded-0 rounded-end">Filter</button>
                </div>
            </div>
            </div>
            <div>
            <div className="row p-3">
            <div className="col-6 card p-2">
                <BarChartComponent data={data} />
            </div>
            </div>
            </div>
            <div className={'card p-1 pt-3'}>
                <div className={''}>
                    <div className="table-responsive">
                        <table className="table table-flush" id="datatable-search">
                            <thead className="thead-light">
                            <tr>
                                <th>No</th>
                                <th>Mahasiswa</th>
                                <th>Fakultas</th>
                                <th className="text-center">Nama Event</th>
                                <th className="text-center">Jenis Prestasi</th>
                                <th className="text-center">Penyelenggara</th>
                                <th className="text-center">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {resultPrestasi.map((item, id) => {
                                return (
                                    <Prestasi item={item} key={id}/>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );

    function Prestasi(item: any) {
        const id: any = item.item.id
        const nama_event: any = item.item.nama_event
        const mahasiswa: any = item.item.mahasiswa
        const jenis_prestasi: any = item.item.jenis_prestasi
        const type_kejuaraan: any = item.item.type_kejuaraan
        const sk_kepengurusan: any = item.item.penyelenggara

        return (
            <>
                <tr>
                    <td className="text-sm font-weight-normal">{id}</td>
                    <td className="text-sm font-weight-normal">
                        {mahasiswa.map((item: any, id: number) => {
                            return (
                                <div key={id}>{item.nim}</div>
                            )
                        })}
                    </td>
                    <td className="text-sm font-weight-normal">
                        {nama_event}
                    </td>
                    <td>
                        {jenis_prestasi} {type_kejuaraan == null ? type_kejuaraan : ''}
                        {/* {sk_kepengurusan ? <ButtonValidasi getorg={get_organisasi} file={sk_kepengurusan} type="sk" url_validasi={"/ormawa/kantaya-organisasi-ormawa/"+sk_kepengurusan.id+"/updateFile/"} /> : ''} */}
                    </td>
                    <td>
                        {sk_kepengurusan}
                        {/* {sk_kepengurusan ? <ButtonValidasi getorg={get_organisasi} file={proker} type="proker" url_validasi={"/ormawa/kantaya-organisasi-ormawa/"+proker.id+"/updateFile/"} /> : ''} */}
                    </td>
                    <td>
                        {/* <Link className="text-primary"
                            to={'/organisasi/'+id+'/kegiatan'}>Kegiatan</Link> */}
                    </td>
                    <td>
                        <ButtonModalForm data={item.item} url={"prestasi/kantaya-prestasi-mahasiswa/" + id + "/"}/>
                    </td>
                </tr>

            </>
        )
    }


    function ButtonModalForm(data: any) {
        const [formData, setFormdata] = useState<any>({prestasi_id: data.data.id});
        const onChange = (e:any) => {
            setFormdata((prevstate: any) => ({
                ...prevstate,
                [e.target.name]: e.target.value
            }))
        }
        // let [mahasiswa, setMahasiswa] = useState<Array<any>>([]);
        // function get_mahasiswa() {
        //     useEffect(() => {
        //         axios.get(process.env.REACT_APP_BASE_URL + '/api/users/')
        //             .then(response => {
        //                 setMahasiswa(response.data)
        //             })
        //             .catch(e => {
        //                 console.log(e)
        //             })
        //             .finally(() => {
        //                 console.log('Success')
        //             });
        //     }, [])
        // }
        // get_mahasiswa()

        const navigate = useNavigate()

        const update_prestasi = () => {
            axios.post(process.env.REACT_APP_BASE_URL + '/prestasi/kantaya-prestasi-mahasiswa/insertStatusPrestasi/', formData)
                .then(response => {
                    console.log(response)
                })
                .catch(e => {
                    console.log(e)
                })
                .finally(() => {
                    navigate(0)
                })
        }

        // console.log(data.data.jenis_prestasi)
        if (data.data.jenis_prestasi == 'kejuaraan') {
            if (data.data.type_kejuaraan == 'kejuaraan') {
                return (
                    <>
                        <button type="button"
                                className="btn btn-success btn-sm"
                                data-bs-toggle="modal"
                                data-bs-target={'#ModalFormPrestasi' + data.data.id}
                        >
                            <i className="fa-solid fa-plus"></i>
                            Action
                        </button>
                        <div className="modal fade" id={"ModalFormPrestasi" + data.data.id} style={{zIndex: 9999}}
                              role="dialog"
                             aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered modal-xl" role="document">
                                <div className="modal-content" id="modal">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Detail Organisasi</h5>
                                    </div>
                                    <div className="modal-body">
                                        <div className="row">
                                            <div className="col-8 border-end border-2">
                                                <div className="row">
                                                    <div className="col-8 form-group">
                                                        <label>Kegiatan</label>
                                                        <input className="form-control"
                                                               value={data.data.nama_event}></input>
                                                    </div>
                                                    <div className="col-4 form-group">
                                                        <label>Penyelenggara</label>
                                                        <input className="form-control"
                                                               value={data.data.penyelenggara}></input>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-6 form-group">
                                                        <label>Url Kegiatan</label>
                                                        <input className="form-control"
                                                               value={data.data.url_kegiatan}></input>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-6 form-group">
                                                        <label>Lingkup Tingkat</label>
                                                        <input className="form-control"
                                                               value={data.data.lingkup_tingkat}></input>
                                                    </div>
                                                    <div className="col-6 form-group">
                                                        <label>Jumlah Provinsi</label>
                                                        <input className="form-control"
                                                               value={data.data.jumlah_wilayah}></input>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-6 form-group">
                                                        <label>Jumlah PT</label>
                                                        <input className="form-control"
                                                               value={data.data.jumlah_pt}></input>
                                                    </div>
                                                    <div className="col-6 form-group">
                                                        <label>Jenis Kepesertaan</label>
                                                        <input className="form-control"
                                                               value={data.data.tim_individu}></input>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-6 form-group">
                                                        <label>Jumlah Peserta</label>
                                                        <input className="form-control"
                                                               value={data.data.jumlah_peserta}></input>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-12 form-group">
                                                        <label>Capaian Prestasi</label>
                                                        <input className="form-control"
                                                               value={data.data.prestasi_diraih}></input>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-6 form-group">
                                                        <label>Tanggal Mulai</label>
                                                        <input className="form-control"
                                                               value={data.data.tanggal_mulai}></input>
                                                    </div>
                                                    <div className="col-6 form-group">
                                                        <label>Tanggal Selesai</label>
                                                        <input className="form-control"
                                                               value={data.data.tanggal_selesai}></input>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-4">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label >Status</label>
                                                            <select name="status_riwayat" className="form-control" onChange={onChange}>
                                                                <option>Pilih Validasi</option>
                                                                <option value="0">Tahap Validasi</option>
                                                                <option value="2">Ditolak</option>
                                                                <option value="1">Disetujui</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label>Deskripsi</label>
                                                            <input type="text" className="form-control" name="deskripsi" onChange={onChange}
                                                                   id="deskripsi"></input>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-6">
                                                        <button onClick={() => update_prestasi()} type="button"
                                                                className="btn btn-success">
                                                                    Submit
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="row px-2">
                                                    {data.data.riwayat_status.map((item: any, id: number) => {
                                                        return (
                                                            <ValidationSetup data={item} key={id}/>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            } else {
                return (
                    <>
                        <button type="button"
                                className="btn btn-success btn-sm"
                                data-bs-toggle="modal"
                                data-bs-target={'#ModalFormPrestasi' + data.data.id}
                        >
                            <i className="fa-solid fa-plus"></i>
                            Action
                        </button>
                        <div className="modal fade" id={"ModalFormPrestasi" + data.data.id} style={{zIndex: 9999}}
                              role="dialog"
                             aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered modal-xl" role="document">
                                <div className="modal-content" id="modal">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Detail Organisasi</h5>
                                    </div>
                                    <div className="modal-body">
                                        <div className="row">
                                            <div className="col-8 border-end border-2">
                                                <div className="row">
                                                    <div className="col-8 form-group">
                                                        <label>Nama Program</label>
                                                        <input className="form-control"
                                                               value={data.data.nama_event}></input>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-6 form-group">
                                                        <label>Tahun Kegiatan</label>
                                                        <input className="form-control"
                                                               value={data.data.tahun_kegiatan}></input>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-6 form-group">
                                                        <label>Jumlah Peserta</label>
                                                        <input className="form-control"
                                                               value={data.data.jumlah_peserta}></input>
                                                    </div>
                                                    <div className="col-6 form-group">
                                                        <label>Tanggal Mulai</label>
                                                        <input className="form-control"
                                                               value={data.data.tanggal_mulai}></input>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-6 form-group">
                                                        <label>Tanggal Selesai</label>
                                                        <input className="form-control"
                                                               value={data.data.tanggal_selesai}></input>
                                                    </div>
                                                    <div className="col-6 form-group">
                                                        <label>Jenis Kepesertaan</label>
                                                        <input className="form-control"
                                                               value={data.data.tim_individu}></input>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <img className="col-6" src=""/>
                                                </div>
                                            </div>
                                            <div className="col-4">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label >Status</label>
                                                            <select name="status_riwayat" className="form-control" onChange={onChange}>
                                                            <option>Pilih Validasi</option>
                                                                <option value="0">Tahap Validasi</option>
                                                                <option value="2">Ditolak</option>
                                                                <option value="1">Disetujui</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label >Deskripsi</label>
                                                            <input type="text" className="form-control" name="deskripsi" onChange={onChange}
                                                                   id="deskripsi"></input>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-6">
                                                        <button onClick={() => update_prestasi()} type="button"
                                                                className="btn btn-success">
                                                                    Submit
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="row px-2">
                                                    {data.data.riwayat_status.map((item: any, id: number) => {
                                                        return (
                                                            <ValidationSetup data={item} key={id}/>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        } else if (data.data.jenis_prestasi == 'seminar') {
            return (
                <>
                    <button type="button"
                            className="btn btn-success btn-sm"
                            data-bs-toggle="modal"
                            data-bs-target={'#ModalFormPrestasi' + data.data.id}
                    >
                        <i className="fa-solid fa-plus"></i>
                        Action
                    </button>
                    <div className="modal fade" id={"ModalFormPrestasi" + data.data.id} style={{zIndex: 9999}}
                          role="dialog"
                         aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-xl" role="document">
                            <div className="modal-content" id="modal">
                                <div className="modal-header">
                                    <h5 className="modal-title">Detail Organisasi</h5>
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-8 border-end border-2">
                                            <div className="row">
                                                <div className="col-8 form-group">
                                                    <label>Nama Program</label>
                                                    <input className="form-control"
                                                           value={data.data.nama_event}></input>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-6 form-group">
                                                    <label>Tahun Kegiatan</label>
                                                    <input className="form-control"
                                                           value={data.data.url_kegiatan}></input>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-6 form-group">
                                                    <label>Jumlah kegiatan</label>
                                                    <input className="form-control"
                                                           value={data.data.lingkup_tingkat}></input>
                                                </div>
                                                <div className="col-6 form-group">
                                                    <label>Tanggal Mulai</label>
                                                    <input className="form-control"
                                                           value={data.data.nama_event}></input>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-6 form-group">
                                                    <label>Tanggal Selesai</label>
                                                    <input className="form-control"
                                                           value={data.data.nama_event}></input>
                                                </div>
                                                <div className="col-6 form-group">
                                                    <label>Jenis Kepesertaan</label>
                                                    <input className="form-control"
                                                           value={data.data.nama_event}></input>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="form-group">
                                                        <label >Status</label>
                                                        <select name="status_riwayat" className="form-control" onChange={onChange}>
                                                        <option>Pilih Validasi</option>
                                                            <option value="0">Tahap Validasi</option>
                                                            <option value="2">Ditolak</option>
                                                            <option value="1">Disetujui</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="form-group">
                                                        <label >Deskripsi</label>
                                                        <input type="text" className="form-control" name="deskripsi" onChange={onChange}
                                                               id="deskripsi"></input>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                    <div className="col-6">
                                                        <button onClick={() => update_prestasi()} type="button"
                                                                className="btn btn-success">
                                                                    Submit
                                                        </button>
                                                    </div>
                                                </div>
                                            <div className="row px-2">
                                                {data.data.riwayat_status.map((item: any, id: number) => {
                                                    return (
                                                        <ValidationSetup data={item} key={id}/>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
        } else if (data.data.jenis_prestasi == 'organisasi') {
            return (
                <>
                    <button type="button"
                            className="btn btn-success btn-sm"
                            data-bs-toggle="modal"
                            data-bs-target={'#ModalFormPrestasi' + data.data.id}
                    >
                        <i className="fa-solid fa-plus"></i>
                        Action
                    </button>
                    <div className="modal fade" id={"ModalFormPrestasi" + data.data.id} style={{zIndex: 9999}}
                          role="dialog"
                         aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-xl" role="document">
                            <div className="modal-content" id="modal">
                                <div className="modal-header">
                                    <h5 className="modal-title">Detail Organisasi</h5>
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-8 border-end border-2">
                                            <div className="row">
                                                <div className="col-8 form-group">
                                                    <label>Nama Organisasi</label>
                                                    <input className="form-control"
                                                           value={data.data.nama_event}></input>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="form-group">
                                                        <label >Status</label>
                                                        <select name="status_riwayat" className="form-control" onChange={onChange}>
                                                        <option>Pilih Validasi</option>
                                                            <option value="0">Tahap Validasi</option>
                                                            <option value="2">Ditolak</option>
                                                            <option value="1">Disetujui</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="form-group">
                                                        <label >Deskripsi</label>
                                                        <input type="text" className="form-control" name="deskripsi" onChange={onChange}
                                                               id="deskripsi"></input>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                    <div className="col-6">
                                                        <button onClick={() => update_prestasi()} type="button"
                                                                className="btn btn-success">
                                                                    Submit
                                                        </button>
                                                    </div>
                                                </div>
                                            <div className="row px-2">
                                                {data.data.riwayat_status.map((item: any, id: number) => {
                                                    return (
                                                        <ValidationSetup data={item} key={id}/>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
        } else {
            return null
        }

        function ValidationSetup(data: any) {
            return (
                <>
                    <div className="col-12 border-dark border-2 border-start justify-content-start p-0"
                         style={{display: "flex"}}>
                        <div className="m-auto border border-dark"
                             style={{width: "30px", height: "2px"}}></div>
                        <div className="w-100 py-3">
                            <div className="border p-3 border-dark"
                                 style={{borderRadius: "10px"}}>
                                <button type="button"
                                        className={`btn ${data.data.status == 0 ? 'btn-primary' : data.data.status == 2 ? 'btn-danger' : 'btn-success'}`}>
                                    {data.data.riwayat_status == 0 ? 'Tahap Validasi' : data.data.status == 2 ? 'Ditolak' : 'Disetujui'}
                                </button>
                                <div className="text-dark">
                                    {data.data.deskripsi}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
        }
    }
};