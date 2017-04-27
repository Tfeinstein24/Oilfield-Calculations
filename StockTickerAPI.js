
    var Markit = {};
    /**
     * Define the QuoteService.
     * First argument is symbol (string) for the quote. Examples: AAPL, MSFT, JNJ, GOOG.
     * Second argument is fCallback, a callback function executed onSuccess of API.
     */

    // THIS IS A CONSTRUCTOR
    Markit.QuoteService = function(sSymbol, fCallback) {
        this.symbol = sSymbol;
        this.fCallback = fCallback;
        this.DATA_SRC = "dev.markitondemand.com/Api/v2/Quote/jsonp";
        this.makeRequest();
    };
    /**
     * Ajax success callback. fCallback is the 2nd argument in the QuoteService constructor.
     */

    // THIS IS A PROTOTYPE FUNCTION
    Markit.QuoteService.prototype.handleSuccess = function(jsonResult) {
        this.fCallback(jsonResult);
    };
    /**
     * Ajax error callback
     */

    // THIS IS A PROTOTYPE FUNCTION
    Markit.QuoteService.prototype.handleError = function(jsonResult) {
        console.error(jsonResult);
    };
    /** 
     * Starts a new ajax request to the Quote API
     */
    Markit.QuoteService.prototype.makeRequest = function() {
        //Abort any open requests
        if (this.xhr) {
            this.xhr.abort();
        }
        //Start a new request
        this.xhr = $.ajax({
            data: {
                symbol: this.symbol
            },
            url: this.DATA_SRC,
            dataType: "jsonp",
            success: this.handleSuccess,
            error: this.handleError,
            context: this
        });
    };

    var arrayOfCompanies = ["BHI", "HAL", "SLB", "XOM", "COP"];

    createArrayOfCompanies(arrayOfCompanies);

    function createArrayOfCompanies(array) {
        for (var i = 0; i < array.length; i++) {
            new Markit.QuoteService(array[i], function(jsonResult) {

                //Catch errors
                if (!jsonResult || jsonResult.Message) {
                    console.error("Error: ", jsonResult.Message);
                    return;
                }

                //If all goes well, your quote will be here.
                console.log(jsonResult);

                //Now proceed to do something with the data.

                dynamicallyCreateStockTicker(jsonResult);
            });
        }
    }

   

    function dynamicallyCreateStockTicker(object) {
        var div = $("<div>");
        div.attr("class", "stockHolder");
        var h3 = $("<h3>");
        h3.text(object.Name);
        var p = $("<p>");
        p.text("Last Price: $" + object.LastPrice);
        div.append(h3);
        div.append(p);
        $("#sidebar").append(div);
    }

    // IN CASE YOU WANT TO DYNAMICALLY CREATE OBJECTS!
    // LOOK AT THE API STRUCTURE
    // ASSIGN THE PARTS YOU WANT TO LOCAL VARIABLES
    // HARD CODE AN EXAMPLE OF HOW YOU WANT IT TO LOOK WITH CSS CLASSES
    // START REPLICATING THAT INSIDE OF YOUR RESPONSE CALLBACK FUNCTION
    
