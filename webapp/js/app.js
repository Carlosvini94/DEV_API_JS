$(document).ready(function ($) {
    listData()
})

function listData() {
    $.get('http://localhost:3000/bills/', function (result) {
        $('#list-table tbody').empty()
        if (!result.lenght && !result.status) {
            return
        }
        
        result.data.forEach(function (bill) {
            let idBill = bill._id
            let tmpl = '<tr>' +
                       '   <td>' + bill.title + '</td>' +
                       '   <td>' + bill.price + '</td>' +
                       '   <td><button class="btn btn-danger btn-sm" id="btn_delete" data-id="' + idBill +'">Delete</button></td>' +
                       '</tr>'
            $('#list-table tbody').append(tmpl)
        });
    })
}

function createBill(billTitle, billPrice){
    if(!billTitle || !billPrice){
        console.log("Invalide Body")
    }
    $.post('http://localhost:3000/bills/', {
        title: billTitle,
        price: billPrice
    })
}

$('#sendBill').on('click', function(){
    let billTitle = $('#billName').val();
    let billPrice = $('#billPrice').val();

    createBill(billTitle, billPrice)
    listData()
})

const removeBill = function(){
    let id = $(this).data('id')
    $.ajax({
        type: "Delete",
        url: "http://localhost:3000/bills/" + id,
        success: function(){
            listData()
        }
    })
}

$('#list-table tbody').on('click', '#btn_delete', removeBill)
