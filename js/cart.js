if (document.readyState == "loading") {
	document.addEventListener("DOMContentLoaded", ready);
} else {
	ready();
}
function ready() {
	var removeCartItemButtons = document.querySelectorAll(".btn-danger");
	// console.log(removeCartItemButtons)
	for (var i = 0; i < removeCartItemButtons.length; i++) {
		var button = removeCartItemButtons[i];
		button.addEventListener("click", removeCartItem);
	}
	var addToCartButtons = document.getElementsByClassName("cart-btn");
	for (var i = 0; i < addToCartButtons.length; i++) {
		var button = addToCartButtons[i];
		button.addEventListener("click", addToCartClicked);
	}
	updateCartTotal();
}
function addToCartClicked(event) {
	var button = event.target;
	var shopItem = button.parentElement.parentElement.parentElement;
	// console.log(shopItem);
	const discountItem = shopItem.querySelector(".discount");
	const titleItem = shopItem.querySelector(".content h3");
	const imgItem = shopItem.querySelector(".image img");
	const priceItem = shopItem.querySelector(".price span");
	// console.log(
	// 	discountItem.innerText,
	// 	titleItem.innerText,
	// 	imgItem.src,
	// 	priceItem.innerText
	// );
	const discount = discountItem.innerText;
	const title = titleItem.innerText;
	const imgSrc = imgItem.src;
	const price = priceItem.innerText;

	addItemToCart(discount, title, imgSrc, price);
	updateCartTotal();
}
function addItemToCart(discount, title, imgSrc, price) {
	var cartRow = document.createElement("div");
	cartRow.classList.add("cart__row");
	var cartItems = document.getElementsByClassName("cart__body")[0];
	var cartRowContents = `
    <div class="cart__img">
        <img alt="cart-item" srcset="${imgSrc} 2x" /></div>
        <div class="cart__desc">
            <div class="cart__info">
                <p class="cart__name">${title}</p>
                <span class="cart__discount">Discount:${discount}</span>
                <p class="cart__price">Price:${price}</p>
            </div>
        	<div class="cart-quantity">
                <input class="cart-quantity-input" type="number" value="1" />
                <button class="btn-cart btn-danger" type="button">REMOVE</button>
            </div>
        </div>`;
	cartRow.innerHTML = cartRowContents;
	cartItems.append(cartRow);
	cartRow
		.getElementsByClassName("btn-danger")[0]
		.addEventListener("click", removeCartItem);
}

function removeCartItem(event) {
	var buttonClicked = event.target;
	// console.log(buttonClicked.parentElement.parentElement.parentElement)
	buttonClicked.parentElement.parentElement.parentElement.remove();
	updateCartTotal();
}
function updateCartTotal() {
	const cartBody = document.getElementsByClassName("cart__body")[0];
	const cartDesc = cartBody.getElementsByClassName("cart__desc");
	// console.log(cartBody)
	// console.log(cartItems)
	var total = 0;
	var discount = 0;
	for (var i = 0; i < cartDesc.length; i++) {
		const cartInfo = cartDesc[i];
		const discountElement =
			cartInfo.getElementsByClassName("cart__discount")[0];
		const priceElement =
			cartInfo.getElementsByClassName("cart__price")[0].innerText;
		const quantityElement = cartInfo.getElementsByClassName(
			"cart-quantity-input"
		)[0];
		const discountPercent = parseFloat(
			discountElement.innerText.replace("Discount:-", "")
		);
		// console.log(discountPercent)
		const price = parseFloat(priceElement.replace("Price:$", ""));
		const quantity = quantityElement.value;
		total = total + price * quantity;
		const totalPrice = total;
		console.log("total price :", totalPrice);
		discount = discountPercent;
		console.log("% discount:", discount);
		const totalDiscount = discount;
		const priceDiscount = (totalDiscount * totalPrice) / 100;
		console.log("price discount:", priceDiscount);
		var priceAfterDiscount = totalPrice - priceDiscount;
		console.log("price after discount:", priceAfterDiscount);
	}
	priceAfterDiscount = Math.round(priceAfterDiscount * 100) / 100;
	document.getElementsByClassName("cart__total-price")[0].innerText =
		"$" + priceAfterDiscount;
}
