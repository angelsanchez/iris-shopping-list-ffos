iris.ui(function (self) {

	self.settings({
		product : null
	});

	self.create = function() {
		
		self.tmplMode(self.APPEND);
		self.tmpl(iris.path.product_item.html);

		self.inflate( self.setting("product") );

		self.get("switcher").on("change", switcherOnChange);

	};

	function switcherOnChange () {
		iris.resource(iris.path.products).toggle( self.setting("product").id );
	}

},iris.path.product_item.js);
