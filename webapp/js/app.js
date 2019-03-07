$(document).ready(function ($) {
    const lsitData = function () {
        $.get('http://localhost:3000/bills/', function (result) {
            console.log(result)
            if (!result.lenght && !result.status) {
                return;
            }

            result.data.forEach(function (bill) {
                let tmpl = '<tr>' +
                           '   <td>' + bill.title + '</td>' +
                           '   <td>' + bill.price + '</td>' +
                           '</tr>'
                $('#list-table tbody').append(tmpl)
            });
        })
    }

    lsitData()
})