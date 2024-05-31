# Flat Share Application 
Flat Share Application is a web application designed to facilitate the process of finding and renting shared accommodation. It allows users to list available flats, search for flats based on various criteria, book flats, and manage their profiles. The application is built using TypeScript, Express.js, Prisma for PostgreSQL, and JWT for authentication.

## Live URL

[Visit Blood Donation Application](https://flat-share-server.vercel.app/)

## Features

1. *User Registration*: Users can register on the platform providing necessary details including name, email, password, blood type, location, age, and last donation date.
2. *User Login*: Registered users can securely log in using their email and password.
3. *Find Flat*: Users can search for flats based on various criteria such as location, address, name. The results are paginated and sortable.

4. *View and Update Profile*: Users can view and update their profile information including bio, age, and last donation date.
5. *Error Handling*: Comprehensive error handling mechanisms are in place, providing detailed responses for validation errors, general errors, and unauthorized access attempts.

## Technology Used

- *Programming Language*: TypeScript
- *Web Framework*: Express.js
- *Object Relational Mapping (ORM)*: Prisma for PostgreSQL
- *Authentication*: JWT (JSON Web Tokens)

## Running the Application Locally

To run Blood Donation Application locally, follow these steps:

1. *Clone the Repository*: Clone the Blood Donation Application repository to your local machine using Git:

    bash
    git clone  https://github.com/Porgramming-Hero-web-course/l2-b2-fullstack-track-assignment-8-saifulaija
    

2. *Install Dependencies*: Navigate to the project directory and install dependencies using npm or yarn:

    bash
    cd l2-b2-fullstack-track-assignment-8-saifulaija
    npm install
    

    or

    bash
    cd l2-b2-fullstack-track-assignment-8-saifulaija
    yarn install
    

3. *Set Up Environment Variables*: Create a .env file in the root directory of the project and add the following environment variables:

    plaintext
    DATABASE_URL=your_postgres_database_url
    JWT_SECRET=your_jwt_secret_key
    

    Replace your_postgres_database_url with the URL of your PostgreSQL database and your_jwt_secret_key with a secret key for JWT token encryption.

4. *Database Migration*: Run Prisma migration to apply database schema changes:

    bash
    npx prisma migrate dev 
    

5. *Start the Server*: Start the development server:

    bash
    npm run dev
    

    or

    bash
    yarn dev
    

6. *Access the Application*: Once the server is running, you can access the Blood Donation Application application locally at [http://localhost:3000](http://localhost:3000).

7. *Explore the API*: Use API endpoints to interact with the application. Refer to the API documentation for available endpoints and request/response formats.

## Additional Information

- The application follows RESTful API design principles for its endpoints.
- Global error handling middleware ensures consistent error responses throughout the application.
- User authentication is secured using JWT tokens, ensuring a scalable and secure authentication mechanism.
- PostgreSQL is used as the database for storing user and donation request data.
- Detailed API documentation is provided for easy integration with the platform.
