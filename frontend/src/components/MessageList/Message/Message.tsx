import './style.css';

export default function Message() {
	return (
		<div className='message text-bubble shadow'>
			<div>
				<b>sender</b>
				<p>13 Apr 2022</p>
				<p>message</p>
			</div>
			<button className='like-button rounded'>1💜</button>
		</div>
	);
}
