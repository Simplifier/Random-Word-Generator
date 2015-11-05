/**
 * Created with PyCharm.
 * User: Alex
 * Date: 09.04.2015
 * Time: 15:30
 * To change this template use File | Settings | File Templates.
 */


$(window).load(function () {
	var cookies = confectioner.get('words');
	window.model = cookies ? JSON.parse(cookies) : [];
	lib.restoreClosed(model);
	
	var buttons = $('.buttons');
	
	$('.drop-item').click(function () {
		var words = lib.generate(parseInt($(this).text()));
		var btns = lib.createBtnGroup(words, true);
		
		buttons.append(btns);
	});
});