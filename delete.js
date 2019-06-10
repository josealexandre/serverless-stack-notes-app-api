import * as dynamoDb from './libs/dynamodb-lib'
import { success, failure } from './libs/response-lib'

export async function main(event, context) {
    const params = {
        TableName: 'notes',
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: event.pathParameters.id
        }
    }

    try {
        await dynamoDb.call('delete', params)
        return success({ status: true })
    } catch (err) {
        return failure({ status: false })
    }
}
