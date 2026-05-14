const messagesData: { [key: string]: {img: string, messages: {owner: boolean, message: string}[]} } = {
	'User 1': {
		img: 'src/static/images/pes.jpg',
		messages: [
			{ owner: true, message: 'Привет' },
			{ owner: true, message: 'Как дела user 1?' },
			{ owner: false, message: 'Все норм' }
		]
	},
	'User 2': {
		img: 'src/static/images/pes.jpg',
		messages: [
			{ owner: true, message: 'Привет' },
			{ owner: true, message: 'Как дела user 2?' },
			{ owner: false, message: 'Все норм' }
		]
	},
	'User 3': {
		img: 'src/static/images/pes.jpg',
		messages: [
			{ owner: true, message: 'Привет' },
			{ owner: true, message: 'Как дела user 3?' },
			{ owner: false, message: 'Все норм' }
		]
	},
	'User 4': {
		img: 'src/static/images/pes.jpg',
		messages: [
			{ owner: true, message: 'Привет' },
			{ owner: true, message: 'Как дела user 4?' },
			{ owner: false, message: 'Все норм' }
		]
	},
	'User 5': {
		img: 'src/static/images/pes.jpg',
		messages: [
			{ owner: true, message: 'Привет' },
			{ owner: true, message: 'Как дела user 5?' },
			{ owner: false, message: 'Все норм' }
		]
	}
}

export class Chat
{
	protected button: JQuery;
	protected textarea: JQuery;
	protected messageContainer: JQuery;
	constructor()
	{
		this.textarea = $('div.textfield > div > textarea');
		this.button = $('div.textfield > div > button');
		this.messageContainer = $('div.right > div.messages');
		this.button.on('click', () => this.sendMessage());
	}

	protected sendMessage()
	{
		if (!this.textarea) return;
		const date = new Date();
		const preZero = (value: number) => value < 10 ? '0' + value : value;

		console.log(this.textarea.val());


		const myMessage = $('<div class="my"/>').text(this.textarea?.val()?.toString() ?? '');
		this.messageContainer.append(
			myMessage.append(
				$('<span/>', {text: preZero(date.getHours()) + ':' + preZero(date.getMinutes())})
			)
		);
	}
}