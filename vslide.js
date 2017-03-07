function vslide( options ){

	this.opt = options;

	this.init = function(){

		var _this = this;

		if( null != this.opt.next ){

			$( document ).on( 'click', this.opt.next, function(){

				if( _this.dec() ){

					$( _this.opt.ele ).animate( { 'scrollTop': _this.opt.pos }, _this.duration );
				}
			});
		}

		if( null != this.opt.prev ){

			$( document ).on( 'click', this.opt.prev, function(){

				if( _this.inc() ){

					$( _this.opt.ele ).animate( { 'scrollTop': _this.opt.pos }, _this.duration );
				}
			});
		}
	}

	this.inc = function(){

		//Stop scroll when it reaches to bottom
		if( this.opt.pos >= this.opt.ah - this.opt.vh ){
			return false;
		}

		this.opt.pos = this.opt.pos + this.opt.scroll;
		return true;
	}

	this.dec = function(){

		//Stop scroll when it is in top
		if(  this.opt.pos <= 0 ){
			return false;
		}

		this.opt.pos = this.opt.pos - this.opt.scroll;

		return true; 
	}

	this.init();
};

$.fn.vslide = function( options) {

	var defaults = {
			pos    	 : 0,    // Current Scroll Position
			scroll 	 : 200,  // Offset to scroll
			next   	 : null, // Next Button
			prev   	 : null, // Previous Button
			ele    	 : null, // Slider Element
			ah     	 : 0,    // Acutal Height of Slider
			vh     	 : 0,    // Visible Height of Slider
			duration : 300,  // Animation Duration 
			height   : 500   // Default Height for element if designer didn't gave height from css
		};

	var settings = $.extend( defaults, options );

    return this.each( function(){

    	settings.ele = $( this );

    	var vh = $( this ).height();

    	$( this ).css( { height: 'auto', 'overflow' : 'hidden' } );

    	var ah = $( this ).height();

    	if( typeof options.height != 'undefined' ){

    		var h = parseInt( settings.height );

    		if( isNaN( h ) ){
    			console.error( 'Invalid height for v slider.' );
    		}else{

    			vh = h;
    		}
    		
    	}else{

    		if( vh == ah ){
    			//This means designer didn't gave height from css
    			vh = ah/2;
    			console.warn( 'Set height for v slider.' );
    		}
    	}

    	$( this ).css( { height: vh } ); //Set previous height

    	settings.ah = ah;
    	settings.vh = vh;

    	new vslide( settings );
    	
    });
};