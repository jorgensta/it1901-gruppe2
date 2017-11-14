# Schmuka ![alt text](https://github.com/jorgensta/it1901-gruppe2/blob/Develop/views/schmukaLogoFavicon.png "Schmuka")
##### IT1901 - gruppe 2

This is a group project for the course IT1901 - Informatics, Project I at Norwegian University of Science and Technology, Trondheim, Norway.

## Objective (translated from Norwegian)
"Imagine that you are making a system for a group in a student festival that has the responsibilites of arranging concerts at different scenes. 
The concerts involve stage rigging, technical walkthrougs and artist booking."

We were then given a set of user stories to implement. We were free to use our prefered programming language.
 
### Setup using Mac and your preferred terminal client
```bash
cd ~
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"  #Installing Homebrew
brew install node  #Installing node.js
brew install mongodb  #Installing mongoDB
mkdir -p /data/db
sudo chown -R `id -un` /data/db
git clone https://github.com/jorgensta/it1901-gruppe2
cd it1901-gruppe2
npm install

#Open up a new terminal window
mongod

#Open up another terminal window and start running the database
mongo
use schmuka
db.schmuka.insert({"dummy":"dummy"})

#Open up another terminal window to fill the database with dummy data
mongorestore -d schmuka it1901-gruppe2/db/schmuka
```
### Running the application

Make sure that the mongodb-server is up and running.
Open up the project and run it by typing the following commands:
```bash
cd it1901-gruppe2
node app.js
```

The application is now running locally in your web browser. Visit it at localhost:8080. 
Usernames and passwords are found within ```brukere.txt```.

### Future development 
Feel free to explore and improve our project. Its due date for the course was 9th November 2017.
