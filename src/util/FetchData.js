import { toastr } from 'react-redux-toastr';
import axios from 'axios';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

const METHOD_GET = 'get';

class FetchData {
  static get(url, requestParams) {
    return FetchData.makeRequest(url, METHOD_GET, null, requestParams);
  }

  static makeRequest(url, method, body, reqParams) {
    const requestParams = {
      method: method || METHOD_GET,
      data: body,
      params: {
        ...(reqParams || {}),
      },
    };

    return FetchData.sendRequest(url, requestParams);
  }

  static requestFailed(reason) {
    if (reason.message) {
      toastr.error(reason.message, reason.response
        && reason.response.data && reason.response.data.message);
    } else {
      toastr.error('Error', 'An error has occurred');
    }
  }

  static sendRequest(url, requestParams) {
    return new Promise((resolve, reject) => {
      axios(url, requestParams)
        .then(result => resolve(result.data))
        .catch((reason) => {
          FetchData.requestFailed(reason);
          reject(reason);
        });
    });
  }
}

export default FetchData;
