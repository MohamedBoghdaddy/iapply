const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

exports.handler = async function (event, context) {
  try {
    const userId = event.queryStringParameters.id;
    await client.connect();
    const database = client.db("your-database-name");
    const users = database.collection("users");
    const user = await users.findOne({ _id: userId });

    if (user) {
      return {
        statusCode: 200,
        body: JSON.stringify(user),
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "User not found" }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  } finally {
    await client.close();
  }
};
