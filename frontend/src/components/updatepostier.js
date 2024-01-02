import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function Createpostier () {
    const [matricule,setMatricule]=useState([]);
    const [nom,setNom]=useState([]);
    const [prenom,setPrenom]=useState([]);
    const {id}= useParams()
   function   handleFomr(event) {
        event.preventDefault();
        axios.put('http://localhost:8080/update/'+id,{matricule,nom,prenom})
            .then(res=>{
                console.log(res);
                Navigate('/');
            }).catch(err=>{
                console.log(err);
                //Navigate('/');
            });
    }
    return (
        <div>
           <form onSubmit={handleFomr} method='post'>
       
            <div class="mb-3 row">
                <label for="nim" class="col-sm-2 col-form-label">Matricule</label>
                <div class="col-sm-10">
                    <input type="number" class="form-control" name='nim' id="nim" 
                    onChange={e=>setMatricule(e.target.value)}
                    />
                </div>
            </div>
            <div class="mb-3 row">
                <label for="nama" class="col-sm-2 col-form-label">Nom</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" name='nama' id="nama" 
                    onChange={e=>setNom(e.target.value)}
                    />
                </div>
            </div>
            <div class="mb-3 row">
                <label for="jurusan" class="col-sm-2 col-form-label">Prenom</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" name='jurusan' id="jurusan" 
                    onChange={e=>setPrenom(e.target.value)}
                    />
                </div>
            </div>
            <div class="mb-3 row">
                <label for="jurusan" class="col-sm-2 col-form-label"></label>
                <div class="col-sm-10"><button type="submit" class="btn btn-primary" name="submit">Mettre à jour</button></div>
            </div>
          </form>
        </div>
    );
};

export default Createpostier ;