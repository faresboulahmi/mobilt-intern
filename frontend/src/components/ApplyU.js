import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavU from './navU';



const ApplyU = () => {
  const [selectedAction, setSelectedAction] = useState('');
  const [error, setError] = useState('');
  const [selectedStructure, setSelectedStructure] = useState('');
  const [selectedStructures, setSelectedStructures] = useState('');
  const [structuresR, setStructuresR] = useState([]);
  const [structures, setStructures] = useState([]);
  const [submitted, setSubmitted] = useState(false);


  const [selectedFile, setSelectedFile] = useState(null); // New state for file upload

  useEffect(() => {
    fetchStructures();
    fetchAStructure();
  }, []);

  const fetchAStructure = () => {
    axios
      .get('http://localhost:8080/structur')
      .then((res) => {
        setStructures(res.data.structures);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchStructures = () => {
    axios
      .get('http://localhost:8080/structure')
      .then((res) => {
        setStructuresR(res.data.structuresR);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const navigate = useNavigate();

  const handleFormSubmit =  (e) => {
    e.preventDefault();
      const results = [];
      
    if ( !selectedFile) { // Check for selected file
      setError('All fields are required');
      return;
    }

    const formData = new FormData();
    formData.append('action', selectedAction);
    formData.append('matricule', localStorage.getItem('matricule'));
    formData.append('username', localStorage.getItem('username'));
    formData.append('file', selectedFile); // Add selected file
    formData.append('filename', selectedFile.name); // Add selected file
    
    
    axios
      .post('http://localhost:8080/apply', formData
      )
      .then((res) => {
        navigate('/ApplyU');
        setSubmitted(true);
      setError(''); // Clear any previous errors
        
      })
      .catch((error) => {
        console.log(error);
      });
  };



  const handleStructureChange = (e) => {
    const selectedStructure = parseInt(e.target.value);
    setSelectedStructure(selectedStructure);
    setSelectedAction('');
    setError('');
    console.log(selectedStructure)
  };
  const handleStructuresChange = (e) => {
    const selectedStructures = parseInt(e.target.value);
    setSelectedStructures(selectedStructures);
    setSelectedAction('');
    setError('');
    console.log(selectedStructures)
  };

  const handleFileChange = (e) => {
    console.log(e.target.files[0].name);
    setSelectedFile(e.target.files[0].name);
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const allowedTypes = ['application/pdf'];
      
      if (allowedTypes.includes(selectedFile.type)) {
        setSelectedFile(selectedFile);
        setError('');
      } else {
        setSelectedFile(null);
        setError('Type de fichier non pris en charge. Veuillez télécharger un fichier PDF');
      }
    }
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '80vh',
      background: '#4e54c08f9',
    },
   back:{
        width:'100px',
        height:'50px',
        margin:'0px 0px 0px auto',
        background:'#0d6efd',
        outline:'none',
        borderRadius:'12px',
        borderColor:'white',
        fontWeight:'600',
        color:'white',
        
      },
    title: {
      fontFamily: 'Times New Roman',
      fontSize: '25px',
      fontWeight: '600',
      marginTop: '10px',
      marginBottom: '10px',
      textAlign: 'center',
      lineHeight: '100px',
      color: 'yellow',
      userSelect: 'none',
      borderRadius: '15px 15px 0 0',
      background: 'linear-gradient(-135deg, #4e54c0, #0f135d, #82defa)',
    },
    field: {
      height: '50px',
      width: '100%',
      marginTop: '20px',
      position: 'relative',
    },
    input: {
      height: '100%',
      width: '100%',
      outline: 'none',
      fontSize: '17px',
      paddingLeft: '20px',
      border: '1px solid lightgrey',
      borderRadius: '25px',
      transition: 'all 0.3s ease',
    },
    label: {
      position: 'absolute',
      top: '50%',
      left: '20px',
      color: '#4e54c0',
      fontWeight: '400',
      fontSize: '17px',
      pointerEvents: 'none',
      transform: 'translateY(-50%)',
      transition: 'all 0.3s ease',
    },
    labelFocus: {
      top: '0%',
      fontSize: '16px',
      color: '#0220ff',
      background: '#fff',
      transform: 'translateY(-50%)',
    },
    submitButton: {
      padding: '10px 20px',
      background: 'linear-gradient(-135deg, #82defa, #0f135d, #4e54c0)',
      color: 'yellow',
      border: 'none',
      borderRadius: '5px',
      marginBottom: '50px',
      marginTop: '30px',
      cursor: 'pointer',
    },
    error: {
      color: 'red',
    },
    text: {
      textAlign: 'center',
    },
    link: {
      color: 'blue',
      textDecoration: 'none',
    },
    logo: {
      height: '120px',
      marginRight: '20px',
    },   
     message: {
        color:'#151a60',
        fontSise:'30px',

      }
  };

  return (
    <div style={{background:'#eee' , minHeight:'100vh'}}>
      <NavU />
      {submitted ? (
        <div className='holdMessage'>
          <p className='message'>Votre demande de candidature est soumise avec succès!</p>
          <button className='buttonMessage'
            onClick={() => {
              setSubmitted(false);
              setSelectedStructure('')}}>
            Retour au formulaire
          </button>
        </div>
      ) : (
      <div className='postuler'>
        <div >
          <h1 className='head'>Postuler pour un poste vacant</h1>
          <form onSubmit={handleFormSubmit}>
            <div className='holdselect' >
              <div style={styles.field}>
              <select
                value={selectedStructures}
                onChange={handleStructuresChange}
                style={styles.input}
              >
                <option value=""></option>
                {structures.map((structureOption, index) => (
                  <option key={index} value={structureOption.id_structure}>
                    {structureOption.structure_name}
                  </option>
                ))}
              </select>
              <label
                style={{
                  ...styles.label,
                  ...(selectedStructures ? styles.labelFocus : {}),
                }}
              >
                Sélectionnez une structure
              </label>
            </div>
            <div style={styles.field}>
              <select
                value={selectedStructure}
                onChange={handleStructureChange}
                style={styles.input}
              >
                <option value=""></option>
                {structuresR
                .filter(
                    (structure) => structure.id_structure == selectedStructures
                  ).map((structureOption, index) => (
                  <option key={index} value={structureOption.structure_id} >
                    {structureOption.structure_job}
                  </option>
                ))}
              </select>
              <label
                style={{
                  ...styles.label,
                  ...(selectedStructure ? styles.labelFocus : {}),
                }}
              >
                Sélectionne Poste Vacant
              </label>
            </div>
            </div>
           
            <br />
              <div className='holdertwodiv' >
                    <div className='holder'>
    {structuresR
    .filter(
                    (tache) => tache.structure_id == selectedStructure
                  )
    .map((actionP, index) => (
        index === 0 ? (
          <><label htmlFor={index} className='label'> Activites Principales</label><textarea name={index} id={index}  value={actionP.activites_principales} ></textarea></>
        ): null
                  )

    )}

  </div>
  <div className='holder'>
    {structuresR
    .filter(
                    (tache) => tache.structure_id == selectedStructure
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
    {structuresR
    .filter(
                    (tache) => tache.structure_id == selectedStructure
                  )
    .map((connaissance, index) => (
        index === 0 ? (
          <><label htmlFor={index} className='label'>Connaissance Savoir</label><textarea name={index} id={index}  value={connaissance.connaissance_savoir} ></textarea></>
        ): null
                    
                  )

    )}

  </div>
  <div className='holder'>
    {structuresR
    .filter(
                    (tache) => tache.structure_id == selectedStructure
                  )
    .map((savoir, index) => (
        index === 0 ? (
          <><label htmlFor={index} className='label'>Savoir Faire</label><textarea name={index} id={index}  value={savoir.savoir_faire} ></textarea></>
        ): null
                    
                  )

    )}

  </div>
          </div>
           <div style={styles.field}>
            <p style={{color:'red'}} > Le fichier est requis au format pdf</p>
              <input type="file" onChange={handleFileChange} name="uploadedFile" id='uploadedFile' />
            </div>
            <br></br>
            <p style={styles.error}>{error}</p>
            <button type="submit" style={styles.back} >
              Soumettre
            </button>
          </form>
        </div>
      </div> )}
    </div>
  );
};

export default ApplyU;
