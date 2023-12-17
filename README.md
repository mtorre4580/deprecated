# is-deprecated

A utility library designed to notify about deprecated functions or methods within objects.

<img  width="128" height="128" src="https://github.com/mtorre4580/deprecated/blob/main/deprecated.png?raw=true" />

## Installation

```
npm i @mtorre4580/is-deprecated
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

<img alt="example usage" src="https://github.com/mtorre4580/deprecated/blob/main/example_usage.png?raw=true" />

### With Function

```js
import deprecated from "@mtorre4580/is-deprecated";

// Function to add the deprecated helper
const myFunction = (arg1, arg2) => {};

// Basic config
const config = {
  message:
    "myFunction will be removed in the next release, please replace with this https://www.npmjs.com",
};

// Create the wrapper to use
const deprecatedMyFunction = deprecated(myFunction, config);

// Call the wrapper function to see the warning
deprecatedMyFunction('', {});
```

### With Function in Object

```js
import deprecated from "@mtorre4580/is-deprecated";

// Object to apply the deprecated method
const API = {
  timeout: 5000,
  getUsers() {
    return new Promise((resolve) => {
      setTimeout(() => {
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

- To building time use the jsdoc decorator [@deprecated](https://jsdoc.app/tags-deprecated) in the code
- To runtime use the function from this lib `deprecated` to notify in the console
- The sendMetrics function allows to get more insight what app is using the deprecated method to notify the team
- You can use any environment variable to apply the wrapper or not, if you only need to run in development or staging