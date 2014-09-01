(function ($) {
	"use strict";

	//Shortcut for fancyBox object
	var F = $.fancybox,
		format = function( url, rez, params ) {
			params = params || '';

			if ( $.type( params ) === "object" ) {
				params = $.param(params, true);
			}

			$.each(rez, function(key, value) {
				url = url.replace( '$' + key, value || '' );
			});

			if (params.length) {
				url += ( url.indexOf('?') > 0 ? '&' : '?' ) + params;
			}

			return url;
		};

	//Add helper object
	F.helpers.media = {
		defaults : {
			youtube : {
				matcher : /(youtube\.com|youtu\.be|youtube-nocookie\.com)\/(watch\?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*)).*/i,
				params  : {
					autoplay    : 1,
					autohide    : 1,
					fs          : 1,
					rel         : 0,
					hd          : 1,
					wmode       : 'opaque',
					enablejsapi : 1
				},
				type : 'iframe',
				url  : '//www.youtube.com/embed/$3'
			},
			vimeo : {
				matcher : /(?:vimeo(?:pro)?.com)\/(?:[^\d]+)?(\d+)(?:.*)/,
				params  : {
					autoplay      : 1,
					hd            : 1,
					show_title    : 1,
					show_byline   : 1,
					show_portrait : 0,
					fullscreen    : 1
				},
				type : 'iframe',
				url  : '//player.vimeo.com/video/$1'
			},
			metacafe : {
				matcher : /metacafe.com\/(?:watch|fplayer)\/([\w\-]{1,10})/,
				params  : {
					autoPlay : 'yes'
				},
				type : 'swf',
				url  : function( rez, params, obj ) {
					obj.swf.flashVars = 'playerVars=' + $.param( params, true );

					return '//www.metacafe.com/fplayer/' + rez[1] + '/.swf';
				}
			},
			dailymotion : {
				matcher : /dailymotion.com\/video\/(.*)\/?(.*)/,
				params  : {
					additionalInfos : 0,
					autoStart : 1
				},
				type : 'swf',
				url  : '//www.dailymotion.com/swf/video/$1'
			},
			twitvid : {
				matcher : /twitvid\.com\/([a-zA-Z0-9_\-\?\=]+)/i,
				params  : {
					autoplay : 0
				},
				type : 'iframe',
				url  : '//www.twitvid.com/embed.php?guid=$1'
			},
			twitpic : {
				matcher : /twitpic\.com\/(?!(?:place|photos|events)\/)([a-zA-Z0-9\?\=\-]+)/i,
				type : 'image',
				url  : '//twitpic.com/show/full/$1/'
			},
			instagram : {
				matcher : /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
				type : 'image',
				url  : '//$1/p/$2/media/?size=l'
			},
			google_maps : {
				matcher : /maps\.google\.([a-z]{2,3}(\.[a-z]{2})?)\/(\?ll=|maps\?)(.*)/i,
				type : 'iframe',
				url  : function( rez ) {
					return '//maps.google.' + rez[1] + '/' + rez[3] + '' + rez[4] + '&output=' + (rez[4].indexOf('layer=c') > 0 ? 'svembed' : 'embed');
				}
			}
		},

		beforeLoad : function(opts, obj) {
			var url   = obj.href || '',
				type  = false,
				what,
				item,
				rez,
				params;

			for (what in opts) {
				if (opts.hasOwnProperty(what)) {
					item = opts[ what ];
					rez  = url.match( item.matcher );

					if (rez) {
						type   = item.type;
						params = $.extend(true, {}, item.params, obj[ what ] || ($.isPlainObject(opts[ what ]) ? opts[ what ].params : null));

						url = $.type( item.url ) === "function" ? item.url.call( this, rez, params, obj ) : format( item.url, rez, params );

						break;
					}
				}
			}

			if (type) {
				obj.href = url;
				obj.type = type;

				obj.autoHeight = false;
			}
		}
	};

}(jQuery));
;(function($) {

    $.organicTabs = function(el, options) {
    
        var base = this;
        base.$el = $(el);
        base.$nav = base.$el.find(".nav");
                
        base.init = function() {
        
            base.options = $.extend({},$.organicTabs.defaultOptions, options);
            
            // Accessible hiding fix
            $(".hide").css({
                "position": "relative",
                "top": 0,
                "left": 0,
                "display": "none"
            }); 
            
            base.$nav.delegate("li > a", "click", function() {
            
                // Figure out current list via CSS class
                var curList = base.$el.find("a.current").attr("href").substring(1),
                
                // List moving to
                    $newList = $(this),
                    
                // Figure out ID of new list
                    listID = $newList.attr("href").substring(1),
                
                // Set outer wrapper height to (static) height of current inner list
                    $allListWrap = base.$el.find(".list-wrap"),
                    curListHeight = $allListWrap.height();
                $allListWrap.height(curListHeight);
                                        
                if ((listID != curList) && ( base.$el.find(":animated").length == 0)) {
                                            
                    // Fade out current list
                    base.$el.find("#"+curList).fadeOut(base.options.speed, function() {
                        
                        // Fade in new list on callback
                        base.$el.find("#"+listID).fadeIn(base.options.speed);
                        
                        // Adjust outer wrapper to fit new list snuggly
                        var newHeight = base.$el.find("#"+listID).height();
                        $allListWrap.animate({
                            height: newHeight
                        });
                        
                        // Remove highlighting - Add to just-clicked tab
                        base.$el.find(".nav li a").removeClass("current");
                        $newList.addClass("current");
                            
                    });
                    
                }   
                
                // Don't behave like a regular link
                // Stop propegation and bubbling
                return false;
            });
            
        };
        base.init();
    };
    
    $.organicTabs.defaultOptions = {
        "speed": 300
    };
    
    $.fn.organicTabs = function(options) {
        return this.each(function() {
            (new $.organicTabs(this, options));
        });
    };
    
})(jQuery);
;/* Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-fontface-backgroundsize-borderimage-borderradius-boxshadow-flexbox-hsla-multiplebgs-opacity-rgba-textshadow-cssanimations-csscolumns-generatedcontent-cssgradients-cssreflections-csstransforms-csstransforms3d-csstransitions-applicationcache-canvas-canvastext-draganddrop-hashchange-history-audio-video-indexeddb-input-inputtypes-localstorage-postmessage-sessionstorage-websockets-websqldatabase-webworkers-geolocation-inlinesvg-smil-svg-svgclippaths-touch-webgl-shiv-mq-cssclasses-addtest-prefixed-teststyles-testprop-testallprops-hasevent-prefixes-domprefixes-load
 */
