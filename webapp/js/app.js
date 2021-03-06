$(document).ready(function ($) {
    listBills()
    listCategories()
})

function listBills() {
    $.get('http://localhost:3000/bills/', function (result) {
        $('#list-table tbody').empty()
        if (!result.lenght && !result.status) {
            return console.log("ERRO GET BILLS")
        }
        
        result.data.forEach(function (bill) {
            let idBill = bill._id
            let tmpl = '<tr>' +
                       '   <td>' + bill.title + '</td>' +
                       '   <td>' + bill.price + '</td>' +
                       '   <td><a href="http://localhost:3000/address/' + bill.cep + '" target="_blank">' + bill.cep + '</a></td>' +
                       '   <td><button class="btn btn-danger btn-sm" id="btn_delete" data-id="' + idBill +'">Delete</button></td>' +
                       '</tr>'
            $('#list-table tbody').append(tmpl);
        });
    })
}

function listCategories(){
    $.get('http://localhost:3000/categories/', function(result){
        $('#select-Categories').empty()
        if(!result.lenght && !result.status){
            return console.log("ERRO GET CATEGORIES")
        }
        let selectVal = '<option value="selectOne" selected>---</option>'
        result.data.forEach(function (category){
            selectVal += '<option value="' + category._id + '">' + category.name + '</option>'

        })
        $('#select-Categories').append(selectVal)
    })
}

function createBill(billTitle, billPrice, category, cep){
    if(!billTitle || !billPrice || !category){
        console.log("Invalide Body")
    }
    $.post('http://localhost:3000/bills/', {
        title: billTitle,
        price: billPrice,
        category: category,
        cep: cep
    })

    $('#billName').val("");
    $('#billPrice').val("");
    $('#billCep').val("")
}

$('#sendBill').on('click', function(){
    let billTitle = $('#billName').val();
    let billPrice = $('#billPrice').val();
    let category = $('#select-Categories').val();
    let cep = $('#billCep').val()

    createBill(billTitle, billPrice, category, cep)
    listBills()
    listCategories()
})

const removeBill = function(){
    let id = $(this).data('id')
    $.ajax({
        type: "Delete",
        url: "http://localhost:3000/bills/" + id,
        success: function(){
            listBills()
        }
    })
}

$('#list-table tbody').on('click', '#btn_delete', removeBill)

function createCategory(categoryName){
    if(!categoryName){
        console.log("Invalide Body")
    }
    $.post('http://localhost:3000/categories/', {
        name: categoryName,
    })
}

$('#sendCategory').on('click', function(){
    let categoryName = $('#categoryName').val();

    createCategory(categoryName)

    $('#categoryName').val("");
    listCategories()
})
