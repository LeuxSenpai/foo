## file structure
i created the filestructure before getting into the code
src
└── app
    ├── backend
    │   └── api
    │       └── users
    │           ├── login
    │           │   └── route.ts
    │           └── signup
    │               └── route.ts
    │
    └── frontend
        ├── login
        │   └── page.tsx
        └── signup
            └── page.tsx

├── models
├── helpers
├── dbConfig
└── .env

## Installation
edge run framework: it doesnt stay connexted with database ,you have to make seperate calls

I set up cloud for database ( mongoose ) 
    copy mongoose_url from cloud and add to .env 

libraries:
axios bcryptjs jsonwebtoken nodemailer react-hot-toast mongoose

## Frontend
-login
-signup
-profile

all this are in page.tsx and added a little code
 