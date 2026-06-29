import type { station } from './types';

export const MOCK_STATIONS: station[] = [
  {
    id: 'station-001',
    name: 'Koramangala Hub',
    location: 'Bangalore, KA',
    chargers: [
      { id: 'c-001', label: 'Charger A', status: 'available', powerKw: 50 },
      { id: 'c-002', label: 'Charger B', status: 'charging', powerKw: 50 },
      { id: 'c-003', label: 'Charger C', status: 'faulted', powerKw: 22 },
      { id: 'c-0032', label: 'Charger AC', status: 'faulted', powerKw: 42 },
    ],
  },
  {
    id: 'station-002',
    name: 'Whitefield Edge Node',
    location: 'Bangalore, KA',
    chargers: [
      { id: 'c-004', label: 'Charger A', status: 'available', powerKw: 150 },
      { id: 'c-005', label: 'Charger B', status: 'offline', powerKw: 150 },
    ],
  },
  {
    id: 'station-003',
    name: 'HSR Layout Station',
    location: 'Bangalore, KA',
    chargers: [
      { id: 'c-006', label: 'Charger A', status: 'charging', powerKw: 50 },
      { id: 'c-007', label: 'Charger B', status: 'charging', powerKw: 50 },
      { id: 'c-008', label: 'Charger C', status: 'available', powerKw: 22 },
    ],
  },
  {
    id: 'station-004',
    name: 'HJR Layout Station',
    location: 'Bangalore, KA',
    chargers: [
      { id: 'c-009', label: 'Charger A', status: 'charging', powerKw: 50 },
      { id: 'c-0010', label: 'Charger B', status: 'charging', powerKw: 50 },
      { id: 'c-0011', label: 'Charger C', status: 'available', powerKw: 22 },
      { id: 'c-0012', label: 'Charger D', status: 'available', powerKw: 22 },
      { id: 'c-0013', label: 'Charger E', status: 'charging', powerKw: 24 },
      { id: 'c-0014', label: 'Charger F', status: 'faulted', powerKw: 26 },
    ],
  },
];
