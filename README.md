# 🏢 Manpower Management System

A complete **Manpower Management System** designed for recruitment agencies to manage candidates, agents, documentation, medical processing, visa tracking, and deployment workflows efficiently.

This system provides structured role-based access control (RBAC), document management, candidate lifecycle tracking, and operational reporting.

---

## 🚀 Overview

The Manpower Management System is built to streamline:

- Candidate registration and tracking
- Agent management
- Medical and document verification
- Visa processing
- Branch-level operations
- Role-based access control
- Workflow monitoring

---

## 🎯 Key Features

### 👥 Role-Based Access Control (RBAC)

System roles include:

- **Director** – Full system access
- **HR** – Candidate recruitment & management
- **Documentation Officer** – Document verification & uploads
- **Staff** – Operational candidate management
- **Agent** – Add and track own candidates

Each role has granular permission control.

---

### 📁 Candidate Management

- Personal Information
- Passport Details
- Medical Tracking
- Visa Information
- Educational Qualification
- Language Skills
- Experience History
- Document Uploads (Photo, Passport, Visa, Certificate)
- Status Tracking Workflow

---

### 📑 Document Management

- Passport copy upload
- Visa copy upload
- Medical report upload
- Police report reference
- MOFA tracking
- Expiry monitoring system

---

### 🏥 Medical Tracking

- Medical status (Pending / Fit / Unfit / Expired)
- Issue & expiry date tracking
- Expiry alerts (optional cron integration)

---

### 🌍 Branch & Agent Management

- Multi-branch support
- Agent hierarchy
- Candidate ownership tracking
- Performance reporting

---

## 🧱 System Architecture

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB (Mongoose ODM)

### Database
- MongoDB
- Indexed for performance
- Structured schema validation
- Enum-based workflow control

---

