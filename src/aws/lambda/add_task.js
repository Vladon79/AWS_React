const AWS = require("aws-sdk")
const ddb = new AWS.DynamoDB.DocumentClient()

exports.handler = ({ title, date, type, isChecked }, context, callback) => {
	if (!title | !date) throw new Error()
	try {
		const id = context.awsRequestId
		const createTaskInDB = createTask(id, title, date, isChecked, type)
		if (createTaskInDB) {
			callback(null, {
				statusCode: 201,
				body: { id, info: "Created task !" }
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

function createTask(id, title, date, isChecked, type) {
	const params = {
		TableName: "Todolist",
		Item: {
			id,
			title,
			date,
			isChecked,
			type
		}
	}
	return ddb.put(params).promise()
}
