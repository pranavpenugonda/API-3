const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const app = express();
app.use(express.json());
const dbPath = path.join(__dirname, "todoApplication.db");

let db = null;
module.exports = app;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};
initializeDBAndServer();

//API 1  sc-1
app.get("/todos/", async (request, response) => {
  const { status } = request.query;
  const getTodosQuery = `
    SELECT
      *
    FROM
     todo;`;
  const todosArray = await db.all(getTodosQuery);
  response.send(todosArray);
});

// API 1 sc-2
app.get("/todos/", async (request, response) => {
  const { priority } = request.query;
  const getPriorityTodosQuery = `
    SELECT
      *
    FROM
     todo
    WHERE
      priority = '${priority}';`;
  const priorityTodosArray = await db.all(getPriorityTodosQuery);
  response.send(priorityTodosArray);
});

// API 1 sc-3
app.get("/todos/", async (request, response) => {
  const { priority, status } = request.query;
  const getPriorityAndStatusTodosQuery = `
    SELECT
      *
    FROM
     todo
    WHERE
      priority = '${priority}' AND status = '${status}';`;
  const priorityAndStatusTodosArray = await db.all(
    getPriorityAndStatusTodosQuery
  );
  response.send(priorityAndStatusTodosArray);
});

// API 1 sc-4
app.get("/todos/", async (request, response) => {
  const { search_q } = request.query;
  const getPlayTodosQuery = `
    SELECT
      *
    FROM
     todo
    WHERE
      todo like '${search_q}';`;
  const getPlayTodosArray = await db.all(getPlayTodosQuery);
  response.send(getPlayTodosArray);
});
