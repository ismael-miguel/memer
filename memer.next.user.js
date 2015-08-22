/** @preserve
// ==UserScript==
// @name Memer
// @namespace https://github.com/ismael-miguel/memer
// @description Translates memes to hover overs and links
// @version 0.4.7
// @match *://chat.meta.stackexchange.com/rooms/*
// @match *://chat.stackexchange.com/rooms/*
// @match *://chat.stackoverflow.com/rooms/*
// @match *://chat.serverfault.com/rooms/*
// @match *://chat.superuser.com/rooms/*
// @match *://chat.askubuntu.com/rooms/*
// @author Ismael Miguel
// @authors
//		-- Ismael Miguel
//		-- Malachi26
//		-- The-Quill
// @run-at document-end
// @grant none
// ==/UserScript==
*/
//check 
(function (window, undefined){
    var REPO = 'https://github.com/ismael-miguel/memer/';
    var ROOT = 'https://raw.githubusercontent.com/ismael-miguel/memer/master/memes/';
    var SOURCES = ROOT + '_sources.json';
    var SITES = {
        //Re-enabled since I've fixed the popup
        'chat.meta.stackexchange.com': true,
        'chat.stackexchange.com': true,
        'chat.stackoverflow.com': true,
        'chat.serverfault.com': true,
        'chat.superuser.com': true,
        'chat.askubuntu.com': true
    };
    var DELAY = 5000;
    var POPUP_WIDTH = 300;
    if (SITES[location.hostname])
    {
        'use strict';
        //Just in case of jQuery.noConflict();
        (function($) {
            /*
			 * Please, StackExchange, give us something decent!
			 * This fixes a bug where another chat plugin would break the matching
			*/
            var SITE = $('head link[rel="shortcut icon"]')[0].href.match(/static.net\/([^\/]+)\//)[1];

            //Popup with the standard chat style
            var popup = function(html) {
                $('body').append([
                    '<div class="popup user-popup" style="left:',
                    ((window.innerWidth - POPUP_WIDTH) / 2),
                    'px;top:0px;width:',
                    POPUP_WIDTH,
                    'px;display:block;max-width:',
                    POPUP_WIDTH,
                    'px;">',
                    '<div class="btn-close" onclick="var div=this.parentNode;div.parentNode.removeChild(div);">X</div>',
                    html,
                    '</div>'
                ].join(''));
            };

            //Scatters the page for unprocessed messages and processes them
            var translate = function() {
                $('#chat .message:not([data-checked="1"])')
                .attr('data-checked', 1)
                .find('>.content')
                .filter(':not(:has(.onebox))')
                .contents()
                .filter(function() {
                    return this.nodeType === window.Node.TEXT_NODE;
                }).each(function() {

                    var tmp_html = $('<div>');
                    tmp_html.text(this.nodeValue);

                    for(var type in meme_database)
                    {
                        memerize(tmp_html, meme_database[type].memes,meme_database[type].meta);
                    }

                    $(this).replaceWith(tmp_html.html());
                });

                setTimeout(translate, DELAY);
            };

            //Matches the memes and the replaces them with the new link
            var memerize = function(tmp_html, memes, meta) {
                for (var meme_name in memes)
                {
                    var meme = memes[meme_name];
                    var find = meme.find
                    ? new RegExp(meme.find[0], meme.find[1])
                    : new RegExp('(' + (meme_name.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')) + ')', 'g');
                    if (typeof meta !== "undefined") {
                        var isMainSite = meta.indexOf('meta') == -1;
                        if (isMainSite) {
                            var replace = [
                                '<a href="',
                                meta && meme.id? '//' + meta + '/users/' + meme.id : 'javascript:void(0)',
                                '" title="',
                                meme.title,
                                '" style="border-bottom:1px groove silver;color:#000;">$1</a>'
                            ].join('');    
                        } else {
                            var replace = [
                                '<a href="',
                                meta && meme.id? '//' + meta + '/a/' + meme.id : 'javascript:void(0)',
                                '" title="',
                                meme.title,
                                '" style="border-bottom:1px dashed #000;color:#000;">$1</a>'
                            ].join('');
                        }
                    } else {
                        var replace = [
                                '<a href="',
                                meta && meme.id? '//' + meta + '/a/' + meme.id : 'javascript:void(0)',
                                '" title="',
                                meme.title,
                                '" style="border-bottom:1px dashed #000;color:#000;">$1</a>'
                            ].join('');
                    }

                    $(tmp_html).contents().each(function() {
                        //It's stupid, but it must be done
                        if (this.nodeType === window.Node.TEXT_NODE)
                        {
                            $(this).replaceWith(this.nodeValue.replace(find, replace));
                        }
                    });
                }
            };

            //Performs all the loading of the files
            var loader = function(){
                var source = sources.shift();

                source.file = source.file.replace(/%SITE%/g,SITE);

                $.get(
                    ROOT + source.file + '.json',
                    function(data) {
                        if(data && (data = $.parseJSON(data)))
                        {
                            meme_database[source.name] = data;
                        }
                    })
                .fail(function(){
                    if(!source.ignore)
                    {
                        popup([ //What an ugly piece of code!
                            '<h3>Memer error:</h3>',
                            '<p>Failed to load <b>' + source.file + '.json</b></p>',
                            '<p>If you are sure your connection is working, head to',
                            ' <a href="' + REPO + '">Memer\'s github</a> ',
                            'and provide your meme list.</p>'
                        ].join(''));
                    }
                    meme_database[source.name] = {};
                }).always(function(){
                    if(sources.length)
                    {
                        setTimeout(loader, 0);
                    }
                    else
                    {
                        setTimeout(translate, DELAY);
                    }
                });
            };


            //This will be where all data is saved
            var meme_database = {};

            //Where all the sources will be queued, keep a copy for later
            var sources = [], loaded_sources = [];

            //Initiate all the process, after fetching the sources
            $.get(SOURCES)
            .done(function(data, status) {
                if(data && (data = $.parseJSON(data)))
                {
                    sources = data;
                    loaded_sources = data;
                    loader();
                }
            })
            .fail(function(){
                popup([
                    '<h3>Memer error:</h3>',
                    '<p>Failed to load <b>_sources.json</b></p>',
                    '<p>Sadly, Memer can\'t work without that file.</p>'
                ].join(''));
            });
            /*
			* Only expose this if we are in Google Chrome and running as extention.
			* Read: http://stackoverflow.com/questions/7507277/detecting-if-code-is-being-run-as-a-chrome-extension
			* This will be used for the browser extention
			*/
            if(window.chrome && window.chrome.runtime && window.chrome.runtime.id)
            {
                window.Memer = {
                    'addSource': function(source) {
                        //yeah, must push into those
                        sources.push(source);
                        loaded_sources.push(source);

                        //defer execution
                        setTimeout(loader(), 0);
                        return true;
                    },
                    'removeSource': function(source){
                        return delete meme_database[source];
                    },
                    'listSources': function() {
                        //return the list of loaded sources, or an empty array
                        return loaded_sources || [];
                    },
                    'listMemes': function(source){
                        return meme_database[source];
                    }
                };
            }

        })(window.jQuery);
    }
})(Function('return this')());
