## file structure
src/
│
├── app/
│   ├── backend/
│   │   └── api/
│   │       └── users/
│   │           ├── login/
│   │           │   └── route.ts        # POST /backend/api/users/login
│   │           ├── signup/
│   │           │   └── route.ts        # POST /backend/api/users/signup
│   │           ├── logout/
│   │           │   └── route.ts        # GET /backend/api/users/logout
│   │           └── me/
│   │               └── route.ts        # GET /backend/api/users/me
│   │
│   └── frontend/
│       ├── layout.tsx                  # Global layout for frontend pages
│       ├── globals.css                 # Global styles
│       │
│       ├── login/
│       │   └── page.tsx                # Login page
│       │
│       ├── signup/
│       │   └── page.tsx                # Signup page
│       │
│       ├── profile/
│       │   └── page.tsx                # Profile page
│       │
│       ├── ranking/
│       │   └── page.tsx                # Rankings page
│       │
│       ├── games/
│       │   └── page.tsx                # Games page
│       │
│       └── components/
│           └── Navbar.tsx              # Navbar component
│
├── models/
│   └── userModel.ts                    # User schema (add position field here)
│
├── helpers/
│   └── getDataFromToken.ts             # Decode JWT helper
│
├── dbConfig/
│   └── dbConfig.ts                     # MongoDB connection
│
├── lib/
│   └── axiosInstance.ts                # Axios interceptor for auto logout
│
├── middleware.ts                       # Protects frontend routes
│
└── .env                                # Environment variables


## Installation

libraries:
axios bcryptjs jsonwebtoken nodemailer react-hot-toast mongoose

Axios:
Axios is a promise-based HTTP client for the browser, and Node. js allows you to send HTTP requests to communicate with an API. It is lightweight, easy to use, and supports most standard HTTP methods such as GET, POST, PUT, and DELETE.28 Feb 2025

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

--after login the navbar isnt dissapearing

-i added a new value to my schema but it isnt getting saved in db cloud

-after some duration the token is getting expired because of that data cant be received, We must create automatic logout after token expired

-problems face when url was write access was granted but used token and auotherization from middle wear and jwt to resolve this issue

-db was already existing from fist req but i sent another req which created another db connection which choked the application

-the person who already signed in or logged in shouldnt be able to access login/signup page without logout
-also without sign in we can access profile page 
-its time to add middle wear to protect the pages and allows you to run code before request is completed

-please add toast

-remove from console.log

 