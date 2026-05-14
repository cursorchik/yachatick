import {User} from './User'
import {UserData} from './types'

const mockUsers: UserData[] = [
	{
		name: 'Petrushka',
		img: 'src/static/images/pes.jpg',
		messages: [
			{ owner: true, message: 'Привет', time: '13:00' },
			{ owner: true, message: 'Как дела user 1?', time: '13:00' },
			{ owner: false, message: 'Все норм', time: '13:00' }
		]
	},
	{
		name: 'Oleg13',
		img: 'src/static/images/pes.jpg',
		messages: [
			{ owner: true, message: 'Привет', time: '13:00' },
			{ owner: true, message: 'Как дела user 2?', time: '13:00' },
			{ owner: false, message: 'Все норм', time: '13:00' }
		]
	},
	{
		name: 'Evgen',
		img: 'src/static/images/pes.jpg',
		messages: [
			{ owner: true, message: 'Привет', time: '13:00' },
			{ owner: true, message: 'Как дела user 3?', time: '13:00' },
			{ owner: false, message: 'Все норм', time: '13:00' }
		]
	},
	{
		name: 'Igor',
		img: 'src/static/images/pes.jpg',
		messages: [
			{ owner: true, message: 'Привет', time: '13:00' },
			{ owner: true, message: 'Как дела user 4?', time: '13:00' },
			{ owner: false, message: 'Все норм', time: '13:00' }
		]
	},
	{
		name: 'Nezumi',
		img: 'src/static/images/pes.jpg',
		messages: [
			{ owner: true, message: 'Привет', time: '13:00' },
			{ owner: true, message: 'Как дела user 5?', time: '13:00' },
			{ owner: false, message: 'Все норм', time: '13:00' }
		]
	}
]

export class Chat
{
	protected button: JQuery;
	protected textarea: JQuery;
	protected messageContainer: JQuery;
	protected usersContainer: JQuery;
	protected infoContainer: JQuery;

	protected activeUser: User | null;
	protected users: Set<User>;

	constructor()
	{
		this.button = $('div.textfield > div > button');
		this.button.on('click', () => this.sendMessage());

		this.textarea = $('div.textfield > div > textarea');
		this.messageContainer = $('div.right > div.messages');
		this.usersContainer = $('div.left > div.userlist');
		this.infoContainer = $('div.right > div.info');

		this.activeUser = null;
		this.users = new Set();

		this.init();
	}

	protected init()
	{
		for (const userData of mockUsers)
		{
			const user: User = new User(userData, this.usersContainer, this.messageContainer);
			user.appendSideEffect((data: UserData) =>
			{
				for (const user of [...this.users]) user.deativate();
				this.infoContainer.text(data.name);
				this.activeUser = user;
			})
			this.users.add(user);
		}
	}

	protected sendMessage()
	{
		if (!this.activeUser) return;
		if (!this.textarea) return;

		const date = new Date();
		const preZero = (value: number) => value < 10 ? '0' + value : value;

		const value = this.textarea?.val()?.toString() ?? '';
		const time = preZero(date.getHours()) + ':' + preZero(date.getMinutes());

		const myMessage = $('<div class="my"/>').text(value);
		this.messageContainer.append(
			myMessage.append(
				$('<span/>', {text: time})
			)
		);

		this.activeUser.addMessage(value, time)
	}
}