;window.Modernizr=function(a,b,c){function D(a){j.cssText=a}function E(a,b){return D(n.join(a+";")+(b||""))}function F(a,b){return typeof a===b}function G(a,b){return!!~(""+a).indexOf(b)}function H(a,b){for(var d in a){var e=a[d];if(!G(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function I(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:F(f,"function")?f.bind(d||b):f}return!1}function J(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+p.join(d+" ")+d).split(" ");return F(b,"string")||F(b,"undefined")?H(e,b):(e=(a+" "+q.join(d+" ")+d).split(" "),I(e,b,c))}function K(){e.input=function(c){for(var d=0,e=c.length;d<e;d++)u[c[d]]=c[d]in k;return u.list&&(u.list=!!b.createElement("datalist")&&!!a.HTMLDataListElement),u}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")),e.inputtypes=function(a){for(var d=0,e,f,h,i=a.length;d<i;d++)k.setAttribute("type",f=a[d]),e=k.type!=="text",e&&(k.value=l,k.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(f)&&k.style.WebkitAppearance!==c?(g.appendChild(k),h=b.defaultView,e=h.getComputedStyle&&h.getComputedStyle(k,null).WebkitAppearance!=="textfield"&&k.offsetHeight!==0,g.removeChild(k)):/^(search|tel)$/.test(f)||(/^(url|email)$/.test(f)?e=k.checkValidity&&k.checkValidity()===!1:e=k.value!=l)),t[a[d]]=!!e;return t}("search tel url email datetime date month week time datetime-local number range color".split(" "))}var d="2.6.2",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k=b.createElement("input"),l=":)",m={}.toString,n=" -webkit- -moz- -o- -ms- ".split(" "),o="Webkit Moz O ms",p=o.split(" "),q=o.toLowerCase().split(" "),r={svg:"http://www.w3.org/2000/svg"},s={},t={},u={},v=[],w=v.slice,x,y=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},z=function(b){var c=a.matchMedia||a.msMatchMedia;if(c)return c(b).matches;var d;return y("@media "+b+" { #"+h+" { position: absolute; } }",function(b){d=(a.getComputedStyle?getComputedStyle(b,null):b.currentStyle)["position"]=="absolute"}),d},A=function(){function d(d,e){e=e||b.createElement(a[d]||"div"),d="on"+d;var f=d in e;return f||(e.setAttribute||(e=b.createElement("div")),e.setAttribute&&e.removeAttribute&&(e.setAttribute(d,""),f=F(e[d],"function"),F(e[d],"undefined")||(e[d]=c),e.removeAttribute(d))),e=null,f}var a={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return d}(),B={}.hasOwnProperty,C;!F(B,"undefined")&&!F(B.call,"undefined")?C=function(a,b){return B.call(a,b)}:C=function(a,b){return b in a&&F(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=w.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(w.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(w.call(arguments)))};return e}),s.flexbox=function(){return J("flexWrap")},s.canvas=function(){var a=b.createElement("canvas");return!!a.getContext&&!!a.getContext("2d")},s.canvastext=function(){return!!e.canvas&&!!F(b.createElement("canvas").getContext("2d").fillText,"function")},s.webgl=function(){return!!a.WebGLRenderingContext},s.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:y(["@media (",n.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c},s.geolocation=function(){return"geolocation"in navigator},s.postmessage=function(){return!!a.postMessage},s.websqldatabase=function(){return!!a.openDatabase},s.indexedDB=function(){return!!J("indexedDB",a)},s.hashchange=function(){return A("hashchange",a)&&(b.documentMode===c||b.documentMode>7)},s.history=function(){return!!a.history&&!!history.pushState},s.draganddrop=function(){var a=b.createElement("div");return"draggable"in a||"ondragstart"in a&&"ondrop"in a},s.websockets=function(){return"WebSocket"in a||"MozWebSocket"in a},s.rgba=function(){return D("background-color:rgba(150,255,150,.5)"),G(j.backgroundColor,"rgba")},s.hsla=function(){return D("background-color:hsla(120,40%,100%,.5)"),G(j.backgroundColor,"rgba")||G(j.backgroundColor,"hsla")},s.multiplebgs=function(){return D("background:url(https://),url(https://),red url(https://)"),/(url\s*\(.*?){3}/.test(j.background)},s.backgroundsize=function(){return J("backgroundSize")},s.borderimage=function(){return J("borderImage")},s.borderradius=function(){return J("borderRadius")},s.boxshadow=function(){return J("boxShadow")},s.textshadow=function(){return b.createElement("div").style.textShadow===""},s.opacity=function(){return E("opacity:.55"),/^0.55$/.test(j.opacity)},s.cssanimations=function(){return J("animationName")},s.csscolumns=function(){return J("columnCount")},s.cssgradients=function(){var a="background-image:",b="gradient(linear,left top,right bottom,from(#9f9),to(white));",c="linear-gradient(left top,#9f9, white);";return D((a+"-webkit- ".split(" ").join(b+a)+n.join(c+a)).slice(0,-a.length)),G(j.backgroundImage,"gradient")},s.cssreflections=function(){return J("boxReflect")},s.csstransforms=function(){return!!J("transform")},s.csstransforms3d=function(){var a=!!J("perspective");return a&&"webkitPerspective"in g.style&&y("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(b,c){a=b.offsetLeft===9&&b.offsetHeight===3}),a},s.csstransitions=function(){return J("transition")},s.fontface=function(){var a;return y('@font-face {font-family:"font";src:url("https://")}',function(c,d){var e=b.getElementById("smodernizr"),f=e.sheet||e.styleSheet,g=f?f.cssRules&&f.cssRules[0]?f.cssRules[0].cssText:f.cssText||"":"";a=/src/i.test(g)&&g.indexOf(d.split(" ")[0])===0}),a},s.generatedcontent=function(){var a;return y(["#",h,"{font:0/0 a}#",h,':after{content:"',l,'";visibility:hidden;font:3px/1 a}'].join(""),function(b){a=b.offsetHeight>=3}),a},s.video=function(){var a=b.createElement("video"),c=!1;try{if(c=!!a.canPlayType)c=new Boolean(c),c.ogg=a.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),c.h264=a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),c.webm=a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,"")}catch(d){}return c},s.audio=function(){var a=b.createElement("audio"),c=!1;try{if(c=!!a.canPlayType)c=new Boolean(c),c.ogg=a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),c.mp3=a.canPlayType("audio/mpeg;").replace(/^no$/,""),c.wav=a.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),c.m4a=(a.canPlayType("audio/x-m4a;")||a.canPlayType("audio/aac;")).replace(/^no$/,"")}catch(d){}return c},s.localstorage=function(){try{return localStorage.setItem(h,h),localStorage.removeItem(h),!0}catch(a){return!1}},s.sessionstorage=function(){try{return sessionStorage.setItem(h,h),sessionStorage.removeItem(h),!0}catch(a){return!1}},s.webworkers=function(){return!!a.Worker},s.applicationcache=function(){return!!a.applicationCache},s.svg=function(){return!!b.createElementNS&&!!b.createElementNS(r.svg,"svg").createSVGRect},s.inlinesvg=function(){var a=b.createElement("div");return a.innerHTML="<svg/>",(a.firstChild&&a.firstChild.namespaceURI)==r.svg},s.smil=function(){return!!b.createElementNS&&/SVGAnimate/.test(m.call(b.createElementNS(r.svg,"animate")))},s.svgclippaths=function(){return!!b.createElementNS&&/SVGClipPath/.test(m.call(b.createElementNS(r.svg,"clipPath")))};for(var L in s)C(s,L)&&(x=L.toLowerCase(),e[x]=s[L](),v.push((e[x]?"":"no-")+x));return e.input||K(),e.addTest=function(a,b){if(typeof a=="object")for(var d in a)C(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},D(""),i=k=null,function(a,b){function k(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function l(){var a=r.elements;return typeof a=="string"?a.split(" "):a}function m(a){var b=i[a[g]];return b||(b={},h++,a[g]=h,i[h]=b),b}function n(a,c,f){c||(c=b);if(j)return c.createElement(a);f||(f=m(c));var g;return f.cache[a]?g=f.cache[a].cloneNode():e.test(a)?g=(f.cache[a]=f.createElem(a)).cloneNode():g=f.createElem(a),g.canHaveChildren&&!d.test(a)?f.frag.appendChild(g):g}function o(a,c){a||(a=b);if(j)return a.createDocumentFragment();c=c||m(a);var d=c.frag.cloneNode(),e=0,f=l(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function p(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return r.shivMethods?n(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+l().join().replace(/\w+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(r,b.frag)}function q(a){a||(a=b);var c=m(a);return r.shivCSS&&!f&&!c.hasCSS&&(c.hasCSS=!!k(a,"article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")),j||p(a,c),a}var c=a.html5||{},d=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,e=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,f,g="_html5shiv",h=0,i={},j;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",f="hidden"in a,j=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){f=!0,j=!0}})();var r={elements:c.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:c.shivCSS!==!1,supportsUnknownElements:j,shivMethods:c.shivMethods!==!1,type:"default",shivDocument:q,createElement:n,createDocumentFragment:o};a.html5=r,q(b)}(this,b),e._version=d,e._prefixes=n,e._domPrefixes=q,e._cssomPrefixes=p,e.mq=z,e.hasEvent=A,e.testProp=function(a){return H([a])},e.testAllProps=J,e.testStyles=y,e.prefixed=function(a,b,c){return b?J(a,b,c):J(a,"pfx")},g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+v.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};

;/* Modernizr 2.0.6 (Custom Build) | MIT & BSD */
;window.Modernizr=function(a,b,c){function D(a,b){var c=a.charAt(0).toUpperCase()+a.substr(1),d=(a+" "+o.join(c+" ")+c).split(" ");return C(d,b)}function C(a,b){for(var d in a)if(k[a[d]]!==c)return b=="pfx"?a[d]:!0;return!1}function B(a,b){return!!~(""+a).indexOf(b)}function A(a,b){return typeof a===b}function z(a,b){return y(n.join(a+";")+(b||""))}function y(a){k.cssText=a}var d="2.0.6",e={},f=!0,g=b.documentElement,h=b.head||b.getElementsByTagName("head")[0],i="modernizr",j=b.createElement(i),k=j.style,l,m=Object.prototype.toString,n=" -webkit- -moz- -o- -ms- -khtml- ".split(" "),o="Webkit Moz O ms Khtml".split(" "),p={},q={},r={},s=[],t=function(a,c,d,e){var f,h,j,k=b.createElement("div");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:i+(d+1),k.appendChild(j);f=["&shy;","<style>",a,"</style>"].join(""),k.id=i,k.innerHTML+=f,g.appendChild(k),h=c(k,a),k.parentNode.removeChild(k);return!!h},u=function(b){if(a.matchMedia)return matchMedia(b).matches;var c;t("@media "+b+" { #"+i+" { position: absolute; } }",function(b){c=(a.getComputedStyle?getComputedStyle(b,null):b.currentStyle).position=="absolute"});return c},v,w={}.hasOwnProperty,x;!A(w,c)&&!A(w.call,c)?x=function(a,b){return w.call(a,b)}:x=function(a,b){return b in a&&A(a.constructor.prototype[b],c)},p.rgba=function(){y("background-color:rgba(150,255,150,.5)");return B(k.backgroundColor,"rgba")},p.boxshadow=function(){return D("boxShadow")},p.csstransitions=function(){return D("transitionProperty")};for(var E in p)x(p,E)&&(v=E.toLowerCase(),e[v]=p[E](),s.push((e[v]?"":"no-")+v));e.addTest=function(a,b){if(typeof a=="object")for(var d in a)x(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return;b=typeof b=="boolean"?b:!!b(),g.className+=" "+(b?"":"no-")+a,e[a]=b}return e},y(""),j=l=null,a.attachEvent&&function(){var a=b.createElement("div");a.innerHTML="<elem></elem>";return a.childNodes.length!==1}()&&function(a,b){function s(a){var b=-1;while(++b<g)a.createElement(f[b])}a.iepp=a.iepp||{};var d=a.iepp,e=d.html5elements||"abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",f=e.split("|"),g=f.length,h=new RegExp("(^|\\s)("+e+")","gi"),i=new RegExp("<(/*)("+e+")","gi"),j=/^\s*[\{\}]\s*$/,k=new RegExp("(^|[^\\n]*?\\s)("+e+")([^\\n]*)({[\\n\\w\\W]*?})","gi"),l=b.createDocumentFragment(),m=b.documentElement,n=m.firstChild,o=b.createElement("body"),p=b.createElement("style"),q=/print|all/,r;d.getCSS=function(a,b){if(a+""===c)return"";var e=-1,f=a.length,g,h=[];while(++e<f){g=a[e];if(g.disabled)continue;b=g.media||b,q.test(b)&&h.push(d.getCSS(g.imports,b),g.cssText),b="all"}return h.join("")},d.parseCSS=function(a){var b=[],c;while((c=k.exec(a))!=null)b.push(((j.exec(c[1])?"\n":c[1])+c[2]+c[3]).replace(h,"$1.iepp_$2")+c[4]);return b.join("\n")},d.writeHTML=function(){var a=-1;r=r||b.body;while(++a<g){var c=b.getElementsByTagName(f[a]),d=c.length,e=-1;while(++e<d)c[e].className.indexOf("iepp_")<0&&(c[e].className+=" iepp_"+f[a])}l.appendChild(r),m.appendChild(o),o.className=r.className,o.id=r.id,o.innerHTML=r.innerHTML.replace(i,"<$1font")},d._beforePrint=function(){p.styleSheet.cssText=d.parseCSS(d.getCSS(b.styleSheets,"all")),d.writeHTML()},d.restoreHTML=function(){o.innerHTML="",m.removeChild(o),m.appendChild(r)},d._afterPrint=function(){d.restoreHTML(),p.styleSheet.cssText=""},s(b),s(l);d.disablePP||(n.insertBefore(p,n.firstChild),p.media="print",p.className="iepp-printshim",a.attachEvent("onbeforeprint",d._beforePrint),a.attachEvent("onafterprint",d._afterPrint))}(a,b),e._version=d,e._prefixes=n,e._domPrefixes=o,e.mq=u,e.testProp=function(a){return C([a])},e.testAllProps=D,e.testStyles=t,g.className=g.className.replace(/\bno-js\b/,"")+(f?" js "+s.join(" "):"");return e}(this,this.document),function(a,b){function u(){r(!0)}a.respond={},respond.update=function(){},respond.mediaQueriesSupported=b;if(!b){var c=a.document,d=c.documentElement,e=[],f=[],g=[],h={},i=30,j=c.getElementsByTagName("head")[0]||d,k=j.getElementsByTagName("link"),l=[],m=function(){var b=k,c=b.length,d=0,e,f,g,i;for(;d<c;d++)e=b[d],f=e.href,g=e.media,i=e.rel&&e.rel.toLowerCase()==="stylesheet",!!f&&i&&!h[f]&&(!/^([a-zA-Z]+?:(\/\/)?(www\.)?)/.test(f)||f.replace(RegExp.$1,"").split("/")[0]===a.location.host?l.push({href:f,media:g}):h[f]=!0);n()},n=function(){if(l.length){var a=l.shift();s(a.href,function(b){o(b,a.href,a.media),h[a.href]=!0,n()})}},o=function(a,b,c){var d=a.match(/@media[^\{]+\{([^\{\}]+\{[^\}\{]+\})+/gi),g=d&&d.length||0,b=b.substring(0,b.lastIndexOf("/")),h=function(a){return a.replace(/(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g,"$1"+b+"$2$3")},i=!g&&c,j=0,k,l,m,n,o;b.length&&(b+="/"),i&&(g=1);for(;j<g;j++){k=0,i?(l=c,f.push(h(a))):(l=d[j].match(/@media ([^\{]+)\{([\S\s]+?)$/)&&RegExp.$1,f.push(RegExp.$2&&h(RegExp.$2))),n=l.split(","),o=n.length;for(;k<o;k++)m=n[k],e.push({media:m.match(/(only\s+)?([a-zA-Z]+)(\sand)?/)&&RegExp.$2,rules:f.length-1,minw:m.match(/\(min\-width:[\s]*([\s]*[0-9]+)px[\s]*\)/)&&parseFloat(RegExp.$1),maxw:m.match(/\(max\-width:[\s]*([\s]*[0-9]+)px[\s]*\)/)&&parseFloat(RegExp.$1)})}r()},p,q,r=function(a){var b="clientWidth",h=d[b],l=c.compatMode==="CSS1Compat"&&h||c.body[b]||h,m={},n=c.createDocumentFragment(),o=k[k.length-1],s=(new Date).getTime();if(a&&p&&s-p<i)clearTimeout(q),q=setTimeout(r,i);else{p=s;for(var t in e){var u=e[t];if(!u.minw&&!u.maxw||(!u.minw||u.minw&&l>=u.minw)&&(!u.maxw||u.maxw&&l<=u.maxw))m[u.media]||(m[u.media]=[]),m[u.media].push(f[u.rules])}for(var t in g)g[t]&&g[t].parentNode===j&&j.removeChild(g[t]);for(var t in m){var v=c.createElement("style"),w=m[t].join("\n");v.type="text/css",v.media=t,v.styleSheet?v.styleSheet.cssText=w:v.appendChild(c.createTextNode(w)),n.appendChild(v),g.push(v)}j.insertBefore(n,o.nextSibling)}},s=function(a,b){var c=t();if(!!c){c.open("GET",a,!0),c.onreadystatechange=function(){c.readyState==4&&(c.status==200||c.status==304)&&b(c.responseText)};if(c.readyState==4)return;c.send()}},t=function(){var a=!1,b=[function(){return new ActiveXObject("Microsoft.XMLHTTP")},function(){return new XMLHttpRequest}],c=b.length;while(c--){try{a=b[c]()}catch(d){continue}break}return function(){return a}}();m(),respond.update=m,a.addEventListener?a.addEventListener("resize",u,!1):a.attachEvent&&a.attachEvent("onresize",u)}}(this,Modernizr.mq("only all")),function(a,b,c){function k(a){return!a||a=="loaded"||a=="complete"}function j(){var a=1,b=-1;while(p.length- ++b)if(p[b].s&&!(a=p[b].r))break;a&&g()}function i(a){var c=b.createElement("script"),d;c.src=a.s,c.onreadystatechange=c.onload=function(){!d&&k(c.readyState)&&(d=1,j(),c.onload=c.onreadystatechange=null)},m(function(){d||(d=1,j())},H.errorTimeout),a.e?c.onload():n.parentNode.insertBefore(c,n)}function h(a){var c=b.createElement("link"),d;c.href=a.s,c.rel="stylesheet",c.type="text/css";if(!a.e&&(w||r)){var e=function(a){m(function(){if(!d)try{a.sheet.cssRules.length?(d=1,j()):e(a)}catch(b){b.code==1e3||b.message=="security"||b.message=="denied"?(d=1,m(function(){j()},0)):e(a)}},0)};e(c)}else c.onload=function(){d||(d=1,m(function(){j()},0))},a.e&&c.onload();m(function(){d||(d=1,j())},H.errorTimeout),!a.e&&n.parentNode.insertBefore(c,n)}function g(){var a=p.shift();q=1,a?a.t?m(function(){a.t=="c"?h(a):i(a)},0):(a(),j()):q=0}function f(a,c,d,e,f,h){function i(){!o&&k(l.readyState)&&(r.r=o=1,!q&&j(),l.onload=l.onreadystatechange=null,m(function(){u.removeChild(l)},0))}var l=b.createElement(a),o=0,r={t:d,s:c,e:h};l.src=l.data=c,!s&&(l.style.display="none"),l.width=l.height="0",a!="object"&&(l.type=d),l.onload=l.onreadystatechange=i,a=="img"?l.onerror=i:a=="script"&&(l.onerror=function(){r.e=r.r=1,g()}),p.splice(e,0,r),u.insertBefore(l,s?null:n),m(function(){o||(u.removeChild(l),r.r=r.e=o=1,j())},H.errorTimeout)}function e(a,b,c){var d=b=="c"?z:y;q=0,b=b||"j",C(a)?f(d,a,b,this.i++,l,c):(p.splice(this.i++,0,a),p.length==1&&g());return this}function d(){var a=H;a.loader={load:e,i:0};return a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=r&&!s,u=s?l:n.parentNode,v=a.opera&&o.call(a.opera)=="[object Opera]",w="webkitAppearance"in l.style,x=w&&"async"in b.createElement("script"),y=r?"object":v||x?"img":"script",z=w?"img":y,A=Array.isArray||function(a){return o.call(a)=="[object Array]"},B=function(a){return Object(a)===a},C=function(a){return typeof a=="string"},D=function(a){return o.call(a)=="[object Function]"},E=[],F={},G,H;H=function(a){function f(a){var b=a.split("!"),c=E.length,d=b.pop(),e=b.length,f={url:d,origUrl:d,prefixes:b},g,h;for(h=0;h<e;h++)g=F[b[h]],g&&(f=g(f));for(h=0;h<c;h++)f=E[h](f);return f}function e(a,b,e,g,h){var i=f(a),j=i.autoCallback;if(!i.bypass){b&&(b=D(b)?b:b[a]||b[g]||b[a.split("/").pop().split("?")[0]]);if(i.instead)return i.instead(a,b,e,g,h);e.load(i.url,i.forceCSS||!i.forceJS&&/css$/.test(i.url)?"c":c,i.noexec),(D(b)||D(j))&&e.load(function(){d(),b&&b(i.origUrl,h,g),j&&j(i.origUrl,h,g)})}}function b(a,b){function c(a){if(C(a))e(a,h,b,0,d);else if(B(a))for(i in a)a.hasOwnProperty(i)&&e(a[i],h,b,i,d)}var d=!!a.test,f=d?a.yep:a.nope,g=a.load||a.both,h=a.callback,i;c(f),c(g),a.complete&&b.load(a.complete)}var g,h,i=this.yepnope.loader;if(C(a))e(a,0,i,0);else if(A(a))for(g=0;g<a.length;g++)h=a[g],C(h)?e(h,0,i,0):A(h)?H(h):B(h)&&b(h,i);else B(a)&&b(a,i)},H.addPrefix=function(a,b){F[a]=b},H.addFilter=function(a){E.push(a)},H.errorTimeout=1e4,b.readyState==null&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",G=function(){b.removeEventListener("DOMContentLoaded",G,0),b.readyState="complete"},0)),a.yepnope=d()}(this,this.document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};
;/*
 * jQuery FlexSlider v2.2.0
 * Copyright 2012 WooThemes
 * Contributing Author: Tyler Smith
 */
;
(function ($) {

  //FlexSlider: Object Instance
  $.flexslider = function(el, options) {
    var slider = $(el);

    // making variables public
    slider.vars = $.extend({}, $.flexslider.defaults, options);

    var namespace = slider.vars.namespace,
        msGesture = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
        touch = (( "ontouchstart" in window ) || msGesture || window.DocumentTouch && document instanceof DocumentTouch) && slider.vars.touch,
        // depricating this idea, as devices are being released with both of these events
        //eventType = (touch) ? "touchend" : "click",
        eventType = "click touchend MSPointerUp",
        watchedEvent = "",
        watchedEventClearTimer,
        vertical = slider.vars.direction === "vertical",
        reverse = slider.vars.reverse,
        carousel = (slider.vars.itemWidth > 0),
        fade = slider.vars.animation === "fade",
        asNav = slider.vars.asNavFor !== "",
        methods = {},
        focused = true;

    // Store a reference to the slider object
    $.data(el, "flexslider", slider);

    // Private slider methods
    methods = {
      init: function() {
        slider.animating = false;
        // Get current slide and make sure it is a number
        slider.currentSlide = parseInt( ( slider.vars.startAt ? slider.vars.startAt : 0) );
        if ( isNaN( slider.currentSlide ) ) slider.currentSlide = 0;
        slider.animatingTo = slider.currentSlide;
        slider.atEnd = (slider.currentSlide === 0 || slider.currentSlide === slider.last);
        slider.containerSelector = slider.vars.selector.substr(0,slider.vars.selector.search(' '));
        slider.slides = $(slider.vars.selector, slider);
        slider.container = $(slider.containerSelector, slider);
        slider.count = slider.slides.length;
        // SYNC:
        slider.syncExists = $(slider.vars.sync).length > 0;
        // SLIDE:
        if (slider.vars.animation === "slide") slider.vars.animation = "swing";
        slider.prop = (vertical) ? "top" : "marginLeft";
        slider.args = {};
        // SLIDESHOW:
        slider.manualPause = false;
        slider.stopped = false;
        //PAUSE WHEN INVISIBLE
        slider.started = false;
        slider.startTimeout = null;
        // TOUCH/USECSS:
        slider.transitions = !slider.vars.video && !fade && slider.vars.useCSS && (function() {
          var obj = document.createElement('div'),
              props = ['perspectiveProperty', 'WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective'];
          for (var i in props) {
            if ( obj.style[ props[i] ] !== undefined ) {
              slider.pfx = props[i].replace('Perspective','').toLowerCase();
              slider.prop = "-" + slider.pfx + "-transform";
              return true;
            }
          }
          return false;
        }());
        // CONTROLSCONTAINER:
        if (slider.vars.controlsContainer !== "") slider.controlsContainer = $(slider.vars.controlsContainer).length > 0 && $(slider.vars.controlsContainer);
        // MANUAL:
        if (slider.vars.manualControls !== "") slider.manualControls = $(slider.vars.manualControls).length > 0 && $(slider.vars.manualControls);

        // RANDOMIZE:
        if (slider.vars.randomize) {
          slider.slides.sort(function() { return (Math.round(Math.random())-0.5); });
          slider.container.empty().append(slider.slides);
        }

        slider.doMath();

        // INIT
        slider.setup("init");

        // CONTROLNAV:
        if (slider.vars.controlNav) methods.controlNav.setup();

        // DIRECTIONNAV:
        if (slider.vars.directionNav) methods.directionNav.setup();

        // KEYBOARD:
        if (slider.vars.keyboard && ($(slider.containerSelector).length === 1 || slider.vars.multipleKeyboard)) {
          $(document).bind('keyup', function(event) {
            var keycode = event.keyCode;
            if (!slider.animating && (keycode === 39 || keycode === 37)) {
              var target = (keycode === 39) ? slider.getTarget('next') :
                           (keycode === 37) ? slider.getTarget('prev') : false;
              slider.flexAnimate(target, slider.vars.pauseOnAction);
            }
          });
        }
        // MOUSEWHEEL:
        if (slider.vars.mousewheel) {
          slider.bind('mousewheel', function(event, delta, deltaX, deltaY) {
            event.preventDefault();
            var target = (delta < 0) ? slider.getTarget('next') : slider.getTarget('prev');
            slider.flexAnimate(target, slider.vars.pauseOnAction);
          });
        }

        // PAUSEPLAY
        if (slider.vars.pausePlay) methods.pausePlay.setup();

        //PAUSE WHEN INVISIBLE
        if (slider.vars.slideshow && slider.vars.pauseInvisible) methods.pauseInvisible.init();

        // SLIDSESHOW
        if (slider.vars.slideshow) {
          if (slider.vars.pauseOnHover) {
            slider.hover(function() {
              if (!slider.manualPlay && !slider.manualPause) slider.pause();
            }, function() {
              if (!slider.manualPause && !slider.manualPlay && !slider.stopped) slider.play();
            });
          }
          // initialize animation
          //If we're visible, or we don't use PageVisibility API
          if(!slider.vars.pauseInvisible || !methods.pauseInvisible.isHidden()) {
            (slider.vars.initDelay > 0) ? slider.startTimeout = setTimeout(slider.play, slider.vars.initDelay) : slider.play();
          }
        }

        // ASNAV:
        if (asNav) methods.asNav.setup();

        // TOUCH
        if (touch && slider.vars.touch) methods.touch();

        // FADE&&SMOOTHHEIGHT || SLIDE:
        if (!fade || (fade && slider.vars.smoothHeight)) $(window).bind("resize orientationchange focus", methods.resize);

        slider.find("img").attr("draggable", "false");

        // API: start() Callback
        setTimeout(function(){
          slider.vars.start(slider);
        }, 200);
      },
      asNav: {
        setup: function() {
          slider.asNav = true;
          slider.animatingTo = Math.floor(slider.currentSlide/slider.move);
          slider.currentItem = slider.currentSlide;
          slider.slides.removeClass(namespace + "active-slide").eq(slider.currentItem).addClass(namespace + "active-slide");
          if(!msGesture){
              slider.slides.click(function(e){
                e.preventDefault();
                var $slide = $(this),
                    target = $slide.index();
                var posFromLeft = $slide.offset().left - $(slider).scrollLeft(); // Find position of slide relative to left of slider container
                if( posFromLeft <= 0 && $slide.hasClass( namespace + 'active-slide' ) ) {
                  slider.flexAnimate(slider.getTarget("prev"), true);
                } else if (!$(slider.vars.asNavFor).data('flexslider').animating && !$slide.hasClass(namespace + "active-slide")) {
                  slider.direction = (slider.currentItem < target) ? "next" : "prev";
                  slider.flexAnimate(target, slider.vars.pauseOnAction, false, true, true);
                }
              });
          }else{
              el._slider = slider;
              slider.slides.each(function (){
                  var that = this;
                  that._gesture = new MSGesture();
                  that._gesture.target = that;
                  that.addEventListener("MSPointerDown", function (e){
                      e.preventDefault();
                      if(e.currentTarget._gesture)
                          e.currentTarget._gesture.addPointer(e.pointerId);
                  }, false);
                  that.addEventListener("MSGestureTap", function (e){
                      e.preventDefault();
                      var $slide = $(this),
                          target = $slide.index();
                      if (!$(slider.vars.asNavFor).data('flexslider').animating && !$slide.hasClass('active')) {
                          slider.direction = (slider.currentItem < target) ? "next" : "prev";
                          slider.flexAnimate(target, slider.vars.pauseOnAction, false, true, true);
                      }
                  });
              });
          }
        }
      },
      controlNav: {
        setup: function() {
          if (!slider.manualControls) {
            methods.controlNav.setupPaging();
          } else { // MANUALCONTROLS:
            methods.controlNav.setupManual();
          }
        },
        setupPaging: function() {
          var type = (slider.vars.controlNav === "thumbnails") ? 'control-thumbs' : 'control-paging',
              j = 1,
              item,
              slide;

          slider.controlNavScaffold = $('<ol class="'+ namespace + 'control-nav ' + namespace + type + '"></ol>');

          if (slider.pagingCount > 1) {
            for (var i = 0; i < slider.pagingCount; i++) {
              slide = slider.slides.eq(i);
              item = (slider.vars.controlNav === "thumbnails") ? '<img src="' + slide.attr( 'data-thumb' ) + '"/>' : '<a>' + j + '</a>';
              if ( 'thumbnails' === slider.vars.controlNav && true === slider.vars.thumbCaptions ) {
                var captn = slide.attr( 'data-thumbcaption' );
                if ( '' != captn && undefined != captn ) item += '<span class="' + namespace + 'caption">' + captn + '</span>';
              }
              slider.controlNavScaffold.append('<li>' + item + '</li>');
              j++;
            }
          }

          // CONTROLSCONTAINER:
          (slider.controlsContainer) ? $(slider.controlsContainer).append(slider.controlNavScaffold) : slider.append(slider.controlNavScaffold);
          methods.controlNav.set();

          methods.controlNav.active();

          slider.controlNavScaffold.delegate('a, img', eventType, function(event) {
            event.preventDefault();

            if (watchedEvent === "" || watchedEvent === event.type) {
              var $this = $(this),
                  target = slider.controlNav.index($this);

              if (!$this.hasClass(namespace + 'active')) {
                slider.direction = (target > slider.currentSlide) ? "next" : "prev";
                slider.flexAnimate(target, slider.vars.pauseOnAction);
              }
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();

          });
        },
        setupManual: function() {
          slider.controlNav = slider.manualControls;
          methods.controlNav.active();

          slider.controlNav.bind(eventType, function(event) {
            event.preventDefault();

            if (watchedEvent === "" || watchedEvent === event.type) {
              var $this = $(this),
                  target = slider.controlNav.index($this);

              if (!$this.hasClass(namespace + 'active')) {
                (target > slider.currentSlide) ? slider.direction = "next" : slider.direction = "prev";
                slider.flexAnimate(target, slider.vars.pauseOnAction);
              }
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();
          });
        },
        set: function() {
          var selector = (slider.vars.controlNav === "thumbnails") ? 'img' : 'a';
          slider.controlNav = $('.' + namespace + 'control-nav li ' + selector, (slider.controlsContainer) ? slider.controlsContainer : slider);
        },
        active: function() {
          slider.controlNav.removeClass(namespace + "active").eq(slider.animatingTo).addClass(namespace + "active");
        },
        update: function(action, pos) {
          if (slider.pagingCount > 1 && action === "add") {
            slider.controlNavScaffold.append($('<li><a>' + slider.count + '</a></li>'));
          } else if (slider.pagingCount === 1) {
            slider.controlNavScaffold.find('li').remove();
          } else {
            slider.controlNav.eq(pos).closest('li').remove();
          }
          methods.controlNav.set();
          (slider.pagingCount > 1 && slider.pagingCount !== slider.controlNav.length) ? slider.update(pos, action) : methods.controlNav.active();
        }
      },
      directionNav: {
        setup: function() {
          var directionNavScaffold = $('<ul class="' + namespace + 'direction-nav"><li><a class="' + namespace + 'prev" href="#">' + slider.vars.prevText + '</a></li><li><a class="' + namespace + 'next" href="#">' + slider.vars.nextText + '</a></li></ul>');

          // CONTROLSCONTAINER:
          if (slider.controlsContainer) {
            $(slider.controlsContainer).append(directionNavScaffold);
            slider.directionNav = $('.' + namespace + 'direction-nav li a', slider.controlsContainer);
          } else {
            slider.append(directionNavScaffold);
            slider.directionNav = $('.' + namespace + 'direction-nav li a', slider);
          }

          methods.directionNav.update();

          slider.directionNav.bind(eventType, function(event) {
            event.preventDefault();
            var target;

            if (watchedEvent === "" || watchedEvent === event.type) {
              target = ($(this).hasClass(namespace + 'next')) ? slider.getTarget('next') : slider.getTarget('prev');
              slider.flexAnimate(target, slider.vars.pauseOnAction);
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();
          });
        },
        update: function() {
          var disabledClass = namespace + 'disabled';
          if (slider.pagingCount === 1) {
            slider.directionNav.addClass(disabledClass).attr('tabindex', '-1');
          } else if (!slider.vars.animationLoop) {
            if (slider.animatingTo === 0) {
              slider.directionNav.removeClass(disabledClass).filter('.' + namespace + "prev").addClass(disabledClass).attr('tabindex', '-1');
            } else if (slider.animatingTo === slider.last) {
              slider.directionNav.removeClass(disabledClass).filter('.' + namespace + "next").addClass(disabledClass).attr('tabindex', '-1');
            } else {
              slider.directionNav.removeClass(disabledClass).removeAttr('tabindex');
            }
          } else {
            slider.directionNav.removeClass(disabledClass).removeAttr('tabindex');
          }
        }
      },
      pausePlay: {
        setup: function() {
          var pausePlayScaffold = $('<div class="' + namespace + 'pauseplay"><a></a></div>');

          // CONTROLSCONTAINER:
          if (slider.controlsContainer) {
            slider.controlsContainer.append(pausePlayScaffold);
            slider.pausePlay = $('.' + namespace + 'pauseplay a', slider.controlsContainer);
          } else {
            slider.append(pausePlayScaffold);
            slider.pausePlay = $('.' + namespace + 'pauseplay a', slider);
          }

          methods.pausePlay.update((slider.vars.slideshow) ? namespace + 'pause' : namespace + 'play');

          slider.pausePlay.bind(eventType, function(event) {
            event.preventDefault();

            if (watchedEvent === "" || watchedEvent === event.type) {
              if ($(this).hasClass(namespace + 'pause')) {
                slider.manualPause = true;
                slider.manualPlay = false;
                slider.pause();
              } else {
                slider.manualPause = false;
                slider.manualPlay = true;
                slider.play();
              }
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();
          });
        },
        update: function(state) {
          (state === "play") ? slider.pausePlay.removeClass(namespace + 'pause').addClass(namespace + 'play').html(slider.vars.playText) : slider.pausePlay.removeClass(namespace + 'play').addClass(namespace + 'pause').html(slider.vars.pauseText);
        }
      },
      touch: function() {
        var startX,
          startY,
          offset,
          cwidth,
          dx,
          startT,
          scrolling = false,
          localX = 0,
          localY = 0,
          accDx = 0;

        if(!msGesture){
            el.addEventListener('touchstart', onTouchStart, false);

            function onTouchStart(e) {
              if (slider.animating) {
                e.preventDefault();
              } else if ( ( window.navigator.msPointerEnabled ) || e.touches.length === 1 ) {
                slider.pause();
                // CAROUSEL:
                cwidth = (vertical) ? slider.h : slider. w;
                startT = Number(new Date());
                // CAROUSEL:

                // Local vars for X and Y points.
                localX = e.touches[0].pageX;
                localY = e.touches[0].pageY;

                offset = (carousel && reverse && slider.animatingTo === slider.last) ? 0 :
                         (carousel && reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) :
                         (carousel && slider.currentSlide === slider.last) ? slider.limit :
                         (carousel) ? ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.currentSlide :
                         (reverse) ? (slider.last - slider.currentSlide + slider.cloneOffset) * cwidth : (slider.currentSlide + slider.cloneOffset) * cwidth;
                startX = (vertical) ? localY : localX;
                startY = (vertical) ? localX : localY;

                el.addEventListener('touchmove', onTouchMove, false);
                el.addEventListener('touchend', onTouchEnd, false);
              }
            }

            function onTouchMove(e) {
              // Local vars for X and Y points.

              localX = e.touches[0].pageX;
              localY = e.touches[0].pageY;

              dx = (vertical) ? startX - localY : startX - localX;
              scrolling = (vertical) ? (Math.abs(dx) < Math.abs(localX - startY)) : (Math.abs(dx) < Math.abs(localY - startY));

              var fxms = 500;

              if ( ! scrolling || Number( new Date() ) - startT > fxms ) {
                e.preventDefault();
                if (!fade && slider.transitions) {
                  if (!slider.vars.animationLoop) {
                    dx = dx/((slider.currentSlide === 0 && dx < 0 || slider.currentSlide === slider.last && dx > 0) ? (Math.abs(dx)/cwidth+2) : 1);
                  }
                  slider.setProps(offset + dx, "setTouch");
                }
              }
            }

            function onTouchEnd(e) {
              // finish the touch by undoing the touch session
              el.removeEventListener('touchmove', onTouchMove, false);

              if (slider.animatingTo === slider.currentSlide && !scrolling && !(dx === null)) {
                var updateDx = (reverse) ? -dx : dx,
                    target = (updateDx > 0) ? slider.getTarget('next') : slider.getTarget('prev');

                if (slider.canAdvance(target) && (Number(new Date()) - startT < 550 && Math.abs(updateDx) > 50 || Math.abs(updateDx) > cwidth/2)) {
                  slider.flexAnimate(target, slider.vars.pauseOnAction);
                } else {
                  if (!fade) slider.flexAnimate(slider.currentSlide, slider.vars.pauseOnAction, true);
                }
              }
              el.removeEventListener('touchend', onTouchEnd, false);

              startX = null;
              startY = null;
              dx = null;
              offset = null;
            }
        }else{
            el.style.msTouchAction = "none";
            el._gesture = new MSGesture();
            el._gesture.target = el;
            el.addEventListener("MSPointerDown", onMSPointerDown, false);
            el._slider = slider;
            el.addEventListener("MSGestureChange", onMSGestureChange, false);
            el.addEventListener("MSGestureEnd", onMSGestureEnd, false);

            function onMSPointerDown(e){
                e.stopPropagation();
                if (slider.animating) {
                    e.preventDefault();
                }else{
                    slider.pause();
                    el._gesture.addPointer(e.pointerId);
                    accDx = 0;
                    cwidth = (vertical) ? slider.h : slider. w;
                    startT = Number(new Date());
                    // CAROUSEL:

                    offset = (carousel && reverse && slider.animatingTo === slider.last) ? 0 :
                        (carousel && reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) :
                            (carousel && slider.currentSlide === slider.last) ? slider.limit :
                                (carousel) ? ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.currentSlide :
                                    (reverse) ? (slider.last - slider.currentSlide + slider.cloneOffset) * cwidth : (slider.currentSlide + slider.cloneOffset) * cwidth;
                }
            }

            function onMSGestureChange(e) {
                e.stopPropagation();
                var slider = e.target._slider;
                if(!slider){
                    return;
                }
                var transX = -e.translationX,
                    transY = -e.translationY;

                //Accumulate translations.
                accDx = accDx + ((vertical) ? transY : transX);
                dx = accDx;
                scrolling = (vertical) ? (Math.abs(accDx) < Math.abs(-transX)) : (Math.abs(accDx) < Math.abs(-transY));

                if(e.detail === e.MSGESTURE_FLAG_INERTIA){
                    setImmediate(function (){
                        el._gesture.stop();
                    });

                    return;
                }

                if (!scrolling || Number(new Date()) - startT > 500) {
                    e.preventDefault();
                    if (!fade && slider.transitions) {
                        if (!slider.vars.animationLoop) {
                            dx = accDx / ((slider.currentSlide === 0 && accDx < 0 || slider.currentSlide === slider.last && accDx > 0) ? (Math.abs(accDx) / cwidth + 2) : 1);
                        }
                        slider.setProps(offset + dx, "setTouch");
                    }
                }
            }

            function onMSGestureEnd(e) {
                e.stopPropagation();
                var slider = e.target._slider;
                if(!slider){
                    return;
                }
                if (slider.animatingTo === slider.currentSlide && !scrolling && !(dx === null)) {
                    var updateDx = (reverse) ? -dx : dx,
                        target = (updateDx > 0) ? slider.getTarget('next') : slider.getTarget('prev');

                    if (slider.canAdvance(target) && (Number(new Date()) - startT < 550 && Math.abs(updateDx) > 50 || Math.abs(updateDx) > cwidth/2)) {
                        slider.flexAnimate(target, slider.vars.pauseOnAction);
                    } else {
                        if (!fade) slider.flexAnimate(slider.currentSlide, slider.vars.pauseOnAction, true);
                    }
                }

                startX = null;
                startY = null;
                dx = null;
                offset = null;
                accDx = 0;
            }
        }
      },
      resize: function() {
        if (!slider.animating && slider.is(':visible')) {
          if (!carousel) slider.doMath();

          if (fade) {
            // SMOOTH HEIGHT:
            methods.smoothHeight();
          } else if (carousel) { //CAROUSEL:
            slider.slides.width(slider.computedW);
            slider.update(slider.pagingCount);
            slider.setProps();
          }
          else if (vertical) { //VERTICAL:
            slider.viewport.height(slider.h);
            slider.setProps(slider.h, "setTotal");
          } else {
            // SMOOTH HEIGHT:
            if (slider.vars.smoothHeight) methods.smoothHeight();
            slider.newSlides.width(slider.computedW);
            slider.setProps(slider.computedW, "setTotal");
          }
        }
      },
      smoothHeight: function(dur) {
        if (!vertical || fade) {
          var $obj = (fade) ? slider : slider.viewport;
          (dur) ? $obj.animate({"height": slider.slides.eq(slider.animatingTo).height()}, dur) : $obj.height(slider.slides.eq(slider.animatingTo).height());
        }
      },
      sync: function(action) {
        var $obj = $(slider.vars.sync).data("flexslider"),
            target = slider.animatingTo;

        switch (action) {
          case "animate": $obj.flexAnimate(target, slider.vars.pauseOnAction, false, true); break;
          case "play": if (!$obj.playing && !$obj.asNav) { $obj.play(); } break;
          case "pause": $obj.pause(); break;
        }
      },
      pauseInvisible: {
        visProp: null,
        init: function() {
          var prefixes = ['webkit','moz','ms','o'];

          if ('hidden' in document) return 'hidden';
          for (var i = 0; i < prefixes.length; i++) {
            if ((prefixes[i] + 'Hidden') in document) 
            methods.pauseInvisible.visProp = prefixes[i] + 'Hidden';
          }
          if (methods.pauseInvisible.visProp) {
            var evtname = methods.pauseInvisible.visProp.replace(/[H|h]idden/,'') + 'visibilitychange';
            document.addEventListener(evtname, function() {
              if (methods.pauseInvisible.isHidden()) {
                if(slider.startTimeout) clearTimeout(slider.startTimeout); //If clock is ticking, stop timer and prevent from starting while invisible
                else slider.pause(); //Or just pause
              }
              else {
                if(slider.started) slider.play(); //Initiated before, just play
                else (slider.vars.initDelay > 0) ? setTimeout(slider.play, slider.vars.initDelay) : slider.play(); //Didn't init before: simply init or wait for it
              }
            });
          }       
        },
        isHidden: function() {
          return document[methods.pauseInvisible.visProp] || false;
        }
      },
      setToClearWatchedEvent: function() {
        clearTimeout(watchedEventClearTimer);
        watchedEventClearTimer = setTimeout(function() {
          watchedEvent = "";
        }, 3000);
      }
    }

    // public methods
    slider.flexAnimate = function(target, pause, override, withSync, fromNav) {
      if (!slider.vars.animationLoop && target !== slider.currentSlide) {
        slider.direction = (target > slider.currentSlide) ? "next" : "prev";
      }

      if (asNav && slider.pagingCount === 1) slider.direction = (slider.currentItem < target) ? "next" : "prev";

      if (!slider.animating && (slider.canAdvance(target, fromNav) || override) && slider.is(":visible")) {
        if (asNav && withSync) {
          var master = $(slider.vars.asNavFor).data('flexslider');
          slider.atEnd = target === 0 || target === slider.count - 1;
          master.flexAnimate(target, true, false, true, fromNav);
          slider.direction = (slider.currentItem < target) ? "next" : "prev";
          master.direction = slider.direction;

          if (Math.ceil((target + 1)/slider.visible) - 1 !== slider.currentSlide && target !== 0) {
            slider.currentItem = target;
            slider.slides.removeClass(namespace + "active-slide").eq(target).addClass(namespace + "active-slide");
            target = Math.floor(target/slider.visible);
          } else {
            slider.currentItem = target;
            slider.slides.removeClass(namespace + "active-slide").eq(target).addClass(namespace + "active-slide");
            return false;
          }
        }

        slider.animating = true;
        slider.animatingTo = target;

        // SLIDESHOW:
        if (pause) slider.pause();

        // API: before() animation Callback
        slider.vars.before(slider);

        // SYNC:
        if (slider.syncExists && !fromNav) methods.sync("animate");

        // CONTROLNAV
        if (slider.vars.controlNav) methods.controlNav.active();

        // !CAROUSEL:
        // CANDIDATE: slide active class (for add/remove slide)
        if (!carousel) slider.slides.removeClass(namespace + 'active-slide').eq(target).addClass(namespace + 'active-slide');

        // INFINITE LOOP:
        // CANDIDATE: atEnd
        slider.atEnd = target === 0 || target === slider.last;

        // DIRECTIONNAV:
        if (slider.vars.directionNav) methods.directionNav.update();

        if (target === slider.last) {
          // API: end() of cycle Callback
          slider.vars.end(slider);
          // SLIDESHOW && !INFINITE LOOP:
          if (!slider.vars.animationLoop) slider.pause();
        }

        // SLIDE:
        if (!fade) {
          var dimension = (vertical) ? slider.slides.filter(':first').height() : slider.computedW,
              margin, slideString, calcNext;

          // INFINITE LOOP / REVERSE:
          if (carousel) {
            //margin = (slider.vars.itemWidth > slider.w) ? slider.vars.itemMargin * 2 : slider.vars.itemMargin;
            margin = slider.vars.itemMargin;
            calcNext = ((slider.itemW + margin) * slider.move) * slider.animatingTo;
            slideString = (calcNext > slider.limit && slider.visible !== 1) ? slider.limit : calcNext;
          } else if (slider.currentSlide === 0 && target === slider.count - 1 && slider.vars.animationLoop && slider.direction !== "next") {
            slideString = (reverse) ? (slider.count + slider.cloneOffset) * dimension : 0;
          } else if (slider.currentSlide === slider.last && target === 0 && slider.vars.animationLoop && slider.direction !== "prev") {
            slideString = (reverse) ? 0 : (slider.count + 1) * dimension;
          } else {
            slideString = (reverse) ? ((slider.count - 1) - target + slider.cloneOffset) * dimension : (target + slider.cloneOffset) * dimension;
          }
          slider.setProps(slideString, "", slider.vars.animationSpeed);
          if (slider.transitions) {
            if (!slider.vars.animationLoop || !slider.atEnd) {
              slider.animating = false;
              slider.currentSlide = slider.animatingTo;
            }
            slider.container.unbind("webkitTransitionEnd transitionend");
            slider.container.bind("webkitTransitionEnd transitionend", function() {
              slider.wrapup(dimension);
            });
          } else {
            slider.container.animate(slider.args, slider.vars.animationSpeed, slider.vars.easing, function(){
              slider.wrapup(dimension);
            });
          }
        } else { // FADE:
          if (!touch) {
            //slider.slides.eq(slider.currentSlide).fadeOut(slider.vars.animationSpeed, slider.vars.easing);
            //slider.slides.eq(target).fadeIn(slider.vars.animationSpeed, slider.vars.easing, slider.wrapup);

            slider.slides.eq(slider.currentSlide).css({"zIndex": 1}).animate({"opacity": 0}, slider.vars.animationSpeed, slider.vars.easing);
            slider.slides.eq(target).css({"zIndex": 2}).animate({"opacity": 1}, slider.vars.animationSpeed, slider.vars.easing, slider.wrapup);

          } else {
            slider.slides.eq(slider.currentSlide).css({ "opacity": 0, "zIndex": 1 });
            slider.slides.eq(target).css({ "opacity": 1, "zIndex": 2 });
            slider.wrapup(dimension);
          }
        }
        // SMOOTH HEIGHT:
        if (slider.vars.smoothHeight) methods.smoothHeight(slider.vars.animationSpeed);
      }
    }
    slider.wrapup = function(dimension) {
      // SLIDE:
      if (!fade && !carousel) {
        if (slider.currentSlide === 0 && slider.animatingTo === slider.last && slider.vars.animationLoop) {
          slider.setProps(dimension, "jumpEnd");
        } else if (slider.currentSlide === slider.last && slider.animatingTo === 0 && slider.vars.animationLoop) {
          slider.setProps(dimension, "jumpStart");
        }
      }
      slider.animating = false;
      slider.currentSlide = slider.animatingTo;
      // API: after() animation Callback
      slider.vars.after(slider);
    }

    // SLIDESHOW:
    slider.animateSlides = function() {
      if (!slider.animating && focused ) slider.flexAnimate(slider.getTarget("next"));
    }
    // SLIDESHOW:
    slider.pause = function() {
      clearInterval(slider.animatedSlides);
      slider.animatedSlides = null;
      slider.playing = false;
      // PAUSEPLAY:
      if (slider.vars.pausePlay) methods.pausePlay.update("play");
      // SYNC:
      if (slider.syncExists) methods.sync("pause");
    }
    // SLIDESHOW:
    slider.play = function() {
      if (slider.playing) clearInterval(slider.animatedSlides);
      slider.animatedSlides = slider.animatedSlides || setInterval(slider.animateSlides, slider.vars.slideshowSpeed);
      slider.started = slider.playing = true;
      // PAUSEPLAY:
      if (slider.vars.pausePlay) methods.pausePlay.update("pause");
      // SYNC:
      if (slider.syncExists) methods.sync("play");
    }
    // STOP:
    slider.stop = function () {
      slider.pause();
      slider.stopped = true;
    }
    slider.canAdvance = function(target, fromNav) {
      // ASNAV:
      var last = (asNav) ? slider.pagingCount - 1 : slider.last;
      return (fromNav) ? true :
             (asNav && slider.currentItem === slider.count - 1 && target === 0 && slider.direction === "prev") ? true :
             (asNav && slider.currentItem === 0 && target === slider.pagingCount - 1 && slider.direction !== "next") ? false :
             (target === slider.currentSlide && !asNav) ? false :
             (slider.vars.animationLoop) ? true :
             (slider.atEnd && slider.currentSlide === 0 && target === last && slider.direction !== "next") ? false :
             (slider.atEnd && slider.currentSlide === last && target === 0 && slider.direction === "next") ? false :
             true;
    }
    slider.getTarget = function(dir) {
      slider.direction = dir;
      if (dir === "next") {
        return (slider.currentSlide === slider.last) ? 0 : slider.currentSlide + 1;
      } else {
        return (slider.currentSlide === 0) ? slider.last : slider.currentSlide - 1;
      }
    }

    // SLIDE:
    slider.setProps = function(pos, special, dur) {
      var target = (function() {
        var posCheck = (pos) ? pos : ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo,
            posCalc = (function() {
              if (carousel) {
                return (special === "setTouch") ? pos :
                       (reverse && slider.animatingTo === slider.last) ? 0 :
                       (reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) :
                       (slider.animatingTo === slider.last) ? slider.limit : posCheck;
              } else {
                switch (special) {
                  case "setTotal": return (reverse) ? ((slider.count - 1) - slider.currentSlide + slider.cloneOffset) * pos : (slider.currentSlide + slider.cloneOffset) * pos;
                  case "setTouch": return (reverse) ? pos : pos;
                  case "jumpEnd": return (reverse) ? pos : slider.count * pos;
                  case "jumpStart": return (reverse) ? slider.count * pos : pos;
                  default: return pos;
                }
              }
            }());

            return (posCalc * -1) + "px";
          }());

      if (slider.transitions) {
        target = (vertical) ? "translate3d(0," + target + ",0)" : "translate3d(" + target + ",0,0)";
        dur = (dur !== undefined) ? (dur/1000) + "s" : "0s";
        slider.container.css("-" + slider.pfx + "-transition-duration", dur);
      }

      slider.args[slider.prop] = target;
      if (slider.transitions || dur === undefined) slider.container.css(slider.args);
    }

    slider.setup = function(type) {
      // SLIDE:
      if (!fade) {
        var sliderOffset, arr;

        if (type === "init") {
          slider.viewport = $('<div class="' + namespace + 'viewport"></div>').css({"overflow": "hidden", "position": "relative"}).appendTo(slider).append(slider.container);
          // INFINITE LOOP:
          slider.cloneCount = 0;
          slider.cloneOffset = 0;
          // REVERSE:
          if (reverse) {
            arr = $.makeArray(slider.slides).reverse();
            slider.slides = $(arr);
            slider.container.empty().append(slider.slides);
          }
        }
        // INFINITE LOOP && !CAROUSEL:
        if (slider.vars.animationLoop && !carousel) {
          slider.cloneCount = 2;
          slider.cloneOffset = 1;
          // clear out old clones
          if (type !== "init") slider.container.find('.clone').remove();
          slider.container.append(slider.slides.first().clone().addClass('clone').attr('aria-hidden', 'true')).prepend(slider.slides.last().clone().addClass('clone').attr('aria-hidden', 'true'));
        }
        slider.newSlides = $(slider.vars.selector, slider);

        sliderOffset = (reverse) ? slider.count - 1 - slider.currentSlide + slider.cloneOffset : slider.currentSlide + slider.cloneOffset;
        // VERTICAL:
        if (vertical && !carousel) {
          slider.container.height((slider.count + slider.cloneCount) * 200 + "%").css("position", "absolute").width("100%");
          setTimeout(function(){
            slider.newSlides.css({"display": "block"});
            slider.doMath();
            slider.viewport.height(slider.h);
            slider.setProps(sliderOffset * slider.h, "init");
          }, (type === "init") ? 100 : 0);
        } else {
          slider.container.width((slider.count + slider.cloneCount) * 200 + "%");
          slider.setProps(sliderOffset * slider.computedW, "init");
          setTimeout(function(){
            slider.doMath();
            slider.newSlides.css({"width": slider.computedW, "float": "left", "display": "block"});
            // SMOOTH HEIGHT:
            if (slider.vars.smoothHeight) methods.smoothHeight();
          }, (type === "init") ? 100 : 0);
        }
      } else { // FADE:
        slider.slides.css({"width": "100%", "float": "left", "marginRight": "-100%", "position": "relative"});
        if (type === "init") {
          if (!touch) {
            //slider.slides.eq(slider.currentSlide).fadeIn(slider.vars.animationSpeed, slider.vars.easing);
            slider.slides.css({ "opacity": 0, "display": "block", "zIndex": 1 }).eq(slider.currentSlide).css({"zIndex": 2}).animate({"opacity": 1},slider.vars.animationSpeed,slider.vars.easing);
          } else {
            slider.slides.css({ "opacity": 0, "display": "block", "webkitTransition": "opacity " + slider.vars.animationSpeed / 1000 + "s ease", "zIndex": 1 }).eq(slider.currentSlide).css({ "opacity": 1, "zIndex": 2});
          }
        }
        // SMOOTH HEIGHT:
        if (slider.vars.smoothHeight) methods.smoothHeight();
      }
      // !CAROUSEL:
      // CANDIDATE: active slide
      if (!carousel) slider.slides.removeClass(namespace + "active-slide").eq(slider.currentSlide).addClass(namespace + "active-slide");
    }


    slider.doMath = function() {
      var slide = slider.slides.first(),
          slideMargin = slider.vars.itemMargin,
          minItems = slider.vars.minItems,
          maxItems = slider.vars.maxItems;

      slider.w = (slider.viewport===undefined) ? slider.width() : slider.viewport.width();
      slider.h = slide.height();
      slider.boxPadding = slide.outerWidth() - slide.width();

      // CAROUSEL:
      if (carousel) {
        slider.itemT = slider.vars.itemWidth + slideMargin;
        slider.minW = (minItems) ? minItems * slider.itemT : slider.w;
        slider.maxW = (maxItems) ? (maxItems * slider.itemT) - slideMargin : slider.w;
        slider.itemW = (slider.minW > slider.w) ? (slider.w - (slideMargin * (minItems - 1)))/minItems :
                       (slider.maxW < slider.w) ? (slider.w - (slideMargin * (maxItems - 1)))/maxItems :
                       (slider.vars.itemWidth > slider.w) ? slider.w : slider.vars.itemWidth;

        slider.visible = Math.floor(slider.w/(slider.itemW));
        slider.move = (slider.vars.move > 0 && slider.vars.move < slider.visible ) ? slider.vars.move : slider.visible;
        slider.pagingCount = Math.ceil(((slider.count - slider.visible)/slider.move) + 1);
        slider.last =  slider.pagingCount - 1;
        slider.limit = (slider.pagingCount === 1) ? 0 :
                       (slider.vars.itemWidth > slider.w) ? (slider.itemW * (slider.count - 1)) + (slideMargin * (slider.count - 1)) : ((slider.itemW + slideMargin) * slider.count) - slider.w - slideMargin;
      } else {
        slider.itemW = slider.w;
        slider.pagingCount = slider.count;
        slider.last = slider.count - 1;
      }
      slider.computedW = slider.itemW - slider.boxPadding;
    //  Utils.MsgBox(slider.computedW);
    }


    slider.update = function(pos, action) {
      slider.doMath();

      // update currentSlide and slider.animatingTo if necessary
      if (!carousel) {
        if (pos < slider.currentSlide) {
          slider.currentSlide += 1;
        } else if (pos <= slider.currentSlide && pos !== 0) {
          slider.currentSlide -= 1;
        }
        slider.animatingTo = slider.currentSlide;
      }

      // update controlNav
      if (slider.vars.controlNav && !slider.manualControls) {
        if ((action === "add" && !carousel) || slider.pagingCount > slider.controlNav.length) {
          methods.controlNav.update("add");
        } else if ((action === "remove" && !carousel) || slider.pagingCount < slider.controlNav.length) {
          if (carousel && slider.currentSlide > slider.last) {
            slider.currentSlide -= 1;
            slider.animatingTo -= 1;
          }
          methods.controlNav.update("remove", slider.last);
        }
      }
      // update directionNav
      if (slider.vars.directionNav) methods.directionNav.update();

    }

    slider.addSlide = function(obj, pos) {
      var $obj = $(obj);

      slider.count += 1;
      slider.last = slider.count - 1;

      // append new slide
      if (vertical && reverse) {
        (pos !== undefined) ? slider.slides.eq(slider.count - pos).after($obj) : slider.container.prepend($obj);
      } else {
        (pos !== undefined) ? slider.slides.eq(pos).before($obj) : slider.container.append($obj);
      }

      // update currentSlide, animatingTo, controlNav, and directionNav
      slider.update(pos, "add");

      // update slider.slides
      slider.slides = $(slider.vars.selector + ':not(.clone)', slider);
      // re-setup the slider to accomdate new slide
      slider.setup();

      //FlexSlider: added() Callback
      slider.vars.added(slider);
    }
    slider.removeSlide = function(obj) {
      var pos = (isNaN(obj)) ? slider.slides.index($(obj)) : obj;

      // update count
      slider.count -= 1;
      slider.last = slider.count - 1;

      // remove slide
      if (isNaN(obj)) {
        $(obj, slider.slides).remove();
      } else {
        (vertical && reverse) ? slider.slides.eq(slider.last).remove() : slider.slides.eq(obj).remove();
      }

      // update currentSlide, animatingTo, controlNav, and directionNav
      slider.doMath();
      slider.update(pos, "remove");

      // update slider.slides
      slider.slides = $(slider.vars.selector + ':not(.clone)', slider);
      // re-setup the slider to accomdate new slide
      slider.setup();

      // FlexSlider: removed() Callback
      slider.vars.removed(slider);
    }

    //FlexSlider: Initialize
    methods.init();
  }

  // Ensure the slider isn't focussed if the window loses focus.
  $( window ).blur( function ( e ) {
    focused = false;
  }).focus( function ( e ) {
    focused = true;
  });

  //FlexSlider: Default Settings
  $.flexslider.defaults = {
    namespace: "flex-",             //{NEW} String: Prefix string attached to the class of every element generated by the plugin
    selector: ".slides > li",       //{NEW} Selector: Must match a simple pattern. '{container} > {slide}' -- Ignore pattern at your own peril
    animation: "fade",              //String: Select your animation type, "fade" or "slide"
    easing: "swing",                //{NEW} String: Determines the easing method used in jQuery transitions. jQuery easing plugin is supported!
    direction: "horizontal",        //String: Select the sliding direction, "horizontal" or "vertical"
    reverse: false,                 //{NEW} Boolean: Reverse the animation direction
    animationLoop: true,            //Boolean: Should the animation loop? If false, directionNav will received "disable" classes at either end
    smoothHeight: false,            //{NEW} Boolean: Allow height of the slider to animate smoothly in horizontal mode
    startAt: 0,                     //Integer: The slide that the slider should start on. Array notation (0 = first slide)
    slideshow: true,                //Boolean: Animate slider automatically
    slideshowSpeed: 7000,           //Integer: Set the speed of the slideshow cycling, in milliseconds
    animationSpeed: 600,            //Integer: Set the speed of animations, in milliseconds
    initDelay: 0,                   //{NEW} Integer: Set an initialization delay, in milliseconds
    randomize: false,               //Boolean: Randomize slide order
    thumbCaptions: false,           //Boolean: Whether or not to put captions on thumbnails when using the "thumbnails" controlNav.

    // Usability features
    pauseOnAction: true,            //Boolean: Pause the slideshow when interacting with control elements, highly recommended.
    pauseOnHover: false,            //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
    pauseInvisible: true,   		//{NEW} Boolean: Pause the slideshow when tab is invisible, resume when visible. Provides better UX, lower CPU usage.
    useCSS: true,                   //{NEW} Boolean: Slider will use CSS3 transitions if available
    touch: true,                    //{NEW} Boolean: Allow touch swipe navigation of the slider on touch-enabled devices
    video: false,                   //{NEW} Boolean: If using video in the slider, will prevent CSS3 3D Transforms to avoid graphical glitches

    // Primary Controls
    controlNav: true,               //Boolean: Create navigation for paging control of each clide? Note: Leave true for manualControls usage
    directionNav: true,             //Boolean: Create navigation for previous/next navigation? (true/false)
    prevText: "Previous",           //String: Set the text for the "previous" directionNav item
    nextText: "Next",               //String: Set the text for the "next" directionNav item

    // Secondary Navigation
    keyboard: true,                 //Boolean: Allow slider navigating via keyboard left/right keys
    multipleKeyboard: false,        //{NEW} Boolean: Allow keyboard navigation to affect multiple sliders. Default behavior cuts out keyboard navigation with more than one slider present.
    mousewheel: false,              //{UPDATED} Boolean: Requires jquery.mousewheel.js (https://github.com/brandonaaron/jquery-mousewheel) - Allows slider navigating via mousewheel
    pausePlay: false,               //Boolean: Create pause/play dynamic element
    pauseText: "Pause",             //String: Set the text for the "pause" pausePlay item
    playText: "Play",               //String: Set the text for the "play" pausePlay item

    // Special properties
    controlsContainer: "",          //{UPDATED} jQuery Object/Selector: Declare which container the navigation elements should be appended too. Default container is the FlexSlider element. Example use would be $(".flexslider-container"). Property is ignored if given element is not found.
    manualControls: "",             //{UPDATED} jQuery Object/Selector: Declare custom control navigation. Examples would be $(".flex-control-nav li") or "#tabs-nav li img", etc. The number of elements in your controlNav should match the number of slides/tabs.
    sync: "",                       //{NEW} Selector: Mirror the actions performed on this slider with another slider. Use with care.
    asNavFor: "",                   //{NEW} Selector: Internal property exposed for turning the slider into a thumbnail navigation for another slider

    // Carousel Options
    itemWidth: 0,                   //{NEW} Integer: Box-model width of individual carousel items, including horizontal borders and padding.
    itemMargin: 0,                  //{NEW} Integer: Margin between carousel items.
    minItems: 1,                    //{NEW} Integer: Minimum number of carousel items that should be visible. Items will resize fluidly when below this.
    maxItems: 0,                    //{NEW} Integer: Maxmimum number of carousel items that should be visible. Items will resize fluidly when above this limit.
    move: 0,                        //{NEW} Integer: Number of carousel items that should move on animation. If 0, slider will move all visible items.
    allowOneSlide: true,           //{NEW} Boolean: Whether or not to allow a slider comprised of a single slide

    // Callback API
    start: function(){},            //Callback: function(slider) - Fires when the slider loads the first slide
    before: function(){},           //Callback: function(slider) - Fires asynchronously with each slider animation
    after: function(){},            //Callback: function(slider) - Fires after each slider animation completes
    end: function(){},              //Callback: function(slider) - Fires when the slider reaches the last slide (asynchronous)
    added: function(){},            //{NEW} Callback: function(slider) - Fires after a slide is added
    removed: function(){}           //{NEW} Callback: function(slider) - Fires after a slide is removed
  }


  //FlexSlider: Plugin Function
  $.fn.flexslider = function(options) {
    if (options === undefined) options = {};

    if (typeof options === "object") {
      return this.each(function() {
        var $this = $(this),
            selector = (options.selector) ? options.selector : ".slides > li",
            $slides = $this.find(selector);

      if ( ( $slides.length === 1 && options.allowOneSlide === true ) || $slides.length === 0 ) {
          $slides.fadeIn(400);
          if (options.start) options.start($this);
        } else if ($this.data('flexslider') === undefined) {
          new $.flexslider(this, options);
        }
      });
    } else {
      // Helper strings to quickly perform functions on the slider
      var $slider = $(this).data('flexslider');
      switch (options) {
        case "play": $slider.play(); break;
        case "pause": $slider.pause(); break;
        case "stop": $slider.stop(); break;
        case "next": $slider.flexAnimate($slider.getTarget("next"), true); break;
        case "prev":
        case "previous": $slider.flexAnimate($slider.getTarget("prev"), true); break;
        default: if (typeof options === "number") $slider.flexAnimate(options, true);
      }
    }
  }
})(jQuery);

;/**
 * SyntaxHighlighter
 * http://alexgorbatchev.com/SyntaxHighlighter
 *
 * SyntaxHighlighter is donationware. If you are using it, please donate.
 * http://alexgorbatchev.com/SyntaxHighlighter/donate.html
 *
 * @version
 * 3.0.83 (July 02 2010)
 * 
 * @copyright
 * Copyright (C) 2004-2010 Alex Gorbatchev.
 *
 * @license
 * Dual licensed under the MIT and GPL licenses.
 */
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('K M;I(M)1S 2U("2a\'t 4k M 4K 2g 3l 4G 4H");(6(){6 r(f,e){I(!M.1R(f))1S 3m("3s 15 4R");K a=f.1w;f=M(f.1m,t(f)+(e||""));I(a)f.1w={1m:a.1m,19:a.19?a.19.1a(0):N};H f}6 t(f){H(f.1J?"g":"")+(f.4s?"i":"")+(f.4p?"m":"")+(f.4v?"x":"")+(f.3n?"y":"")}6 B(f,e,a,b){K c=u.L,d,h,g;v=R;5K{O(;c--;){g=u[c];I(a&g.3r&&(!g.2p||g.2p.W(b))){g.2q.12=e;I((h=g.2q.X(f))&&h.P===e){d={3k:g.2b.W(b,h,a),1C:h};1N}}}}5v(i){1S i}5q{v=11}H d}6 p(f,e,a){I(3b.Z.1i)H f.1i(e,a);O(a=a||0;a<f.L;a++)I(f[a]===e)H a;H-1}M=6(f,e){K a=[],b=M.1B,c=0,d,h;I(M.1R(f)){I(e!==1d)1S 3m("2a\'t 5r 5I 5F 5B 5C 15 5E 5p");H r(f)}I(v)1S 2U("2a\'t W 3l M 59 5m 5g 5x 5i");e=e||"";O(d={2N:11,19:[],2K:6(g){H e.1i(g)>-1},3d:6(g){e+=g}};c<f.L;)I(h=B(f,c,b,d)){a.U(h.3k);c+=h.1C[0].L||1}Y I(h=n.X.W(z[b],f.1a(c))){a.U(h[0]);c+=h[0].L}Y{h=f.3a(c);I(h==="[")b=M.2I;Y I(h==="]")b=M.1B;a.U(h);c++}a=15(a.1K(""),n.Q.W(e,w,""));a.1w={1m:f,19:d.2N?d.19:N};H a};M.3v="1.5.0";M.2I=1;M.1B=2;K C=/\\$(?:(\\d\\d?|[$&`\'])|{([$\\w]+)})/g,w=/[^5h]+|([\\s\\S])(?=[\\s\\S]*\\1)/g,A=/^(?:[?*+]|{\\d+(?:,\\d*)?})\\??/,v=11,u=[],n={X:15.Z.X,1A:15.Z.1A,1C:1r.Z.1C,Q:1r.Z.Q,1e:1r.Z.1e},x=n.X.W(/()??/,"")[1]===1d,D=6(){K f=/^/g;n.1A.W(f,"");H!f.12}(),y=6(){K f=/x/g;n.Q.W("x",f,"");H!f.12}(),E=15.Z.3n!==1d,z={};z[M.2I]=/^(?:\\\\(?:[0-3][0-7]{0,2}|[4-7][0-7]?|x[\\29-26-f]{2}|u[\\29-26-f]{4}|c[A-3o-z]|[\\s\\S]))/;z[M.1B]=/^(?:\\\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9]\\d*|x[\\29-26-f]{2}|u[\\29-26-f]{4}|c[A-3o-z]|[\\s\\S])|\\(\\?[:=!]|[?*+]\\?|{\\d+(?:,\\d*)?}\\??)/;M.1h=6(f,e,a,b){u.U({2q:r(f,"g"+(E?"y":"")),2b:e,3r:a||M.1B,2p:b||N})};M.2n=6(f,e){K a=f+"/"+(e||"");H M.2n[a]||(M.2n[a]=M(f,e))};M.3c=6(f){H r(f,"g")};M.5l=6(f){H f.Q(/[-[\\]{}()*+?.,\\\\^$|#\\s]/g,"\\\\$&")};M.5e=6(f,e,a,b){e=r(e,"g"+(b&&E?"y":""));e.12=a=a||0;f=e.X(f);H b?f&&f.P===a?f:N:f};M.3q=6(){M.1h=6(){1S 2U("2a\'t 55 1h 54 3q")}};M.1R=6(f){H 53.Z.1q.W(f)==="[2m 15]"};M.3p=6(f,e,a,b){O(K c=r(e,"g"),d=-1,h;h=c.X(f);){a.W(b,h,++d,f,c);c.12===h.P&&c.12++}I(e.1J)e.12=0};M.57=6(f,e){H 6 a(b,c){K d=e[c].1I?e[c]:{1I:e[c]},h=r(d.1I,"g"),g=[],i;O(i=0;i<b.L;i++)M.3p(b[i],h,6(k){g.U(d.3j?k[d.3j]||"":k[0])});H c===e.L-1||!g.L?g:a(g,c+1)}([f],0)};15.Z.1p=6(f,e){H J.X(e[0])};15.Z.W=6(f,e){H J.X(e)};15.Z.X=6(f){K e=n.X.1p(J,14),a;I(e){I(!x&&e.L>1&&p(e,"")>-1){a=15(J.1m,n.Q.W(t(J),"g",""));n.Q.W(f.1a(e.P),a,6(){O(K c=1;c<14.L-2;c++)I(14[c]===1d)e[c]=1d})}I(J.1w&&J.1w.19)O(K b=1;b<e.L;b++)I(a=J.1w.19[b-1])e[a]=e[b];!D&&J.1J&&!e[0].L&&J.12>e.P&&J.12--}H e};I(!D)15.Z.1A=6(f){(f=n.X.W(J,f))&&J.1J&&!f[0].L&&J.12>f.P&&J.12--;H!!f};1r.Z.1C=6(f){M.1R(f)||(f=15(f));I(f.1J){K e=n.1C.1p(J,14);f.12=0;H e}H f.X(J)};1r.Z.Q=6(f,e){K a=M.1R(f),b,c;I(a&&1j e.58()==="3f"&&e.1i("${")===-1&&y)H n.Q.1p(J,14);I(a){I(f.1w)b=f.1w.19}Y f+="";I(1j e==="6")c=n.Q.W(J,f,6(){I(b){14[0]=1f 1r(14[0]);O(K d=0;d<b.L;d++)I(b[d])14[0][b[d]]=14[d+1]}I(a&&f.1J)f.12=14[14.L-2]+14[0].L;H e.1p(N,14)});Y{c=J+"";c=n.Q.W(c,f,6(){K d=14;H n.Q.W(e,C,6(h,g,i){I(g)5b(g){24"$":H"$";24"&":H d[0];24"`":H d[d.L-1].1a(0,d[d.L-2]);24"\'":H d[d.L-1].1a(d[d.L-2]+d[0].L);5a:i="";g=+g;I(!g)H h;O(;g>d.L-3;){i=1r.Z.1a.W(g,-1)+i;g=1Q.3i(g/10)}H(g?d[g]||"":"$")+i}Y{g=+i;I(g<=d.L-3)H d[g];g=b?p(b,i):-1;H g>-1?d[g+1]:h}})})}I(a&&f.1J)f.12=0;H c};1r.Z.1e=6(f,e){I(!M.1R(f))H n.1e.1p(J,14);K a=J+"",b=[],c=0,d,h;I(e===1d||+e<0)e=5D;Y{e=1Q.3i(+e);I(!e)H[]}O(f=M.3c(f);d=f.X(a);){I(f.12>c){b.U(a.1a(c,d.P));d.L>1&&d.P<a.L&&3b.Z.U.1p(b,d.1a(1));h=d[0].L;c=f.12;I(b.L>=e)1N}f.12===d.P&&f.12++}I(c===a.L){I(!n.1A.W(f,"")||h)b.U("")}Y b.U(a.1a(c));H b.L>e?b.1a(0,e):b};M.1h(/\\(\\?#[^)]*\\)/,6(f){H n.1A.W(A,f.2S.1a(f.P+f[0].L))?"":"(?:)"});M.1h(/\\((?!\\?)/,6(){J.19.U(N);H"("});M.1h(/\\(\\?<([$\\w]+)>/,6(f){J.19.U(f[1]);J.2N=R;H"("});M.1h(/\\\\k<([\\w$]+)>/,6(f){K e=p(J.19,f[1]);H e>-1?"\\\\"+(e+1)+(3R(f.2S.3a(f.P+f[0].L))?"":"(?:)"):f[0]});M.1h(/\\[\\^?]/,6(f){H f[0]==="[]"?"\\\\b\\\\B":"[\\\\s\\\\S]"});M.1h(/^\\(\\?([5A]+)\\)/,6(f){J.3d(f[1]);H""});M.1h(/(?:\\s+|#.*)+/,6(f){H n.1A.W(A,f.2S.1a(f.P+f[0].L))?"":"(?:)"},M.1B,6(){H J.2K("x")});M.1h(/\\./,6(){H"[\\\\s\\\\S]"},M.1B,6(){H J.2K("s")})})();1j 2e!="1d"&&(2e.M=M);K 1v=6(){6 r(a,b){a.1l.1i(b)!=-1||(a.1l+=" "+b)}6 t(a){H a.1i("3e")==0?a:"3e"+a}6 B(a){H e.1Y.2A[t(a)]}6 p(a,b,c){I(a==N)H N;K d=c!=R?a.3G:[a.2G],h={"#":"1c",".":"1l"}[b.1o(0,1)]||"3h",g,i;g=h!="3h"?b.1o(1):b.5u();I((a[h]||"").1i(g)!=-1)H a;O(a=0;d&&a<d.L&&i==N;a++)i=p(d[a],b,c);H i}6 C(a,b){K c={},d;O(d 2g a)c[d]=a[d];O(d 2g b)c[d]=b[d];H c}6 w(a,b,c,d){6 h(g){g=g||1P.5y;I(!g.1F){g.1F=g.52;g.3N=6(){J.5w=11}}c.W(d||1P,g)}a.3g?a.3g("4U"+b,h):a.4y(b,h,11)}6 A(a,b){K c=e.1Y.2j,d=N;I(c==N){c={};O(K h 2g e.1U){K g=e.1U[h];d=g.4x;I(d!=N){g.1V=h.4w();O(g=0;g<d.L;g++)c[d[g]]=h}}e.1Y.2j=c}d=e.1U[c[a]];d==N&&b!=11&&1P.1X(e.13.1x.1X+(e.13.1x.3E+a));H d}6 v(a,b){O(K c=a.1e("\\n"),d=0;d<c.L;d++)c[d]=b(c[d],d);H c.1K("\\n")}6 u(a,b){I(a==N||a.L==0||a=="\\n")H a;a=a.Q(/</g,"&1y;");a=a.Q(/ {2,}/g,6(c){O(K d="",h=0;h<c.L-1;h++)d+=e.13.1W;H d+" "});I(b!=N)a=v(a,6(c){I(c.L==0)H"";K d="";c=c.Q(/^(&2s;| )+/,6(h){d=h;H""});I(c.L==0)H d;H d+\'<17 1g="\'+b+\'">\'+c+"</17>"});H a}6 n(a,b){a.1e("\\n");O(K c="",d=0;d<50;d++)c+="                    ";H a=v(a,6(h){I(h.1i("\\t")==-1)H h;O(K g=0;(g=h.1i("\\t"))!=-1;)h=h.1o(0,g)+c.1o(0,b-g%b)+h.1o(g+1,h.L);H h})}6 x(a){H a.Q(/^\\s+|\\s+$/g,"")}6 D(a,b){I(a.P<b.P)H-1;Y I(a.P>b.P)H 1;Y I(a.L<b.L)H-1;Y I(a.L>b.L)H 1;H 0}6 y(a,b){6 c(k){H k[0]}O(K d=N,h=[],g=b.2D?b.2D:c;(d=b.1I.X(a))!=N;){K i=g(d,b);I(1j i=="3f")i=[1f e.2L(i,d.P,b.23)];h=h.1O(i)}H h}6 E(a){K b=/(.*)((&1G;|&1y;).*)/;H a.Q(e.3A.3M,6(c){K d="",h=N;I(h=b.X(c)){c=h[1];d=h[2]}H\'<a 2h="\'+c+\'">\'+c+"</a>"+d})}6 z(){O(K a=1E.36("1k"),b=[],c=0;c<a.L;c++)a[c].3s=="20"&&b.U(a[c]);H b}6 f(a){a=a.1F;K b=p(a,".20",R);a=p(a,".3O",R);K c=1E.4i("3t");I(!(!a||!b||p(a,"3t"))){B(b.1c);r(b,"1m");O(K d=a.3G,h=[],g=0;g<d.L;g++)h.U(d[g].4z||d[g].4A);h=h.1K("\\r");c.39(1E.4D(h));a.39(c);c.2C();c.4C();w(c,"4u",6(){c.2G.4E(c);b.1l=b.1l.Q("1m","")})}}I(1j 3F!="1d"&&1j M=="1d")M=3F("M").M;K e={2v:{"1g-27":"","2i-1s":1,"2z-1s-2t":11,1M:N,1t:N,"42-45":R,"43-22":4,1u:R,16:R,"3V-17":R,2l:11,"41-40":R,2k:11,"1z-1k":11},13:{1W:"&2s;",2M:R,46:11,44:11,34:"4n",1x:{21:"4o 1m",2P:"?",1X:"1v\\n\\n",3E:"4r\'t 4t 1D O: ",4g:"4m 4B\'t 51 O 1z-1k 4F: ",37:\'<!4T 1z 4S "-//4V//3H 4W 1.0 4Z//4Y" "1Z://2y.3L.3K/4X/3I/3H/3I-4P.4J"><1z 4I="1Z://2y.3L.3K/4L/5L"><3J><4N 1Z-4M="5G-5M" 6K="2O/1z; 6J=6I-8" /><1t>6L 1v</1t></3J><3B 1L="25-6M:6Q,6P,6O,6N-6F;6y-2f:#6x;2f:#6w;25-22:6v;2O-3D:3C;"><T 1L="2O-3D:3C;3w-32:1.6z;"><T 1L="25-22:6A-6E;">1v</T><T 1L="25-22:.6C;3w-6B:6R;"><T>3v 3.0.76 (72 73 3x)</T><T><a 2h="1Z://3u.2w/1v" 1F="38" 1L="2f:#3y">1Z://3u.2w/1v</a></T><T>70 17 6U 71.</T><T>6T 6X-3x 6Y 6D.</T></T><T>6t 61 60 J 1k, 5Z <a 2h="6u://2y.62.2w/63-66/65?64=5X-5W&5P=5O" 1L="2f:#3y">5R</a> 5V <2R/>5U 5T 5S!</T></T></3B></1z>\'}},1Y:{2j:N,2A:{}},1U:{},3A:{6n:/\\/\\*[\\s\\S]*?\\*\\//2c,6m:/\\/\\/.*$/2c,6l:/#.*$/2c,6k:/"([^\\\\"\\n]|\\\\.)*"/g,6o:/\'([^\\\\\'\\n]|\\\\.)*\'/g,6p:1f M(\'"([^\\\\\\\\"]|\\\\\\\\.)*"\',"3z"),6s:1f M("\'([^\\\\\\\\\']|\\\\\\\\.)*\'","3z"),6q:/(&1y;|<)!--[\\s\\S]*?--(&1G;|>)/2c,3M:/\\w+:\\/\\/[\\w-.\\/?%&=:@;]*/g,6a:{18:/(&1y;|<)\\?=?/g,1b:/\\?(&1G;|>)/g},69:{18:/(&1y;|<)%=?/g,1b:/%(&1G;|>)/g},6d:{18:/(&1y;|<)\\s*1k.*?(&1G;|>)/2T,1b:/(&1y;|<)\\/\\s*1k\\s*(&1G;|>)/2T}},16:{1H:6(a){6 b(i,k){H e.16.2o(i,k,e.13.1x[k])}O(K c=\'<T 1g="16">\',d=e.16.2x,h=d.2X,g=0;g<h.L;g++)c+=(d[h[g]].1H||b)(a,h[g]);c+="</T>";H c},2o:6(a,b,c){H\'<2W><a 2h="#" 1g="6e 6h\'+b+" "+b+\'">\'+c+"</a></2W>"},2b:6(a){K b=a.1F,c=b.1l||"";b=B(p(b,".20",R).1c);K d=6(h){H(h=15(h+"6f(\\\\w+)").X(c))?h[1]:N}("6g");b&&d&&e.16.2x[d].2B(b);a.3N()},2x:{2X:["21","2P"],21:{1H:6(a){I(a.V("2l")!=R)H"";K b=a.V("1t");H e.16.2o(a,"21",b?b:e.13.1x.21)},2B:6(a){a=1E.6j(t(a.1c));a.1l=a.1l.Q("47","")}},2P:{2B:6(){K a="68=0";a+=", 18="+(31.30-33)/2+", 32="+(31.2Z-2Y)/2+", 30=33, 2Z=2Y";a=a.Q(/^,/,"");a=1P.6Z("","38",a);a.2C();K b=a.1E;b.6W(e.13.1x.37);b.6V();a.2C()}}}},35:6(a,b){K c;I(b)c=[b];Y{c=1E.36(e.13.34);O(K d=[],h=0;h<c.L;h++)d.U(c[h]);c=d}c=c;d=[];I(e.13.2M)c=c.1O(z());I(c.L===0)H d;O(h=0;h<c.L;h++){O(K g=c[h],i=a,k=c[h].1l,j=3W 0,l={},m=1f M("^\\\\[(?<2V>(.*?))\\\\]$"),s=1f M("(?<27>[\\\\w-]+)\\\\s*:\\\\s*(?<1T>[\\\\w-%#]+|\\\\[.*?\\\\]|\\".*?\\"|\'.*?\')\\\\s*;?","g");(j=s.X(k))!=N;){K o=j.1T.Q(/^[\'"]|[\'"]$/g,"");I(o!=N&&m.1A(o)){o=m.X(o);o=o.2V.L>0?o.2V.1e(/\\s*,\\s*/):[]}l[j.27]=o}g={1F:g,1n:C(i,l)};g.1n.1D!=N&&d.U(g)}H d},1M:6(a,b){K c=J.35(a,b),d=N,h=e.13;I(c.L!==0)O(K g=0;g<c.L;g++){b=c[g];K i=b.1F,k=b.1n,j=k.1D,l;I(j!=N){I(k["1z-1k"]=="R"||e.2v["1z-1k"]==R){d=1f e.4l(j);j="4O"}Y I(d=A(j))d=1f d;Y 6H;l=i.3X;I(h.2M){l=l;K m=x(l),s=11;I(m.1i("<![6G[")==0){m=m.4h(9);s=R}K o=m.L;I(m.1i("]]\\>")==o-3){m=m.4h(0,o-3);s=R}l=s?m:l}I((i.1t||"")!="")k.1t=i.1t;k.1D=j;d.2Q(k);b=d.2F(l);I((i.1c||"")!="")b.1c=i.1c;i.2G.74(b,i)}}},2E:6(a){w(1P,"4k",6(){e.1M(a)})}};e.2E=e.2E;e.1M=e.1M;e.2L=6(a,b,c){J.1T=a;J.P=b;J.L=a.L;J.23=c;J.1V=N};e.2L.Z.1q=6(){H J.1T};e.4l=6(a){6 b(j,l){O(K m=0;m<j.L;m++)j[m].P+=l}K c=A(a),d,h=1f e.1U.5Y,g=J,i="2F 1H 2Q".1e(" ");I(c!=N){d=1f c;O(K k=0;k<i.L;k++)(6(){K j=i[k];g[j]=6(){H h[j].1p(h,14)}})();d.28==N?1P.1X(e.13.1x.1X+(e.13.1x.4g+a)):h.2J.U({1I:d.28.17,2D:6(j){O(K l=j.17,m=[],s=d.2J,o=j.P+j.18.L,F=d.28,q,G=0;G<s.L;G++){q=y(l,s[G]);b(q,o);m=m.1O(q)}I(F.18!=N&&j.18!=N){q=y(j.18,F.18);b(q,j.P);m=m.1O(q)}I(F.1b!=N&&j.1b!=N){q=y(j.1b,F.1b);b(q,j.P+j[0].5Q(j.1b));m=m.1O(q)}O(j=0;j<m.L;j++)m[j].1V=c.1V;H m}})}};e.4j=6(){};e.4j.Z={V:6(a,b){K c=J.1n[a];c=c==N?b:c;K d={"R":R,"11":11}[c];H d==N?c:d},3Y:6(a){H 1E.4i(a)},4c:6(a,b){K c=[];I(a!=N)O(K d=0;d<a.L;d++)I(1j a[d]=="2m")c=c.1O(y(b,a[d]));H J.4e(c.6b(D))},4e:6(a){O(K b=0;b<a.L;b++)I(a[b]!==N)O(K c=a[b],d=c.P+c.L,h=b+1;h<a.L&&a[b]!==N;h++){K g=a[h];I(g!==N)I(g.P>d)1N;Y I(g.P==c.P&&g.L>c.L)a[b]=N;Y I(g.P>=c.P&&g.P<d)a[h]=N}H a},4d:6(a){K b=[],c=2u(J.V("2i-1s"));v(a,6(d,h){b.U(h+c)});H b},3U:6(a){K b=J.V("1M",[]);I(1j b!="2m"&&b.U==N)b=[b];a:{a=a.1q();K c=3W 0;O(c=c=1Q.6c(c||0,0);c<b.L;c++)I(b[c]==a){b=c;1N a}b=-1}H b!=-1},2r:6(a,b,c){a=["1s","6i"+b,"P"+a,"6r"+(b%2==0?1:2).1q()];J.3U(b)&&a.U("67");b==0&&a.U("1N");H\'<T 1g="\'+a.1K(" ")+\'">\'+c+"</T>"},3Q:6(a,b){K c="",d=a.1e("\\n").L,h=2u(J.V("2i-1s")),g=J.V("2z-1s-2t");I(g==R)g=(h+d-1).1q().L;Y I(3R(g)==R)g=0;O(K i=0;i<d;i++){K k=b?b[i]:h+i,j;I(k==0)j=e.13.1W;Y{j=g;O(K l=k.1q();l.L<j;)l="0"+l;j=l}a=j;c+=J.2r(i,k,a)}H c},49:6(a,b){a=x(a);K c=a.1e("\\n");J.V("2z-1s-2t");K d=2u(J.V("2i-1s"));a="";O(K h=J.V("1D"),g=0;g<c.L;g++){K i=c[g],k=/^(&2s;|\\s)+/.X(i),j=N,l=b?b[g]:d+g;I(k!=N){j=k[0].1q();i=i.1o(j.L);j=j.Q(" ",e.13.1W)}i=x(i);I(i.L==0)i=e.13.1W;a+=J.2r(g,l,(j!=N?\'<17 1g="\'+h+\' 5N">\'+j+"</17>":"")+i)}H a},4f:6(a){H a?"<4a>"+a+"</4a>":""},4b:6(a,b){6 c(l){H(l=l?l.1V||g:g)?l+" ":""}O(K d=0,h="",g=J.V("1D",""),i=0;i<b.L;i++){K k=b[i],j;I(!(k===N||k.L===0)){j=c(k);h+=u(a.1o(d,k.P-d),j+"48")+u(k.1T,j+k.23);d=k.P+k.L+(k.75||0)}}h+=u(a.1o(d),c()+"48");H h},1H:6(a){K b="",c=["20"],d;I(J.V("2k")==R)J.1n.16=J.1n.1u=11;1l="20";J.V("2l")==R&&c.U("47");I((1u=J.V("1u"))==11)c.U("6S");c.U(J.V("1g-27"));c.U(J.V("1D"));a=a.Q(/^[ ]*[\\n]+|[\\n]*[ ]*$/g,"").Q(/\\r/g," ");b=J.V("43-22");I(J.V("42-45")==R)a=n(a,b);Y{O(K h="",g=0;g<b;g++)h+=" ";a=a.Q(/\\t/g,h)}a=a;a:{b=a=a;h=/<2R\\s*\\/?>|&1y;2R\\s*\\/?&1G;/2T;I(e.13.46==R)b=b.Q(h,"\\n");I(e.13.44==R)b=b.Q(h,"");b=b.1e("\\n");h=/^\\s*/;g=4Q;O(K i=0;i<b.L&&g>0;i++){K k=b[i];I(x(k).L!=0){k=h.X(k);I(k==N){a=a;1N a}g=1Q.4q(k[0].L,g)}}I(g>0)O(i=0;i<b.L;i++)b[i]=b[i].1o(g);a=b.1K("\\n")}I(1u)d=J.4d(a);b=J.4c(J.2J,a);b=J.4b(a,b);b=J.49(b,d);I(J.V("41-40"))b=E(b);1j 2H!="1d"&&2H.3S&&2H.3S.1C(/5s/)&&c.U("5t");H b=\'<T 1c="\'+t(J.1c)+\'" 1g="\'+c.1K(" ")+\'">\'+(J.V("16")?e.16.1H(J):"")+\'<3Z 5z="0" 5H="0" 5J="0">\'+J.4f(J.V("1t"))+"<3T><3P>"+(1u?\'<2d 1g="1u">\'+J.3Q(a)+"</2d>":"")+\'<2d 1g="17"><T 1g="3O">\'+b+"</T></2d></3P></3T></3Z></T>"},2F:6(a){I(a===N)a="";J.17=a;K b=J.3Y("T");b.3X=J.1H(a);J.V("16")&&w(p(b,".16"),"5c",e.16.2b);J.V("3V-17")&&w(p(b,".17"),"56",f);H b},2Q:6(a){J.1c=""+1Q.5d(1Q.5n()*5k).1q();e.1Y.2A[t(J.1c)]=J;J.1n=C(e.2v,a||{});I(J.V("2k")==R)J.1n.16=J.1n.1u=11},5j:6(a){a=a.Q(/^\\s+|\\s+$/g,"").Q(/\\s+/g,"|");H"\\\\b(?:"+a+")\\\\b"},5f:6(a){J.28={18:{1I:a.18,23:"1k"},1b:{1I:a.1b,23:"1k"},17:1f M("(?<18>"+a.18.1m+")(?<17>.*?)(?<1b>"+a.1b.1m+")","5o")}}};H e}();1j 2e!="1d"&&(2e.1v=1v);',62,441,'||||||function|||||||||||||||||||||||||||||||||||||return|if|this|var|length|XRegExp|null|for|index|replace|true||div|push|getParam|call|exec|else|prototype||false|lastIndex|config|arguments|RegExp|toolbar|code|left|captureNames|slice|right|id|undefined|split|new|class|addToken|indexOf|typeof|script|className|source|params|substr|apply|toString|String|line|title|gutter|SyntaxHighlighter|_xregexp|strings|lt|html|test|OUTSIDE_CLASS|match|brush|document|target|gt|getHtml|regex|global|join|style|highlight|break|concat|window|Math|isRegExp|throw|value|brushes|brushName|space|alert|vars|http|syntaxhighlighter|expandSource|size|css|case|font|Fa|name|htmlScript|dA|can|handler|gm|td|exports|color|in|href|first|discoveredBrushes|light|collapse|object|cache|getButtonHtml|trigger|pattern|getLineHtml|nbsp|numbers|parseInt|defaults|com|items|www|pad|highlighters|execute|focus|func|all|getDiv|parentNode|navigator|INSIDE_CLASS|regexList|hasFlag|Match|useScriptTags|hasNamedCapture|text|help|init|br|input|gi|Error|values|span|list|250|height|width|screen|top|500|tagName|findElements|getElementsByTagName|aboutDialog|_blank|appendChild|charAt|Array|copyAsGlobal|setFlag|highlighter_|string|attachEvent|nodeName|floor|backref|output|the|TypeError|sticky|Za|iterate|freezeTokens|scope|type|textarea|alexgorbatchev|version|margin|2010|005896|gs|regexLib|body|center|align|noBrush|require|childNodes|DTD|xhtml1|head|org|w3|url|preventDefault|container|tr|getLineNumbersHtml|isNaN|userAgent|tbody|isLineHighlighted|quick|void|innerHTML|create|table|links|auto|smart|tab|stripBrs|tabs|bloggerMode|collapsed|plain|getCodeLinesHtml|caption|getMatchesHtml|findMatches|figureOutLineNumbers|removeNestedMatches|getTitleHtml|brushNotHtmlScript|substring|createElement|Highlighter|load|HtmlScript|Brush|pre|expand|multiline|min|Can|ignoreCase|find|blur|extended|toLowerCase|aliases|addEventListener|innerText|textContent|wasn|select|createTextNode|removeChild|option|same|frame|xmlns|dtd|twice|1999|equiv|meta|htmlscript|transitional|1E3|expected|PUBLIC|DOCTYPE|on|W3C|XHTML|TR|EN|Transitional||configured|srcElement|Object|after|run|dblclick|matchChain|valueOf|constructor|default|switch|click|round|execAt|forHtmlScript|token|gimy|functions|getKeywords|1E6|escape|within|random|sgi|another|finally|supply|MSIE|ie|toUpperCase|catch|returnValue|definition|event|border|imsx|constructing|one|Infinity|from|when|Content|cellpadding|flags|cellspacing|try|xhtml|Type|spaces|2930402|hosted_button_id|lastIndexOf|donate|active|development|keep|to|xclick|_s|Xml|please|like|you|paypal|cgi|cmd|webscr|bin|highlighted|scrollbars|aspScriptTags|phpScriptTags|sort|max|scriptScriptTags|toolbar_item|_|command|command_|number|getElementById|doubleQuotedString|singleLinePerlComments|singleLineCComments|multiLineCComments|singleQuotedString|multiLineDoubleQuotedString|xmlComments|alt|multiLineSingleQuotedString|If|https|1em|000|fff|background|5em|xx|bottom|75em|Gorbatchev|large|serif|CDATA|continue|utf|charset|content|About|family|sans|Helvetica|Arial|Geneva|3em|nogutter|Copyright|syntax|close|write|2004|Alex|open|JavaScript|highlighter|July|02|replaceChild|offset|83'.split('|'),0,{}))

;/**
 * SyntaxHighlighter
 * http://alexgorbatchev.com/SyntaxHighlighter
 *
 * SyntaxHighlighter is donationware. If you are using it, please donate.
 * http://alexgorbatchev.com/SyntaxHighlighter/donate.html
 *
 * @version
 * 3.0.83 (July 02 2010)
 * 
 * @copyright
 * Copyright (C) 2004-2010 Alex Gorbatchev.
 *
 * @license
 * Dual licensed under the MIT and GPL licenses.
 */
;(function()
{
	// CommonJS
	typeof(require) != 'undefined' ? SyntaxHighlighter = require('shCore').SyntaxHighlighter : null;

	function Brush()
	{
		function process(match, regexInfo)
		{
			var constructor = SyntaxHighlighter.Match,
				code = match[0],
				tag = new XRegExp('(&lt;|<)[\\s\\/\\?]*(?<name>[:\\w-\\.]+)', 'xg').exec(code),
				result = []
				;
		
			if (match.attributes != null) 
			{
				var attributes,
					regex = new XRegExp('(?<name> [\\w:\\-\\.]+)' +
										'\\s*=\\s*' +
										'(?<value> ".*?"|\'.*?\'|\\w+)',
										'xg');

				while ((attributes = regex.exec(code)) != null) 
				{
					result.push(new constructor(attributes.name, match.index + attributes.index, 'color1'));
					result.push(new constructor(attributes.value, match.index + attributes.index + attributes[0].indexOf(attributes.value), 'string'));
				}
			}

			if (tag != null)
				result.push(
					new constructor(tag.name, match.index + tag[0].indexOf(tag.name), 'keyword')
				);

			return result;
		}
	
		this.regexList = [
			{ regex: new XRegExp('(\\&lt;|<)\\!\\[[\\w\\s]*?\\[(.|\\s)*?\\]\\](\\&gt;|>)', 'gm'),			css: 'color2' },	// <![ ... [ ... ]]>
			{ regex: SyntaxHighlighter.regexLib.xmlComments,												css: 'comments' },	// <!-- ... -->
			{ regex: new XRegExp('(&lt;|<)[\\s\\/\\?]*(\\w+)(?<attributes>.*?)[\\s\\/\\?]*(&gt;|>)', 'sg'), func: process }
		];
	};

	Brush.prototype	= new SyntaxHighlighter.Highlighter();
	Brush.aliases	= ['xml', 'xhtml', 'xslt', 'html'];

	SyntaxHighlighter.brushes.Xml = Brush;

	// CommonJS
	typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();

;/**
 * SyntaxHighlighter
 * http://alexgorbatchev.com/SyntaxHighlighter
 *
 * SyntaxHighlighter is donationware. If you are using it, please donate.
 * http://alexgorbatchev.com/SyntaxHighlighter/donate.html
 *
 * @version
 * 3.0.83 (July 02 2010)
 * 
 * @copyright
 * Copyright (C) 2004-2010 Alex Gorbatchev.
 *
 * @license
 * Dual licensed under the MIT and GPL licenses.
 */
;(function()
{
	// CommonJS
	typeof(require) != 'undefined' ? SyntaxHighlighter = require('shCore').SyntaxHighlighter : null;

	function Brush()
	{
		var keywords =	'break case catch continue ' +
						'default delete do else false  ' +
						'for function if in instanceof ' +
						'new null return super switch ' +
						'this throw true try typeof var while with'
						;

		var r = SyntaxHighlighter.regexLib;
		
		this.regexList = [
			{ regex: r.multiLineDoubleQuotedString,					css: 'string' },			// double quoted strings
			{ regex: r.multiLineSingleQuotedString,					css: 'string' },			// single quoted strings
			{ regex: r.singleLineCComments,							css: 'comments' },			// one line comments
			{ regex: r.multiLineCComments,							css: 'comments' },			// multiline comments
			{ regex: /\s*#.*/gm,									css: 'preprocessor' },		// preprocessor tags like #region and #endregion
			{ regex: new RegExp(this.getKeywords(keywords), 'gm'),	css: 'keyword' }			// keywords
			];
	
		this.forHtmlScript(r.scriptScriptTags);
	};

	Brush.prototype	= new SyntaxHighlighter.Highlighter();
	Brush.aliases	= ['js', 'jscript', 'javascript'];

	SyntaxHighlighter.brushes.JScript = Brush;

	// CommonJS
	typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();

;/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */
;
(function() {
function e(a){throw a;}var g=void 0,i=!0,k=null,l=!1;function aa(a){return function(b){this[a]=b}}function n(a){return function(){return this[a]}}var q,r=this;function ba(){}
function da(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b}function t(a){return a!==g}function ea(a){return"array"==da(a)}function fa(a){var b=da(a);return"array"==b||"object"==b&&"number"==typeof a.length}function u(a){return"string"==typeof a}function ga(a){return"function"==da(a)}function ha(a){var b=typeof a;return"object"==b&&a!=k||"function"==b}function ia(a){return a[ja]||(a[ja]=++ka)}var ja="closure_uid_"+Math.floor(2147483648*Math.random()).toString(36),ka=0;
function la(a,b,c){return a.call.apply(a.bind,arguments)}function ma(a,b,c){a||e(Error());if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function x(a,b,c){x=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?la:ma;return x.apply(k,arguments)}
function z(a,b){var c=Array.prototype.slice.call(arguments,1);return function(){var b=Array.prototype.slice.call(arguments);b.unshift.apply(b,c);return a.apply(this,b)}}var na=Date.now||function(){return+new Date};function oa(a){var b={},c;for(c in b)var d=(""+b[c]).replace(/\$/g,"$$$$"),a=a.replace(RegExp("\\{\\$"+c+"\\}","gi"),d);return a}
function A(a,b){var c=a.split("."),d=r;!(c[0]in d)&&d.execScript&&d.execScript("var "+c[0]);for(var f;c.length&&(f=c.shift());)!c.length&&t(b)?d[f]=b:d=d[f]?d[f]:d[f]={}}function B(a,b){function c(){}c.prototype=b.prototype;a.d=b.prototype;a.prototype=new c;a.prototype.constructor=a}Function.prototype.bind=Function.prototype.bind||function(a,b){if(1<arguments.length){var c=Array.prototype.slice.call(arguments,1);c.unshift(this,a);return x.apply(k,c)}return x(this,a)};function pa(a,b){for(var c=1;c<arguments.length;c++)var d=String(arguments[c]).replace(/\$/g,"$$$$"),a=a.replace(/\%s/,d);return a}function qa(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")}function ra(a){if(!sa.test(a))return a;-1!=a.indexOf("&")&&(a=a.replace(ta,"&amp;"));-1!=a.indexOf("<")&&(a=a.replace(ua,"&lt;"));-1!=a.indexOf(">")&&(a=a.replace(va,"&gt;"));-1!=a.indexOf('"')&&(a=a.replace(wa,"&quot;"));return a}var ta=/&/g,ua=/</g,va=/>/g,wa=/\"/g,sa=/[&<>\"]/;
function xa(a){return Array.prototype.join.call(arguments,"")}
function ya(a,b){for(var c=0,d=qa(String(a)).split("."),f=qa(String(b)).split("."),h=Math.max(d.length,f.length),j=0;0==c&&j<h;j++){var m=d[j]||"",p=f[j]||"",s=RegExp("(\\d*)(\\D*)","g"),J=RegExp("(\\d*)(\\D*)","g");do{var y=s.exec(m)||["","",""],v=J.exec(p)||["","",""];if(0==y[0].length&&0==v[0].length)break;c=((0==y[1].length?0:parseInt(y[1],10))<(0==v[1].length?0:parseInt(v[1],10))?-1:(0==y[1].length?0:parseInt(y[1],10))>(0==v[1].length?0:parseInt(v[1],10))?1:0)||((0==y[2].length)<(0==v[2].length)?
-1:(0==y[2].length)>(0==v[2].length)?1:0)||(y[2]<v[2]?-1:y[2]>v[2]?1:0)}while(0==c)}return c}function za(a){return String(a).replace(/\-([a-z])/g,function(a,c){return c.toUpperCase()})}function Aa(a){return String(a).replace(/([A-Z])/g,"-$1").toLowerCase()};var C=Array.prototype,Ba=C.indexOf?function(a,b,c){return C.indexOf.call(a,b,c)}:function(a,b,c){c=c==k?0:0>c?Math.max(0,a.length+c):c;if(u(a))return!u(b)||1!=b.length?-1:a.indexOf(b,c);for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},E=C.forEach?function(a,b,c){C.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,f=u(a)?a.split(""):a,h=0;h<d;h++)h in f&&b.call(c,f[h],h,a)},Ca=C.filter?function(a,b,c){return C.filter.call(a,b,c)}:function(a,b,c){for(var d=a.length,f=[],h=0,j=u(a)?a.split(""):
a,m=0;m<d;m++)if(m in j){var p=j[m];b.call(c,p,m,a)&&(f[h++]=p)}return f};function Da(a,b){var c=Ba(a,b);0<=c&&C.splice.call(a,c,1)}function Ea(a){return C.concat.apply(C,arguments)}function Fa(a){var b=a.length;if(0<b){for(var c=Array(b),d=0;d<b;d++)c[d]=a[d];return c}return[]}function Ga(a,b){for(var c=1;c<arguments.length;c++){var d=arguments[c],f;if(ea(d)||(f=fa(d))&&d.hasOwnProperty("callee"))a.push.apply(a,d);else if(f)for(var h=a.length,j=d.length,m=0;m<j;m++)a[h+m]=d[m];else a.push(d)}}
function Ha(a,b,c,d){C.splice.apply(a,Ia(arguments,1))}function Ia(a,b,c){return 2>=arguments.length?C.slice.call(a,b):C.slice.call(a,b,c)};function F(a,b){this.x=t(a)?a:0;this.y=t(b)?b:0}F.prototype.za=function(){return new F(this.x,this.y)};F.prototype.toString=function(){return"("+this.x+", "+this.y+")"};function Ja(a,b){for(var c in a)b.call(g,a[c],c,a)}function Ka(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b}function La(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b}function Ma(a){for(var b in a)return l;return i}var Na="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
function Oa(a,b){for(var c,d,f=1;f<arguments.length;f++){d=arguments[f];for(c in d)a[c]=d[c];for(var h=0;h<Na.length;h++)c=Na[h],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}};function Pa(a){if("function"==typeof a.T)return a.T();if(u(a))return a.split("");if(fa(a)){for(var b=[],c=a.length,d=0;d<c;d++)b.push(a[d]);return b}return Ka(a)}function Qa(a,b,c){if("function"==typeof a.forEach)a.forEach(b,c);else if(fa(a)||u(a))E(a,b,c);else{var d;if("function"==typeof a.lb)d=a.lb();else if("function"!=typeof a.T)if(fa(a)||u(a)){d=[];for(var f=a.length,h=0;h<f;h++)d.push(h)}else d=La(a);else d=g;for(var f=Pa(a),h=f.length,j=0;j<h;j++)b.call(c,f[j],d&&d[j],a)}};function Ra(a,b){this.sa={};this.o=[];var c=arguments.length;if(1<c){c%2&&e(Error("Uneven number of arguments"));for(var d=0;d<c;d+=2)this.set(arguments[d],arguments[d+1])}else if(a){a instanceof Ra?(c=a.lb(),d=a.T()):(c=La(a),d=Ka(a));for(var f=0;f<c.length;f++)this.set(c[f],d[f])}}q=Ra.prototype;q.i=0;q.jh=0;q.T=function(){Sa(this);for(var a=[],b=0;b<this.o.length;b++)a.push(this.sa[this.o[b]]);return a};q.lb=function(){Sa(this);return this.o.concat()};q.Ma=function(a){return Ta(this.sa,a)};
q.remove=function(a){return Ta(this.sa,a)?(delete this.sa[a],this.i--,this.jh++,this.o.length>2*this.i&&Sa(this),i):l};function Sa(a){if(a.i!=a.o.length){for(var b=0,c=0;b<a.o.length;){var d=a.o[b];Ta(a.sa,d)&&(a.o[c++]=d);b++}a.o.length=c}if(a.i!=a.o.length){for(var f={},c=b=0;b<a.o.length;)d=a.o[b],Ta(f,d)||(a.o[c++]=d,f[d]=1),b++;a.o.length=c}}q.get=function(a,b){return Ta(this.sa,a)?this.sa[a]:b};q.set=function(a,b){Ta(this.sa,a)||(this.i++,this.o.push(a),this.jh++);this.sa[a]=b};q.za=function(){return new Ra(this)};
function Ta(a,b){return Object.prototype.hasOwnProperty.call(a,b)};var Ua,Va,Wa,Xa,Ya,Za,$a,ab;function bb(){return r.navigator?r.navigator.userAgent:k}function cb(){return r.navigator}Ya=Xa=Wa=Va=Ua=l;var db;if(db=bb()){var eb=cb();Ua=0==db.indexOf("Opera");Va=!Ua&&-1!=db.indexOf("MSIE");Xa=(Wa=!Ua&&-1!=db.indexOf("WebKit"))&&-1!=db.indexOf("Mobile");Ya=!Ua&&!Wa&&"Gecko"==eb.product}var fb=Ua,G=Va,H=Ya,I=Wa,gb=Xa,hb,ib=cb();hb=ib&&ib.platform||"";Za=-1!=hb.indexOf("Mac");$a=-1!=hb.indexOf("Win");ab=-1!=hb.indexOf("Linux");
var jb=!!cb()&&-1!=(cb().appVersion||"").indexOf("X11"),kb;a:{var lb="",mb;if(fb&&r.opera)var nb=r.opera.version,lb="function"==typeof nb?nb():nb;else if(H?mb=/rv\:([^\);]+)(\)|;)/:G?mb=/MSIE\s+([^\);]+)(\)|;)/:I&&(mb=/WebKit\/(\S+)/),mb)var ob=mb.exec(bb()),lb=ob?ob[1]:"";if(G){var pb,qb=r.document;pb=qb?qb.documentMode:g;if(pb>parseFloat(lb)){kb=String(pb);break a}}kb=lb}var rb={};function K(a){return rb[a]||(rb[a]=0<=ya(kb,a))}var sb={};
function tb(a){return sb[a]||(sb[a]=G&&!!document.documentMode&&document.documentMode>=a)};var ub=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^/?#]*)@)?([\\w\\d\\-\\u0100-\\uffff.%]*)(?::([0-9]+))?)?([^?#]+)?(?:\\?([^#]*))?(?:#(.*))?$");function vb(a){if(wb){wb=l;var b=r.location;if(b){var c=b.href;if(c&&(c=(c=vb(c)[3]||k)&&decodeURIComponent(c))&&c!=b.hostname)wb=i,e(Error())}}return a.match(ub)}var wb=I;function L(a,b){var c;if(a instanceof L)this.L=t(b)?b:a.L,xb(this,a.zb),c=a.rd,yb(this),this.rd=c,c=a.Ub,yb(this),this.Ub=c,zb(this,a.$c),c=a.Zc,yb(this),this.Zc=c,Ab(this,a.N.za()),c=a.kb,yb(this),this.kb=c;else if(a&&(c=vb(String(a)))){this.L=!!b;xb(this,c[1]||"",i);var d=c[2]||"";yb(this);this.rd=d?decodeURIComponent(d):"";d=c[3]||"";yb(this);this.Ub=d?decodeURIComponent(d):"";zb(this,c[4]);d=c[5]||"";yb(this);this.Zc=d?decodeURIComponent(d):"";Ab(this,c[6]||"",i);c=c[7]||"";yb(this);this.kb=c?
decodeURIComponent(c):""}else this.L=!!b,this.N=new Bb(k,0,this.L)}q=L.prototype;q.zb="";q.rd="";q.Ub="";q.$c=k;q.Zc="";q.kb="";q.ri=l;q.L=l;
q.toString=function(){var a=[],b=this.zb;b&&a.push(Cb(b,Db),":");if(b=this.Ub){a.push("//");var c=this.rd;c&&a.push(Cb(c,Db),"@");a.push(encodeURIComponent(String(b)));b=this.$c;b!=k&&a.push(":",String(b))}if(b=this.Zc)this.Ub&&"/"!=b.charAt(0)&&a.push("/"),a.push(Cb(b,"/"==b.charAt(0)?Eb:Fb));(b=this.N.toString())&&a.push("?",b);(b=this.kb)&&a.push("#",Cb(b,Gb));return a.join("")};q.za=function(){return new L(this)};
function xb(a,b,c){yb(a);a.zb=c?b?decodeURIComponent(b):"":b;a.zb&&(a.zb=a.zb.replace(/:$/,""))}function zb(a,b){yb(a);b?(b=Number(b),(isNaN(b)||0>b)&&e(Error("Bad port number "+b)),a.$c=b):a.$c=k}function Ab(a,b,c){yb(a);b instanceof Bb?(a.N=b,a.N.Fe(a.L)):(c||(b=Cb(b,Hb)),a.N=new Bb(b,0,a.L))}function Ib(a){return a.kb}function yb(a){a.ri&&e(Error("Tried to modify a read-only Uri"))}q.Fe=function(a){this.L=a;this.N&&this.N.Fe(a);return this};
function Cb(a,b){return u(a)?encodeURI(a).replace(b,Jb):k}function Jb(a){a=a.charCodeAt(0);return"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var Db=/[#\/\?@]/g,Fb=/[\#\?:]/g,Eb=/[\#\?]/g,Hb=/[\#\?@]/g,Gb=/#/g;function Bb(a,b,c){this.K=a||k;this.L=!!c}
function Kb(a){if(!a.n&&(a.n=new Ra,a.i=0,a.K))for(var b=a.K.split("&"),c=0;c<b.length;c++){var d=b[c].indexOf("="),f=k,h=k;0<=d?(f=b[c].substring(0,d),h=b[c].substring(d+1)):f=b[c];f=decodeURIComponent(f.replace(/\+/g," "));f=Lb(a,f);a.add(f,h?decodeURIComponent(h.replace(/\+/g," ")):"")}}q=Bb.prototype;q.n=k;q.i=k;q.add=function(a,b){Kb(this);this.K=k;var a=Lb(this,a),c=this.n.get(a);c||this.n.set(a,c=[]);c.push(b);this.i++;return this};
q.remove=function(a){Kb(this);a=Lb(this,a);return this.n.Ma(a)?(this.K=k,this.i-=this.n.get(a).length,this.n.remove(a)):l};q.Ma=function(a){Kb(this);a=Lb(this,a);return this.n.Ma(a)};q.lb=function(){Kb(this);for(var a=this.n.T(),b=this.n.lb(),c=[],d=0;d<b.length;d++)for(var f=a[d],h=0;h<f.length;h++)c.push(b[d]);return c};q.T=function(a){Kb(this);var b=[];if(a)this.Ma(a)&&(b=Ea(b,this.n.get(Lb(this,a))));else for(var a=this.n.T(),c=0;c<a.length;c++)b=Ea(b,a[c]);return b};
q.set=function(a,b){Kb(this);this.K=k;a=Lb(this,a);this.Ma(a)&&(this.i-=this.n.get(a).length);this.n.set(a,[b]);this.i++;return this};q.get=function(a,b){var c=a?this.T(a):[];return 0<c.length?String(c[0]):b};function Mb(a,b,c){a.remove(b);0<c.length&&(a.K=k,a.n.set(Lb(a,b),Fa(c)),a.i+=c.length)}
q.toString=function(){if(this.K)return this.K;if(!this.n)return"";for(var a=[],b=this.n.lb(),c=0;c<b.length;c++)for(var d=b[c],f=encodeURIComponent(String(d)),d=this.T(d),h=0;h<d.length;h++){var j=f;""!==d[h]&&(j+="="+encodeURIComponent(String(d[h])));a.push(j)}return this.K=a.join("&")};q.za=function(){var a=new Bb;a.K=this.K;this.n&&(a.n=this.n.za());return a};function Lb(a,b){var c=String(b);a.L&&(c=c.toLowerCase());return c}
q.Fe=function(a){a&&!this.L&&(Kb(this),this.K=k,Qa(this.n,function(a,c){var d=c.toLowerCase();c!=d&&(this.remove(c),Mb(this,d,a))},this));this.L=a};var M={},Nb=!G||tb(9),Ob=!H&&!G||G&&tb(9)||H&&K("1.9.1"),Pb=G&&!K("9"),Qb=G||fb||I;M.a={};M.a.set=function(a,b){a.className=b};M.a.get=function(a){a=a.className;return u(a)&&a.match(/\S+/g)||[]};M.a.add=function(a,b){var c=M.a.get(a),d=Ia(arguments,1),f=c.length+d.length;M.a.Ze(c,d);a.className=c.join(" ");return c.length==f};M.a.remove=function(a,b){var c=M.a.get(a),d=Ia(arguments,1),f=M.a.If(c,d);a.className=f.join(" ");return f.length==c.length-d.length};M.a.Ze=function(a,b){for(var c=0;c<b.length;c++)0<=Ba(a,b[c])||a.push(b[c])};
M.a.If=function(a,b){return Ca(a,function(a){return!(0<=Ba(b,a))})};M.a.Ne=function(a,b,c){for(var d=M.a.get(a),f=l,h=0;h<d.length;h++)d[h]==b&&(Ha(d,h--,1),f=i);f&&(d.push(c),a.className=d.join(" "))};M.a.Yj=function(a,b,c){var d=M.a.get(a);u(b)?Da(d,b):ea(b)&&(d=M.a.If(d,b));u(c)&&!(0<=Ba(d,c))?d.push(c):ea(c)&&M.a.Ze(d,c);a.className=d.join(" ")};M.a.ia=function(a,b){var c=M.a.get(a);return 0<=Ba(c,b)};M.a.enable=function(a,b,c){c?M.a.add(a,b):M.a.remove(a,b)};
M.a.toggle=function(a,b){var c=!M.a.ia(a,b);M.a.enable(a,b,c);return c};function N(a,b){this.width=a;this.height=b}q=N.prototype;q.za=function(){return new N(this.width,this.height)};q.toString=function(){return"("+this.width+" x "+this.height+")"};q.ceil=function(){this.width=Math.ceil(this.width);this.height=Math.ceil(this.height);return this};q.floor=function(){this.width=Math.floor(this.width);this.height=Math.floor(this.height);return this};q.round=function(){this.width=Math.round(this.width);this.height=Math.round(this.height);return this};M.oh=l;M.Ve=l;M.qh=M.oh||M.Ve;M.e=function(a){return a?new Rb(M.u(a)):M.Fh||(M.Fh=new Rb)};M.r=function(){return document};M.b=function(a){return u(a)?document.getElementById(a):a};M.lh=M.b;M.h=function(a,b,c){return M.Xd(document,a,b,c)};M.k=function(a,b){var c=b||document;return M.Bd(c)?c.querySelectorAll("."+a):c.getElementsByClassName?c.getElementsByClassName(a):M.Xd(document,"*",a,b)};M.fa=function(a,b){var c=b||document,d=k;return(d=M.Bd(c)?c.querySelector("."+a):M.k(a,b)[0])||k};
M.Bd=function(a){return!(!a.querySelectorAll||!a.querySelector)};M.Xd=function(a,b,c,d){a=d||a;b=b&&"*"!=b?b.toUpperCase():"";if(M.Bd(a)&&(b||c))return a.querySelectorAll(b+(c?"."+c:""));if(c&&a.getElementsByClassName){a=a.getElementsByClassName(c);if(b){for(var d={},f=0,h=0,j;j=a[h];h++)b==j.nodeName&&(d[f++]=j);d.length=f;return d}return a}a=a.getElementsByTagName(b||"*");if(c){d={};for(h=f=0;j=a[h];h++)b=j.className,"function"==typeof b.split&&0<=Ba(b.split(/\s+/),c)&&(d[f++]=j);d.length=f;return d}return a};
M.mh=M.h;M.Ie=function(a,b){Ja(b,function(b,d){"style"==d?a.style.cssText=b:"class"==d?a.className=b:"for"==d?a.htmlFor=b:d in M.We?a.setAttribute(M.We[d],b):0==d.lastIndexOf("aria-",0)||0==d.lastIndexOf("data-",0)?a.setAttribute(d,b):a[d]=b})};M.We={cellpadding:"cellPadding",cellspacing:"cellSpacing",colspan:"colSpan",frameborder:"frameBorder",height:"height",maxlength:"maxLength",role:"role",rowspan:"rowSpan",type:"type",usemap:"useMap",valign:"vAlign",width:"width"};
M.ga=function(a){return M.Zf(a||window)};M.Zf=function(a){a=a.document;a=M.cc(a)?a.documentElement:a.body;return new N(a.clientWidth,a.clientHeight)};M.Sh=function(){return M.Jf(window)};M.Jf=function(a){var b=a.document,c=0;if(b){var a=M.Zf(a).height,c=b.body,d=b.documentElement;if(M.cc(b)&&d.scrollHeight)c=d.scrollHeight!=a?d.scrollHeight:d.offsetHeight;else{var b=d.scrollHeight,f=d.offsetHeight;d.clientHeight!=f&&(b=c.scrollHeight,f=c.offsetHeight);c=b>a?b>f?b:f:b<f?b:f}}return c};
M.kk=function(a){return M.e((a||r||window).document).ea()};M.ea=function(){return M.Kf(document)};M.Kf=function(a){var b=M.Wd(a),a=M.Gc(a);return new F(a.pageXOffset||b.scrollLeft,a.pageYOffset||b.scrollTop)};M.Vd=function(){return M.Wd(document)};M.Wd=function(a){return!I&&M.cc(a)?a.documentElement:a.body};M.ha=function(a){return a?M.Gc(a):window};M.Gc=function(a){return a.parentWindow||a.defaultView};M.f=function(a,b,c){return M.pf(document,arguments)};
M.pf=function(a,b){var c=b[0],d=b[1];if(!Nb&&d&&(d.name||d.type)){c=["<",c];d.name&&c.push(' name="',ra(d.name),'"');if(d.type){c.push(' type="',ra(d.type),'"');var f={};Oa(f,d);delete f.type;d=f}c.push(">");c=c.join("")}c=a.createElement(c);d&&(u(d)?c.className=d:ea(d)?M.a.add.apply(k,[c].concat(d)):M.Ie(c,d));2<b.length&&M.bf(a,c,b,2);return c};M.bf=function(a,b,c,d){function f(c){c&&b.appendChild(u(c)?a.createTextNode(c):c)}for(;d<c.length;d++){var h=c[d];fa(h)&&!M.ke(h)?E(M.le(h)?Fa(h):h,f):f(h)}};
M.nh=M.f;M.createElement=function(a){return document.createElement(a)};M.createTextNode=function(a){return document.createTextNode(a)};M.Dh=function(a,b,c){return M.qf(document,a,b,!!c)};M.qf=function(a,b,c,d){for(var f=["<tr>"],h=0;h<c;h++)f.push(d?"<td>&nbsp;</td>":"<td></td>");f.push("</tr>");f=f.join("");c=["<table>"];for(h=0;h<b;h++)c.push(f);c.push("</table>");a=a.createElement("DIV");a.innerHTML=c.join("");return a.removeChild(a.firstChild)};M.li=function(a){return M.bg(document,a)};
M.bg=function(a,b){var c=a.createElement("div");G?(c.innerHTML="<br>"+b,c.removeChild(c.firstChild)):c.innerHTML=b;if(1==c.childNodes.length)return c.removeChild(c.firstChild);for(var d=a.createDocumentFragment();c.firstChild;)d.appendChild(c.firstChild);return d};M.Rh=function(){return M.Jc()?"CSS1Compat":"BackCompat"};M.Jc=function(){return M.cc(document)};M.cc=function(a){return M.qh?M.Ve:"CSS1Compat"==a.compatMode};M.canHaveChildren=function(a){if(1!=a.nodeType)return l;switch(a.tagName){case "APPLET":case "AREA":case "BASE":case "BR":case "COL":case "COMMAND":case "EMBED":case "FRAME":case "HR":case "IMG":case "INPUT":case "IFRAME":case "ISINDEX":case "KEYGEN":case "LINK":case "NOFRAMES":case "NOSCRIPT":case "META":case "OBJECT":case "PARAM":case "SCRIPT":case "SOURCE":case "STYLE":case "TRACK":case "WBR":return l}return i};
M.appendChild=function(a,b){a.appendChild(b)};M.append=function(a,b){M.bf(M.u(a),a,arguments,1)};M.gc=function(a){for(var b;b=a.firstChild;)a.removeChild(b)};M.Ic=function(a,b){b.parentNode&&b.parentNode.insertBefore(a,b)};M.he=function(a,b){b.parentNode&&b.parentNode.insertBefore(a,b.nextSibling)};M.eg=function(a,b,c){a.insertBefore(b,a.childNodes[c]||k)};M.removeNode=function(a){return a&&a.parentNode?a.parentNode.removeChild(a):k};M.Ig=function(a,b){var c=b.parentNode;c&&c.replaceChild(a,b)};
M.Cf=function(a){var b,c=a.parentNode;if(c&&11!=c.nodeType){if(a.removeNode)return a.removeNode(l);for(;b=a.firstChild;)c.insertBefore(b,a);return M.removeNode(a)}};M.Td=function(a){return Ob&&a.children!=g?a.children:Ca(a.childNodes,function(a){return 1==a.nodeType})};M.Cc=function(a){return a.firstElementChild!=g?a.firstElementChild:M.Fc(a.firstChild,i)};M.Of=function(a){return a.lastElementChild!=g?a.lastElementChild:M.Fc(a.lastChild,l)};
M.Pf=function(a){return a.nextElementSibling!=g?a.nextElementSibling:M.Fc(a.nextSibling,i)};M.Wf=function(a){return a.previousElementSibling!=g?a.previousElementSibling:M.Fc(a.previousSibling,l)};M.Fc=function(a,b){for(;a&&1!=a.nodeType;)a=b?a.nextSibling:a.previousSibling;return a};M.Qf=function(a){if(!a)return k;if(a.firstChild)return a.firstChild;for(;a&&!a.nextSibling;)a=a.parentNode;return a?a.nextSibling:k};
M.Xf=function(a){if(!a)return k;if(!a.previousSibling)return a.parentNode;for(a=a.previousSibling;a&&a.lastChild;)a=a.lastChild;return a};M.ke=function(a){return ha(a)&&0<a.nodeType};M.je=function(a){return ha(a)&&1==a.nodeType};M.lg=function(a){return ha(a)&&a.window==a};M.Vf=function(a){if(Qb)return a.parentElement;a=a.parentNode;return M.je(a)?a:k};
M.contains=function(a,b){if(a.contains&&1==b.nodeType)return a==b||a.contains(b);if("undefined"!=typeof a.compareDocumentPosition)return a==b||Boolean(a.compareDocumentPosition(b)&16);for(;b&&a!=b;)b=b.parentNode;return b==a};
M.lf=function(a,b){if(a==b)return 0;if(a.compareDocumentPosition)return a.compareDocumentPosition(b)&2?1:-1;if((9==a.nodeType||9==b.nodeType)&&G&&!K(9)){if(9==a.nodeType)return-1;if(9==b.nodeType)return 1}if("sourceIndex"in a||a.parentNode&&"sourceIndex"in a.parentNode){var c=1==a.nodeType,d=1==b.nodeType;if(c&&d)return a.sourceIndex-b.sourceIndex;var f=a.parentNode,h=b.parentNode;return f==h?M.nf(a,b):!c&&M.contains(f,b)?-1*M.mf(a,b):!d&&M.contains(h,a)?M.mf(b,a):(c?a.sourceIndex:f.sourceIndex)-
(d?b.sourceIndex:h.sourceIndex)}d=M.u(a);c=d.createRange();c.selectNode(a);c.collapse(i);d=d.createRange();d.selectNode(b);d.collapse(i);return c.compareBoundaryPoints(r.Range.START_TO_END,d)};M.mf=function(a,b){var c=a.parentNode;if(c==b)return-1;for(var d=b;d.parentNode!=c;)d=d.parentNode;return M.nf(d,a)};M.nf=function(a,b){for(var c=b;c=c.previousSibling;)if(c==a)return-1;return 1};
M.yf=function(a){var b,c=arguments.length;if(c){if(1==c)return arguments[0]}else return k;var d=[],f=Infinity;for(b=0;b<c;b++){for(var h=[],j=arguments[b];j;)h.unshift(j),j=j.parentNode;d.push(h);f=Math.min(f,h.length)}h=k;for(b=0;b<f;b++){for(var j=d[0][b],m=1;m<c;m++)if(j!=d[m][b])return h;h=j}return h};M.u=function(a){return 9==a.nodeType?a:a.ownerDocument||a.document};M.Dc=function(a){return a.contentDocument||a.contentWindow.document};M.Mf=function(a){return a.contentWindow||M.Gc(M.Dc(a))};
M.Pg=function(a,b){if("textContent"in a)a.textContent=b;else if(a.firstChild&&3==a.firstChild.nodeType){for(;a.lastChild!=a.firstChild;)a.removeChild(a.lastChild);a.firstChild.data=b}else{M.gc(a);var c=M.u(a);a.appendChild(c.createTextNode(b))}};M.Uf=function(a){if("outerHTML"in a)return a.outerHTML;var b=M.u(a).createElement("div");b.appendChild(a.cloneNode(i));return b.innerHTML};M.zf=function(a,b){var c=[];return M.Qd(a,b,c,i)?c[0]:g};M.Af=function(a,b){var c=[];M.Qd(a,b,c,l);return c};
M.Qd=function(a,b,c,d){if(a!=k)for(a=a.firstChild;a;){if(b(a)&&(c.push(a),d)||M.Qd(a,b,c,d))return i;a=a.nextSibling}return l};M.Xe={SCRIPT:1,STYLE:1,HEAD:1,IFRAME:1,OBJECT:1};M.oc={IMG:" ",BR:"\n"};M.ig=function(a){var b=a.getAttributeNode("tabindex");return b&&b.specified?(a=a.tabIndex,"number"==typeof a&&0<=a&&32768>a):l};M.gd=function(a,b){b?a.tabIndex=0:(a.tabIndex=-1,a.removeAttribute("tabIndex"))};
M.mb=function(a){if(Pb&&"innerText"in a)a=a.innerText.replace(/(\r\n|\r|\n)/g,"\n");else{var b=[];M.ae(a,b,i);a=b.join("")}a=a.replace(/ \xAD /g," ").replace(/\xAD/g,"");a=a.replace(/\u200B/g,"");Pb||(a=a.replace(/ +/g," "));" "!=a&&(a=a.replace(/^\s*/,""));return a};M.lk=function(a){var b=[];M.ae(a,b,l);return b.join("")};
M.ae=function(a,b,c){if(!(a.nodeName in M.Xe))if(3==a.nodeType)c?b.push(String(a.nodeValue).replace(/(\r\n|\r|\n)/g,"")):b.push(a.nodeValue);else if(a.nodeName in M.oc)b.push(M.oc[a.nodeName]);else for(a=a.firstChild;a;)M.ae(a,b,c),a=a.nextSibling};M.Sf=function(a){return M.mb(a).length};M.Tf=function(a,b){for(var c=b||M.u(a).body,d=[];a&&a!=c;){for(var f=a;f=f.previousSibling;)d.unshift(M.mb(f));a=a.parentNode}return d.join("").replace(/^[\s\xa0]+/,"").replace(/ +/g," ").length};
M.Rf=function(a,b,c){for(var a=[a],d=0,f;0<a.length&&d<b;)if(f=a.pop(),!(f.nodeName in M.Xe))if(3==f.nodeType)var h=f.nodeValue.replace(/(\r\n|\r|\n)/g,"").replace(/ +/g," "),d=d+h.length;else if(f.nodeName in M.oc)d+=M.oc[f.nodeName].length;else for(h=f.childNodes.length-1;0<=h;h--)a.push(f.childNodes[h]);ha(c)&&(c.tk=f?f.nodeValue.length+b-d-1:0,c.rk=f);return f};
M.le=function(a){if(a&&"number"==typeof a.length){if(ha(a))return"function"==typeof a.item||"string"==typeof a.item;if(ga(a))return"function"==typeof a.item}return l};M.Xb=function(a,b,c){if(!b&&!c)return k;var d=b?b.toUpperCase():k;return M.Sd(a,function(a){return(!d||a.nodeName==d)&&(!c||M.a.ia(a,c))},i)};M.Hf=function(a,b){return M.Xb(a,k,b)};M.Sd=function(a,b,c,d){c||(a=a.parentNode);for(var c=d==k,f=0;a&&(c||f<=d);){if(b(a))return a;a=a.parentNode;f++}return k};
M.Gf=function(a){try{return a&&a.activeElement}catch(b){}return k};function Rb(a){this.m=a||r.document||document}q=Rb.prototype;q.e=M.e;q.r=n("m");q.b=function(a){return u(a)?this.m.getElementById(a):a};q.lh=Rb.prototype.b;q.h=function(a,b,c){return M.Xd(this.m,a,b,c)};q.k=function(a,b){return M.k(a,b||this.m)};q.fa=function(a,b){return M.fa(a,b||this.m)};q.mh=Rb.prototype.h;q.Ie=M.Ie;q.ga=function(a){return M.ga(a||this.ha())};q.Sh=function(){return M.Jf(this.ha())};
q.f=function(a,b,c){return M.pf(this.m,arguments)};q.nh=Rb.prototype.f;q.createElement=function(a){return this.m.createElement(a)};q.createTextNode=function(a){return this.m.createTextNode(a)};q.Dh=function(a,b,c){return M.qf(this.m,a,b,!!c)};q.li=function(a){return M.bg(this.m,a)};q.Rh=function(){return this.Jc()?"CSS1Compat":"BackCompat"};q.Jc=function(){return M.cc(this.m)};q.ha=function(){return M.Gc(this.m)};q.Vd=function(){return M.Wd(this.m)};q.ea=function(){return M.Kf(this.m)};
q.Gf=function(a){return M.Gf(a||this.m)};q.appendChild=M.appendChild;q.append=M.append;q.canHaveChildren=M.canHaveChildren;q.gc=M.gc;q.Ic=M.Ic;q.he=M.he;q.eg=M.eg;q.removeNode=M.removeNode;q.Ig=M.Ig;q.Cf=M.Cf;q.Td=M.Td;q.Cc=M.Cc;q.Of=M.Of;q.Pf=M.Pf;q.Wf=M.Wf;q.Qf=M.Qf;q.Xf=M.Xf;q.ke=M.ke;q.je=M.je;q.lg=M.lg;q.Vf=M.Vf;q.contains=M.contains;q.lf=M.lf;q.yf=M.yf;q.u=M.u;q.Dc=M.Dc;q.Mf=M.Mf;q.Pg=M.Pg;q.Uf=M.Uf;q.zf=M.zf;q.Af=M.Af;q.ig=M.ig;q.gd=M.gd;q.mb=M.mb;q.Sf=M.Sf;q.Tf=M.Tf;q.Rf=M.Rf;q.le=M.le;
q.Xb=M.Xb;q.Hf=M.Hf;q.Sd=M.Sd;function O(){0!=Sb&&(this.bk=Error().stack,Tb[ia(this)]=this)}var Sb=0,Tb={};O.prototype.Sb=l;O.prototype.Pa=function(){if(!this.Sb&&(this.Sb=i,this.g(),0!=Sb)){var a=ia(this);delete Tb[a]}};O.prototype.g=function(){this.Gh&&Ub.apply(k,this.Gh);if(this.xg)for(;this.xg.length;)this.xg.shift()()};function Vb(a){a&&"function"==typeof a.Pa&&a.Pa()}function Ub(a){for(var b=0,c=arguments.length;b<c;++b){var d=arguments[b];fa(d)?Ub.apply(k,d):Vb(d)}};var Wb=!G||tb(9),Xb=!G||tb(9),Yb=G&&!K("9");!I||K("528");H&&K("1.9b")||G&&K("8")||fb&&K("9.5")||I&&K("528");H&&!K("8")||G&&K("9");function P(a,b){this.type=a;this.currentTarget=this.target=b}q=P.prototype;q.g=function(){};q.Pa=function(){};q.Xa=l;q.defaultPrevented=l;q.bd=i;q.stopPropagation=function(){this.Xa=i};q.preventDefault=function(){this.defaultPrevented=i;this.bd=l};function Zb(a){a.preventDefault()};function $b(a){$b[" "](a);return a}$b[" "]=ba;function ac(a,b){a&&this.q(a,b)}B(ac,P);var bc=[1,4,2];q=ac.prototype;q.target=k;q.relatedTarget=k;q.offsetX=0;q.offsetY=0;q.clientX=0;q.clientY=0;q.screenX=0;q.screenY=0;q.button=0;q.keyCode=0;q.charCode=0;q.ctrlKey=l;q.altKey=l;q.shiftKey=l;q.metaKey=l;q.Ni=l;q.S=k;
q.q=function(a,b){var c=this.type=a.type;P.call(this,c);this.target=a.target||a.srcElement;this.currentTarget=b;var d=a.relatedTarget;if(d){if(H){var f;a:{try{$b(d.nodeName);f=i;break a}catch(h){}f=l}f||(d=k)}}else"mouseover"==c?d=a.fromElement:"mouseout"==c&&(d=a.toElement);this.relatedTarget=d;this.offsetX=I||a.offsetX!==g?a.offsetX:a.layerX;this.offsetY=I||a.offsetY!==g?a.offsetY:a.layerY;this.clientX=a.clientX!==g?a.clientX:a.pageX;this.clientY=a.clientY!==g?a.clientY:a.pageY;this.screenX=a.screenX||
0;this.screenY=a.screenY||0;this.button=a.button;this.keyCode=a.keyCode||0;this.charCode=a.charCode||("keypress"==c?a.keyCode:0);this.ctrlKey=a.ctrlKey;this.altKey=a.altKey;this.shiftKey=a.shiftKey;this.metaKey=a.metaKey;this.Ni=Za?a.metaKey:a.ctrlKey;this.state=a.state;this.S=a;a.defaultPrevented&&this.preventDefault();delete this.Xa};q.stopPropagation=function(){ac.d.stopPropagation.call(this);this.S.stopPropagation?this.S.stopPropagation():this.S.cancelBubble=i};
q.preventDefault=function(){ac.d.preventDefault.call(this);var a=this.S;if(a.preventDefault)a.preventDefault();else if(a.returnValue=l,Yb)try{if(a.ctrlKey||112<=a.keyCode&&123>=a.keyCode)a.keyCode=-1}catch(b){}};q.g=function(){};function cc(){}var dc=0;q=cc.prototype;q.key=0;q.Za=l;q.Ad=l;q.q=function(a,b,c,d,f,h){ga(a)?this.jg=i:a&&a.handleEvent&&ga(a.handleEvent)?this.jg=l:e(Error("Invalid listener argument"));this.tb=a;this.Gg=b;this.src=c;this.type=d;this.capture=!!f;this.Hc=h;this.Ad=l;this.key=++dc;this.Za=l};q.handleEvent=function(a){return this.jg?this.tb.call(this.Hc||this.src,a):this.tb.handleEvent.call(this.tb,a)};var ec={},fc={},gc={},hc={};
function Q(a,b,c,d,f){if(b){if(ea(b)){for(var h=0;h<b.length;h++)Q(a,b[h],c,d,f);return k}var d=!!d,j=fc;b in j||(j[b]={i:0,O:0});j=j[b];d in j||(j[d]={i:0,O:0},j.i++);var j=j[d],m=ia(a),p;j.O++;if(j[m]){p=j[m];for(h=0;h<p.length;h++)if(j=p[h],j.tb==c&&j.Hc==f){if(j.Za)break;return p[h].key}}else p=j[m]=[],j.i++;var s=ic,J=Xb?function(a){return s.call(J.src,J.key,a)}:function(a){a=s.call(J.src,J.key,a);if(!a)return a},h=J;h.src=a;j=new cc;j.q(c,h,a,b,d,f);c=j.key;h.key=c;p.push(j);ec[c]=j;gc[m]||
(gc[m]=[]);gc[m].push(j);a.addEventListener?(a==r||!a.sf)&&a.addEventListener(b,h,d):a.attachEvent(b in hc?hc[b]:hc[b]="on"+b,h);return c}e(Error("Invalid event type"))}function jc(a,b,c,d,f){if(ea(b))for(var h=0;h<b.length;h++)jc(a,b[h],c,d,f);else a=Q(a,b,c,d,f),ec[a].Ad=i}function kc(a,b,c,d,f){if(ea(b))for(var h=0;h<b.length;h++)kc(a,b[h],c,d,f);else if(d=!!d,a=lc(a,b,d))for(h=0;h<a.length;h++)if(a[h].tb==c&&a[h].capture==d&&a[h].Hc==f){mc(a[h].key);break}}
function mc(a){if(!ec[a])return l;var b=ec[a];if(b.Za)return l;var c=b.src,d=b.type,f=b.Gg,h=b.capture;c.removeEventListener?(c==r||!c.sf)&&c.removeEventListener(d,f,h):c.detachEvent&&c.detachEvent(d in hc?hc[d]:hc[d]="on"+d,f);c=ia(c);gc[c]&&(f=gc[c],Da(f,b),0==f.length&&delete gc[c]);b.Za=i;if(b=fc[d][h][c])b.vg=i,nc(d,h,c,b);delete ec[a];return i}
function nc(a,b,c,d){if(!d.Oc&&d.vg){for(var f=0,h=0;f<d.length;f++)d[f].Za?d[f].Gg.src=k:(f!=h&&(d[h]=d[f]),h++);d.length=h;d.vg=l;0==h&&(delete fc[a][b][c],fc[a][b].i--,0==fc[a][b].i&&(delete fc[a][b],fc[a].i--),0==fc[a].i&&delete fc[a])}}function lc(a,b,c){var d=fc;return b in d&&(d=d[b],c in d&&(d=d[c],a=ia(a),d[a]))?d[a]:k}
function oc(a,b,c,d,f){var h=1,b=ia(b);if(a[b]){a.O--;a=a[b];a.Oc?a.Oc++:a.Oc=1;try{for(var j=a.length,m=0;m<j;m++){var p=a[m];p&&!p.Za&&(h&=pc(p,f)!==l)}}finally{a.Oc--,nc(c,d,b,a)}}return Boolean(h)}function pc(a,b){a.Ad&&mc(a.key);return a.handleEvent(b)}
function ic(a,b){if(!ec[a])return i;var c=ec[a],d=c.type,f=fc;if(!(d in f))return i;var f=f[d],h,j;if(!Xb){var m;if(!(m=b))a:{m=["window","event"];for(var p=r;h=m.shift();)if(p[h]!=k)p=p[h];else{m=k;break a}m=p}h=m;m=i in f;p=l in f;if(m){if(0>h.keyCode||h.returnValue!=g)return i;a:{var s=l;if(0==h.keyCode)try{h.keyCode=-1;break a}catch(J){s=i}if(s||h.returnValue==g)h.returnValue=i}}s=new ac;s.q(h,this);h=i;try{if(m){for(var y=[],v=s.currentTarget;v;v=v.parentNode)y.push(v);j=f[i];j.O=j.i;for(var ca=
y.length-1;!s.Xa&&0<=ca&&j.O;ca--)s.currentTarget=y[ca],h&=oc(j,y[ca],d,i,s);if(p){j=f[l];j.O=j.i;for(ca=0;!s.Xa&&ca<y.length&&j.O;ca++)s.currentTarget=y[ca],h&=oc(j,y[ca],d,l,s)}}else h=pc(c,s)}finally{y&&(y.length=0)}return h}d=new ac(b,this);return h=pc(c,d)};function R(){O.call(this)}B(R,O);q=R.prototype;q.sf=i;q.Yc=k;q.He=aa("Yc");q.addEventListener=function(a,b,c,d){Q(this,a,b,c,d)};q.removeEventListener=function(a,b,c,d){kc(this,a,b,c,d)};
q.dispatchEvent=function(a){var b=a.type||a,c=fc;if(b in c){if(u(a))a=new P(a,this);else if(a instanceof P)a.target=a.target||this;else{var d=a,a=new P(b,this);Oa(a,d)}var d=1,f,c=c[b],b=i in c,h;if(b){f=[];for(h=this;h;h=h.Yc)f.push(h);h=c[i];h.O=h.i;for(var j=f.length-1;!a.Xa&&0<=j&&h.O;j--)a.currentTarget=f[j],d&=oc(h,f[j],a.type,i,a)&&a.bd!=l}if(l in c)if(h=c[l],h.O=h.i,b)for(j=0;!a.Xa&&j<f.length&&h.O;j++)a.currentTarget=f[j],d&=oc(h,f[j],a.type,l,a)&&a.bd!=l;else for(f=this;!a.Xa&&f&&h.O;f=
f.Yc)a.currentTarget=f,d&=oc(h,f,a.type,l,a)&&a.bd!=l;a=Boolean(d)}else a=i;return a};q.g=function(){R.d.g.call(this);var a,b=0,c=a==k;a=!!a;if(this==k)Ja(gc,function(d){for(var f=d.length-1;0<=f;f--){var h=d[f];if(c||a==h.capture)mc(h.key),b++}});else{var d=ia(this);if(gc[d])for(var d=gc[d],f=d.length-1;0<=f;f--){var h=d[f];if(c||a==h.capture)mc(h.key),b++}}this.Yc=k};function qc(a,b){O.call(this);this.ob=a||1;this.mc=b||rc;this.yd=x(this.gj,this);this.re=na()}B(qc,R);qc.prototype.enabled=l;var rc=r.window;q=qc.prototype;q.w=k;q.gj=function(){if(this.enabled){var a=na()-this.re;0<a&&a<0.8*this.ob?this.w=this.mc.setTimeout(this.yd,this.ob-a):(this.dispatchEvent(sc),this.enabled&&(this.w=this.mc.setTimeout(this.yd,this.ob),this.re=na()))}};q.start=function(){this.enabled=i;this.w||(this.w=this.mc.setTimeout(this.yd,this.ob),this.re=na())};
q.stop=function(){this.enabled=l;this.w&&(this.mc.clearTimeout(this.w),this.w=k)};q.g=function(){qc.d.g.call(this);this.stop();delete this.mc};var sc="tick";function tc(a,b,c){ga(a)?c&&(a=x(a,c)):a&&"function"==typeof a.handleEvent?a=x(a.handleEvent,a):e(Error("Invalid listener argument"));return 2147483647<b?-1:rc.setTimeout(a,b||0)};function uc(a){O.call(this);this.qa=a;this.o=[]}B(uc,O);var vc=[];function S(a,b,c,d,f){ea(c)||(vc[0]=c,c=vc);for(var h=0;h<c.length;h++){var j=Q(b,c[h],d||a,f||l,a.qa||a);a.o.push(j)}return a}function wc(a,b,c,d,f,h){if(ea(c))for(var j=0;j<c.length;j++)wc(a,b,c[j],d,f,h);else{a:{d=d||a;h=h||a.qa||a;f=!!f;if(b=lc(b,c,f))for(c=0;c<b.length;c++)if(!b[c].Za&&b[c].tb==d&&b[c].capture==f&&b[c].Hc==h){b=b[c];break a}b=k}b&&(b=b.key,mc(b),Da(a.o,b))}}function xc(a){E(a.o,mc);a.o.length=0}
uc.prototype.g=function(){uc.d.g.call(this);xc(this)};uc.prototype.handleEvent=function(){e(Error("EventHandler.handleEvent not implemented"))};function yc(){O.call(this);this.la=zc;this.wf=this.startTime=k}B(yc,R);var zc=0;yc.prototype.$=function(){this.pa("begin")};yc.prototype.Ga=function(){this.pa("end")};yc.prototype.ze=function(){this.pa("finish")};yc.prototype.pa=function(a){this.dispatchEvent(a)};function Ac(a,b,c){O.call(this);this.ue=a;this.ob=b||0;this.qa=c;this.zh=x(this.Kh,this)}B(Ac,O);q=Ac.prototype;q.ra=0;q.g=function(){Ac.d.g.call(this);this.stop();delete this.ue;delete this.qa};q.start=function(a){this.stop();this.ra=tc(this.zh,t(a)?a:this.ob)};q.stop=function(){0!=this.ra&&rc.clearTimeout(this.ra);this.ra=0};q.Kh=function(){this.ra=0;this.ue&&this.ue.call(this.qa)};var Bc;Bc=function(){return i};var Cc={},Dc=k;function Ec(a){a=ia(a);delete Cc[a];Ma(Cc)&&Dc&&Dc.stop()}function Fc(){Dc||(Dc=new Ac(function(){var a=na();Ja(Cc,function(c){Gc(c,a)});Ma(Cc)||Fc()},20));var a=Dc;0!=a.ra||a.start()};function Hc(a,b,c,d){yc.call(this);(!ea(a)||!ea(b))&&e(Error("Start and end parameters must be arrays"));a.length!=b.length&&e(Error("Start and end points must be the same length"));this.Bb=a;this.vf=b;this.duration=c;this.Ye=d;this.coords=[];this.Ka=l}B(Hc,yc);q=Hc.prototype;q.Ff=0;q.M=0;q.qe=k;
q.play=function(a){if(a||this.la==zc)this.M=0,this.coords=this.Bb;else if(1==this.la)return l;Ec(this);this.startTime=a=na();-1==this.la&&(this.startTime-=this.duration*this.M);this.wf=this.startTime+this.duration;this.qe=this.startTime;this.M||this.$();this.pa("play");-1==this.la&&this.pa("resume");this.la=1;var b=ia(this);b in Cc||(Cc[b]=this);Fc();Gc(this,a);return i};q.stop=function(a){Ec(this);this.la=zc;a&&(this.M=1);Ic(this,this.M);this.pa("stop");this.Ga()};
q.g=function(){this.la==zc||this.stop(l);this.pa("destroy");Hc.d.g.call(this)};function Gc(a,b){a.M=(b-a.startTime)/(a.wf-a.startTime);1<=a.M&&(a.M=1);a.Ff=1E3/(b-a.qe);a.qe=b;Ic(a,a.M);1==a.M?(a.la=zc,Ec(a),a.ze(),a.Ga()):1==a.la&&a.ta()}function Ic(a,b){ga(a.Ye)&&(b=a.Ye(b));a.coords=Array(a.Bb.length);for(var c=0;c<a.Bb.length;c++)a.coords[c]=(a.vf[c]-a.Bb[c])*b+a.Bb[c]}q.ta=function(){this.pa("animate")};q.pa=function(a){this.dispatchEvent(new Jc(a,this))};
function Jc(a,b){P.call(this,a);this.coords=b.coords;this.x=b.coords[0];this.y=b.coords[1];this.zk=b.coords[2];this.duration=b.duration;this.M=b.M;this.gk=b.Ff;this.state=b.la;this.uh=b}B(Jc,P);function Kc(a,b,c,d){this.top=a;this.right=b;this.bottom=c;this.left=d}Kc.prototype.za=function(){return new Kc(this.top,this.right,this.bottom,this.left)};Kc.prototype.toString=function(){return"("+this.top+"t, "+this.right+"r, "+this.bottom+"b, "+this.left+"l)"};Kc.prototype.contains=function(a){return!this||!a?l:a instanceof Kc?a.left>=this.left&&a.right<=this.right&&a.top>=this.top&&a.bottom<=this.bottom:a.x>=this.left&&a.x<=this.right&&a.y>=this.top&&a.y<=this.bottom};function Lc(a,b,c,d){this.left=a;this.top=b;this.width=c;this.height=d}Lc.prototype.za=function(){return new Lc(this.left,this.top,this.width,this.height)};Lc.prototype.toString=function(){return"("+this.left+", "+this.top+" - "+this.width+"w x "+this.height+"h)"};
Lc.prototype.contains=function(a){return a instanceof Lc?this.left<=a.left&&this.left+this.width>=a.left+a.width&&this.top<=a.top&&this.top+this.height>=a.top+a.height:a.x>=this.left&&a.x<=this.left+this.width&&a.y>=this.top&&a.y<=this.top+this.height};function Mc(a,b,c){u(b)?Nc(a,c,b):Ja(b,z(Nc,a))}function Nc(a,b,c){a.style[za(c)]=b}function Oc(a,b){var c=M.u(a);return c.defaultView&&c.defaultView.getComputedStyle&&(c=c.defaultView.getComputedStyle(a,k))?c[b]||c.getPropertyValue(b)||"":""}function Pc(a,b){return Oc(a,b)||(a.currentStyle?a.currentStyle[b]:k)||a.style&&a.style[b]}function Qc(a){return Pc(a,"position")}
function Rc(a,b,c){var d,f=H&&(Za||jb)&&K("1.9");b instanceof F?(d=b.x,b=b.y):(d=b,b=c);a.style.left=Sc(d,f);a.style.top=Sc(b,f)}function Tc(a){var b=a.getBoundingClientRect();G&&(a=a.ownerDocument,b.left-=a.documentElement.clientLeft+a.body.clientLeft,b.top-=a.documentElement.clientTop+a.body.clientTop);return b}
function Uc(a){if(G&&!tb(8))return a.offsetParent;for(var b=M.u(a),c=Pc(a,"position"),d="fixed"==c||"absolute"==c,a=a.parentNode;a&&a!=b;a=a.parentNode)if(c=Pc(a,"position"),d=d&&"static"==c&&a!=b.documentElement&&a!=b.body,!d&&(a.scrollWidth>a.clientWidth||a.scrollHeight>a.clientHeight||"fixed"==c||"absolute"==c||"relative"==c))return a;return k}
function Vc(a){var b,c=M.u(a),d=Pc(a,"position"),f=H&&c.getBoxObjectFor&&!a.getBoundingClientRect&&"absolute"==d&&(b=c.getBoxObjectFor(a))&&(0>b.screenX||0>b.screenY),h=new F(0,0),j;b=c?M.u(c):M.r();j=G&&!tb(9)&&!M.e(b).Jc()?b.body:b.documentElement;if(a==j)return h;if(a.getBoundingClientRect)b=Tc(a),a=M.e(c).ea(),h.x=b.left+a.x,h.y=b.top+a.y;else if(c.getBoxObjectFor&&!f)b=c.getBoxObjectFor(a),a=c.getBoxObjectFor(j),h.x=b.screenX-a.screenX,h.y=b.screenY-a.screenY;else{b=a;do{h.x+=b.offsetLeft;h.y+=
b.offsetTop;b!=a&&(h.x+=b.clientLeft||0,h.y+=b.clientTop||0);if(I&&"fixed"==Qc(b)){h.x+=c.body.scrollLeft;h.y+=c.body.scrollTop;break}b=b.offsetParent}while(b&&b!=a);if(fb||I&&"absolute"==d)h.y-=c.body.offsetTop;for(b=a;(b=Uc(b))&&b!=c.body&&b!=j;)if(h.x-=b.scrollLeft,!fb||"TR"!=b.tagName)h.y-=b.scrollTop}return h}function Wc(a,b,c){b instanceof N?(c=b.height,b=b.width):c==g&&e(Error("missing height argument"));a.style.width=Sc(b,i);a.style.height=Sc(c,i)}
function Sc(a,b){"number"==typeof a&&(a=(b?Math.round(a):a)+"px");return a}function T(a){if("none"!=Pc(a,"display"))return Xc(a);var b=a.style,c=b.display,d=b.visibility,f=b.position;b.visibility="hidden";b.position="absolute";b.display="inline";a=Xc(a);b.display=c;b.position=f;b.visibility=d;return a}function Xc(a){var b=a.offsetWidth,c=a.offsetHeight,d=I&&!b&&!c;return(!t(b)||d)&&a.getBoundingClientRect?(a=Tc(a),new N(a.right-a.left,a.bottom-a.top)):new N(b,c)}
function Yc(a,b){var c=a.style;"opacity"in c?c.opacity=b:"MozOpacity"in c?c.MozOpacity=b:"filter"in c&&(c.filter=""===b?"":"alpha(opacity="+100*b+")")}function U(a,b){a.style.display=b?"":"none"}function Zc(a){return"rtl"==Pc(a,"direction")}function $c(a){return new N(a.offsetWidth,a.offsetHeight)}var ad={thin:2,medium:4,thick:6};
function bd(a,b){if("none"==(a.currentStyle?a.currentStyle[b+"Style"]:k))return 0;var c=a.currentStyle?a.currentStyle[b+"Width"]:k,d;if(c in ad)d=ad[c];else if(/^\d+px?$/.test(c))d=parseInt(c,10);else{d=a.style.left;var f=a.runtimeStyle.left;a.runtimeStyle.left=a.currentStyle.left;a.style.left=c;c=a.style.pixelLeft;a.style.left=d;a.runtimeStyle.left=f;d=c}return d}
function cd(a){if(G){var b=bd(a,"borderLeft"),c=bd(a,"borderRight"),d=bd(a,"borderTop"),a=bd(a,"borderBottom");return new Kc(d,c,a,b)}b=Oc(a,"borderLeftWidth");c=Oc(a,"borderRightWidth");d=Oc(a,"borderTopWidth");a=Oc(a,"borderBottomWidth");return new Kc(parseFloat(d),parseFloat(c),parseFloat(a),parseFloat(b))};function dd(a){var b=a.offsetLeft,c=a.offsetParent;!c&&"fixed"==Qc(a)&&(c=M.u(a).documentElement);if(!c)return b;if(H)var d=cd(c),b=b+d.left;else tb(8)&&(d=cd(c),b-=d.left);return Zc(c)?c.clientWidth-(b+a.offsetWidth):b};function V(a,b,c,d,f){Hc.call(this,b,c,d,f);this.element=a}B(V,Hc);q=V.prototype;q.Q=ba;q.kg=function(){t(this.ka)||(this.ka=Zc(this.element));return this.ka};q.ta=function(){this.Q();V.d.ta.call(this)};q.Ga=function(){this.Q();V.d.Ga.call(this)};q.$=function(){this.Q();V.d.$.call(this)};function ed(a,b,c,d,f){(2!=b.length||2!=c.length)&&e(Error("Start and end points must be 2D"));V.apply(this,arguments)}B(ed,V);
ed.prototype.Q=function(){var a=this.Ka&&this.kg()?"right":"left";this.element.style[a]=Math.round(this.coords[0])+"px";this.element.style.top=Math.round(this.coords[1])+"px"};function fd(a,b,c,d){var f=[this.Ka?dd(a):a.offsetLeft,a.offsetTop];ed.call(this,a,f,b,c,d)}B(fd,ed);fd.prototype.$=function(){this.Bb=[this.Ka?dd(this.element):this.element.offsetLeft,this.element.offsetTop];fd.d.$.call(this)};
function gd(a,b,c,d,f){(2!=b.length||2!=c.length)&&e(Error("Start and end points must be 2D"));V.apply(this,arguments)}B(gd,V);gd.prototype.Q=function(){if(this.Ka){var a=this.element,b=Math.round(this.coords[0]),b=Math.max(b,0);a.scrollLeft=Zc(a)?H?-b:!G||!K("8")?a.scrollWidth-b-a.clientWidth:b:b}else this.element.scrollLeft=Math.round(this.coords[0]);this.element.scrollTop=Math.round(this.coords[1])};
function hd(a,b,c,d,f){"number"==typeof b&&(b=[b]);"number"==typeof c&&(c=[c]);V.call(this,a,b,c,d,f);(1!=b.length||1!=c.length)&&e(Error("Start and end points must be 1D"))}B(hd,V);hd.prototype.Q=function(){Yc(this.element,this.coords[0])};hd.prototype.show=function(){this.element.style.display=""};hd.prototype.de=function(){this.element.style.display="none"};function id(a,b,c){hd.call(this,a,1,0,b,c)}B(id,hd);function jd(a,b,c){hd.call(this,a,0,1,b,c)}B(jd,hd);
function kd(a,b,c){hd.call(this,a,1,0,b,c)}B(kd,hd);kd.prototype.$=function(){this.show();kd.d.$.call(this)};kd.prototype.Ga=function(){this.de();kd.d.Ga.call(this)};function ld(a,b,c){hd.call(this,a,0,1,b,c)}B(ld,hd);ld.prototype.$=function(){this.show();ld.d.$.call(this)};M.dataset={};M.dataset.bb="data-";M.dataset.set=function(a,b,c){a.dataset?a.dataset[b]=c:a.setAttribute(M.dataset.bb+Aa(b),c)};M.dataset.get=function(a,b){return a.dataset?a.dataset[b]:a.getAttribute(M.dataset.bb+Aa(b))};M.dataset.remove=function(a,b){a.dataset?delete a.dataset[b]:a.removeAttribute(M.dataset.bb+Aa(b))};M.dataset.ia=function(a,b){return a.dataset?b in a.dataset:a.hasAttribute?a.hasAttribute(M.dataset.bb+Aa(b)):!!a.getAttribute(M.dataset.bb+Aa(b))};
M.dataset.getAll=function(a){if(a.dataset)return a.dataset;for(var b={},a=a.attributes,c=0;c<a.length;++c){var d=a[c];if(0==d.name.lastIndexOf(M.dataset.bb,0)){var f=za(d.name.substr(5));b[f]=d.value}}return b};M.U={};M.U.ph='javascript:""';M.U.rh="border:0;vertical-align:bottom;";M.U.Id=function(a,b){return a.f("iframe",{frameborder:0,style:M.U.rh+(b||""),src:M.U.ph})};M.U.qj=function(a,b){var c=M.Dc(a);c.open();c.write(b);c.close()};M.U.ak=function(a,b,c,d,f){var h=M.e(a),j=[];f||j.push("<!DOCTYPE html>");j.push("<html><head>",b,"</head><body>",c,"</body></html>");b=M.U.Id(h,d);a.appendChild(b);M.U.qj(b,j.join(""));return b};function md(a,b,c,d,f){if(!G&&(!I||!K("525")))return i;if(Za&&f)return nd(a);if(f&&!d||!c&&(17==b||18==b)||G&&d&&b==a)return l;switch(a){case 13:return!(G&&tb(9));case 27:return!I}return nd(a)}function nd(a){if(48<=a&&57>=a||96<=a&&106>=a||65<=a&&90>=a||I&&0==a)return i;switch(a){case 32:case 63:case 107:case 109:case 110:case 111:case 186:case 59:case 189:case 187:case 61:case 188:case 190:case 191:case 192:case 222:case 219:case 220:case 221:return i;default:return l}}
function od(a){switch(a){case 61:return 187;case 59:return 186;case 224:return 91;case 0:return 224;default:return a}};function pd(a,b){O.call(this);a&&(this.Lc&&this.detach(),this.c=a,this.Kc=Q(this.c,"keypress",this,b),this.pe=Q(this.c,"keydown",this.bi,b,this),this.Lc=Q(this.c,"keyup",this.di,b,this))}B(pd,R);q=pd.prototype;q.c=k;q.Kc=k;q.pe=k;q.Lc=k;q.Fa=-1;q.Ea=-1;q.ud=l;
var qd={3:13,12:144,63232:38,63233:40,63234:37,63235:39,63236:112,63237:113,63238:114,63239:115,63240:116,63241:117,63242:118,63243:119,63244:120,63245:121,63246:122,63247:123,63248:44,63272:46,63273:36,63275:35,63276:33,63277:34,63289:144,63302:45},rd={Up:38,Down:40,Left:37,Right:39,Enter:13,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,"U+007F":46,Home:36,End:35,PageUp:33,PageDown:34,Insert:45},sd=G||I&&K("525"),td=Za&&H;q=pd.prototype;
q.bi=function(a){if(I&&(17==this.Fa&&!a.ctrlKey||18==this.Fa&&!a.altKey))this.Ea=this.Fa=-1;sd&&!md(a.keyCode,this.Fa,a.shiftKey,a.ctrlKey,a.altKey)?this.handleEvent(a):(this.Ea=H?od(a.keyCode):a.keyCode,td&&(this.ud=a.altKey))};q.di=function(a){this.Ea=this.Fa=-1;this.ud=a.altKey};
q.handleEvent=function(a){var b=a.S,c,d,f=b.altKey;G&&"keypress"==a.type?(c=this.Ea,d=13!=c&&27!=c?b.keyCode:0):I&&"keypress"==a.type?(c=this.Ea,d=0<=b.charCode&&63232>b.charCode&&nd(c)?b.charCode:0):fb?(c=this.Ea,d=nd(c)?b.keyCode:0):(c=b.keyCode||this.Ea,d=b.charCode||0,td&&(f=this.ud),Za&&(63==d&&224==c)&&(c=191));var h=c,j=b.keyIdentifier;c?63232<=c&&c in qd?h=qd[c]:25==c&&a.shiftKey&&(h=9):j&&j in rd&&(h=rd[j]);a=h==this.Fa;this.Fa=h;b=new ud(h,d,a,b);b.altKey=f;this.dispatchEvent(b)};q.b=n("c");
q.detach=function(){this.Kc&&(mc(this.Kc),mc(this.pe),mc(this.Lc),this.Lc=this.pe=this.Kc=k);this.c=k;this.Ea=this.Fa=-1};q.g=function(){pd.d.g.call(this);this.detach()};function ud(a,b,c,d){d&&this.q(d,g);this.type="key";this.keyCode=a;this.charCode=b;this.repeat=c}B(ud,ac);var vd={};function wd(a){return 1-Math.pow(1-a,3)}function xd(a){return 3*a*a-2*a*a*a};function yd(a){O.call(this);this.$b={};this.Zb={};this.qa=new uc(this);this.ua=a}B(yd,R);var zd=[G?"readystatechange":"load","abort","error"];yd.prototype.start=function(){var a=this.$b;E(La(a),function(b){var c=a[b];if(c&&(delete a[b],!this.Sb)){var d;d=this.ua?M.e(this.ua).f("img"):new Image;S(this.qa,d,zd,this.zg);this.Zb[b]=d;d.id=b;d.src=c}},this)};
yd.prototype.zg=function(a){var b=a.currentTarget;if(b){if("readystatechange"==a.type)if("complete"==b.readyState)a.type="load";else return;"undefined"==typeof b.naturalWidth&&("load"==a.type?(b.naturalWidth=b.width,b.naturalHeight=b.height):(b.naturalWidth=0,b.naturalHeight=0));this.dispatchEvent({type:a.type,target:b});if(!this.Sb&&(a=b.id,delete this.$b[a],b=this.Zb[a]))delete this.Zb[a],wc(this.qa,b,zd,this.zg),Ma(this.Zb)&&Ma(this.$b)&&this.dispatchEvent("complete")}};
yd.prototype.g=function(){delete this.$b;delete this.Zb;Vb(this.qa);yd.d.g.call(this)};M.z={};M.z.Je=function(a,b){a.setAttribute("role",b)};M.z.mk=function(a){return a.getAttribute("role")||""};M.z.jc=function(a,b,c){a.setAttribute("aria-"+b,c)};M.z.Wh=function(a){a=a.getAttribute("aria-activedescendant");return a===i||a===l?a?"true":"false":a?String(a):""};M.z.hk=function(a){var b=M.z.Wh(a);return M.u(a).getElementById(b)};M.z.vk=function(a,b){M.z.jc(a,"activedescendant",b?b.id:"")};function Ad(a,b,c){O.call(this);this.target=a;this.handle=b||a;this.Mc=c||new Lc(NaN,NaN,NaN,NaN);this.m=M.u(a);this.ca=new uc(this);Q(this.handle,["touchstart","mousedown"],this.Zg,l,this)}B(Ad,R);var Bd=G||H&&K("1.9.3");q=Ad.prototype;q.clientX=0;q.clientY=0;q.screenX=0;q.screenY=0;q.$g=0;q.ah=0;q.eb=0;q.fb=0;q.uf=i;q.Qa=l;q.cg=0;q.vi=0;q.ni=l;q.Ka=l;q.Ta=n("ca");
q.g=function(){Ad.d.g.call(this);kc(this.handle,["touchstart","mousedown"],this.Zg,l,this);xc(this.ca);Bd&&this.m.releaseCapture();this.ca=this.handle=this.target=k};function Cd(a){t(a.ka)||(a.ka=Zc(a.target));return a.ka}
q.Zg=function(a){var b="mousedown"==a.type;if(this.uf&&!this.Qa&&(!b||(Wb?0==a.S.button:"click"==a.type||a.S.button&bc[0])&&(!I||!Za||!a.ctrlKey))){Dd(a);if(0==this.cg)if(this.dispatchEvent(new Ed("start",this,a.clientX,a.clientY,a)))this.Qa=i,a.preventDefault();else return;else a.preventDefault();var b=this.m,c=b.documentElement,d=!Bd;S(this.ca,b,["touchmove","mousemove"],this.ei,d);S(this.ca,b,["touchend","mouseup"],this.Ac,d);Bd?(c.setCapture(l),S(this.ca,c,"losecapture",this.Ac)):S(this.ca,M.ha(b),
"blur",this.Ac);G&&this.ni&&S(this.ca,b,"dragstart",Zb);this.Pi&&S(this.ca,this.Pi,"scroll",this.Hi,d);this.clientX=this.$g=a.clientX;this.clientY=this.ah=a.clientY;this.screenX=a.screenX;this.screenY=a.screenY;this.eb=this.Ka?dd(this.target):this.target.offsetLeft;this.fb=this.target.offsetTop;this.Ae=M.e(this.m).ea();this.vi=na()}else this.dispatchEvent("earlycancel")};
q.Ac=function(a,b){xc(this.ca);Bd&&this.m.releaseCapture();if(this.Qa){Dd(a);this.Qa=l;var c=Fd(this,this.eb),d=Gd(this,this.fb);this.dispatchEvent(new Ed("end",this,a.clientX,a.clientY,a,c,d,b||"touchcancel"==a.type))}else this.dispatchEvent("earlycancel");("touchend"==a.type||"touchcancel"==a.type)&&a.preventDefault()};
function Dd(a){var b=a.type;"touchstart"==b||"touchmove"==b?a.q(a.S.targetTouches[0],a.currentTarget):("touchend"==b||"touchcancel"==b)&&a.q(a.S.changedTouches[0],a.currentTarget)}
q.ei=function(a){if(this.uf){Dd(a);var b=(this.Ka&&Cd(this)?-1:1)*(a.clientX-this.clientX),c=a.clientY-this.clientY;this.clientX=a.clientX;this.clientY=a.clientY;this.screenX=a.screenX;this.screenY=a.screenY;if(!this.Qa){var d=this.$g-this.clientX,f=this.ah-this.clientY;if(d*d+f*f>this.cg)if(this.dispatchEvent(new Ed("start",this,a.clientX,a.clientY,a)))this.Qa=i;else{this.Sb||this.Ac(a);return}}c=Hd(this,b,c);b=c.x;c=c.y;this.Qa&&this.dispatchEvent(new Ed("beforedrag",this,a.clientX,a.clientY,a,
b,c))&&(Id(this,a,b,c),a.preventDefault())}};function Hd(a,b,c){var d=M.e(a.m).ea(),b=b+(d.x-a.Ae.x),c=c+(d.y-a.Ae.y);a.Ae=d;a.eb+=b;a.fb+=c;b=Fd(a,a.eb);a=Gd(a,a.fb);return new F(b,a)}q.Hi=function(a){var b=Hd(this,0,0);a.clientX=this.clientX;a.clientY=this.clientY;Id(this,a,b.x,b.y)};function Id(a,b,c,d){a.Ka&&Cd(a)?a.target.style.right=c+"px":a.target.style.left=c+"px";a.target.style.top=d+"px";a.dispatchEvent(new Ed("drag",a,b.clientX,b.clientY,b,c,d))}
function Fd(a,b){var c=a.Mc,d=!isNaN(c.left)?c.left:k,c=!isNaN(c.width)?c.width:0;return Math.min(d!=k?d+c:Infinity,Math.max(d!=k?d:-Infinity,b))}function Gd(a,b){var c=a.Mc,d=!isNaN(c.top)?c.top:k,c=!isNaN(c.height)?c.height:0;return Math.min(d!=k?d+c:Infinity,Math.max(d!=k?d:-Infinity,b))}function Ed(a,b,c,d,f,h,j,m){P.call(this,a);this.clientX=c;this.clientY=d;this.Zj=f;this.left=t(h)?h:b.eb;this.top=t(j)?j:b.fb;this.ek=b;this.dk=!!m}B(Ed,P);function Jd(a){O.call(this);this.c=a;a=G?"focusout":"blur";this.si=Q(this.c,G?"focusin":"focus",this,!G);this.ti=Q(this.c,a,this,!G)}B(Jd,R);Jd.prototype.handleEvent=function(a){var b=new ac(a.S);b.type="focusin"==a.type||"focus"==a.type?"focusin":"focusout";this.dispatchEvent(b)};Jd.prototype.g=function(){Jd.d.g.call(this);mc(this.si);mc(this.ti);delete this.c};function Kd(){}Kd.Nf=function(){return Kd.gg?Kd.gg:Kd.gg=new Kd};Kd.prototype.Ai=0;Kd.Nf();function Ld(a){O.call(this);this.A=a||M.e();this.ka=Md}B(Ld,R);Ld.prototype.mi=Kd.Nf();var Md=k;q=Ld.prototype;q.ra=k;q.W=l;q.c=k;q.ka=k;q.ui=k;q.ua=k;q.ya=k;q.vc=k;q.kh=l;function Nd(a){return a.ra||(a.ra=":"+(a.mi.Ai++).toString(36))}q.b=n("c");q.k=function(a){return this.c?this.A.k(a,this.c):[]};q.fa=function(a){return this.c?this.A.fa(a,this.c):k};q.Ta=function(){return this.nb||(this.nb=new uc(this))};q.He=function(a){this.ua&&this.ua!=a&&e(Error("Method not supported"));Ld.d.He.call(this,a)};
q.e=n("A");q.f=function(){this.c=this.A.createElement("div")};q.va=function(a){this.W&&e(Error("Component already rendered"));this.c||this.f();a?a.insertBefore(this.c,k):this.A.r().body.appendChild(this.c);(!this.ua||this.ua.W)&&this.Ra()};q.oa=function(a){this.W&&e(Error("Component already rendered"));if(a&&this.ff(a)){this.kh=i;if(!this.A||this.A.r()!=M.u(a))this.A=M.e(a);this.Pb(a);this.Ra()}else e(Error("Invalid element to decorate"))};q.ff=function(){return i};q.Pb=aa("c");
q.Ra=function(){this.W=i;Od(this,function(a){!a.W&&a.b()&&a.Ra()})};q.Sa=function(){Od(this,function(a){a.W&&a.Sa()});this.nb&&xc(this.nb);this.W=l};q.g=function(){Ld.d.g.call(this);this.W&&this.Sa();this.nb&&(this.nb.Pa(),delete this.nb);Od(this,function(a){a.Pa()});!this.kh&&this.c&&M.removeNode(this.c);this.ua=this.ui=this.c=this.vc=this.ya=k};q.Ud=n("c");q.kg=function(){this.ka==k&&(this.ka=Zc(this.W?this.c:this.A.r().body));return this.ka};function Od(a,b){a.ya&&E(a.ya,b,g)}
q.removeChild=function(a,b){if(a){var c=u(a)?a:Nd(a),d;this.vc&&c?(d=this.vc,d=(c in d?d[c]:g)||k):d=k;a=d;c&&a&&(d=this.vc,c in d&&delete d[c],Da(this.ya,a),b&&(a.Sa(),a.c&&M.removeNode(a.c)),c=a,c==k&&e(Error("Unable to set parent component")),c.ua=k,Ld.d.He.call(c,k))}a||e(Error("Child is not in parent component"));return a};q.gc=function(a){for(var b=[];this.ya&&0!=this.ya.length;)b.push(this.removeChild(this.ya?this.ya[0]||k:k,a));return b};function Pd(a,b){Ld.call(this,b);this.oj=!!a}B(Pd,Ld);q=Pd.prototype;q.Rd=k;q.La=l;q.C=k;q.s=k;q.aa=k;q.Yb=function(){return"goog-modalpopup"};q.Bc=n("C");q.f=function(){Pd.d.f.call(this);var a=this.b();M.a.add(a,this.Yb());M.gd(a,i);U(a,l);Qd(this);Rd(this)};function Qd(a){a.oj&&!a.s&&(a.s=M.U.Id(a.e()),a.s.className=a.Yb()+"-bg",U(a.s,l),Yc(a.s,0));a.C||(a.C=a.e().f("div",a.Yb()+"-bg"),U(a.C,l))}
function Rd(a){a.aa||(a.aa=a.e().createElement("span"),U(a.aa,l),M.gd(a.aa,i),a.aa.style.position="absolute")}q.ff=function(a){return!!a&&"DIV"==a.tagName};q.Pb=function(a){Pd.d.Pb.call(this,a);M.a.add(this.b(),this.Yb());Qd(this);Rd(this);U(this.b(),l)};q.Ra=function(){this.s&&M.Ic(this.s,this.b());M.Ic(this.C,this.b());Pd.d.Ra.call(this);M.he(this.aa,this.b());this.Rd=new Jd(this.e().r());S(this.Ta(),this.Rd,"focusin",this.Di)};
q.Sa=function(){this.La&&this.P(l);Vb(this.Rd);Pd.d.Sa.call(this);M.removeNode(this.s);M.removeNode(this.C);M.removeNode(this.aa)};q.P=function(a){a!=this.La&&(this.xb&&this.xb.stop(),this.Ib&&this.Ib.stop(),this.wb&&this.wb.stop(),this.Hb&&this.Hb.stop(),a?this.lc():this.ki())};
q.lc=function(){this.dispatchEvent("beforeshow")&&(this.Ce(),this.Ha(),S(this.Ta(),this.e().ha(),"resize",this.Ce),Sd(this,i),this.focus(),this.La=i,this.xb&&this.Ib?(jc(this.xb,"end",this.Uc,l,this),this.Ib.play(),this.xb.play()):this.Uc())};q.ki=function(){this.dispatchEvent("beforehide")&&(wc(this.Ta(),this.e().ha(),"resize",this.Ce),this.La=l,this.wb&&this.Hb?(jc(this.wb,"end",this.Sc,l,this),this.Hb.play(),this.wb.play()):this.Sc())};
function Sd(a,b){a.s&&U(a.s,b);a.C&&U(a.C,b);U(a.b(),b);U(a.aa,b)}q.Uc=function(){this.dispatchEvent("show")};q.Sc=function(){Sd(this,l);this.dispatchEvent("hide")};q.focus=function(){this.Df()};
q.Ce=function(){this.s&&U(this.s,l);this.C&&U(this.C,l);var a=this.e().r(),b=M.ga(M.ha(a)||window),c=Math.max(b.width,Math.max(a.body.scrollWidth,a.documentElement.scrollWidth)),a=Math.max(b.height,Math.max(a.body.scrollHeight,a.documentElement.scrollHeight));this.s&&(U(this.s,i),Wc(this.s,c,a));this.C&&(U(this.C,i),Wc(this.C,c,a))};
q.Ha=function(){var a=this.e().r(),b=M.ha(a)||window;if("fixed"==Qc(this.b()))var c=a=0;else c=this.e().ea(),a=c.x,c=c.y;var d=T(this.b()),b=M.ga(b),a=Math.max(a+b.width/2-d.width/2,0),c=Math.max(c+b.height/2-d.height/2,0);Rc(this.b(),a,c);Rc(this.aa,a,c)};q.Di=function(a){a.target==this.aa&&tc(this.Df,0,this)};q.Df=function(){try{G&&this.e().r().body.focus(),this.b().focus()}catch(a){}};q.g=function(){Vb(this.xb);this.xb=k;Vb(this.wb);this.wb=k;Vb(this.Ib);this.Ib=k;Vb(this.Hb);this.Hb=k;Pd.d.g.call(this)};function W(a,b,c){Pd.call(this,b,c);this.t=a||"modal-dialog";this.l=X(X(new Td,Ud,i),Vd,l,i)}B(W,Pd);q=W.prototype;q.Pd=i;q.be=i;q.rg=i;q.Mh=i;q.sc=0.5;q.nc="";q.Mb="";q.Ba=k;q.Jh=l;q.p=k;q.na=k;q.od=k;q.ma=k;q.H=k;q.j=k;q.Eg="dialog";q.Yb=n("t");q.Yf=n("nc");q.Ud=function(){this.b()||this.va();return this.H};q.Bc=function(){this.b()||this.va();return W.d.Bc.call(this)};function Wd(a,b){a.sc=b;if(a.b()){var c=a.Bc();c&&Yc(c,a.sc)}}
function Xd(a,b){a.b()&&M.a.enable(a.p,a.t+"-title-draggable",b);b&&!a.Ba?(a.Ba=new Ad(a.b(),a.p),M.a.add(a.p,a.t+"-title-draggable"),Q(a.Ba,"start",a.Ri,l,a)):!b&&a.Ba&&(a.Ba.Pa(),a.Ba=k)}
q.f=function(){W.d.f.call(this);var a=this.b(),b=this.e();this.p=b.f("div",{className:this.t+"-title",id:Nd(this)},this.na=b.f("span",this.t+"-title-text",this.nc),this.ma=b.f("span",this.t+"-title-close"));M.append(a,this.p,this.H=b.f("div",this.t+"-content"),this.j=b.f("div",this.t+"-buttons"));this.od=this.p.id;M.z.Je(a,this.Eg);M.z.jc(a,"labelledby",this.od||"");this.Mb&&(this.H.innerHTML=this.Mb);U(this.ma,this.be);this.l&&(a=this.l,a.c=this.j,a.va());U(this.j,!!this.l);Wd(this,this.sc)};
q.Pb=function(a){W.d.Pb.call(this,a);a=this.t+"-content";(this.H=M.h(k,a,this.b())[0])?this.Mb=this.H.innerHTML:(this.H=this.e().f("div",a),this.Mb&&(this.H.innerHTML=this.Mb),this.b().appendChild(this.H));var a=this.t+"-title",b=this.t+"-title-text",c=this.t+"-title-close";(this.p=M.h(k,a,this.b())[0])?(this.na=M.h(k,b,this.p)[0],this.ma=M.h(k,c,this.p)[0],this.p.id||(this.p.id=Nd(this))):(this.p=this.e().f("div",{className:a,id:Nd(this)}),this.b().insertBefore(this.p,this.H));this.od=this.p.id;
this.na?this.nc=M.mb(this.na):(this.na=this.e().f("span",b,this.nc),this.p.appendChild(this.na));M.z.jc(this.b(),"labelledby",this.od||"");this.ma||(this.ma=this.e().f("span",c),this.p.appendChild(this.ma));U(this.ma,this.be);a=this.t+"-buttons";(this.j=M.h(k,a,this.b())[0])?(this.l=new Td(this.e()),this.l.oa(this.j)):(this.j=this.e().f("div",a),this.b().appendChild(this.j),this.l&&(a=this.l,a.c=this.j,a.va()),U(this.j,!!this.l));Wd(this,this.sc)};
q.Ra=function(){W.d.Ra.call(this);S(S(this.Ta(),this.b(),"keydown",this.yg),this.b(),"keypress",this.yg);S(this.Ta(),this.j,"click",this.Ci);Xd(this,this.Mh);S(this.Ta(),this.ma,"click",this.Ii);M.z.Je(this.b(),this.Eg);""!==this.na.id&&M.z.jc(this.b(),"labelledby",this.na.id);if(!this.rg&&(this.rg=l,this.W)){var a=this.e(),b=this.Bc();a.removeNode(this.s);a.removeNode(b)}};q.Sa=function(){this.La&&this.P(l);Xd(this,l);W.d.Sa.call(this)};
q.P=function(a){a!=this.La&&(this.W||this.va(),W.d.P.call(this,a))};q.Uc=function(){W.d.Uc.call(this);this.dispatchEvent(Yd)};q.Sc=function(){W.d.Sc.call(this);this.dispatchEvent(Zd);this.Jh&&this.Pa()};
q.focus=function(){W.d.focus.call(this);if(this.l){var a=this.l.yc;if(a)for(var b=this.e().r(),c=this.j.getElementsByTagName("button"),d=0,f;f=c[d];d++)if(f.name==a){try{if(I||fb){var h=b.createElement("input");h.style.cssText="position:fixed;width:0;height:0;left:0;top:0;";this.b().appendChild(h);h.focus();this.b().removeChild(h)}f.focus()}catch(j){}break}}};
q.Ri=function(){var a=this.e().r(),b=M.ga(M.ha(a)||window),c=Math.max(a.body.scrollWidth,b.width),a=Math.max(a.body.scrollHeight,b.height),d=T(this.b());"fixed"==Qc(this.b())?(b=new Lc(0,0,Math.max(0,b.width-d.width),Math.max(0,b.height-d.height)),this.Ba.Mc=b||new Lc(NaN,NaN,NaN,NaN)):this.Ba.Mc=new Lc(0,0,c-d.width,a-d.height)||new Lc(NaN,NaN,NaN,NaN)};q.Ii=function(){if(this.be){var a=this.l,b=a&&a.Cd;b?(a=a.get(b),this.dispatchEvent(new $d(b,a))&&this.P(l)):this.P(l)}};
q.g=function(){this.j=this.ma=k;W.d.g.call(this)};q.Ci=function(a){a:{for(a=a.target;a!=k&&a!=this.j;){if("BUTTON"==a.tagName)break a;a=a.parentNode}a=k}if(a&&!a.disabled){var a=a.name,b=this.l.get(a);this.dispatchEvent(new $d(a,b))&&this.P(l)}};
q.yg=function(a){var b=l,c=l,d=this.l,f=a.target;if("keydown"==a.type)if(this.Pd&&27==a.keyCode){var h=d&&d.Cd,f="SELECT"==f.tagName&&!f.disabled;h&&!f?(c=i,b=d.get(h),b=this.dispatchEvent(new $d(h,b))):f||(b=i)}else 9==a.keyCode&&(a.shiftKey&&f==this.b())&&(c=i);else if(13==a.keyCode){if("BUTTON"==f.tagName)h=f.name;else if(d){var j=d.yc,m;if(m=j)a:{m=d.c.getElementsByTagName("BUTTON");for(var p=0,s;s=m[p];p++)if(s.name==j||s.id==j){m=s;break a}m=k}f=("TEXTAREA"==f.tagName||"SELECT"==f.tagName)&&
!f.disabled;m&&(!m.disabled&&!f)&&(h=j)}h&&d&&(c=i,b=this.dispatchEvent(new $d(h,String(d.get(h)))))}if(b||c)a.stopPropagation(),a.preventDefault();b&&this.P(l)};function $d(a,b){this.type=ae;this.key=a;this.caption=b}B($d,P);var ae="dialogselect",Zd="afterhide",Yd="aftershow";function Td(a){this.A=a||M.e();Ra.call(this)}B(Td,Ra);q=Td.prototype;q.t="goog-buttonset";q.yc=k;q.c=k;q.Cd=k;q.set=function(a,b,c,d){Ra.prototype.set.call(this,a,b);c&&(this.yc=a);d&&(this.Cd=a);return this};
function X(a,b,c,d){return a.set(b.key,b.caption,c,d)}q.va=function(){if(this.c){this.c.innerHTML="";var a=M.e(this.c);Qa(this,function(b,c){var d=a.f("button",{name:c},b);c==this.yc&&(d.className=this.t+"-default");this.c.appendChild(d)},this)}};q.oa=function(a){if(a&&1==a.nodeType){this.c=a;for(var a=this.c.getElementsByTagName("button"),b=0,c,d,f;c=a[b];b++)if(d=c.name||c.id,f=M.mb(c)||c.value,d){var h=0==b;this.set(d,f,h,c.name==be);h&&M.a.add(c,this.t+"-default")}}};q.b=n("c");q.e=n("A");
var be="cancel",ce=oa("OK"),de=oa("Cancel"),ee=oa("Yes"),fe=oa("No"),ge=oa("Save"),he=oa("Continue"),Ud={key:"ok",caption:ce},Vd={key:be,caption:de},ie={key:"yes",caption:ee},je={key:"no",caption:fe},ke={key:"save",caption:ge},le={key:"continue",caption:he};"undefined"!=typeof document&&(X(new Td,Ud,i,i),X(X(new Td,Ud,i),Vd,l,i),X(X(new Td,ie,i),je,l,i),X(X(X(new Td,ie),je,i),Vd,l,i),X(X(X(new Td,le),ke),Vd,i,i));var me,ne,oe,pe,qe,re,se;se=re=qe=pe=oe=ne=me=l;var te=bb();te&&(-1!=te.indexOf("Firefox")?me=i:-1!=te.indexOf("Camino")?ne=i:-1!=te.indexOf("iPhone")||-1!=te.indexOf("iPod")?oe=i:-1!=te.indexOf("iPad")?pe=i:-1!=te.indexOf("Android")?qe=i:-1!=te.indexOf("Chrome")?re=i:-1!=te.indexOf("Safari")&&(se=i));var ue=me,ve=ne,we=oe,xe=pe,ye=qe,ze=re,Ae=se;function Be(a,b,c,d,f){function h(a){a&&(a.tabIndex=0,M.z.Je(a,"tab"),M.a.add(a,"goog-zippy-header"),a&&S(j.sg,a,"click",j.Ei),a&&S(j.mg,a,"keydown",j.Fi))}O.call(this);this.A=f||M.e();this.jb=this.A.b(a)||k;this.Nd=this.A.b(d||k);this.ib=(this.se=ga(b)?b:k)||!b?k:this.A.b(b);this.Wb=c==i;this.mg=new uc(this);this.sg=new uc(this);var j=this;h(this.jb);h(this.Nd);Ce(this,this.Wb)}B(Be,R);q=Be.prototype;q.g=function(){Be.d.g.call(this);Vb(this.mg);Vb(this.sg)};q.Ud=n("ib");
q.collapse=function(){Ce(this,l)};q.toggle=function(){Ce(this,!this.Wb)};function Ce(a,b){a.ib?U(a.ib,b):b&&a.se&&(a.ib=a.se());a.ib&&M.a.add(a.ib,"goog-zippy-content");a.Nd?(U(a.jb,!b),U(a.Nd,b)):a.jb&&(M.a.enable(a.jb,"goog-zippy-expanded",b),M.a.enable(a.jb,"goog-zippy-collapsed",!b),M.z.jc(a.jb,"expanded",b));a.Wb=b;a.dispatchEvent(new De("toggle",a,a.Wb))}q.Fi=function(a){if(13==a.keyCode||32==a.keyCode)this.toggle(),this.dispatchEvent(new P("action",this)),a.preventDefault(),a.stopPropagation()};
q.Ei=function(){this.toggle();this.dispatchEvent(new P("action",this))};function De(a,b,c){P.call(this,a,b);this.Ph=c}B(De,P);function Ee(a){return(a=a.exec(bb()))?a[1]:""}var Fe=function(){if(ue)return Ee(/Firefox\/([0-9.]+)/);if(G||fb)return kb;if(ze)return Ee(/Chrome\/([0-9.]+)/);if(Ae)return Ee(/Version\/([0-9.]+)/);if(we||xe){var a=/Version\/(\S+).*Mobile\/(\S+)/.exec(bb());if(a)return a[1]+"."+a[2]}else{if(ye)return(a=Ee(/Android\s+([0-9.]+)/))?a:Ee(/Version\/([0-9.]+)/);if(ve)return Ee(/Camino\/([0-9.]+)/)}return""}();function Ge(a,b,c,d,f){Hc.call(this,[c.left,c.top],[c.right,c.bottom],d,f);this.c=a;this.Ab=b}B(Ge,Hc);Ge.prototype.ta=function(){this.c.style.backgroundPosition=-Math.floor(this.coords[0]/this.Ab.width)*this.Ab.width+"px "+-Math.floor(this.coords[1]/this.Ab.height)*this.Ab.height+"px";Ge.d.ta.call(this)};Ge.prototype.ze=function(){this.play(i);Ge.d.ze.call(this)};Ge.prototype.g=function(){Ge.d.g.call(this);this.c=k};M.forms={};M.forms.ik=function(a){var b=new Ra;M.forms.Lf(a,b,M.forms.sh);return b};M.forms.jk=function(a){var b=[];M.forms.Lf(a,b,M.forms.th);return b.join("&")};
M.forms.Lf=function(a,b,c){for(var d=a.elements,f,h=0;f=d[h];h++)if(!(f.form!=a||f.disabled||"fieldset"==f.tagName.toLowerCase())){var j=f.name;switch(f.type.toLowerCase()){case "file":case "submit":case "reset":case "button":break;case "select-multiple":f=M.forms.Da(f);if(f!=k)for(var m,p=0;m=f[p];p++)c(b,j,m);break;default:m=M.forms.Da(f),m!=k&&c(b,j,m)}}d=a.getElementsByTagName("input");for(h=0;f=d[h];h++)f.form==a&&"image"==f.type.toLowerCase()&&(j=f.name,c(b,j,f.value),c(b,j+".x","0"),c(b,j+
".y","0"))};M.forms.sh=function(a,b,c){var d=a.get(b);d||(d=[],a.set(b,d));d.push(c)};M.forms.th=function(a,b,c){a.push(encodeURIComponent(b)+"="+encodeURIComponent(c))};M.forms.nk=function(a){for(var a=a.elements,b,c=0;b=a[c];c++)if(!b.disabled&&b.type&&"file"==b.type.toLowerCase())return i;return l};M.forms.Og=function(a,b){if("FORM"==a.tagName)for(var c=a.elements,d=0;a=c[d];d++)M.forms.Og(a,b);else b==i&&a.blur(),a.disabled=b};M.forms.fk=function(a){a.focus();a.select&&a.select()};
M.forms.ok=function(a){return!!M.forms.Da(a)};M.forms.pk=function(a,b){return!!M.forms.Zh(a,b)};M.forms.Da=function(a){var b=a.type;if(!t(b))return k;switch(b.toLowerCase()){case "checkbox":case "radio":return M.forms.Th(a);case "select-one":return M.forms.Vh(a);case "select-multiple":return M.forms.Uh(a);default:return t(a.value)?a.value:k}};M.sj=M.forms.Da;M.forms.Zh=function(a,b){var c=a.elements[b];if(c.type)return M.forms.Da(c);for(var d=0;d<c.length;d++){var f=M.forms.Da(c[d]);if(f)return f}return k};
M.forms.Th=function(a){return a.checked?a.value:k};M.forms.Vh=function(a){var b=a.selectedIndex;return 0<=b?a.options[b].value:k};M.forms.Uh=function(a){for(var b=[],c,d=0;c=a.options[d];d++)c.selected&&b.push(c.value);return b.length?b:k};M.forms.wk=function(a,b){var c=a.type;if(t(c))switch(c.toLowerCase()){case "checkbox":case "radio":M.forms.Si(a,b);break;case "select-one":M.forms.Wi(a,b);break;case "select-multiple":M.forms.Vi(a,b);break;default:a.value=b!=k?b:""}};
M.forms.Si=function(a,b){a.checked=b?"checked":k};M.forms.Wi=function(a,b){a.selectedIndex=-1;if(u(b))for(var c,d=0;c=a.options[d];d++)if(c.value==b){c.selected=i;break}};M.forms.Vi=function(a,b){u(b)&&(b=[b]);for(var c,d=0;c=a.options[d];d++)if(c.selected=l,b)for(var f,h=0;f=b[h];h++)c.value==f&&(c.selected=i)};/*
 Portions of this code are from the Dojo Toolkit, received by
 The Closure Library Authors under the BSD license. All other code is
 Copyright 2005-2009 The Closure Library Authors. All Rights Reserved.

The "New" BSD License:

Copyright (c) 2005-2009, The Dojo Foundation
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

 Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
 Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation
    and/or other materials provided with the distribution.
 Neither the name of the Dojo Foundation nor the names of its contributors
    may be used to endorse or promote products derived from this software
    without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
var He=M;function Ie(a,b){var c=b||[];a&&c.push(a);return c}var Je=I&&"BackCompat"==M.r().compatMode,Ke=M.r().firstChild.children?"children":"childNodes",Le=l;
function Me(a){function b(){0<=s&&(w.id=c(s,D).replace(/\\/g,""),s=-1);if(0<=J){var a=J==D?k:c(J,D);0>">~+".indexOf(a)?w.G=a:w.Vc=a;J=-1}0<=p&&(w.a.push(c(p+1,D).replace(/\\/g,"")),p=-1)}function c(b,c){return qa(a.slice(b,c))}for(var a=0<=">~+".indexOf(a.slice(-1))?a+" * ":a+" ",d=[],f=-1,h=-1,j=-1,m=-1,p=-1,s=-1,J=-1,y="",v="",ca,D=0,Kg=a.length,w=k,Z=k;y=v,v=a.charAt(D),D<Kg;D++)if("\\"!=y)if(w||(ca=D,w={B:k,Ya:[],rc:[],a:[],G:k,Vc:k,id:k,$d:function(){return Le?this.Mi:this.G}},J=D),0<=f)if("]"==
v){Z.xd?Z.ve=c(j||f+1,D):Z.xd=c(f+1,D);if((f=Z.ve)&&('"'==f.charAt(0)||"'"==f.charAt(0)))Z.ve=f.slice(1,-1);w.rc.push(Z);Z=k;f=j=-1}else"="==v&&(j=0<="|~^$*".indexOf(y)?y:"",Z.type=j+v,Z.xd=c(f+1,D-j.length),j=D+1);else 0<=h?")"==v&&(0<=m&&(Z.value=c(h+1,D)),m=h=-1):"#"==v?(b(),s=D+1):"."==v?(b(),p=D):":"==v?(b(),m=D):"["==v?(b(),f=D,Z={}):"("==v?(0<=m&&(Z={name:c(m+1,D),value:k},w.Ya.push(Z)),h=D):" "==v&&y!=v&&(b(),0<=m&&w.Ya.push({name:c(m+1,D)}),w.pg=w.Ya.length||w.rc.length||w.a.length,w.sk=
w.B=c(ca,D),w.Mi=w.G=w.Vc?k:w.G||"*",w.G&&(w.G=w.G.toUpperCase()),d.length&&d[d.length-1].Vc&&(w.dg=d.pop(),w.B=w.dg.B+" "+w.B),d.push(w),w=k);return d}function Ne(a,b){return!a?b:!b?a:function(){return a.apply(window,arguments)&&b.apply(window,arguments)}}function Oe(a){return 1==a.nodeType}function Pe(a,b){return!a?"":"class"==b?a.className||"":"for"==b?a.htmlFor||"":"style"==b?a.style.cssText||"":(Le?a.getAttribute(b):a.getAttribute(b,2))||""}
var Qe={"*=":function(a,b){return function(c){return 0<=Pe(c,a).indexOf(b)}},"^=":function(a,b){return function(c){return 0==Pe(c,a).indexOf(b)}},"$=":function(a,b){return function(c){c=" "+Pe(c,a);return c.lastIndexOf(b)==c.length-b.length}},"~=":function(a,b){var c=" "+b+" ";return function(b){return 0<=(" "+Pe(b,a)+" ").indexOf(c)}},"|=":function(a,b){b=" "+b;return function(c){c=" "+Pe(c,a);return c==b||0==c.indexOf(b+"-")}},"=":function(a,b){return function(c){return Pe(c,a)==b}}},Re="undefined"==
typeof M.r().firstChild.nextElementSibling,Se=!Re?"nextElementSibling":"nextSibling",Te=!Re?"previousElementSibling":"previousSibling",Ue=Re?Oe:Bc;function Ve(a){for(;a=a[Te];)if(Ue(a))return l;return i}function We(a){for(;a=a[Se];)if(Ue(a))return l;return i}function Xe(a){var b=a.parentNode,c=0,d=b[Ke],f=a._i||-1,h=b._l||-1;if(!d)return-1;d=d.length;if(h==d&&0<=f&&0<=h)return f;b._l=d;f=-1;for(b=b.firstElementChild||b.firstChild;b;b=b[Se])Ue(b)&&(b._i=++c,a===b&&(f=c));return f}
function Ye(a){return!(Xe(a)%2)}function Ze(a){return Xe(a)%2}
var af={checked:function(){return function(a){return a.checked||a.attributes.checked}},"first-child":function(){return Ve},"last-child":function(){return We},"only-child":function(){return function(a){return!Ve(a)||!We(a)?l:i}},empty:function(){return function(a){for(var b=a.childNodes,a=a.childNodes.length-1;0<=a;a--){var c=b[a].nodeType;if(1===c||3==c)return l}return i}},contains:function(a,b){var c=b.charAt(0);if('"'==c||"'"==c)b=b.slice(1,-1);return function(a){return 0<=a.innerHTML.indexOf(b)}},
not:function(a,b){var c=Me(b)[0],d={hb:1};"*"!=c.G&&(d.G=1);c.a.length||(d.a=1);var f=$e(c,d);return function(a){return!f(a)}},"nth-child":function(a,b){if("odd"==b)return Ze;if("even"==b)return Ye;if(-1!=b.indexOf("n")){var c=b.split("n",2),d=c[0]?"-"==c[0]?-1:parseInt(c[0],10):1,f=c[1]?parseInt(c[1],10):0,h=0,j=-1;0<d?0>f?f=f%d&&d+f%d:0<f&&(f>=d&&(h=f-f%d),f%=d):0>d&&(d*=-1,0<f&&(j=f,f%=d));if(0<d)return function(a){a=Xe(a);return a>=h&&(0>j||a<=j)&&a%d==f};b=f}var m=parseInt(b,10);return function(a){return Xe(a)==
m}}},bf=G?function(a){var b=a.toLowerCase();"class"==b&&(a="className");return function(c){return Le?c.getAttribute(a):c[a]||c[b]}}:function(a){return function(b){return b&&b.getAttribute&&b.hasAttribute(a)}};
function $e(a,b){if(!a)return Bc;var b=b||{},c=k;b.hb||(c=Ne(c,Oe));b.G||"*"!=a.G&&(c=Ne(c,function(b){return b&&b.tagName==a.$d()}));b.a||E(a.a,function(a,b){var h=RegExp("(?:^|\\s)"+a+"(?:\\s|$)");c=Ne(c,function(a){return h.test(a.className)});c.count=b});b.Ya||E(a.Ya,function(a){var b=a.name;af[b]&&(c=Ne(c,af[b](b,a.value)))});b.rc||E(a.rc,function(a){var b,h=a.xd;a.type&&Qe[a.type]?b=Qe[a.type](h,a.ve):h.length&&(b=bf(h));b&&(c=Ne(c,b))});b.id||a.id&&(c=Ne(c,function(b){return!!b&&b.id==a.id}));
c||"default"in b||(c=Bc);return c}var cf={};
function df(a){var b=cf[a.B];if(b)return b;var c=a.dg,c=c?c.Vc:"",d=$e(a,{hb:1}),f="*"==a.G,h=M.r().getElementsByClassName;if(c)if(h={hb:1},f&&(h.G=1),d=$e(a,h),"+"==c)var j=d,b=function(a,b,c){for(;a=a[Se];)if(!Re||Oe(a)){(!c||ef(a,c))&&j(a)&&b.push(a);break}return b};else if("~"==c)var m=d,b=function(a,b,c){for(a=a[Se];a;){if(Ue(a)){if(c&&!ef(a,c))break;m(a)&&b.push(a)}a=a[Se]}return b};else{if(">"==c)var p=d,p=p||Bc,b=function(a,b,c){for(var d=0,f=a[Ke];a=f[d++];)Ue(a)&&((!c||ef(a,c))&&p(a,d))&&
b.push(a);return b}}else if(a.id)d=!a.pg&&f?Bc:$e(a,{hb:1,id:1}),b=function(b,c){var f=M.e(b).b(a.id),h;if(h=f&&d(f))if(!(h=9==b.nodeType)){for(h=f.parentNode;h&&h!=b;)h=h.parentNode;h=!!h}if(h)return Ie(f,c)};else if(h&&/\{\s*\[native code\]\s*\}/.test(String(h))&&a.a.length&&!Je)var d=$e(a,{hb:1,a:1,id:1}),s=a.a.join(" "),b=function(a,b){for(var c=Ie(0,b),f,h=0,j=a.getElementsByClassName(s);f=j[h++];)d(f,a)&&c.push(f);return c};else!f&&!a.pg?b=function(b,c){for(var d=Ie(0,c),f,h=0,j=b.getElementsByTagName(a.$d());f=
j[h++];)d.push(f);return d}:(d=$e(a,{hb:1,G:1,id:1}),b=function(b,c){for(var f=Ie(0,c),h,j=0,m=b.getElementsByTagName(a.$d());h=m[j++];)d(h,b)&&f.push(h);return f});return cf[a.B]=b}var ff={},gf={};function hf(a){var b=Me(qa(a));if(1==b.length){var c=df(b[0]);return function(a){if(a=c(a,[]))a.Qc=i;return a}}return function(a){for(var a=Ie(a),c,h,j=b.length,m,p,s=0;s<j;s++){p=[];c=b[s];h=a.length-1;0<h&&(m={},p.Qc=i);h=df(c);for(var J=0;c=a[J];J++)h(c,p,m);if(!p.length)break;a=p}return p}}
var jf=!!M.r().querySelectorAll&&(!I||K("526"));
function kf(a,b){if(jf){var c=gf[a];if(c&&!b)return c}if(c=ff[a])return c;var c=a.charAt(0),d=-1==a.indexOf(" ");0<=a.indexOf("#")&&d&&(b=i);if(jf&&!b&&-1==">~+".indexOf(c)&&(!G||-1==a.indexOf(":"))&&!(Je&&0<=a.indexOf("."))&&-1==a.indexOf(":contains")&&-1==a.indexOf("|=")){var f=0<=">~+".indexOf(a.charAt(a.length-1))?a+" *":a;return gf[a]=function(b){try{9==b.nodeType||d||e("");var c=b.querySelectorAll(f);G?c.Ch=i:c.Qc=i;return c}catch(h){return kf(a,i)(b)}}}var h=a.split(/\s*,\s*/);return ff[a]=
2>h.length?hf(a):function(a){for(var b=0,c=[],d;d=h[b++];)c=c.concat(hf(d)(a));return c}}var lf=0,mf=G?function(a){return Le?a.getAttribute("_uid")||a.setAttribute("_uid",++lf)||lf:a.uniqueID}:function(a){return a._uid||(a._uid=++lf)};function ef(a,b){if(!b)return 1;var c=mf(a);return!b[c]?b[c]=1:0}
function nf(a){if(a&&a.Qc)return a;var b=[];if(!a||!a.length)return b;a[0]&&b.push(a[0]);if(2>a.length)return b;lf++;if(G&&Le){var c=lf+"";a[0].setAttribute("_zipIdx",c);for(var d=1,f;f=a[d];d++)a[d].getAttribute("_zipIdx")!=c&&b.push(f),f.setAttribute("_zipIdx",c)}else if(G&&a.Ch)try{for(d=1;f=a[d];d++)Oe(f)&&b.push(f)}catch(h){}else{a[0]&&(a[0]._zipIdx=lf);for(d=1;f=a[d];d++)a[d]._zipIdx!=lf&&b.push(f),f._zipIdx=lf}return b}
function of(a,b){if(!a)return[];if(a.constructor==Array)return a;if(!u(a))return[a];if(u(b)&&(b=M.b(b),!b))return[];var b=b||M.r(),c=b.ownerDocument||b.documentElement;Le=b.contentType&&"application/xml"==b.contentType||fb&&(b.doctype||"[object XMLDocument]"==c.toString())||!!c&&(G?c.xml:b.xmlVersion||c.xmlVersion);return(c=kf(a)(b))&&c.Qc?c:nf(c)}of.Ya=af;He.B=of;A("goog.dom.query",M.B);A("goog.dom.query.pseudos",M.B.Ya);var pf=/Mac OS X.+Silk\//,qf=/iPhone|iPod|iPad/.test(navigator.userAgent)||-1!=navigator.userAgent.indexOf("Android")||pf.test(navigator.userAgent),rf=window.navigator.msPointerEnabled,sf=qf?"touchstart":rf?"MSPointerDown":"mousedown";function tf(a,b){var c=a.N,d=new Bb(a.kb);return c.Ma(b)?c.T(b):d.T(b)}function uf(a,b,c){var d=a.N;d.Ma(b);c&&c.length&&(Mb(d,b,c),Ab(a,d))}
function vf(a){a=a||{};this.J=M.b(a.carouselId);this.vh="animInDuration"in a?a.animInDuration:wf;this.wh="animOutDuration"in a?a.animOutDuration:800;this.Ng=a.selectedTabClass||"tab-on";this.pb="isTimerSet"in a?a.isTimerSet:l;this.xi=a.navPreviousClass||"nav-previous";this.wi=a.navNextClass||"nav-next";this.dj=a.tabContainerClass||"tabs";this.hj="timerDuration"in a?a.timerDuration:5E3;this.wa=[];this.w=this.Aa=k;this.ab=0;this.ie=l;this.ej=M.h("",this.dj,this.J)[0];this.Db=M.h("li","",this.ej);this.ad=
M.h("",this.xi,this.J)[0];this.wg=M.h("",this.wi,this.J)[0];this.Vb=new uc(this);1<this.Db.length?(this.rf(),this.pb&&this.Ld(),xf(this),this.Ge(),this.wa[0].show()):1==this.Db.length&&(this.Db[0].parentNode.style.display="none",this.ad&&(this.ad.parentNode.style.display="none"),this.pb&&this.Ld(),xf(this),this.Ge())}A("gweb.ui.TimedCarousel",vf);var wf=800;q=vf.prototype;q.Ge=function(){this.pb&&(S(this.Vb,this.J,"mouseover",this.Tb),S(this.Vb,this.J,"mouseout",z(this.Kd,this.ab)))};
q.rf=function(){E(this.Db,function(a,b){var c=new yf(a,this,b);this.wa.push(c);c.md.style.display="none"},this)};q.Ld=function(){Vb(this.w);this.w=new qc(this.hj);this.w.start();S(this.Vb,this.w,sc,function(){this.wa[this.ab].show();this.ab==this.wa.length-1?this.ab=0:this.ab++})};q.Kd=function(a){this.ab=a;this.w.start()};q.Tb=function(){this.w&&this.w.stop()};
function xf(a){a.ad&&S(a.Vb,a.ad,"click",function(a){zf(this,0<this.Aa.index?this.Aa.index-1:this.wa.length-1);a.preventDefault()});a.wg&&S(a.Vb,a.wg,"click",function(a){this.next();a.preventDefault()})}q.next=function(){var a=this.Aa.index<this.wa.length-1?this.Aa.index+1:0;zf(this,a);return a};function zf(a,b){a.pb&&a.Tb();a.wa[b].show();a.pb&&a.Kd(b)}var Af=/tab-(.*)$/;
function yf(a,b,c){this.index=c;this.J=a;this.parent=b;a=this.J.id?this.J.id.match(Af)[1]:M.h("a","",this.J)[0].href.split("#")[1];this.md=M.b(a);Q(this.J,"click",function(a){zf(this.parent,this.index);a.preventDefault()},l,this)}
yf.prototype.show=function(){if(this.parent.ie)return k;if(this!=this.parent.Aa){this.parent.Aa&&this.parent.Aa.de();this.parent.pb&&this.parent.Kd(this.index);var a=new ld(this.md,this.parent.vh);Q(a,"begin",this.af,l,this);Q(a,"end",this.pc,l,this);a.play();M.a.add(this.J,this.parent.Ng);this.parent.Aa=this;return this}return k};yf.prototype.de=function(){var a=new kd(this.md,this.parent.wh);Q(a,"begin",this.af,l,this);Q(a,"end",this.pc,l,this);a.play();M.a.remove(this.J,this.parent.Ng);return this};
yf.prototype.af=function(){this.parent.ie=i};yf.prototype.pc=function(){this.parent.ie=l};function Y(a,b){W.call(this,Bf,i);this.kf=a||Cf;this.dc=Bf+"-"+this.kf;this.fe=this.dc+"-iframe";this.nc=b||"";this.R=[];this.ba=k;this.Bf=i;this.X=this.c;this.oe=this.I=this.tg=this.ug=this.D=this.da=this.F=this.V=k;this.ja=0;this.Xc=l;this.kc=i;this.wd=this.Kg=l;this.zi=Df;this.yi=Ef;this.Bh=Ff;this.ii=l;this.Wc=-1;this.ub=l;this.Nc=new yd;this.Rb=this.hd=l;this.yh=i}B(Y,W);A("gweb.ui.LightBox",Y);
var Bf="gweb-lightbox",Gf=qf?"touchstart":rf?"MSPointerDown":"click",Ff="\u00d7",Df="\u2039",Ef="\u203a",Hf=/\.(gif|jpg|jpeg|png|webp)$/i,If=/^#/,Jf=/\/\/(www\.)?youtube\.com/,Cf="lb";q=Y.prototype;q.Ti=aa("kc");q.Ui=aa("Kg");q.Qi=aa("wd");q.Hh=function(){this.kc=l;this.Rb=i};
q.q=function(){var a=M.k(this.kf);E(a,function(a){var c=new Kf(a),d=this.R;0<=Ba(d,c)||d.push(c);M.dataset.set(a,"lightboxIndex",this.R.length-1);Q(a,Gf,function(c){c.preventDefault();this.Ke(a)},l,this);-1==this.Wc&&c.href.match(Jf)&&(this.Wc=1)},this);Wd(this,0.8);this.Pd=i;this.l=k;this.j&&(this.l?(a=this.l,a.c=this.j,a.va()):this.j.innerHTML="",U(this.j,!!this.l));this.va();1==this.Wc&&M.a.add(this.X,"gweb-lightbox-outside-nav");this.ja=Math.ceil(2*cd(this.X).top);this.Rb||(a=new pd(document),
Q(a,"key",this.ci,l,this));Q(this,"imageloaded",z(this.Ed,this.F),l,this);Q(this,"iframeloaded",z(this.Ed,this.V),l,this);Q(this,"fragmentloaded",z(this.Ed,this.da),l,this);this.yh&&Q(this.C,Gf,z(this.P,l),l,this);Q(this,Zd,this.wc,l,this);Q(this,"navigateprev",z(this.Ke,this.ug),l,this);Q(this,"navigatenext",z(this.Ke,this.tg),l,this);Q(window,"resize",z(this.Ha,this.Fg),l,this);"opacity"in window.document.body.style&&(this.hd=i)};
q.f=function(){Y.d.f.call(this);M.appendChild(this.ma,M.createTextNode(this.Bh));this.c.setAttribute("id",this.dc);this.j&&(this.D=M.f("div","gweb-lightbox-caption gweb-lightbox-hide"),M.appendChild(this.j,this.D));this.kc&&1<this.R.length&&this.na?(this.oe=M.f("span"),M.appendChild(this.na,this.oe)):this.kc=l;this.X=this.c;this.Rb?U(this.j,i):(this.ug=Lf(this,"gweb-lightbox-prev"),this.tg=Lf(this,"gweb-lightbox-next"));E(this.R,function(a){!this.F&&"IMG"==a.type?(this.F=M.f("img",{id:this.dc+"-image",
src:"//www.google.com/images/cleardot.gif"}),Wc(this.F,200,200),M.appendChild(this.H,this.F)):!this.V&&"IFRAME"==a.type?(this.V=M.U.Id(M),this.V.id=this.fe,this.V.name=this.fe,M.append(this.H,this.V)):!this.da&&"A"==a.type&&(this.da=M.f("div",{id:this.dc+"-fragment","class":Bf+"-fragment"}),M.append(this.H,this.da))},this)};q.ci=function(a){if(this.La&&!this.Rb)switch(a.keyCode){case 37:(this.ub||0!=this.ba)&&this.dispatchEvent("navigateprev");break;case 39:(this.ub||this.ba!=this.R.length-1)&&this.dispatchEvent("navigatenext")}};
function Mf(a,b){b?(M.a.remove(a.D,"gweb-lightbox-hide"),a.D.innerHTML=b,a.Xc&&M.a.add(a.D,"gweb-lightbox-overlay")):(a.D.innerHTML="",M.a.add(a.D,"gweb-lightbox-hide"));U(a.D,l)}q.Qg=function(){U(this.D,i);this.wd&&(new jd(this.D,200)).play()};function Nf(a){a=M.dataset.get(a,"lightboxIndex");return parseInt(a,10)}
function Lf(a,b){var c=M.f("span","","gweb-lightbox-next"==b?a.yi:a.zi),d=M.f("img",{src:"//www.google.com/images/cleardot.gif",alt:""}),c=M.f("a",{"class":"gweb-lightbox-nav "+b,href:"#"},[c,d]);U(c,l);M.appendChild(a.j,c);U(a.j,i);Q(c,Gf,function(a){a.preventDefault();"gweb-lightbox-next"==b?this.dispatchEvent("navigatenext"):this.dispatchEvent("navigateprev")},l,a);return c}
function Of(a,b,c){b=M.Cc(b);b.style.visibility="visible";"gweb-lightbox-prev"==c?b.style.left="0":"gweb-lightbox-next"==c&&(b.style.right="0");tc(z(a.Qh,b),2E3,a)}q.Qh=function(a){a=new id(a,500);Q(a,"end",this.hi,l,this);a.play()};q.hi=function(a){a=a.target.element;a.style.visibility="hidden";a.style.opacity=1;a.style.filter=""};q.Ke=function(a){this.Rg(Nf(a))};
q.Rg=function(a){if(this.R&&a<=this.R.length-1){this.ba=a;var b=this.R[this.ba];Mf(this,"");this.La||(this.P(i),a=new jd(this.X,200),this.hd||Q(a,"end",z(Mc,this.X,"filter",""),l,this),a.play());this.kc&&(this.oe.innerHTML=this.ba+1+"/"+this.R.length);this.Fg=T(this.X);switch(b.type){case "A":this.wc("A");Pf(this,i,this.da);Wc(this.da,b.width,b.height);this.I=new N(b.width,b.height);a=b.href.split("#");1<a.length?(a=M.b(a[1]).cloneNode(i),M.append(this.da,a.childNodes),this.dispatchEvent("fragmentloaded")):
e(Error("Invalid url:"+b.href));break;case "IFRAME":this.wc("IFRAME");Pf(this,i,this.F);jc(this.V,"load",function(a){a.preventDefault();this.V.width=b.width;this.V.height=b.height;this.I=new N(b.width,b.height);this.dispatchEvent("iframeloaded")},l,this);Qf(this,b.href);break;case "IMG":var c=M.ga(window),a=this.dc+"-image";this.wc("IMG");if(this.Nc){var d=b.href;(d=u(d)?d:d.src)&&(this.Nc.$b[a]=d);this.Nc.start()}Pf(this,i,this.F);jc(this.Nc,"load",function(a){a=a.target;this.F.src=a.src;if(this.Kg){var b=
$c(this.p).height,d=T(this.D).height+this.ja,b=this.Xc?c.height-this.ja-b:c.height-this.ja-b-d,d=1==this.Wc?c.width-3*this.ja:c.width-this.ja;a.height>b||a.width>d?(d=Math.min(d/a.width-0.1,b/a.height-0.05),b=Math.floor(a.width*d),a=Math.floor(a.height*d),Wc(this.F,b,a),this.I=new N(b,a)):(Wc(this.F,a.width,a.height),this.I=new N(a.width,a.height))}else Wc(this.F,a.width,a.height),this.I=new N(a.width,a.height);this.dispatchEvent("imageloaded")},l,this)}}};
function Qf(a,b){try{var c=window.frames[a.fe];c&&c.location.replace(b)}catch(d){}}q.wc=function(a){this.V&&("IFRAME"!=a&&Qf(this,"//www.google.com/images/cleardot.gif"),U(this.V,!a||"IFRAME"==a));this.F&&("IMG"!=a&&(this.F.src="//www.google.com/images/cleardot.gif"),U(this.F,!a||"IMG"==a));this.da&&(M.gc(this.da),U(this.da,!a||"A"==a))};function Pf(a,b,c){M.a.enable(a.X,"gweb-lightbox-loading",b);a.hd&&c&&(b?Yc(c,0.5):(new jd(c,500)).play())}
q.Ed=function(a){var b=this.R[this.ba],c=200<this.I.width?this.I.width:200;this.X.style.width=Sc(c,i);this.D.style.width=Sc(c,i);Mf(this,b.title);this.Ha(this.Fg);if(!this.Rb){var d=this.R.length,b=M.fa("gweb-lightbox-prev",this.j),c=M.fa("gweb-lightbox-next",this.j),f=M.h("img",k,this.j);0==this.ba?this.ub?(U(b,i),M.dataset.set(b,"lightboxIndex",d-1)):U(b,l):(U(b,i),M.dataset.set(b,"lightboxIndex",this.ba-1));this.ba+1==d?this.ub?(U(c,i),M.dataset.set(c,"lightboxIndex",0)):U(c,l):(U(c,i),M.dataset.set(c,
"lightboxIndex",this.ba+1));this.ii&&(this.Bf&&this.hd)&&(Of(this,c,"gweb-lightbox-next"),Of(this,b,"gweb-lightbox-prev"));var d=T(this.D).height,h=T(this.p).height+"px";Mc(b,"top",h);Mc(c,"top",h);var j=this.Xc?this.I.height-d:this.I.height,m=0.35*this.I.width;E(f,function(a){Wc(a,m,j)},this);this.Bf=l}Pf(this,l,a)};
q.Ha=function(a){if(a){var b=M.ga(window),c=M.ea(),d=T(this.p),f=T(this.D),h=[],j=200<=this.I.width?this.I.width:200,d=this.I.height+d.height;this.Xc||(d+=f.height);f=Math.floor(c.x+b.width/2-j/2)-this.ja/2;b=Math.floor(c.y+b.height/2-d/2)-this.ja/2;this.wd?(h=[a.width-this.ja,a.height-this.ja,Vc(this.X).x,Vc(this.X).y],a=new Rf(this.X,h,[j,d,f,b],800,wd),Q(a,"end",this.Qg,l,this),a.play()):(Y.d.Ha.call(this),this.Qg())}else Y.d.Ha.call(this)};function Rf(a,b,c,d,f){V.apply(this,arguments)}B(Rf,V);
Rf.prototype.Q=function(){Wc(this.element,this.coords[0],this.coords[1]);Rc(this.element,this.coords[2],this.coords[3])};function Kf(a){this.type=this.Yh(a);this.href=a.href||"";this.title=this.Yf(a);this.width="IMG"==this.type?0:parseInt(M.dataset.get(a,Sf),10)||200;this.height="IMG"==this.type?0:parseInt(M.dataset.get(a,Tf),10)||200}var Tf="lightboxHeight",Sf="lightboxWidth";Kf.prototype.Yh=function(a){return a.href.match(Hf)?"IMG":a.getAttribute("href",2).match(If)?"A":"IFRAME"};
Kf.prototype.Yf=function(a){return M.dataset.get(a,"lightboxCaption")||a.getAttribute("title")||""};function Uf(a,b){this.ih=a;this.Fd=b;this.src=b.src;this.type=b.type;this.$j=b.cat}function Vf(a,b){switch(a){case "floodlight":var c=1E13*(Math.random()+""),d=ra(b.src),f=ra(b.type),h=ra(b.cat),c=M.f("iframe",{src:xa("//fls.doubleclick.net/activityi;","src=",d,";","type=",f,";","cat=",h,";","ord=",c,"?"),width:1,height:1,style:"display: none;"});document.body.appendChild(c)}}
function Wf(a,b,c){b=M.b(b);1==b.nodeType&&"A"==b.tagName&&c?Xf(b,a.hh,a):Xf(b,a.Te,a)}Uf.prototype.Te=function(){Vf(this.ih,this.Fd)};Uf.prototype.hh=function(a){Vf(this.ih,this.Fd);var a=a||window.event,b=a.currentTarget||a.srcElement;"A"!=b.tagName&&(b=M.Xb(b,"A"));a&&("click"==a.type&&b&&b.href)&&(a.preventDefault?a.preventDefault():a.returnValue=l,setTimeout(function(){window.top.location=b.href},1E3),this.fj=b.href)};
Uf.prototype.pd=function(a,b){var c=M.h(g,a);E(c,function(a){Wf(this,a,b)},this)};function Xf(a,b,c){c&&(b=x(b,c));a.addEventListener?a.addEventListener("click",b,l):a.attachEvent&&a.attachEvent("onclick",b)}function Yf(a,b){Uf.call(this,a,b);this.className=b.className;this.v=Zf;window._gaq&&window._gaq.push(x(function(){this.v=_gat._getTrackerByName()._getVisitorCustomVar(1);this.pd(this.className)},this))}B(Yf,Uf);
var Zf="crosB",$f={Pj:{id:"bkws",v:"crosC"},Qj:{id:"skws",xk:"crosD"},Bj:{id:"ctpt",v:"crosE"},Cj:{id:"ctpt",v:"crosE"},Ej:{id:"ctxt",v:"crosF"},Kj:{id:"ntp",v:"crosG"},yj:{id:"Chromebooks",v:"crosH"},zj:{id:"GDN",v:"crosI"},Xj:{id:"YTPT",v:"crosJ"},Wj:{id:"YTVI",v:"crosK"}};
Yf.prototype.hh=function(a){var b=this.Fd,c=a.target.parentNode,d=1E13*(Math.random()+""),f=escape(b.src),h=ra(b.type),b=ra(b.cat),j=this.v;c=c?M.dataset.get(c,"gPartner")||"NONE":g;c=M.f("iframe",{src:xa("//fls.doubleclick.net/activityi;","src=",f,";","type=",h,";","cat=",b,";","ord=",d,";","u1=",j,";","u2=",c,";","?"),width:1,height:1,style:"display: none;"});document.body.appendChild(c);var a=a||window.event,m=a.currentTarget||a.srcElement;"A"!=m.tagName&&(m=M.Xb(m,"A"));a&&("click"==a.type&&m&&
m.href)&&(a.preventDefault?a.preventDefault():a.returnValue=l,setTimeout(function(){window.top.location=m.href},1E3),this.fj=m.href)};
Yf.prototype.pd=function(a){a=M.k(a);this.v||(this.v=Zf);for(var b=0,c=a.length;b<c;b++){var d=a[b],f=-1<d.href.indexOf("#"),h=f?new L(d.href.replace("#","?")):new L(d.href),j=M.dataset.get(d,"gCustom"),m=-1<d.href.indexOf("amazon.co.uk")?this.v+"01-21":this.v;if("append"==j)d.href+=m;else if(j){var p=h;yb(p);p.N.set(j,m);d.href=f?h.toString().replace("?","#"):h.toString()}Wf(this,a[b],i)}};
function ag(a,b,c,d,f,h,j,m){this.sb=a;this.Pc=!!b;this.Gb=!!c;this.uc=!!d;this.Qb=!!f;this.Ua=h;this.Jb=j;this.Ih=m;this.qk=this.cf=k;this.Cb=l;a=tf(new L(location.href),bg);this.xe=a.length?a[0]:"prefers";a=tf(new L(location.href),cg);this.Rc=a.length?a:"";a=tf(new L(location.href),dg);this.xh=a.length?a:"";this.xc=eg();this.jf=this.Bg=l;this.ng=La(fg)[0];O.call(this);this.td();Q(window,"load",function(){location.href.match(".*eula.*")?window._GU_OnloadBody("eula"):location.href.match(".*thankyou.*")?
window._GU_OnloadBody("thankyou"):window._GU_OnloadBody("index")},l,this)}B(ag,R);
var fg={linux_ubuntu_i386:"/linux/direct/google-chrome-stable_current_i386.deb",linux_ubuntu_x86_64:"/linux/direct/google-chrome-stable_current_amd64.deb",linux_fedora_i386:"/linux/direct/google-chrome-stable_current_i386.rpm",linux_fedora_x86_64:"/linux/direct/google-chrome-stable_current_x86_64.rpm","linux_ubuntu_i386-b":"/linux/direct/google-chrome-beta_current_i386.deb","linux_ubuntu_x86_64-b":"/linux/direct/google-chrome-beta_current_amd64.deb","linux_fedora_i386-b":"/linux/direct/google-chrome-beta_current_i386.rpm",
"linux_fedora_x86_64-b":"/linux/direct/google-chrome-beta_current_x86_64.rpm","linux_ubuntu_i386-d":"/linux/direct/google-chrome-unstable_current_i386.deb","linux_ubuntu_x86_64-d":"/linux/direct/google-chrome-unstable_current_amd64.deb","linux_fedora_i386-d":"/dl/linux/direct/google-chrome-unstable_current_i386.rpm","linux_fedora_x86_64-d":"/dl/linux/direct/google-chrome-unstable_current_x86_64.rpm"},gg=[{Be:/^MACD$/,zd:"MACD"},{Be:RegExp("CHOA|CHOB|CHOC|CHOT|CHOU|CHOR|CHOQ|CHOP|CHON|CHOO|CHPD|CHPE|CHPF|CHPG|GGLS|GGLA|CHMA|CHMB|CHMF|CHMG|CHMQ|CHMV|CHNC|CHNB|CHNH|CHNI|CHFT|CHMI|CHNG|CHOS|CHFO|CHOX|CHOY|CHOZ|CHMH|CHME|CHHS|CHHM"),
zd:"GGRM"},{Be:/^[A-Z]{4}$/,zd:"CHFA"}],hg={Vj:"win",Hj:"linux",Ij:"mac"},bg="system",cg="gu_guexpt",dg="gu_expt",ig={Tj:"statcb",Nj:"platform",wj:"brand",Fj:"installdataindex",Jj:"msi",Sj:"standalone",Uj:bg,Mj:"oneclickinstalled",xj:"clickonceinstalled",Aj:"extra",Lj:cg,uj:dg};q=ag.prototype;q.td=function(){window._GU_OnloadHandlerAdd(x(this.Xi,this),0);window._GU_OnloadHandlerAdd(x(this.Ee,this))};function jg(){return $a&&window._GU_isOneClickAvailable()}
q.Xi=function(){if($a){window._GU_SetupOneClick();try{if(jg()){var a=window.google.update.oneclick.getInstalledVersion;a(kg(this),i)?this.xe="true":a(kg(this),l)&&(this.xe="false")}}catch(b){}}};function lg(a){if(!a.Pc&&!mg()){if(jg())return"oneclick";if($a&&window._GU_isClickOnceAvailable())return"clickonce"}return"download"}
q.Ee=function(a){var b=new Image,c=window.GU_buildGlobalExtra(this.sb,this.Cb,this.Rc),c=window.GU_BuildTag(ng(this),c);b.src=pa("//tools.google.com/service/update2/dlpageping?%s&stage=%s&installsource=%s",c,a,lg(this))};
function og(a){for(var b=Ka(ig),c=new L(location.href),d="",f=0,h=b.length;f<h;f++){var j=b[f],m=tf(c,j);m.length&&("extra"==j&&"betachannel"==m[0]?a.Gb=i:"extra"==j&&"devchannel"==m[0]?a.Qb=i:"installdataindex"==j?a.Ua=m[0]:"msi"==j?a.Pc=i:"brand"==j&&(a.Jb=m[0]))}a.Gb&&eg()&&(d+="&ap=1.1-beta");a.Qb&&eg()&&(d+="&ap=2.0-dev");a.Jb&&(d+="&brand="+a.Jb);j="installdataindex";a.Ua?(a=a.xc&&eg()&&"defaultbrowser"!=a.Ua?a.Ua+"-defaultbrowser":a.Ua,d+="&"+j+"="+a):a.xc&&eg()&&(d+="&"+j+"=defaultbrowser");
return d}function kg(a){return a.uc?"{4ea16ac7-fd5a-47c3-875b-dbf4a2008c20}":"{8A69D345-D564-463C-AFF1-A69D9E530F96}"}function ng(a){var b=a.uc?"Google Chrome Canary":"Google Chrome";a.cf=[window._GU_createAppInfo(kg(a),a.Ih||b,a.xe,og(a),a.xh)];return a.cf}q.Gi=function(){this.Bg=i;tc(this.Tc,7E3,this)};q.fg=function(){pg(this);tc(this.Tc,7E3,this)};q.Tc=function(){this.dispatchEvent("installed");var a=qg(this);location.href=a};
function pg(a,b,c){var d=$a?window._GU_buildDlPath:window._GU_buildDlPathNoTag,b=b||d,c=c||rg(a),c=b(ng(a),a.sb,a.Cb,sg(a),c,a.Rc);G&&7>=Fe||sessionStorage.setItem("directDownloadUri",a.Ec());b=lg(a);if(ze||Ae)a=qg(a),location.href=a;else if("clickonce"===b||ue){var f=c.toString(),b={target:"_blank",width:"1",height:"1",top:"0",left:"0",location:l,menubar:l,statusbar:l,toolbar:l,resizable:i,scrollbars:l},d=window,c="undefined"!=typeof f.href?f.href:String(f),f=b.target||f.target,h=[],j;for(j in b)switch(j){case "width":case "height":case "top":case "left":h.push(j+
"="+b[j]);break;case "target":case "noreferrer":break;default:h.push(j+"="+(b[j]?1:0))}j=h.join(",");if(b.noreferrer){if(j=d.open("",f,j))G&&-1!=c.indexOf(";")&&(c="'"+c.replace(/'/g,"%27")+"'"),j.opener=k,I?j.location.href=c:(c=ra(c),j.document.write('<META HTTP-EQUIV="refresh" content="0; url='+c+'">'),j.document.close())}else d.open(c,f,j);tc(a.Tc,7E3,a)}else location.href=c}
q.Ec=function(){var a=$a?window._GU_buildDlPath:window._GU_buildDlPathNoTag,b=rg(this);return a(ng(this),this.sb,this.Cb,sg(this),b,this.Rc)};function sg(a){return a.uc&&tg()?"https://storage.googleapis.com":"https://dl.google.com"}
function rg(a){if(a.Pc||location.href.match(".*msi=true.*"))a="/edgedl/chrome/install/GoogleChromeStandaloneEnterprise.msi";else if(mg())a="/update2/installers/ChromeStandaloneSetup.exe";else if(eg())a="/update2/installers/ChromeSetup.exe";else if(tg())if(a.Gb)a="/chrome/mac/beta/GoogleChrome.dmg";else if(a.Qb)a="/chrome/mac/dev/GoogleChrome.dmg";else if(a.uc)a="/chrome-canary/GoogleChromeCanary.dmg";else{var a="GGRO",b=new L(location.href),b=tf(b,"brand");if(b=b.length&&b[0])for(var c=0,d=gg.length;c<
d;c++){var f=gg[c],h=f.zd;if(f.Be.test(b)){a=h;break}}a=pa("/chrome/mac/stable/%s/googlechrome.dmg",a)}else a=ug()?fg[a.ng+(a.Gb?"-b":a.Qb?"-d":"")]:"/update2/installers/ChromeSetup.exe";return a}
function qg(a){for(var b=document.location.href.match("/intl/.*")?document.location.pathname.split("/")[2]:a.sb,b=new L("/intl/"+b+"/chrome/browser/thankyou.html"),c=new L(location.href),d=Ka(ig),f=0,h=d.length;f<h;f++){var j=d[f],m=tf(c,j);m.length&&m[0]&&uf(b,j,m)}if(!eg())return b.toString();a.Pc&&uf(b,"msi",["true"]);a.Cb&&uf(b,"statcb",["1"]);a.jf&&uf(b,"clickonceinstalled",["1"]);a.Bg&&uf(b,"oneclickinstalled",["1"]);a.Gb&&uf(b,"extra",["betachannel"]);a.Qb&&uf(b,"extra",["devchannel"]);a.Ua&&
uf(b,"installdataindex",[a.Ua]);a.Jb&&uf(b,"brand",[a.Jb]);a.xc&&(a=tf(b,"installdataindex"),uf(b,"installdataindex",[a.length?a[0]+"-defaultbrowser":"defaultbrowser"]));return b.toString()}
q.qi=function(){Q(window,"load",function(){for(var a=M.a.ia(document.documentElement,"ie7")?chrmnstaller.Ec():sessionStorage.getItem("directDownloadUri")||chrmnstaller.Ec(),b=M.k("retry-link"),c=tf(new L(location.href),"oneclickinstalled"),d=tf(new L(location.href),"clickonceinstalled"),f="retry"+(c.length?"_oneclick":d.length?"_clickonce":"_download"),c=b.length-1;0<=c;c--)b[c].href=a,Q(b[c],"click",function(){this.Ee(f)},l,this);if(!window.location.href.match(".*oneclickinstalled.*")&&(ze||Ae))window.location.href=
a},l,this)};function tg(){var a=vg();return a?"mac"==a:Za}function eg(){var a=vg();return a?"win"==a:$a}function ug(){var a=vg();return a?"linux"==a:ab}function vg(){var a=tf(new L(location.href),"platform"),b;if(b=a.length)a:{for(var c in hg)if(hg[c]==a[0]){b=i;break a}b=l}return b?a[0]:k}function mg(){var a=tf(new L(location.href),"standalone");return a.length&&1==a[0]}function wg(a){this.Va=a;this.Md=[];this.sd=this.Pe=k;this.te=[];this.Dd=this.tf=this.bh=k;W.call(this,k,i);this.Pd=i}B(wg,W);
q=wg.prototype;q.oa=function(a){a=M.b(a);wg.d.oa.call(this,a);tg()?M.a.add(a,"mac"):ug()?M.a.add(a,"linux"):M.a.add(a,"win");this.Md=M.k("eula-download-button");this.Pe=M.b("throbber");this.sd=M.b("eula-accept");this.te=M.k("linux-distro-options",a);this.bh=M.b("stats-cb");this.tf=M.b("default-cb");this.Dd=M.b("eula-close");this.td();"#eula"===location.hash&&this.Le()};
q.td=function(){for(var a=0,b=this.Md.length;a<b;a++)Q(this.Md[a],"click",this.Le,l,this);a=0;for(b=this.te.length;a<b;a++)Q(this.te[a],"click",this.lj,l,this);Q(this.bh,"click",this.mj,l,this);Q(this.tf,"click",this.kj,l,this);Q(this.Va,"installing",this.Zi,l,this);Q(this.Va,"installed",this.ji,l,this);Q(this.Va,"installed",this.ag,l,this);Q(window,"resize",this.Ha,l,this);this.Dd&&Q(this.Dd,"click",this.ag,l,this);this.addEventListener(ae,this.fi,l,this)};
q.Le=function(a){a&&a.preventDefault();this.b()||this.va();this.P(i)};q.ag=function(a){a&&a.preventDefault();this.P(l)};q.Zi=function(){this.sd.style.display="none";this.Pe.style.display="inline"};q.ji=function(){this.sd.style.display="inline";this.Pe.style.display="none"};
q.fi=function(a){if("accept"==a.key){var b=this.Va;b.dispatchEvent("installing");b.Ee("install");switch(lg(b)){case "oneclick":window.google.update.oneclick.install(ng(b),b.sb,b.Cb,x(b.Gi,b),x(b.fg,b),b.Rc);break;case "clickonce":b.jf=i;pg(b,window._GU_buildClickOncePath,pa("/update2/installers/clickonce/GoogleInstaller_%s.application",b.sb));tc(b.Tc,1E4,b);break;default:b.fg()}a.preventDefault()}};q.lj=function(a){this.Va.ng=a.currentTarget.value};q.mj=function(a){this.Va.Cb=a.currentTarget.checked};
q.kj=function(a){this.Va.xc=a.currentTarget.checked};q.Ha=function(){var a=this.e().r(),b=M.ha(a)||window;if("fixed"==Qc(this.b()))var c=a=0;else c=this.e().ea(),a=c.x,c=c.y;var d=T(this.b()),b=M.ga(b),a=Math.max(a+b.width/2-d.width/2,0),c=Math.max(c+b.height/3.75-d.height/3.75,0);Rc(this.b(),a,c);Rc(this.aa,a,c)};function xg(){this.zc=M.b("app-domain");this.Ef=M.b("buynow-online-form");this.q()}
xg.prototype.q=function(){var a=M.b("buynow-online");Q(a,"click",function(){this.Ef.style.display="inline-block";U(a,l);this.zc.focus()},l,this);Q(this.Ef,"submit",this.bj,l,this)};xg.prototype.bj=function(a){a.preventDefault();/^[a-z0-9\-\.]+\.[a-z]+/i.test(this.zc.value)&&(window.location.href="http://www.google.com/a/cpanel/x/BillingSetup?product_ids=GOOGLE.CHROMEBOOK_HARDWARE".replace("x",this.zc.value));this.zc.focus();return l};
function yg(a,b,c,d,f){(4!=b.length||4!=c.length)&&e(Error("Start and end points must be 4D"));var h=b[0]+b[2],j=c[0]+c[2],m=b[1]+b[3],p=c[1]+c[3],s=T(a),j=[s.width-p,s.height-j];Ga(b,[s.width-m,s.height-h]);Ga(c,j);V.call(this,a,b,c,d,f)}B(yg,V);yg.prototype.Q=function(){Wc(this.element,this.coords[4],this.coords[5]);this.element.style.borderWidth=pa("%spx %spx %spx %spx",this.coords[0],this.coords[1],this.coords[2],this.coords[3])};
function zg(a,b,c,d){O.call(this);c=M.b(c);this.ce=M.k(a,c);this.Nb=M.k(b,c);this.ce.length!=this.Nb.length&&e(Error("There must be an equal number of header and content elements"));this.Li=d;this.Ue=[]}B(zg,R);zg.prototype.q=function(){for(var a=0,b=this.ce.length;a<b;a++){var c=new Be(this.ce[a],this.Nb[a],a===this.Li);Q(c,"toggle",this.Ji,i,this);this.Ue[a]=c}};
zg.prototype.Ji=function(a){if(a.Ph){for(var b=0,c=this.Ue.length;b<c;b++){var d=this.Ue[b];d!=a.target&&d.Wb&&Ce(d,l)}this.dispatchEvent(new Ag("expand",this,a.target))}};function Ag(a,b,c){P.call(this,a,b);this.rj=c}B(Ag,P);Ag.prototype.$h=n("rj");function Bg(){this.Hd=k;this.ee=l;this.Eb=k;this.fc=l;O.call(this)}B(Bg,R);
Bg.prototype.oa=function(a){this.hg();this.Hd=M.b(a);this.Eb=M.fa("active",this.Hd);for(var a=M.Td(this.Hd),b=0,c=a.length;b<c;b++)(new Cg(this)).oa(a[b]);Q(window,"resize",this.hg,l,this)};Bg.prototype.hg=function(){var a;if(!(a=!G))if(a=G)a=0<=ya(Fe,9);a&&(this.fc=M.ga().width<=Dg)};function Cg(a){this.Y=a;this.nd=this.tc=this.df=this.Me=this.Od=this.ac=this.we=this.Z=this.Wa=k}B(Cg,R);var Dg=770;q=Cg.prototype;
q.oa=function(a){this.Wa=a;this.Z=M.h("UL",k,a)[0];this.we=M.h("A",k,a)[0];Eg(this);Q(this.Wa,"mouseover",this.Xg,l,this);Q(this.Wa,"mouseout",this.Vg,l,this);Q(this.tc,"finish",this.eh,l,this);Q(window,"resize",z(this.Eh,250),l,this);this.Z&&(Fg(this),qf?Q(this.Wa,sf,this.gi,l,this):(Q(this.Wa,"mouseover",this.Wg,l,this),Q(this.Wa,"mouseout",this.Yg,l,this)))};function Eg(a){a.df=new yg(a.we,[0,0,0,0],[0,0,4,0],200);a.tc=new yg(a.we,[0,0,4,0],[0,0,0,0],200)}
function Fg(a){var b=new F(a.Z.offsetLeft,a.Z.offsetTop),c=T(a.Z),d=T(a.Wa);a.ac=new F(b.x,d.height-c.height);a.Od=new F(b.x,d.height);a.Z.style.display="block";Rc(a.Z,a.ac);b=100*M.h("LI",k,a.Z).length;a.Me=new ed(a.Z,[a.ac.x,a.ac.y],[a.Od.x,a.Od.y],b,wd)}q.Oi=function(){this.Z&&Fg(this);Eg(this);Q(this.tc,"finish",this.eh,l,this);rc.clearTimeout(this.nd);this.nd=k};q.Eh=function(a){this.nd||(this.nd=tc(z(this.Oi),a,this))};
q.Wg=function(a){!this.Y.fc&&(!a.relatedTarget||!M.contains(a.currentTarget,a.relatedTarget))&&this.Me.play()};q.Yg=function(a){if(!this.Y.fc&&(!a.relatedTarget||!M.contains(a.currentTarget,a.relatedTarget)))this.Me.stop(),Rc(this.Z,this.ac)};q.Xg=function(a){if(!this.Y.fc&&(!a.relatedTarget||!M.contains(a.currentTarget,a.relatedTarget)))this.Y.ee=i,this.df.play(),this.Y.Eb&&M.a.remove(this.Y.Eb,"active")};
q.Vg=function(a){if(!this.Y.fc&&(!a.relatedTarget||!M.contains(a.currentTarget,a.relatedTarget)))this.Y.ee=l,this.tc.play()};q.eh=function(){this.Y.Eb&&M.a.enable(this.Y.Eb,"active",!this.Y.ee)};
q.gi=function(a){if(window.innerWidth>Dg&&(a.stopPropagation(),(!a.relatedTarget||!M.contains(a.currentTarget,a.relatedTarget))&&(!a.target.tagName||"A"!=a.target.tagName))){a.preventDefault();var b=M.h("UL",k,a.currentTarget)[0];b&&(0>(new F(b.offsetLeft,b.offsetTop)).y?(this.Wg(a),this.Xg(a)):(this.Yg(a),this.Vg(a)))}};function Gg(a){this.c=M.b(a);a=[T(this.c).width];Hc.call(this,[0],a,Hg,xd);Ig(this)}B(Gg,Hc);var Hg=1250;function Ig(a){jc(a.c,"mouseover",a.play,l,a)}
Gg.prototype.Q=function(){this.c.style.webkitMaskImage=pa("-webkit-gradient(radial, 17 17, %s, 17 17, %s,from(rgba(255,255,255, 1)),color-stop(0.5, rgba(255,255,255, 0.2)),to(rgba(255,255,255, 1)))",Math.floor(this.coords[0]),Math.floor(this.coords[0]+15))};Gg.prototype.ta=function(){this.Q();Gg.d.ta.call(this)};Gg.prototype.Ga=function(){this.Q();Gg.d.Ga.call(this);Ig(this)};Gg.prototype.$=function(){this.Q();Gg.d.$.call(this)};
function Jg(a,b,c,d){O.call(this);c=M.b(c);this.l=M.k(a,c);this.Nb=M.k(b,c);this.$e=M.b(d);this.l.length!=this.Nb.length&&e(Error("There must be an equal number of button and content elements"));this.Re=[];this.Oa=k}B(Jg,R);q=Jg.prototype;q.q=function(a){for(var b=0,c=this.l.length;b<c;b++){var d=new Lg(this.l[b],this.Nb[b]);d.q(a);Q(d,Mg,this.ij,l,this);"hover"===a&&(Q(d.cb,"mouseout",this.ye,l,this),Q(d.button,"mouseout",this.ye,l,this));this.Re[b]=d}Q(document,"click",this.ye,l,this)};
q.ye=function(a){var b=this.Oa;if(b&&(!this.$e||!M.contains(this.$e,a.target)))"click"===b.qd&&(a.target==b.button||M.contains(b.button,a.target))||(Ng(this.Oa),this.Oa=k)};q.ij=function(a){a=a.currentTarget;a!=this.Oa&&(this.Oa&&Ng(this.Oa),this.Oa=a)};q.Xh=n("Re");q.$i=function(a){(a=this.Re[a])&&a.Sg()};
function Lg(a,b){O.call(this);this.button=a;this.ef=$c(this.button);this.cb=b;this.of=T(this.cb);var c;a:{c=Ka(Og);for(var d=0,f=c.length;d<f;d++){var h=c[d];if(M.a.ia(this.button,h)){c=h;break a}}c=c[0]}this.Dg=c}B(Lg,R);var Og={tj:"tooltip-above",vj:"tooltip-below",Gj:"tooltip-left",Oj:"tooltip-right"},Mg="show",Pg={Rj:Mg,Dj:"hide"};
Lg.prototype.q=function(a){switch(a){case "click":this.qd="click";break;case "hover":this.qd="mouseover";break;default:this.qd="click"}var a=this.ef.height,b=this.ef.width,c=this.of.height,d=this.of.width,f=k;switch(this.Dg){case "tooltip-above":f=new F(b/2-d/2,-(c+10));break;case "tooltip-below":f=new F(b/2-d/2,a+10);break;case "tooltip-left":f=new F(-(d+10),a/2-c/2);break;case "tooltip-right":f=new F(b+10,a/2-c/2)}Rc(this.cb,f);this.cb.appendChild(M.f("SPAN",this.Dg));Q(this.button,this.qd,this.Sg,
l,this)};Lg.prototype.Sg=function(){this.cb.style.display="block";this.dispatchEvent(Mg)};function Ng(a){a.cb.style.display="none";a.dispatchEvent("hide")}function Qg(a){vf.call(this,a);this.ub=a.loop||l;this.ab=1}B(Qg,vf);Qg.prototype.rf=function(){for(var a=0,b=this.Db.length;a<b;a++){var c=new Rg(this.Db[a],this,a);this.wa[a]=c;c.md.style.display="none"}};Qg.prototype.Ge=ba;function Rg(a,b,c){yf.call(this,a,b,c);Q(this.J,"click",this.parent.Tb,l,this.parent)}B(Rg,yf);
Rg.prototype.pc=function(a){this.ub&&(a.uh instanceof kd&&this.parent.w.enabled&&this.index==this.parent.wa.length-1)&&this.parent.Tb();Rg.d.pc.call(this)};function Sg(a,b,c,d){this.Nh=b||Tg;this.Lg=M.b(c);this.Lh=M.Vd();this.links=M.h("A",a,M.b(d))}var Tg=1E3;Sg.prototype.q=function(){for(var a=this.links,b=0,c=a.length;b<c;b++){var d=a[b],f=Ib(new L(d.href));(f=M.b(f))&&Q(d,"click",x(this.scrollTo,this,f))}};
Sg.prototype.scrollTo=function(a){var b,c,d;this.Lg?(b=this.Lg,c=b.scrollLeft,d=b.scrollTop):(b=this.Lh,d=M.ea(),c=d.x,d=d.y);(new gd(b,[c,d],[a.offsetLeft-50,a.offsetTop-50],this.Nh,wd)).play()};function Ug(a,b,c){var a=M.b(a),d=M.ea(),b=b||50;(new gd(M.Vd(),[d.x,d.y],[a.offsetLeft-b,a.offsetTop-b],c||Tg,wd)).play()}
function Vg(a){this.fd="";this.Fb=k;this.animationName=a||location.hash||"";this.qc=[];this.gb=[];this.Ca=k;this.me=l;a=document.documentElement.style;this.dh=a?"backgroundSize"in a||"MozBackgroundSize"in a||"WebkitBackgroundSize"in a||"KhtmlBackgroundSize"in a:g;Q(window,"load",this.ge,l,this)}A("chrm.ui.DeviceAnimation",Vg);
Vg.prototype.ge=function(){this.Ca=new N(928,430);this.gb=M.k("device");this.qc=M.k("device-animation");Wg(this);for(var a=M.h("A","anim-link"),b=0,c=a.length;b<c;b++)Q(a[b],"click",function(a){Xg(this,a.currentTarget)},l,this);switch(location.hash){case "#device-samsung":Xg(this,M.b("home-to-samsung"));break;case "#device-acer":Xg(this,M.b("home-to-acer"))}this.animationName&&Xg(this,M.b(this.animationName))};
function Xg(a,b){a.animationName=M.dataset.get(b,"chrmAnimation");var c=a.animationName.split("-");a.fd=c[1];a.me=c[2]?i:l;a.me&&(a.animationName=c[0]+"-"+c[1]);var d=M.b(a.animationName),c=M.b("device-"+c[0]);Wg(a,a.animationName);var f=M.fa("keyframe",c);a.Ca=$c(f);Wc(d,a.Ca);a.dh||!a.dh&&430==a.Ca.height&&928==a.Ca.width?(a.Fb=new Yg(d,a.Ca,a.me?new Kc(24*a.Ca.height,0,0,0):new Kc(0,0,25*a.Ca.height,0),1500,k),Q(a.Fb,"finish",a.Bi,l,a),M.a.add(c,"hide"),a.Fb.play()):(Wg(a),(new id(c,500)).play(),
(new jd(M.b("device-"+a.fd),500)).play(),Zg(a,a.fd))}Vg.prototype.Bi=function(){Zg(this,this.fd);var a=this.Fb.c.style;a.backgroundPosition="";"undefined"!=typeof a.backgroundPositionX&&(a.backgroundPositionX="",a.backgroundPositionY="");this.Fb.stop(i);Wg(this)};function Zg(a,b){for(var c=0,d=a.gb.length;c<d;c++){var f="device-"+b;M.a.enable(a.gb[c],"hide",f!=a.gb[c].id);!a.yk&&f==a.gb[c].id&&Yc(a.gb[c],"")}}function Wg(a,b){for(var c=0,d=a.qc.length;c<d;c++)U(a.qc[c],b==a.qc[c].id)}
function Yg(a,b,c,d,f){Ge.call(this,a,b,c,d,f)}B(Yg,Ge);Yg.prototype.ta=function(){this.c.style.backgroundPosition="0px "+-(this.vf[1]-Math.floor(this.coords[1]/this.Ab.height)*this.Ab.height)+"px";Yg.d.ta.call(this)};function $g(){this.Ob=k;this.Kb=[];this.Jg=k;this.Ia=[];this.ec=[];this.Jd=this.ic=""}q=$g.prototype;
q.oi=function(){this.Kb=M.k("buynow");for(var a=0,b=this.Kb.length;a<b;a++)qf?Q(this.Kb[a],sf,this.Yi,l,this):(Q(this.Kb[a],"mouseover",z(this.Tg,i),l,this),Q(this.Kb[a],"mouseout",z(this.Tg,l),l,this))};q.Tg=function(a,b){if(!b.relatedTarget||!M.contains(b.currentTarget,b.relatedTarget)){var c=M.fa("locale-retailers",b.currentTarget),d=$c(c);c.style.height=Sc(a?d.height:"",i)}};
q.Yi=function(a){a=M.fa("locale-retailers",a.currentTarget);displayAttr=a.style.display;a.style.display=!displayAttr||"none"==displayAttr?"block":"none"};
q.pi=function(a){this.Jd=a||"";this.Ob=M.b("countrycode");this.Jg=M.b("retailer-list");this.Ia=M.h("div","retailer-list",this.Jg);this.ec=M.k("locale-content");this.Ob&&(this.ic=M.forms.Da(this.Ob),Q(this.Ob,"change",this.jj,l,this));if(this.Jd)for(var a=0,b=this.Ia.length;a<b;a++){for(var c=M.h("li",k,this.Ia[a]),d=0,f=c.length-1;0<=f;f--){var h=!M.a.ia(c[f],this.Jd),d=h?d+1:d;M.a.enable(c[f],"hide",h)}f=this.Ia[a].id;M.forms.Og(M.b("option-"+f.substr(f.indexOf("-")+1)),d==c.length)}};
q.jj=function(){if(this.ic=M.forms.Da(this.Ob)){if(this.Ia)for(var a=0,b=this.Ia.length;a<b;a++)M.a.enable(this.Ia[a],"hide",this.Ia[a].id!="retailers-"+this.ic);if(this.ec){a=0;for(b=this.ec.length;a<b;a++)M.a.enable(this.ec[a],"hide",!M.a.ia(this.ec[a],"locale-content-"+this.ic))}}};
function ah(a){this.uk=a;this.hc=M.k(a);this.nj=window.location.hash.substring(1);for(var b=this.hc.length-1;0<=b;b--){this.hc[b].id==this.nj&&this.gh(this.hc[b]);for(var c=M.k(a+"-link",this.hc[b]),d=c.length-1;0<=d;d--)Q(c[d],"click",x(this.gh,this,this.hc[b]))}}ah.prototype.gh=function(a){for(var b=M.k("expanded"),c=b.length-1;0<=c;c--)a!==b[c]&&M.a.Ne(b[c],"expanded","collapsed");M.a.ia(a,"collapsed")?M.a.Ne(a,"collapsed","expanded"):M.a.Ne(a,"expanded","collapsed");window.location.hash=a.id};
function bh(a,b,c){this.fh=M.b(a);this.Lb=M.b(b);this.pj=M.b(c);this.ed="";this.xf=new R;this.Gd=0;this.ge()}q=bh.prototype;q.ge=function(){Q(this.fh,"click",this.Qe,l,this);Q(this.xf,"videoclick",this.hf,l,this);Q(this.Lb,"click",z(this.ai),l,this);this.Gd=T(this.Lb).width;var a=Ib(new L(window.location));a?this.og(a):tc(this.Qe,3E3,this)};q.ai=function(a){for(a=a.target;a.tagName&&"LI"!=a.tagName.toUpperCase();)a=a.parentNode;(this.ed=M.dataset.get(a,"videoid"))&&this.xf.dispatchEvent("videoclick")};
q.Qe=function(){var a=!M.a.toggle(this.fh,"on"),b=M.Cc(this.Lb),b=a?new ed(b,[0,0],[this.Gd,0],200,vd.Oh):new ed(b,[this.Gd,0],[0,0],200,vd.Oh);a?Q(b,"end",function(){U(this.Lb,l)},l,this):U(this.Lb,i);b.play()};q.hf=function(){this.pj.src="http://www.youtube.com/embed/"+this.ed+"?wmode=transparent&showinfo=0&autoplay=1&autohide=1&rel=0&modestbranding=1";this.Qe()};q.og=function(a){if(a=M.b("clip-"+a))this.ed=M.dataset.get(a,"videoid"),this.hf()};var ch,dh=bb();
ye?ch="android":ze?ch="chrome":ue?ch="mozilla":fb?ch="opera":xe?ch="ipad":we?ch="iphone":Ae?ch="safari":G&&(ch=7>=Fe?"ie7":"ie");M.a.add(document.documentElement,ch);hb.match(".*CrOS.*/ig")&&M.a.add(document.documentElement,"cros");dh.match(".*NT 6.2.*")&&M.a.add(document.documentElement,"win8");
function $(a){this.$a=M.b(a.scrollerId);this.aj=M.b(a.slidesContainerId);this.xa=M.B("ul",this.$a)[0];this.Ki=a.oneAtATimeFlag;this.Ah=a.centerFlag;this.Hg=a.randomFlag;this.Mg=a.selectItemCallback;this.Se;this.Ja=M.B("ul li",this.$a)[0].scrollWidth;this.ld=Math.ceil(this.xa.parentNode.offsetWidth/this.Ja);this.xa.parentNode.style.overflow="hidden";this.Cg=this.Ja*this.ld;this.yb=M.B(".g-scroller-controls .g-scroller-previous",this.$a)[0];this.vb=M.B(".g-scroller-controls .g-scroller-next",this.$a)[0];
this.$f=this.bc=l;this.qb=[];this.De;this.Na;this.rb={};var b=this.$a.getElementsByTagName("a"),c=b.length;this.Se=this.Ja*(c-2);this.xa.style.width=this.Se+"px";for(var d=2,f=0;d<c;d++,f++){var h=b[d],j=this.Zd(h.href),m=M.b(j);this.rb[j]={};var p=this.rb[j];p.index=f;p.jd=m;p.cj=h;p.id=j;p.Ag=Math.ceil((f+1)/this.ld);this.qg=p.Ag;this.qb.push(p.id);p.jd&&(p.jd.id=j+"_scroller",M.a.add(m,"hidden"));Q(h,"click",x(this.dd,this,p))}this.cd=this.Ja*this.ld-this.Se;M.a.add(this.vb,"disabled-next");M.a.add(this.yb,
"disabled-prev");Q(this.vb,"click",function(a){this.scroll("right");a.preventDefault()},k,this);Q(this.yb,"click",function(a){this.scroll("left");a.preventDefault()},k,this);Q(this.$a,"keyup",function(a){switch(a.keyCode){case 37:var b=this.De.index-1;break;case 39:b=this.De.index+1}(a=this.rb[this.qb[b]])&&this.dd(a)},k,this);b=this.Zd(location.href);this.Hg&&!b&&(b=this.qb[Math.floor(Math.random()*this.qb.length)]);!a.defaultItem&&(!b&&!this.Hg)&&(b=this.qb[0]);this.dd(this.ne(b)?b:this.ne(a.defaultItem)?
a.defaultItem:this.rb[this.qb[0]])}q=$.prototype;
q.dd=function(a,b){"string"==typeof a&&(a=this.Yd(a));b&&b.preventDefault();for(var c=M.B(".g-scroller-viewport a.selected",this.$a),d=M.B(".g-scroller-slide",this.aj),f=0,h=c.length;f<h;f++)M.a.remove(c[f],"selected");f=0;for(h=d.length;f<h;f++)M.a.add(d[f],"hidden");M.a.add(a.cj,"selected");a.jd&&M.a.remove(a.jd,"hidden");this.Ah&&this.gf(a);this.De=a;this.Na=a.Ag;location.hash?this.$f&&window.location.replace(location.toString().replace(location.hash,"#"+a.id)):window.location.replace(location.toString()+
"#"+a.id);this.Mg&&this.Mg(a);this.$f=i};q.scroll=function(a){this.Ki?a="right"==a?this.xa.offsetLeft-this.Ja:this.xa.offsetLeft+this.Ja:"right"==a?(a=this.xa.offsetLeft-this.Cg,this.bc||(this.Na++,this.Na>this.qg&&(this.Na=this.qg))):(a=this.xa.offsetLeft+this.Cg,this.bc||(this.Na--,1>this.Na&&(this.Na=1)));this.vd(a)};q.Yd=function(a){return this.rb[a]};
q.vd=function(a){0<=a?(a=0,M.a.add(this.yb,"disabled-prev"),M.a.remove(this.vb,"disabled-next")):a<=this.cd||M.a.remove(this.yb,"disabled-prev");a<=this.cd?(a=this.cd,M.a.add(this.vb,"disabled-next"),M.a.remove(this.yb,"disabled-prev")):M.a.remove(this.vb,"disabled-next");0<=a&&a<=this.cd&&(M.a.add(this.vb,"disabled-next"),M.a.add(this.yb,"disabled-prev"));this.bc||(this.bc=i,this.ck=a,a=new fd(this.xa,[a,this.xa.offsetTop],400,wd),Q(a,"end",x(function(){this.bc=l},this)),a.play())};
q.gf=function(a){"string"==typeof a&&(a=this.Yd(a));this.vd(Math.floor(this.ld/2)*this.Ja-a.index*this.Ja)};q.Zd=function(a){return(a=/#([^&]*)/.exec(a))?a[1]:k};q.ne=function(a){return a in this.rb};function eh(){this.kd=fh();for(var a in this.kd)for(var b=this.kd[a],c=0,d=b.length;c<d;c++)Q(b[c].tab,"click",gh(b,c),l,this);hh(this)}A("gweb.ui.GTabs",eh);
function fh(){var a=M.h("div","g-tab-contents"),b=M.h("div","g-tabs"),c=b.length,d={};if(a.length!=c)return k;for(var f=0;f<c;f++){d["set-"+f]=[];var h=b[f],j=M.h("div","g-tab-content",a[f]),h=M.h("li","g-tab",h),m=h.length;if(j.length!=m)return k;for(var p=0;p<m;p++){var s={};s.tab=h[p];s.content=j[p];d["set-"+f].push(s)}}return d}function ih(a,b){var c=a.getElementsByTagName("a");return(c?c[0].hash:k)||"#tab"+b}
function gh(a,b){return function(c){c=c||k;this.lc(a,b);for(var d=M.h("li","g-tab"),f="",h=0,j;j=d[h];h++)M.a.ia(j,"g-tab-selected")&&(f+=ih(j,h));window.location.hash=f;c&&c.preventDefault()}}eh.prototype.lc=function(a,b){for(var c=0,d=a.length;c<d;c++)M.a.remove(a[c].tab,"g-tab-selected"),M.a.add(a[c].content,"g-tab-content-hidden");M.a.add(a[b].tab,"g-tab-selected");M.a.remove(a[b].content,"g-tab-content-hidden")};
function hh(a){var b=unescape(window.location.hash).replace(/#/ig,"|#").split("|"),c=0,d;for(d in a.kd){for(var f=l,h=a.kd[d],j=0,m=h.length;j<m;j++){var p=ih(h[j].tab,c++);0<=Ba(b,p)&&(f=i,a.lc(h,j))}f||a.lc(h,0)}}function jh(){eh.call(this);this.Oe=[];this.Oe=M.h("a","g-tab-link");for(var a=this.Oe.length-1;0<=a;a--)Q(this.Oe[a],"click",this.Ug,l,this)}B(jh,eh);
jh.prototype.Ug=function(a){M.ga().width>Dg&&(a.preventDefault(),a.target&&(a=Ib(new L(a.target.href)),window.location.hash=a,hh(this),Ug(a+"_content")))};!window.location.hash&&window.addEventListener&&window.addEventListener("load",function(){window.scrollY||window.scrollTo(0,1)},l);A("chrm.ui.Tabs",jh);jh.prototype.showTabByLink=jh.prototype.Ug;A("chrm.ui.MenuBar",Bg);Bg.prototype.decorate=Bg.prototype.oa;A("chrm.ui.Logo",Gg);A("chrm.download.Installer",ag);ag.prototype.getFullDownloadURI=ag.prototype.Ec;
ag.prototype.initDownloadChrome=ag.prototype.qi;A("chrm.download.EulaDialog",wg);wg.prototype.decorate=wg.prototype.oa;wg.prototype.showDialog=wg.prototype.Le;A("chrm.forms.BuyOnline",xg);A("chrm.ui.DeviceAnimation",Vg);A("chrm.ui.Tooltips",Jg);Jg.prototype.init=Jg.prototype.q;Jg.prototype.getTooltips=Jg.prototype.Xh;Jg.prototype.showTooltipByIndex=Jg.prototype.$i;Pg.SHOW=Mg;A("chrm.ui.Zippies",zg);zg.prototype.init=zg.prototype.q;zg.EXPAND_EVENT="expand";A("chrm.ui.ZippiesEvent",Ag);
Ag.prototype.getZippy=Ag.prototype.$h;A("goog.ui.Zippy",Be);Be.prototype.getContentElement=Be.prototype.Ud;A("chrm.ui.TimedCarousel",Qg);Qg.prototype.doTimerStart=Qg.prototype.Ld;Qg.prototype.doTimerStop=Qg.prototype.Tb;A("chrm.ui.SmoothScroll",Sg);Sg.prototype.init=Sg.prototype.q;A("chrm.ui.SmoothScroll.scrollWindowTo",Ug);A("goog.events.listen",Q);Y.prototype.init=Y.prototype.q;Y.prototype.setAnimate=Y.prototype.Qi;Y.prototype.setItemCount=Y.prototype.Ti;Y.prototype.showContentByIndex=Y.prototype.Rg;
Y.prototype.setScaleImages=Y.prototype.Ui;Y.prototype.disableNav=Y.prototype.Hh;A("gweb.ui.Scroller",$);$.prototype.selectItem=$.prototype.dd;$.prototype.scroll=$.prototype.scroll;$.prototype.getItemFromId=$.prototype.Yd;$.prototype.animateToPosition=$.prototype.vd;$.prototype.centerOnItem=$.prototype.gf;$.prototype.getStringAfterHash=$.prototype.Zd;$.prototype.isValidItem=$.prototype.ne;A("chrm.widget.BuyNow",$g);$g.prototype.initBuyNowButton=$g.prototype.oi;$g.prototype.initCountrySelect=$g.prototype.pi;
A("chrm.widget.Features",ah);A("chrm.widget.Playlist",bh);bh.prototype.loadVideoByName=bh.prototype.og;A("gweb.analytics.DoubleTrack",Uf);Uf.prototype.track=Uf.prototype.Te;Uf.prototype.trackClass=Uf.prototype.pd;A("chrm.analytics.FloodlightTracker",Yf);
A("chrm.analytics.FloodlightTracker.trackSource",function(){var a=new L(window.location.href.replace("#","?")),a=a.N.get("utm_source")||a.N.get("cmp")||k,b;a:{if(a)for(b in $f){if(-1<a.indexOf($f[b].id)){b=$f[b].v;break a}}else if(0==document.referrer.indexOf("www.google")){b="crosA";break a}b=k}window._gaq&&b&&window._gaq.push(["_setCustomVar",1,"source",b,1])});Yf.prototype.trackClass=Yf.prototype.pd;Yf.prototype.track=Yf.prototype.Te;A("goog.dom.getElementsByClass",M.k);
A("goog.dom.classes.has",M.a.ia);A("goog.userAgent.MOBILE",gb);
})()