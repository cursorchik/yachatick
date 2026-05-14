import {UserData} from './types'

export class User
{
	protected isActive: boolean;
	protected data: UserData;
	protected sideEffects : ((data: UserData) => void)[];
	protected element : JQuery;
	constructor(data: UserData, userContainer: JQuery, messageContainer: JQuery)
	{
		this.isActive = false;
		this.data = data;
		this.sideEffects = [];

		this.element = $('<div/>')
			.append($(`<img src="${this.data.img}" width="36" height="36" alt="Аватар"/>`))
			.append(data.name)
			.on('click', () => {
				if (this.isActive) return false;
				this.isActive = true;
				this.activate(messageContainer);
				this.element.addClass('act');
			});
		userContainer.append(this.element);
	}

	public appendSideEffect(effect: (data: UserData) => void)
	{
		this.sideEffects.push(effect)
	}

	public activate(target: JQuery)
	{
		target.html('');
		target.append(
			this.data.messages.map(data =>
			{
				return (data.owner ?
					$('<div/>', { class: 'my', text: data.message }) :
					$('<div/>', { class: 'your', text: data.message })).append(
						$('<span/>', { text: data.time })
					)
			})
		);
		for (const sideEffect of this.sideEffects)
		{
			sideEffect(this.data);
		}
	}

	addMessage(value: string, time: string)
	{
		this.data.messages.push({owner: false, message: value, time: time});
	}

	deativate()
	{
		this.isActive = false;
		this.element.removeClass('act');
	}
}