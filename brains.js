// yearFunction, makeFunction, modelFunction, and optionsFunction
// react when a user changes an input in one of the drop-down boxes.
// These call the "get" functions and also erase selections if a user
// backtracks.
function yearFunction() {

    const yearSelect = document.getElementById('year');
    const makeSelect = document.getElementById('make');
    const modelSelect = document.getElementById('model');
    const optionsSelect = document.getElementById('options');

    removeAllButFirstOption(makeSelect);
    removeAllButFirstOption(modelSelect);
    clearLastMPG();

    if (yearSelect.value == "year") {
        makeSelect.disabled = true;
    }
    else {
        makeSelect.disabled = false;
        getMakes(yearSelect.value);
    }
    makeSelect.value = 'make';
    modelSelect.disabled = true;
    modelSelect.value = "model";
    optionsSelect.disabled = true;
    optionsSelect.value = 'options';
}

function makeFunction() {

    const yearSelect = document.getElementById('year');
    const makeSelect = document.getElementById('make');
    const modelSelect = document.getElementById('model');
    const optionsSelect = document.getElementById('options');

    removeAllButFirstOption(modelSelect);
    clearLastMPG();

    if (makeSelect.value == "make") {
        modelSelect.disabled = true;
    }
    else {
        modelSelect.disabled = false;
        getModels(yearSelect.value, makeSelect.value);
    }
    modelSelect.value = "model";
    optionsSelect.disabled = true;
    optionsSelect.value = 'options';
}

function modelFunction() {

    const modelSelect = document.getElementById('model');
    const optionsSelect = document.getElementById('options');

    removeAllButFirstOption(optionsSelect);
    clearLastMPG();

    if (modelSelect.value == 'model') {
        optionsSelect.disabled = true;
    }
    else {
        const makeSelect = document.getElementById('make');
        const yearSelect = document.getElementById('year');
        optionsSelect.disabled = false;
        getOptions(yearSelect.value, makeSelect.value, modelSelect.value);
    }
    optionsSelect.value = 'options';
}

function optionsFunction() {

    const optionsSelect = document.getElementById('options');

    if (optionsSelect.value != 'options') {
        vehicleID = optionsSelect.options[optionsSelect.selectedIndex].value

        getMPG(vehicleID);
    }
    else {
        clearLastMPG();
    }
}

// getYears, getMakes, getModels, and getOptions make API calls
// to a vehicle database to gather information about possible
// vehicle choices. These grab call the "add" functions.
function getYears() {
    var years = [];
    $.ajax({
        url: `https://www.fueleconomy.gov/ws/rest/vehicle/menu/year`,
        type: "GET",
        dataType: "json",
        success: function (result) {
            for (var i = 0; i < result.menuItem.length; i++) {
                years[i] = result.menuItem[i].text;
            }
            addYears(years);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(thrownError);
        }
    });
}

function getMakes(year) {
    var makes = [];
    $.ajax({
        url: `https://www.fueleconomy.gov/ws/rest/vehicle/menu/make?year=${year}`,
        type: "GET",
        dataType: "json",
        success: function (result) {
            if (result.menuItem.length) {
                for (var i = 0; i < result.menuItem.length; i++) {
                    makes[i] = result.menuItem[i].text;
                }
            }
            else {
                makes[0] = result.menuItem.text;
            }
            addMakes(makes);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(thrownError);
        }
    });
}

function getModels(year, make) {
    var models = [];
    jQuery.ajax({
        url: `https://www.fueleconomy.gov/ws/rest/vehicle/menu/model?year=${year}&make=${make}`,
        type: "GET",
        dataType: "json",
        success: function (result) {
            if (result.menuItem.length) {
                for (var i = 0; i < result.menuItem.length; i++) {
                    models[i] = result.menuItem[i].text;
                }
            }
            else {
                models[0] = result.menuItem.text;
            }
            addModels(models);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(thrownError);
        }
    });
}

function getOptions(year, make, model) {
    var options = [];
    var optionID = [];
    jQuery.ajax({
        url: `https://www.fueleconomy.gov/ws/rest/vehicle/menu/options?year=${year}&make=${make}&model=${model}`,
        type: "GET",
        dataType: "json",
        success: function (result) {
            if (result.menuItem.length) {
                for (var i = 0; i < result.menuItem.length; i++) {
                    options[i] = result.menuItem[i].text;
                    optionID[i] = result.menuItem[i].value;
                }
            }
            else {
                options[0] = result.menuItem.text;
                optionID[0] = result.menuItem.value;
            }
            addOptions(options, optionID);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(thrownError);
        }
    });
}

// addYears, addMakes, addModels, and addOptions add the 
// results of the API calls from the "get" functions to 
// the drop-down boxes.
function addYears(years) {
    const yearSelect = document.getElementById('year');
    for (var i = 0; i < years.length; i++) {
        var option = document.createElement("option");
        option.value = years[i];
        option.text = years[i];
        yearSelect.add(option);
    }
}

