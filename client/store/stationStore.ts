import { create } from 'zustand';
import { station, charger } from '@/types';

interface StationStore {
  stations: station[];
  setStations: (stations: station[]) => void;
  updateChargerStatus: (stationId: string, chargerId: string, status: charger['status']) => void;
}

export const useStationStore = create<StationStore>((set) => ({
  stations: [],
  setStations: (stations) => set({ stations }),
  updateChargerStatus: (stationId, chargerId, status) =>
    set((state) => ({
      stations: state.stations.map((s) =>
        s.id === stationId ? {
          ...s, chargers: s.chargers.map((c) =>
            c.id === chargerId ? { ...c, status } : c
          ),
        } : s
      ),
    })),
}));
