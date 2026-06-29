import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { MOCK_STATIONS } from './mockStations';
import type { station } from './types';

const app = express();
app.use(cors());

const server = createServer(app);

const io = new Server(server, {
  cors: { origin: '*' },
});

const stations: station[] = JSON.parse(JSON.stringify(MOCK_STATIONS));

// Map key: "stationId::chargerId"  =>  Set of socket IDs waiting for notification
const notifySubscribers = new Map<string, Set<string>>();

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.emit('stations:init', stations);

  socket.on('charger:free', ({ stationId, chargerId }) => {
    const station = stations.find((s) => s.id === stationId);
    const charger = station?.chargers.find((c) => c.id === chargerId);

    if (charger && charger.status === 'charging') {
      charger.status = 'available';
      io.emit('charger:statusChanged', {
        stationId,
        chargerId,
        status: 'available',
      });

      // Notify all subscribers waiting for this charger
      const key = `${stationId}::${chargerId}`;
      const subscribers = notifySubscribers.get(key);
      if (subscribers && subscribers.size > 0) {
        const chargerLabel = charger.label ?? chargerId;
        const stationName = station?.name ?? stationId;
        subscribers.forEach((subscriberSocketId) => {
          io.to(subscriberSocketId).emit('charger:isFreeNow', {
            stationId,
            chargerId,
            chargerLabel,
            stationName,
          });
        });
        // Clear subscribers after notifying
        notifySubscribers.delete(key);
        console.log(`Notified ${subscribers.size} subscriber(s) that charger ${chargerId} is free`);
      }
    }
  });

  socket.on('charger:book', ({ stationId, chargerId }) => {
    const station = stations.find((s) => s.id === stationId);
    const charger = station?.chargers.find((c) => c.id === chargerId);

    if (charger && charger.status === 'available') {
      charger.status = 'charging';
      io.emit('charger:statusChanged', {
        stationId,
        chargerId,
        status: 'charging',
      });
    }
  });

  socket.on('charger:notifyWhenFree', ({ stationId, chargerId }) => {
    const key = `${stationId}::${chargerId}`;
    if (!notifySubscribers.has(key)) {
      notifySubscribers.set(key, new Set());
    }
    notifySubscribers.get(key)!.add(socket.id);
    console.log(`User ${socket.id} subscribed to notifications for charger ${chargerId} at station ${stationId}`);

    // Acknowledge subscription to the requesting client
    socket.emit('charger:notifyRegistered', { stationId, chargerId });
  });

  // Clean up subscriptions when user disconnects
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    notifySubscribers.forEach((subscribers) => {
      subscribers.delete(socket.id);
    });
  });
});

server.listen(4000, () => {
  console.log('Server running on port 4000');
});
