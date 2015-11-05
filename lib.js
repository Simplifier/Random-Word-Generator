/**
 * Created by Alex on 05.11.2015.
 */

(function () {
	/**data storage*/
	window.model = [];
	
	window.lib = {
		restoreClosed: function (data) {
			var buttons = $('.buttons');
			
			for (var i in data) {
				var btns = lib.createBtnGroup(data[i], false);
				buttons.append(btns);
			}
		},
		
		saveData: function (data) {
			confectioner.set('words', JSON.stringify(data), {expires: 99999999});
		},
		/**
		 * @param {Array} words
		 * @param {Boolean} save
		 * @returns {*|jQuery|HTMLElement}
		 */
		createBtnGroup: function (words, save) {
			if (save) {
				model.push(words);
				lib.saveData(model);
			}
			
			var btnGroup = '\
				<div class="alert alert-info alert-dismissible" role="alert">\
					<button type="button" class="close" data-dismiss="alert" aria-label="Close">\
						<span aria-hidden="true">&times;</span>\
					</button>';
			
			for (var i in words) {
				btnGroup += '<button type="button" class="btn btn-primary">' + words[i] + '  <span class="glyphicon glyphicon-refresh"></span></button>';
			}
			
			btnGroup += '</div>';
			
			var btns = $(btnGroup);
			//word change handler
			btns.find('.btn').click(function (e) {
				var newWord = lib.genWord();
				$(e.currentTarget).empty().html(newWord + '  <span class="glyphicon glyphicon-refresh"></span>');
				
				var index = $(this).parent().index();
				var words = model[index];
				var subindex = $(this).index();
				words.splice(subindex - 1, 1, newWord);
				lib.saveData(model);
			});
			
			//group close handler
			btns.find('.close').click(function () {
				var index = $(this).parent().index();
				model.splice(index, 1);
				lib.saveData(model);
			});
			
			return btns;
		},
		
		generate: function (num) {
			var result = [];
			for (var i = 0; i < num; i++) {
				result.push(lib.genWord());
			}
			return result;
		},
		
		genWord: function () {
			var len = srcData.length;
			var index = Math.floor(Math.random() * len);
			return srcData.splice(index, 1)[0];
		}
	};
	
	window.confectioner = {
		get: function (name) {
			var matches = document.cookie.match(new RegExp(
				"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
			));
			return matches ? decodeURIComponent(matches[1]) : undefined;
		},
		
		//options: {expires, path, domain, secure}
		set: function (name, value, options) {
			options = options || {};
			
			var expires = options.expires;
			
			if (typeof expires == "number" && expires) {
				var d = new Date();
				d.setTime(d.getTime() + expires * 1000);
				expires = options.expires = d;
			}
			if (expires && expires.toUTCString) {
				options.expires = expires.toUTCString();
			}
			
			value = encodeURIComponent(value);
			
			var updatedCookie = name + "=" + value;
			
			for (var propName in options) {
				updatedCookie += "; " + propName;
				var propValue = options[propName];
				if (propValue !== true) {
					updatedCookie += "=" + propValue;
				}
			}
			
			document.cookie = updatedCookie;
		},
		
		delete: function (name) {
			confectioner.set(name, "", {
				expires: -1
			});
		}
	};
})();