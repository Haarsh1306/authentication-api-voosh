# authentication-api-voosh
SDE - Backend - Assignment - Voosh

## Prerequisites

- Node.js installed
- npm installed
- MySQL installed

## Installation

1. Clone the repository.
2. Run `npm install` to install dependencies.

## Usage

1. After installation, start the application by running `npm start`.
2. Setup database before start.

## Database Setup

1. Open MySQL shell in current directory.
2. Run the command `source database.sql` to initialize the database and create tables.

## Routes 
 #### /api/user/register - For registration of a user.
 #### /api/user/login - For user to log in.
 #### /api/user/myprofile - For fetching the profile details. 
 #### /auth/google - For log/sing up through google.
 #### /api/user/update - For updating the bio/name/password/public or private profile/email details of user.
 #### /api/allprofile - For fetching out all public profile for normal user and both public/private profile for admin user.
