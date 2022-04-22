import MessageAdder from '../../components/MessageAdder/MessageAdder';
import MessageList from '../../components/MessageList/MessageList';
import './style.css';

export default function LandingPage() {
	return (
		<div className='landing page center'>
			<MessageList />
			<MessageAdder />
		</div>
	);
}
