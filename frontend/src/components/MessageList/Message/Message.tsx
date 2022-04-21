import './style.css';

export interface IMessage {
	sender: string;
	timestamp: Date;
	message: string;
	likes: number;
}

export default function Message({
	sender,
	timestamp,
	message,
	likes,
}: IMessage) {
	return (
		<div className='message text-bubble shadow'>
			<div>
				<b className='sender'>{sender}</b>
				<p className='date'>
					{new Date(timestamp).toLocaleDateString()}
				</p>
				<p>{message}</p>
			</div>
			<button className='like-button rounded'>{likes} 💜</button>
		</div>
	);
}
