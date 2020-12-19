# Airline-Reservation-System

## Guide

### Database setup

#### Windows

Install [postgresql](https://www.postgresql.org/) in the local machine and setup correctly. Use following command to login to the `psql` shell as postgres user.Use the following command on terminal

```bash
psql -U postgres
```

 Then enter below commands.

```sql
CREATE ROLE database_app WITH LOGIN PASSWORD 'password';
CREATE DATABASE airline_reservation_db;
GRANT ALL PRIVILEGES ON DATABASE airline_reservation_db TO database_app;
\q
```

Then login to `psql` as `database_app`.

```bash
psql -U database_app airline_reservation_db
```

Download `database` directory from this repo and then in the shell,
import the current DDL and DML schema. Here give the full path to the schema

```sql
\i 'C:/Users/.../database/schema.sql'
\q
```

Login to pgAdmin (Search on start) using the username and password used in the installation process of postgres.


Then rclick Server>postgres>Databases and check for `airline_reservation_db`. The expand it go to Schemas>Tables>Test>rclick>View edit data>All rows

Now you are done with the database setup.

#### Apple

 Hope the same method works. Good Luck! :stuck_out_tongue_winking_eye:

### Node.js setup

First clone this project directory.

```bash
git clone https://github.com/Lakshan-Banneheke/Airline-Reservation-System.git
```

Install

* [node.js](https://nodejs.org/en/)
* [npm](https://www.npmjs.com/get-npm)
* [nodemon](https://www.npmjs.com/package/nodemon)



 After that go to the project directory and run `npm install`.

```bash
cd directory/project
npm install
```

Then create a `.env` file in the root with following content.
You may change database user/password/secret as you may wish.

```text
DATABASE_URL=postgres://database_app:password@localhost:5432/airline_reservation_db

SESSION_SECRET=database
PORT=3000
SERVER_ADDRESS=127.0.0.1
```

Then use `nodemon` or `node` to serve the pages.

```bash
nodemon start # If nodemon is installed
node index.js # otherwise
```

Now visit <http://localhost:3000/> and confirm that site is running.

### VS Code Setup

Install `ESLint` library.

Edit settings and set `editor.detectIndentation` to `false`.

Use material icon theme extension for a nice view of folders :) 