function addMakes(makes) {
    const makeSelect = document.getElementById('make');
    for (var i = 0; i < makes.length; i++) {
        var option = document.createElement('option');
        option.value = makes[i];
        option.text = makes[i];
        makeSelect.add(option);
    }
}

function addModels(models) {
    const modelSelect = document.getElementById('model');
    for (var i = 0; i < models.length; i++) {
        var option = document.createElement('option');
        option.value = models[i];
        option.text = models[i];
        modelSelect.add(option);
    }
}

function addOptions(options, optionID) {
    const optionsSelect = document.getElementById('options');
    for (var i = 0; i < options.length; i++) {
        var option = document.createElement('option');
        option.value = optionID[i];
        option.text = options[i];
        optionsSelect.add(option);
    }
}

// Clear the drop-down boxes if a user goes back
// to change one of their choices
function removeAllButFirstOption(select) {
    for (var i = select.options.length - 1; i >= 1; i--) {
        select.remove(i);
    }
}

// Once a user has completely filled out the 
// drop-down boxes, make an API call to get the 
// MPG of that particular vehicle
function getMPG(vehicleID) {
    jQuery.ajax({
        url: `https://www.fueleconomy.gov/ws/rest/vehicle/${vehicleID}`,
        type: "GET",
        dataType: "json",
        success: function (result) {
            const fuelEconVehicleText = document.getElementById('fuelEconVehicleText');
            const fuelEconVehicleNumber = document.getElementById('fuelEconVehicleNumber');
            const fuelEconVehicleUnit = document.getElementById('fuelEconVehicleUnit');

            var mpg = Number.parseFloat(result.comb08U).toFixed(1);

            // Split this into two <p> so that we can directly access fuel economy number
            fuelEconVehicleNumber.innerHTML = `${mpg}`;
            fuelEconVehicleUnit.innerHTML = ` MPG`;
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(thrownError);
        }
    });
}

//Clear last MPG in vehicle info section, if there is one
function clearLastMPG() {
    const fuelEconVehicleNumber = document.getElementById('fuelEconVehicleNumber');
    const fuelEconVehicleUnit = document.getElementById('fuelEconVehicleUnit');
    fuelEconVehicleNumber.innerHTML = "";
    fuelEconVehicleUnit.innerHTML = "";
}

// Scrape AAA for gas price
// Body -> main -> div class=container mob-cont -> 
// div class=tblwrap -> div class=table-mob -> tbody -> tr -> td
function getFuelPrice() {
    $.get('http://api.scrapestack.com/scrape',
        {
            access_key: 'fe0b04fa4176906b4713879e65aee6e7',
            url: 'https://gasprices.aaa.com/'
        },
        function (websiteContent) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(websiteContent, "text/html");

            var pele = doc.getElementsByTagName('td');

            var avg = pele[1].innerHTML;
            console.log(avg);
        }
    );
}

// Use MPG info, distance info, and fuel price info 
// to calculate the cost of the trip. Checks whether 
// all required inputs are present, and decides
// between inputs if there are multiple for the same 
// piece of information (e.g. user filled out drop-down
// boxes for vehicle, but also manually filled out MPG field)
function calculate() {
    fuelCost = document.getElementById("fuelCost");
    fuelEconVehicleNumber = document.getElementById("fuelEconVehicleNumber").innerHTML;
    distance = document.getElementById("distance").value;
    fuelPrice = document.getElementById("fuelPriceNumber").innerHTML;

    const cost = distance / fuelEconVehicleNumber * fuelPrice;

    fuelCost.innerHTML = `Fuel Cost: $${cost.toFixed(2)}`;
}

// Prevents users from entering non-numbers into number fields
function setInputFilter(textbox, inputFilter, errMsg) {
    ["input", "keydown", "keyup", "mousedown", "mouseup",
        "select", "contextmenu", "drop", "focusout"].forEach(function (event) {
            textbox.addEventListener(event, function (e) {
                if (inputFilter(this.value)) {
                    // Accepted value
                    if (["keydown", "mousedown", "focusout"].indexOf(e.type) >= 0) {
                        this.classList.remove("input-error");
                        this.setCustomValidity("");
                    }
                    this.oldValue = this.value;
                    this.oldSelectionStart = this.selectionStart;
                    this.oldSelectionEnd = this.selectionEnd;
                } else if (this.hasOwnProperty("oldValue")) {
                    // Rejected value - restore the previous one
                    this.classList.add("input-error");
                    this.setCustomValidity(errMsg);
                    this.reportValidity();
                    this.value = this.oldValue;
                    this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
                } else {
                    // Rejected value - nothing to restore
                    this.value = "";
                }
            });
        });
}

// Things to do once the window loads
window.addEventListener('load', (event) => {
    getYears();

    setInputFilter(document.getElementById("distance"),
        function (value) { return /^-?\d*[.,]?\d*$/.test(value); },
        "Please enter a number");

    setInputFilter(document.getElementById("customFuelPrice"),
        function (value) { return /^-?\d*[.,]?\d*$/.test(value); },
        "Please enter a number");

    // getFuelPrice();

});


