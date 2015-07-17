// ==UserScript==
// @name Memer
// @namespace https://github.com/ismael-miguel/memer
// @description Translates memes to hover overs and links
// @version 0.4
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
(function (window, undefined){
	var REPO = 'https://github.com/ismael-miguel/memer/';
	var ROOT = 'https://raw.githubusercontent.com/ismael-miguel/memer/master/memes/';
	var SITES = {//the disabled websites don't have a meme file
		'chat.meta.stackexchange.com': false,
		'chat.stackexchange.com': true,
		'chat.stackoverflow.com': false,
		'chat.serverfault.com': false,
		'chat.superuser.com': false,
		'chat.askubuntu.com': false
	};
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
			
			//avoids creating a global function
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
	
				setTimeout(translate, 5000);
			};
			
			var memerize = function(tmp_html, memes, meta) {
				for (var meme_name in memes)
				{
					var meme = memes[meme_name];
					var find = meme.find
						? new RegExp(meme.find[0], meme.find[1])
						: new RegExp('(' + (meme_name.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')) + ')', 'g');
					var replace = [
							'<a href="',
							meta && meme.id? '//' + meta + '/a/' + meme.id : 'javascript:void(0)',
							'" title="',
							meme.title,
							'" style="border-bottom:1px dashed #000;color:#000;">$1</a>'
						].join('');
					
					$(tmp_html).contents().each(function() {
						//It's stupid, but it must be done
						if (this.nodeType === window.Node.TEXT_NODE)
						{
							$(this).replaceWith(this.nodeValue.replace(find, replace));
						}
					});
				}
			};
			
			var popup = function(html) {
				//yup, standard way to create the popup
				popUp(0, 0)
					.css({
						'width': 'auto',
						'maxWidth': 300,
						'minWidth': 300,
						'top': 0,
						'left': (window.innerWidth - 300) / 2
					})
					.addClass('user-popup')
					.append(html);
			};
			
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
						/*
						* Yeah, Google Chrome has a really crappy API. That detects when running as extention.
						* Read: http://stackoverflow.com/questions/7507277/detecting-if-code-is-being-run-as-a-chrome-extension
						*/
						if(window.chrome && window.chrome.runtime && window.chrome.runtime.id)
						{
							alert([
								'Memer error:',
								'Failed to load ' + source.file + '.json',
								'Visit ' + REPO + ' and check if it is available or provide your own'
							].join('\n'));
						}
						else
						{
							popup([ //what an ugly piece of code!
								'<h3>Memer error:</h3>',
								'<p>Failed to load <b>' + source.file + '.json</b></p>',
								'<p>If you are sure your connection is working, head to',
									' <a href="' + REPO + '">Memer\'s github</a> ',
								'and provide your meme list.</p>'
							].join(''));
						}
					}
					meme_database[source.name] = {};
				}).always(function(){
					if(sources.length)
					{
						setTimeout(loader, 0);
					}
					else
					{
						//only show when not running as an extention
						if(!window.chrome && !window.chrome.runtime && !window.chrome.runtime.id)
						{
							popup('<h3>Memer:</h3><p>All the files loaded successfully</p>');
						}
						setTimeout(translate, 5000);
					}
				});
			};
			
			
			//this will be where all data is saved
			var meme_database = {};
			
			//where all the sources will be queued
			var sources = [];
			
			
			$.get(
				ROOT + '_sources.json')
				.done(function(data, status) {
					if(data && (data = $.parseJSON(data)))
					{
						sources = data;
						loader();
					}
				})
				.fail(function(){
					if(window.chrome && window.chrome.runtime && window.chrome.runtime.id)
					{
						alert([
							'Memer error:',
							'Failed to load _sources.json',
							'Sadly, Memer can\'t work without that file'
						].join('\n'));
					}
					else
					{
						popup([
							'<h3>Memer error:</h3>',
							'<p>Failed to load <b>_sources.json</b></p>',
							'<p>Sadly, Memer can\'t work without that file.</p>'
						].join(''));
					}
				});
			
		})(window.jQuery);
	}
})(Function('return this')());