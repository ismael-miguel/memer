# Memer
A meme translator for StackExchange chatrooms

## The original idea

The idea came when I tried to remember all the memes present on CodeReview's chatroom, [The 2nd monitor](http://chat.stackexchange.com/rooms/8595/the-2nd-monitor).

It was a terrible idea! I couldn't do it!

Then I decided to get some help. And the idea was born!

## So, what's this good for?

The main idea is to add small links on certain words or sentences, used in multiple chatrooms.

Each link has a descriptive text with a link, when available, to read about it and about it's history.<br>
Not everything has a link. Sadly, some things don't have a page to read about.

## Fine, fine, but how does it work?

It works by reading all the chat messages every interval and replacing the HTML directly, with a link.

The links are simple match-and-replace made on text. This avoids re-matching an HTML. As a side-effect, you can't match a meme inside an HTML tag.

## How do I make it to work?

You can open the Javascript file and paste it in your browser's console. Hitting <kbd>F12</kbd> will open the console for you.

<del>Currently, it only works for CodeReview chats, due to the lack of memes for others.</del><br/>
Each chatroom has it's very own file, with a common file.

A browser extension is planned in the near future, to ease the usage.<br>
The Javascript file available is already a Greasemonkey-ready file.

## What file should I use?

You can use the `memer.user.js`. That is the fully working and tested file.

You also can use the file `memer.next.user.js`, but that one may be broken or has stuff that don't make sense.<br>
Or not work at all! But it is the latest one, and where we showcase the next updates.

## To who should I thank for this?

You can all the collaborators in this repository.

Also, you can thank the reviewers on [the original question](http://codereview.stackexchange.com/questions/96724/the-2nd-monitor-chatroom-translator).

If you have an account on that community, upvote their answers. They are really helpful.
