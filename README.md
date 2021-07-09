# Test reflect-metadata

## Summary

import "reflect-metadata" -> cause error

//import "reflect-metadata" -> comment it out then it works normally.


## Test step
* npm run dev
* open browser and input the address:

  http://localhost:5001/posts

  * src/app.ts

    **//import "reflect-metadata";**

    You will see the normal response 
    `transfer executes!`

  * src/app.ts

    **import "reflect-metadata";**

    You will see error:

    ```
    Error: Invalid params
    at new JSONRPCError (/home/jiuhong/node_modules/@open-rpc/client-js/build/Error.js:24:28)
    at Object.exports.convertJSONToRPCError (/home/jiuhong/node_modules/@open-rpc/client-js/build/Error.js:37:16)
    at TransportRequestManager.processResult (/home/jiuhong/node_modules/@open-rpc/client-js/build/transports/TransportRequestManager.js:84:31)
    at TransportRequestManager.resolveRes (/home/jiuhong/node_modules/@open-rpc/client-js/build/transports/TransportRequestManager.js:106:18)
    at TransportRequestManager.resolveResponse (/home/jiuhong/node_modules/@open-rpc/client-js/build/transports/TransportRequestManager.js:46:25)
    at HTTPTransport.<anonymous> (/home/jiuhong/node_modules/@open-rpc/client-js/build/transports/HTTPTransport.js:107:68)
    at step (/home/jiuhong/node_modules/@open-rpc/client-js/build/transports/HTTPTransport.js:46:23)
    at Object.next (/home/jiuhong/node_modules/@open-rpc/client-js/build/transports/HTTPTransport.js:27:53)
    at fulfilled (/home/jiuhong/node_modules/@open-rpc/client-js/build/transports/HTTPTransport.js:18:58)
    at processTicksAndRejections (node:internal/process/task_queues:96:5)
    ```
