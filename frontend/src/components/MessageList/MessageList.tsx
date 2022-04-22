import React from 'react';
import AxiosBase from '../../utils/AxiosBase';
import Message, { IMessage } from './Message/Message';
import './style.css';

export default function MessageList() {
	const [messages, setMessages] = React.useState<IMessage[] | null>(null);
	const [pageNumber, setPageNumber] = React.useState<number>(1);

	function renderMessages(messages: IMessage[]) {
		if (messages.length <= 0)
			return <h3 className='no-left'>no messages left</h3>;
		return messages.map((message, i) => (
			<Message {...message} key={i + pageNumber * 4} />
		));
	}

	async function onGetMessages(_pageNumber: number) {
		try {
			const res = await AxiosBase.get('/messages', {
				params: { page: _pageNumber },
			});
			if (res.status != 200) return;
			console.log(res.data);
			setMessages(res.data);
			setPageNumber(_pageNumber);
			console.log(res);
		} catch (err) {}
	}

	React.useEffect(() => {
		if (messages != null) return;
		onGetMessages(1);
	}, []);

	return (
		<div className='message-list'>
			<h3 className='mobile-show title'>fifty.io</h3>
			<div className='list'>
				{messages != null ? (
					renderMessages(messages)
				) : (
					<h1>loading...</h1>
				)}
			</div>
			<div className='nav'>
				<button
					className='rounded'
					disabled={pageNumber <= 1}
					onClick={() => onGetMessages(pageNumber - 1)}>
					prev
				</button>
				<div className='rounded'>page {pageNumber}</div>
				<button
					className='rounded'
					onClick={() => onGetMessages(pageNumber + 1)}>
					next
				</button>
			</div>
		</div>
	);
}
