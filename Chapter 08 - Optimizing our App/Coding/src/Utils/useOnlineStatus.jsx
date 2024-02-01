import React,{useState,useEffect} from 'react'

const useOnlineStatus = () => {
    const [onlineStatus, setOnlineStatus] = useState(true);
    const handleOnline = () => {
        setOnlineStatus(true);
    }
    const handleOffline = () => {
        setOnlineStatus(false);
    }
    //we just want trigger the event listener once so we use useE
    useEffect(() => {
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        }
    }, []);

  return onlineStatus;
}

export default useOnlineStatus