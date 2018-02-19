var ordersUrl = 'data/orders.json';
var orders = [];
var orderspage = 1;
var orderPerPage = 10;

fetch(ordersUrl)
	.then(blob => blob.json())
	.then(data => {
		orders.push(...data);
		renderOrders(orders);
	});


//Remove all childs from selected node
function clearContent(node) {
	while (node.firstChild) {
		node.removeChild(node.firstChild);
	}
}

function renderOrders(data) {
	var ordersList = document.querySelector('.ordersList');
	if (!ordersList) return;
	clearContent(ordersList);
	if (data.length===0) {
		let warn = '<li class="warn">No search result was found, please try other keywords</li>'
		ordersList.insertAdjacentHTML('beforeend',warn)
		return
	}
	data.sort(compare)
	data.forEach(order=>{
		let content = `
						<li class="order hide">
                			<span class="date">${order.orderdate}</span>
                			<span class="sku">${order.sku}</span>
                			<span class="customer">${order.name} ${order.lastname}</span>
			            </li>
		`;
		ordersList.insertAdjacentHTML('beforeend',content)
	});
	ordersPagination(orderspage);
}

function ordersPagination(pageNo) {
	//hide all list elements
	var list = document.querySelectorAll('.order');
	list.forEach(li => li.classList.add('hide'));
	
	//remove hide class from selected amount of pages
	for (let n = 0; n<pageNo*orderPerPage; n++){
		if (!list[n]) return
		list[n].classList.remove('hide')
	}
}


function searchOrder() {
	orderspage = 1; //resets paging value
	var filteredArray = findMatchesInOrders(this.value,orders,this.dataset.id);
	renderOrders(filteredArray)
}

function findMatchesInOrders(wordToMatch, orders, prop) {
	return orders.filter(order=>{
		const regex = new RegExp(wordToMatch,'gi');
		order["fullname"] =`${order.name} ${order.lastname}`;
		return order[prop].match(regex)
	})
}

function compare(a,b) {
	if (a.orderdate < b.orderdate)
		return 1;
	if (a.orderdate > b.orderdate)
		return -1;
	return 0;
}


$('.show-more-orders').click(function () {
	var listN = Math.ceil(document.querySelectorAll('.order').length);
	if (orderspage < listN/orderPerPage){
		orderspage++;
		ordersPagination(orderspage)
	}
});

$('.show-less-orders').click(function () {
	if (orderspage > 1){
		orderspage--;
		ordersPagination(orderspage)
	}
});

$('.searchInOrders').keyup(searchOrder);
$('.searchInOrders').change(searchOrder);