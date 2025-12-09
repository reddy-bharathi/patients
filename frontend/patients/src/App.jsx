import React, { useEffect, useState } from 'react';
import UploadForm from './components/UploadForm';
import FileList from './components/FileList';

// Backend URL
const API = 'http://localhost:4000';

export default function App() {
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState(null);

  const fetchFiles = async () => {
    try {
      const res = await fetch(`${API}/documents`);
      const data = await res.json();
      setFiles(data.documents || []);
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Failed to load files' });
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleUploadSuccess = (filename) => {
    setMessage({ type: 'success', text: `${filename} uploaded successfully` });
    fetchFiles();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this document?')) return;

    try {
      const res = await fetch(`${API}/documents/${id}`, { method: 'DELETE' });
      const data = await res.json();

      if (data.success) {
        setMessage({ type: 'success', text: 'Deleted successfully' });
        fetchFiles();
      } else {
        setMessage({ type: 'error', text: data.message || 'Delete failed' });
      }

    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Delete failed' });
    }
  };

  return (
    <div className="container">
      <h1>Patient Documents Portal</h1>

      {message && (
        <div className={`msg ${message.type === 'error' ? 'error' : 'success'}`}>
          {message.text}
          <button className="close" onClick={() => setMessage(null)}>×</button>
        </div>
      )}

      <UploadForm
        apiBase={API}
        onSuccess={handleUploadSuccess}
        onError={(txt) => setMessage({ type: 'error', text: txt })}
      />

      <hr />

      <FileList files={files} onDelete={handleDelete} apiBase={API} />
    </div>
  );
}
