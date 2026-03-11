# Smart Campus Backend API Documentation

## Base URL

```
http://localhost:5000
```

---

## 📢 Announcements API

### Get All Announcements

- **Endpoint:** `GET /announcements`
- **Description:** Fetch all announcements
- **Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "ANN-xxxxxxxx",
      "title": "Important Notice",
      "description": "Description here",
      "category": "General",
      "created_at": "2026-03-11T10:00:00.000Z"
    }
  ]
}
```

### Create Announcement (Admin)

- **Endpoint:** `POST /announcements`
- **Description:** Create a new announcement
- **Request Body:**

```json
{
  "title": "Important Notice",
  "description": "Full description of the announcement",
  "category": "General"
}
```

- **Response:**

```json
{
  "success": true,
  "data": { ... }
}
```

---

## 📅 Events API

### Get All Events

- **Endpoint:** `GET /events`
- **Description:** Fetch all upcoming events
- **Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "EVT-xxxxxxxx",
      "title": "Hackathon 2026",
      "description": "...",
      "event_date": "2026-04-12",
      "event_time": "09:00:00",
      "location": "Innovation Lab",
      "category": "Academics",
      "capacity": 100,
      "registered_count": 45
    }
  ]
}
```

### Get Event by ID

- **Endpoint:** `GET /events/:id`
- **Description:** Get details of a specific event
- **Response:** Single event object

### Register for Event

- **Endpoint:** `POST /register-event`
- **Description:** Register a user for an event
- **Request Body:**

```json
{
  "name": "John Doe",
  "department": "Computer Science",
  "email": "john@example.com",
  "phone": "9876543210",
  "year": "2nd"
}
```

- **Response:**

```json
{
  "success": true,
  "ticketId": "EVT-xxxxxxxx"
}
```

### Get Notifications

- **Endpoint:** `GET /notifications`
- **Description:** Fetch all notifications for the user
- **Response:**

```json
{
  "success": true,
  "data": []
}
```

---

## 🏢 Facility Booking API

### Get All Facilities

- **Endpoint:** `GET /facilities`
- **Description:** Fetch all available facilities
- **Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "FAC-xxx",
      "name": "Conference Room A",
      "description": "...",
      "capacity": 50,
      "location": "Building A, Floor 2",
      "amenities": "Projector, WiFi, AC"
    }
  ]
}
```

### Book a Facility

- **Endpoint:** `POST /facility-booking`
- **Description:** Book a facility
- **Request Body:**

```json
{
  "facility_id": "FAC-xxx",
  "user_name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "date": "2026-04-15",
  "time_slot": "10:00 AM - 12:00 PM",
  "purpose": "Team Meeting"
}
```

- **Response:**

```json
{
  "success": true,
  "data": { ... },
  "message": "Booking request submitted successfully"
}
```

### Get User's Bookings

- **Endpoint:** `GET /my-bookings?email=user@example.com`
- **Description:** Fetch all bookings for a specific user
- **Query Parameters:**
  - `email` (required): User's email address
- **Response:**

```json
{
  "success": true,
  "data": [
    {
      "booking_id": "BOOK-xxxxxxxx",
      "facility_name": "Conference Room A",
      "booking_date": "2026-04-15",
      "time_slot": "10:00 AM - 12:00 PM",
      "status": "pending"
    }
  ]
}
```

### Cancel Facility Booking

- **Endpoint:** `DELETE /facility-booking/:booking_id`
- **Description:** Cancel a facility booking
- **Response:**

```json
{
  "success": true,
  "data": { ... },
  "message": "Booking cancelled successfully"
}
```

---

## 👥 Faculty API

### Get All Faculty

- **Endpoint:** `GET /faculty`
- **Description:** Fetch all faculty members
- **Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "FAC-xxxxxxxx",
      "name": "Dr. John Smith",
      "email": "john@college.edu",
      "phone": "9876543210",
      "department": "Computer Science",
      "designation": "Assistant Professor",
      "office_location": "Building A, Room 301",
      "specialization": "AI & Machine Learning"
    }
  ]
}
```

### Get Faculty by Department

- **Endpoint:** `GET /faculty-department?department=Computer%20Science`
- **Description:** Get faculty members from a specific department
- **Query Parameters:**
  - `department` (required): Department name

### Get Faculty by ID

- **Endpoint:** `GET /faculty/:id`
- **Description:** Get details of a specific faculty member
- **Response:** Single faculty object

### Add Faculty (Admin)

- **Endpoint:** `POST /faculty`
- **Description:** Add a new faculty member
- **Request Body:**

```json
{
  "name": "Dr. John Smith",
  "email": "john@college.edu",
  "phone": "9876543210",
  "department": "Computer Science",
  "designation": "Assistant Professor",
  "office_location": "Building A, Room 301",
  "specialization": "AI & Machine Learning"
}
```

---

## 📝 Complaints API

### Get All Complaints

- **Endpoint:** `GET /complaints`
- **Description:** Fetch all complaints (admin only)
- **Response:**

```json
{
  "success": true,
  "data": [
    {
      "complaint_id": "CMP-xxxxxxxx",
      "title": "Complaint Title",
      "description": "...",
      "category": "Infrastructure",
      "name": "John Doe",
      "email": "john@example.com",
      "status": "open",
      "created_at": "2026-03-11T10:00:00.000Z"
    }
  ]
}
```

### Get User's Complaints

- **Endpoint:** `GET /my-complaints?email=user@example.com`
- **Description:** Fetch complaints submitted by a specific user
- **Query Parameters:**
  - `email` (required): User's email address

### Create a Complaint

- **Endpoint:** `POST /complaint`
- **Description:** Submit a new complaint
- **Request Body:**

```json
{
  "title": "Complaint Title",
  "description": "Detailed description of the complaint",
  "category": "Infrastructure",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210"
}
```

- **Response:**

```json
{
  "success": true,
  "data": { ... },
  "message": "Complaint submitted successfully"
}
```

### Update Complaint Status

- **Endpoint:** `PUT /complaint/:complaint_id`
- **Description:** Update the status of a complaint (admin only)
- **Request Body:**

```json
{
  "status": "in_progress" OR "resolved" OR "closed"
}
```

- **Response:**

```json
{
  "success": true,
  "data": { ... },
  "message": "Complaint status updated successfully"
}
```

---

## Setup Instructions

1. **Create Database Tables:**
   Run the SQL commands in `database_schema.sql` in your PostgreSQL database:

   ```bash
   psql -U postgres -d smart_campus -f database_schema.sql
   ```

2. **Install Dependencies:**

   ```bash
   cd smart-campus-backend
   npm install
   ```

3. **Start the Server:**

   ```bash
   npm start
   # or
   node server.js
   ```

4. **Test the APIs:**
   Use Postman or similar tools to test the endpoints

---

## Status Codes

- `200`: Success
- `400`: Bad Request (missing or invalid parameters)
- `404`: Not Found (resource doesn't exist)
- `500`: Server Error (database or internal error)

---

## Error Response Format

```json
{
  "success": false,
  "error": "Error message describing what went wrong"
}
```
