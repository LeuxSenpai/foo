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

libraries:
axios bcryptjs jsonwebtoken nodemailer react-hot-toast mongoose

## NOTE:
-edge run framework: it doesnt stay connexted with database ,you have to make seperate calls
unlike other backends where db is always connected ,next js connect to the db when calls are made

-once user,smail,pass is verified we created a jsonwebtoken (encrpt) and send this into users cookies (not inthe local storage to avoid manupilation).Its mainly used for authorization not authentication
the browser should know whenever you will access for that we store ur id email in payload (json data)

-every db call should use await

-if consolelog is in "use Client" it can be seen on the browser otherwise it can be seen in terminal

# Process
first set up cloud for database ( mongoose ) 
    copy mongoose_url from cloud and add to .env 


set up the Frontend
-login
-signup
-profile

all this are in page.tsx and added a little code



## Issues Faced

-problems face when url was write access was granted but used token and auotherization from middle wear and jwt to resolve this issue

-db was already existing from fist req but i sent another req which created another db connection which choked the application

-the person who already signed in or logged in shouldnt be able to access login/signup page without logout
-also without sign in we can access profile page 
-its time to add middle wear to protect the pages and allows you to run code before request is completed

-please add toast

-remove from console.log

 