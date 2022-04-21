import Message from './Message/Message';
import './style.css';

export default function MessageList() {
	return (
		<div className='message-list'>
			<div className='list'>
				<Message />
				<Message />
				<Message />
				<Message />
				<Message />
			</div>
			<div className='nav'>
				<button className='rounded'>prev</button>
				<div className='rounded'>page II</div>
				<button className='rounded'>next</button>
			</div>
		</div>
	);
}
