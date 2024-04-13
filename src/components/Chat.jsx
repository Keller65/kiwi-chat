import { useState, useEffect } from 'react';
import Send from "../../public/icons/Send";
import { useAuth } from './context/AuthContext'
import { getDatabase, ref, push, onValue, off } from "firebase/database";

function Chat() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const { currentUser } = useAuth();
    let displayName, email, photoURL;

    if (currentUser) {
        ({ displayName, email, photoURL } = currentUser);
    }

    const savedAvatar = JSON.parse(localStorage.getItem('avatar'));

    useEffect(() => {
        const db = getDatabase();
        const messagesRef = ref(db, 'chats');

        const onMessageAdded = (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const messagesList = Object.values(data);
                setMessages(messagesList);
            } else {
                setMessages([]);
            }
        };

        onValue(messagesRef, onMessageAdded);

        return () => {
            off(messagesRef, 'value', onMessageAdded);
        };
    }, []);

    const handleChange = (e) => {
        setMessage(e.target.value);
    }

    const sendForm = (e) => {
        e.preventDefault();
        if (message.trim() !== '') {
            console.log("Mensaje enviado:", message);
            const db = getDatabase();
            const messagesRef = ref(db, 'chats');
            push(messagesRef, {
                username: displayName ?? savedAvatar?.name ?? 'anonimo',
                email: email ?? savedAvatar?.email ?? 'anonimo@gmail.com',
                photo: savedAvatar ? savedAvatar.photo : photoURL ?? null,
                message: message
            });
            setMessage('');
            // console.log(savedAvatar?.email)
        }
    }

    return (
        <>
            {/* <div className="absolute inset-0 -z-10 h-full w-full bg-[#d8caff] bg-[linear-gradient(to_right,#6c40d46b_1px,transparent_1px),linear-gradient(to_bottom,#6c40d46b_1px,transparent_1px)] bg-[size:14px_24px]"></div> */}

            <section className='h-[100dvh] max-w-[960px] py-5 m-auto flex flex-col relative'>

                <section className='w-full h-[90%] flex flex-col gap-1 overflow-hidden overflow-y-scroll'>
                    {messages.map((msg, index) => (
                        <div key={index} className={
                            currentUser ?
                                msg.email === currentUser?.email ?
                                    'flex flex-row-reverse rounded-xl gap-2 items-start p-2' :
                                    'flex rounded-xl gap-2 items-start p-2' :

                                msg.email === savedAvatar?.email ?
                                    'flex flex-row-reverse rounded-xl gap-2 items-start p-2' :
                                    'flex rounded-xl gap-2 items-start p-2'
                        }>

                            <img height={40} width={40} className='rounded-full w-[40px] h-[40px]' src={msg.photo} alt={index} />

                            <div className='flex flex-col cursor-pointer bg-[#fff] backdrop-blur-sm py-2 px-4 min-w-[200px] w-auto max-w-[360px] rounded-xl'>
                                <p className='text-[12px] font-semibold'>{msg.username}</p>
                                <p>{msg.message}</p>
                            </div>
                        </div>
                    ))}
                </section>

                <section className="flex items-center gap-2 px-1 justify-center w-full absolute bottom-5">
                    <form onSubmit={sendForm} className="bg-white w-[80%] rounded-2xl overflow-hidden">
                        <input
                            required
                            className='w-full h-14 flex py-2 px-8 items-start outline-none'
                            type="text"
                            placeholder='Enviar Mensaje...'
                            value={message}
                            onChange={handleChange}
                        />
                    </form>

                    <button onClick={sendForm} type="submit" className='p-3 rounded-2xl bg-[#5900ff] grid place-content-center'>
                        <Send />
                    </button>
                </section>

            </section>
        </>
    )
}

export default Chat;