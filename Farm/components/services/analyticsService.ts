
import { reconnectOnRefresh, reconnectWhenOnline, startConnection, stopConnection, CollectDataFromClient } from "./analytics/signalr";

export const start = async () => {
    await startConnection();
    await reconnectOnRefresh();   
    await reconnectWhenOnline(); 
}
export const stop = async () => {
    await stopConnection();
}

export const sendClientAnalyticsData = async (data:string) => {
    await CollectDataFromClient(data);
}
 