
##develop
cd flashcards
ng serve
http://localhost:4200/

##deploy
ng build --prod --base-href=/flashcards/
copy `dist/flashcards` folder to web server
