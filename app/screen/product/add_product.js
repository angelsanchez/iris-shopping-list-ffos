iris.screen(function(self) {

    self.create = function() {
        self.tmpl(iris.path.add_product.html);

        self.get("back_button").on("click", backButtonOnClick);
        self.get("edit_button").on("click", editButtonOnClick);
    };

    self.awake = function () {
    	self.get("product_form").get(0).reset();
    };

    function backButtonOnClick () {
    	iris.navigate("#/list");
    }

    function editButtonOnClick () {
    	var name = self.get("name_input").val();
    	if ( name ) {
	    	iris.resource(iris.path.products).add(name);
	    	iris.navigate("#/list");
    	}
    }

}, iris.path.add_product.js);
