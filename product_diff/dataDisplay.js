	// This is to Empty the ChildNodes
	HTMLElement.prototype.empty = function() {
	    var that = this;
	    while (that.hasChildNodes()) {
	        that.removeChild(that.lastChild);
	    }
	};

	function createNode(element) {
		return document.createElement(element); // Create the type of element you pass in the parameters
	}

	function append(parent, el) {
		return parent.appendChild(el); // Append the second parameter(element) to the first one
	}
	

	function generateProductList(selectObject){
		var value = selectObject.value;  
		if(selectObject.id == 'selectProduct1'){
		    test = document.getElementById('product1');
		    placeToAdd = 'product1'
		}else if(selectObject.id == 'selectProduct2'){
		    test = document.getElementById('product2');
		    placeToAdd = 'product2'
		}	
		test.empty();

	    var getDataList = fetch('https://flipkart-mock-serve.now.sh') 
			.then((resp) => resp.json())
			.then(function(data) {
				console.log(data);
				var constructedObject = {
				 	apiValue : data.products.featuresList,
					defaultSelectedValue : value,
					productPlaceholder : [ placeToAdd ]
				}
				buildProductList(constructedObject);
			})
			.catch(function(err) {
				console.log('Unable to Fetch the Data from Service')
			    // This is where you run code if the server returns any errors
			});
	}
	
	function removeProduct(data){
		var value = data.id;  
		if(value == "crossIcon1"){
			test = document.getElementById('product1');
		}else if(value == "crossIcon2"){
			test = document.getElementById('product2');
		}
		test.empty();
		
	}

	function constructImagePlaceHolder(items,selectedValue,productToDisplayDropdown,imageProduct,appendToPlace,crossIcon) {
		var newSelect = document.createElement('select');
			newSelect.id = productToDisplayDropdown;
			newSelect.setAttribute('onchange', "generateProductList(this)");

		var imgProduct1 = document.getElementById(imageProduct);
		var crossIcon1 = document.getElementById(crossIcon);
		Object.entries(items).forEach(function(pkey, pvalue){
			if(pkey[0]=="images"){
				Object.entries(pkey[1]).forEach(function(productKey, productImg){
					let optionList = createNode('option');
					optionList.setAttribute ("value", `${productKey[0]} `);
      				optionList.setAttribute ("text", `${productKey[0]} `);
      				optionList.innerHTML = `${productKey[0]} `;

					optionList.id = productKey[0];

					if(selectedValue == productKey[0]){
						var oImg = document.createElement("img");
						
						oImg.setAttribute('src', productKey[1]);
						oImg.setAttribute('alt', 'na');
						oImg.setAttribute('height', '100px');
						oImg.setAttribute('width', '100px');

						var crossIconData = document.createElement("img");
						crossIconData.setAttribute('src', './Close.png');
						crossIconData.setAttribute('alt', 'na');
						crossIconData.setAttribute('height', '30px');
						crossIconData.setAttribute('width', '30px');
						crossIconData.setAttribute('onclick', "removeProduct(this)");
						crossIconData.id = crossIcon;

						append(imgProduct1, oImg);
						append(crossIcon1, crossIconData);
					}
					
					append(newSelect, optionList);
					append(document.getElementById(appendToPlace),newSelect);
				});
			}
			
		});
	}


		
	/*
		Fetching the List of Items to be Compared
	*/
	
	var getDataList = fetch('https://flipkart-mock-serve.now.sh') 
		.then((resp) => resp.json())
		.then(function(data) {
			console.log(data);
			var selectedValue = "TVSF2WYXTKAR7RAF";
			var selectedValue1 = "TVSE8FMZ9AQMEGC6";

			constructImagePlaceHolder(data.products.compareSummary,selectedValue,'selectProduct1','imageProduct1','selectProduct1DropDown','crossIcon1');
			constructImagePlaceHolder(data.products.compareSummary,selectedValue1,'selectProduct2','imageProduct2','selectProduct2DropDown','crossIcon2');

			var constructedObject = {
			 	apiValue : data.products.featuresList,
				defaultSelectedValue : selectedValue,
				productPlaceholder : [ 'authors' , 'product1' , 'product2' ],
			}
			buildProductList(constructedObject);
		})
		.catch(function(err) {
			console.log('Unable to Fetch the Data from Service')
		    // This is where you run code if the server returns any errors
		});


	function buildProductList(constructedObj) {
		

		constructedObj.productPlaceholder.map(function(placeOlderData) {
			var items = constructedObj.apiValue ;
			var selectedValue = constructedObj.defaultSelectedValue ;
			var productToAppend = placeOlderData;

				return items.map(function(item) {
					let li = createNode('li'),
						spanEle = createNode('div');
					if(productToAppend == "authors"){
						spanEle.innerHTML = `${item.title} `;
					}else{
						spanEle.innerHTML = '   <br/>'; 
					}
					spanEle.id = item.title;
					buildListProductChildlist(spanEle, item , selectedValue, productToAppend);
					append(li, spanEle);
					append(document.getElementById(productToAppend), li);
			    })
			
		})
		

	    
	}

	function buildListProductChildlist(parentElement, item , selectedValue, productToAppend) {
	    var ul = document.createElement("ul");
	    for(i = 0 ; i < item.features.length ; i++) {
	    	var li = document.createElement('li');
	    	var text;
	    	if(productToAppend == "authors"){
				text = document.createTextNode(item.features[i].featureName);
			}else{
				text = document.createTextNode(item.features[i].values[selectedValue.trim()]);
			}
	    	li.appendChild(text);
			ul.appendChild(li);
	    }
	    append(parentElement,ul);
	}