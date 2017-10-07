const sqlite = require('sqlite3').verbose()
const db = new sqlite.Database('./db.sqlite3')

db.run('create table score (id integer primary key, name text, score integer)')
