
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import '../App.css';

function Internalmobility() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = () => {
    axios
      .get('http://localhost:8080/applications')
      .then((res) => {
        setApplications(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleActionUpdate = (applicationId, action) => {
    const newStatus = action === 'accepted' ? 'true' : 'false';
    axios
      .put('http://localhost:8080/applications/' + applicationId, {
        status: newStatus,
      })
      .then(() => {
        fetchApplications();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <Nav />
      <div className='gestion'>
        <h2>Liste des applications</h2>
        <table>
          <thead>
            <tr>
              <th>Matricule</th>
              <th>Nom d'utilisateur</th>
              <th>Fichier CV</th>
              <th>Statut</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr key={application.id}>
                <td>{application.matricule}</td>
                <td>{application.username}</td>
                <td><a
                  href={`http://localhost:8080/uploads/${application.cvFile}`}
                  target="_blank"
                  rel="noopener"
                  download={application.cvFile}>{application.cvFile}
                </a>{application.action}</td>

                <td>
                  {application.status === 'true' ? (
                    <span style={{ color: 'green' }}>Accepted</span>
                  ) : application.status === 'false' ? (
                    <span style={{ color: 'red' }}>déclin</span>
                  ) : (
                    <span>{application.status}</span>
                  )}
                </td>
                <td className='control'>
                  <button

                    onClick={() => handleActionUpdate(application.id, 'accepted')}
                  >
                    Accepter
                  </button>
                  <button

                    onClick={() => handleActionUpdate(application.id, 'declined')}
                  >
                    Déclin
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}





export default Internalmobility;
