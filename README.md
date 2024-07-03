# Node Boilerplate Typescript

- This repo is boilerplate for typescript and nodejs projects

## What is included

- Server with express
- Security Packages
  - [hpp](https://www.npmjs.com/package/hpp) - Express middleware to protect against HTTP Parameter Pollution attacks
  - [helmet](https://www.npmjs.com/package/helmet) - Helmet helps secure Express apps by setting HTTP response headers.
- File uploading
- Sending Emails
- Logging
  - By default it is configured to log on console but you can extend it to write to any file as well
- Object(s) Validation using zod
- Error Handling
- Express Req object extend with typescript support

## Routing

- The base path for api will be `api`.
- Any folder you put inside modules folder that container `routes.ts` file will be added to express router stack and that will be route for the api as well.
- So suppose if you make folder something like `modules/v1/file/routes.ts` then all the routes defined in that `routes.ts` file will be registered and will be available at `domain/api/modules/v1/file`.
- So think like routing as a file based routing.
- You must export router as default export from `routes.ts` file to make this happen.

## Error handling

- You can alway use try catch in your controllers to handle errors by your self, but here I have used different approach.
- Just wrap your any controller/middleware that receives express's `req,res` object wrap them in `PromiseHandler` function and this will handle the rest of the stuff.
- Also you can create custom errors in error folder as per your requirement and handle it in `handleApiError` according the way you want.
