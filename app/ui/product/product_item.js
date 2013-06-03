iris.ui(function (self) {

    self.settings({
        productId : null
    });

    var products = iris.resource(iris.path.products);

    self.create = function() {
        
        self.tmplMode(self.APPEND);
        self.tmpl(iris.path.product_item.html);

        self.inflate({
            product : product()
        });

        self.get("switcher").on("change", switcherOnChange);

        render();
    };

    // Get product data from the product resource
    function product() {
        return products.get( self.setting("productId") );
    }

    // User events
    function switcherOnChange () {
        products.toggle( self.setting("productId") );
        render();
    }

    // Update screen interface using the product resource
    function render () {
        if ( product().checked ) {
            self.get().addClass("product-checked");
        } else {
            self.get().removeClass("product-checked");
        }
    }

},iris.path.product_item.js);
