<!doctype html>
<html lang="en">
<?php include('parts/head.php') ?>

<body>
<?php include('parts/header.php') ?>
<main class="main">
    <section class="products">
        <div class="products-header">
            <div class="row">
                <h1>Choose from our best deals</h1>
                <div>
                    <input class="search" type="text" placeholder="Search">
                    <button class="btn-filter">Filter <i class="fa fa-filter"></i></button>
                </div>
            </div>
            <div class="filters row hide"></div>
        </div>
        <ul class="product-list row">
            <li class="product">
                <img src="img/products/rome.jpg" alt="">
                <div class="top-product-container">
                    <div class="country">Italy</div>
                    <div class="price">299<i class="fa fa-eur"></i></div>
                    <div class="date">2019-12-5</div>
                </div>
                <div class="title">
                    <h3> lorm ipsum </h3>
                </div>
            </li>
            <li class="product">
                <img src="img/products/barcelona.jpg" alt="">
                <div class="top-product-container">
                    <div class="country">Spain</div>
                    <div class="price">299<i class="fa fa-eur"></i></div>
                    <div class="date">2019-12-5</div>
                </div>
                <div class="title">
                    <h3> lorm ipsum </h3>
                </div>
            </li>
        </ul>
        <div class="pagination">
            <button class="show-more">more<i class="fa fa-caret-down"></i></button>
            <button class="show-less">less<i class="fa fa-caret-up"></i></button>
        </div>
    </section>
</main>
<?php include('parts/footer.php') ?>
</body>
</html>