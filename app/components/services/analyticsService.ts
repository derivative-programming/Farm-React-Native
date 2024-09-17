
import { reconnectWhenOnline, startConnection, stopConnection, CollectDataFromClient } from "./analytics/signalr";

export const start = () => {
    try {
        startConnection(); 
        reconnectWhenOnline(); 
    } catch (error) {
        console.log(error);
    }
}
export const stop = () => {
    stopConnection();
}

export const sendClientAnalyticsData = (data:string) => {
    CollectDataFromClient(data);
}
 