function addRow(shapeObj, index){
	var newRow = $("<tr></tr>")
				.attr("id", index);
	var label = $("<td></td>")
				.attr("class", "shape-label")
				.text(shapeObj.metadata.getName());
	var area = $("<td></td>")
				.attr("class", "shape-area")
				.text(shapeObj.metadata.getTotalArea());
	var perim = $("<td></td>")
				.attr("class", "shape-perim")
				.text(shapeObj.metadata.getPerimeter());
	var color = $("<td></td>")
				.attr("class", "shape-color")
				.text(shapeObj.metadata.getColor());


	console.log(shapeObj.metadata.getColor());
	console.log(shapeObj.metadata.getName());

    newRow.append(label);
    newRow.append(area);
    newRow.append(perim);
	newRow.append(color);
    $("#tableDataSection").append(newRow);
    createPartsTable();
}

function getSelectedShape(){
    var index = $(".highlight").attr("id");
    return globalStateData.getShape(index);
}

function setTableSelection(index){
	var rows = $('tr').not(':first');
    rows.removeClass("highlight");
    for(let i = 0; i < globalStateData.getNumShapes(); i++){
		// alert($(rows[i]).attr("id"));
        if($(rows[i]).attr("id") == index){
            $(rows[i]).addClass("highlight");
        }
    }
}
