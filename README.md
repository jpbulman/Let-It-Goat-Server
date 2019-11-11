# Let-It-Goat-Server

To set up, clone the repository and in the folder, run `yarn install`. When this is complete, you can run `yarn start-dev`. 

Using a tool like Postman, you can send a POST request to `localhost:3000/login` with a body of the following format:

```
{
    "username":"your-username",
    "password":"your-password"
}
```

Be sure to set the content-type to JSON (in Postman, under "Body", select "raw" and then on the left dropdown select "JSON").

After your request has been sent, you will get a response that looks like this:

If your credentials are wrong...
```
{
    "auth": false
}
```

If your credentials are right...
```
{
    "auth": true,
    "name": "Matthew T. McMillan"
}
```
