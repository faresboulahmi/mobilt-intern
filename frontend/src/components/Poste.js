import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Poste (e)  {

  const [job, setJob] = useState("");
  const [jobId, setJobID] = useState("");
  const [activites_principales , setActivitesPrincipales] = useState("");
  const [activites_secondaires, setActivitesSecondaires] = useState("");
  const [connaissance_savoir, setConnaissanceSavoir] = useState("");
  const [savoir_faire, setSavoirFaire] = useState("");
  const [structures, setStructures] = useState([]);
  const [id_structure, setIdStructure] = useState(e.input);
  const [tache , setTache] = useState([]);
  const [error, setError] = useState('');


    var formData = new FormData();
    formData.append("job", job);
    formData.append("activites_principales", activites_principales);
    formData.append("activites_secondaires", activites_secondaires);
    formData.append("connaissance_savoir", connaissance_savoir);
    formData.append("savoir_faire", savoir_faire);
    formData.append("id_structure", id_structure);

    useEffect(() => {
    fetchTache();
    fetchStructures();
  }, []);
      const fetchTache = () => {
    axios
      .get('http://localhost:8080/tache')
      .then((res) => {
        setTache(res.data.tache);
      })
      .catch((error) => {
        console.log(error);
      });
  };
    const fetchStructures = () => {
    axios
      .get('http://localhost:8080/jobType')
      .then((res) => {
        setStructures(res.data.structures);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [submitted , setSubmitted]  = useState(false);
  
  const handlejobChange = (event) => {
    setJobID(event.target.value);


};


  const handleSubmit = async (e) => {
    e.preventDefault();
    structures 
    .filter(
      (structures ) => +structures.id === +jobId
      ).map((structures , index) => setJob(structures.name))
      const selectedTaches = tache.filter(
    (tache) => +tache.job_type_id === +jobId
    );
    if (selectedTaches.length > 0) {
    const selectedTache = selectedTaches[0];
    setActivitesPrincipales(selectedTache.activites_principales);
    setActivitesSecondaires(selectedTache.activites_secondaires);
    setConnaissanceSavoir(selectedTache.connaissance_savoir);
    setSavoirFaire(selectedTache.savoir_faire);
    }
    console.log(activites_principales)
    console.log(activites_secondaires)
    console.log(connaissance_savoir)
    console.log(savoir_faire)
    console.log(job)
    console.log(jobId)
    if (!job ) { // Check for selected file
      setError('All fields are required');
      return;
    }
    try {
      await axios.post('http://localhost:8080/Poste', formData);
      setSubmitted(true);
    } catch (error) {
      console.error('Error sending form data:', error);
    }
  };
  
  const style = {
    labelFocus: {
      top: '-7px',
      left:'calc((100% - 350px) / 2)',
      fontSize: '16px',
      color: '#0220ff',
      background: '#fff',
      transform: 'translateY(-50%)',
  },labelFocusTwo: {
      top: '-7px',
      left:'calc((100% - 250px) / 2)',
      fontSize: '16px',
      color: '#0220ff',
      background: '#fff',
      transform: 'translateY(-50%)',
  }, input: {
      height: '50px',
      minWidth:'300px',
      outline: 'none',
      fontSize: '17px',
      paddingLeft: '20px',
      border: '1px solid lightgrey',
      borderRadius: '25px',
      transition: 'all 0.3s ease',
    },label: {
      position: 'absolute',
      top: '50%',
      left: 'calc((100% - 350px) / 2)',
      color: "#4e54c0",
      fontWeight: '400',
      fontSize: '17px',
      pointerEvents: 'none',
      transform: 'translateY(-50%)',
      transition: 'all 0.3s ease',
    },
    labelTwo: {
      position: 'absolute',
      top: '50%',
      left: 'calc((100% - 250px) / 2)',
      color: "#4e54c0",
      fontWeight: '400',
      fontSize: '17px',
      pointerEvents: 'none',
      transform: 'translateY(-50%)',
      transition: 'all 0.3s ease',
    },
    form : {
      display:'flex',
      flexDirection:'column',
      padding:'20px',
      justifyContent:'center',
      alignItems:'center',
      gap:'20px',
      borderRadius:'12px',
      width:'80vw',
      margin:'auto',
      backgroundColor:'white'
    },
    textarea : {
      display:'flex',
      width:'80%',
      margin:'auto',
      resize:'none',
      flexDirection:'column',
      gap:'10px',
      
    }
    ,back:{
        width:'100px',
        height:'50px',
        margin:'0px 0px 0px auto',
        background:'#0d6efd',
        outline:'none',
        borderRadius:'12px',
        borderColor:'white',
        fontWeight:'600',
        color:'white'
      },
}
  return (
    
  <div style={{margin:'auto'}}>
    {submitted ? (
        <p className='submit'>Form submitted successfully!</p>
      ) : (
      <form key={e.input}
    style={style.form}
    onSubmit={handleSubmit}
    >
  <div  style={{width:'80%' , position:'relative' , }}>
    <label htmlFor="select" style={{
              ...style.label,
              ...(jobId ? style.labelFocus : {}),
            }}>Intitulé poste </label>{" "}
            <select  id='select'
              style={style.input}
              name='job'
              value={jobId}
              onChange={handlejobChange}
            >
              <option value=""></option>
                {structures.map((structureOption, index) => (
                  <option key={index} value={structureOption.id}>
                    {structureOption.name}
                  </option>
                ))}
            </select>
  </div>
                  

                  <div className='holdertwodiv' >
                    <div className='holder'>
    {tache
    .filter(
                    (tache) => tache.job_type_id == jobId
                  )
    .map((actionP, index) => (
        index === 0 ? (
          <><label htmlFor={index} className='label'> Activites Principales</label><textarea name={index} id={index}  value={actionP.activites_principales} ></textarea></>
        ): null
                  )

    )}

  </div>
  <div className='holder'>
    {tache
    .filter(
                    (tache) => tache.job_type_id == jobId
                  )
    .map((actionS, index) => (
        index === 0 ? (
          <><label htmlFor={index} className='label'>Activites Secondaires</label><textarea name={index} id={index}  value={actionS.activites_secondaires} ></textarea></>
        ): null
                    
                  )

    )}

  </div>
                  </div>
          <div className='holdertwodiv' >
              <div className='holder'>
    {tache
    .filter(
                    (tache) => tache.job_type_id == jobId
                  )
    .map((connaissance, index) => (
        index === 0 ? (
          <><label htmlFor={index} className='label'>Connaissance Savoir</label><textarea name={index} id={index}  value={connaissance.connaissance_savoir} ></textarea></>
        ): null
                    
                  )

    )}

  </div>
  <div className='holder'>
    {tache
    .filter(
                    (tache) => tache.job_type_id == jobId
                  )
    .map((savoir, index) => (
        index === 0 ? (
          <><label htmlFor={index} className='label'>Savoir Faire</label><textarea name={index} id={index}  value={savoir.savoir_faire} ></textarea></>
        ): null
                  )

    )}

  </div>
          </div>

  <p style={{color:'red'}}>{error}</p>
  <button type="submit"  style={style.back}>Submit</button>
</form>
      )}
  </div>
  )
}

export default Poste;