iris.screen(function(self) {

    self.create = function() {
        self.tmpl(iris.path.welcome.html);

        self.screens("screens", [
		 ["list", iris.path.product_list.js],
		 ["add", iris.path.add_product.js]
		]);

        iris.navigate("#/list");
    };

}, iris.path.welcome.js);
