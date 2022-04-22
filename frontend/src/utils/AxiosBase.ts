import axios, { AxiosInstance } from 'axios';

//const Endpoint = 'http://localhost:42069';
//const Endpoint = 'https://tonvo.net/';
const Endpoint: string = process.env.BACKEND_URL || 'http://localhost:42069';
const AxiosBase: AxiosInstance = axios.create({
	baseURL: Endpoint,
});

export default AxiosBase;

export { AxiosBase, Endpoint };
