import React, { useState } from 'react';

export default function UploadForm({ apiBase, onSuccess, onError }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  function onFileChange(e) {
    const f = e.target.files[0];
    setFile(f);
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (!file) return onError('Select a file first');
    // Basic validation
    if (file.size > 10 * 1024 * 1024) return onError('File too large. Max 10MB');
    if (!file.name.toLowerCase().endsWith('.pdf')) return onError('Only PDF files allowed');

    const fd = new FormData();
    fd.append('file', file);

    try {
      setUploading(true);
      const res = await fetch(`${apiBase}/documents/upload`, {
        method: 'POST',
        body: fd
      });
      const data = await res.json();
      if (res.ok && data.success) {
        onSuccess(data.document.filename);
        setFile(null);
        // reset input value
        document.getElementById('fileInput').value = '';
      } else {
        onError(data.message || 'Upload failed');
      }
    } catch (err) {
      console.error(err);
      onError('Upload failed');
    } finally {
      setUploading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="upload-form">
      <label>
        Choose PDF to upload
        <input id="fileInput" type="file" accept="application/pdf" onChange={onFileChange} />
      </label>
      <button type="submit" disabled={uploading}>{uploading ? 'Uploading...' : 'Upload'}</button>
    </form>
  );
}
