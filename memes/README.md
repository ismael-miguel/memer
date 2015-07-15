#Meme directory

##What is this for?

This is where we have all the memes.

They are distributed by website name, in JSON files.

Each JSON file will be called and it's content will be parsed to obtain a Javascript object.

##What informations it contains?

Currently, it has simply a list of memes and a meta servername.

That will be used to generate the link with the `id` in each meme.

If no meta is present, no link will be generated (case of the `_common.js`).
