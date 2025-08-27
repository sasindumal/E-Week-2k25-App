import axios from 'axios';
import { Platform } from 'react-native';

// Set this to your server base URL. If running on a physical device, use your machine's LAN IP.
// Example: http://192.168.1.10:3001
const DEFAULT_BASE_URL = 'http://localhost:3001';

const baseURL = process.env.EXPO_PUBLIC_API_BASE_URL || DEFAULT_BASE_URL;

const api = axios.create({
  baseURL: `${baseURL}/api`,
  timeout: 15000,
});

// Generic helpers
export const get = async (path, params) => {
  const res = await api.get(path, { params });
  return res.data;
};

export const post = async (path, body) => {
  const res = await api.post(path, body);
  return res.data;
};

// Domain-specific endpoints used by the app
export const fetchHealth = () => get('/health');
// Events (server-backed)
export const fetchEvents = (query) => get('/createEvents/getEvents', query);
export const fetchUpcomingEvents = () => get('/createEvents/UpcomingEvents');
export const fetchLiveEvents = () => get('/createEvents/LiveEvents');
export const fetchFinishedEvents = () => get('/createEvents/FinishedEvents');
export const fetchEventById = (id) => post('/createEvents/getEventsById', { eventId: id });
export const registerForEvent = (payload) => post('/register', payload);
export const fetchDemoLeaderboard = () => get('/leaderboard');

// Existing server leaderboard route
export const fetchLiveLeaderboard = () => get('/LeaderBoard/getLeaderBoard');

export default api;


