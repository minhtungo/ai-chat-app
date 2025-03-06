import type { AxiosError } from 'axios';

export function handleError(
  error: unknown,
  fallbackMessage = 'An error occurred',
): string {
  // Handle Axios errors
  if (
    error &&
    typeof error === 'object' &&
    'isAxiosError' in error &&
    error.isAxiosError
  ) {
    const axiosError = error as AxiosError;

    // Check if we have response data from the server
    if (axiosError.response?.data) {
      const responseData = axiosError.response.data;

      if (typeof responseData === 'object') {
        if (
          'errors' in responseData &&
          Array.isArray(responseData.errors) &&
          responseData.errors.length > 0
        ) {
          return responseData.errors[0].toString();
        }

        if (
          'message' in responseData &&
          typeof responseData.message === 'string'
        ) {
          return responseData.message;
        }

        const errorString = JSON.stringify(responseData);
        if (errorString !== '{}') {
          return errorString;
        }
      }

      if (typeof responseData === 'string') {
        return responseData;
      }
    }

    // Fallback to HTTP status-based messages if we couldn't extract from response data
    if (axiosError.response) {
      const status = axiosError.response.status;
      switch (status) {
        case 400:
          return 'Invalid request. Please check your information.';
        case 401:
          return 'Authentication required. Please log in again.';
        case 403:
          return "You don't have permission to perform this action.";
        case 404:
          return 'The requested resource was not found.';
        case 422:
          return 'Validation failed. Please check your input.';
        case 500:
          return 'Server error. Please try again later.';
        default:
          return `Server error (${status}). Please try again.`;
      }
    }

    // Network error without response
    if (!axiosError.response) {
      return 'Network error. Please check your internet connection.';
    }
  }

  if (
    error &&
    typeof error === 'object' &&
    'message' in error &&
    typeof error.message === 'string'
  ) {
    return error.message;
  }

  return fallbackMessage;
}
