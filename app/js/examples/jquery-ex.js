var nameInput = $("input[name='name-field']");
$(nameInput).change(function() {
    var value = $(nameInput).val();
    var output = $(".aml-hello-ex-output .aml-hello-title");
    $(output).text(value);
});

// De-registration code omitted