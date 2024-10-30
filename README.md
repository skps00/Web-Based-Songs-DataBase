Project Name: Songs Database       
GROUP Number: 3 

GRUOP Leader :s12832089 *Li Ka Man
GRUOP Member1:s12878817 Chan Ka He
GRUOP Member2:s12874580 Mak Chun Wai<
GRUOP Member3:s13121007 Woo host

//the heroku for running the app  this link only can access before 28 th Novermber 2022
https://s381projectsongsdatabase.herokuapp.com/ 

//or

//npm for http://localhost:8888/
step1: click in the file that have server.js and package.json 
step2: type 'npm install' and 'npm start' in the terminal 
step3: type 'http://localhost:8888/' or 'HerokuLink' to the browser to access the Songs Database   


a)Login /Logout 
// user accounts:
There are only two users and their userid(id) would be sotred in session, information below:
User1:    Username: Mary      password: watermelon
User2:    Username: skps00    password: 69333

//Login/Logout return  //Testing 
When user successful login, user would be directed to HomePage.
When user unsuccessful login, user would be directed to the login page again.

b) Crud service
//Functions introduce/user guides:
1. Create - User can create new songs record by using 'create new songs' button in Home Page

2. Update - User can click "Show All songs">>select the songs that want to edit >>"Edit the Songs" button for updating the name, type, cost 
   and year, Id would not allow to edit.

3. Delete - User can click "Show All songs">>select the songs that want to delete>>click "Delete the songs" 

4. Search - User can click "Show All songs" for searching all songs records and displaying all songs records 

//testing for crud service
1. Create -- User can create new songs with those conditions:
             id: Positive number
             name: String
             type: String 
             cost: Positive number
             year: Positive number

If user input error type, they will be directed to reject page and the records would not be allowed.
If user input correct, they will be directed to Home page and can see the record by clicking "Show All Songs" button 

2.Update-- User can update the following information of those conditions below:
           //User would not allow to change the ID, as it used to connect the data
             name: String
             type: String 
             cost: Positive number
             year: Positive number
Then user can click "Submit" button for updating the songs information.

3.In the "The details of songs" page, user can "delete"button, then user would be redirected to Songs Display Page 

4. Searching all songs information successfully.

c)Restful api example from terminal
。Restful api DELETE /restful/delete/:id
curl -X DELETE localhost:8888/restful/delete/55

。Restful api create
curl -X POST -H "Content-Type: application/json" --data '{"id": "12345" , "name": "This is a song", "type": "classic", "singer": "Ben", "cost": "20","year":"1955"}' https://s381projectsongsdatabase.herokuapp.com/restful/create

Restful api example from website 
。Restful api DELETE /restful/delete/:id
curl -X DELETE localhost:8888/restful/delete/55

。Restful api create
curl -X POST -H "Content-Type: application/json" --data '{"id": "12345" , "name": "This is a song", "type": "classic", "singer": "Ben", "cost": "20","year":"1955"}' https://s381projectsongsdatabase.herokuapp.com/restful/create













