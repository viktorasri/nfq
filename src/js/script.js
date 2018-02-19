var productsUrl = 'data/projects.json';
var products = [];
var page = 1;
var showPerPage = 4;

fetch(productsUrl)
	.then(blob => blob.json())
	.then(data => {
		products.push(...data)
		renderProducts(products);
	});


//Remove all childs from selected node
function clearContent(node) {
	while (node.firstChild) {
		node.removeChild(node.firstChild);
	}
}


function renderProducts(data) {
	var productList = document.querySelector('.product-list');
	if (!productList) return;
	clearContent(productList);
	if (data.length===0) {
		let warn = '<li class="warn">No search result was found, please try other keywords</li>'
		productList.insertAdjacentHTML('beforeend',warn)
		return
	}
	data.forEach(product=>{
		var content = `
						<li class="product hide">
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
	});
	pagination(page);
	getFilters(data);
}

//toggle class hide for selected pages
function pagination(pageNo) {
	//hide all list elements
	var list = document.querySelectorAll('.product');
	list.forEach(li => li.classList.add('hide'));
	//remove hide class from selected amount of pages
	for (let n = 0; n<pageNo*showPerPage; n++){
		if (!list[n]) return
		list[n].classList.remove('hide')
	}
}

//return array with items which match search input value
function findMatches(wordToMatch, products) {
	return products.filter(product=>{
		const regex = new RegExp(wordToMatch,'gi');
		return product.title.match(regex) || product.filtertags.country.match(regex)
	})
}

//render search results
function search() {
	page = 1; //resets paging value
	var filteredArray = findMatches(this.value,products);
	renderProducts(filteredArray)
}



//creates new object with filter keys and values
function getFilters(products){
	const filters = products.reduce(function(obj, item) {
		for(var key in item.filtertags) {
			var value = item.filtertags[key];
			if (!obj[key]){
				obj[key] = {};
			}
			if (!obj[key][value]) {
				obj[key][value] = 0;
			}
			obj[key][value]++
		}
		return obj;
	}, {});
	//render filters
	var html = '';
	for (var filter in filters){
		var content = '';
		for (var prop in filters[filter]){
			content += `<li data-tag="${filter}" data-value="${prop}">${prop}(<span>${filters[filter][prop]}</span>)</li>`;
		}
		html += `
					<div>
						<h5>${filter}</h5>
						<ul>${content}</ul>
					</div>
		`;
	}
	const filterMenu = document.querySelector('.filters')
	filterMenu.innerHTML = html;
	filterMenu.addEventListener('click',(e) => {
		e.target.nodeName === 'LI'? filterByTags(e.target.dataset.tag,e.target.dataset.value,products) : null
		e.target.nodeName === 'SPAN'? filterByTags(e.target.parentNode.dataset.tag,e.target.parentNode.dataset.value,products) : null
	})
}

//renders filtered items
function filterByTags(key,value,data) {
	var filteredArray = data.filter(item => item.filtertags[key] === value);
	renderProducts(filteredArray);
}

$('.search').keyup(search);
$('.search').change(search);

$('.show-more').click(function () {
	var listN = Math.ceil(document.querySelectorAll('.product').length);
	if (page < listN/showPerPage){
		page++;
		pagination(page);
	}
});

$('.show-less').click(function () {
	if (page > 1){
		page--;
		pagination(page);
	}
});

$('.btn-filter').click(function () {
	$('.filters').slideToggle().toggleClass('hide');
})


$('.mobile-nav').click(function () {
	$('.main-nav').toggleClass('menu-active')
})