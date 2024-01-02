const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const fileUpload = require('express-fileupload');
const path = require('path'); // Added for path manipulation
const { log } = require("console");

const app = express();
app.use(fileUpload());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:3001",
  methods: ["POST", "GET", "DELETE", "PUT"],
  credentials: true
}));
//upload path
app.use('/uploads', express.static('../backend/uploads'));
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "entreprise"
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to the database');
});


// Create a user signup endpoint
app.post("/signup", (req, res) => {
  const { matricule, username, password } = req.body;
  const user = { matricule, username, password };
  db.query('INSERT INTO users SET ?', user, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error signing up');
    } else {
      res.send('Signup successful');
    }
  });
});

// Create a user login endpoint
app.post("/login", (req, res) => {
  const { matricule, username, password } = req.body;
  db.query(
    'SELECT * FROM users WHERE matricule = ? AND username = ? AND password = ?',
    [matricule, username, password],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error logging in');
      } else {
        if (result.length > 0) {
          const token = jwt.sign({ matricule, username }, "Taha@01022002");
          res.json({ token, matricule, username });
        } else {
          res.status(401).send('Invalid credentials');
        }
      }
    }
  );
});


// Endpoint for retrieving all applications
app.get('/applications', (req, res) => {
  db.query('SELECT * FROM applications', (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error retrieving applications');
    } else {
      res.json(results);
    }
  });
});

// Endpoint for updating the action status of an application
app.put('/applications/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const sql = 'UPDATE applications SET status = ? WHERE id = ?';
  const values = [status, id];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error updating application status');
    } else {
      res.send('Application status updated successfully');
    }
  });
});



// Create an API endpoint to fetch job types by filiere
app.get('/jobTypes/:id', (req, res) => {
  const id = req.params.id;
  const query = 'SELECT * FROM job_types WHERE filiere_id = ?';


  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error fetching job types:', err);
      res.status(500).json({ error: 'An error occurred while fetching job types' });
    } else {
      res.json(results);
    }
  });
});
app.get('/job/:id', (req, res) => {
  const idposte = req.params.id;
  const query = 'SELECT * FROM job_types WHERE id = ?';


  db.query(query, [idposte], (err, results) => {
    if (err) {
      console.error('Error fetching job types:', err);
      res.status(500).json({ error: 'An error occurred while fetching job types' });
    } else {
      res.json(results);
    }
  });
});


// Define API routes
app.get('/competences/:job_type_id', (req, res) => {
  const job_type_id = req.params.job_type_id;

  db.query('SELECT * FROM competences_requises WHERE job_type_id = ?', [job_type_id], (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.json(results);
    }
  });
});

//
app.put('/competences/:id', (req, res) => {
  const id = req.params.id;
  const { mission, intitule_emploi, activites_principales, activites_secondaires, connaissance_savoir, savoir_faire, capacite_mise_en_oeuvre, niveau_formation_requise, lien_hierarchiques, experience_professionnelle_requise, evolutions_emplois_futurs, quantifiable_et_mesurable } = req.body;

  const sql = 'UPDATE competences_requises SET mission = ?, intitule_emploi = ?, activites_principales = ?, activites_secondaires = ?, connaissance_savoir = ?, savoir_faire = ?, capacite_mise_en_oeuvre = ?, niveau_formation_requise = ?, lien_hierarchiques = ?, experience_professionnelle_requise = ?, evolutions_emplois_futurs = ?, quantifiable_et_mesurable = ? WHERE job_type_id = ?';
  const values = [mission, intitule_emploi, activites_principales, activites_secondaires, connaissance_savoir, savoir_faire, capacite_mise_en_oeuvre, niveau_formation_requise, lien_hierarchiques, experience_professionnelle_requise, evolutions_emplois_futurs, quantifiable_et_mesurable, id];

  db.query(sql, values, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error updating description for competences');
    } else {
      res.send('updated successfully');
    }
  });
});


// Update a job type by ID
app.put('/jobTypes/:id', (req, res) => {
  const jobId = req.params.id;
  const { description } = req.body;

  const query = 'UPDATE job_types SET description = ? WHERE id = ?';

  db.query(query, [description, jobId], (err, result) => {
    if (err) {
      console.error('Error updating job type:', err);
      res.status(500).json({ error: 'An error occurred while updating job type' });
    } else {
      res.json({ success: true });
    }
  });
});


// Define API routes
app.get('/getCompetences/:categ_comp_id', (req, res) => {
  const categ_comp_id = req.params.categ_comp_id;

  db.query('SELECT * FROM `competences` WHERE `id_categ` = ?', [categ_comp_id], (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.json(results);
    }
  });
});

