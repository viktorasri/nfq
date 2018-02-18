<!doctype html>
<html lang="en">
<?php include('parts/head.php') ?>

<body>
<?php include('parts/header.php') ?>
<main class="main">
    <section class="orders">
        <div class="orders-header">
                <div class="row">
                    <h1>Orders list</h1>
                    <div class="listHeading">
                        <span class="date">Order date <input data-id="orderdate" class="searchInOrders" type="text" placeholder="search"></span>
                        <span class="sku">Order SKU <input data-id="sku" class="searchInOrders" type="text" placeholder="search"></span>
                        <span class="customer">Customer <input data-id="fullname" class="searchInOrders" type="text" placeholder="search"></span>
                    </div>
                </div>
        </div>
        <div class="row">
            <ul class="ordersList"></ul>
        </div>
        <div class="pagination">
            <button class="show-more-orders">more<i class="fa fa-caret-down"></i></button>
            <button class="show-less-orders">less<i class="fa fa-caret-up"></i></button>
        </div>
    </section>
</main>
<?php include('parts/footer.php') ?>
</body>
</html>