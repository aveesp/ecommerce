var product = {
    init : init,
    buildUI : buildUI,
    props: {
        productData: 0,
    },
    productCnt : productCnt,
    sizeFilter : sizeFilter,
    priceFilter : priceFilter,
    filterData : filterData,
    bindEvents : bindEvents,
    changeView : changeView,
    categoryFilter: categoryFilter,
    totalCount: 0
}

product.productCnt = $('#productCnt');
product.totalCount = $('#productCount');
function init(){
    // Toggle view from grid to list OR list to grid 
    product.changeView();

    // Fetching json file object 
    $.getJSON( "../../src/data/products.json", function(res) {
            product.props.globalData = res;
        })
        .done(function( data ) {
            product.buildUI(data);
        });
    product.bindEvents();
}

function bindEvents(){

    // filter data on filte mode selected
    $('#fillterData').on('change', function(){
        product.filterData(this.value);
    });

    /* Filtering Data */
    // filter data based on sizes
    $('#size').on('change', function(){
        product.sizeFilter(this.value);
    });

    // filter data based on price
    $('#price').on('change', function(){
        priceFilter(this.value);
    });

    $('#category').on('change', function(){
        product.categoryFilter(this.value);
    });
}

// create UI
function buildUI(data){
    // clearing old data
    product.productCnt.empty();

    //showing result of data
    product.totalCount.html(data.length);

    // looping throught JSON object
    $.each( data, function( i, item ) {
        var icon, oldPrice, savings = '';
        var products = null;
        var imgCnt = '<img src="'+ item.picture +'" alt="'+ item.name +'">';
        ratings = new String();

        // setting condition for product is favourite or not
        if(item.isFav){
            icon = '<span class="isFav"><i class="fa fa-heart fa-2x"></i></span>';
        }else{
            icon = '<span class="isFav"><i class="fa fa-heart-o fa-2x"></i></span>';
        }

        // looping for star icon
        for(var i=0; i < item.rating; i++){
            ratings += '<i class="fa fa-star"></i>';
        }
        if(item.oldPrice){
            oldPrice = '<span class="oldPrice">'+ item.oldPrice +'</span>';
        }
        else{
            oldPrice = '';
        }
        if(item.savings){
            savings = '<span class="youSavePrice">You save '+ item.savings+'</span>'
        }
        else{
            savings = '';
        }
        
        product.productCnt.append('<li class="col-sm-4 productWrapper" data-isFav="'+ item.isFav +'"><a href="'+ item.url +'"><div class="productCnt"><div class="imgCnt">'+ imgCnt + icon +'</div><div class="productDetails"><div class="productTitle">'+ item.name +'</div><div class="ratingsCnt"><span class="ratingText">'+ item.size +'</span><span class="ratingStarCnt">'+ ratings +'</span></div><div class="productPrice"><span class="price">'+ item.price +'</span><span>'+ oldPrice + savings +'</span></div></div></div></a></li>');
    });
}


// filteringData
function sizeFilter(inputTxt){
    var tmp = [];
    if(inputTxt == 'All'){
        tmp = product.props.globalData;
    }
    else{
        product.props.globalData.filter(function(item){
            if(item.size == inputTxt){
                tmp.push(item);
            }
        });
    }
    product.buildUI(tmp);
}

function priceFilter(givenPrice){
    var tmp = [];
    if(givenPrice == 'All'){
        tmp = product.props.globalData;
    }
    else{
        product.props.globalData.filter(function(item){
            if(item.price.split('$')[1] > givenPrice.split('-')[0] && item.price.split('$')[1] < givenPrice.split('-')[1]){
                tmp.push(item);
            }
            else if(givenPrice === 'Select'){
            }
        })
    }
    product.buildUI(tmp);
}

// filtering Data 
function filterData(inputtxt){
    var tmp = [];
    if(inputtxt == 'price ascending'){
        product.props.globalData.filter(function(item){
            if(item.isFav){
                tmp.push(item);
            }
        })
    }
    else if(inputtxt == 'price descending'){
        alert('filter by price high')
    }
    else{
        alert('By Name')
    }

}

// Toggle view
function changeView(){
    $('button').on('click',function(e) {
        $('button.changeView').removeClass('active');
        if ($(this).hasClass('grid')) {
            $(this).addClass('active');
            product.productCnt.removeClass('list').addClass('grid');
        }
        else if($(this).hasClass('list')) {
            $(this).addClass('active');
            product.productCnt.removeClass('grid').addClass('list');
        }
    });
}

function categoryFilter(val){
    let li = document.getElementsByClassName('productWrapper');
    let count = 0;
    if(val !== 'All'){
        let isFav = val.split('=')[1];
        for(let i=0; i < li.length; i++){
            if(li[i].getAttribute('data-isFav') == isFav){
                li[i].style.display = '';
                count++;
            }
            else{
                li[i].style.display = 'none';
            }
        }
    }
    else{
        for(let i=0; i < li.length; i++){
            li[i].style.display = 'block';
            count++;
        }
    }
    product.totalCount.html(count);
}