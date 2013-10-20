$(document).ready(function(){
    var source = $("#chunk-template").html();
	var chunkTemplate = Handlebars.compile(source);
	$results = $('#results')

	$("#submitbtn").on("click",function()
	{
		var itemsVal = $("#items").val();
		var itemsArr=itemsVal.split(",")
		var chunkNum=$("#numofchunks").val();
        
        $.get("/chunk",{items:itemsArr,chunk:chunkNum},function(chunks)
        {
        	
        	var addHandlebars=function(index){

        		return $results.append(chunkTemplate({chunkKey:chunks[index]}));

        	};

        	for(i=0;i<chunks.length;i++)
			{
				addHandlebars(i);
			} 

        }); 
	});

});