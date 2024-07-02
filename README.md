![logowhitebig](https://github.com/ckang021/welp/assets/104466769/e6505998-4e38-4a10-b5d5-8f5768072e19)

## Welp

Welp is inspired by Yelp, which is itself a prominent online platform that connects its users to local businesses. 
Our site allows users to create their own account and peruse existing users' businesses, searched by a myriad of different categories.
The user is able to write, edit, and delete reviews and leave ratings for said businesses. The user is also able to create and manage his/her own businesses.

[Live Site](https://welp-m0r8.onrender.com/)

## Screenshots:
![ScreenRecording2024-06-23at7 11 00PM-ezgif com-video-to-gif-converter](https://github.com/ckang021/welp/assets/104466769/dc9c3895-73aa-44f7-8c43-b353fdf7b40d)
![ScreenRecording2024-06-23at7 18 38PM-ezgif com-video-to-gif-converter](https://github.com/ckang021/welp/assets/104466769/68694a40-0bfd-4150-9bac-2890973de067)
![ScreenRecording2024-06-23at7 41 49PM-ezgif com-video-to-gif-converter](https://github.com/ckang021/welp/assets/104466769/0bcfbb96-34dd-44f8-a8f7-f1aa9c2bab9b)


## Meet the devs:
- Andres Garcia:  [![](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/andres-garcia-047727238/)[![](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/AndresG18)
- Chris Kang:  [![](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/chris-kang247/)[![](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ckang021)
- Daniel Choi:  [![](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/daniel-choi-905970275/)[![](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/dschoi91011)

## Technologies Used:
![](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## Future Features:

- Google Maps API implementation
- Connecting to friends

## Getting started:

1. Clone this repository (only this branch).

2. Install dependencies.

   ```bash
   pipenv install -r requirements.txt
   ```

3. Create a __.env__ file based on the example with proper settings for your
   development environment.

4. Make sure the SQLite3 database connection URL is in the __.env__ file.

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention.**

6. Get into your pipenv, migrate your database, seed your database, and run your
   Flask app:

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. The React frontend has no styling applied. Copy the __.css__ files from your
   Authenticate Me project into the corresponding locations in the
   __react-vite__ folder to give your project a unique look.

8. To run the React frontend in development, `cd` into the __react-vite__
   directory and run `npm i` to install dependencies. Next, run `npm run build`
   to create the `dist` folder. The starter has modified the `npm run build`
   command to include the `--watch` flag. This flag will rebuild the __dist__
   folder whenever you change your code, keeping the production version up to
   date.

## Deployment through Render.com:

First, recall that Vite is a development dependency, so it will not be used in
production. This means that you must already have the __dist__ folder located in
the root of your __react-vite__ folder when you push to GitHub. This __dist__
folder contains your React code and all necessary dependencies minified and
bundled into a smaller footprint, ready to be served from your Python API.

Begin deployment by running `npm run build` in your __react-vite__ folder and
pushing any changes to GitHub.

Refer to your Render.com deployment articles for more detailed instructions
about getting started with [Render.com], creating a production database, and
deployment debugging tips.

From the Render [Dashboard], click on the "New +" button in the navigation bar,
and click on "Web Service" to create the application that will be deployed.

Select that you want to "Build and deploy from a Git repository" and click
"Next". On the next page, find the name of the application repo you want to
deploy and click the "Connect" button to the right of the name.

Now you need to fill out the form to configure your app. Most of the setup will
be handled by the __Dockerfile__, but you do need to fill in a few fields.

Start by giving your application a name.

Make sure the Region is set to the location closest to you, the Branch is set to
"main", and Runtime is set to "Docker". You can leave the Root Directory field
blank. (By default, Render will run commands from the root directory.)

Select "Free" as your Instance Type.

### Add environment variables

In the development environment, you have been securing your environment
variables in a __.env__ file, which has been removed from source control (i.e.,
the file is gitignored). In this step, you will need to input the keys and
values for the environment variables you need for production into the Render
GUI.

Add the following keys and values in the Render GUI form:

- SECRET_KEY (click "Generate" to generate a secure secret for production)
- FLASK_ENV production
- FLASK_APP app
- SCHEMA (your unique schema name, in snake_case)

In a new tab, navigate to your dashboard and click on your Postgres database
instance.

Add the following keys and values:

- DATABASE_URL (copy value from the **External Database URL** field)

**Note:** Add any other keys and values that may be present in your local
__.env__ file. As you work to further develop your project, you may need to add
more environment variables to your local __.env__ file. Make sure you add these
environment variables to the Render GUI as well for the next deployment.

## Deploy

Now you are finally ready to deploy! Click "Create Web Service" to deploy your
project. The deployment process will likely take about 10-15 minutes if
everything works as expected. You can monitor the logs to see your Dockerfile
commands being executed and any errors that occur.

When deployment is complete, open your deployed site and check to see that you
have successfully deployed your Flask application to Render! You can find the
URL for your site just below the name of the Web Service at the top of the page.

**Note:** By default, Render will set Auto-Deploy for your project to true. This
setting will cause Render to re-deploy your application every time you push to
main, always keeping it up to date.

[Render.com]: https://render.com/
[Dashboard]: https://dashboard.render.com/

# Backend API-Routes 🚙

This web app uses the following API routes to dynamically update the page to create a single-page-app-like feel for the user for specific features.

## USER AUTHENTICATION/AUTHORIZATION 👥

### All endpoints that require authentication

All endpoints that require a current user to be logged in.

* **Request:** endpoints that require authentication
* **Error Response:** Require authentication
  * **Status Code:** 401
  * **Headers:**
    * `Content-Type: application/json`
  * **Body:**
    ```json
    {
      "message": "Authentication required"
    }
    ```

### All endpoints that require proper authorization

All endpoints that require authentication and the current user does not have the correct role(s) or permission(s).

* **Request:** endpoints that require proper authorization
* **Error Response:** Require proper authorization
  * **Status Code:** 403
  * **Headers:**
    * `Content-Type: application/json`
  * **Body:**
    ```json
    {
      "message": "Forbidden"
    }
    ```

### Get the Current User

Returns the information about the current user that is logged in.

* **Require Authentication:** false
* **Request:**
  * **Method:** GET
  * **URL:** `/api/session`
  * **Body:** none
* **Successful Response when there is a logged in user:**
  * **Status Code:** 200
  * **Headers:**
    * `Content-Type: application/json`
  * **Body:**
    ```json
    {
      "user": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@gmail.com",
        "username": "JohnSmith"
      }
    }
    ```
* **Successful Response when there is no logged in user:**
  * **Status Code:** 200
  * **Headers:**
    * `Content-Type: application/json`
  * **Body:**
    ```json
    {
      "user": null
    }
    ```

### Log In a User

Logs in a current user with valid credentials and returns the current user's information.

* **Require Authentication:** false
* **Request:**
  * **Method:** POST
  * **URL:** `/api/session`
  * **Headers:**
    * `Content-Type: application/json`
  * **Body:**
    ```json
    {
      "credential": "john.smith@gmail.com",
      "password": "secret password"
    }
    ```
* **Successful Response:**
  * **Status Code:** 200
  * **Headers:**
    * `Content-Type: application/json`
  * **Body:**
    ```json
    {
      "user": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@gmail.com",
        "username": "JohnSmith"
      }
    }
    ```
* **Error Response: Invalid credentials**
  * **Status Code:** 401
  * **Headers:**
    * `Content-Type: application/json`
  * **Body:**
    ```json
    {
      "message": "Invalid credentials"
    }
    ```
* **Error Response: Body validation errors**
  * **Status Code:** 400
  * **Headers:**
    * `Content-Type: application/json`
  * **Body:**
    ```json
    {
      "message": "Bad Request",
      "errors": {
        "credential": "Email or username is required",
        "password": "Password is required"
      }
    }
    ```

### Sign Up a User

Creates a new user, logs them in as the current user, and returns the current user's information.

* **Require Authentication:** false
* **Request:**
  * **Method:** POST
  * **URL:** `/api/users`
  * **Headers:**
    * `Content-Type: application/json`
  * **Body:**
    ```json
    {
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@gmail.com",
      "username": "JohnSmith",
      "password": "secret password"
    }
    ```
* **Successful Response:**
  * **Status Code:** 200
  * **Headers:**
    * `Content-Type: application/json`
  * **Body:**
    ```json
    {
      "user": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@gmail.com",
        "username": "JohnSmith"
      }
    }
    ```
* **Error Response: User already exists with the specified email**
  * **Status Code:** 500
  * **Headers:**
    * `Content-Type: application/json`
  * **Body:**
    ```json
    {
      "message": "User already exists",
      "errors": {
        "email": "User with that email already exists"
      }
    }
    ```
* **Error Response: User already exists with the specified username**
  * **Status Code:** 500
  * **Headers:**
    * `Content-Type: application/json`
  * **Body:**
    ```json
    {
      "message": "User already exists",
      "errors": {
        "username": "User with that username already exists"
      }
    }
    ```
* **Error Response: Body validation errors**
  * **Status Code:** 400
  * **Headers:**
    * `Content-Type: application/json`
  * **Body:**
    ```json
    {
      "message": "Bad Request",
      "errors": {
        "email": "Invalid email",
        "username": "Username is required",
        "firstName": "First Name is required",
        "lastName": "Last Name is required"
      }
    }
    ```

## BUSINESS 🏪

### Get all Businesses

Returns a list of businesses.

* **Require Authentication:** false
* **Request:**
  * **Method:** GET
  * **URL:** `/api/bus`
  * **Body:** none
* **Successful Response:**
  * **Status Code:** 200

### Get all Businesses owned by the Current User

Returns all the businesses owned (created) by the current user.

* **Require Authentication:** true
* **Request:**
  * **Method:** GET
  * **URL:** `/api/bus/current`
  * **Body:** none
* **Successful Response:**
  * **Status Code:** 200

### Get details of a Business from an id

Returns the details of a business specified by its id.

* **Require Authentication:** false
* **Request:**
  * **Method:** GET
  * **URL:** `/api/bus/:bus_id`
  * **Body:** none
* **Successful Response:**
  * **Status Code:** 200
* **Error Response: Couldn't find a Business with the specified id**
  * **Status Code:** 404

### Create a Business

Creates and returns a new business.

* **Require Authentication:** true
* **Request:**
  * **Method:** POST
  * **URL:** `/api/bus`
* **Successful Response:**
  * **Status Code:** 201
* **Error Response: Body validation errors**
  * **Status Code:** 400

### Add an Image to a business based on the Business’s id

Create and return a new image for a business specified by id.

* **Require Authentication:** true
* **Require proper authorization:** Business must belong to the current user
* **Request:**
  * **Method:** POST
  * **URL:** `/api/bus/:bus_id/images`
* **Successful Response:**
  * **Status Code:** 200
* **Error Response: Couldn't find a Business with the specified id**
  * **Status Code:** 404

### Edit a Business

Updates and returns an existing business.

* **Require Authentication:** true
* **Require proper authorization:** Business must belong to the current user
* **Request:**
  * **Method:** PUT
  * **URL:** `/api/bus/:bus_id`
* **Successful Response:**
  * **Status Code:** 200
* **Error Response: Body validation errors**
  * **Status Code:** 400
* **Error Response: Couldn't find a Business with the specified id**
  * **Status Code:** 404

### Delete a Business

Deletes an existing business.

* **Require Authentication:** true
* **Require proper authorization:** Business must belong to the current user
* **Request:**
  * **Method:** DELETE
  * **URL:** `/api/bus/:bus_id`
  * **Body:** none
* **Successful Response:**
  * **Status Code:** 200
  * **Headers:**
    * `Content-Type: application/json`
  * **Body:**
    ```json
    {
      "message": "Successfully deleted"
    }
    ```
* **Error Response: Couldn't find a Business with the specified id**
  * **Status Code:** 404

## REVIEWS ⭐️

### Get all Reviews of the Current User

Returns all the reviews written by the current user.

* **Require Authentication:** true
* **Request:**
  * **Method:** GET
  * **URL:** `/api/reviews/current`
  * **Body:** none
* **Successful Response:**
  * **Status Code:** 200

### Get all Reviews by a Business’s id

Returns all the reviews that belong to a business specified by id.

* **Require Authentication:** false
* **Request:**
  * **Method:** GET
  * **URL:** `/api/bus/:bus_id/reviews`
  * **Body:** none
* **Successful Response:**
  * **Status Code:** 200
* **Error Response: Couldn't find a business with the specified id**
  * **Status Code:** 404

### Create a Review for a Business based on the Business’s id

Create and return a new review for a business specified by id.

* **Require Authentication:** true
* **Request:**
  * **Method:** POST
  * **URL:** `/api/bus/:bus_id/reviews`
* **Successful Response:**
  * **Status Code:** 201
* **Error Response: Body validation errors**
  * **Status Code:** 400
* **Error Response: Couldn't find a Business with the specified id**
  * **Status Code:** 404
* **Error Response: Review from the current user already exists for the Business**
  * **Status Code:** 500

### Edit a Review

Update and return an existing review.

* **Require Authentication:** true
* **Require proper authorization:** Review must belong to the current user
* **Request:**
  * **Method:** PUT
  * **URL:** `/api/reviews/:review_id`
* **Successful Response:**
  * **Status Code:** 200
* **Error Response: Body validation errors**
  * **Status Code:** 400
* **Error Response: Couldn't find a Review with the specified id**
  * **Status Code:** 404

### Delete a Review

Delete an existing review.

* **Require Authentication:** true
* **Require proper authorization:** Review must belong to the current user
* **Request:**
  * **Method:** DELETE
  * **URL:** `/api/reviews/:review_id`
  * **Body:** none
* **Successful Response:**
  * **Status Code:** 200
* **Error Response: Couldn't find a Review with the specified id**
  * **Status Code:** 404

## IMAGES 📸

### Delete a Business's Image

Delete an existing image for a Business.

* **Require Authentication:** true
* **Require proper authorization:** Business must belong to the current user
* **Request:**
  * **Method:** DELETE
  * **URL:** `/api/images/:image_id`
  * **Body:** none
* **Successful Response:**
  * **Status Code:** 200
* **Error Response: Couldn't find a Business Image with the specified id**
  * **Status Code:** 404

## ADD QUERY FILTERS TO GET ALL BUSINESSES 🔎

### Query Filters on Search 
Return businesses filtered by query parameters.

* **Require Authentication:** false
* **Request:**
  * **Method:** GET
  * **URL:** `/api/bus`
  * **Query Parameters:**
    * `page`: integer, minimum: 1, maximum: 10, default: 1
    * `size`: integer, minimum: 1, maximum: 20, default: 20
    * `minLat`: decimal, optional
    * `maxLat`: decimal, optional
    * `minLng`: decimal, optional
    * `maxLng`: decimal, optional
    * `minPrice`: decimal, optional, minimum: 0
    * `maxPrice`: decimal, optional, minimum: 0
  * **Body:** none
* **Successful Response:**
  * **Status Code:** 200
