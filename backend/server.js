const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());

// Make uploads folder if not exists
if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }
}).single("file");

// Upload route
app.post("/documents/upload", upload, (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file selected" });
  }

  return res.json({
    success: true,
    document: {
      id: req.file.filename,
      filename: req.file.originalname,
      size: req.file.size,
      uploadedAt: new Date()
    }
  });
});

// List files
app.get("/documents", (req, res) => {
  fs.readdir("uploads", (err, files) => {
    if (err) return res.json({ documents: [] });

    const documents = files.map(file => {
      const stats = fs.statSync(path.join("uploads", file));
      const originalName = file.split("-").slice(1).join("-");

      return {
        id: file,
        filename: originalName,
        size: Math.round(stats.size / 1024),     // KB
        uploadedAt: stats.birthtime
      };
    });

    res.json({ documents });
  });
});

// Download file
app.get("/documents/download/:id", (req, res) => {
  const filePath = path.join("uploads", req.params.id);

  if (!fs.existsSync(filePath))
    return res.status(404).json({ success: false, message: "File not found" });

  res.download(filePath);
});

// Delete file
app.delete("/documents/:id", (req, res) => {
  const filePath = path.join("uploads", req.params.id);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ success: false, message: "File not found" });
  }

  fs.unlink(filePath, err => {
    if (err) return res.status(500).json({ success: false, message: "Delete failed" });
    res.json({ success: true });
  });
});

app.listen(4000, () => console.log("Backend running on port 4000"));
