import { CanceledError } from 'axios';

export abstract class AbstractSchema {
  handleResponseException?: (error: Error) => void;
  handleRequestException?: (error: Error) => void;
}

export const abstract: AbstractSchema = {
  handleResponseException (error: Error) {
    // handle check status
    // handle abort
    /**
     * TODO...
     */

    // handle error
    error instanceof CanceledError
      ? console.log(`%cabort exception ${JSON.stringify(error)}`, 'color: pink;')
      : console.log('response error', error);
  },

  handleRequestException (error: Error) {
    // handle error
    console.log('request error', error);
  }
};
