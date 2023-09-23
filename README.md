# **Trello Clone Study**



https://github.com/OmerYesilkaya/trello-copy-study/assets/21025975/983dfc62-0c65-427d-88a4-37ac3b8d786c



## **Running the project**

Before you begin to run the project you need to have either npm or yarn installed on your computer.
After that you should;

-   Clone the repo
-   Open up a command prompt in the file you cloned the repo
-   Run `yarn` if you have yarn installed, if not run `npm install`
-   Once that's done run `yarn start` ( _`npm start` if yarn is not installed_ ) and the project will start

## **Project Overview**

This project emulates a minimalistic version of a Trello-like board application, consisting of two main pages:

1. **Board Overview Page**: Where users can view their boards.
2. **Board Details Page**: This displays the details of the selected board.

### **Navigation and Visual Elements**

The navigation bar contains several buttons for aesthetic purposes only, with the exception of the home button and the Trello logo, which will navigate the user back to the homepage upon click.

### **Creating a Board**

Users can create a new board by pressing the "Create a Board" button and providing a name and a theme color for the board. Upon creation, users are immediately directed to the details of the newly created board.

### **Board Details Page**

#### **Functional Elements**

-   **Search Bar**: Filters cards by names, tags, and comments.
-   **Star Icon**: Flags the board as a favorite (currently no practical functionality).

#### **Adding & Managing Lists**

Users can add new lists and manage existing ones. Each list allows the user to:

-   Add new cards.
-   Delete the list via the trash can icon.
-   Edit the list name by clicking on it.

#### **Cards Management**

Cards created within the lists are clickable, revealing a modal with all related details. Within this modal, users can:

-   View, add, update, and delete descriptions, comments, tags, and color.
-   Since there’s no user system, comments can be perceived as being from the same user and are all editable and removable.

#### **Reordering**

Users have the ability to:

-   Drag the whitespace on lists to rearrange them or move them between each other.
-   Drag cards to move them to other lists or rearrange them within the same list.

### **Data Persistence**

All changes made within the app are stored in local storage, ensuring data retention even after a page refresh. Unless local storage is cleared, this app can effectively serve as a local to-do app.

### **Feedback and Bug Reports**

If you encounter any errors or bugs that might have been overlooked, please don’t hesitate to let me know by emailing me at [omerfarukyesilkaya@gmail.com](mailto:omerfarukyesilkaya@gmail.com).

## **Technologies used in the project**

-   React
-   TypeScript
-   Zustand
-   ChakraUI
-   FramerMotion
-   React DnD Awesome
