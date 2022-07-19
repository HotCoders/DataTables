$(document).ready(function() {
    $('#example').dataTable( {
        "ajax": "./tableData.txt",
        "columns": [
            { "data": "id" },
            { "data": "name" },
            { "data": "age" },
            { "data": "emial" },
            { "data": "address" },
            { "data": "country" },
            {"mRender": function ( data, type, row ) {
                return '<a class="delete"><i class="fa fa-trash-o"></i></a>';}
        }
            
        ]
    } );
    var count = 0;   

    $("#btnAddTable").click(function(){
        var fname =$("#fullname").val();
        var address =$("#address").val();
        var age =$("#age").val();
        var emial=$("#email").val();
        var country= $("#country").val();     
        var table = $('#example').DataTable();
        const regx= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(fname ==''){
            $("#fullname").parent().addClass('has-error');
        }else{
            $("#fullname").parent().removeClass('has-error');
        }
        if( age == ''){
            $("#age").parent().addClass('has-error');
        }else if(isNaN(age)){
            $("#age").parent().addClass('has-error');
            $("#age").next('span').html('Age must be a number');
        }else{
            $("#age").parent().removeClass('has-error');
        }
        if(emial =='' ){
            $("#email").parent().addClass('has-error');
        }else if(!regx.test(emial)){
            $("#email").parent().addClass('has-error');
            $("#email").next('span').html('Not a valid Email');
        }else{
            $("#email").parent().removeClass('has-error');
        }
        if(address == ''){
            $("#address").parent().addClass('has-error');
        }else{
            $("#address").parent().removeClass('has-error');
        }
        if(country == ''){
            $("#country").parent().addClass('has-error');
        }else{
            $("#country").parent().removeClass('has-error');
        }

       if($("form").children().hasClass('has-error') == false){
        if(count== 0){
            count = $('table tr:last td:first').text();
        }
        count++;
        table.row.add( {
            "id" :count,
            "name": fname,
            "age":   age,
            "emial":     emial,
            "address": emial,
            "country":     country,
            "action":'<a class="delete"><i class="fa fa-trash-o"></i></a>'
        } );
        table.order([0, 'dec']).draw();
           $("#addDetails").modal('hide');
       }   
    });
    $('#example').on('click', '.delete', function () {
        var pageData = $('#example').DataTable();
         var tableRow = pageData.row($(this).parents('tr'));
         pageData.row( tableRow ).remove().draw();
     });
    
} );
