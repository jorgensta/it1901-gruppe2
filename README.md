# it1901-gruppe2

Oppsett på mac/terminal

1. Installer homebrew: /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
2. Installer mongoDB: brew install mongodb
3. Set opp lokalt database directory: mkdir -p /data/db
4. Sett rettigheter for mappen: sudo chown -R `id -un` /data/db
5. Start opp server, skrive dette i terminal-vindu: mongod 
6. Start et nytt terminal-vindu, start database med: mongo
7. skriv i terminalen etter punkt 6: use schmuka
8. finn frem til directoryen til prosjektet, og skriv "node app.js" i terminalen for å kjøre programmet.
9. Gå inn i webbrowseren på http://localhost:8080/




Database skal nå være oppe å gå lokalt på localhost:27017

Les lenker å slack
