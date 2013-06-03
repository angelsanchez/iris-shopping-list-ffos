iris.screen(function(self) {

    var products = iris.resource(iris.path.products);

    var productUIs = {};

    self.create = function() {
        self.tmpl(iris.path.product_list.html);

        // Set up interface
        self.get("add_button").on("click", addButtonOnClick);
        self.get("delete_button").on("click", deleteButtonOnClick);
        self.get("delete_toolbar").hide();

        // Product resource events
        self.on("add_product", onAddProduct);
        self.on("delete_product", onDeleteProduct);
        self.on("delete_checked_products", render);
        self.on("toggle_product", render);

        // Load the products saved previously
        products.loadSaved();
        render();
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
        var ui = self.ui("products",
            iris.path.product_item.js,
            {productId: event.productId});
        productUIs[event.productId] = ui;
        render();
    }

    function onDeleteProduct (event) {
        productUIs[event.productId].destroyUI();
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

        if ( products.total() > 0 ) {
            self.get("empty_list_msg").hide();
        } else {
            self.get("empty_list_msg").show();
        }

        self.get("products_count").text("(" + products.total() + ")");
    }

}, iris.path.product_list.js);
