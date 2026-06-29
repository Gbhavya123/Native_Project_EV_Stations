export type charger = {
  id: string;
  label: string;
  status: 'available' | 'charging' | 'faulted' | 'offline' | 'pending';
  powerKw: number;
};

export type station = {
  id: string;
  name: string;
  location: string;
  chargers: charger[];
};
