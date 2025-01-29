const mysql = require('mysql');
const bcrypt = require('bcrypt');
 
// Configuration de la connexion MySQL (si ce n'est pas déjà fait ailleurs)
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'projetlib'
});
 
connection.connect();
 
// Fonction d'enregistrement
const register = (req, res) => {
  const { nom, prenom, email, password, isAdmin } = req.body;
 
  // Vérification que tous les champs sont présents
  if (!nom || !prenom || !email || !password) {
    return res.status(400).json({ message: 'Tous les champs sont requis.' });
  }
 
  // Vérifier si l'email est déjà utilisé
  connection.query('SELECT * FROM user WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Erreur de la requête :', err);
      return res.status(500).json({ message: 'Erreur serveur.' });
    }
 
    if (results.length > 0) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }
 
    // Hachage du mot de passe
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error('Erreur lors du hachage du mot de passe :', err);
        return res.status(500).json({ message: 'Erreur serveur.' });
      }
 
      // Insertion de l'utilisateur dans la base de données
      const query = 'INSERT INTO user (nom, prenom, email, password, isAdmin) VALUES (?, ?, ?, ?, ?)';
      connection.query(query, [nom, prenom, email, hashedPassword, isAdmin || 0], (err, results) => {
        if (err) {
          console.error('Erreur lors de l\'insertion de l\'utilisateur :', err);
          return res.status(500).json({ message: 'Erreur serveur.' });
        }
 
        // Renvoie une réponse avec l'utilisateur créé
        return res.status(201).json({
          id: results.insertId,
          nom,
          prenom,
          email,
          isAdmin: isAdmin || 0
        });
      });
    });
  });
};
 
module.exports = { register };