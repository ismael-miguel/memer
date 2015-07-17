# Memer
A meme/jargon translator for [StackExchange chatrooms][sen]

## The original idea

The idea came when I tried to remember all the memes present on CodeReview's chatroom, [The 2nd monitor][the_2nd_monitor].

It was a terrible idea! I couldn't do it!

Then I decided to get some help. And the idea was born!

## So, what's this good for?

The main idea is to add small links on certain words or sentences, used in multiple chatrooms.

Each link has a descriptive text with a link, when available, to read about it and about it's history.  
Not everything has a link. Sadly, some things don't have a page to read about.

## Fine, fine, but how does it work?

It works by reading all the chat messages every interval and replacing the HTML directly, with a link.

The links are simple match-and-replace made on text. This avoids re-matching an HTML. As a side-effect, you can't match a meme inside an HTML tag.

## How do I make it work?

[Click here][userscript_installer] to install the Userscript,  
or you can open the Javascript file and paste it in your browser's console. Hitting <kbd>F12</kbd> will open the console for you.

<del>Currently, it only works for CodeReview chats, due to the lack of memes for others.</del>  
Each chatroom has it's very own file, with a common file.

A browser extension <del>is planned in the near future</del> is avaliable in the `chrome` folder, to ease the usage.  
The Javascript file available is already a Greasemonkey-ready file.

## What file should I use?

You can use the `memer.user.js`. That is the fully working and tested file.  
You can install the memer extention, in the `chrome` folder. Only on Chrome, for now.

You also can use the file `memer.next.user.js`, but that one may be broken or has stuff that don't make sense.  
Or not work at all! But it is the latest one, and where we showcase the next updates.

## Who should I thank for this?

You can thank all the collaborators in this repository.

Also, you can thank the reviewers on [the original question][original_question].

Seriously, make an account on that community, and upvote their answers. They are **really** helpful.

[sen]:http://chat.stackexchange.com
[the_2nd_monitor]:http://chat.stackexchange.com/rooms/8595/the-2nd-monitor
[userscript_installer]:https://github.com/ismael-miguel/memer/raw/master/memer.next.user.js
[original_question]:http://codereview.stackexchange.com/questions/96724/the-2nd-monitor-chatroom-translator