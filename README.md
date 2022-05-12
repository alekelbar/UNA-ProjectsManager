<h1 align="center">Simple projects manager</h1>
<p align="center"><strong> What is this project about?</strong></p>

</br>

<p align="center">
<img width="400px" height="400px" src="https://imgs.search.brave.com/phkIKUDqvNo_5IxgjvOnHdp6dk0mMXy5_2XPqYHeLkY/rs:fit:768:768:1/g:ce/aHR0cHM6Ly9wYnMu/dHdpbWcuY29tL21l/ZGlhL0RJUW44dGhY/WUFJTGFVdC5qcGc"></img>
</p>
</br>

It is a simple university work, it only seeks to build a functional project manager using web technologies. It may be prone to failures, as it is built by students with little experience in the field, however, we are open to constant improvements, and we rely on an iterative management methodology for the constant implementation of improvements.

<p style="background-color: black; color: white; text-align: center">How is this project built?</p>

For the construction of the project, we are using Apollo-Server, and it is executed using Node.js as the engine. Technologies based on client-server architecture. Our architecture corresponds to a non-relational database hosting service, an access system using Mongoose, and a query system organized using GraphQL.

</br>
<p style="background-color: black; color: white; text-align: center">How can I install this service?</p>

You can follow the installation guide below :D!

Installation requirements:
* *Node.js* > 16.15.0
* *npm* > 8.10.0
* *git* > 2.36.1
* A functional *mongo atlas cluster*, and its corresponding *connection string*

</br>
First, you will need to download this project, you can do it with the following instruction after moving to where you want to host it.

```
git clone https://github.com/alekelbar/UNA-ProjectsManager.git
```

Now, what we want to do is to go into the root folder of the project, and install the dependencies. Do it with the following instruction.

```
cd UNA-ProjectsManager 
cd backend
npm install
```

If you run the project right now, the only thing you will get is an **error**. It looks something like this.

```
DataBase: An error has been occur
MongooseError: The `uri` parameter to `openUri()` must be a string, got "undefined". Make sure the first parameter to `mongoose.connect()` or `mongoose.createConnection()` is a string.
```

It is completely normal, for security reasons, the project uses a dependency called **dotEnv**, so it requires a previous configuration. Execute the following instruction.

```
touch .env && echo "MONGO=" >> .env
```

With your favorite text editor, edit the .env file and add your connection string(previously required)

For example, you can use VIM, it's great.

```
vim .env
```

Now your installation is correct, you can run 

```
npm run dev
```

and then check your installation on it 

```
http://LocalHost:4000
```

<footer style="background-color: black; color: white; text-align: center">Thank you for your download, do not forget to drink water.</footer>

</br>






