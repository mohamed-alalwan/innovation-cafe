# Innovation Cafe
A coffee shop ordering website, offers customers various categories of dishes.

<a href="https://innovation-cafe-website.onrender.com/" target="_blank">Deployed Link</a>

## ERD
https://www.figma.com/file/DWx4fxEwYZKnhxA6w7jQts/Models?node-id=0%3A1&t=TaaaB8ZV2hki4Emr-1

## Wireframe:
https://www.figma.com/file/6dEYevHm9PS1g9bo3BH8mP/Innovation-Cafe-Layout?node-id=0%3A1&t=eqBAJtkNaD90YA6U-0

## Trello:
https://trello.com/b/078mfco7/project

## User Stories
- As a user, I want to be able to sign up, sing in, and sign out.
- As a user, I want to be able to see my profile and change my information.
- As a user, I want to have a menu of all the items and add more items, edit them, or delete them.
- As a user, I want to be able to reset my password if I forget it.
- As a user, I want to be able to add items to my cart and see thier details and the total price.

## Technology used
- EJS
- CSS
- Vanilla JavaScript
- Express
- Mongoose
- Firebase
- Multer
- cors

## Unsolved Issue
1. Image must be included whenever editing the item or the profile and this issue can be solved by making seperate method that accounts for no image input. And add a check whether an image input is detected or not.
2. User login disconnection and this issue can be solved by storing the session and cookie to preserve the state of the authentication.
3. The user cannot order if he is not signed in and this issue can be solved by making a guest user that makes account for none authenticated users.

## Future Enhancement
1. To make the App media friendly.
2. Checkout, order, and payment pages.
3. Re-ordering feature.
