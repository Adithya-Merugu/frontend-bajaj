import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

const App = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleJsonInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonInput);
      const res = await axios.post('https://backend-bajaj-111.onrender.com/bfhl', parsedData);
      setResponse(res.data);
      setError('');
    } catch (e) {
      setError('Invalid JSON input');
      setResponse(null);
    }
  };

  const handleSelectChange = (options) => {
    setSelectedOptions(options);
  };

  const renderResponse = () => {
    if (!response) return null;

    const selectedValues = selectedOptions.map(option => option.value);
    const filteredResponse = {};

    if (selectedValues.includes('Alphabets')) {
      filteredResponse.alphabets = response.alphabets;
    }
    if (selectedValues.includes('Numbers')) {
      filteredResponse.numbers = response.numbers;
    }
    if (selectedValues.includes('Highest lowercase alphabet')) {
      filteredResponse.highest_lowercase_alphabet = response.highest_lowercase_alphabet;
    }

    return (
      <div>
        <h3>Response:</h3>
        <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>21BCE5980</h1>
      <textarea
        value={jsonInput}
        onChange={handleJsonInputChange}
        rows="4"
        cols="50"
        placeholder='Enter JSON data, e.g., {"data": ["A", "C", "z"]}'
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Select
        isMulti
        options={[
          { value: 'Alphabets', label: 'Alphabets' },
          { value: 'Numbers', label: 'Numbers' },
          { value: 'Highest lowercase alphabet', label: 'Highest lowercase alphabet' },
        ]}
        onChange={handleSelectChange}
      />
      {renderResponse()}
    </div>
  );
};

export default App;
