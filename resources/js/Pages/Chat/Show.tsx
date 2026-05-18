import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEvent } from 'react';

interface Message {
    id: number;
    sender_id: number;
    body: string;
    created_at: string;
    sender: { id: number; name: string };
}

interface ChatUser {
    id: number;
    name: string;
}

export default function ChatShow({ chatUser, messages }: { chatUser: ChatUser; messages: Message[] }) {
    const { auth } = usePage().props as any;
    const { data, setData, post, reset } = useForm({
        receiver_id: chatUser.id,
        body: '',
    });

    function submit(e: FormEvent) {
        e.preventDefault();
        post('/messages', {
            onSuccess: () => reset('body'),
        });
    }

    return (
        <>
            <Head title={`Чат с ${chatUser.name}`} />
            <div>
                <h1>Чат с {chatUser.name}</h1>
                <div style={{ border: '1px solid #ccc', height: '300px', overflowY: 'scroll', marginBottom: '10px' }}>
                    {messages.map((msg) => (
                        <div key={msg.id} style={{ textAlign: msg.sender_id === auth.user.id ? 'right' : 'left' }}>
                            <strong>{msg.sender.name}:</strong> {msg.body}
                            <small>{new Date(msg.created_at).toLocaleTimeString()}</small>
                        </div>
                    ))}
                </div>
                <form onSubmit={submit}>
                    <input
                        type="text"
                        value={data.body}
                        onChange={(e) => setData('body', e.target.value)}
                        placeholder="Введите сообщение..."
                    />
                    <button type="submit">Отправить</button>
                </form>
            </div>
        </>
    );
}
