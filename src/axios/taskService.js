import api from './api';

export const addTaskDb = async (taskData) => {
  try {
    const response = await api.post('/addTask', taskData);
    return response.data;
  } catch (error) {
    console.error('Error adding task:', error);
    throw error;
  }
};
