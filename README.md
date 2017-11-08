# Schmuka
![alt text](https://github.com/jorgensta/it1901-gruppe2/blob/Develop/views/schmukaLogoKnappTransparent.png "Schmuka")


#####IT1901 - gruppe 2

###Oppsett på mac/terminal

1. Klon prosjektet: ```git clone https://github.com/jorgensta/it1901-gruppe2```
2. Installer homebrew (package management system): ```/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"```
3. Installer mongoDB: ```brew install mongodb```
4. Sett opp lokalt database directory: 
```mkdir -p /data/db```
5. Sett rettigheter for mappen:
```sudo chown -R `id -un` /data/db```
6. Start opp server ved å skrive dette i et nytt terminal-vindu: ```mongod```
7. Åpne opp et nytt enda terminal-vindu, start database med: ```mongo``` og ```use schmuka```
9. Skriv deretter inn i samme terminal-vindu: ```db.schmuka.insert({"dummy":"dummy"})```
10. Last inn all dummydata ved å skrive dette i et nytt terminal-vindu: ```mongorestore -d schmuka it1901-gruppe2/db/schmuka```


###Kjør applikasjonen
1. Åpne prosjektmappen i terminal: ```cd it1901-gruppe2```
2. Kjør appen i terminal: ```node app.js```
3. Gå inn i webbrowseren på http://localhost:8080/