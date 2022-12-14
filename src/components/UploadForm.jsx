import React, { useState } from 'react';
import { ProgressBar } from './ProgressBar';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const types = ['image/jpeg', 'image/png', 'image/jpg'];

  const onHandleChange = (e) => {
    const selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError('');
    } else {
      setFile(null);
      setError('Please Select an Image.');
    }
  };

  return (
    <form>
      <label>
        <input type='file' onChange={onHandleChange} />
        <span>+</span>
      </label>

      <div className='output'>
        {error && <div className='error'>{error}</div>}
        {file && <div>{file.name}</div>}
        {file && <ProgressBar file={file} setFile={setFile} />}
      </div>
    </form>
  );
};

export default UploadForm;
