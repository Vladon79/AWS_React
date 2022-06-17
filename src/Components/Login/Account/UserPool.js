import { CognitoUserPool } from "amazon-cognito-identity-js"

const poolData = {
	UserPoolId: "eu-central-1_pE3u4Umw3",
	ClientId: "1gofiog21tgpcu2i82l6pdd2bc"
}

 export default new CognitoUserPool(poolData)
