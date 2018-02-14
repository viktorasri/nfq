const productsUrl = 'data/projects.json';
var products = [];

fetch(productsUrl)
	.then(blob => blob.json())
	.then(data => products.push(...data)));

console.log(products);


renderProducts(products);

//Remove all childs from selected node
function clearContent(node) {
	while (node.firstChild) {
		node.removeChild(node.firstChild);
	}
}


function renderProducts(data) {
	console.log(data)
	var productList = document.querySelector('.product-list');
	if (!productList) return;
	clearContent(productList);
	data.forEach(product=>{
		console.log(product)
		var content = `
						<li class="product">
                			<img src="${product.img.thumb}" alt="${product.title}">
			                <div class="top-product-container">
			                    <div class="country">${product.filtertags.country}</div>
			                    <div class="price">${product.price}<i class="fa fa-eur"></i></div>
			                    <div class="date">${product.date}</div>
			                </div>
			                <div class="title">
			                    <h3>${product.title}</h3>
			                </div>
			            </li>
		`;
		productList.insertAdjacentHTML('beforeend',content)
	})
}

function findMatches(wordToMatch, products) {
	return products.filter(product=>{
		const regex = new RegExp(wordToMatch,'gi');
		return product.title.match(regex) || product.filtertags.country.match(regex)
	})
}




//
// searchInput.addEventListener('change',()=>{
// 	const matchArray=findMatches(this.value,cities);
// });
// searchInput.addEventListener('keyup',renderMatches);
