# SmartAttend AI - API Contracts & Integration Guide

## Overview
This document outlines the API contracts and integration plan for SmartAttend AI - a modern attendance tracking system with QR Code scanning and Facial Recognition capabilities.

## Frontend Architecture
- **Landing Page**: Modern hero section with glass morphism effects
- **Authentication**: Separate login/signup flows for Students and Professors
- **Professor Dashboard**: Real-time stats, charts, student management
- **Student Portal**: Personal attendance history, analytics, QR scanner access
- **QR Scanner**: Dual mode (QR Code + Facial Recognition) attendance marking

## Mock Data Currently Used
Located in `/app/frontend/src/data/mockData.js`:

### 1. Student Data
```javascript
mockStudents[] // Student records with attendance percentages, risk levels
mockStudentInfo // Individual student profile data
mockStudentAttendanceHistory[] // Date-wise attendance records
```

### 2. Statistics
```javascript
mockAttendanceStats // Overall attendance statistics
mockWeeklyData[] // Weekly attendance trends
mockMonthlyData[] // Monthly attendance data
mockPieChartData[] // Attendance distribution
```

### 3. User Data
```javascript
mockProfessorInfo // Professor profile information
```

## Required Backend APIs

### Authentication Endpoints
- `POST /api/auth/login`
  - Body: `{ email, password, role }`
  - Response: `{ token, user, role }`

- `POST /api/auth/signup`
  - Body: `{ name, email, password, role }`
  - Response: `{ token, user, role }`

- `POST /api/auth/logout`
  - Headers: `Authorization: Bearer <token>`

### Student Management Endpoints
- `GET /api/students`
  - Headers: `Authorization: Bearer <token>`
  - Response: Array of student objects

- `GET /api/students/:id`
  - Response: Individual student data with attendance history

- `PUT /api/students/:id/attendance`
  - Body: `{ method, timestamp, status }`
  - Response: Updated attendance record

### Professor Dashboard Endpoints
- `GET /api/dashboard/stats`
  - Response: Overall attendance statistics
  
- `GET /api/dashboard/weekly-trends`
  - Response: Weekly attendance data for charts

- `GET /api/dashboard/attendance-distribution`
  - Response: Pie chart data for student performance categories

### Attendance Endpoints
- `POST /api/attendance/mark`
  - Body: `{ studentId, method, timestamp, qrData?, faceData? }`
  - Response: Attendance record confirmation

- `GET /api/attendance/history/:studentId`
  - Response: Student's attendance history

- `GET /api/attendance/daily/:date`
  - Response: All attendance records for specific date

### QR Code & Facial Recognition
- `POST /api/scanner/qr-verify`
  - Body: `{ qrData }`
  - Response: Student verification result

- `POST /api/scanner/face-recognize`
  - Body: `{ imageData }`
  - Response: Face recognition result with confidence

## Database Schema Requirements

### Users Table
- id, name, email, password_hash, role (student/professor)
- created_at, updated_at

### Students Table  
- id, user_id, roll_number, year, department
- attendance_percentage, total_classes, classes_attended

### Professors Table
- id, user_id, department, subjects[]

### Attendance Records Table
- id, student_id, date, status, time, method
- created_at, updated_at

### Classes Table
- id, professor_id, subject, date, start_time, end_time

## Frontend-Backend Integration Points

### 1. Authentication Flow
- Replace mock login/signup with actual API calls
- Store JWT token in localStorage
- Add token to all authenticated requests
- Handle token expiration and refresh

### 2. Dashboard Data Loading
- Replace `mockAttendanceStats` with `/api/dashboard/stats`
- Replace `mockWeeklyData` with `/api/dashboard/weekly-trends`
- Replace `mockStudents` with `/api/students`

### 3. Student Portal Integration
- Replace `mockStudentInfo` with authenticated user data
- Replace `mockStudentAttendanceHistory` with `/api/attendance/history/:id`

### 4. QR Scanner Integration
- Replace mock QR scanning with actual camera integration
- Connect to `/api/scanner/qr-verify` and `/api/scanner/face-recognize`
- Handle real-time attendance marking via `/api/attendance/mark`

### 5. Real-time Updates
- Implement WebSocket connections for live attendance updates
- Update dashboard stats in real-time as attendance is marked

## Security Considerations
- JWT token authentication for all protected routes
- Rate limiting for scanner endpoints
- Input validation and sanitization
- Encrypted facial recognition data storage
- CORS configuration for frontend-backend communication

## Performance Optimizations
- Lazy loading for dashboard charts
- Pagination for student lists and attendance history
- Image compression for facial recognition
- Caching for frequently accessed data

## Error Handling
- Network error handling with retry logic
- User-friendly error messages
- Graceful fallbacks for offline scenarios
- Form validation error display

## Testing Strategy
- Unit tests for API endpoints
- Integration tests for authentication flow
- End-to-end tests for attendance marking
- Performance tests for scanner functionality

This contract ensures seamless integration between the existing frontend mock implementation and the upcoming backend services.