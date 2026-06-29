import { useEffect } from 'react';
import { Alert } from 'react-native';
import { io } from 'socket.io-client';
import { useStationStore } from '@/store/stationStore';
import { station } from '@/types';

const socket = io('https://native-project-ev-stations.onrender.com');

// use your pc ip to see faster updates for now:  http://10.184.54.91:4000

socket.off('stations:init');
socket.off('charger:statusChanged');
socket.off('charger:isFreeNow');
socket.off('charger:notifyRegistered');

socket.on('stations:init', (data: station[]) => {
  useStationStore.getState().setStations(data);
});

socket.on('charger:statusChanged', ({ 
  stationId,
  chargerId,
  status,
}: {
  stationId: string;
  chargerId: string;
  status: station['chargers'][number]['status'];
}) => {
  useStationStore.getState().updateChargerStatus(stationId, chargerId, status);
});

// Shown when a charger the user subscribed to becomes free
socket.on('charger:isFreeNow', ({
  chargerLabel,
  stationName,
}: {
  stationId: string;
  chargerId: string;
  chargerLabel: string;
  stationName: string;
}) => {
  Alert.alert(
    '⚡ Charger is Free!',
    `${chargerLabel} at ${stationName} is now available. Go grab it!`,
    [{ text: 'OK' }]
  );
});

// notification Alert from here !
socket.on('charger:notifyRegistered', ({
  chargerId,
}: {
  stationId: string;
  chargerId: string;
}) => {
  Alert.alert( 
    '🔔 You\'re on the list!',
    `We'll notify you as soon as this charger becomes free.`,
    [{ text: 'Got it' }]
  );
}); 

export function useSocket() {
  useEffect(() => {
    const onConnect = () => {
      console.log('Connected to server:', socket.id);
    };

    const onDisconnect = () => {
      console.log('Disconnected from server');
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  return socket;
}

export { socket };

