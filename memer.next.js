;(function (window, undefined){
	'use strict';
	//Just in case of jQuery.noConflict();
	(function($) {
		
		var ROOT = 'https://raw.githubusercontent.com/ismael-miguel/memer/master/memes/';
		//Please, StackExchange, give us something decent!
		var SITE = $('#footer-logo img')[0].src.match(/static.net\/([^\/]+)\//)[1];
		
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

					for (var meme_name in memes.memes)
					{
						var meme = memes.memes[meme_name];
						var find = meme.find
							? new RegExp(meme.find[0], meme.find[1])
							: new RegExp('(' + (meme_name.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')) + ')', 'g');
						var replace = [
								'<a href="',
								memes.meta ? '//' + memes.meta + '/a/' + meme.id : '#',
								'" title="',
								meme.title,
								'" style="border-bottom:1px dashed #000;color:#000;">$1</a>'
							].join('');
						
						$(tmp_html).contents().each(function() {
							//It's stupid, but it must be done
							if (this.nodeType === window.Node.TEXT_NODE)
							{
								$(this).replaceWith( this.nodeValue.replace(find, replace) );
							}
						});
					}

					$(this).replaceWith(tmp_html.html());
					
					console.log(tmp_html);
				});

			setTimeout(translate, 5000);
		};

		var common = {}, memes = {};
		
		var error = function(html){
			//yup, standard way to create the popup
			popUp(0, 0)
				.css({
					'width': 'auto',
					'maxWidth': 600,
					'minWidth': 300,
					'top': 0,
					'left': 0
				})
				.addClass('user-popup')
				.append(html);
		};
		

		$.get(ROOT + '_common.json', function( data ){
			if(data && (data = $.parseJSON(data)))
			{
				common = data;
				
				//this is really ugly!
				$.get(ROOT + SITE + '.json', function( data ){
					if(data && (data = $.parseJSON(data)))
					{
						memes = data;
		
						translate();
						setTimeout(translate, 5000);
						
					}
				}).error(function(){
					error('<h3>Memer error:</h3><p>Failed to load <b>' + SITE + '.json</b></p>');
				});
				
			}
		}).error(function(){
			error('<h3>Memer error:</h3><p>Failed to load <b>_common.json</b></p>');
		});

	})(window.jQuery);

})(Function('return this')());
