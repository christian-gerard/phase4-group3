from faker import Faker

from config import app
from models.__init__ import db
from models.category import Category
from models.entry import Entry
from models.user import User

import sys
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
        dream_categories = ['']

        print('\t[green]Categories Created ✅[/green] \n')

    except Exception as e:
        print('\t[red]Category Creation Failed[/red] 😞\n')
        sys.exit(1)

    

    # # # # # Create Users
    print('[purple]Creating Users[/purple] 🧑🏻‍💻 ...\n')
    try:

        print('\t[green]Users Created[/green] ✅ \n')
    except Exception as e:
        print('\t[red]User Creation Failed[/red] 😞 \n')
        sys.exit(1)



     # # # # # Create Entries
    print('[purple]Creating Entries[/purple] ✍🏽 ...\n')
    try:

        print('\t[green]Entries Created ✅[/green]\n')

    except Exception as e:
        print('\t[red]Entry Creation Failed[/red] 😞 \n')
        sys.exit(1)



    # # # # # COMPLETE SEED
    print('[green] ----------- COMPLETE 🏁 ------------ [/green]\n')