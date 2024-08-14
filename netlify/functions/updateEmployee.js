import { updateEmployee } from "../controller/EmployeeController.js";

export const handler = async (event) => {
  const employeeId = event.queryStringParameters.employeeId;
  const body = JSON.parse(event.body);

  try {
    const updatedEmployee = await updateEmployee(employeeId, body);
    return {
      statusCode: 200,
      body: JSON.stringify(updatedEmployee),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
