import * as SQLite from "expo-sqlite";

const DATABASE_NAME = "MATCHER.sqlite";

const SQL_CREATE_ENTRIES = [
    `CREATE TABLE IF NOT EXISTS PESSOAS (
        ID_PESSOA INTEGER PRIMARY KEY autoincrement,
        USER VARCHAR(255) NOT NULL,
        EMAIL VARCHAR(255) NOT NULL,
        PASSWORD VARCHAR(255) NOT NULL,
        IMG_PESSOA BLOB
      )`,
      `CREATE TABLE IF NOT EXISTS PRODUTOS (
        ID_PRODUT INTEGER PRIMARY KEY autoincrement,
        ID_PESSOA INTEGER PRIMARY KEY, 
        NOME VARCHAR(255) NOT NULL,
        QUANT integer,
        PRECO_ANT DOUBLE,
        PRECO_ATU DOUBLE,
        OBS VARCHAR(500),
        IMG_PROD BLOB
        FOREIGN KEY(ID_PESSOA) REFERENCES PESSOAS(ID_PESSOA)
      )`,
  ];

let _db = null;

export function executeSql(query, params = []) {
    // uma função atalho para execução de SQLs
    // de apenas uma linha
    // o bom dessa função é que sempre antes de rodar a query
    // ela já ira verificar se a conexão com o banco já foi aberta
    if (!_db) {
      openDB();
    }
  
    return new Promise((resolve, reject) => {
      _db.transaction(tx => {
        tx.executeSql(
          query,
          params,
          (_, rs) => resolve(rs),
          (_, err) => reject(err)
        );
      });
    });
  }
  
  export default function openDB() {
    if (!_db) {
      _db = SQLite.openDatabase(DATABASE_NAME);
  
      // primeira vez que iremos abrir a conexão,
      // tentaremos criar nossas tabelas
      _db.transaction(
        tx => {
          // sendo um array de "create table" iremos
          // "girar" uma vez para cada table a ser criada
          SQL_CREATE_ENTRIES.map(query => {
            tx.executeSql(query);
          });
        },
        err => console.warn(err),
        () => console.log(`Banco iniciado`)
      );
    }
  
    return _db;
  }
  