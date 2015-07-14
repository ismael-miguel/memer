;(function (window, undefined){
	'use strict';
	var memes = {
		'zombie': {
			'title': 'Unanswered question (or with answers without upvotes)',
			'href': 'http://meta.codereview.stackexchange.com/a/1511/',
			'find': new RegExp('(zombie)', 'gi')
		},
		'Jamalized': {
			'title': 'Being Jamalized means that Jamal edited your question / answer ',
			'href': 'http://meta.codereview.stackexchange.com/a/1675/',
			'find': new RegExp('(jamalized)', 'gi')
		},
		'TS': {
			'title': 'Theoretical Star (star it and say &quot;RSA&quot;)',
			'href': 'http://meta.codereview.stackexchange.com/a/1526/',
			'find': new RegExp('(TSA?)', 'g')
		},
		'RSA':{
			'title': 'Real Star Applied (you say it after staring a message with & quot;TS & quot;)',
			'href': 'http://meta.codereview.stackexchange.com/a/1526/',
			'find': new RegExp('(RSA)', 'g')
		},
		'Thanks, Santa!': {
			'title': 'When someone upvotes a post, and you don\'t know who, just say this ',
			'href': 'http://meta.codereview.stackexchange.com/a/1526/'
		},
		'IWNPFETTOLAI': {
			'title': 'I will not provide further explanation than this overly long acronym itself ',
			'href': 'http://meta.codereview.stackexchange.com/a/1673/'
		},
		'Monking': {
			'title': 'A greeting to the Monkey doing his monkey-business',
			'href': 'http://meta.codereview.stackexchange.com/a/1678/',
			'find': new RegExp('(monk(?:ing|ernoon|evening|night))', 'gi')
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
			'title': 'A case of when something has become overly - engineered ',
			'href': 'http://meta.codereview.stackexchange.com/a/2520/'
		},
		'HOLY CARP': {
			'title': 'Probably HOLY CRAP misspelled',
			'href': 'http://meta.codereview.stackexchange.com/a/4928/'
		},
		'Malachi\'d': {
			'title': 'Something amusing or entertaining that hasn\'t been starred yet ',
			'href': 'http://meta.codereview.stackexchange.com/a/1667/'
		},
		'JDQ': {
			'title': 'JavaDeveloper Question',
			'href': 'http://meta.codereview.stackexchange.com/a/2053/'
		}
	};
	//just in case of jQuer.noConflict();
	(function($) {
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

					for (var meme in memes)
					{
						$(tmp_html).contents().each(function() {
							if (this.nodeType === window.Node.TEXT_NODE)
							{
								$(this).replaceWith(
									this.nodeValue.replace(
										memes[meme].find || new RegExp('(' + (meme.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')) + ')', 'g'), [
											'<a href="',
											memes[meme].href,
											'" title="',
											memes[meme].title,
											'" 
											style = "border-bottom:1px dashed #000;color:#000;" > ',
											memes[meme].find ? '$1' : meme,
											'</a>'
										].join('')
									)
								);
							}
						});
					}

					$(this).replaceWith(tmp_html.html());
				});

			setTimeout(translate, 5000);
		};


		translate();
		setTimeout(translate, 5000);

	})(window.jQuery);

})(Function('return this')());
