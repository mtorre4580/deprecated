# is-deprecated

A utility library designed to notify about deprecated functions or methods within objects.

## Installation

```
npm i is-deprecated
```

## Parameters

- obj (Object|Function): The object or function to check for deprecation.

- config (Object): Configuration object with the following properties:
  - method (String): The method name to be deprecated within the object.
  - message (String): Custom deprecation message (default: 'This will be deprecated soon').
  - logger (Object): Logger object for warning messages (default: console).
  - sendMetrics (Function): Function to send metrics upon deprecation (default: empty function).

## Usage

Function to notify about deprecation and wrap the function/method with deprecation warnings.

### With Function

```js
import deprecated from "is-deprecated";

// Function to add the deprecated helper
const myFunction = (arg1, arg2) => {};

// Basic config
const config = {
  message:
    "myFunction will be removed in the next release, please replace with this https://www.npmjs.com",
};

// Create the wrapper to use
const deprecatedMyFunction = deprecated(fn, config);

// Call the wrapper function to see the warning
deprecatedMyFunction(arg1, arg2);
```

### With Function in Object

```js
import deprecated from "is-deprecated";

// Object to apply the deprecated method
const API = {
  timeout: 5000,
  getUsers() {
    return new Promise((resolve, reject) => {
      setTimeOut(() => {
        resolve([
          { id: 2, name: "Matias" },
          { id: 3, name: "Belen" },
        ]);
      }, 1000);
    });
  },
  getUsersV2() {},
};

// Basic config
const config = {
  message: "getUsers is deprecated in the next release, please with getUsersV2",
  method: "getUsers",
};

// Create the wrapper to use
const APIWithDeprecated = deprecated(API, config);

// Call the wrapper function to see the warning
const users = await APIWithDeprecated.getUsers();
```

## Best Practices

- To building time use the decorator `@deprecated` to notify that the method is deprecated in the docs
- To runtime use the function from this lib `deprecated` to notify in the console
- The sendMetrics function allows to get more insight what app / micro frontend / api is using the deprecated lib to notify
- You can use any env variable to apply the wrapper or not to avoid validation only for development, staging environment