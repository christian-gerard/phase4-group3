from faker import Faker

from config import app
from models.__init__ import db
from models.category import Category
from models.entry import Entry
from models.user import User

import sys
import random
from rich import print

fake = Faker()


with app.app_context():

    # # # # # BEGIN SEED
    print('\n[purple]------------- BEGIN ------------[/purple]')
    print('\n')



    # # # # # Clean Database
    print('[purple]Cleaning Database 🧽 [/purple]...\n')
    try:
        Category.query.delete()
        Entry.query.delete()
        User.query.delete()
        db.session.commit()
        print('\t[green]Cleaning Complete[/green] ✅\n')
    except Exception as e:
        print('\t[red]Cleaning Failed[/red] 😞\n')
        sys.exit(1)
    


    # # # # # Create Categories
    print('[purple]Creating Categories 🔮[/purple] ...\n')
    try:
        dream_categories = ['False-awakening', 'Healing', 'Lucid', 'Nightmare', 'Recurring', 'Premonition']
        for dream in dream_categories:
            category = Category(name=dream,description=fake.paragraph())
            db.session.add(category)
        db.session.commit()

        print('\t[green]Categories Created ✅[/green] \n')

    except Exception as e:
        print('\t[red]Category Creation Failed[/red] 😞\n')
        sys.exit(1)

    

    # # # # # Create Users
    print('[purple]Creating Users[/purple] 🧑🏻‍💻 ...\n')
    try:

        users = []
        usernames = []

        for _ in range(20):

            username = fake.first_name()

            while username in usernames:
                username = fake.first_name()

            usernames.append(username)

            user = User(username=username)
            user.password_hash = user.username + 'password'

            users.append(user)

        db.session.add_all(users)

        print('\t[green]Users Created[/green] ✅ \n')
    except Exception as e:
        print('\t[red]User Creation Failed[/red] 😞 \n')
        sys.exit(1)



     # # # # # Create Entries
    print('[purple]Creating Entries[/purple] ✍🏽 ...\n')
    try:
        for _ in range(100):
            new_entry = Entry(
                title=fake.sentence(), 
                body=fake.paragraph(), 
                user_id=random.randint(1,20), 
                category_id=random.randint(1,6)
                )
            db.session.add(new_entry)
        db.session.commit()

        print('\t[green]Entries Created ✅[/green]\n')

    except Exception as e:
        print('\t[red]Entry Creation Failed[/red] 😞 \n')
        sys.exit(1)



    # # # # # COMPLETE SEED
    print('[green] ----------- COMPLETE 🏁 ------------ [/green]\n')