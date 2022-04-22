import React from 'react';
import AxiosBase from '../../../utils/AxiosBase';
import './style.css';

export interface IMessage {
	_id: string;
	sender: string;
	timestamp: Date;
	message: string;
	likes: number;
}

export default function Message({
	_id,
	sender,
	timestamp,
	message,
	likes,
}: IMessage) {
	const [isLiked, setIsLiked] = React.useState<boolean>(false);

	async function likeMessage() {
		const res = await AxiosBase.post('/like-message', {
			messageId: _id,
		});
		if (res.status != 200) return;
		setIsLiked(true);
	}

	return (
		<div className='message text-bubble shadow' key={_id}>
			<div>
				<b className='sender'>{sender}</b>
				<p className='date'>
					{new Date(timestamp).toLocaleDateString()}
				</p>
				<p>{message}</p>
				{/* <p style={{ fontSize: 10, lineHeight: 2 }}>{_id}</p> */}
			</div>
			<button
				className='like-button rounded'
				disabled={isLiked}
				onClick={likeMessage}>
				{likes + (isLiked ? 1 : 0)} {isLiked ? '💜' : '🖤'}
			</button>
		</div>
	);
}
