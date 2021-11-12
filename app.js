const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const app = express();
const db = require("./db/connection");
const mysql = require("mysql2");
const connection = require("./db/connection");

//Utilizamos para ver a conexão com o banco de dados

connection.ping(function (err) {
  if (err) throw err;
  console.log("Server respondendo por ping");
});

// ENGINE USADA PARA PODER LER UM CODIGO HTML COM NODE JS
// MODULO USADO O EJS

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

// E NECESSÁRIO PARA OS FORM
app.use(express.urlencoded({ extended: false }));

//Body Parser Utilizado no Form
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// COM ESTE RECURSO ENCONTRAMOS A PASTA AONDE VAMOS PUXAR OS HTML
app.use(express.static(path.join(__dirname, "views")));

// RECURSO USADO PARA RODAR O SERVER COM O NPM RUN DEV
app.listen(3000, () => {
  console.log(`Rodando... - Porta 3000 `);
});

// ROTAS
// AQUI IRÁ FICAR TODAS AS NOSSAS ROTAS DE ARQUIVOS

// ROTAS DE VIZUALIZAÇÃO DO HTML

app.get("/funcionario", (req, res) => {
  res.render("employee_registration");
});

app.get("/cliente", (req, res) => {
  res.render("register_customer");
});

app.get("/view", (req, res) => {
  res.render("viewcustomer");
});

// ROTAS DE ISERÇÃO DE DADOS NO FORM

app.post("/cliente", (req, res) => {
  let id_cli = Math.round(Math.random() * 999999);
  let nome = req.body.nome;
  let CPF = req.body.cpf_cli;
  let endereco = req.body.endereco_cli;
  let number = req.body.number_cli;
  let cep = req.body.cep_cli;

  let cmd_insert = `insert into cliente (id_cliente, name, cpf , endereco , number , cep ) values ('${id_cli}', '${nome}', '${CPF}', '${endereco}', '${number}', '${cep}')`;

  db.query(cmd_insert, (error, result) => {
    if (error) {
      return res.status(400).send(error);
    } else {
      return res.status(201).send(" Contato salvo! ");
    }
  });
});

app.post("/funcionario", (req, res) => {
  let id_func = Math.round(Math.random() * 999999);
  let nome_func = req.body.nome_func;
  let email_func = req.body.email_func;
  let phone_func = req.body.phone_func;
  let cpf_func = req.body.cpf_func;
  let nasc_func = req.body.nasc_func;
  let endereco_func = req.body.endereco_func;
  let number_func = req.body.number_func;
  let cep_func = req.body.cep_func;
  let sexo_tipo = req.body.sexo_tipo;
  let cargo_tipo = req.body.cargo_tipo;

  let cmd_insert_func = `insert into funcionario ( id_func , nome, email , telefone , cpf , data_nascimento , endereco , numero , cep , sexo , cargo ) values ( '${id_func}','${nome_func}','${email_func}','${phone_func}','${cpf_func}','${nasc_func}','${endereco_func}','${number_func}','${cep_func}','${sexo_tipo}','${cargo_tipo}' )`;

  db.query(cmd_insert_func, (error, result) => {
    if (error) {
      return res.status(400).send(error);
    } else {
      return res.status(201).send(" Contato salvo! ");
    }
  });
});

app.post("/pedido", (req, res) => {
  let Cod = Math.round(Math.random() * 9999);
  let Nome = req.body.Nome_Item;
  let Valor = req.body.Val_Item;

  let cmd_insert_func = `insert into dude.pizzas (Cod_Item , Nome_Item , Val_Item  ) values ( '${Cod}' , '${Nome}','${Valor}' )`;

  db.query(cmd_insert_func, (error, result) => {
    if (error) {
      return res.status(400).send(error);
    } else {
      return res.status(201).send(" Produto salvo! ");
    }
  });
});


// ROTAS DE VIZUALIZAÇÃO DOS FORM

app.get("/viewcli", (req, res) => {
  let cmd_select = `select * from cliente`;

  db.query(cmd_select, (error, result) => {
    if (error) {
      return res.status(400).send(error);
    } else {
      return res.status(201).send(result);
    }
  });
});

// ROTAS DE VIZUALIZAÇÃO DOS FORM

app.get("/viewfunc", (req, res) => {
  let cmd_select = `select * from funcionario`;

  db.query(cmd_select, (error, result) => {
    if (error) {
      return res.status(400).send(error);
    } else {
      return res.status(201).send(result);
    }
  });
});

// ROTAS DE VIZUALIZAÇÃO DOS FORM

app.get("/viewped", (req, res) => {
  let cmd_select = `select * from pizzas`;

  db.query(cmd_select, (error, result) => {
    if (error) {
      return res.status(400).send(error);
    } else {
      return res.status(201).send(result);
    }
  });
});

// 101362 <-- ID CLIENTE DE EXEMPLO

app.get("/especview", (req, res) => {
  let id = req.body.id;

  let cmd_select_especview = `select * from cliente where id_cliente = ${id}`;

  db.query(cmd_select_especview, (error, result) => {
    if (error) {
      return res.status(400).send(error);
    } else {
      return res.status(201).send(result);
    }
  });
});

// 701750 <-- ID CLIENTE DE EXEMPLO

app.get("/funcview", (req, res) => {
  let id = req.body.id;

  let cmd_select_especview = `select * from funcionario where id_func = ${id}`;

  db.query(cmd_select_especview, (error, result) => {
    if (error) {
      return res.status(400).send(error);
    } else {
      return res.status(201).send(result);
    }
  });
});

// 6679 <-- PRODUTO COD

app.get("/prodview", (req, res) => {

  let id = req.body.id;

  let cmd_select_especview = `select * from pizzas where Cod_Item = ${id}`;

  db.query(cmd_select_especview, (error, result) => {
    if (error) {
      return res.status(400).send(error);
    } else {
      return res.status(201).send(result);
    }
  });
});