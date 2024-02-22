# B2 CRUD

## Description
This B2 CRUD application is designed to demonstrate basic Create, Read, Update, and Delete (CRUD) operations using Node.js, Express, and MongoDB. It serves as an assignment submission for course 1DV528 at Linnaeus University.


## Instructions and Usage
### Prerequisites
* Node.js (v18.13.0 or later recommended)
* npm (comes with Node.js)
* Docker and Docker Compose (for running the application in a Docker container)
* Git (for cloning the repository)



### Clone the repo 

```
git clone git@gitlab.lnu.se:1dv528/student/sy222ea/b2-crud.git
cd b2-crud
```
<br>

## Running locally 
Install Dependencies<br>
Install the necessary npm packages:
```
npm install
```
<br>
Configure Environment Variables <br>

Copy the .env.example file to a new file named .env and fill in your MongoDB URI and any other required environment variables:


```
cp .env.example .env
```

Start the application using npm:

```
npm start 

```
Your application should now be running on http://localhost:3000.

## Using Docker

Build and Run with Docker Compose<br>
To build and run the application using Docker Compose, ensuring MongoDB is also started in a Docker container

```
docker-compose up --build
```

This will start the application and MongoDB service. Your application will be accessible on http://localhost:3000.

To stop the Docker containers:

```
docker-compose down
```


## Additional information
* Ensure you have MongoDB running if you choose to develop or run the application locally without Docker. You can also use a MongoDB service hosted in the cloud, such as MongoDB Atlas.
* For local development, consider using nodemon for automatic restarts on code changes. You can install nodemon globally (npm install -g nodemon) or as a dev dependency (npm install --save-dev nodemon) and adjust the start script in package.json or run nodemon app.js directly.
