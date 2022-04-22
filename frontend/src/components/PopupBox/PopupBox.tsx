import React, { createContext, FC, useContext } from 'react';
import './style.css';

type Props = {
	children: React.ReactNode;
};

interface IPopupBoxContext {
	showMessage?: (msg: string) => Promise<null>;
}

const PopupBoxContext = createContext<IPopupBoxContext>({});

export function PopupBoxProvider({ children }: Props) {
	const [visible, setVisible] = React.useState<boolean>(false);
	const [message, setMessage] = React.useState<string>('');
	const messageRef = React.useRef(message);
	messageRef.current = message;

	const popupBox: IPopupBoxContext = {
		showMessage(msg: string) {
			return new Promise((res, rej) => {
				setVisible(true);
				setMessage(msg);
				setTimeout(() => {
					console.log(messageRef.current);
					if (messageRef.current != msg) return rej(null);
					setVisible(false);
					return res(null);
				}, 3000);
			});
		},
	};

	return (
		<PopupBoxContext.Provider value={popupBox}>
			{children}
			<div className={`popup rounded ${visible ? 'visible' : ''}`}>
				{message}
			</div>
		</PopupBoxContext.Provider>
	);
}

export default function usePopup() {
	return useContext(PopupBoxContext);
}
