function vslide( options ){

	this.opt = options;

	this.init = function(){

		var _this = this;

		if( null != this.opt.next ){

			jQuery( document ).on( 'click', this.opt.next, function(){

				if( _this.dec() ){

					jQuery( _this.opt.ele ).animate( { 'scrollTop': _this.opt.pos }, _this.duration );
				}
			});
		}

		if( null != this.opt.prev ){

			jQuery( document ).on( 'click', this.opt.prev, function(){

				if( _this.inc() ){

					jQuery( _this.opt.ele ).animate( { 'scrollTop': _this.opt.pos }, _this.duration );
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

jQuery.fn.vslide = function( options) {

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

	var settings = jQuery.extend( defaults, options );

    return this.each( function(){

    	settings.ele = jQuery( this );

    	var vh = $( this ).height(),
    		ah = $( this )[0].scrollHeight,
			hideNav = function(){
				$( settings.prev ).hide();
				$( settings.next ).hide();
    		};

    	if( typeof options.height == 'undefined' ){

    		if( vh == ah ){
    			//This means designer didn't gave height from css
    			//vh = ah/2;
    			console.warn( 'Set height for v slider.' );
    		}
    		
    	}else{
    		
    		var h = parseInt( settings.height );

    		if( isNaN( h ) ){
    			console.error( 'Invalid height for v slider.' );
    		}else{

    			vh = h;
    		}
    	}

    	jQuery( this ).css( { height: vh } ); //Set previous height

    	//Hide prev and next button if slider is small for scrolling
    	if( ah <= vh ){ hideNav(); }

    	settings.ah = ah;
    	settings.vh = vh;

    	new vslide( settings );
    	
    });
};