import { useEffect, useState, useContext } from "react"; 
// import SQLite from 'react-native-sqlite-storage';
import uuid from 'react-native-uuid';
import { SubscribeDBContext } from "../context/subscribeDB-context";
import { ANALYTICS_DBNAME, ANALYTICS_DBTABLE } from "../constants/dbName"; 
import { sendClientAnalyticsData } from "../components/services/analyticsService";
import AsyncStorage from '@react-native-async-storage/async-storage';
//import "fake-indexeddb/auto";

type TAnalyticsEvent = {
  messageType: string;
  controlName: string; 
  sourceObjectName: string;
  param1: string; 
  description: string;
};
function useAnalyticsDB() {
  const [db, setDB] = useState<any>(null);
  const { updateDB } = useContext(SubscribeDBContext);
   
  const contextCode: string = "00000000-0000-0000-0000-000000000000";


  // SQLite.enablePromise(true); // Optional: Enable promise API for more straightforward async/await usage

  // const database = SQLite.openDatabase(
  //   { name: "analytics.db", location: "default" },
  //   () => console.log("Database opened"),
  //   error => console.error("Error opening database", error)
  // );

  // const createTable = async () => {
  //   try {
  //     const db = await SQLite.openDatabase({ name: 'analytics.db', location: 'default' });
  //     await db.executeSql(`CREATE TABLE IF NOT EXISTS ${ANALYTICS_DBTABLE} (...);`);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const addDB = async (event) => {
  //   try {
  //     const db = await SQLite.openDatabase({ name: 'analytics.db', location: 'default' });
  //     await db.executeSql(`INSERT INTO ${ANALYTICS_DBTABLE} (column1, column2, ...) VALUES (?, ?, ...);`, [value1, value2, ...]);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  useEffect(() => {
    (async function () {
      // const data = await connectDB;
      // setDB(data);
    })();
  }, []);

  // const connectDB = openDB(ANALYTICS_DBNAME, 1, {
  //   upgrade(db) {
  //     db.createObjectStore(ANALYTICS_DBTABLE, {
  //       autoIncrement: true,
  //     });
  //   },
  // });

  const getIsRowDB = async () => {
    const arrKeys = await db.getAllKeys(ANALYTICS_DBTABLE);
    return !!arrKeys.length;
  };
  const clearDB = () => { 
    db.getAll(ANALYTICS_DBTABLE).then((allObjs: any[]) => {
      allObjs.forEach(item => {  
        sendClientAnalyticsData(JSON.stringify(item));
      });
    })
    db.clear(ANALYTICS_DBTABLE);
  };
  const addDB = (event: TAnalyticsEvent) => {
    const customerCode = AsyncStorage.getItem("customerCode");
    const appName = "React Native";
    const dbData = {
        ...event, 
        pageContextCode: contextCode,
        id: uuid.v4(), 
        eventUTCDateTime: 
        new Date().toISOString(), 
        customerCode: customerCode,
        appName: appName,
        hostName: "",//window.location.hostname, 
        pathName: "",//window.location.pathname, 
      }
    if(!!db){
      db.add(ANALYTICS_DBTABLE, dbData);
      updateDB();
    }
  };
  const logClick = (controlName: string, sourceObjectName: string, param1: string) => {
    //console.log('logClick ' + controlName + ' ' + sourceObjectName + ' ' + param1);
    const eventData = { 
      messageType: "UI Click", 
      controlName: controlName,  
      sourceObjectName: sourceObjectName, 
      param1: param1,  
      description: "Click", 
    }
    addDB(eventData);
  };
  
  const logInitStartEvent = (controlName: string) => {
    console.log('logInitStartEvent ' + controlName);
    const eventData = { 
      messageType: "event", 
      controlName: 'Init Start ' + controlName,  
      sourceObjectName: "", 
      param1: "",  
      description: "", 
    }
    addDB(eventData);
  }
  
  const logInitCompleteEvent = (controlName: string) => {
    console.log('logInitCompleteEvent ' + controlName);
    const eventData = { 
      messageType: "event", 
      controlName: 'Init Complete ' + controlName,  
      sourceObjectName: "", 
      param1: "",  
      description: "", 
    }
    addDB(eventData);
  }

  const logEvent = (eventName:string) => {
    console.log('logEvent ' + eventName);
    const eventData = { 
      messageType: "event", 
      controlName: eventName,  
      sourceObjectName: "", 
      param1: "",  
      description: "", 
    }
    addDB(eventData);
  }
  

  const logInternetConnectionLost = () => { 
    logEvent("InternetConnectionLost");
  }
  
  const logInternetConnectionRegained = () => { 
    logEvent("logInternetConnectionRegained"); 
  }

  return { db, getIsRowDB, clearDB, addDB, logClick, logInternetConnectionLost, logInternetConnectionRegained,
    logInitStartEvent,logInitCompleteEvent };
}
export default useAnalyticsDB;
