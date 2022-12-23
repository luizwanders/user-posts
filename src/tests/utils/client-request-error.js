import { InternalError } from './internal-error'

export class ClientRequestError extends InternalError {
  constructor(message) {
    super(`Client request error: ${message}`)
  }
}
