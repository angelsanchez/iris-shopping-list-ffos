iris.screen(function(self) {

    var productUIs = {}, products = iris.resource(iris.path.products);

    self.create = function() {
        self.tmpl(iris.path.product_list.html);

        // Set up interface
        self.get("add_button").on("click", addButtonOnClick);
        self.get("delete_button").on("click", deleteButtonOnClick);
        self.get("delete_toolbar").hide();

        // Product resource events
        self.on("add_product", onAddProduct);
        self.on("delete_product", onDeleteProduct);
        self.on("toggle_product", render);
    };

    // User events
    function deleteButtonOnClick () {
        products.deleteCheckedProducts();
    }

    function addButtonOnClick () {
    	iris.navigate("#/add");
    }

    // Resource events
    function onAddProduct (event) {
        var ui = self.ui("products", iris.path.product_item.js, {product: event.product});
        productUIs[event.product.id] = ui;
        render();
    }

    function onDeleteProduct (event) {
        self.destroyUI(productUIs[event.productId]);
        productUIs[event.productId] = null;
        delete productUIs[event.productId];
        render();
    }

    // Update screen counters and show or hide components using the product resource
    function render () {
        if ( products.numCheckedProducts() > 0 ) {
            self.get("delete_toolbar").show();
        } else {
            self.get("delete_toolbar").hide();
        }

        self.get("products_count").text("(" + products.total() + ")");
    }

}, iris.path.product_list.js);
