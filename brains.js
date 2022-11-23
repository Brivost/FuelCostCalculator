function yearFunction() {

    const yearSelect = document.getElementById('year');
    const makeSelect = document.getElementById('make');
    const modelSelect = document.getElementById('model');

    removeAllButFirstOption(makeSelect);
    removeAllButFirstOption(modelSelect);

    if (yearSelect.value == "year" ){
        makeSelect.disabled = true;
    }
    else {
        makeSelect.disabled = false;
        getMakes(yearSelect.value);
    }
    modelSelect.disabled = true;
    modelSelect.value = "model";
    makeSelect.value = 'make';
}

function makeFunction() {

    const yearSelect = document.getElementById('year');
    const makeSelect = document.getElementById('make');
    const modelSelect = document.getElementById('model');
        
    removeAllButFirstOption(modelSelect);

    if (makeSelect.value == "make"){
        modelSelect.disabled = true;
    }
    else {
        modelSelect.disabled = false;
        getModels(yearSelect.value, makeSelect.value);
    }
    modelSelect.value = "model";
}

function removeAllButFirstOption(select){
		for (var i = select.options.length; i>=1; i--) {
            select.remove(i);
        }
}

function calculate() {
    const fuelCost = document.getElementById('fuelCost');
    fuelCost.style.display = "block";
}

function addMakeOptions(makes) {
    const makeSelect = document.getElementById('make');
    for (var i = 0; i<makes.length; i++){
        var option = document.createElement('option');
        option.value = makes[i];
        option.text = makes[i];
        makeSelect.add(option);
    }
}

function addYearOptions(years) {
    const yearSelect = document.getElementById('year');
    for (var i=0; i<years.length; i++) {
        var option = document.createElement("option");
        option.value = years[i];
        option.text = years[i];
        yearSelect.add(option);
    }
}

function addModelOptions(models) {
    const modelSelect = document.getElementById('model');
    for (var i = 0; i<models.length; i++) {
        var option = document.createElement('option');
        option.value = models[i];
        option.text = models[i];
        modelSelect.add(option);
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
            addYearOptions(years);
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
            for (var i=0; i<result.menuItem.length; i++){
                makes[i]= result.menuItem[i].text;
            }
            addMakeOptions(makes);
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
            for (var i=0; i<result.menuItem.length; i++){
                models[i]= result.menuItem[i].text;
            }
            addModelOptions(models);
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


