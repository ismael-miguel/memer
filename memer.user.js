// ==UserScript==
// @name Memer_CR
// @description Translates memes to hover overs and links
// @version 0.1
// @match http://chat.stackexchange.com/rooms/8595/the-2nd-monitor
// @match http://chat.stackexchange.com/rooms/25699/javascript-libraries
// @match http://chat.stackexchange.com/rooms/25394/the-nth-monitor
// @authors 
//		-- Ismael Miguel
//		-- Malachi26
// @run-at document-end
// ==/UserScript==

;(function(window, undefined){
    'use strict';

    var memes = {
		'BTW.' : {
			'title': 'Backronymizing btw, by way of BTW Enum',
			'href' : 'http://meta.codereview.stackexchange.com/a/1646',
			'find' : new RegExp('(btw.)','gi')
		},
		'Stargreed': {
			'title': 'someone agrees by way of starring the chat post',
			'href': 'http://meta.codereview.stackexchange.com/a/2175',
			'find': new RegExp('(stargreed)','gi')
		},
        'zombie': {
            'title': 'Unanswered question (or with answers without upvotes)',
            'href': 'http://meta.codereview.stackexchange.com/a/1511/',
            'find': new RegExp('(zombie)','gi')
        },
        'Jamalized': {
            'title': 'Being Jamalized means that Jamal edited your question/answer',
            'href': 'http://meta.codereview.stackexchange.com/a/1675/',
            'find': new RegExp('(jamalized)','gi')
        },
        'TS': {
            'title': 'Theoretical Star (star it and say &quot;RSA&quot;)',
            'href': 'http://meta.codereview.stackexchange.com/a/1526/',
            'find': new RegExp('(TS)','g')
        },
        'RSA': {
            'title': 'Real Star Applied (you say it after staring a message with &quot;TS&quot;)',
            'href': 'http://meta.codereview.stackexchange.com/a/1526/',
            'find': new RegExp('(RSA)','g')
        },
        'Thanks, Santa!': {
            'title': 'When someone upvotes a post, and you don\'t know who, just say this',
            'href': 'http://meta.codereview.stackexchange.com/a/1526/'
        },
        'IWNPFETTOLAI': {
            'title': 'I will not provide further explanation than this overly long acronym itself',
            'href': 'http://meta.codereview.stackexchange.com/a/1673/'
        },
        'Monking': {
            'title': 'A greeting to the Monkey doing his monkey-business',
            'href': 'http://meta.codereview.stackexchange.com/a/1678/',
            'find': new RegExp('(monk(?:ing|ernoon|evening|night))','gi')
        },
        'TTQW': {
            'title': 'Time To Quit Work',
            'href': 'http://meta.codereview.stackexchange.com/a/1643/'
        },
        'TTGH': {
            'title': 'Time To Go Home',
            'href': 'http://meta.codereview.stackexchange.com/a/1643/'
        },
        'TTGTB': {
            'title': 'Time To Go To Bed',
            'href': 'http://meta.codereview.stackexchange.com/a/1643/'
        },
        'STM': {
            'title': 'Smoking The Documentation',
            'href': 'http://meta.codereview.stackexchange.com/a/1953/'
        },
        'overengineering': {
            'title': 'A case of when something has become overly-engineered',
            'href': 'http://meta.codereview.stackexchange.com/a/2520/'
        },
        'HOLY CARP': {
            'title': 'Probably HOLY CRAP misspelled',
            'href': 'http://meta.codereview.stackexchange.com/a/4928/'
        },
        'Malachi\'d': {
            'title': 'Something amusing or entertaining that hasn\'t been starred yet',
            'href': 'http://meta.codereview.stackexchange.com/a/1667/'
        },
        'JDQ': {
            'title': 'JavaDeveloper Question',
            'href': 'http://meta.codereview.stackexchange.com/a/2053/'
        }
    },
    translate = function(){
        var messages = document.querySelectorAll('#chat .message:not([data-checked="1"])'),
            fragment = document.createDocumentFragment(),
            tmp_content = document.createElement('div');

        if( messages && messages.length )
        {
            for(var i = 0, l = messages.length; i < l; i++)
            {
                var message = messages[i];

                message.setAttribute('data-checked', '1');

                var content = message.querySelector('.content');

                if( content && !content.firstChild.className || content.firstChild.className.indexOf('onebox') === -1 )
                {
                    tmp_content.innerHTML = content.innerHTML;
                    for(var meme in memes)
                    {
                        var html = '';
                        for(var j = 0, m = tmp_content.childNodes.length; j < m; j++)
                        {
                            //text nodes only
                            if( tmp_content.childNodes[j].nodeType === 3 )
                            {
                                if( memes[meme].find )
                                {
                                    html += tmp_content
                                        .childNodes[j]
                                        .nodeValue
                                        .replace(memes[meme].find, '<a href="' + 
                                            ( memes[meme].href || '#' ) +
                                            '" target="_blank" title="' +
                                            ( memes[meme].title || '' ) +
                                            '" style="color:inherit;border-bottom:1px dashed #000">$1</a>'
                                        );
                                }
                                else
                                {
                                    html += tmp_content
                                        .childNodes[j]
                                        .nodeValue
                                        .replace(meme, '<a href="' + 
                                            ( memes[meme].href || '#' ) +
                                            '" target="_blank" title="' +
                                            ( memes[meme].title || '' ) +
                                            '" style="color:inherit;border-bottom:1px dashed #000">'+
                                            meme+
                                            '</a>'
                                        );
                                }
                            }
                            else if( tmp_content.childNodes[j].nodeType !== 8 )
                            {
                                html += tmp_content.childNodes[j].outerHTML;
                            }
                        }
                        tmp_content.innerHTML = html;
                    }
                    content.innerHTML = tmp_content.innerHTML;
                }
            }
        }
    }

    translate();

    setInterval(translate, 1000);

})(Function('return this')());
