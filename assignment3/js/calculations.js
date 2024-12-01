const $ = selector => document.querySelector(selector);

//PART1
const processEntries = evt => {
    const subtotal = parseFloat($("#subtotal").value);
    const taxRate = parseFloat($("#taxRate").value);

    if (isNaN(subtotal) || subtotal <= 0 || subtotal >= 10000) {
        alert("Subtotal must be > 0 and < 10000");
        $("#subtotal").focus();
    } else if (isNaN(taxRate) || taxRate <= 0 || taxRate >= 12) {
        alert("Tax Rate must be > 0 and < 12");
        $("#taxRate").focus();
    }

    const salesTax = subtotal * (taxRate / 100);
    const total = subtotal + salesTax;

    $("#salesTax").value = salesTax.toFixed(2);
    $("#total").value = total.toFixed(2);
    $("#subtotal").focus();
};

const clearEntries = () => {
    $("#subtotal").value = "";
    $("#taxRate").value = "";
    $("#salesTax").value = "";
    $("#total").value = "";
    $("#subtotal").focus();
};

const clearField = (event) => {
    event.target.value = "";
}


//PART 2
const makeChange = (amount) => {
    const quarters = Math.floor(amount / 25);
    amount %= 25;
    const dimes = Math.floor(amount / 10);
    amount %= 10;
    const nickels = Math.floor(amount / 5);
    const pennies = amount % 5;

    $("#quarters").value = quarters;
    $("#dimes").value = dimes;
    $("#nickels").value = nickels;
    $("#pennies").value = pennies;
};
const processEntrySecond = evt => {
    const amount = parseFloat($("#amount").value);
    if (isNaN(amount) || amount < 0 || amount > 99) {
        alert("The amount can not be less than 0 or grater than 99");
    } else {
        makeChange(amount);
    }
};


//PART3
const calculateTax = (taxableincome) => {
    let tax = 0;

    if (taxableincome <= 9875) {
        tax = taxableincome * 0.10;
    } else if (taxableincome <= 40125) {
        tax = 987.50 + (taxableincome - 9875) * 0.12;
    } else if (taxableincome <= 85525) {
        tax = 4617.50 + (taxableincome - 40125) * 0.22;
    } else if (taxableincome <= 163300) {
        tax = 14605.50 + (taxableincome - 85525) * 0.24;
    } else if (taxableincome <= 207350) {
        tax = 33271.50 + (taxableincome - 163300) * 0.32;
    } else if (taxableincome <= 518400) {
        tax = 47367.50 + (taxableincome - 207350) * 0.35;
    } else {
        tax = 156235 + (taxableincome - 518400) * 0.37;
    }
    return tax

};

const processEntryThird = evt => {
    const taxableincome = parseFloat($("#taxableincome").value);
    if (isNaN(taxableincome) || taxableincome <= 0) {
        alert("The taxable income must be greater than 0.");
        $("#taxableincome").focus();
        return;
    }

    const taxOwed = calculateTax(taxableincome);
    $("#taxowed").value = taxOwed.toFixed(2);
};

//PART4
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const processEntriesFourth = evt => {
    const arrivalDate = $("#arrival_date").value.trim();
    const nights = $("#nights").value.trim();
    const adults = $("#adults").value;
    const name = $("#name").value.trim();
    const email = $("#email").value.trim();
    const phone = $("#phone").value.trim();

    let isValid = true;

    if (arrivalDate === "") {
        $("#arrival_date_error").textContent = "Arrival date is required.";
        isValid = false;
    } else {
        $("#arrival_date_error").textContent = "";
    }

    if (nights === "" || isNaN(nights)) {
        $("#nights_error").textContent = "Nights must be numeric.";
        isValid = false;
    } else {
        $("#nights_error").textContent = "";
    }

    if (adults === "") {
        $("#adults_error").textContent = "Please select the number of adults.";
        isValid = false;
    } else {
        $("#adults_error").textContent = "";
    }

    if (name === "") {
        $("#name_error").textContent = "Name is required.";
        isValid = false;
    } else {
        $("#name_error").textContent = "";
    }

    if (!emailPattern.test(email)) {
        $("#email_error").textContent = "Must be a valid email address.";
        isValid = false;
    } else {
        $("#email_error").textContent = "";
    }

    if (phone === "") {
        $("#phone_error").textContent = "This field is required.";
        isValid = false;
    } else {
        $("#phone_error").textContent = "";
    }

    if (!isValid) {
        evt.preventDefault();
    }
};

//DOMContentLoaded Event
document.addEventListener("DOMContentLoaded", () => {
    //Part1
    $("#calculate").addEventListener("click", processEntries);
    $("#clear").addEventListener("click", clearEntries);
    $("#subtotal").addEventListener("click", clearField);
    $("#taxRate").addEventListener("click", clearField);
    $("#subtotal").focus();
    //Part2
    $("#calculateFirst").addEventListener("click", processEntrySecond);
    //Part3
    $("#calculateSecond").addEventListener("click", processEntryThird);
    //Part4
    $("#reservation_form").addEventListener("submit", processEntriesFourth);
});


