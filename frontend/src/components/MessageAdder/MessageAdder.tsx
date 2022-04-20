import React from 'react';
import usePopup from '../../components/PopupBox/PopupBox';
import AxiosBase from '../../utils/AxiosBase';
import './style.css';

export default function MessageAdder() {
	const MESSAGE_MAX_LENGTH = 50;
	const NAME_MAX_LENGTH = 20;
	const [message, setMessage] = React.useState<string>('');
	const [defaultName, setDefaultName] = React.useState<string>(
		`annonymous-${Math.round(Math.random() * 100)}`
	);
	const [customName, setCustomName] = React.useState<string>('');

	const popup = usePopup();

	function onNameChange(event: React.ChangeEvent<HTMLInputElement>) {
		setCustomName((prevValue) => {
			if (event.target.value.length > NAME_MAX_LENGTH) return prevValue;
			return event.target.value;
		});
	}

	function onMessageChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
		setMessage((prevValue) => {
			if (event.target.value.length > MESSAGE_MAX_LENGTH)
				return prevValue;
			return event.target.value;
		});
	}

	function isButtonDisabled() {
		return message.length <= 0;
	}

	async function onClickSend() {
		try {
			const senderName = customName.length > 0 ? customName : defaultName; //Use default name if custom name is not specified
			const res = await AxiosBase.post('/new-message', {
				sender: senderName,
				message,
			});
			console.log(res);
			popup.showMessage!(
				`added message successfully: [${senderName}] ${message}`
			);
		} catch (err) {
			popup.showMessage!(`${err}`);
		}
	}

	return (
		<div className='message-adder'>
			<h1>msngr</h1>
			<div className='name-input-area'>
				from:{' '}
				<input
					className='rounded shadow'
					placeholder={defaultName}
					value={customName}
					onChange={onNameChange}></input>
			</div>
			<textarea
				className='text-bubble shadow'
				name='Text1'
				rows={5}
				value={message}
				placeholder='write a message here'
				onChange={onMessageChange}></textarea>
			<div className='word-count'>
				{message.length}/{MESSAGE_MAX_LENGTH}
			</div>
			<br />
			<button
				className='rounded send-button'
				disabled={isButtonDisabled()}
				onClick={onClickSend}>
				send
			</button>
		</div>
	);
}
