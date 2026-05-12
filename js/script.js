$(() =>
{
	const textarea = $('div.textfield > div > textarea');
	const button = $('div.textfield > div > button');
	const messageContainer = $('div.right > div.messages');
	button.on('click', () =>
	{
		const date = new Date();
		const preZero = (value) => value < 10 ? '0' + value : value;

		console.log(textarea.val());


		const myMessage = $('<div class="my"/>').text(textarea.val());
		messageContainer.append(
			myMessage.append(
				$('<span/>', {text: preZero(date.getHours()) + ':' + preZero(date.getMinutes())})
			)
		);
	})
})