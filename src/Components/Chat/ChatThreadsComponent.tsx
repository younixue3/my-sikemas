
import { FaSearch, FaWindowMinimize } from "react-icons/fa";
import { ChartThreadComponent } from "./ChatThreadComponent";
import { useEffect, useState } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";
import { io } from 'socket.io-client';
import { ListChatComponent } from "./ListChatComponent";
import { useDispatch, useSelector } from "react-redux";

export const ChartThreadsComponent = (data: any) => {

    const cookies = new Cookies();
    const chat = useSelector((state:any) => state.chat.data)

    let [minimaze, setMinimaze] = useState<any>(false);
    let [openchat, setOpenChat] = useState<any>({});
    let [bimbingan, setBimbingan] = useState<Array<any>>([]);


    const socket = io("127.0.0.1:8001");

    useEffect(() => {
        console.log(chat)
    }, [chat])

    function connect() {
        socket.on("connect", () => {
            socket.emit('my_event', {data: 'terkoneksi'})
            // console.log(socket.emit('join', {room: 23}))
            // console.log(socket.connected); // true
        });
    }

    // function response() {
    //     socket.on('my_response', function(msg) {
    //         console.log(msg.data)
    //         // $('#log').append('<br>Received: ' + msg.data);
    //     });
    // }

    function disconnect() {
        socket.on("disconnect", () => {
            console.log(socket.connected); // false
        });
    }

    function join(room:any) {
        // console.log(room, 'ruangan')
        socket.emit('join', {room: room})
        return false
    }

    connect()
    // response()
    disconnect()

    const [formData] = useState<any>({user: cookies.get('username')});
    function Get_bimbingan() {
        
        useEffect(() => {
            axios.post(process.env.REACT_APP_BIMBINGAN_URL + '/bimbingan/bimbingan_pa/all_thread/', formData)
                .then(response => {
                    setBimbingan(response.data.results)
                    console.log(response.data)
                })
                .catch(e => {
                    console.log(e)
                })
                .finally(() => {
                    // console.log('Success')
                });
            console.log(true)
        }, [])
    }

    Get_bimbingan()

    function MinimazeFunc() {
        // useEffect(() => {
            if (minimaze) {
                setMinimaze(false)
            } else {
                setMinimaze(true)
            }
            // setMinimaze(minimaze ? true : false);
            console.log(minimaze)
        // }, [])
    }

    // function OpenChat(item:any) {
    //     // useEffect(() => {
    //     //     console.log(openchat)
    //     // }, [openchat])
    //     if (openchat.length >= 1 && openchat.filter(function(value) { 
    //         return value.item.id == item.id
    //     }).length) {
            
    //         // console.log(openchat.filter(function(value) { 
    //         //     return value.item.id == openchat[0].item.id
    //         // }))
    //     } else {
    //         if (openchat.length > 2) {
    //             // setOpenChat((prevstate:any) => ([
    //             //     ...prevstate,
    //             //     {item},
    //             // ]))
    //             console.log('hapus')
    //             console.log(openchat.filter(function(value) { 
    //                 return value.item.id !== openchat[0].item.id
    //             }))
    //             setOpenChat(openchat.filter(function(value) { 
    //                 return value.item.id !== openchat[0].item.id
    //             }));
    //             // openchat.splice(1)
    //             setOpenChat((prevstate:any) => ([
    //                 ...prevstate,
    //                 {item},
    //             ]))
    //             // setOpenChat((prevstate:any) => ([
    //             //     ...prevstate,
    //             //     {item},
    //             // ]))
    //             // join(item.item.id)
    //             // axios.post(process.env.REACT_APP_BIMBINGAN_URL + '/socket/', formData)
    //         } else {
    //             setOpenChat((prevstate:any) => ([
    //                 ...prevstate,
    //                 {item},
    //             ]))
    //         }
    //         join(item.id)
            
            
    //     }
    // }

    function RenderChat() {
        if (chat.payload) {
            return (<ChartThreadComponent />)
        } else {
            return (<></>)
        }
    }

    
    const OpenChatting = (e:any) => {
        setOpenChat(e);
    }
    return (
        <>
            <div className="layout-chat-render d-flex justify-content-end gap-1">
                <div style={{ position: 'relative'}}>
                    <div className="chat-render border border-2 rounded bg-white m-3" style={chat.payload == null ? {width:'300px'} : {width:'550px'}}>
                        <div className="p-2 fw-bold border-bottom border-2 px-3">
                            <div className="row">
                                <div className="col">
                                    Threads
                                </div>
                                <div className="col-2 d-flex">
                                    <button onClick={() => MinimazeFunc()} className="btn btn-outline-white text-secondary my-auto ms-auto btn-xs p-2"><FaWindowMinimize></FaWindowMinimize></button>
                                </div>
                            </div>
                        </div>
                        <div className={"chat-content d-flex chat-render-maximaze " + (minimaze ? '' : 'chat-render-minimaze ')}> 
                            <div className={'p-2 border-end ' + (chat.payload ? 'w-50' : 'w-100')}>
                                <div className="d-flex gap-2">
                                    <input className="form-control form-control-sm h-100"></input>
                                    <button type="button" className="btn btn-outline-primary p-1 px-2"><FaSearch></FaSearch></button>
                                </div>
                                <div className="mt-1 overflow-" style={{ height: '300px' }}>
                                    {bimbingan.map((item, key) => {
                                        return (
                                            <ListChatComponent onClickChat={OpenChatting} item={item} key={key} />
                                            // <Chat item={item} key={key} />
                                        )
                                    })}
                                </div>
                            </div>
                            <div className={(chat.payload ? 'w-50' : 'w-0')}>
                                <RenderChat/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

    // function Chat(item:any) {
    //     return (
    //         <>
    //             <div onClick={() => OpenChat(item.item)} className="d-flex chat-item p-2 rounded gap-3">
    //                 <div className="my-auto">
    //                     <img className="avatar border" style={{ objectFit: 'cover' }} src="https://github.com/younixue3/stock_photo_rdev/blob/main/you-can-call-me-a-tech-user.jpg?raw=true" />
    //                 </div>
    //                 <div className="">
    //                     <div className="text-md font-weight-bold text-black">
    //                         {item.item.mahasiswa.name}
    //                     </div>
    //                     <p className="text-xs text-truncate" style={{ width: '180px' }}>
    //                         {item.item.comments[0].comment}
    //                     </p>
    //                 </div>
    //             </div>
    //         </>
    //     )
    // }
}