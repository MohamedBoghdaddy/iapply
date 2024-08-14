import { deleteEmployee } from "../controller/EmployeeController.js";

export const handler = async (event) => {
  const employeeId = event.queryStringParameters.employeeId;

  try {
    await deleteEmployee(employeeId);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Employee deleted successfully" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
