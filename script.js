
// delcare variables in jQuery Style
var $logo = $('#text-logo');
var $randomPage = $('#random');
var $search = $('#search');
var $autoCompleteResults = $('.autocomplete-results');
var $autoComplete;
var $searchResults = $('.search-results');
var $submit = $('#submit');
var $logoDiv =  $('.logo-div');
var $result1 = $('.result1');

// illuminate  the main logo after 3s;
function  logoLight() {

    $($logo).delay(3000).queue(function(lightUp) {
        $(this).css('color','#777');
        lightUp();
    }) 

    $($logo).delay(1200).queue(function(lightDown) {
            $(this).css('color','#222');
            lightDown();
    }) 
}
logoLight();

// open a random wikipedia page on button press
$($randomPage).on('click', function() {
    window.location = 'https://en.wikipedia.org/wiki/Special:Random';
});

// search box autocomplete function
$($search).on('keyup', function() {

    // assign input value to variable
    $autoComplete = $(this).val();
    
    // check if box is empty, hide or show div
    if ($search.val() === "") {
        $($autoCompleteResults).css('display', 'none');
        return false;
    }
    else {
        $($autoCompleteResults).css('display', 'block');
    }

    // make ajax request
    $.ajax({
        url: 'https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&limit=6&format=json&search='+$autoComplete,
        success: function(result) {

            var $list = [result[1]];
            // iterate though list and assign results
            for (var i = 1; i < 6; i++) {
                // populate list
                $('#auto-results-'+[i]).html($list[0][i]);
                // if a suggestion item is clicked assign to search box value
                $('#auto-results-'+[i]).click(function() {
                    $($search).val($(this).text());
                })
            }
        } 
    })
});

// on button click  or return key, search list request
$($submit).on('click', searchWiki);
// listen for form submit , call search function
$(window).on('keydown', function(event) {
    if (event.keyCode === 13) {
        searchWiki();
        $($autoCompleteResults).css('display', 'none');
    }
});

// main search event for display results in a list									
function searchWiki(event) {

    // check that search box is not empty
    if ($search.val === "") {
        return false;
    }

	// empty div of elements before new search
	$($searchResults).empty();
	
	 //assign value to searchList
	 var $searchList = $($search).val();
     // close autocomplete box
     $($search).val("");
	 $($autoCompleteResults).css('display', 'none');
     // resize margin to top of page
     $($logoDiv).css("padding-top", "5vh");
	
	 // make the ajax request and display list of options
	 $.ajax({ 
			url: 'https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&limit=10&format=json&search='+$searchList,
			success: function(result) {

                // iterate over the length over results, create new element with a title and description
				for (var i = 1; i < result[2].length; i++) {
					var $title = result[1][i];
					var $description = result[2][i];
					$('<a href="https://wikipedia.org/wiki/'+$title+'"><div class="result"><h3 class="title">'+$title+'</h3><p class="description">'+$description+'</p></div></a>').appendTo($searchResults);
				}
			}
	    });
};



