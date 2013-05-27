iris.resource(function (self) {

	var products = {}, numCheckedProducts = 0, ids = [];

	function save (product) {
		console.log("Saving product id[" + product.id + "] name[" + name + "]");
		localStorage.setItem("product_" + product.id, JSON.stringify(product));
	}

	self.loadSaved = function () {
		var idsSaved = localStorage.getItem("ids");
		if ( idsSaved ) {
			ids = idsSaved.split(",");

			var productString, product, f, F;
			for (f = 0, F = ids.length; f < F; f++) {
				productString = localStorage.getItem("product_" + ids[f]);
				product = JSON.parse(productString);
				products[product.id] = product;
				console.log("Loading product[" + productString + "]");

				if ( product.checked ) {
					numCheckedProducts++;
				}

				iris.notify("add_product", {product: product});
			}
		}
	};

	self.add = function (name) {
		var product = {id: new Date().getTime().toString(), text: name, checked: false};
		products[product.id] = product;
		save(product);

		ids.push(product.id);
		localStorage.setItem("ids" , ids.join(","));
		
		iris.notify("add_product", {product: product});
	};

	self.toggle = function (id) {
		products[id].checked = !products[id].checked;
		save(products[id]);

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
				
				var key = "product_" + id;
				localStorage.removeItem(key);
				console.log("0 id["+id+"] -> "+ids.length+"_"+ids.join(","))	
				ids.splice(ids.indexOf(id), 1);
				console.log("1 id["+id+"] -> "+ids.length+"_"+ids.join(","))	

				numCheckedProducts--;

				iris.notify("delete_product", {productId: id});
			}
		}
		localStorage.setItem("ids" , ids.join(","));
	};

	self.numCheckedProducts = function () {
		return numCheckedProducts;
	};

	self.total = function () {
		return ids.length;
	};

}, iris.path.products);
