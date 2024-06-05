import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [textBoxContent, setTextBoxContent] = useState('');
  const [query, setQuery] = useState('');
  const [queryResult, setQueryResult] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setTextBoxContent(response.data);
    } catch (error) {
      console.error('Error uploading the file:', error);
    }
  };

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleQuerySubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/query', { query });
      setQueryResult(response.data);
    } catch (error) {
      console.error('Error with query submission:', error);
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '50%', padding: '10px' }}>
        <div>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload}>Upload</button>
        </div>
        <div style={{ marginTop: '20px' }}>
          <textarea 
            value={textBoxContent} 
            readOnly 
            style={{ width: '100%', height: '300px', overflowY: 'scroll' }} 
          />
        </div>
      </div>
      <div style={{ width: '50%', padding: '10px' }}>
        <div>
          <input 
            type="text" 
            value={query} 
            onChange={handleQueryChange} 
            placeholder="Enter query" 
            style={{ width: '80%' }} 
          />
          <button onClick={handleQuerySubmit}>Search</button>
        </div>
        <div style={{ marginTop: '20px' }}>
          <textarea 
            value={queryResult} 
            readOnly 
            style={{ width: '100%', height: '300px', overflowY: 'scroll' }} 
          />
        </div>
      </div>
    </div>
  );
}

export default App;
