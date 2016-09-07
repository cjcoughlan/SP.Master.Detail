<!--
    Name: dispParent.js
-->

<script type="text/javascript" src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.8.3.min.js"></script>
<script type="text/javascript">

	//TODO ADD VARIABLES FOR LIST NAMES


	$(document).ready(function(){

		//Get the id value
		$.ajax ({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('ID.Index')/Items?$select=Title,Index, ID&$filter=Title eq 'VLD'",
        headers: {'Accept':'application/json;odata=verbose'},
        cache: false,
        success: function (data) {

          var results = data.d.results;

          //Determine the ID
          var indexValue = results[0].Title + results[0].Index;

          //Get and set the title field and disable 
          $("input[title*='Title']").val(indexValue).attr('disabled','disabled');     

          //Update the index value for the next time
          var newIndex = results[0].Index + 1;

          //Get the itemType and uri from the returned request
          var listItemType = results[0].__metadata.type;
          var urlEndPoint = results[0].__metadata.uri;

          //Send new update to the list
          updateListIndex(results[0].ID, 'ID.Index', listItemType, urlEndPoint, newIndex);

        }

      });

	});

	function updateListIndex(id, listName, itemType, urlEndPoint, newValue){

		//set up data
    var item = {
	     "__metadata": { "type": itemType },
	     "Index": newValue
	  };

		//Update the value passed in
		$.ajax({
			url: urlEndPoint,
			type: "POST",
      contentType: "application/json;odata=verbose",
      data: JSON.stringify(item),
      headers: {
          "Accept": "application/json;odata=verbose",
          "X-RequestDigest": $("#__REQUESTDIGEST").val(),
          "X-HTTP-Method": "MERGE",
          "If-Match": "*"
      },
      success: function (data) {
          console.log("Index has been Updated");
      },
      error: function (data) {
          console.log("Index update failed");
      }        
		});
	}

</script>



