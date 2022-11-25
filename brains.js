function yearFunction() {

    const yearSelect = document.getElementById('year');
    const makeSelect = document.getElementById('make');
    const modelSelect = document.getElementById('model');
    const optionsSelect = document.getElementById('options');

    removeAllButFirstOption(makeSelect);
    removeAllButFirstOption(modelSelect);

    if (yearSelect.value == "year" ){
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

    if (makeSelect.value == "make"){
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

    const yearSelect = document.getElementById('year');
    const makeSelect = document.getElementById('make');
    const modelSelect = document.getElementById('model');
    const optionsSelect = document.getElementById('options');

    removeAllButFirstOption(optionsSelect);

    if (modelSelect.value == 'model'){
        optionsSelect.disabled = true;
    }
    else {
        optionsSelect.disabled = false;
        getOptions(yearSelect.value, makeSelect.value, modelSelect.value);
    }
    optionsSelect.value = 'options';
}

function removeAllButFirstOption(select){
    for (var i = select.options.length-1; i>=1; i--) {
        select.remove(i);
    }
}

function calculate() {
    const fuelCost = document.getElementById('fuelCost');
    fuelCost.style.display = "block";
}

function addYears(years) {
    const yearSelect = document.getElementById('year');
    for (var i=0; i<years.length; i++) {
        var option = document.createElement("option");
        option.value = years[i];
        option.text = years[i];
        yearSelect.add(option);
    }
}

function addMakes(makes) {
    const makeSelect = document.getElementById('make');
    for (var i = 0; i<makes.length; i++){
        var option = document.createElement('option');
        option.value = makes[i];
        option.text = makes[i];
        makeSelect.add(option);
    }
}

function addModels(models) {
    const modelSelect = document.getElementById('model');
    for (var i = 0; i<models.length; i++) {
        var option = document.createElement('option');
        option.value = models[i];
        option.text = models[i];
        modelSelect.add(option);
    }
}

function addOptions(options) {
    const optionsSelect = document.getElementById('options');
    for (var i = 0; i<options.length; i++) {
        var option = document.createElement('option');
        option.value = options[i];
        option.text = options[i];
        optionsSelect.add(option);
    }
}

function getYears(){
    var years = [];
    $.ajax({
        url: `https://www.fueleconomy.gov/ws/rest/vehicle/menu/year`,
        type: "GET",
        dataType: "json",
        success: function(result)
        {
            for (var i=0; i<result.menuItem.length; i++){
                years[i] = result.menuItem[i].text;
            }
            addYears(years);
        },
        error: function(xhr, ajaxOptions, thrownError)
        {
            console.log(xhr.status);
            console.log(thrownError);
        }
    });
}

function getMakes(year){
    var makes = [];
    $.ajax({
        url: `https://www.fueleconomy.gov/ws/rest/vehicle/menu/make?year=${year}`,
        type: "GET",
        dataType: "json",
        success: function(result)
        {
            if (result.menuItem.length) {
                for (var i=0; i<result.menuItem.length; i++){
                    makes[i]= result.menuItem[i].text;
                }
            }
            else {
                makes[0] = result.menuItem.text;
            }
            addMakes(makes);
        },
        error: function(xhr, ajaxOptions, thrownError)
        {
            console.log(xhr.status);
            console.log(thrownError);
        }
    });
}

function getModels(year, make){
    var models = [];
    jQuery.ajax({
        url: `https://www.fueleconomy.gov/ws/rest/vehicle/menu/model?year=${year}&make=${make}`,
        type: "GET",
        dataType: "json",
        success: function(result)
        {
            if (result.menuItem.length) {
                for (var i=0; i<result.menuItem.length; i++){
                    models[i]= result.menuItem[i].text;
                }
            }
            else {
                models[0] = result.menuItem.text;
            }
            addModels(models);
        },
        error: function(xhr, ajaxOptions, thrownError)
        {
            console.log(xhr.status);
            console.log(thrownError);
        }
    }); 
}

function getOptions(year, make, model){
    var options = [];
    jQuery.ajax({
        url: `https://www.fueleconomy.gov/ws/rest/vehicle/menu/options?year=${year}&make=${make}&model=${model}`,
        type: "GET",
        dataType: "json",
        success: function(result)
        {
            if (result.menuItem.length) {
                for (var i=0; i<result.menuItem.length; i++){
                    options[i]= result.menuItem[i].text;
                }
            }
            else {
                options[0] = result.menuItem.text;
            }
            addOptions(options);
        },
        error: function(xhr, ajaxOptions, thrownError)
        {
            console.log(xhr.status);
            console.log(thrownError);
        }
    }); 
}

window.addEventListener('load', (event) => {
    getYears();
});


