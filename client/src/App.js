import React, {useEffect, useState} from 'react';
import axios from "axios";

const App = () => {
    const [messages, setMessages] = useState([])
    const [value, setValue] = useState('')

    useEffect(() => {
        subscribe()
    }, [])

    const subscribe = async () => {
        try {
            const {data} = await axios.get('http://localhost:5000/get-messages')
            setMessages(prev => [data, ...prev])
            setValue('')
            await subscribe()
        } catch (e) {
            setTimeout(() => {
                subscribe()
            }, 500)
        }
    }

    const sendMessage = async (e) => {
        e.preventDefault()
        await axios.post('http://localhost:5000/new-messages', {
            message: value,
            id: Date.now()
        })
    }

    return (
        <div className='center'>
            <div>
                <form className="form" onSubmit={sendMessage}>
                    <input
                        type="text"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    <button onClick={sendMessage}>Отправить</button>
                </form>
                <div className="messages">
                    {messages.map(mess =>
                        <div className='message' key={mess.id}>
                            {mess.message}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default App;
