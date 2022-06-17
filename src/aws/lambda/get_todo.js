const AWS = require("aws-sdk")
const ddb = new AWS.DynamoDB.DocumentClient()

exports.handler = async ({ page, pageCount, filter, sort, findByName, findMethod }, context, callback) => {
	try {
		const tasksCount = await ddb
			.scan({ TableName: "Todolist" })
			.promise()
			.then((data) => data.Count)
		const todolist = await getTodolist(page, pageCount, filter, sort, findByName, findMethod)
		let sortName
		if (sort === "AscName") {
			sortName = (a, b) => (a.title < b.title ? 1 : -1)
		} else if (sort === "DescName") {
			sortName = (a, b) => (a.title > b.title ? 1 : -1)
		} else if (sort === "AscData") {
			sortName = { data: -1 }
		} else if (sort === "DescData") {
			sortName = { data: 0 }
		} else if (sort === "") {
			sortName = null
		}
		sortName !== null && todolist.Items.sort(sortName)
		if (todolist) {
			callback(null, {
				statusCode: 200,
				body: { page, pageCount, tasksCount, todolist, info: "Todolist" }
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

function getTodolist(page, pageCount, filter, sort, findByName, findMethod) {
	let check
	if (filter === "Active") {
		check = false
	} else if (filter === "Completed") {
		check = true
	} else {
		check = null
	}
	let findMethodFilter
	if (findMethod === "Equals") findMethodFilter = "BEGINS_WITH"
	if (findMethod === "Contains") findMethodFilter = "CONTAINS"

	let params

	check === null
		? (params = {
				TableName: "Todolist",
				Limit: pageCount,
				ScanFilter:
					!findMethod && !findByName
						? null
						: {
								title: {
									ComparisonOperator: findMethodFilter,
									AttributeValueList: [findByName]
								}
						  }
		  })
		: (params = {
				TableName: "Todolist",
				Limit: pageCount,
				FilterExpression: "isChecked=:check",
				ExpressionAttributeValues: { ":check": check },
				ScanFilter:
					!findMethod && !findByName
						? null
						: {
								title: {
									ComparisonOperator: findMethodFilter,
									AttributeValueList: [findByName]
								}
						  }
		  })
	return ddb.scan(params).promise()
}
