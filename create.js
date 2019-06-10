import uuid from 'uuid'
import { failure, success } from './libs/response-lib'
import * as dynamoDb from './libs/dynamodb-lib'

export async function main(event, context) {
    // Request body is passed in as a JSON encoded string in 'event.body';
    const data = JSON.parse(event.body)

    const params = {
        TableName: 'notes',
        // 'Item' contains the attributes of the item to be created
        // - 'userId': user identities are federated through the
        // Cognito Identity Pool, we will use the identity id
        // as the user id of the authenticated user
        Item: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: uuid.v1(),
            content: data.content,
            attachment: data.attachment,
            createdAt: Date.now()
        }
    }

    try {
        await dynamoDb.call('put', params)

        return success(JSON.stringify(params.Item))
    } catch (err) {
        return failure(JSON.stringify({ status: false }))
    }
}
