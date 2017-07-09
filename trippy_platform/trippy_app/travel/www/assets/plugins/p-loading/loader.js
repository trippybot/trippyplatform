(function(window, document, $) {
  'use strict';

  window.Loader = $.extend({

    block: function(options) {
        options = $.extend(true, {}, options);
        
        var html = 
        	'<div>' +
	    		'<div class="block-action"></div>' + 
	    		'<div class="container-block">' +
	    			'<img src="../assets/images/loader.gif" style="vertical-align: middle; height: 100px;">' +
	    			'<br/><span style=" width: 100%; color: #FFFFFF; font-size: 14px; font-weight: 400;">' + ( options.message ? options.message : '' )  + '</span>' +
	    		'</div>' +
	    	'</div>';
        
        if (options.target) { // element blocking
            var el = $(options.target);
            if (el.height() <= ($(window).height())) {
                options.cenrerY = true;
            }
            el.block({
                message: html,
                baseZ: 100000,
                centerY: true,
                fadeIn:  200, 
                fadeOut:  400,
                css: {
                    top: '10%',
                    border: '0',
                    padding: '0',
                    position: 'fixed',
                    backgroundColor: 'none'
                },
                overlayCSS: {
                	position: 'fixed',
                    backgroundColor: '#FFFFFF',
                    opacity: 1.0,
                    cursor: 'wait'
                }
            });
        } else { // page blocking
            $.blockUI({
                message: html,
                baseZ: 100000,
                css: {
                	position: 'fixed',
                    border: '0',
                    padding: '0',
                    backgroundColor: 'none'
                },
                overlayCSS: {
                	position: 'fixed',
                    backgroundColor: '#FFFFFF',
                    opacity: 1.0,
                    cursor: 'wait'
                }
            });
        }
    },

    // wrContainerer function to  un-block element(finish loading)
    unblock: function(target) {
        if (target) {
            $(target).unblock({
                onUnblock: function() {
                    $(target).css('position', '');
                    $(target).css('zoom', '');
                }
            });
        } else {
            $.unblockUI();
        }
    }
  });

})(window, document, jQuery);