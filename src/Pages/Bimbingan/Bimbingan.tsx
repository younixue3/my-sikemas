import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import { Cookies } from "react-cookie";
import { tab } from "@testing-library/user-event/dist/tab";

export const Bimbingan = () => {
    const cookies = new Cookies();
    let [bimbingan, setBimbingan] = useState<Array<any>>([]);
    let [trash, setTrash] = useState<Array<any>>([]);
    let [sent, setSent] = useState<Array<any>>([]);
    let [inbox, setInbox] = useState<Array<any>>([]);
    let [detailbimbingan, setDetailBimbingan] = useState<Array<any>>();
    let [showingbimbingan, setShowingBimbingan] = useState<Array<any>>([]);
    let [showdata, setShowDatas] = useState<any>({tabs:'inbox'});
    function showData(tab:string) {
        // console.log(tab)
        setShowDatas(({
            ['tabs']: tab
        }))
    }

    const [formData] = useState<any>({user: cookies.get('username')});
    function Get_bimbingan() {
        useEffect(() => {
            axios.post(process.env.REACT_APP_BIMBINGAN_URL + '/bimbingan/bimbingan_pa/all_thread/', formData)
                .then(response => {
                    setBimbingan(response.data.results)
                    // console.log(response.data)
                    setTrash(response.data.results.filter((item:any) => item.soft_delete))
                    setSent(response.data.results.filter((item:any) => item.sent_recieve === false && item.soft_delete == null))
                    setInbox(response.data.results.filter((item:any) => item.sent_recieve === true && item.soft_delete == null))
                })
                .catch(e => {
                    // console.log(e)
                })
                .finally(() => {
                    // console.log('Success')
                });
        }, [])
    }

    Get_bimbingan()
    function Get_detail() {
        useEffect(() => {
            // console.log('test')
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [detailbimbingan])
    }

    Get_detail()

    return (
        <>
            <div className="container-fluid h-100">
                <div className="row">
                    <div className="card pc:hidden">
                        <div className="card-header d-flex justify-content-between">
                            <h4 className="card-title">Thread Bimbingan Mahasiswa</h4>
                            <i className="fa-solid fa-timeline fa-3x"></i>
                        </div>
                    </div>
                </div>
                <div className="row pt-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="min-h-screen px-2 md:px-10 py-5">
                                <div className="flex">
                                    <button onClick={() => showData('inbox')}
                                        className="text-gray-500 border px-3 py-1 rounded-l-xl">
                                        <i
                                            className="fas fa-inbox mr-2"></i>Inbox<span
                                        className="bg-primary rounded-full text-white px-1 pb-0.5 ml-2 mx-1">{inbox.length}</span>
                                    </button>
                                    <button onClick={() => showData('sent')}
                                        className="text-gray-500 border border-r-0 border-l-0 px-3 py-1">
                                        <i
                                            className="fas fa-envelope mr-2"></i>Sent
                                    </button>
                                    <button onClick={() => showData('trash')}
                                        className="text-gray-500 border px-3 py-1 rounded-r-xl">
                                        <i
                                            className="fas fa-trash mr-2"></i>Trash
                                    </button>
                                </div>
                                <div className="row gap-2 my-5">
                                    <div className="col-4 space-y-3">
                                        <div className="row gap-3">
                                        {showdata.tabs == 'inbox' ? <>{inbox.map((item, id) => {
                                        return (
                                            <ListMail item={item} key={id} />
                                        )
                                    })}</> : showdata.tabs == 'sent' ? <>{sent.map((item, id) => {
                                        return (
                                            <ListMail item={item} key={id} />
                                        )
                                    })}</> : showdata.tabs == 'trash' ? <>{trash.map((item, id) => {
                                        return (
                                            <ListMail item={item} key={id} />
                                        )
                                    })}</> : <></>}
                                        </div>
                                    </div>
                                    {detailbimbingan ? <DetailBimbingan item={detailbimbingan} /> : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

    function DetailBimbingan(item:any) {
        const [formData, setFormdata] = useState<any>({user: cookies.get('username'), id:item.item.id, dosen: true});
        const onChange = (e:any) => {
            setFormdata((prevstate:any) => ({
                ...prevstate,
                [e.target.name]: e.target.value
            }))
        }

        const navigate = useNavigate()

        const update_thread = () => {
            axios.post(process.env.REACT_APP_BIMBINGAN_URL + '/bimbingan/bimbingan_pa/comment_thread/', formData)
                .then(response => {
                    // console.log(response)
                })
                .catch(e => {
                    // console.log(e)
                })
                .finally(() => {
                    navigate(0)
                })
                .then(() => {
                    Get_bimbingan()
                })
                navigate(0)
        }

        return (
            <>
            <div className="hidden md:block col">
                <div
                    className="border rounded-xl bg-whited shadow-lg px-3 py-3 d-flex flex-row">
                    <img className="mr-2 md:mr-4 rounded-full"
                            style={{width: "80px", height: "80px"}}
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""/>
                    <div className="px-2 w-100 text-start">
                        <div
                            className="d-flex flex-row justify-content-between mb-5">
                            <div>
                                <div
                                    className="text-lg text-bold leading-4">{item.item.mahasiswa.name}</div>
                                <span
                                    className="text-sm">{item.item.mahasiswa.id}</span>
                            </div>
                            <h1 className="text-xs">{item.item.created_at}</h1>
                        </div>
                        <h2 className="text-lg font-bold mb-3">{item.item.title}</h2>
                        <div
                            className="p-2 rounded-xl my-3 rounded rounded-lg text-start">
                            {item.item.comments.map((item:any, id:any) => {
                                    return (
                                        <p key={id} className={`my-2 h-20 p-2 overflow-hidden leading-5 text-sm text-gray-600 ${item.user.id === cookies.get('username') ? 'bg-primary text-white' : 'bg-secondary text-white' }`}>
                                            {item.comment}
                                        </p>
                                    )
                                })}
                            <div className="row px-2">
                                {item.item.file ? <>
                                    <a href={"item.item.file.file_url"}
                                    // onclick="openImage('{{ file.file_url }}')"


                                    data-bs-toggle="modal"
                                    data-bs-target="#modalImage"
                                    className="col-3 button">
                                </a >
                                </> : <></>}
                            </div>
                        </div>
                        <div>
                            <div className="d-flex flex-row mt-10">
                                                            <textarea name="comment" onChange={onChange}
                                                                        className="flex-1 block border border-r-0 rounded-l-xl w-100 form-control focus:outline-none px-3 pt-2 pb-1"
                                                                        placeholder="Komentar Anda"></textarea>
                                <button onClick={() => update_thread()}
                                        className="inline-flex bg-primary m-2 items-center rounded-r-xl text-white rounded border ">
                                    Kirim
                                </button>
                            </div>
                            {/* <input type="file" name="image" multiple onChange={onChange}
                                    className="items-center border-x-0 border border-l-0 text-dark mt-2"></input> */}
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }

    function ListMail(item:any) {
        const [formData, setFormdata] = useState<any>({});
        const on_hover = (id:any) => {
            setFormdata(() => ({
                ['user']: cookies.get('username'),
                ['id']: id
            }))
        }
        const detail_thread = () => {
            
            // console.log(formData)
            axios.post(process.env.REACT_APP_BIMBINGAN_URL + "/bimbingan/bimbingan_pa/get_thread/", formData)
                .then(response => {
                    // console.log(response)
                    // file.getorg.get_organisasi
                    setDetailBimbingan(response.data)
                })
                .catch(e => {
                    // console.log(e)
                })
        }
        // const id: any = item.item.id

        return (
            <>
            <a href="#" onMouseEnter={() => on_hover(item.item.id)} onClick={() => detail_thread()}
                    className="group transition-all duration-200 cursor-pointer border rounded-xl bg-white hover:bg-gray-100 shadow-lg px-3 py-3 d-flex flex-row">
                    <img className="mr-2 md:mr-4 rounded-full"
                            style={{height: "80px", width: "80px"}}
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""/>
                    <div className="px-2 w-100">
                        <div
                            className="d-flex flex-row justify-content-between text-start mb-4">
                            <div>
                                <div
                                    className="font-semibold leading-4">{ item.item.mahasiswa.name  }</div>
                                <span
                                    className="text-sm">{ item.item.mahasiswa.id}</span>
                            </div>
                            <div
                                className="text-xs text-bolder">{item.item.created_at}
                            </div>
                        </div>
                        <div
                            className="bg-gray-100 transition-all duration-200 group-hover:bg-gray-50 p-2 text-start rounded-xl">
                            <div
                                className="text-bolder">{item.item.title}</div>
                            <p className="my-2 h-20 overflow-hidden leading-5 text-sm text-gray-600">
                                {item.item.comments[0].comment}
                            </p>
                        </div>
                    </div>
                </a>
            </>
        )
    }
}