import React, { useState } from 'react';
import { Link } from 'react-router-dom';


function Nav() {

  const handlelogout =() =>{
    localStorage.removeItem('token');
  }


 
  return (
    <nav  className='bg-slate-200 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3 flex-col sm:flex-row'>
      <Link to="/Template" >
      <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-slate-500'>Poste</span>
            <span className='text-slate-700'>Interne</span>
        </h1>
      </Link>
          

   
        
       <ul className='flex gap-4' >
          <li className='hidden sm:inline text-slate-700 hover:underline' >
          <Link to="/addpostevacant" >
            Ajouter Poste Vacants
          </Link>
        </li>
        <li className='hidden sm:inline text-slate-700 hover:underline'>
          <Link to="/Apply" >
            Postuler ma condidature
          </Link>
        </li>
        <li className='hidden sm:inline text-slate-700 hover:underline'>
          <Link to="/Internalmobility" >
            Gestion des candidatures
          </Link>
        </li>
       </ul>
        <li className='hidden sm:inline text-slate-700 hover:underline'>
          <Link to="/"  onClick={handlelogout}>
            déconnexion
          </Link>
        </li>
      
        </div>
    </nav>
    
  );
}

// const navStyle = {
//   background: "linear-gradient(-135deg,  #4e54c0,#0f135d, #82defa)",
//   padding: '10px',
//   display: 'flex',
//   alignItems: 'center',
//   zIndex: '100',
// };

// const logoStyle = {
//   height: '80px',
//   marginRight: '20px',
// };

// const linkStyle = {
//   color: '#F5E525',
//   margin: '0 30px',
//   fontSize: '18px',
//   fontFamily: 'Times New Roman',
//   listStyle:'none',
  

// };

export default Nav;