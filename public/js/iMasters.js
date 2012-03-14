var iMasters = iMasters || (function(){
	var g;
	
	return {
		core: {
			bind: function(e,t,c,u){
				(g=t.addEventListener||t.attackEvent||function(e,t,c){
					t[e]=c;
				}).apply(
					t,[(g?"":"on")+e,c,!!!(u||false)]
				);
				
				return this;
			},
			
			query: function(s,e) {
				return (e||document).querySelectorAll(s);
			}
		},
		
		gui: (function(){
			var Element = function(e) {
				this.e = e;
			};
			
			Element.prototype.addClass = function(c) {
				if (this.e) {
					this.e.setAttribute("class",
						[((this.e.getAttribute("class")||"").split(c).join("")),c].join(" ")
					);
				}
				
				return this;
			};
			
			Element.prototype.dispatchEvent = function(type,e,custom) {
				var event;
				
				type = type == "MouseEvent" ? "MouseEvent" : "Event";
				event = document.createEvent(type);
				event.custom = custom;
				event.target = this.e;
				
				if (type=="MouseEvent"){
					event.initMouseEvent((g?"":"on")+e,true,true);
				} else {
					event.initEvent((g?"":"on")+e,true,true);
				}
				
				this.e.dispatchEvent(event);
			};
			
			Element.prototype.removeClass = function(c) {
				if (this.e) {
					this.e.setAttribute("class",
						(this.e.getAttribute("class")||"").split(c).join("")
					);
				}
				
				return this;
			};
			
			Element.prototype.toggleClass = function(c) {
				if (this.e) {
					if ((this.e.getAttribute("class")||"").indexOf(c) >= 0 ){
						this.removeClass(c);
					} else {
						this.addClass(c);
					}
				}
				
				return this;
			}
			
			Element.prototype.bind = function(e,c) {
				var iMastersElement = this;
				
				iMasters.core.bind(e,this.e,function(e){
					e.target = this;
					
					c.apply(iMastersElement,[e]);
				});
				
				return this;
			};
			
			return {
				ex:function(o) {
					if (o instanceof Object){
						o.prototype = new Element();
					}
					
					return o;
				},
				
				Button: (function(){
					var handler = function(){
						var button = this;
						var timer = window.setTimeout(function(){
							button.removeClass("down");
							window.clearTimeout(timer);
						},100);
						
						button.addClass("down");
					};
					
					var Button = function(e) {
						this.e = e;
						this.bind("click",handler);
						this.removeClass("down");
					};
					
					Button.prototype = new Element();
					
					return Button;
				}()),
					
				Dropdown: (function(){
					var dropDownHandler = function(evt){
						if (evt.target.parentNode) {
							var parent = evt.target.parentNode;
							var a = parent.getAttribute("class")||"";
							
							if ( a.indexOf("openned")>=0){
								parent.setAttribute("class",a.split("openned").join(""));
							} else {
								parent.setAttribute("class",[a,"openned"].join(" "));
							}
						}
					};
					
					var Dropdown = function(e){
						this.e = e;
						this.selection = iMasters.core.query(".selection",e)[0];
						
						iMasters.core.bind(
							"click",
							this.selection,
							dropDownHandler
						);
						
						for (var i=0,l=iMasters.core.query(".option a",e),t=l.length;i<t;++i){
							(new iMasters.gui.Dropdown.Item(l[i],this));
						}
					};
					
					var dropDownItemHandler = function(evt){
						var old = this.d.selection.innerHTML;
						
						this.d.selection.innerHTML = evt.target.innerHTML;
						this.d.removeClass("openned");
						
						if ( this.d.selection.innerHTML != old ) {
							this.d.dispatchEvent("change");
						}
					};
					
					Dropdown.prototype = new Element();
					Dropdown.Item = function(e,d) {
						this.d = d;
						this.e = e;
						this.bind("click",dropDownItemHandler);
					};
					
					Dropdown.Item.prototype = new Element();
					
					return Dropdown;
				}())
			};
		}()),
		
		start: function(c) {
			iMasters.core.bind("DOMContentLoaded",document,function() {
				for ( var i=0,l=iMasters.core.query(".dropdown"),t=l.length;i<t;++i){
					(new iMasters.gui.Dropdown(l[i]));
				}
				
				for ( var i=0,l=iMasters.core.query(".button"),t=l.length;i<t;++i){
					(new iMasters.gui.Button(l[i]));
				}
				
				iMasters.core.bind("click",document,function(e){
					for (var i=0,l=iMasters.core.query(".openned"),t=l.length;i<t;++i){
						l[i].setAttribute("class",l[i].getAttribute("class").split("openned").join(""));
					}
				});
				
				(c||function(){}).apply(iMasters);
			});
		}
	};
}());