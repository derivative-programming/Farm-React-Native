import { HttpTransportType, HubConnection, HubConnectionBuilder, HubConnectionState } from "@microsoft/signalr";
import AsyncStorage from '@react-native-async-storage/async-storage';
import urlParse from 'url-parse';

let connection: any = null;
export const startConnection = async () => { 
    console.log("Signalr startConnection...")
    const connectionId = await AsyncStorage.getItem("customerCode");
    if (connectionId) {
        const customUrl = new urlParse('https://dp-farm-pageapi.azurewebsites.net/analytics-hub');
        const url = 'https://dp-farm-pageapi.azurewebsites.net/analytics-hub'; 
        console.log("Signalr startConnection building connection...");
        
        try {
            const pathname = customUrl.pathname;
            console.log("Pathname..." + pathname);
            connection = new HubConnectionBuilder()
            .withUrl(url, {
                transport: HttpTransportType.WebSockets,
            })
            .withAutomaticReconnect()
            .build();
        } catch (error) {
            console.error("Connection failed to build:", error);
        }
 
        try {
            console.log("Signalr startConnection connection.start()...");
            await connection.start(); // Use await here too
            connection.invoke('SetConnectionId', connectionId);
            console.log("Signalr startConnection completed");
        } catch (error) {
            console.error("Connection failed to start:", error);
        }
        // connection.start()
        // .then( () => { 
        //     connection.invoke('SetConnectionId', connectionId); 
        // }); 
 
        connection.on('ReceiveMessage', (user: any, message: any) => {
            console.log(message);
        });


    }
} 

export const stopConnection = async () => { 
    console.log("Signalr stopConnection...")
    if (connection) {
        return connection.stop();
    }
}

export const reconnectOnRefresh = async () => {
    console.log("Signalr reconnectOnRefresh...")
    window.addEventListener('beforeunload', () => {
        stopConnection()
            .then(async () => {
                await startConnection();
            })
            .catch((error: any) => console.error(error));
    });
}

export const reconnectWhenOnline = async () => {
    console.log("Signalr reconnectWhenOnline...")
    window.addEventListener('online', async () => {
        await startConnection();
    });
} 

export const CollectDataFromClient = async(data:string) => {  
    console.log("Signalr CollectDataFromClient...")
    if (connection && connection.state == HubConnectionState.Connected) { 
        connection.invoke('CollectDataFromClient', data);

        return;
    }
}
 