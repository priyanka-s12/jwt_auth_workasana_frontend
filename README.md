# Workasana

**Workasana** is a task management and team collaboration tool where users can create projects, assign tasks to teams and owners, set deadlines, and organize work using tags. It supports authentication, dynamic filtering, URL-based queries, and reporting features to track task progress and team productivity.

## Features

1. JWT Authentication
   - JWT tokens are issued upon login and used for all subsequent requests to
    authenticate users.
   - Appropriate error responses are provided for cases like invalid login
    credentials or missing tokens.
   - Only authenticated users can access protected API endpoints.
2.  URL-based filtering:
  - Filters for tags, team, owner, and project will be reflected in the URL for
easy navigation and sharing of task views.
3. Reports and Visualisations:-
- Used Chart.js for visualizing task progress and report data.
Example visualizations include:
    - Total work completed last week (bar chart).
    - Tasks closed by each team (pie chart).
    - Pending work across projects (bar chart)

## Tech Stack

- Frontend: React, React Router for URL-based filtering, axios for API calls,
Chart.js for visualisations.
- Backend: Express.js with RESTful APIs, Mongoose for database interactions
with MongoDB.
- Database: MongoDB with models for tasks, teams, projects, and users.
- **Deployment -** Vercel

## To run locally
```
git clone https://github.com/priyanka-s12/jwt_auth_ws_frontend.git
cd jwt_auth_ws_frontend
npm install
npm run dev
```
