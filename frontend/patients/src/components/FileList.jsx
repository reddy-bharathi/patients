import React from "react";

export default function FileList({ files, onDelete, apiBase }) {
  return (
    <div>
      <h2>Uploaded Documents</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Size (KB)</th>
            <th>Uploaded At</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {files.map(file => (
            <tr key={file.id}>
              <td>{file.filename}</td>
              <td>{file.size}</td>
              <td>{new Date(file.uploadedAt).toLocaleString()}</td>
              <td>
                <a
                  href={`${apiBase}/documents/download/${file.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button>Download</button>
                </a>

                <button
                  style={{ marginLeft: "10px", backgroundColor: "#f88" }}
                  onClick={() => onDelete(file.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
