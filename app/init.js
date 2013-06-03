//
// Application entry point
//

// Define iris components paths
// Each path will starts with iris.baseUri() value
iris.path = {
    welcome : { js: "screen/welcome.js"
        , html: "screen/welcome.html" },
    add_product : { js: "screen/product/add_product.js"
        , html: "screen/product/add_product.html" },
    product_list : { js: "screen/product/product_list.js"
        , html: "screen/product/product_list.html" },
    product_item: { js: "ui/product/product_item.js"
        , html : "ui/product/product_item.html" },
    products : "resource/products.js"
};


$(window.document).ready(

    function () {
        // Indicates the folder that contains all iris sources
        iris.baseUri("./app/");

        // show the initial screen
        iris.welcome(iris.path.welcome.js);
    }
);
