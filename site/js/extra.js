$(function() {
	function DoInsert() {
		$('ol > li > p').each(function(i, el) {
			const elem = $(el);
			const id = elem.parent().attr('id');
			if (id) {
				let anchor = $('<a class="headerlink">¶</a>').attr('href', '#' + id);
				elem.append(anchor);
			}
		});
		
		$('ol > li').each(function(i, el) {
			const elem = $(el);
			const id = elem.attr('id');
			const hasP = elem.find('> p');
			if (id && hasP.length == 0) {
				let anchor = $('<a class="headerlink">¶</a>').attr('href', '#' + id);
				elem.append(anchor);
			}
		});
	}
	
	let title = document.title;
	
	$('div').on('DOMSubtreeModified', function() {
		if (title !== document.title) {
			console.log('changed');
			title = document.title;
			DoInsert();
		}
	});
	
	$( document ).ready(function() {
		DoInsert();
	});
})