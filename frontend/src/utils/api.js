// src/utils/api.js
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

// Add new memory
export const addMemory = (memoryData) => API.post('/api/memories', memoryData);

// Get all memories
export const getMemories = () => API.get('/api/memories');
