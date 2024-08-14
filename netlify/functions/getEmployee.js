import { getEmployee } from "./controller/EmployeeController.js";

export const handler = async (event) => {
  const employeeId = event.queryStringParameters.employeeId;

  try {
    const employee = await getEmployee(employeeId);
    return {
      statusCode: 200,
      body: JSON.stringify(employee),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
