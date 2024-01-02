import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [matricule, setMatricule] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!matricule || !username || !password) {
      setError("All fields are required");
      return;
    }

    axios
      .post("http://localhost:8080/login", { matricule, username, password })
      .then((res) => {
        const { token } = res.data;

        // Store token, matricule, and username in local storage
        localStorage.setItem("token", token);
        localStorage.setItem("matricule", matricule);
        localStorage.setItem("username", username);
        const tokentest = JSON.stringify(localStorage.getItem("token", token));
        console.log(tokentest);

        if ( matricule >= "1501") {
          navigate("/dashboard")
      } else {
          navigate("/Template")
      };;
      })
      .catch((error) => {
        setError("Identifiants invalides.");
      });
  };


  return (
    

          <div >
      <div className='p-3 max-w-lg mx-auto' >
        <div >
            <img className='text-3xl text-center font-semibold my-7 logo' src="assets/images/cut1.gif" alt="Logo"  />Connexion</div>

        <form onSubmit={handleLogin} className='flex flex-col gap-4'>

            <input
              type="text"
              value={matricule}
              onChange={(e) => setMatricule(e.target.value)}
              className='border p-3 rounded-lg'
              placeholder='Matricule'
            />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='border p-3 rounded-lg'
              placeholder=' Nom dutilisateur'
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='border p-3 rounded-lg'
              placeholder=' Mot de passe'
            />
            <button
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          Se connecter
        </button>
          
        </form>
          <div className='flex gap-2 mt-5'>
        <p>  Vous n'avez pas de compte ?</p>
        <Link to={'/Signup'}>
          <span className='text-blue-700'> Créer un compte</span>
        </Link>
      </div>
        {error && <p className='text-red-500 mt-5'>{error}</p>}
      </div>
    </div>






  );
};

export default Login;