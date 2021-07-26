
export const sendApmError = (server,request,error) => {
    const { message, stack } = error;
    let err = {
        method: request.routerMethod,
        path: request.routerPath,
        param: request.body,
        message,
        stack
    };
    server.apm.captureError(err);
};