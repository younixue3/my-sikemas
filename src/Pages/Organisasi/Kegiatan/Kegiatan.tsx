import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export const Kegiatan = () => {
    const {organisasiId} = useParams()
    let [kegiatan, setKegiatan] = useState<Array<any>>([]);

    function Get_kegiatan() {
        let url : string = "/ormawa/kantaya-kegiatan-ormawa/"+organisasiId+"/getOrganisasi/"
        console.log(url)
        useEffect(() => {
            axios.get(process.env.REACT_APP_BASE_URL + url)
                .then(response => {
                    setKegiatan(response.data)
                })
                .catch(e => {
                    console.log(e)
                })
                .finally(() => {
                    console.log('Success')
                });
        }, [])
    }
    Get_kegiatan()

    return (
        <div className={'card p-1 pt-3'}>
            {kegiatan.map((item, id) => {
                return (
                    <>
                    <ItemKegiatan item={item} key={id} />
                    </>
                )
            })}
            <div className="modal fade" id="modalNewSubIndikatorContainer"  role="dialog"
                aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content" id="modal">
                    </div>
                </div>
            </div>
            <div className="modal fade" id="modalNewKegiatan" role="dialog" aria-labelledby="modalNewKegiatan"
                aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <form action="" method="post" className="modal-content">
                        <input type="hidden" name="organisasi" value="{{ organisasi }}" ></input>
                        <div className="modal-header">
                            <h5 className="modal-title">Tambah Kegiatan</h5>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group">
                                        <label>Nama Kegiatan</label>
                                        <input type="text" className="form-control" name="nama_kegiatan" id="Nama_Kegiatan"></input>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group">
                                        <label>Anggaran</label>
                                        <input type="number" className="form-control" name="anggaran" id="Anggaran"></input>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary">Save changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    )

function Approval(item:any) {
    return (
        <div className="col-12 border-dark border-2 border-start justify-content-start p-0"
            style={{display: "flex"}}>
            <div className="m-auto border border-dark" style={{width: "30px", height: "2px"}}></div>
            <div className="w-100 py-3">
                <div className="border p-3 border-dark" style={{borderRadius: "10px"}}>
                    <button type="button" className={`btn ${item.item.status === 1 ? 'btn-primary' : item.item.status === 2 ? 'btn-danger' : 'btn-success'}`}>

                            {item.item.status === 1 ? 'Diproses' : item.item.status === 2 ? 'Ditolak' : 'Diterima'}
                    </button>
                    <div className="text-dark">
                        {item.item.pesan}
                    </div>
                </div>
            </div>
        </div>
    )
}

    function ItemKegiatan(item: any) {
        const [formData, setFormdata] = useState<any>({nama_kegiatan: item.item.nama, anggaran: item.item.max_anggaran, kegiatan: item.item.id, id_kegiatan: item.item.id, kantaya: true});
        const onChange = (e:any) => {
            setFormdata((prevstate:any) => ({
                ...prevstate,
                [e.target.name]: e.target.value
            }))
        }
        // const id: any = item.item.id
        const nama: any = item.item.nama
        const proposal: any = item.item.file_proposal
        const lpj: any = item.item.file_lpj
        const approval: any = item.item.approval[item.item.approval.length > 0 ? item.item.approval.length - 1 : 0]
        // const nama_ketua: any = item.item.anggota[0].first_name + " " + item.item.anggota[0].last_name
        // const sk_kepengurusan: string = item.item.file_sk_kepengurusan[0]
        // const sk_kepengurusan_id: string = item.item.file_sk_kepengurusan[0].id
        // const proker: string = item.item.file_proker[0]
        // const proker_id: string = item.item.file_proker[0].id
        const navigate = useNavigate()

        const update_kegiatan = () => {
            axios.put(process.env.REACT_APP_BASE_URL + '/ormawa/kantaya-kegiatan-ormawa/updateKegiatan/', formData)
                .then(response => {
                    console.log(response)
                })
                .catch(e => {
                    console.log(e)
                })
                .finally(() => {
                    navigate(0)
                })
                navigate(0)
        }

        const insert_approval = () => {
            axios.post(process.env.REACT_APP_BASE_URL + '/ormawa/kantaya-kegiatan-ormawa/addApproval/', formData)
                .then(response => {
                    console.log(response)
                })
                .catch(e => {
                    console.log(e)
                })
                .finally(() => {
                    navigate(0)
                })
                navigate(0)
        }

        return (
            <>
            <div className={`m-2 card border shadow shadow-lg p-3 ${item.item.status ? 'bg-white' : 'bg-secondary'}`}>
                <div className="justify-content-between" style={{display:"flex"}}>
                    <h3 className={item.item.status ? 'text-primary' : 'text-white'}>{nama}</h3>
                    <div className="">
                        <button type="button" className="btn btn-primary" data-bs-toggle="modal"
                                data-bs-target={'#modalKegiatan'+item.item.id}>
                            <i className="fa-solid fa-pencil">Pencil</i>
                        </button>

                        <div className="modal fade" id={'modalKegiatan'+item.item.id} 
                                aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body" id="bodyModalKegiatan">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <label>Nama Kegiatan</label>
                                                    <input type="text" className="form-control" name="nama_kegiatan" id="Nama Kegiatan" onChange={onChange} value={formData.nama_kegiatan}></input>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <label>Anggaran</label>
                                                    <input className="form-control" name="anggaran" onChange={onChange} value={formData.anggaran}></input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button onClick={() => update_kegiatan()} type="submit" className="btn btn-primary">Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <a className="btn btn-danger" href="#"><i className="fa-solid fa-trash">Trash</i></a> */}
                    </div>
                </div>
                <div className="d-flex justify-content-start">
                    <a target="_blank" href={proposal ? proposal.file : '#' } className={`btn mx-1 ${proposal ? 'btn-success' : 'btn-danger'}`}>
                        Proposal
                    </a>
                    <a target="_blank" href={lpj ? lpj.file : '#' } className={`btn mx-1 ${lpj ? 'btn-success' : 'btn-danger'}`}>LPJ</a>
                    <div className="btn btn-warning">
                        Maksimal Anggaran : Rp. { item.item.max_anggaran }
                    </div>
                            {approval ? <button type="button" className={`btn mx-1 ${approval.status === 1 ? 'btn-primary' : approval.status === 2 ? 'btn-danger' : 'btn-success' } `} data-bs-toggle="modal"data-bs-target={"#modalAprovalKegiatan" + item.item.id}>{approval.status === 1 ? 'Diproses' : approval.status === 2 ? 'Ditolak' : 'Disetujui' }</button> : ''}
                </div>
                <div className={item.item.status ? 'text-primary' : 'text-white' }>
                    <div className="accordion" id="accordionExample"
                    hidden={!item.item.rincian_kegiatan.created_at}>
                        <div className="accordion-item border-2" style={{borderRadius: "10px"}}>
                            <div className="accordion-header" id="headingOne">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#collapse" aria-expanded="false"
                                        aria-controls="collapse">
                                    Detail rincian
                                </button>
                            </div>
                            <div id="collapse" className="accordion-collapse collapse"
                                    aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                <div className="accordion-body font-weight-bold">
                                    <div>Tanggal : {item.item.rincian_kegiatan.created_at}</div>
                                    <div>Rincian :
                                        <div className="px-3 py-2 my-3 border border-2" style={{borderRadius: "10px"}}>
                                            <div dangerouslySetInnerHTML={{ __html: item.item.rincian_kegiatan.rincian }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id={"modalAprovalKegiatan"+item.item.id}  aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body" id="bodyModalAprovalKegiatan">           
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group">
                                        <label>Status</label>
                                        <select name="status" className="form-control" onChange={onChange}>
                                            <option value="1">Diproses</option>
                                            <option value="2">Ditolak</option>
                                            <option value="3">Disetujui</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group">
                                        <label>Pesan</label>
                                        <input type="text" className="form-control" name="pesan" id="Pesan" onChange={onChange}></input>
                                    </div>
                                </div>
                            </div>
                            <div className="row px-2">
                                {item.item.approval.map((item : any, id : number) => {
                                    return (
                                        <Approval item={item} key={id} />
                                    )
                                })}
                            </div>
                            <input type="hidden" name="id_kegiatan" value=""></input>
                            <input type="hidden" name="metode" value="status"></input>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" onClick={() => insert_approval()} className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
}