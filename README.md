# Memer
A meme translator for StackExchange chatrooms

## The original idea

The idea came when I tried to remember all the memes pretent on CodeReview's chatroom, The 2nd monitor.

It was a terrible idea! I couldn't do it!

Then I decided to get some help. And the idea was born!

## So, what's this good for?

The main idea is to add small links on certain words or sentences, used in multiple chatrooms.

The idea is to have a descriptive text with a link, when available, to read about it and about it's history.

## Fine, fine, but how does it work?

It works by reading all the chat messages every interval and replacing the HTML directly, with a link.

The links are simple match-and-replace made on text. This avoids re-matching an HTML. As a side-effect, you can't match a meme inside an HTML tag.

## How do I make it to work?

You can open the Javascript file and paste it in your browser's console. Hitting <kbd>F12</kbd> will open it.

Currently, it only works for CodeReview chats, due to the lack of memes for others.<br>
A browser extension is planned in the near future, with support for multiple websites.

## To who should I thank?

You can thank me and all the collaborators in this repository.

Also, you can thank for the reviewers on [the original question](http://codereview.stackexchange.com/questions/96724/the-2nd-monitor-chatroom-translator).

If you have an account on that community, upvote their answers. They are really helpful.
