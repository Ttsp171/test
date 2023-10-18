jQuery(document).ready(function () {
    jQuery('.dashboard .status-selector').each(function () {
        jQuery(this).change(function () {

            if (jQuery(this).val() == "Completed") {
                var d = new Date();

                var month = d.getMonth() + 1;
                var day = d.getDate();

                var output = d.getFullYear() + '-' +
                    (month < 10 ? '0' : '') + month + '-' +
                    (day < 10 ? '0' : '') + day;
                jQuery(this).parent().siblings('.confirm-date').text(output);

            }
        })
    })
    jQuery('.form-control').datepicker({
        format: 'yyyy-mm-dd',
        autoclose: true,
    });
    function tableToCSV() {

        var csv_data = [];
        jQuery('.dashboard-table thead tr:visible').each(function () {

            var cols = jQuery(this).find('th');


            var csvrow = [];
            cols.each(function () {
                csvrow.push(jQuery(this).text());
            });

            csv_data.push(csvrow.join(","));
        });
        jQuery('.dashboard-table tbody tr:visible').each(function () {


            var href = jQuery(this).find('.path').attr('href');
            var status1 = jQuery(this).find('select').val();
            var csvrow = [jQuery(this).children('.sn').text(), jQuery(this).children('.name').text(), jQuery(this).children('.create-date').text(), jQuery(this).children('.buid-no').text(), jQuery(this).children('.room-no').text(), jQuery(this).children('.subject').text(), jQuery(this).children('.message').text(), href, status1, jQuery(this).children('.confirm-date').text()];

            csv_data.push(csvrow.join(","));
        });

        csv_data = csv_data.join('\n');

        downloadCSVFile(csv_data);
    }

    function downloadCSVFile(csv_data) {
        var CSVFile = new Blob([csv_data], {
            type: "text/csv"
        });

        var jQuerytemp_link = jQuery('<a></a>');

        jQuerytemp_link.attr('download', 'Ticket Dashboard.csv');
        jQuerytemp_link.attr('href', window.URL.createObjectURL(CSVFile));

        jQuerytemp_link.css('display', 'none');

        jQuery('body').append(jQuerytemp_link);

        jQuerytemp_link[0].click();

        jQuerytemp_link.remove();
    }
    jQuery('.dashboard-filter-wrap #csv-download-button').click(function () {
        tableToCSV();
    })

    jQuery('.wrap-login100 input').each(function () {
        jQuery(this).focusout(function(){
            if(jQuery(this).val()!=""){
                jQuery(this).addClass('has-val')
            }
            else{
                jQuery(this).removeClass('has-val')
            }
        })
        
    })
  
    jQuery('#myTable').DataTable( {
        // dom: 'Bfrtip',
        "buttons": [
          'excel'
        ]
    } );
    jQuery('table#myTable .status-selector').each(function(){
        jQuery(this).change(function(){
        if(jQuery(this).val()=='Completed'){
         jQuery(this).prop('disabled',true)   
        }    
        })
        
    })
    jQuery('table#myTable .status-selector').each(function(){
        
        if(jQuery(this).val()=='Completed'){
         jQuery(this).prop('disabled',true)   
        }    
                
    })
})