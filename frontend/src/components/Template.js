import React from 'react';
import Nav from './Nav';

const Template = () => {
  const matricule = localStorage.getItem('matricule');
  const username = localStorage.getItem('username');

  return (
    <div style={styles.container}>
      <Nav />
      {/* <img src="https://www.poste.tn/image/fr/jpg/ban_header.jpg" alt="Logo" style={styles.logo} /> */}
      <h2 style={styles.heading} className='text-slate-500'>Bienvenue, {username}!</h2>
      <h2 style={styles.heading} className='text-slate-700'>Vous occcupez le poste de responsable de succrsale </h2>
      <p style={styles.info}>Matricule: {matricule}</p>
      <p value={username} ></p>
    </div>
  );
};

const styles = {
  heading: {
    fontSize: '50px',
    fontWeight: 'bold',
    marginTop: '20px',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  info: {
    fontSize: '30px',
    color: '#0D0E8A',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '20px',
  },
  logo: {
    display: 'block',
    margin: '0 auto',
    height: '200px',
  },
  
};

export default Template;
