from faker import Faker

from config import app
from models.__init__ import db
from models.category import Category
from models.entry import Entry
from models.user import User


import sys
import random
from rich import print
import ipdb

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
        dream_categories = [
            {
                "name" : "Normal",
                "summary": "Reflect daily experiences, thoughts, and emotions during REM sleep.",
                "description": "These are the most common dreams that occur during REM (Rapid Eye Movement) sleep. They often reflect our daily experiences, thoughts, and emotions. Normal dreams can vary widely in content and may include familiar settings, people, or situations."
            },
            {
                "name": "Lucid",
                "summary": "Dreams in which the dreamer is aware they are dreaming and may have some control over the dream narrative.",
                "description": "In lucid dreams, the dreamer is aware that they are dreaming and may have some degree of control over the dream narrative and their actions within the dream. Lucid dreaming can be spontaneous or induced through various techniques."
            },
            {
                "name": "Recurring",
                "summary": "Dreams that repeat with similar themes, settings, or characters, possibly indicating unresolved issues.",
                "description": "These are dreams that repeat themselves with similar themes, settings, or characters. Recurring dreams may indicate unresolved issues or conflicts in the dreamer's life that need to be addressed."
            },
            {
                "name": "False Awakening",
                "summary": "Dreams where the dreamer believes they have woken up, only to realize they are still dreaming.",
                "description": "False awakening dreams occur when the dreamer believes they have woken up from sleep, only to realize later that they are still dreaming. These dreams can be confusing and disorienting, blurring the line between dream and reality."
            },
            {
                "name": "Nightmare",
                "summary": "Distressing dreams that evoke fear, anxiety, or sadness, often involving threatening or unsettling situations.",
                "description": "Nightmares are distressing dreams that evoke strong feelings of fear, terror, anxiety, or sadness. They often involve threatening or unsettling situations and can cause the dreamer to wake up feeling distressed. Nightmares can be related to stress, trauma, or unresolved emotional issues."
            },
            {
                "name": "Prophetic",
                "summary": "Dreams believed to contain messages or insights about the future, though lacking scientific evidence.",
                "description": "Prophetic dreams are believed to contain messages or insights about the future. While there is little scientific evidence to support the idea of prophetic dreaming, some people report experiencing dreams that seem to foreshadow future events."
            },
            {
                "name": "Epic",
                "summary": "Elaborate, vivid dreams characterized by complex storylines, intense emotions, and fantastical elements.",
                "description": "Epic dreams are characterized by their length, complexity, and vividness. They often involve elaborate storylines, fantastical elements, and intense emotions. Epic dreams can feel like immersive experiences that unfold over an extended period of time."
            },
            {
                "name": "Healing",
                "summary": "Dreams that provide comfort, insight, or resolution to emotional or psychological issues.",
                "description": "Healing dreams are dreams that provide comfort, insight, or resolution to emotional or psychological issues. They may offer guidance, support, or a sense of closure, helping the dreamer process difficult emotions or experiences."
            }
        ]

        for dream in dream_categories:
            category = Category(name=dream['name'], summary=dream['summary'], description=dream['description'])
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