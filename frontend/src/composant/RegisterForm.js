import React, { useState } from 'react';
import axios from 'axios';

 
const RegisterForm = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
  });
 
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    // Réinitialiser les messages d'erreur et de succès
    setError('');
    setSuccess('');
 
    try {
      // Envoi des données au backend Node.js
      //appeler response
      const response = await axios.post('http://localhost:5000/api/users/register', formData);
      setSuccess('Inscription réussie !');
      setFormData({ nom: '', prenom: '', email: '', password: '' });
    } catch (err) {
      setError('Erreur lors de l\'inscription. Veuillez réessayer.');
    }
  };

  return (
<div>
<h2>Inscription</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
<form onSubmit={handleSubmit}>
<div>
<label>Nom</label>
<input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
          />
</div>
<div>
<label>Prénom</label>
<input
            type="text"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            required
          />
</div>
<div>
<label>Email</label>
<input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
</div>
<div>
<label>Mot de passe</label>
<input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
</div>
<button type="submit">S'inscrire</button>
</form>
</div>
  );
};
 
export default RegisterForm;