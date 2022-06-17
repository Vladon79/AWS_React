const AWS = require("aws-sdk")
const ddb = new AWS.DynamoDB.DocumentClient()

exports.handler = async ({ page, pageCount, filter, sort, findByName, findMethod }, context, callback) => {
	try {
		const tasksCount = await ddb
			.scan({ TableName: "Todolist" })
			.promise()
			.then((data) => data.Count)
		const firstElementsThisPage = Number(page) === 1 ? null : Number(page) * Number(pageCount) - (Number(pageCount) + 1)
		const firsID =
			firstElementsThisPage === null
				? null
				: await ddb
						.scan({ TableName: "Todolist" })
						.promise()
						.then((data) => data.Items[firstElementsThisPage].id)
		const todolist = await getTodolist(page, pageCount, filter, sort, findByName, findMethod, firsID)
		let sortName
		if (sort === "AscName") {
			sortName = (a, b) => (a.title > b.title ? 1 : -1)
		} else if (sort === "DescName") {
			sortName = (a, b) => (a.title < b.title ? 1 : -1)
		} else if (sort === "AscData") {
			sortName = (a, b) => b.date - a.date
		} else if (sort === "DescData") {
			sortName = (a, b) => b.date - a.date
		} else if (sort === "") {
			sortName = null
		}
		sortName !== null && todolist.Items.sort(sortName)
		if (todolist) {
			callback(null, {
				statusCode: 200,
				body: { firstElementsThisPage, page, pageCount, tasksCount, todolist, info: "Todolist" }
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

function getTodolist(page, pageCount, filter, sort, findByName, findMethod, firsID) {
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
	const StartKey =
		firsID === null
			? null
			: {
					id: firsID
			  }

	check === null
		? (params = {
				TableName: "Todolist",
				Limit: pageCount,
				ExclusiveStartKey: StartKey,
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
				ExclusiveStartKey: StartKey,
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
	