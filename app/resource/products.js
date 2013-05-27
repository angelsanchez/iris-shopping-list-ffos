iris.resource(function (self) {

	var products = {}, total = 0, numCheckedProducts = 0;

	self.add = function (name) {
		var product = {id: ++total, text: name, checked: false};
		products[product.id] = product;

		iris.notify("add_product", {product: product});
	};

	self.toggle = function (id) {
		products[id].checked = !products[id].checked;

		if ( products[id].checked ) {
			numCheckedProducts++;
		} else {
			numCheckedProducts--;
		}

		iris.notify("toggle_product");
	};

	self.deleteCheckedProducts = function () {
		for ( var id in products ) {
			if ( products[id].checked ) {
				products[id] = null;
				delete products[id];

				total--;
				numCheckedProducts--;

				iris.notify("delete_product", {productId: id});
			}
		}
	};

	self.numCheckedProducts = function () {
		return numCheckedProducts;
	};

	self.total = function () {
		return total;
	};

}, iris.path.products);
