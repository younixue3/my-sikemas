import axios from "axios";
import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

export const Beasiswa = () => {
    let [beasiswa, setBeasiswa] = useState<Array<any>>([]);

    function Get_beasiswa() {
        useEffect(() => {
            axios.get(process.env.REACT_APP_BASE_URL + '/beasiswa/kantaya-beasiswa-mahasiswa/')
                .then(response => {
                    setBeasiswa(response.data)
                })
                .catch(e => {
                    console.log(e)
                })
                .finally(() => {
                    console.log('Success')
                });
        }, [])
    }
    Get_beasiswa()

    return (
        <>
            <div className={'card p-1 pt-3'}>
                <div className={''}>
                    <div className="table-responsive">
                        <table className="table table-flush" id="datatable-search">
                            <thead className="thead-light">
                                <tr>
                                    <th>No</th>
                                    <th>Nama</th>
                                    <th className="text-center">Status</th>
                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {beasiswa.map((item, id) => {
                                    return (
                                        <Beasiswa item={item} key={id} />
                                    )
                                })}
                            </tbody>
                        </table>
                    </div >
                </div >
            </div >
        </>
    );

    function Beasiswa(item: any) {
        
        const id: any = item.item.id
        const nama: any = item.item.mahasiswa.nim
        const status: any = item.item.riwayat_status[item.item.riwayat_status.length > 0 ? item.item.riwayat_status.length - 1 : 0]
        
        const navigate = useNavigate()

        return (
            <>
                <tr>
                    <td className="text-sm font-weight-normal">{id}</td>
                    <td className="text-sm font-weight-normal">
                        {nama}
                    </td>
                    <td>
                        <span className={`rounded-2 p-2 text-white ${status.status == 0 ? "bg-secondary" : status.status == 1 ? "bg-info" : status.status == 2 ? "bg-success" : status.status == 3 ? "bg-danger" : "bg-secondary" }`}>{status.status == 0 ? "Tahap Validasi" : status.status == 1 ? "Proses Seleksi" : status.status == 2 ? "Disetujui" : status.status == 3 ? "Ditolak" : "Selesai" }</span>
                    </td>
                    <td>
                        <button type="button" className="btn btn-primary" data-bs-toggle="modal"
                                data-bs-target={`#modalBeasiswanya${ id }`}>Detail
                        </button>
                        <div className="modal fade" id={`modalBeasiswanya${ id }`} 
                                aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-lg">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                        <button type="button" className="close" data-dismiss="modal"
                                                aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                    <div className="border rounded-2 container">
                                    </div>
                                        <JenisPrestasi item={item.item} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            </>
        )

        function JenisPrestasi(item: any) {
            const [formData, setFormdata] = useState<any>({id_beasiswa: item.item.id, beasiswa_id: item.item.id});
            const onChange = (e:any) => {
                setFormdata((prevstate:any) => ({
                    ...prevstate,
                    [e.target.name]: e.target.value
                }))
            }

            const approval_beasiswa = () => {
                axios.post(process.env.REACT_APP_BASE_URL + "/beasiswa/kantaya-beasiswa-mahasiswa/insertStatusBeasiswa/", formData)
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
    
            const status: any = item.item.riwayat_status[item.item.riwayat_status.length > 0 ? item.item.riwayat_status.length - 1 : 0]
    
            if (item.item.jenis_beasiswa == 'prestasi') {
                return (
                    <>
                        <div className="border rounded-2 container">
                            <div className="row mb-2">
                                <div className="col-12 text-3xl fw-bold">Prestasi</div>
                            </div>
                            <div className="form-group text-start">
                                <label >Nama Event</label>
                                <input id="nama_event" disabled className="form-control"
                                        value={ item.item.prestasi.nama_event }></input>
                            </div>
                            <div className="form-group text-start">
                                <label >Nama Penyelenggara</label>
                                <input id="nama_event" disabled className="form-control"
                                        value={ item.item.prestasi.penyelenggara }></input>
                            </div>
                            <div className="form-group text-start">
                                <label >Url Kegiatan</label>
                                <input id="nama_event" disabled className="form-control"
                                        value={ item.item.prestasi.url_kegiatan }></input>
                            </div>
                            <div className="form-group text-start">
                                <label >Prestasi Diraih</label>
                                <input id="nama_event" disabled className="form-control"
                                        value={ item.item.prestasi.prestasi_diraih }></input>
                            </div>
                            <div className="form-group text-start">
                                <label >File Bukti</label>
                                <a className="btn btn-primary" target="_blank"
                                    href={ item.item.prestasi.bukti }>File
                                    Bukti</a>
                            </div>
                            <div className="form-group text-start">
                                <label >Foto Kegiatan</label>
                                <img className="h-25 w-40 bg-cover"
                                        src={ item.item.prestasi.foto_kegiatan } />
                            </div>
                        </div>
                        <div className="border rounded-2 mt-3">
                            <div className="row">
                                
                            </div>
                        </div>
                        <div className="border rounded-2 p-2 mt-5">
                            <div className="text-lg fw-bold mb-4">Status Beasiswa</div>
                            <form method="post"
                                    id="formBeasiswa{{ item.id }}" className="row">
                                <input type="hidden" name="id_beasiswa"
                                        value="{{ item.id }}"></input>
                                {status.status == 4 ? <span className="rounded-2 p-2 bg-default text-white">Selesai</span> : ''}
                                    <div className="form-group text-start">
                                        <label>Status Beasiswa</label>
                                        <select name="status_riwayat" onChange={onChange} className={`form-control text-white h-50 col-4 text-lg rounded-2 px-1 ${status.status == 0 ? "bg-secondary" : status.status == 1 ? "bg-info" : status.status == 2 ? "bg-success" : "bg-danger" }`}>
                                            <option value="">Pilih</option>
                                                 <option value="1">Proses Seleksi</option>
                                                 <option value="2">Disetujui</option>
                                                 <option value="3">Ditolak</option>
                                                <option value="4">Selesai</option>
                                        </select>
                                    </div>
                                <div className="form-group text-start">
                                    <label>Catatan</label>
                                    <textarea name="catatan" onChange={onChange}
                                                className="w-100 height-100 form-control"
                                                placeholder="Catatan"></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary"
                                                data-dismiss="modal">Close
                                        </button>
                                        <button onClick={() => approval_beasiswa()} 
                                                className="btn btn-primary">Save changes
                                        </button>
                                    </div>
                    </>
                )
            } else if (item.item.jenis_beasiswa == 'kip') {
                return (
                    <>
                        <div className="border rounded-2 container">
                            <div className="row mb-2">
                                <div className="col-12 text-3xl fw-bold">Beasiswa KIP
                                </div>
                            </div>
                            <div className="form-group text-start">
                                <label >Semester</label>
                                <input id="nama_event" disabled className="form-control"
                                        value={ item.item.semester }></input>
                            </div>
                            <div className="form-group text-start">
                                <label >Nominal SPP Tetap</label>
                                <input id="nama_event" disabled className="form-control"
                                        value={item.item.nominal_spp_tetap }></input>
                            </div>
                            <div className="form-group text-start">
                                <label >Nominal SPP Variabel</label>
                                <input id="nama_event" disabled className="form-control"
                                        value={ item.item.nominal_spp_variabel }></input>
                            </div>
                            <div className="form-group text-start">
                                <label >File Pernyataan</label>
                                <a className="btn btn-primary" target="_blank"
                                    href={ item.item.file_pernyataan }>File
                                    Pernyataan</a>
                            </div>
                            <div className="form-group text-start">
                                <label >File Formulir
                                    Pendaftaran</label>
                                <a className="btn btn-primary" target="_blank"
                                    href={ item.item.file_formulir_pendaftaran }>File
                                    Formulir Pendaftaran</a>
                            </div>
                            <div className="form-group text-start">
                                <label >File Surat Pernyataan
                                    Wali</label>
                                <a className="btn btn-primary" target="_blank"
                                    href={ item.item.file_surat_pernyataan_wali }>File
                                    Surat Pernyataan Wali</a>
                            </div>
                            <div className="form-group text-start">
                                <label >File Keanggotaan /
                                    PHK</label>
                                <a className="btn btn-primary" target="_blank"
                                    href={ item.item.file_keanggotaan_phk }>File
                                    Keanggotaan / PHK</a>
                            </div>
                            <div className="form-group text-start">
                                <label >File KTP</label>
                                <a className="btn btn-primary" target="_blank"
                                    href={ item.item.file_ktp }>File
                                    KTP</a>
                            </div>
                            <div className="form-group text-start">
                                <label >Foto Kegiatan</label>
                                <div className="row">
                                {item.item.foto_rumag.map((item: any, id: number) => {
                                    return (
                                        <FotoRumah file={item} key={id} />
                                    )
                                })}
                                </div>
                            </div>
                        </div>
                        <div className="border rounded-2 p-2 mt-5">
                            <div className="text-lg fw-bold mb-4">Status Beasiswa</div>
                            <form action="" method="post"
                                    id="formBeasiswa{{ item.id }}" className="row">]
                                 {status.status == 4 ? <span className="rounded-2 p-2 bg-default text-white">Selesai</span> : ''}
                                    <div className="form-group text-start">
                                        <label>Status Beasiswa</label>
                                        <select name="status_riwayat" onChange={onChange} className={`form-control text-white h-50 col-4 text-lg rounded-2 px-1 ${status.status == 0 ? "bg-secondary" : status.status == 1 ? "bg-info" : status.status == 2 ? "bg-success" : "bg-danger" }`}>
                                            <option value="">Pilih</option>
                                                 <option value="1">Proses Seleksi
                                                 </option>
                                                 <option value="2">Disetujui</option>
                                                 <option value="3">Ditolak</option>
                                                <option value="4">Selesai</option>
                                        </select>
                                    </div>
    
                                <div className="form-group text-start">
                                    <label>Catatan</label>
                                    <textarea name="catatan" onChange={onChange}
                                                className="w-100 height-100 form-control"
                                                placeholder="Catatan"></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary"
                                                data-dismiss="modal">Close
                                        </button>
                                        <button onClick={() => approval_beasiswa()} 
                                                className="btn btn-primary">Save changes
                                        </button>
                                    </div>
                    </>
                )
            } else if (item.item.jenis_beasiswa == 'bankaltimtara') {
                return (
                    <>
                        <div className="border rounded-2 container">
                            <div className="form-group mt-4 text-start">
                                <label >File Pernyataan</label>
                                <a className="btn btn-primary" target="_blank"
                                    href={ item.item.file_pernyataan }>File
                                    Pernyataan</a>
                            </div>
                        </div>
                        <div className="border rounded-2 p-2 mt-5">
                            <div className="text-lg fw-bold mb-4">Status Beasiswa</div>
                            <form action="{% url 'index_beasiswa' %}" method="post"
                                    id="formBeasiswa{{ item.id }}" className="row">
                                <input type="hidden" name="id_beasiswa"
                                        value="{{ item.id }}"></input>
                                 {status.status == 4 ? <span className="rounded-2 p-2 bg-default text-white">Selesai</span> : ''}
                                    <div className="form-group text-start">
                                        <label>Status Beasiswa</label>
                                        <select name="status_riwayat" onChange={onChange} className={`form-control text-white h-50 col-4 text-lg rounded-2 px-1 ${status.status == 0 ? "bg-secondary" : status.status == 1 ? "bg-info" : status.status == 2 ? "bg-success" : "bg-danger" }`}>
                                            <option value="">Pilih</option>
                                                 <option value="1">Proses Seleksi
                                                 </option>
                                                 <option value="2">Disetujui</option>
                                                 <option value="3">Ditolak</option>
                                                <option value="4">Selesai</option>
                                        </select>
                                    </div>
    
                                <div className="form-group text-start">
                                    <label>Catatan</label>
                                    <textarea name="catatan" onChange={onChange}
                                                className="w-100 height-100 form-control"
                                                placeholder="Catatan"></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary"
                                                data-dismiss="modal">Close
                                        </button>
                                        <button onClick={() => approval_beasiswa()} 
                                                className="btn btn-primary">Save changes
                                        </button>
                                    </div>
                    </>
                )
            } else if (item.item.jenis_beasiswa == 'daerah') {
                return (
                    <>
                        <div className="border rounded-2 container">
                            <div className="form-group mt-4 text-start">
                                <label >File Pernyataan</label>
                                <a className="btn btn-primary" target="_blank"
                                    href={ item.item.file_pernyataan }>File
                                    Pernyataan</a>
                            </div>
                        </div>
                        <div className="border rounded-2 p-2 mt-5">
                            <div className="text-lg fw-bold mb-4">Status Beasiswa</div>
                            <form action="{% url 'index_beasiswa' %}" method="post"
                                    id="formBeasiswa{{ item.id }}" className="row">
                                <input type="hidden" name="id_beasiswa"
                                        value="{{ item.id }}"></input>
                                 {status.status == 4 ? <span className="rounded-2 p-2 bg-default text-white">Selesai</span> : ''}
                                    <div className="form-group text-start">
                                        <label>Status Beasiswa</label>
                                        <select name="status_riwayat" onChange={onChange} className={`form-control text-white h-50 col-4 text-lg rounded-2 px-1 ${status.status == 0 ? "bg-secondary" : status.status == 1 ? "bg-info" : status.status == 2 ? "bg-danger" : "" }`}>
                                            <option value="">Pilih</option>
                                                 <option value="1">Proses Seleksi
                                                 </option>
                                                 <option value="2">Disetujui</option>
                                                 <option value="3">Ditolak</option>
                                                <option value="4">Selesai</option>
                                        </select>
                                    </div>
    
                                <div className="form-group text-start">
                                    <label>Catatan</label>
                                    <textarea name="catatan" onChange={onChange}
                                                className="w-100 height-100 form-control"
                                                placeholder="Catatan"></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary"
                                                data-dismiss="modal">Close
                                        </button>
                                        <button onClick={() => approval_beasiswa()} 
                                                className="btn btn-primary">Save changes
                                        </button>
                                    </div>
                    </>
                )
            } else if (item.item.jenis_beasiswa == 'skkmigas') {
                return(
                    <>
                        <div className="border rounded-2 container">
                            <div className="form-group mt-4 text-start">
                                <label >File Pernyataan</label>
                                <a className="btn btn-primary" target="_blank"
                                    href={ item.item.file_pernyataan }>File
                                    Pernyataan</a>
                            </div>
                        <div className="form-group mt-4 text-start">
                                <label >File Surat Rekomendasi</label>
                                <a className="btn btn-primary" target="_blank"
                                    href={ item.item.file_rekomendasi }>File
                                    Surat Rekomendasi</a>
                            </div>
                        </div>
                        <div className="border rounded-2 p-2 mt-5">
                            <div className="text-lg fw-bold mb-4">Status Beasiswa</div>
                            <form action="{% url 'index_beasiswa' %}" method="post"
                                    id="formBeasiswa{{ item.id }}" className="row">
                                 {status.status == 4 ? <span className="rounded-2 p-2 bg-default text-white">Selesai</span> : ''}
                                    <div className="form-group text-start">
                                        <label>Status Beasiswa</label>
                                        <select name="status_riwayat" onChange={onChange} className={`form-control text-white h-50 col-4 text-lg rounded-2 px-1 ${status.status == 0 ? "bg-secondary" : status.status == 1 ? "bg-info" : status.status == 2 ? "bg-success" : "bg-danger" }`}>
                                            <option value="">Pilih</option>
                                                 <option value="1">Proses Seleksi
                                                 </option>
                                                 <option value="2">Disetujui</option>
                                                 <option value="3">Ditolak</option>
                                                <option value="4">Selesai</option>
                                        </select>
                                    </div>
    
                                <div className="form-group text-start">
                                    <label>Catatan</label>
                                    <textarea name="catatan" onChange={onChange}
                                                className="w-100 height-100 form-control"
                                                placeholder="Catatan"></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary"
                                                data-dismiss="modal">Close
                                        </button>
                                        <button onClick={() => approval_beasiswa()} 
                                                className="btn btn-primary">Save changes
                                        </button>
                                    </div>
                    </>
                )
            } else {
                return null
            }
    
            function FotoRumah(file:any) {
                return (
                    <>
                        <img className="w-25 p-1 bg-cover"src={file.file.file}/>
                    </>
                )
            }
        }
    }

};