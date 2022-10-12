import { ApolloError } from '@apollo/client'

type GraphQLErrorInfo =
  | {
      code: string
      statusCode: number
      message: string
      isNetworkError: false
    }
  | {
      isNetworkError: true
      message: string
    }

export function extractInfoFromGraphQLError(
  error: ApolloError,
): GraphQLErrorInfo {
  if (error.networkError) {
    let message = 'Network error'

    if (error.networkError?.message === 'Failed to fetch') {
      message = 'Cannot connect to server'
    }
    return {
      isNetworkError: true,
      message,
    }
  }

  const { message } = error
  const { code, status: statusCode } = error.graphQLErrors[0].extensions as {
    code: string
    status: number
  }

  return {
    code,
    statusCode,
    message,
    isNetworkError: false,
  }
}
