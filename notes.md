


App.use is to include more middlewares , same we will use in router.use to include the middlewares as well
app.use will include middleware for all the api on the file

app.use also helps us in mouting the router 
ex : app.use("/url" , router_name) -> will mount the router

one another way , is what we say in express_index.js in 14_client_server
ex : app.get(url, [middlewares] , (req,res)=>{})


Generally we have ORM and ODM 
we can separate Node based ORM , Rails based ORM etc. based on the tech stack we are using.
ORM - is for SQL. Multiple are there , we will be using sequelize 
ODM - is for NO SQL

sequelize - for this we also need a driver , to tell it to which relational db it is going to connect .
            ex : mariadb , sqlite3
            After installing drivers also , we have to do lot of coding on order to setup the ORM
            in order to avoid thet we can use a library sequelize pacakage sequelize-cli
            `https://github.com/sequelize/cli `(check the commands in usage seciton)
            `https://sequelize.org/docs/v6/core-concepts/model-basics/`

Our implementation is inside src folder 
so there is a command sequelize init , which does some init stuff
so we will run "`npx sequelize init`" inside src folder (npm is package manager , npx is package executer)
To which it says : 
Created "config/config.json"
Successfully created models folder at "/Users/prateekramani/javascript/16_Base_NODE_JS_Template/src/models".
Successfully created migrations folder at "/Users/prateekramani/javascript/16_Base_NODE_JS_Template/src/migrations".
Successfully created seeders folder at "/Users/prateekramani/javascript/16_Base_NODE_JS_Template/src/seeders".
             
config.json - gives us 3 databases env :  developement , test , production env 
            it picks up the host , on which database is hosted 
            password - we need to mention it , if it is there , same for username
            until and unless we are working on default port , we dont need to mention it 
            dialect , it will tell us which relational database it is going to connect to - mysql

            and since this file has sensitive info , we will hide it , by putting it in gitignore 

seeders - seeders is used to inject the starting data in the db 

migrations - to do version control of our database
            for us these will be js files , in which we will write how to maintain the version in DBs
            sequelize migration:generate or  sequelize migration:create


Creation of Model 
`npx sequelize model:create --name Airplane --attributes modelNumber:string,capacity:integer`  
(run inside source folder)

New model was created at /Users/prateekramani/javascript/17/NodeJS-Base-Template/src/models/airplane.js .
New migration was created at /Users/prateekramani/javascript/17/NodeJS-Base-Template/src/migrations/20230602132447-create-airplane.js .

This doesnt creates table inside DB , only model and migration is added 
migration are like git add , (git push is not done yet)

In migration we have queryInterface , via which we can write the raw query to make changes in SQL databse 

There are two types of contraints we can put 
    via JS
    via DB model

If we are making any separate changes in model those are at JS level constraint 
If we are making any separate changes in migration then those are at DB level constraint

`npx sequelize db:migrate` - applies all the pending migration , which it is able to track via uniuque num file created in migration folder.
This creates table inside DB
It also creates SequelizeMeta table , which contains the last migration applied 

We can undo the migration as well
`npx sequelize db:migrate:undo`

whenever we do migrate , async up() function of migration file is applied ,
whenever we do migrate:undo , async down() function of migration file is applied ,

Migration can  : 
1.) add a table 
2.) alter a table 
As soon as we do another model generate , another migration file will be created 

If we add Default attribute only in migration file , then it will be only added in db 
default value wont come from JS 

If we make changes to our model, then we should we take a migration of it 
else if we dont create a model, we will see the changes at JS level but not at DB level 

We shouldn't make any changes in older migration

`npx sequelize db:create`



why do we need to use logger in everyfile ?
    firstly , so that we can have a track of error stack. (this we can get it fix with the help of error stack)

so , no we have create a appError class , extending error class , so that all the errors can be consistent 
(normally we dont have anything as "explanation" in normal error class , but here we designed it amd embedded in each and every file , so that consistenct is there)
and to check where it failed  , we can use errorstack
Likewise we can also have separate Validation error , in which we can design a custom error message

Why do we need validation check in backend , it can be in Frontend also
    What if call came from some other backend 
    from Postman
    from a mobile app , where validation check is not there in the frontend



Moreover we can also create a common JSON for all the error messages , like we are doing for HTTP codes
this will be help in multiple-languaze projects 
will reduce redundancy (Something went wrong at multiple places)


We have `npx sequelize seed:generate --name add-airplanes` 
New seed was created at /Users/prateekramani/javascript/17/NodeJS-Base-Template/src/seeders/20230605153430-add-airplanes.js .

 `npx sequelize db:seed:all`         Run Async up function

 And all of the data will be inserted 

 We can also seed only a particular file 


 `npx sequelize db:seed:undo:all` - Run Async down function

