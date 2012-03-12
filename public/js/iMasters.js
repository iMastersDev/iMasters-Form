/**
 * 
 */
var iMasters = iMasters || (function(){
	return {
		bind: function(e,t,c,u){
			var g;
			(g=t.addEventListener||t.attackEvent||function(e,t,c){
				t[e]=c;
			}).apply(
				t,[(g?"":"on")+e,c,!!!(u||false)]
			);
		},
		
		query: function(s,e) {
			return (e||document).querySelectorAll(s);
		},
		
		start: function(c) {
			iMasters.bind("DOMContentLoaded",document,function() {
				(function(){
					for ( var i=0,l=iMasters.query(".button"),t=l.length;i<t;++i){
						iMasters.bind("click",l[i],function(e){
							var classAttribute=this.getAttribute("class")||"";
							var timer = setTimeout(function(b) {
								b.setAttribute(
									"class",
									classAttribute
								);
								clearTimeout(timer);
							},100,this);
							
							classAttribute=classAttribute.split("down").join("");

							this.setAttribute("class",
								[classAttribute,"down" ].join( " " )
							);
						});
					}
				}());
				(function() {
					var initializeDropdownItems = function(p) {
						for (var i=0,l=iMasters.query(".option a",p),t=l.length;i<t;++i){
							iMasters.bind("click",l[i],function(e){
								var a=p.getAttribute("class").split("openned").join("");
								iMasters.query(".selection",p)[0].innerHTML = this.text;
								p.setAttribute("class",a);
							});
						}
					};
					
					for (var i=0,l=iMasters.query(".dropdown .selection"),t=l.length;i<t;++i){
						iMasters.bind("click",l[i],function(e){
							if (this.parentNode) {
								var a = this.parentNode.getAttribute("class")||"";
								if ( a.indexOf("openned")>=0){
									this.parentNode.setAttribute("class",a.split("openned").join(""));
								} else {
									this.parentNode.setAttribute("class",[a,"openned"].join(" "));
								}
								
								initializeDropdownItems( this.parentNode );
							}
						});
					}
				}());
				(function() {
					iMasters.bind("click",document,function(e){
						for (var i=0,l=iMasters.query(".openned"),t=l.length;i<t;++i){
							l[i].setAttribute("class",l[i].getAttribute("class").split("openned").join(""));
						}
					});
				}());
				
				(c||function(){}).apply(iMasters);
			});
		}
	};
}());

iMasters.start();