iris.ui(function (self) {

	self.settings({
		product : null
	});

	self.create = function() {
		
		self.tmplMode(self.APPEND);
		self.tmpl(iris.path.product_item.html);

		self.inflate( self.setting("product") );

		self.get("switcher").on("change", switcherOnChange);

		render();
	};

	function switcherOnChange () {
		iris.resource(iris.path.products).toggle( self.setting("product").id );
		self.setting("product.checked", !self.setting("product").checked);
		render();
	}

	function render () {
		if ( self.setting("product").checked ) {
			self.get().addClass("product-checked");
		} else {
			self.get().removeClass("product-checked");
		}
	}

},iris.path.product_item.js);
