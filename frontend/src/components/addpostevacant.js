import React, { useState , useEffect } from 'react';
import Nav from './Nav';
import Poste from './Poste';
import axios from 'axios';


function Addpostevacant() {
    const [number , setNumber] = useState(1);
    const [loopResult , setLoopResults] = useState([]);
    const [selectedStructures, setSelectedStructures] = useState('');
    const [structures, setStructures] = useState([]);
    const [error, setError] = useState('');

    const [showResults , setShowResults] = useState(false);

    useEffect(() => {
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
    const handleNumberChange = (e) => {
    const newValue = parseInt(e.target.value);
    setNumber(newValue);
    };
    const handleStructuresChange = (e) => {
    const selectedStructures = parseInt(e.target.value);
    console.log(e.target.value)
    setSelectedStructures(selectedStructures);
    // setSelectedAction('');
    setError('');
    console.log(selectedStructures)
  };
    const handelGenerateLoop = () => {
       if (selectedStructures < 0 || number < 0 ) { // Check for selected file
      setError('All fields are required');
      return;
      }else {
        const results = [];
     
      for (let i = 0 ; i < number ; i++) {
        results.push(<Poste input={selectedStructures} />)
      }
      setLoopResults(results);
      setShowResults(true);
      }
      
     
    }
    const style = {
      back:{
        width:'500px',
        height:'50px',
        margin:'auto',
        background:'#0d6efd',
        outline:'none',
        borderRadius:'12px',
        borderColor:'white',
        fontWeight:'600',
        color:'white'
      },
        form: {
            width: '80%',
            height:'80vh',
            margin:'20px auto ',
            border : '1px solid #eeee',
            borderRadius: '15px',
            padding: '30px 15px',
            display:'flex' ,
            flexDirection :'column' ,
            justifyContent : 'center',
            gap:'15px',
            background:'white',
            height:'500px'
        },
        nomber : {
            display:'flex',
            flexDirection: 'column',
            gap : '10px',
            justifyContent : 'center',
            width:'90%',
            margin:'auto',
            position:'relative',
            // width:'80%'
        },
        nomberOne : {
            display:'flex',
            flexDirection: 'column',
            gap : '10px',
            justifyContent : 'center',
            width:'90%',
            margin:'auto',
            position:'relative',
        },
        title : {
            margin:'20px'
        },
        button : {
            height : '40px',
            width:'500px',
            margin :'auto'
        },
        label :{
          position :'absolute',
          top :'50%',
          left:'10%',
          color:'black',
          transform: "translateY(-50%)",
          transition :'all 0.3s ease',

        },
        labelOne :{
          position :'absolute',
          top :'50%',
          left:'10%',
          color:'black',
          transform: "translateY(-50%)",
          transition :'all 0.3s ease',

        },
        labelFocus :{
          top:'-17px',
          left:'0px',
          fontWeight:'500',
          transform: "translateY(-50%)",
          color:'black',
          
          
        },
        labelFocusOne :{
          top:'-19%',
          left:'0%',
          fontWeight:'500',
          transform: "translateY(-50%)",
          color:'black',
          
          
        },
        input: {
          width: '500px', 
          height:'50px',
          borderRadius:'12px',
          padding:'10px',
          boxShadow: '0px 2px 15px 5px #d5dbe1'
          
        }
    }
  return (

    <div  style={{background:'#eee'}}>
    <Nav />
      <div style={{  padding:'20px', gap:'10px' }} className='main'>
        
        {!showResults ? (
          <form style={style.form} onSubmit={(e) => {e.preventDefault(); handelGenerateLoop();}}>
    <h2 className='head'>
     Ajouter Poste Vacants
  </h2>
  <div style={style.nomberOne}>
              <select
                value={selectedStructures}
                onChange={handleStructuresChange}
                
                className='input'
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
                  ...style.labelOne,
                  ...(selectedStructures ? style.labelFocusOne : {}),
                }}
              >
                Sélectionnez une structure
              </label>
            </div>
  <div  style={style.nomber}>
    <input type="number" id="exampleCheck1" className='input'
    value={number}
    onChange={handleNumberChange}/>
    <label  htmlFor="exampleCheck1" style={{...style.label,...(number ? style.labelFocus :{})}}>Nombre Poste Vacant</label>
  </div>
  <p style={{color:'red'}}>{error}</p>
  <button type="submit"  style={style.back}>Ajouter</button>
</form>
        ): null}
        {showResults && (
          <div className='grid-container '>
            <button 
            onClick={() => {
              setShowResults(false);
              setNumber(0);
            }} style={style.back}>retour</button>
            {loopResult}
          </div>
        )}
      </div>
        </div>
  )
}

export default Addpostevacant;