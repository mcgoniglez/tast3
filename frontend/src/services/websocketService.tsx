import { store } from '../store';
import { addNotification } from '../store/notificationSlice';

const ws = new WebSocket('wss://your-api-endpoint/ws/notifications');

ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  store.dispatch(addNotification(message));
};

export default ws;
