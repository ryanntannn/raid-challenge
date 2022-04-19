import React from 'react';
import usePopup from '../../components/PopupBox/PopupBox';
import './style.css';

export default function LandingPage() {
	const MESSAGE_MAX_LENGTH = 200;
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

	function onClickSend() {
		const senderName = customName.length > 0 ? customName : defaultName;
		popup.showMessage!(
			`sent message successfully: [${senderName}] ${message}`
		);
	}

	return (
		<div className='landing page center'>
			<div className='content'>
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
					cols={40}
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
		</div>
	);
}
