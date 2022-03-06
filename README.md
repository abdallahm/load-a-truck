# load-a-truck

### Installation
- Install NodeJs v12+
- Run `git clone git@github.com:abdallahm/load-a-truck.git`
- Run `cd load-a-truck && yarn` command
- Create `.env` file for mongodb credentionals:
  ```
  DB_HOST=localhost:27017
  DB_USER=root
  DB_PASS=root
  DB_NAME=mydb
  ```

### Dev Server

 ```bash
yarn dev
```
  
### Production

 ```bash
yarn build && yarn start
```

### Tests
- Create `.env.test` file for test mongodb credentionals
- Run `yarn test` command
