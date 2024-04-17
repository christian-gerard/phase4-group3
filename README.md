# 🐇 Rabbit Rabbit 🐇

Do you remember what you last dreamed about? Do you remember who was in it? What happened? Or even better - did you ask yourself why you dreamed what you did?

Dreams have always been a deep source of mystery. To this day we do not fully comprehend their purpose or why we have certain dreams. While we can not fully comprehend dreaming diving into your own dreams is a source of creative inspiration and self introspection. Keeping a dream journal allows individualsto remember their dreams more frequently. Through review those recorded dreams one can discover patterns and draw conclusions about their own psyche. 

Begin dream journaling with Rabbit Rabbit. The Rabbit is commonly associated with the moon and night hence the name. In Chinese folklore, the Jade Rabbit lives on the moon where they create the elixir of life.  If one squints at the moon you might be able to see the outline of a rabbit working away with a mortar and pestle. As the Jade Rabbit toils away we are in a dreamstate experiencing a complex physical/psychological process. Without the proper journalling tool those experiences go to waste. Begin dream journalling via Rabbit Rabbit!

## Set Up

1. Clone the Repository
2. Run Backend Server
```
    $ pipenv install
    $ pipenv shell
    $ python server/app.py
```
3. Run UI
```
    $ cd client
    $ npm install
    $ npm start
```
## Creating a User
Upon accessing Rabbit Rabbit you will find a signup/login page. Hit the lower 'SWITCH' button to switch the the login flow. From here choose a username and password.

![Alt text](<Screen Shot 2024-04-17 at 3.18.32 PM.png>)

Passwords are required to have  the following
- At least 8 characters
- At least one Capital Letter
- At least one Lowercase Letter
- At least one Number
- At least one Special Symbol

Once you have specified a username and password, click 'SIGN UP' to create your username.


Once logged into Rabbit Rabbit you will see a header with 'VIEW JOURNAL', 'NEW ENTRY', 'DREAM CATEGORIES', and 'LOGOUT'. 

View journal is where we can read, edit, and delete the entries we have written. To see further details click on an individual entry. If you can't see the entry you are looking for then see if there is another page that you can navigate to view more entries.


## Writing a Journal Entry
To write a new entry click on the 'NEW ENTRY' button. Once the page loads you will see the following fields...

![Alt text](<Screen Shot 2024-04-17 at 3.33.50 PM.png>) 

- Title 
    - A short description of the dream

- Date
    - The date of the morning the entry was recorded

- Entry
    - A full description of the dream

- Category
    - One of seven dream types available 


### Using Voice to Text

Rabbit Rabbit features the ability to dictate your dream entries via our voice to text feature. Above 'Entry' there is a record button where once pushed will ask the user for access to their devices microphone. Please click 'allow' (the browser should only ask once). After hitting record the word 'Stop' will display on the button to indicate when to stop the recording. 

The application is designed to be able to dictate one full sentence per click of the record button. This to ensure proper formatting and allow the user time to gather their thoughts. The record button will not empty the contents of the entry so feel free to write portions of your entry and dictate others.

### Choosing a Category

Every journal entry is required to have a category attached to it. The Dream categories include the following...

1. Normal
2. Lucid
3. Recurring
4. False Awakening
5. Nightmare
6. Prophetic
7. Epic
8. Healing

These categories have their own nuances and most dreams might fit a few categories. Choose the category that best describes your dream. If you are unfamiliar with these categories navigate to the 'DREAM CATEGORIES' page to view the full description of each dream type.


## Manage Entries

If you navigate to 'VIEW ENTRIES', you will see a list of your own journal entries. By clicking on an individual entry you will be able to view the full details of the entry as well as an edit and delete button.

### Edit an Entry

Click the 'Edit' button and you will be directed to a new form with the current journal entry already filled out. Feel free to edit these details as you wish. The 'Save' button will save the new changes and redirect the user to the view journal page once complete. If you hit an error Rabbit Rabbit will provide a notification with a notice of what went wrong.

### Delete an Entry

Deleting an Entry in Rabbit Rabbit is simple. Navigate to the entry you would like to delete and hit the delete button. If any errors occured you will be notified. Otherwise you'll be redirected to the view journal page and recieve a notification that the entry was deleted successfully.

## Manage Login/Logout

To logout of your account click the 'LOGOUT' button on the top right side. If any errors occured then Rabbit Rabbit will notify you. Otherwise, you'll recieve a notification letting you know the logout was successful.




