import axios from "axios";
import { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { FaWindowMinimize, FaPaperPlane } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

export const ChartThreadComponent = (data:any) => {

    const cookies = new Cookies();
    const chat = useSelector((state:any) => state.chat.data)
    const dispatch = useDispatch()

    // let [chats, setChats] = useState<any>(chat);

    // let [minimaze, setMinimaze] = useState<any>(true);


    let [comment, setComment] = useState<Array<any>>(chat.payload.comments);
    let [formData, setFormData] = useState<any>({user: cookies.get('username'), id:chat.payload.id, dosen: true});
    let [formDataSocket, setFormDataSocket] = useState<any>({room: chat.payload.id.toString(), user: cookies.get('username')});
    // let commentan:any = [];

    // setComment(chat)

    const socket = io("127.0.0.1:8001");

    function response() {
        socket.on('my_response', function(msg) {
            console.log(msg.data)
            // $('#log').append('<br>Received: ' + msg.data);
        });
    }


    // function MinimazeFunc() {
    //     // useEffect(() => {
    //         if (minimaze) {
    //             setMinimaze(false)
    //         } else {
    //             setMinimaze(true)
    //         }
    //         // setMinimaze(minimaze ? true : false);
    //         console.log(minimaze)
    //     // }, [])
    // }

    useEffect(() => {
        socket.on('my_response', function(msg) {
            if (msg.data.type == 'bimbingan') {
                setComment((prevstate:any) => ([
                    ...prevstate,
                    {comment: msg.data.comment, user: {id:msg.data.user}}
                ]))
                // commentan.push({id: 40, comment:msg.data})
            }
            // return false;
            // $('#log').append('<br>Received: ' + msg.data);
        });
    }, [])


    function join(room:any) {
        // console.log(room, 'ruangan')
        socket.emit('join', {room: room.toString()})
        return false
    }

    const onChange = (e:any) => {
        setFormData((prevstate:any) => ({
            ...prevstate,
            [e.target.name]: e.target.value
        }))
        setFormDataSocket((prevstate:any) => ({
            ...prevstate,
            data: {
                [e.target.name]: e.target.value,
                type: 'bimbingan',
                user: cookies.get('username')
            }
        }))
    }

    const navigate = useNavigate()

    const update_thread = () => {
        axios.post(process.env.REACT_APP_BIMBINGAN_URL + '/bimbingan/bimbingan_pa/comment_thread/', formData)
            .then(response => {
                // console.log(response)
            })
            .catch(e => {
                console.log(e)
            })
        socket.emit('my_room_event', formDataSocket)
    }

    const end_thread = () => {
        axios.post(process.env.REACT_APP_BIMBINGAN_URL + '/bimbingan/bimbingan_pa/comment_thread/', {user: cookies.get('username'), comment: 'Apakah ada lagi yang perlu di konsultasikan? Jika tidak ada, silahkan akhiri bimbingan ini.', id:chat.payload.id, dosen: true})
            .then(response => {
                // console.log(response)
            })
            .catch(e => {
                console.log(e)
            })
        axios.post(process.env.REACT_APP_BIMBINGAN_URL + '/bimbingan/bimbingan_pa/end_thread/', {user: cookies.get('username'), id:chat.payload.id, dosen: true})
            .then(response => {
                console.log(response)
            })
            .catch(e => {
                console.log(e)
            })
        socket.emit('my_room_event', {room: chat.payload.id, user: cookies.get('username'), data: {comment: 'Apakah ada lagi yang perlu di konsultasikan? Jika tidak ada, silahkan akhiri bimbingan ini.', type: 'bimbingan', status: 2, user: cookies.get('username')}})
    }

    // MinimazeFunc()
    join(chat.payload.id)

    return (
        <>
            {/* <div style={{ position: 'relative', width: '250px', zIndex: '999999999999999999999999999999999' }}>
                <div className="chat-render border border-2 rounded bg-white m-3"> */}
                    <div className="p-2 fw-bold border-bottom border-2 px-3">
                        <div className="row">
                            <div className="col d-flex gap-2">
                                <img className="avatar-sm rounded border my-auto" style={{ objectFit: 'cover' }} src="https://github.com/younixue3/stock_photo_rdev/blob/main/you-can-call-me-a-tech-user.jpg?raw=true" />
                                <div className="my-auto text-sm">{chat.payload.mahasiswa.name}</div>
                            </div>
                        </div>
                    </div>
                    <div className='chat-content p-2'>
                        <div className="d-flex flex-column gap-3 overflow-auto mb-2" style={{ height: '250px' }}>
                            {comment.map((item:any, key:any) => {
                                return (
                                    <div className={"d-flex " + (item.user.id == cookies.get('username') ? 'flex-row-reverse' : 'flex-row')} key={key}>
                                        <span className={"text-white rounded text-xs mw-75 p-2 " + (item.user.id == cookies.get('username') ? 'bg-primary' : 'bg-secondary')}>
                                            {item.comment}
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="">
                            <div className="d-flex gap-2 mt-2">
                                <div className="w-100">
                                    <textarea onChange={onChange} className="form-control text-xs" name="comment" />
                                    <div className="p-1">
                                        <button onClick={end_thread} className="text-xs bg-transparent border-0 link-primary text-decoration-underline">Akhiri bimbingan</button>
                                    </div>
                                    {/*<input className="form-control text-xs m-auto" type="file"></input>*/}
                                </div>
                                <div className="d-flex">
                                    <button onClick={() => {update_thread()}} type="button" className="btn btn-primary p-2 mb-auto"><FaPaperPlane/></button>
                                </div>
                            </div>
                        </div>
                    </div>
                {/* </div>
            </div> */}
        </>
    )
}