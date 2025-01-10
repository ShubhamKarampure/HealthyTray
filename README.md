# Hospital Food Delivery Management

This project is a full-stack web application designed to manage hospital food delivery, allowing Hospital Food Managers, Inner Pantry Staff, and Delivery Personnel to track and manage food deliveries to patients. It includes functionalities like managing patient details, food/diet charts, assigning tasks to pantry staff, and tracking meal delivery statuses.

## Key Features

### 1. Hospital Food Manager Functionality
- **Manage Patient Details**:
  - Add and update patient information (Name, Diseases, Allergies, Room Number, Age, etc.)
- **Create Food/Diet Charts**:
  - Plan meals for morning, evening, and night, with detailed ingredients and instructions (e.g., "no salt").
- **Manage Inner Pantry**:
  - Input pantry details (Staff Name, Contact Info, Location).
  - Assign tasks to pantry staff.
- **Track Meal Preparation & Delivery**:
  - Monitor preparation status.
  - Track delivery statuses for each meal.

### 2. Inner Pantry Functionality
- **Manage Food Preparation Tasks**:
  - View meal preparation tasks assigned by the Hospital Food Manager.
  - Update preparation status.
- **Manage Delivery Personnel**:
  - Add and manage delivery personnel details.
- **Track Meal Deliveries**:
  - Delivery personnel mark meals as "Delivered" after delivery to patient rooms.

### 3. Delivery Personnel Functionality
- **Mark Deliveries as Completed**:
  - Delivery personnel log in to mark deliveries as "Done" once delivered to patient rooms.
  
### 4. Dashboards
- **Hospital Food Manager Dashboard**:
  - Track food deliveries and view patient details.
  - Monitor pantry performance and meal delivery statuses.
- **Inner Pantry Dashboard**:
  - View all meal preparation and delivery tasks.
  - Monitor delivery statuses and updates.
## Technologies Used

### Backend:
- Node.js
- Prisma
- MongoDB
- Express.js 

### Frontend:
- React.js
- Vite.js
- Tailwind CSS (For UI components)

### Authentication:
- JWT or OAuth (for role-based login)

## Setup and Installation

Follow the steps below to clone and run this project locally.

### 1. Clone the Repository
Clone the repository to your local machine using the following command:

```bash
git clone https://github.com/your-username/hospital-food-delivery-management.git
cd hospital-food-delivery-management
```

### 2. Backend Setup
1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
2. Create a `.env` file in the `backend` directory and add the following:

   ```
   DATABASE_URL="mongodb+srv://your-username:your-password@cluster.mongodb.net/hospital-food-delivery"
   PORT=3000
   ```

3. Start the backend server using:

   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Create a `.env` file in the `frontend` directory and add the following:

   ```
   VITE_BACKEND_URL=http://localhost:3000
   ```

3. Start the frontend development server:

   ```bash
   npm run dev
   ```

4. Open the application in your browser at `http://localhost:5173`.

### 4. Authentication Credentials for Testing:
You can log in using the following credentials for testing different roles:

- **Hospital Food Manager**:
  - Email: `hospital_manager@xyz.com`
  - Password: `Password@2025`
  
- **Inner Pantry Staff**:
  - Email: `hospital_pantry@xyz.com`
  - Password: `Password@2025`
  
- **Delivery Personnel**:
  - Email: `hospital_delivery@xyz.com`
  - Password: `Password@2025`

Feel free to clone the repository, run the project locally, and contribute to improving it!
