function mostrarJob() {
    // Hide all job elements
    $('.job').hide();
    
    // Get the data-id of the selected input
    const id = $(this).data('id');
    
    // Show only the selected job if checked
    if ($(this).is(':checked')) {
        $(`#job${id}`).show();
    }
}

$(function() {
    // Set up the event listener and trigger it initially
    $('input[name="jobs"]').on('change', mostrarJob);
    // Check initial state of all inputs on page load
    $('input[name="jobs"]:checked').each(mostrarJob);
});
