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

export const getTasksDB = async () => {
  try {
    const response = await api.get('/getTask'); 
    return response.data.tasks; 
  } catch (error) {
    console.log('Error getting tasks:', error); 
    throw error;
  }
};

export const updateTasksDB = async (id,taskData) => {
  try {
    const response = await api.put(`/tasks/${id}`,taskData); 
    return response.data; 
  } catch (error) {
    console.log('Error getting tasks:', error); 
    throw error;
  }
};

export const deleteTaskDb = async (id) => {
  try {
    const response = await api.delete(`/tasks/${id}`); 
    return response.data; 
  } catch (error) {
    console.log('Error getting tasks:', error); 
    throw error;
  }
};


