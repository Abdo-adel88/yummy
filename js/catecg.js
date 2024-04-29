



function gotolocal(pagename) {

    location.replace("index.html")

    localStorage.setItem("pages", JSON.stringify(pagename))

}





















let w = $("#sidebar").innerWidth();
let w1 = $('#sidebar > div').innerWidth();
$("#sidebar").css("left", -(w - w1));
$("#close").click(function () {
    $("#close").hide();
    $("#open").show();
    $("#sidebar").animate({ left: -(w - w1) }, 300, function () {
    });

});
$("#open").click(function () {
    $("#sidebar").css("z-index", 99999999);
    $("#open").hide();
    $("#close").show();
    $("#sidebar").animate({ left: 0 }, 300);
    $("li").css("top", "50%");
    $("li").eq(0).animate({ top: "0px" }, 400);
    $("li").eq(1).animate({ top: "0px" }, 500);
    $("li").eq(2).animate({ top: "0px" }, 600);
    $("li").eq(3).animate({ top: "0px" }, 700);
    $("li").eq(4).animate({ top: "0px" }, 800);
});

function regexes(ele) {
    let regex = {
        namevalid: /^[a-z]{3,15}$/i,
        emailvalid: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
        phonevalid: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
        agevalid: /^[1-9][0-9]$/,
        passwordvalid:
            /^.{8,}$/,
    };
    let regexmsg = {
        namevalid: "enter your name correct",
        emailvalid: "enter your email correct",
        phonevalid: "enter your phone number correct",
        agevalid: "your age should older than 9 years to submit",
        passwordvalid:
            "It must not be less than 8 characters",
    };
    if (regex[ele.id].test(ele.value) == false) {
        $(`#${ele.id} + p`).html(
            `<span class='text-red-600 text-lg'>${regexmsg[ele.id]}</span>`
        );
    } else if (regex[ele.id].test(ele.value) == true) {
        $(`#${ele.id} + p`).html(
            `<span class='text-green-600 text-2xl '>Success</span>`
        );
    }
}
$(`input:not(input[id='repassword'])`).on("input", function (e) {
    regexes(e.target);
});
$(`#repassword`).on("input", function (e) {
    if (e.target.value != $(`#passwordvalid`).val()) {
        $(`#repassword + p`).html(
            `<span class='text-red-600 text-lg '>this password must equal the password you just enter</span>`
        );
    } else {
        $(`#repassword + p`).html(
            `<span class='text-green-600 text-2xl '>Success</span>`
        );
    }
});
$('input').on('keyup', function () {
    let count = 0;
    for (let i = 0; i < 6; i++) {
        if ($('p > span').eq(i).text() == 'Success') {
            count++;
        }

    }
    if (count === 6) {
        $('button').removeAttr('disabled');
        $('button').css('filter', 'grayscale(0)');
    }
    else {
        $('button').attr('disabled', 'disabled');
        $('button').css('filter', 'grayscale(100%)');
    }
});
$('button').click(function () {
    $('button + span').text('Your are registered');
    $('button + span').fadeToggle(3000);
    let users = {
        username: $('#namevalid').val(),
        email: $('#emailvalid').val(),
        password: $('#passwordvalid').val(),
        age: $('#agevalid').val(),
        phone: $('#phonevalid').val(),
    }
    localStorage.setItem('userAccount', JSON.stringify(users));
    users = {
        username: $('#namevalid').val(""),
        email: $('#emailvalid').val(""),
        password: $('#passwordvalid').val(""),
        age: $('#agevalid').val(""),
        phone: $('#phonevalid').val(""),
        phone: $('#phonevalid').val(""),
    }

});






