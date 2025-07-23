var emailInput = $('.email');
var emailForm = $('.form-email');
var submitButton = $('.form-email .button');

emailForm.each(function() {
    $(this).keypress(function(e){
        if(e.keyCode === 13) {
            return false
        }
    })
})

emailInput.each(function() {
    $(this).keydown(function(e) {
        var keyCode = e.keyCode;
        var val = $(this).val();
        if (keyCode == 13) {
            if (checkEmailValid(val)) {
                subForm($(this).parent());
                $(this).val("");
                $(this).parent().removeClass('error');
                $(this).attr('placeholder','Thank you! See you around!');
            } else {
                $(this).parent().addClass('error');
                if ($(this).val() === "") {
                    $(this).attr('placeholder','Example@email.com');
                }
            }
        }
    })
})

submitButton.each(function() {
    $(this).click(function(e) {
        e.preventDefault();
        var val = $(this).parent().find('input').val();
        var input = $(this).parent().find('input');
        var form = $(this).parent();
        if (checkEmailValid(val)) {
            subForm(form);
            input.val("");
            form.removeClass('error');
            input.attr('placeholder','Thank you! See you around!');
        } else {
            form.addClass('error');
            if (input.val() === "") {
                input.attr('placeholder','Example@email.com');
            }
        }
    })
})

function checkEmailValid(val) {
    if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val)) {
        return true;
    } else {
        return false;
    }
}

const scriptURL = `https://api.apispreadsheets.com/data/9327/`;
const submitKey = `AKfycbxC6KsTT3A4pt4Gze90E00nDU6dOqSbUnLqJnLTtHrPLcqSOR7MiXXnhhcI0bKoL5hC3g`;

function subForm (form) {
    $.ajax({
        url: scriptURL,
        type:'post',
        data:form.serializeArray(),
        success: function(){
        },
    });
}