
	fetch('https://flipkart-mock-cart.now.sh').then((resp) => resp.json())
		.then(function(data) {
			
			constructProductList(data)
			
		})
		.catch(function(err) {
			console.log('Unable to Fetch the Data from Service')
		    // This is where you run code if the server returns any errors
		});


	function constructProductList(data){
		var productContainer = document.createElement('div')
		data.forEach( function(element, index) {
			var individualProduct = document.createElement('div');
				individualProduct.className = 'individualProduct';

				/*
					This Element Is created to Store the image
				*/
				var imageView = document.createElement('img');

					imageView.src = element.product_meta.img;
					imageView.setAttribute('height', '170px');
					imageView.setAttribute('width', '50px');

				/*
					This Element Is created to Store the ProductDetails
				*/
				var productData = document.createElement('div');
					productData.className = 'productData'

					var productTitle = document.createElement('p');
						productTitle.innerHTML  = element.product_meta.title;

					var productAmount = document.createElement('p')
						productAmount.innerHTML = 'Rs: '+element.pricing.amount;

					var deliveryCharges = document.createElement('p')
						deliveryCharges.innerHTML = 'Delivery: '+element.pricing.delivery_charge;

					var addToCart = document.createElement('button');
						addToCart.innerHTML = '+';
						addToCart.className = 'addToCart';
						addToCart.addEventListener('click',function() {
						    addToCartGetData(element,"add",(index));
						}, false);


					var removeFromCart = document.createElement('button');
						removeFromCart.innerHTML = '-';
						removeFromCart.className = 'removeFromCart';
						removeFromCart.addEventListener('click',function() {
						    removeFromCartGetData(element,"remove",(index));
						}, false)


					var productMainContainer = document.createElement('div');
					var purchasedItemCount = document.createElement('span');
						purchasedItemCount.id = 'purchasedItemCount'+(index);
						
						//purchasedItemCount.innerHTML = element.purchase_instructions.max_purchase_limit;
						purchasedItemCount.innerHTML = 0;
						
						productMainContainer.appendChild(purchasedItemCount);
						productMainContainer.appendChild(addToCart);
						productMainContainer.appendChild(removeFromCart);


					productData.appendChild(productTitle);
					productData.appendChild(productAmount);
					productData.appendChild(deliveryCharges);
					productData.appendChild(productMainContainer);

				individualProduct.appendChild(imageView);
				individualProduct.appendChild(productData);


			productContainer.appendChild(individualProduct);
		});
		document.getElementById('cartList').appendChild(productContainer)
	}
	var totalPriceList = 0;
	var discountPrice = 0;
	var indexValueContainer = {}
	function priceList(d,status,i){
		document.getElementById("priceDetails").innerHTML = "";
		var totalAmount = document.createElement('div');

        t = 'purchasedItemCount'+i;

        var val = parseInt(document.getElementById(t).innerHTML);
        indexValueContainer[i] = status == 'add' ? val+1 : val-1

        if(indexValueContainer[i] <= d.purchase_instructions.max_purchase_limit && indexValueContainer[i]!=-1){
        	if(status == 'add'){
				indexValueContainer[i] = val+1;

				totalPriceList += d.pricing.amount;
				discountPrice = discountPrice + d.pricing.delivery_charge;
			}else{
				indexValueContainer[i] = val-1;

				totalPriceList -= d.pricing.amount;
				discountPrice = discountPrice - d.pricing.delivery_charge;
			}

			document.getElementById(t).innerHTML = indexValueContainer[i];
        }else{
        	console.log(i,'Exceeds the limit')
        	indexValueContainer[i] != -1 ?  alert('Maximum Product Limit Exceeds') : alert('Atleast One Item');
        }
		
	
		amountPayable = parseInt(totalPriceList+discountPrice)
		totalAmount.innerHTML = "<div> Total Price RS. "+ totalPriceList +"</div><br/><div> Delivery Charges      RS."+ discountPrice +"</div><br/><div> Amount Payable     RS."+ amountPayable +"</div><br/>"

		document.getElementById("priceDetails").appendChild(totalAmount)
		

	}

	function filterProductBasedonPincode(){
		document.getElementById('pincode').value

	}

	//priceList(0,0,'add');

	function addToCartGetData(data,status,i){
		priceList(data,status,i)
	}
	function removeFromCartGetData(data,status,i){
		priceList(data,status,i)
	}


	function filterProduct(){
		console.log(document.getElementById('pincode').value)
	}