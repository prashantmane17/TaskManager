

import api from './api';

export const addMember = async (taskData) => {
  try {
    const response = await api.post('/teamMember/createMember', taskData); 
    return response.data;
  } catch (error) {
    console.log('Error adding task:', error);
    throw error;
  }
};

export const getMember = async () => {
  try {
    const response = await api.get('/teamMember/getMember'); 
    return response.data.members; 
  } catch (error) {
    console.log('Error getting tasks:', error); 
    throw error;
  }
};