app.delete('/delete/:id_comp', (req, res) => {
  const query = "DELETE FROM competences WHERE ID =?";
  const id = req.params.id;
  db.query(query, [id], (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
});


//-------- EDIT SERVER ------------- 
//-------- EDIT SERVER ------------- 
//-------- EDIT SERVER ------------- 
//-------- EDIT SERVER ------------- 
//-------- EDIT SERVER ------------- 

app.get('/api/links', (req, res) => {
  const query = 'SELECT  linkName AS linkName , action AS fileName  FROM  application ';
  db.query(query, (err, results) => {
    if (err) {
      console.error('MYSQL query error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results)
    }
  })
})


app.post('/Poste', (req, res) => {
  const { job } = req.body.job;
  const { activites_principales } = req.body.activites_principales;
  const { activites_secondaires } = req.body.activites_secondaires;
  const { connaissance_savoir } = req.body.connaissance_savoir;
  const { savoir_faire } = req.body.savoir_faire;
  const { id_structure } = req.body.id_structure;
  console.log(req.body);
  // Insert the action with the provided structure ID
  const insertActionQuery = 'INSERT INTO postevacants (job , activites_principales , activites_secondaires, connaissance_savoir , savoir_faire  , id_structure) VALUES (? , ? , ? , ? , ? , ?)';
  db.query(insertActionQuery, [req.body.job, req.body.activites_principales, req.body.activites_secondaires, req.body.connaissance_savoir, req.body.savoir_faire, req.body.id_structure], (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({ message: 'An error occurred' });
    } else {
      res.json({ message: 'Action added successfully' });
    }
  });
});






//get tache and competences_requises 
app.get('/tache', (req, res) => {
  const sql = 'SELECT intitule_emploi , job_type_id,  activites_principales , activites_secondaires ,connaissance_savoir , savoir_faire     FROM  competences_requises ';

  db.query(sql, (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({ message: 'An error occurred' });
    } else {
      const tache = results.map((row) => ({
        job_type_id: row.job_type_id,
        intitule_emploi: row.intitule_emploi,
        activites_principales: row.activites_principales,
        activites_secondaires: row.activites_secondaires,
        connaissance_savoir: row.connaissance_savoir,
        savoir_faire: row.savoir_faire,

      }));
      res.json({ tache });
    }
  });
});


// get the job types
app.get('/jobType', (req, res) => {
  const sql = 'SELECT name , id  FROM  job_types ';

  db.query(sql, (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({ message: 'An error occurred' });
    } else {
      const structures = results.map((row) => ({
        name: row.name,
        id: row.id

      }));
      res.json({ structures });
    }
  });
});
// Endpoint for retriving the actions
app.get('/actions', (req, res) => {
  const sql = 'SELECT a.action_name, a.structure_id, s.structure_name FROM actions AS a INNER JOIN structure AS s ON a.structure_id = s.id_structure';

  db.query(sql, (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({ message: 'An error occurred' });
    } else {
      const actions = results.map((row) => ({
        action_name: row.action_name,
        structure_id: row.structure_id,
        structure_name: row.structure_name,
      }));
      res.json({ actions });
    }
  });
});


//endpoint for adding an action 
app.post('/actions', (req, res) => {
  const { action, structure } = req.body;

  // Insert the action with the provided structure ID
  const insertActionQuery = 'INSERT INTO actions (action_name, structure_id) VALUES (?, ?)';
  db.query(insertActionQuery, [action, structure], (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({ message: 'An error occurred' });
    } else {
      res.json({ message: 'Action added successfully' });
    }
  });
});

//endpoint for retriving all the structures
app.get('/structure', (req, res) => {
  const sql = 'SELECT id_postevacants , id_structure , job , activites_principales , activites_secondaires , connaissance_savoir , savoir_faire  FROM  postevacants ';

  db.query(sql, (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({ message: 'An error occurred' });
    } else {
      const structuresR = results.map((row) => ({
        structure_job: row.job,
        structure_id: row.id_postevacants,
        activites_principales: row.activites_principales,
        activites_secondaires: row.activites_secondaires,
        connaissance_savoir: row.connaissance_savoir,
        savoir_faire: row.savoir_faire,
        id_structure: row.id_structure,
      }));
      res.json({ structuresR });
    }
  });
});
app.get('/structur', (req, res) => {
  const sql = 'SELECT id_structure,structure_name  FROM  structure ';

  db.query(sql, (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({ message: 'An error occurred' });
    } else {
      const structures = results.map((row) => ({
        id_structure: row.id_structure,
        structure_name: row.structure_name,

      }));
      res.json({ structures });
    }
  });
});
// Apply for an action with file upload
app.post('/apply', (req, res) => {
  // console.log(req.body.file.name);
  console.log(req.body.file);
  console.log(req.files);
  // console.log(req.files.uploadedFile);
  //const test = req.files.uploadedFile;
  // console.log(test.name);
  //const { action, token } = req.body;
  const { action} = req.body;
  console.log(req.body);
 /*  jwt.verify(token, 'Taha@01022002', (err, decoded) => {
    if (err) {
      console.log(err);
      res.status(401).send('Invalid token');
      return;
    } */
   // const { matricule, username } = ;

    // Handling file upload
    const file = req.files ? req.files.file : null;
    const filename = req.body.filename ? req.body.filename : null;
    const matricule = req.body.matricule ? req.body.matricule : null;
    const username = req.body.username ? req.body.username : null;
    db.query(
      'INSERT INTO applications (matricule, username, action, cvFile) VALUES (?, ?, ?, ?)',
      [matricule, username, action, filename],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send('Error applying for action');
        } else {
          if (file) {
            // Move the uploaded file to the 'uploads' directory
            const uploadPath = path.join(__dirname, 'uploads', file.name);
            file.mv(uploadPath, (err) => {
              if (err) {
                console.log(err);
                res.status(500).send('Error moving uploaded file');
              } else {
                res.send('Application submitted with file');
              }
            });
          } else {
            res.send('Application submitted');
          }
        }
      }
    );
  });
//});
app.listen(8080, () => {
  console.log("Backend is running");
});