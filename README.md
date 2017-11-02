# it1901-gruppe2

Oppsett på mac/terminal

1. Skriv inn dette i terminal: git clone https://github.com/jorgensta/it1901-gruppe2
2. Installer homebrew: /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
3. Installer mongoDB: brew install mongodb
4. Sett opp lokalt database directory: mkdir -p /data/db
5. Sett rettigheter for mappen: sudo chown -R \`id -un\` /data/db
6. Start opp server, skriv dette i terminal-vindu: mongod
7. Start et nytt terminal-vindu, start database med: mongo
8. Skriv inn samme terminal-vindu: use schmuka
9. Skriv deretter inn i samme terminal-vindu: db.schmuka.insert({"dummy":"dummy"})
10. Last inn all dummydata ved å skrive dette i et nytt terminal-vindu: mongorestore -d schmuka it1901-gruppe2/db/schmuka
11. Skriv inn dette i terminal: cd it1901-gruppe2
12. Skriv inn dette i terminal: node app.js
13. Gå inn i webbrowseren på http://localhost:8080/
