/**
 * 
 */
iMasters.start(function(){
	var Form = (function() {
		var form;
		var hr;
		var fieldsets=0;
		
		return {
			Fieldset:(function() {
				var action = {
					question: {
						add:function() {
							var fieldset = this.e.parentNode.parentNode.parentNode.cloneNode(true);
							
							form.insertBefore(fieldset,hr);
						},
						del:function() {
							var fieldset = this.e.parentNode.parentNode.parentNode;
							
							form.removeChild(fieldset);
						}
					},
					alternative: {
						add:function() {
							alert("ok");
						}
					}
				};
				
				var Fieldset = iMasters.gui.ex(function(e) {
					this.fieldset = e;
					this.addQuestion = new iMasters.gui.Button(
						iMasters.core.query(".button.add.question",e)[0]
					);
					this.addQuestion.bind("click",function(evt){
						var clone = e.cloneNode(true);
						
						Form.Fieldset.create(form.insertBefore(clone,e.nextSibling));
					});
					this.delQuestion = new iMasters.gui.Button(
						iMasters.core.query(".button.del.question",e)[0]
					);
					this.delQuestion.bind("click",function(evt){
						if ( fieldsets>1){
							form.removeChild(e);
						} else {
							alert("Você não pode excluir o último fieldset");
						}
					});
					
					fieldsets++;
				});
				
				Fieldset.create = function(e) {
					return new Form.Fieldset(e);
				};
				
				return Fieldset;
			}()),
			
			init:function(id) {
				form = iMasters.core.query(id)[0];
				hr = iMasters.core.query("hr",form)[0];
				
				Form.Fieldset.create(iMasters.core.query("fieldset",form)[0]);
			}
		};
	}());
	
	Form.init("#iMasters-Form");
});