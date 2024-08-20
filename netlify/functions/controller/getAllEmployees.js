// netlify/functions/getAllEmployees.js
import { getAllEmployees } from "./EmployeeController.js";

export const handler = async (event) => {
  try {
    const data = await getAllEmployees();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
