This is an React + Redux + (Loader image enabled) + ASP.Net Core C# + JWT + Authorization + API + cache + Mongo DB app

You will need MongoDb to run the app, MongoDb can be installed via docker or directly downloading.

To get mongoDb via Docker, follow these steps:

     docker login
     
     docker pull mongo

     docker run --name mongo_v1 -d -p 27023:27017 mongo

These 3 are all steps that will have our MongoDb running in our machine. To check if its running we can check via

    docker ps

It should show that Mongo is running and its port is 27023. 

Next we will use this port Id in our project's appsettings.json file in the root folder and set the value of connection string according to this new port Id.


    "ToDoDatabaseSettings": {
      "ToDoCollectionName": "ToDoList",
      "ConnectionString": "mongodb://localhost:27023",
      "DatabaseName": "ToDoDb"
    },
    "UserDatabaseSettings": {
      "UserCollectionName": "Users",
      "ConnectionString": "mongodb://localhost:27023",
      "DatabaseName": "ToDoDb"
    },

Second way is without docker and it is to install Mongo Db directly in the machine. For this we dont need to make any change in the appSettings.json as Port is 27017 in this case.


In both cases, after getting the MongoDb running, we can open it via Mongo compass and then crate a Database(name = ToDoDb),  then save json tables data there, tables/collections json files are there in MongoDB tables <a href="https://github.com/qwertycod/ToDoApp2022/tree/main/Mongodb%20tables">folder<a/>



Run in Dot net Core 5.1 version using Visual studio 2019 or Dot net core 6 version in Visual studio 2022 or plus

Open the app through the solution (.sln) ToDoApp.sln file

Default username - Kelly, password - 1234

more users can be found in mongodb table > users.json

Connect and watch our blog bost ( not live from Aug 23 ) - [https://qwertycod.com/](https://qwertycod.com/creating-a-react-app-with-dotnet-core-as-backend-and-publishing-on-azure/) for more apps and related topics....

It appears like this on successful login:

![image](https://github.com/qwertycod/ToDoApp2022/assets/112320985/b41a5013-8561-49b1-b139-d82ead244438)
