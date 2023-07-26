document.addEventListener("DOMContentLoaded", function() {
    googleTranslateElementInit();
});

$("#hamburger").click(function(){
    let icon = $("#hamburger");
    let menu = $("#menu");
    if (icon.hasClass("fa-xmark")) {
        icon.removeClass("fa-xmark");
        icon.addClass("fa-bars");

        menu.removeClass("menu-responsive");
        menu.addClass("menu");
    } else {
        icon.removeClass("fa-bars");
        icon.addClass("fa-xmark");

        menu.removeClass("menu");
        menu.addClass("menu-responsive");
    }
});

function togglePaymentInfoVisibility() {
    let view = document.getElementById('payment_section');
    let cardOption = document.getElementById('option_card');

    if (cardOption.checked) {
        view.style.display = 'grid';
    } else {
        view.style.display = 'none';
    }
}

function changePageNameFooter(currentPage) {
    const element = document.getElementById("page-name")
    element.innerHTML = `You are at <span class="visitor-count"><u>${currentPage}</u></span> page.`;
}

function navigateToAddPitch(campsiteId) {
    window.location.href = `createpitch.php?campsite_id=${campsiteId}`;
}

function navigateToAddAttraction(campsiteId) {
    window.location.href = `createattraction.php?campsite_id=${campsiteId}`;
}

function navigateToAddFeature(campsiteId) {
    window.location.href = "createpitch.php";
}

function deleteUser(btn) {
    $.post({
        url: "action/deleteuser.php",
        data: {
            user_id: btn.id
        },
        success: function () {
            let row = btn.parentNode.parentNode;
            row.parentNode.removeChild(row);
        }
    });
}

function deleteFeature(btn) {
    $.post({
        url: "action/deletefeature.php",
        data: {
            feature_id: btn.id
        },
        success: function () {
            let row = btn.parentNode.parentNode;
            row.parentNode.removeChild(row);
        }
    });
}

function deleteCampsite(btn) {
    $.post({
        url: "action/deletecampsite.php",
        data: {
            campsite_id: btn.id
        },
        success: function () {
            let row = btn.parentNode.parentNode;
            row.parentNode.removeChild(row);
        }
    });
}

function createFeature() {
    let featureName = $("#txtFeatureName").val();
    $.post({
        url: "action/createfeature.php",
        data: {
            feature_name: featureName
        },
        success: function () {
            console.log(`Success`);
            location.reload();
        }
    });
}

function createBooking(campsiteId, pitchId, userId) {
    let guestCount = $("#guest").val();
    console.log(`guestCount: ${guestCount}`);
    let pitchPrice = $("#price").text();
    console.log(`pitchPrice: ${pitchPrice}`);
    let taxPrice = $("#tax-fee").text();
    console.log(`taxPrice: ${taxPrice}`);
    let serviceFee = $("#service-fee").text();
    console.log(`serviceFee: ${serviceFee}`);
    let totalPrice = $("#total-fee").text();
    console.log(`totalPrice: ${totalPrice}`);
    $.post({
        url: "action/createbooking.php",
        data: {
            guest_count: guestCount,
            pitch_price: pitchPrice,
            tax_price: taxPrice,
            service_fee: serviceFee,
            total_price: totalPrice,
            campsite_id: campsiteId,
            pitch_id: pitchId,
            user_id: userId,
        },
        success: function () {
            console.log(`Success`);
        }
    });
}

function acceptBooking(btn) {
    updateBooking(btn.id, "accepted")
}

function declineBooking(btn) {
    updateBooking(btn.id, "declined")
}

function updateBooking(bookingId, status) {
    $.post({
        url: "action/updatebookingstatus.php",
        data: {
            booking_id: bookingId,
            booking_status: status
        },
        success: function () {
            console.log(`Success`);
            location.reload();
        }
    });
}