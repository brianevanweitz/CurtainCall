user1 = User.create(name: "Rachel", email: "rachel@rachel.com", password: "rachel123", fave_show_1: "Hamilton", fave_show_2: "Book of Mormon", fave_show_3: "1776", budget: "$$: Lottery Buddies", profile_pic: "https://i.imgur.com/6OZguZS.jpg")
user2 = User.create(name: "Kelly", email: "kelly@kelly.com", password: "kelly123", fave_show_1: "Waitress", fave_show_2: "Chicago", fave_show_3: "Rent", budget: "$$$: Rush or bust", profile_pic: "https://i.imgur.com/4oNkP6Z.jpg")
user3 = User.create(name: "Ali", email: "ali@ali.com", password: "ali123", fave_show_1: "Hadestown", fave_show_2: "Tootsie", fave_show_3: "West Side Story", budget: "$$$: Rush or bust", profile_pic: "https://i.imgur.com/ge7QbFS.png")
user4 = User.create(name: "Galway", email: "galway@galway.com", password: "galway123", fave_show_1: "Hamilton", fave_show_2: "Native Son", fave_show_3: "What the Constitution Means to Me", budget: "$: Off-off-broadway", profile_pic: "https://i.imgur.com/Srv9yXN.jpg")
user5 = User.create(name: "Michael", email: "michael@michael.com", password: "michael123", fave_show_1: "Book of Mormon", fave_show_2: "Beetlejuice", fave_show_3: "Harry Potter and the Cursed Child", budget: "$$: Lottery Buddies", profile_pic: "https://i.imgur.com/d6BjG5Y.jpg")
user6 = User.create(name: "Tori", email: "tori@tori.com", password: "tori123", fave_show_1: "Hadestown", fave_show_2: "Hamilton", fave_show_3: "Oklahoma!", budget: "$$$: Rush or bust", profile_pic: "https://i.imgur.com/WuD4aRj.jpg")
user7 = User.create(name: "Tyler", email: "tyler@tyler.com", password: "tyler123", fave_show_1: "Hadestown", fave_show_2: "Moulin Rouge", fave_show_3: "To Kill A Mockingbird", budget: "$$$: Rush or bust", profile_pic: "https://i.imgur.com/pMXsL0n.jpg")
user8 = User.create(name: "Emily", email: "emily@emily.com", password: "emily123", fave_show_1: "Hadestown", fave_show_2: "The Lightning Thief: The Percy Jackson Musical", fave_show_3: "Beetlejuice", budget: "$$$$: Would sell firstborn for tickets", profile_pic: "https://i.imgur.com/nQP5JIG.jpg")

user1.matched_users << user2
user2.matched_users << user1

Swipe.create(user_id: user1.id, swipe_id: user2.id)
Swipe.create(user_id: user2.id, swipe_id: user1.id)
