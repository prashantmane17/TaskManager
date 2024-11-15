import api from './api';

/**
 * Adds a task to the database.
 * @param {Object} taskData - The task data to add.
 * @returns {Object} The response data from the API.
 */
export const addTaskDb = async (taskData) => {
  try {
    const response = await api.post('/addTask', taskData); // Ensure this endpoint matches your API route
    return response.data;
  } catch (error) {
    console.error('Error adding task:', error);
    throw error;
  }
};

/**
 * Retrieves all tasks from the database.
 * @returns {Array} A list of tasks from the API.
 */
export const getTasksDB = async () => {
  try {
    const response = await api.get('/getTasks'); // Ensure this matches your API route
    return response.data.tasks; // Make sure the API response includes `tasks`
  } catch (error) {
    console.error('Error getting tasks:', error); // Corrected typo
    throw error;
  }
};
