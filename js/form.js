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

emailForm.on('submit', function(e) {
    var val = emailInput.val();
    if (!checkEmailValid(val)) {
        e.preventDefault();
        emailInput.parent().addClass('error');
        if (emailInput.val() === "") {
            emailInput.attr('placeholder','Example@email.com');
        }
    }
});

function checkEmailValid(val) {
    if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val)) {
        return true;
    } else {
        return false;
    }
}

const scriptURL = `http://127.0.0.1:5500/send-email`;
const submitKey = `AKfycbxC6KsTT3A4pt4Gze90E00nDU6dOqSbUnLqJnLTtHrPLcqSOR7MiXXnhhcI0bKoL5hC3g`;

function subForm (form) {
    var email = form.find('.email').val();
    $.ajax({
        url: scriptURL,
        type:'POST',
        data:JSON.stringify({email:email}),
        success: function(){
            form.removeClass('error');
            form.find('.email').val("");
            form.find('.email').attr('placeholder','Thank you! See you around!');
        },
        error: function(err) {
            form.addClass('error');
            form.find('.email').attr('placeholder','Whoops, make sure it\'s an email');
        }
    });
}

  function updateDateTime() {
    const now = new Date();
    const datetimeString = now.getFullYear();
    document.getElementById('datetime').textContent = datetimeString;
  }
updateDateTime();
