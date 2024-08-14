import { createEmployee } from "./controller/EmployeeController.js";

export const handler = async (event) => {
  const body = JSON.parse(event.body);

  try {
    const newEmployee = await createEmployee(body);
    return {
      statusCode: 201,
      body: JSON.stringify(newEmployee),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
