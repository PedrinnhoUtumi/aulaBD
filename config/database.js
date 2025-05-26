const { Pool } = require('pg');
//dotenv server para que possamos armazenar as nossas variáveis de ambiente que não desejamos deixar disponível para o público ao realizar um commit.
const dotenv = require('dotenv');

dotenv.config();

// Conexão com a Base de Dados:
const pool = new Pool({
  connectionString: process.env.CONNECTION_STRING
});

pool.on('connect', () => {
  console.log('Base de Dados conectado com sucesso!');
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};