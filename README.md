# Basic Node.js API
This is a basic structure for a Node.js REST API where you can use it as a start point for your netxt project.

## Project Structure
/controllers # Handles request/response logic 
/routes # API routes 
/middleware # Custom middleware (e.g., JWT functions) 
/services # Business logic (e.g., mailer) 
/helpers # Utility functions 
server.js # Main entry point 
.env # Environment variables 
package.json # Project metadata and dependencies 
README.md # Project documentation

## Prerequisites
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node package manager)
- [MySQL](https://www.mysql.com/) (Database)

## Setup
1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/my-node-api.git
    cd my-node-api
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file in the root directory with your environment variables:
    ```
    PORT=5000
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=your_mysql_password
    DB_NAME=mydatabase
    ```
4. Set up your MySQL database:
    - Create a new MySQL database:

        ```sql
        CREATE DATABASE mydatabase;
        ```
    - Optionally, add some initial tables or data.

## Running the API
- Start the server:
    ```bash
    npm start
    ```
- Start in development mode with **nodemon**:
    ```bash
    npm run dev
    ```
The API will be running on `http://localhost:5000`.

## Main Folders
- **/controllers**: Handles request and response logic.
- **/routes**: Defines API endpoints.
- **/services**: Contains business logic and interacts with MySQL.
- **/middleware**: Custom middleware (e.g., authentication, logging).
- **/helpers**: Reusable utility functions.

## Example Routes
- `GET /api/users`: Get all users
- `POST /api/users`: Create a new user

## Dependencies
- **[express](https://expressjs.com/)**: Web framework for Node.js.
- **[mysql2](https://www.npmjs.com/package/mysql2)**: MySQL client for Node.js.
- **[dotenv](https://www.npmjs.com/package/dotenv)**: Loads environment variables from a `.env` file.
- **[nodemon](https://nodemon.io/)**: (Dev dependency) Automatically restarts the server on file changes.

## Environment Variables
Make sure to configure the following in your `.env` file:
| Variable       | Description                         |
| -------------- | ----------------------------------- |
| `PORT`         | The port number the server will run on (default: 5000) |
| `DB_HOST`      | MySQL database host (default: `localhost`) |
| `DB_USER`      | MySQL database user |
| `DB_PASSWORD`  | MySQL database password |
| `DB_NAME`      | Name of the MySQL database |
