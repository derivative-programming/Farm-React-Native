import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";

function useNavigatorOnline() {
  const [isOnline, setIsOnline] = useState<boolean>(true); // Default is true for initialization

  useEffect(() => {
    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOnline(state.isConnected && state.isInternetReachable);
    });

    // Unsubscribe when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  return isOnline;
}

export default useNavigatorOnline;