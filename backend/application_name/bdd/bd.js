const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'projetlib'
});

connection.connect();

const createLivresTable = `
  CREATE TABLE IF NOT EXISTS livres (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(255) NOT NULL,
    auteur VARCHAR(255) NOT NULL,
    annee_publication INT,
    genre VARCHAR(100),
    auteur_id INT
  )
`;

const createLivreAuteurTable = `
CREATE TABLE IF NOT EXISTS livreAuteur (
  id INT AUTO_INCREMENT PRIMARY KEY,
  auteur_id INT,
  livre_id INT,
  FOREIGN KEY (auteur_id) REFERENCES auteurs(id) ON DELETE CASCADE,
  FOREIGN KEY (livre_id) REFERENCES livres(id) ON DELETE CASCADE
)
`;

const createAuteursTable = `
CREATE TABLE IF NOT EXISTS auteurs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(255) NOT NULL,
  prenom VARCHAR(255) NOT NULL
)
`;

const createUserTable = `
CREATE TABLE IF NOT EXISTS user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(255) NOT NULL,
  prenom VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  isAdmin TINYINT(1) DEFAULT 0
)
`;

const createGenreTable = `
CREATE TABLE IF NOT EXISTS genre (
  id INT AUTO_INCREMENT PRIMARY KEY,
  type VARCHAR(255) NOT NULL
)
`;

const createGenreLivreTable = `
CREATE TABLE IF NOT EXISTS genreLivre (
  id INT AUTO_INCREMENT PRIMARY KEY,
  livre_id INT,
  genre_id INT,
  FOREIGN KEY (livre_id) REFERENCES livres(id) ON DELETE CASCADE,
  FOREIGN KEY (genre_id) REFERENCES genre(id) ON DELETE CASCADE
)
`;

connection.query(createLivresTable, function(err, result) {
  if (err) throw err;
  console.log("Table 'livres' créée ou déjà existante !");
});

connection.query(createLivreAuteurTable, function(err, result) {
  if (err) throw err;
  console.log("Table 'livreAuteur' créée ou déjà existante !");
});

connection.query(createAuteursTable, function(err, result) {
  if (err) throw err;
  console.log("Table 'auteurs' créée ou déjà existante !");
});

connection.query(createUserTable, function(err, result) {
  if (err) throw err;
  console.log("Table 'user' créée ou déjà existante !");
});

connection.query(createGenreTable, function(err, result) {
  if (err) throw err;
  console.log("Table 'genre' créée ou déjà existante !");
});

connection.query(createGenreLivreTable, function(err, result) {
  if (err) throw err;
  console.log("Table 'genreLivre' créée ou déjà existante !");
});

connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err;
  console.log('The solution is: ', rows[0].solution);
});

connection.end();
