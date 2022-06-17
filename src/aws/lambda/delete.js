const AWS = require("aws-sdk")
const ddb = new AWS.DynamoDB.DocumentClient()

exports.handler = async ({ id }, context, callback) => {
	try {
		const deleteTaskInDB = await deleteParams(id)
		if (deleteTaskInDB) {
			callback(null, {
				statusCode: 201,
				body: { id, info: "Delete task !" }
			})
		} else {
			callback(null, {
				statusCode: 402,
				body: { errorMessage: "Something is wrong" }
			})
		}
	} catch (error) {
		callback(null, {
			statusCode: 402,
			body: { info: "Your data in body incorrect" }
		})
	}
}

const deleteParams = (id) => {
	const params = {
		TableName: "Todolist",
		Key: { id }
	}
	return ddb.delete(params).promise()
}

