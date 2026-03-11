-- Smart Campus Database Schema

-- Announcements Table
CREATE TABLE IF NOT EXISTS announcements (
  id VARCHAR(50) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(100) DEFAULT 'General',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Events Table
CREATE TABLE IF NOT EXISTS events (
  id VARCHAR(50) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  event_date DATE NOT NULL,
  event_time TIME,
  location VARCHAR(255),
  category VARCHAR(100),
  capacity INT,
  registered_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Facilities Table
CREATE TABLE IF NOT EXISTS facilities (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  capacity INT,
  location VARCHAR(255),
  amenities TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Facility Bookings Table
CREATE TABLE IF NOT EXISTS facility_bookings (
  id SERIAL PRIMARY KEY,
  booking_id VARCHAR(50) UNIQUE NOT NULL,
  facility_id VARCHAR(50) NOT NULL,
  user_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  booking_date DATE NOT NULL,
  time_slot VARCHAR(100),
  purpose TEXT,
  status VARCHAR(50) DEFAULT 'pending', -- pending, approved, completed, cancelled
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (facility_id) REFERENCES facilities(id)
);

-- Faculty Table
CREATE TABLE IF NOT EXISTS faculty (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20),
  department VARCHAR(100) NOT NULL,
  designation VARCHAR(100),
  office_location VARCHAR(255),
  specialization TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users Table (Authentication)
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  user_type VARCHAR(50) NOT NULL DEFAULT 'faculty', -- faculty, student, admin
  faculty_id VARCHAR(50),
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (faculty_id) REFERENCES faculty(id)
);

-- Complaints Table
CREATE TABLE IF NOT EXISTS complaints (
  id SERIAL PRIMARY KEY,
  complaint_id VARCHAR(50) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(100) DEFAULT 'General',
  name VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  status VARCHAR(50) DEFAULT 'open', -- open, in_progress, resolved, closed
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notifications Table
CREATE TABLE IF NOT EXISTS notifications (
  id SERIAL PRIMARY KEY,
  user_email VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  type VARCHAR(50), -- announcement, event, complaint, booking
  related_id VARCHAR(50),
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Registrations Table (for event registrations)
CREATE TABLE IF NOT EXISTS registrations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  department VARCHAR(100),
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  year VARCHAR(10),
  ticket_id VARCHAR(50) UNIQUE,
  event_id VARCHAR(50),
  registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (event_id) REFERENCES events(id)
);


-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_announcements_created_at ON announcements(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_events_event_date ON events(event_date ASC);
CREATE INDEX IF NOT EXISTS idx_registrations_email ON registrations(email);
CREATE INDEX IF NOT EXISTS idx_facility_bookings_email ON facility_bookings(email);
CREATE INDEX IF NOT EXISTS idx_faculty_department ON faculty(department);
CREATE INDEX IF NOT EXISTS idx_complaints_email ON complaints(email);
CREATE INDEX IF NOT EXISTS idx_notifications_user_email ON notifications(user_email);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
