// ==UserScript==
// @name Memer
// @description Translates memes to hover overs and links
// @version 0.1
// @match http://chat.stackexchange.com/rooms/*
// @authors
//		-- Ismael Miguel
//		-- Malachi26
// @run-at document-end
// ==/UserScript==
if (location.hostname == 'chat.stackexchange.com')
{
	;(function (window, undefined){
		'use strict';
		//Just in case of jQuery.noConflict();
		(function($) {
			
			var REPO = 'https://github.com/ismael-miguel/memer/';
			var ROOT = 'https://raw.githubusercontent.com/ismael-miguel/memer/master/memes/';
			//Please, StackExchange, give us something decent!
			//This fixed a bug where another chat plugin would break the matching
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
							memerize(tmp_html, meme_database[type].memes);
						}
	
						$(this).replaceWith(tmp_html.html());
					});
	
				setTimeout(translate, 5000);
			};
			
			var memerize = function(tmp_html, memes) {
				for (var meme_name in memes)
				{
					var meme = memes[meme_name];
					var find = meme.find
						? new RegExp(meme.find[0], meme.find[1])
						: new RegExp('(' + (meme_name.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')) + ')', 'g');
					var replace = [
							'<a href="',
							memes.meta ? '//' + memes.meta + '/a/' + meme.id : 'javascript:void(0)',
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
			
			var remaining = 0, failed = 0;
			for(var type in meme_database)
			{
				remaining++;
				//really? If I don't wrap it, it writes stuff on wrong places
				(function(type){
					$.get(
						ROOT + meme_database[type] + '.json',
						function(data) {
						if(data && (data = $.parseJSON(data)))
						{
							meme_database[type] = data;
						}
					})
					.fail(function(){
						failed++;
						popup([ //what an ugly piece of code!
							'<h3>Memer error:</h3>',
							'<p>Failed to load <b>' + type + '.json</b></p>',
							'<p>If you are sure your connection is working, head to',
								' <a href="' + REPO + '">Memer\'s github</a> ',
							'and provide your meme list.</p>'
						].join(''));
						meme_database[type] = {};
					}).always(function() {
						remaining--;
						if(remaining <= 0 && !failed)
						{
							popup('<h3>Memer:</h3><p>All the files loaded successfully</p>');
							setTimeout(translate, 5000);
						}
					});
				})(type.toString());//ensures it is not a reference, but a copy
			}
			
		})(window.jQuery);
	
	})(Function('return this')());
}
