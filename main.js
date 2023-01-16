const express = require("express");
const bodyParser = require("body-parser");
const pg = require('pg');

const config = {
  user: 'users_db_ctmj_user',
  database: 'users_db_ctmj',
  password: 'bKfnmwZZ1UHdwKnwmDC6K6vMBQxZkg7e',
  host: 'dpg-cf2a3lo2i3mnjcn7hlhg-a.oregon-postgres.render.com',
  port: 5432,
  ssl: true,
  idleTimeoutMillis: 30000
}

const client = new pg.Pool(config)

// Modelo
class UserModel {
  constructor() {
    this.users = [];
  }

  async getUsers(){
    const res = await client.query('select * from users;')
    return res.rows
  }

  async addUser(nombre, edad) {
    const query = 'INSERT INTO users(nombrecompleto, edad) VALUES($1, $2) RETURNING *';
    const values = [nombre, edad]
    const res = await client.query(query, values)
    return res;
  }

  async editUser(index, nombre, edad) {
    const query = `update "users" set "nombrecompleto" = $1, "edad"= $2 where "id" = $3`;
    return await client.query(query, [nombre, edad, index]);
    
  }

  async deleteUser(index) {
    const query = `delete from "users" where "id" = $1`;
    await client.query(query, [index]);
  }

  async promedioEdad() {
    const users = await this.getUsers();
    const total = users.length;

    return users.reduce((a,b) => a + b.edad, 0)/total;
  }
  
  staus() {
    return {
      nameSystem: "api-users",
      version: "0.0.1",
      developer: "Rolando Diego Alvarez Faye",
      email: "rolandoalvarezfaye@gmail.com"
    }
  }
}

// Controlador
class UserController {
  constructor(model) {
    this.model = model;
  }

  async getUsers() {
   return await this.model.getUsers();
  }

  async addUser(nombre, edad) {
    await this.model.addUser(nombre, edad);
  }

  editUser(index, nombre, edad) {
    this.model.editUser(index, nombre, edad);
  }

  async deleteUser(index) {
    await this.model.deleteUser(index);
  }

  async promedioEdad() {
    return await this.model.promedioEdad();
  }

  staus() {
    return this.model.staus();
  }
}

// Vistas (Rutas)
const app = express();
const userModel = new UserModel();
const userController = new UserController(userModel);

app.use(bodyParser.json());

app.get("/users",async  (req, res) => {
  const response = await userController.getUsers()
  res.json(response)
});

// Vistas (Rutas) (continuación)
app.post("/users", (req, res) => {
  const nombre = req.body.nombre;
  const edad = req.body.edad;

  userController.addUser(nombre, edad);
  res.sendStatus(200);
});

app.put("/users/:index", (req, res) => {
  const index = req.params.index;
  const nombre = req.body.nombre;
  const edad = req.body.edad;
  userController.editUser(index, nombre, edad);
  res.sendStatus(200);
});

app.delete("/users/:index", (req, res) => {
  const index = req.params.index;
  userController.deleteUser(index);
  res.sendStatus(200);
});

app.get("/promedio/", async(req, res) => {
  const response = await userController.promedioEdad();
  res.json(response)
});

app.get("/status/", (req, res) => {
  const response = userController.staus();
  res.json(response)
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
