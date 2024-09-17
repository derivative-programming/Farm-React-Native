import { HttpTransportType, HubConnection, HubConnectionBuilder, HubConnectionState } from "@microsoft/signalr";
import config from '../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo'; // For detecting online status

let connection: HubConnection | null = null;

export const startConnection = async () => {
    const connectionId = await AsyncStorage.getItem("customerCode");
    if (connectionId) {
        const url = new URL(config.apiBaseUrl + '/analytics-hub');
        connection = new HubConnectionBuilder()
            .withUrl(url.toString(), {
                transport: HttpTransportType.WebSockets,
            })
            .withAutomaticReconnect()
            .build();

        connection.start()
        .then(() => {
            if (connection) {
                connection.invoke('SetConnectionId', connectionId);
            }
        });

        connection.on('ReceiveMessage', (user: string, message: string) => {
            console.log(message);
        });
    }
}

export const stopConnection = (): Promise<void> => {
    if (connection) {
        return connection.stop();
    }
    return Promise.resolve();
}

// Replace window event listener with React Native's NetInfo for reconnections
export const reconnectWhenOnline = () => {
    NetInfo.addEventListener(state => {
        if (state.isConnected) {
            startConnection();
        }
    });
}

// For data collection, similar logic
export const CollectDataFromClient = async (data: string) => {
    if (connection && connection.state === HubConnectionState.Connected) {
        await connection.invoke('CollectDataFromClient', data);
    }
}
