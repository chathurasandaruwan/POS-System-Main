$('#home').css({display:"block"});
$('#customer').css({display:"none"});
$('#item').css({display:"none"});
$('#place_order').css({display:"none"});
$('#order_details').css({display:"none"});
$('.nav-link').removeClass('active');
$('#home-nav').addClass('active');


$('#home-nav').on('click',() => {
    $('#home').css({display:"block"});
    $('#customer').css({display:"none"});
    $('#item').css({display:"none"});
    $('#place_order').css({display:"none"});
    $('#order_details').css({display:"none"});

    $('.nav-link').removeClass('active');
    $('#home-nav').addClass('active');
});

$('#customer-nav').on('click',() =>{
    $('#home').css({display:"none"});
    $('#customer').css({display:"block"});
    $('#item').css({display:"none"});
    $('#place_order').css({display:"none"});
    $('#order_details').css({display:"none"});

    $('.nav-link').removeClass('active');
    $('#customer-nav').addClass('active');
});

$('#item-nav').on('click',() => {
    $('#home').css({display:"none"});
    $('#customer').css({display:"none"});
    $('#item').css({display:"block"});
    $('#place_order').css({display:"none"});
    $('#order_details').css({display:"none"});

    $('.nav-link').removeClass('active');
    $('#item-nav').addClass('active');
});

$('#place_order-nav').on('click',() =>{
    $('#home').css({display:"none"});
    $('#customer').css({display:"none"});
    $('#item').css({display:"none"});
    $('#place_order').css({display:"block"});
    $('#order_details').css({display:"none"});

    $('.nav-link').removeClass('active');
    $('#place_order-nav').addClass('active');
});

$('#order_details-nav').on('click',()=>{
    $('#home').css({display:"none"});
    $('#customer').css({display:"none"});
    $('#item').css({display:"none"});
    $('#place_order').css({display:"none"});
    $('#order_details').css({display:"block"});

    $('.nav-link').removeClass('active');
    $('#order_details-nav').addClass('active');
});
