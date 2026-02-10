import Api from "../../helpers/Api";

const api = Api.getInstance();

export const handleError = (error: string) => {
    return () => {
        console.log(error);
        window.location.href = '/oops';
    }
}

export const handleErrorWithoutRedirect = (error: string) => {
  return () => {
    console.log(error)
  };
};

export const sendMessageToBackend = (error: string, useRedirect: boolean = true) => {
  return (dispatch : Function) => {
      api.post('/explorer/v1/error', error)
      .then(() => {
        if (useRedirect) {
          dispatch(handleError(error));
        } else {
          dispatch(handleErrorWithoutRedirect(error));
        }
      });
  }

};