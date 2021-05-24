# merng-social-media
This social media web app is developed via MERNG stack a fun project

## TODOs
Fix Loading lags 
Fix dependency errors
Add chat app feature


## Explanation of the codes 
To know how to read the codes, please familiarise yourself with react-redux.

We chose graphql to connect to Mongo because it's pretty simplified. The calls and queries are pretty simplified and things work by mutations instead of endpoints.


## Making a contribution!
1. Fork the repository
2. Commit changes to the forked repository 
3. Submit a pull request for me to review and merge

## How to develop locally
1. Clone the repository 
2. Download the latest node from the official node website
3. Go to the CLI and type ``cd client``
4. Go to the same CLI and type ``npm i``
5. On the same CLI type ``npm start``
6. Your client should be up and running

## Some potential bug fixes from the tutorial 
1. Destructuring of the data. Please add the extra part of 
``data: {getPosts} = {}``
2. Watch our for synchronous functions when it comes to destructuring the data. Take a look at this [issue](https://github.com/hidjou/classsed-graphql-mern-apollo/issues/28)
3. Mongodb in config.js remore the write=true at the end of the url to prevent write errors

### Tutorial Reference
[FreeCodeCamp MERNG Stack tutorial](https://www.youtube.com/watch?v=n1mdAPFq2Os&t=14433s)
