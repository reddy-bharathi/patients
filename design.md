# Design Document: Patient Document Management Portal

---

## **1. Tech Stack Choices**

### **Q1. Frontend Framework**
**Framework Used:** React  

**Reason for Choosing React:**  
React is a widely-used, component-based JavaScript library for building dynamic and interactive user interfaces. It allows us to create reusable UI components, which is ideal for a project like a patient portal where the same UI patterns, such as file lists, upload forms, and buttons, are repeated across the application. React’s virtual DOM improves performance when updating large lists of files, and its ecosystem (like Axios for API calls, React Router for routing, and state management libraries) provides tools that simplify development. Additionally, React is highly maintainable and widely known, which makes future scaling and team collaboration easier.

---

### **Q2. Backend Framework**
**Framework Used:** Express.js  

**Reason for Choosing Express.js:**  
Express.js is a minimal and flexible Node.js web application framework that provides robust features for building RESTful APIs. For this project, Express allows us to quickly set up endpoints for uploading, listing, downloading, and deleting files. Its middleware architecture simplifies handling file uploads (using libraries like `multer`) and error management. Express is lightweight, has excellent community support, and integrates seamlessly with Node.js, making it ideal for a full-stack application that needs simple, efficient server-side logic without heavy overhead.

---

### **Q3. Database Choice**
**Database Used:** SQLite  

**Reason for Choosing SQLite:**  
SQLite is a lightweight, file-based relational database system. It requires no server setup, making it perfect for a local development environment and small-scale applications like this project. It can efficiently store file metadata (such as filename, file path, size, and upload timestamp) in a structured format, and can be easily queried using standard SQL commands. SQLite’s simplicity reduces configuration overhead, and it is sufficient for a single-user scenario or local testing.  

**Comparison with Alternatives:**  
- PostgreSQL or MySQL are more suitable for multi-user, high-concurrency applications or cloud deployment.  
- For this project, SQLite meets all requirements with minimal setup.  

---

### **Q4. Supporting 1,000 Users**
If this portal were to scale to 1,000 users, the following changes would be considered:  
1. **Database:** Move from SQLite to a full-fledged RDBMS like PostgreSQL or MySQL to support concurrent connections and larger datasets.  
2. **File Storage:** Use cloud-based storage (AWS S3, Google Cloud Storage, or Azure Blob Storage) instead of local disk, to handle large amounts of uploaded files and allow redundancy.  
3. **Authentication:** Implement user authentication and authorization so each user can access only their own files.  
4. **Backend Scaling:** Use a load balancer with multiple Express server instances to handle concurrent requests efficiently.  
5. **Frontend Optimization:** Implement lazy loading of file lists and pagination to improve performance with large datasets.  
6. **Caching:** Introduce caching mechanisms (e.g., Redis) to reduce database load when frequently accessing file metadata.  

---

## **2. Architecture Overview**

**Flow Description:**  

- **Frontend (React):** Provides UI for file upload, list, download, and delete operations. Sends API requests to backend.  
- **Backend (Express):** Receives requests, validates files, stores them in the uploads folder, and manages metadata in SQLite.  
- **Database (SQLite):** Stores file metadata including id, filename, file path, file size, and upload timestamp.  
- **File Storage:** Physical storage of PDF files in `backend/uploads/`.

**Diagram:**  

[React Frontend]
|
|
[Express Backend API]
|
|
| 
[SQLite DB] [Uploads Folder]





**Bullet Points of Flow:**  
- Frontend sends HTTP requests for all operations.  
- Backend processes request, interacts with database and file system.  
- Response sent back to frontend to update UI.  

---

## **3. API Specification**

| Endpoint                 | Method | Sample Request                             | Sample Response                                           | Description                        |
|--------------------------|--------|--------------------------------------------|----------------------------------------------------------|------------------------------------|
| `/documents/upload`      | POST   | FormData: `{ file: <PDF> }`                | `{ success: true, message: "File uploaded successfully" }` | Upload a PDF file                  |
| `/documents`             | GET    | None                                       | `[{ id:1, filename:"report.pdf", filesize:12345, created_at:"2025-12-10T10:00:00Z" }]` | List all uploaded files            |
| `/documents/:id`         | GET    | None                                       | PDF file stream                                           | Download a file by ID              |
| `/documents/:id`         | DELETE | None                                       | `{ success: true, message: "File deleted successfully" }` | Delete a file by ID                |

---

## **4. Data Flow Description**

**File Upload Steps:**  
1. User selects a PDF file in the frontend upload form.  
2. Frontend sends a POST request to `/documents/upload` with the file using `FormData`.  
3. Backend validates the file type to ensure it is a PDF.  
4. Backend saves the file to the `uploads/` folder with a unique name if needed.  
5. Metadata including filename, file path, file size, and timestamp is saved in SQLite `documents` table.  
6. Backend responds with a success message.  
7. Frontend updates the file list to display the newly uploaded file.  

**File Download Steps:**  
1. User clicks the download button for a specific file.  
2. Frontend sends a GET request to `/documents/:id`.  
3. Backend retrieves file metadata from SQLite to verify file existence.  
4. Backend streams the PDF file to the frontend.  
5. Browser downloads the file.  

**File Deletion Steps:**  
1. User clicks the delete button for a file.  
2. Frontend sends DELETE request to `/documents/:id`.  
3. Backend deletes the physical file from `uploads/` and removes metadata from SQLite.  
4. Backend sends success/failure response.  
5. Frontend updates the file list.  

---

## **5. Assumptions**

1. **Single User:** Authentication is not implemented; assume only one user is using the system.  
2. **File Type:** Only PDF files are allowed.  
3. **File Size Limit:** Maximum file size is ~10MB (can be configured).  
4. **Storage:** Files are stored locally in `backend/uploads/`.  
5. **Database:** SQLite is sufficient for metadata storage due to small-scale, single-user assumption.  
6. **Concurrency:** Minimal concurrent uploads; system is designed for local testing.  
7. **Error Handling:** Basic error messages are returned to frontend for invalid uploads or failed operations.  

---

**End of Design Document**
