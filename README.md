# patients-Datafiles
# Patient Document Management Portal

A simple full-stack application that allows patients to upload, view, download, and delete their medical documents (PDFs). Built using React for the frontend, Express.js for the backend, and SQLite for storing file metadata.

---

## **Project Structure**

patients/
│
├─ frontend/ # React application
├─ backend/ # Express backend API
│ ├─ uploads/ # Folder where PDF files are stored
│ └─ database/ # SQLite database file
├─ README.md # This file


## **Tech Stack**

- **Frontend:** React  
  - Chosen for its component-based architecture and ease of building interactive UI.  
- **Backend:** Express.js  
  - Lightweight, simple setup for REST APIs and file handling.  
- **Database:** SQLite  
  - Lightweight, file-based, perfect for local storage and single-user scenario.  
- **File Storage:** Local `uploads/` folder.  
- **Others:** Axios for API requests from React.  

**Scalability Considerations for 1,000 users:**  
- Use PostgreSQL or MySQL instead of SQLite.  
- Move file storage to cloud storage (AWS S3, Google Cloud Storage).  
- Implement user authentication and access control.  

---

## **Architecture Overview**

**Flow:**

1. User interacts with React frontend.
2. Frontend sends HTTP requests to Express backend.
3. Backend handles:
   - File uploads to `uploads/` folder.
   - Metadata storage in SQLite database (`documents` table).
   - Serving files for download.
   - Deleting files.
4. Backend responds to frontend.
5. Frontend updates the UI based on responses.


## **API Endpoints**

| Endpoint                 | Method | Description                        |
|--------------------------|--------|------------------------------------|
| `/documents/upload`      | POST   | Upload a PDF file                  |
| `/documents`             | GET    | List all uploaded documents        |
| `/documents/:id`         | GET    | Download a specific file           |
| `/documents/:id`         | DELETE | Delete a specific file             |

### Example Requests

**Upload a file**

 http://localhost:5000/documents/upload


### List of all files

http://localhost:5000/documents



### Download a file

http://localhost:5000/documents/1 --output file.pdf



###Delete a file

http://localhost:5000/documents/1





**Data Flow**

File Upload:

1.User selects a PDF file in the frontend.

2. Frontend sends a POST request to /documents/upload with the file.

3.Backend:

---> Validates the file type.

---> Saves the file to uploads/.

---> Stores metadata in SQLite documents table (id, filename, filepath, filesize, created_at).

4. Backend responds with success/failure.

5. Frontend updates the file list.

File Download:

1. User clicks the download button in the frontend.

2. Frontend sends a GET request to /documents/:id.

3. Backend streams the file from uploads/.

4. Browser downloads the file.

File Deletion:

1. User clicks the delete button in the frontend.

2. Frontend sends DELETE request to /documents/:id.

3. Backend removes the file from uploads/ and deletes its metadata from SQLite.

4. Backend responds with success/failure.

5. Frontend updates the list.






**Assumptions**

1. Single user; no authentication implemented.

2. Only PDF files allowed.

3. Maximum file size: ~10MB (adjustable in backend).

4. Files stored locally in backend/uploads/.

5. File metadata stored in SQLite database backend/database/documents.db.

6. Concurrency and heavy load are minimal (local testing).


**SetUp Instructions**

Backend 

1. Navigate to backend folder:

  ---> cd backend


2. Install dependencies:

 ---> npm install


3. Create uploads/ folder if it does not exist:

 ---> mkdir uploads


4. Start the server:

---> npm start


Server runs at http://localhost:5000



Frontend 

1. Navigate to frontend folder:

 ---> cd frontend


2. Install dependencies:

 ---> npm install


3. Start the React app:

---> npm start


Frontend runs at http://localhost:3000




**Usage**

1. Open http://localhost:3000 in a browser.

2. Upload PDFs using the form.

3. View all uploaded documents in the list.

4. Download or delete files using respective buttons.
