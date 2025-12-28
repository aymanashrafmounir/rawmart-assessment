# 📋 Task Management Application

A full-stack Task Management Application built with **Spring Boot** (Backend) and **React** (Frontend).

![Java](https://img.shields.io/badge/Java-17-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.0-green)
![React](https://img.shields.io/badge/React-18-blue)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue)
![Docker](https://img.shields.io/badge/Docker-Ready-blue)

---

## 🌐 Live Demo

> [!WARNING]
> **Free Tier Notice:** The application is deployed using free tier services. The server might be sleeping due to inactivity. Please allow 30-60 seconds for the initial request to wake up the services.

| Service | URL | Provider |
|---------|-----|----------|
| �️ **Frontend** | [rawmart.netlify.app](https://rawmart.netlify.app/) | Netlify |
| ⚙️ **Backend API** | [rawmart-assessment.onrender.com](https://rawmart-assessment.onrender.com) | Render (Docker) |
| 🗄️ **Database** | MySQL (Managed) | [Aiven](https://console.aiven.io/) |

### Try It Out

1. Visit [https://rawmart.netlify.app/](https://rawmart.netlify.app/)
2. Register a new account or login
3. Start managing your tasks!

---

## �📖 Table of Contents

- [Live Demo](#-live-demo)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Setup Instructions](#-setup-instructions)
- [How to Run](#-how-to-run)
- [API Endpoints](#-api-endpoints)
- [Screenshots](#-screenshots)
- [Assumptions](#-assumptions)
- [Deployment Architecture](#️-deployment-architecture)

---

## ✨ Features

- **User Authentication**
  - User registration with email validation
  - Secure login with JWT tokens
  - Password hashing with BCrypt

- **Task Management**
  - Create, Read, Update, Delete (CRUD) tasks
  - Task status tracking (Pending, In Progress, Done)
  - User-specific tasks (users can only see their own tasks)
  - **Pagination** (5 tasks per page with Previous/Next controls)

- **Frontend**
  - Clean and responsive UI
  - Loading and error states
  - Protected routes

---

## 🛠 Tech Stack

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| Java | 17 | Programming Language |
| Spring Boot | 3.2.0 | Backend Framework |
| Spring Security | 6.x | Authentication & Authorization |
| Spring Data JPA | 3.x | Database ORM |
| MySQL | 8.0 | Database |
| JWT | 0.11.5 | Token-based Authentication |
| Lombok | Latest | Reduce Boilerplate Code |

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.x | Frontend Framework |
| React Router | 6.x | Client-side Routing |
| Axios | 1.x | HTTP Client |
| CSS | - | Styling |

### DevOps

| Technology | Purpose |
|------------|---------|
| Docker | Containerization |
| Docker Compose | Multi-container orchestration |
| Nginx | Frontend web server & API proxy |

---

## 📁 Project Structure

```
task-manager/
├── backend/                    # Spring Boot Backend
│   ├── src/main/java/com/taskmanager/
│   │   ├── config/            # Security & JWT configuration
│   │   ├── controller/        # REST API controllers
│   │   ├── dto/               # Data Transfer Objects
│   │   ├── model/             # JPA Entities
│   │   ├── repository/        # Data Access Layer
│   │   └── service/           # Business Logic
│   ├── src/main/resources/
│   │   └── application.properties
│   ├── Dockerfile
│   └── pom.xml
│
├── frontend/                   # React Frontend
│   ├── src/
│   │   ├── pages/             # React Components (Login, Register, Tasks)
│   │   ├── services/          # API Service (Axios)
│   │   ├── App.js             # Main App with Routing
│   │   └── App.css            # Styles
│   ├── Dockerfile
│   └── nginx.conf
│
├── docker-compose.yml          # Docker orchestration
├── reset-db.ps1               # Database reset script
└── README.md
```

---

## 🚀 Setup Instructions

### Prerequisites

- **Java 17** or higher
- **Node.js 18** or higher
- **Maven 3.9+**
- **Docker & Docker Compose** (for containerized setup)
- **MySQL 8.0** (or use Docker)

### Clone the Repository

```bash
git clone https://github.com/aymanashrafmounir/task-manager.git
cd task-manager
```

---

## 🏃 How to Run

### Option 1: Docker (Recommended) 🐳

Run everything with a single command:

```bash
docker-compose up --build
```

Access the application:

- **Frontend:** <http://localhost:3000>
- **Backend API:** <http://localhost:8080>
- **MySQL:** localhost:3307

To stop:

```bash
docker-compose down
```

---

### Option 2: Manual Setup

#### 1. Start MySQL Database

Using Docker:

```bash
docker run -d --name mysql -p 3307:3306 \
  -e MYSQL_ROOT_PASSWORD=root123 \
  -e MYSQL_DATABASE=task_manager \
  mysql:8.0
```

Or configure your local MySQL and update `application.properties`.

#### 2. Run Backend

```bash
cd backend
mvn spring-boot:run
```

Backend runs on: <http://localhost:8080>

#### 3. Run Frontend

```bash
cd frontend
npm install
npm start
```

Frontend runs on: <http://localhost:3000>

---

## 🔌 API Endpoints

### Base URL

```
http://localhost:8080/api
```

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register new user | ❌ |
| POST | `/auth/login` | Login user | ❌ |

#### Register User

```http
POST /api/auth/register
Content-Type: application/json

{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "123456"
}
```

**Response:**

```json
{
    "token": "eyJhbGciOiJIUzI1NiJ9...",
    "email": "john@example.com",
    "name": "John Doe"
}
```

#### Login User

```http
POST /api/auth/login
Content-Type: application/json

{
    "email": "john@example.com",
    "password": "123456"
}
```

---

### Tasks

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/tasks` | Get all user tasks | ✅ |
| GET | `/tasks/paginated?page=0&size=10` | Get paginated tasks | ✅ |
| POST | `/tasks` | Create new task | ✅ |
| PUT | `/tasks/{id}` | Update task | ✅ |
| DELETE | `/tasks/{id}` | Delete task | ✅ |

#### Create Task

```http
POST /api/tasks
Authorization: Bearer <token>
Content-Type: application/json

{
    "title": "Complete project",
    "description": "Finish the backend API",
    "status": "PENDING"
}
```

**Response:**

```json
{
    "id": 1,
    "title": "Complete project",
    "description": "Finish the backend API",
    "status": "PENDING",
    "createdAt": "2024-12-28T15:30:00"
}
```

#### Update Task Status

```http
PUT /api/tasks/1
Authorization: Bearer <token>
Content-Type: application/json

{
    "status": "DONE"
}
```

#### Delete Task

```http
DELETE /api/tasks/1
Authorization: Bearer <token>
```

---

### Task Status Values

| Status | Description |
|--------|-------------|
| `PENDING` | Task is waiting to be started |
| `IN_PROGRESS` | Task is currently being worked on |
| `DONE` | Task is completed |

---

## 📸 Screenshots

### 1. Task Dashboard with Pagination

![Task Dashboard](screenshots/Screenshot%202025-12-28%20170054.png)

*Main dashboard showing the task list with pagination controls. Users can view their tasks organized by status with Previous/Next navigation for easy browsing.*

---

### 2. Task Management View

![Task Management](screenshots/Screenshot%202025-12-28%20170100.png)

*Task list showing task cards with status indicators (Pending, In Progress, Done), task details, and action buttons for updating status or deleting tasks.*

---

### 3. Login Page

![Login Page](screenshots/Screenshot%202025-12-28%20170108.png)

*Clean and simple login interface with email and password fields. Users can log in to access their personal task dashboard.*

---

### 4. Registration Page

![Registration Page](screenshots/Screenshot%202025-12-28%20170114.png)

*User registration form with name, email, and password fields. New users can create an account to start managing their tasks.*

---

## 📝 Assumptions

1. **Single User Session:** Users can only be logged in on one device at a time (token stored in localStorage).

2. **No Email Verification:** Registration doesn't require email verification for simplicity.

3. **Password Requirements:** Minimum 6 characters, no complexity requirements enforced.

4. **Task Ownership:** Users can only access their own tasks. No sharing or collaboration features.

5. **Pagination:** Tasks are paginated (5 per page) with Previous/Next controls.

6. **No Task Due Dates:** Tasks don't have due dates or reminders for simplicity.

7. **JWT Expiration:** Tokens expire after 24 hours. No refresh token mechanism implemented.

8. **Development Focus:** CORS is configured to allow all origins for easier development.

---

## 🧪 Testing with Postman

### Postman Collection

A complete Postman collection is included in the project for easy API testing.

📁 **File:** `Task_Manager_API.postman_collection.json`

### How to Import

1. Open **Postman**
2. Click **Import** (top left)
3. Drag and drop `Task_Manager_API.postman_collection.json`
4. The collection "Task Manager API" will appear

### Collection Contents

#### 🔐 Auth Tests (5 requests)

| Request | Description | Expected Result |
|---------|-------------|----------------|
| Register User | Create new account | ✅ 200 + Token |
| Register Duplicate | Same email again | ❌ 400 Error |
| Login User | Login with credentials | ✅ 200 + Token |
| Login Wrong Password | Invalid password | ❌ 400 Error |
| Login Non-existent | Email not found | ❌ 400 Error |

#### 📋 Task Tests (9 requests)

| Request | Description | Expected Result |
|---------|-------------|----------------|
| Create Task - PENDING | New task | ✅ 200 + Task |
| Create Task - IN_PROGRESS | With status | ✅ 200 + Task |
| Create Task - No Description | Optional field | ✅ 200 + Task |
| Get All Tasks | List user tasks | ✅ 200 + Array |
| Update Task - Status | Change to DONE | ✅ 200 + Updated |
| Update Task - Title | Change title | ✅ 200 + Updated |
| Delete Task | Remove task | ✅ 200 + Success |
| Get Tasks - No Token | Unauthorized | ❌ 403 Forbidden |
| Update Non-existent | Invalid ID | ❌ 400 Error |

### Auto Token Management

The collection automatically:

- Saves the JWT token after Login/Register
- Uses the saved token for all authenticated requests
- No manual token copying needed!

### Run All Tests

1. Start with **Register User** or **Login User**
2. Run requests in order
3. Check the **Tests** tab for results

### Manual cURL Tests

```bash
# Register a user
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"123456"}'

# Login and get token
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"123456"}'

# Create task (replace TOKEN)
curl -X POST http://localhost:8080/api/tasks \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"My Task","status":"PENDING"}'

# Get all tasks
curl -X GET http://localhost:8080/api/tasks \
  -H "Authorization: Bearer TOKEN"
```

---

## 🔧 Configuration

### Environment Variables (Docker)

| Variable | Default | Description |
|----------|---------|-------------|
| `SPRING_DATASOURCE_URL` | jdbc:mysql://mysql:3306/task_manager | Database URL |
| `SPRING_DATASOURCE_USERNAME` | root | Database username |
| `SPRING_DATASOURCE_PASSWORD` | root123 | Database password |

### Application Properties

Located at `backend/src/main/resources/application.properties`

```properties
server.port=8080
spring.datasource.url=jdbc:mysql://localhost:3307/task_manager
spring.datasource.username=root
spring.datasource.password=root123
jwt.secret=your-secret-key
jwt.expiration=86400000
```

---

## 👤 Author

**Ayman Ashraf Mounir**

- GitHub: [@aymanashrafmounir](https://github.com/aymanashrafmounir)

---

## ☁️ Deployment Architecture

The application is deployed across multiple cloud platforms for production use:

```
┌─────────────────────────────────────────────────────────────────┐
│                        PRODUCTION SETUP                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌──────────────┐    ┌──────────────┐    ┌──────────────┐    │
│   │   Netlify    │───▶│    Render    │───▶│    Aiven     │    │
│   │  (Frontend)  │    │  (Backend)   │    │   (MySQL)    │    │
│   └──────────────┘    └──────────────┘    └──────────────┘    │
│         │                    │                   │             │
│    React App           Spring Boot         MySQL 8.0          │
│    (Static)            (Docker)            (Managed)          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Platform Details

| Platform | Service | Configuration |
|----------|---------|---------------|
| **Netlify** | Frontend Hosting | Auto-deploy from GitHub, `_redirects` for SPA routing |
| **Render** | Backend API | Docker deployment, environment variables for DB connection |
| **Aiven** | MySQL Database | Managed MySQL 8.0, SSL connection, automated backups |

### Deployment Files

| File | Purpose |
|------|---------|
| `netlify.toml` | Netlify build configuration |
| `frontend/public/_redirects` | SPA routing rules for Netlify |
| `backend/Dockerfile` | Docker image for backend |
| `render.yaml` | Render deployment configuration |
| `application-prod.properties` | Production Spring Boot config |

> [!NOTE]
> The backend uses Spring profiles. Production deployment uses `application-prod.properties` with environment variables for sensitive data like database credentials and JWT secrets.

---

## 🙏 Acknowledgments

- Spring Boot Documentation
- React Documentation
- JWT.io for JWT debugging
- Postman for API testing
