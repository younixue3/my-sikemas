import { FaSearch, FaWindowMinimize } from "react-icons/fa";
import { ChartThreadComponent } from "./ChatThreadComponent";
import { useEffect, useState } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from "react-redux";
import { openChat } from "../../redux/chat/chatReducer";

export const ListChatComponent = (item: any) => {

    const cookies = new Cookies();

    const chat = useSelector((state:any) => state.chat.data)
    const dispatch = useDispatch()

    let [notification, setNotification] = useState(item.item.notification ? item.item.notification : 0)

    const socket = io("127.0.0.1:8001");

    let [formData, setFormData] = useState<any>({user: cookies.get('username'), id:item.item.id, dosen: true});

    function OpenChat() {
        setNotification((notif:any) => 0)
        dispatch(openChat(item.item))
        axios.post(process.env.REACT_APP_BIMBINGAN_URL + '/bimbingan/bimbingan_pa/read_thread/', formData)
    }

    function join(room:any) {
        // console.log(room, 'ruangan')
        socket.emit('join', {room: room.toString()})
    }

    // const socket = io("127.0.0.1:8001");

    useEffect(() => {
        socket.on('my_response', function(msg) {
            console.log(msg, 'list')
            if (msg.data.type == 'bimbingan') {
                if (msg.data.user != cookies.get('username')) {
                    setNotification((notif:any) => notif + 1)
                }
                // item.item.comment
                // setComment((prevstate:any) => ([
                //     ...prevstate,
                //     {comment: msg.data.comment, user: {id:msg.data.user}}
                // ]))
                // commentan.push({id: 40, comment:msg.data})
            }
            return false;
            // $('#log').append('<br>Received: ' + msg.data);
        });
    }, [])

    // function join(room:any) {
    //     // console.log(room, 'ruangan')
    //     socket.emit('join', {room: room.toString()})
    //     return false
    // }

    // // Response()
    join(item.item.id)

    const NotificationCondition = (number:any) => {
        return (
            <>
                <div className="bg-danger text-white rounded-circle d-flex" style={{height: '18px', width: '18px'}}>
                    <span className="text-xs text-center m-auto">{number.number}</span>
                </div>
            </>
        )
    }

    return (
        <>
            <div onClick={OpenChat} className="d-flex chat-item rounded gap-3">
                <div className="my-auto">
                    <img className="avatar border" style={{ objectFit: 'cover' }} src="https://github.com/younixue3/stock_photo_rdev/blob/main/you-can-call-me-a-tech-user.jpg?raw=true" />
                </div>
                <div className="d-flex gap-1">
                    <div className="w-100">
                        <div className="text-md font-weight-bold text-black">
                            {item.item.title}
                        </div>
                        <p className="text-xs text-truncate">
                            {item.item.mahasiswa.name}
                        </p>
                    </div>
                    <div className="m-auto">
                        {notification > 0 && item.item.sent_recieve == true ? <NotificationCondition number={notification} /> : '' }
                    </div>
                </div>
            </div>
        </>
    )
}