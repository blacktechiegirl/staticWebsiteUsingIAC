import { CognitoUserPool } from 'amazon-cognito-identity-js'

const userPoolData = {
    UserPoolId: "us-east-1_1MMsogDdv",
    ClientId: "5u86pgsfqdqdo0grf47ujivqll"
}

export default new CognitoUserPool(userPoolData)