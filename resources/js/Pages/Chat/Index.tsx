import {Link, Head, useForm} from '@inertiajs/react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import {PageProps, User} from '@/types';
import {Message} from '@/types';
import React from 'react'

interface ChatIndexProps extends PageProps
{
	users: User[];
	chatUser?: User;
	messages?: Message[];
}

export default function ChatIndex({auth, users, chatUser, messages}: ChatIndexProps)
{
	const {data, setData, post, processing, reset} = useForm({
		body: '',
	});

	const sendMessage = (e: React.FormEvent) =>
	{
		e.preventDefault();
		if (!chatUser || !data.body.trim()) return;

		post(route('chat.message.store', chatUser.id),{
			preserveScroll: true,
			onSuccess: () => reset('body'),
		});
	};

	return (
		<Authenticated className="chat" user={auth.user}>
			<Head title="Чаты"/>

			<div className="left">
				<div className="search">
					<input type="search" placeholder="Введите для поиска..."/>
				</div>
				<div className="userlist">
					{users.length === 0 ? (
						<span>Нет пользователей для чата</span>
					) : (
						users.map((user) => (
							<div key={user.id}>
								<Link href={route('chat.show', user.id)}>
									{user.name}
								</Link>
							</div>
						))
					)}
				</div>
			</div>

			{ !chatUser ? null : (
				<div className="right">
					<div className="info">
						<h3>Чат с {chatUser.name}</h3>
					</div>

					<div className="messages">
						{!chatUser ? (
							<div className="placeholder">Нажмите на пользователя, чтобы начать чат</div>
						) : messages && messages.length === 0 ? (
							<div className="placeholder">
								Отправьте своё первое сообщение {chatUser.name}
							</div>
						) : (
							messages?.map((msg) => (
								<div
									key={msg.id}
									className={msg.sender_id === auth.user.id ? 'my' : 'your'}
								>
									{msg.body}
									<span>{new Date(msg.created_at).toLocaleTimeString()}</span>
								</div>
							))
						)}
					</div>


					{/* Форма отправки сообщения (активна только когда выбран чат) */}
					{chatUser && (
						<div className="textfield">
							<form onSubmit={sendMessage}>
								<div>
										<textarea
											value={data.body}
											onChange={(e) => setData('body', e.target.value)}
											placeholder="Введите сообщение..."
											disabled={processing}
										/>
								</div>
								<div>
									<button type="submit" disabled={processing}>
										Отправить
									</button>
								</div>
							</form>
						</div>
					)}
				</div>)
			}
		</Authenticated>
	);
}
