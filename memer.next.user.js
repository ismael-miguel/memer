// ==UserScript==
// @name Memer
// @namespace https://github.com/ismael-miguel/memer
// @description Translates memes to hover overs and links
// @version 0.3
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
var REPO = 'https://github.com/ismael-miguel/memer/';
var ROOT = 'https://raw.githubusercontent.com/ismael-miguel/memer/master/memes/';
var SITES = [
	  'chat.meta.stackexchange.com'
	, 'chat.stackexchange.com'
	, 'chat.stackoverflow.com'
	, 'chat.serverfault.com'
	, 'chat.superuser.com'
	, 'chat.askubuntu.com'
	];
if (SITES.indexOf(location.hostname) !== -1)
{
	;(function (window, undefined){
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
			
			//this will be where all data is saved
			var meme_database = {
				'common': '_common',
				'memes': SITE
			};
			
			var sources = ['common', 'memes'];
			
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
				$.get(
					ROOT + meme_database[source] + '.json',
					function(data) {
					if(data && (data = $.parseJSON(data)))
					{
						meme_database[source] = data;
					}
				})
				.fail(function(){
					/*
					* Yeah, Google Chrome has an easy API, that detects when running as extention
					* read http://stackoverflow.com/questions/7507277/detecting-if-code-is-being-run-as-a-chrome-extension
				   */
					if(window.chrome && chrome.runtime && chrome.runtime.id)
					{
						alert([
							'Memer error:',
							'Failed to load ' + meme_database[source] + '.json',
							'Visit ' + REPO + ' and check if it is available or provide your own'
						].join('\n'));
					}
					else
					{
						popup([ //what an ugly piece of code!
							'<h3>Memer error:</h3>',
							'<p>Failed to load <b>' + meme_database[source] + '.json</b></p>',
							'<p>If you are sure your connection is working, head to',
								' <a href="' + REPO + '">Memer\'s github</a> ',
							'and provide your meme list.</p>'
						].join(''));
					}
					meme_database[source] = {};
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
			
			loader();
			
		})(window.jQuery);
	})(Function('return this')());
}