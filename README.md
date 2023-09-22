# Trello Clone Study

https://user-images.githubusercontent.com/21025975/135898959-a4189c32-779b-4fb5-9e1f-1dea687cb500.mp4

### Running the project

Before you begin to run the project you need to have either npm or yarn installed on your computer.
After that you should;

-   Clone the repo
-   Open up a command prompt in the file you cloned the repo
-   Run `yarn` if you have yarn installed, if not run `npm install`
-   Once that's done run `yarn start` ( _`npm start` if yarn is not installed_ ) and the project will start

### About the project

Project consists of 2 pages, one is where user views the boards and the other is the details of the board.

Buttons on the navbar ( _except home button and trello logo, which will route user to home page on click_ ) and the homepage are there for visuals, they don't have any functionality.

To add a new board user would press "Create a board" button and give it a name and a theme color. Doing this will immediately route user to created board details.

In details page user will see an empty board with a board navbar on top. Only search bar and star icon has functionality, rest is there for looking like Trello. Star allows you to flag the board as favorite, this doesn't mean anything right now but maybe in the future. Search bar will filter the cards by looking at their names, tags and comments and showing only the matching cards and their parent lists.

In board details page, user also could add new lists pressing "Add another list" button.

Lists have "Add card" button to add cards to the lists. A trash can icon to delete the list. Clicking the list name allows user to edit the said lists name. Other buttons are there to look like Trello, they dont have any functionality.

Created cards are clickable and will open up a modal once clicked. In these modals user can see everything about the card, add a description, add comments, tags and color. Since there is no user system all the comments are from the same user and all of them are deletable and updateable. Cards are also deletable by clicking the "Kartı sil" button on the left bottom corner.

By dragging the whitespace on lists user is able to rearrange and move lists between each other. By dragging the cards user is able to move cards to other lists or rearrange cards within lists.

---

All the changes made in the app are stored in local storage, refreshing the page will not result in the data being lost. Unless you clean your local storage, you can use this app locally as a todo app.

If there are any errors or bugs I have missed please let me now by mailing me:
omerfarukyesilkaya@gmail.com

### Technologies used in the project

-   React
-   TypeScript
-   ChakraUI
-   FramerMotion
-   React DnD Awesome
-   Zustand
