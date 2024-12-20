# Photo Sharing App

## Overview
The Photo Sharing App is a simple web application built with Next.js, Prisma, PostgreSQL, and TailwindCSS. It allows users to upload image URLs, display uploaded images with their associated comments, and reset the database.

## Features
- Upload photo URLs to the application.
- View uploaded photos in a centralized grid layout.
- Add comments to individual photos.
- Reset the database to remove all photos and comments.
- Fully responsive design.

## Tech Stack
- **Frontend:** Next.js with React and TailwindCSS
- **Backend:** Prisma ORM with PostgreSQL
- **Image Handling:** `next/image` for optimized image rendering
- **API Calls:** Axios

## Prerequisites
1. Node.js (v16 or higher)
2. PostgreSQL database instance
3. Prisma CLI installed globally (`npm install -g prisma`)

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/photo-sharing-app.git
cd photo-sharing-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure the Database
- Create a `.env` file in the project root with the following:

```env
DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database_name>
```
- Replace `<username>`, `<password>`, `<host>`, `<port>`, and `<database_name>` with your PostgreSQL credentials.

### 4. Initialize Prisma
Run the following commands to generate Prisma client and migrate the database:
```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 5. Run the Development Server
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Project Structure
```
project-root/
├── prisma/                 # Prisma schema and migrations
├── src/
│   ├── app/
│   │   └── page.tsx       # Main frontend component
│   ├── pages/
│   │   └── api/           # Backend API routes
│   │       ├── photos.ts  # Photo-related routes
│   │       └── reset.ts   # Reset database route
│   └── styles/            # Global styles
├── next.config.js          # Next.js configuration
├── tailwind.config.js      # TailwindCSS configuration
└── package.json
```

## API Endpoints

### 1. Add a Photo
- **Endpoint:** `POST /api/photos`
- **Payload:**
  ```json
  {
    "url": "https://example.com/photo.jpg"
  }
  ```
- **Response:**
  ```json
  {
    "id": 1,
    "url": "https://example.com/photo.jpg",
    "comments": []
  }
  ```

### 2. Fetch All Photos
- **Endpoint:** `GET /api/photos`
- **Response:**
  ```json
  [
    {
      "id": 1,
      "url": "https://example.com/photo.jpg",
      "comments": []
    }
  ]
  ```

### 3. Add a Comment
- **Endpoint:** `POST /api/photos/:photoId/comments`
- **Payload:**
  ```json
  {
    "text": "This is a comment."
  }
  ```
- **Response:**
  ```json
  {
    "id": 1,
    "text": "This is a comment."
  }
  ```

### 4. Reset Database
- **Endpoint:** `POST /api/reset`
- **Response:**
  ```json
  {
    "message": "Database reset successfully."
  }
  ```

## Customization
- Update the Tailwind configuration (`tailwind.config.js`) for styling.
- Modify the Prisma schema (`prisma/schema.prisma`) to include additional fields or tables if needed.

## Deployment

### 1. Build the Application
```bash
npm run build
```

### 2. Start the Server
```bash
npm start
```

### 3. Deploy to Vercel
- Follow the [Next.js deployment guide](https://nextjs.org/docs/deployment) to deploy the app to Vercel.

## Troubleshooting
- **Hydration Errors:** Ensure all React components are client-side by adding the `"use client"` directive at the top of the file.
- **Database Connection Issues:** Verify the `DATABASE_URL` in the `.env` file and ensure the database is running.