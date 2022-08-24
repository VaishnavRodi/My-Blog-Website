# My-Blog-Website

Vaishnav's blog website made with node, express, mongo and ejs.

After cloning, change database name in app.js if you want, mine is blogDB. first command in root directory:

npm install

Open two tabs in terminal, 1 for mongodb and one for nodemon. in one tab:

nodemon app.js

In second tab of terminal, If using nodemon and throws an error such as MongooseServerSelectionError: connect ECONNREFUSED ::1:27017

Use mongod command with ipv6 flag:

mongod --ipv6

Enjoy!
