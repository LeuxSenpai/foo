## file structure
i created the filestructure before getting into the code
src
└──app
    ├──backend
    │   └──api
    │       └──users
    │           ├──login
    │           │   └──route.ts
    │           └──signup
    │               └──route.ts
    │
    └──frontend
        ├──login
        │   └──page.tsx
        └──signup
            └──page.tsx

├──models
├──helpers
├──dbConfig
└──.env

## Installation
edge run framework: it doesnt stay connexted with database ,you have to make seperate calls
unlike other backends where db is always connected ,next js connect to the db when calls are made

I set up cloud for database ( mongoose ) 
    copy mongoose_url from cloud and add to .env 

libraries:
axios bcryptjs jsonwebtoken nodemailer react-hot-toast mongoose

## Frontend
-login
-signup
-profile

all this are in page.tsx and added a little code

## Issues Faced

-db was already existing from fist req but i sent another req which created another db connection which choked the application

-please add toast

-remove from console.log

 