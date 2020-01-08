
function createTabs(){
	$(document).ready(function(){

        $('ul.tabs li').click(function(){
            var tab_id = $(this).attr('data-tab');

            $('ul.tabs li').removeClass('current');
            $('.tab-content').removeClass('current');

            $(this).addClass('current');
            $("#"+tab_id).addClass('current');
        })

    })
}

function updateState(){
	var active = $('.active-state');
	active.removeClass('active-state');

	if(globalStateData.getDrawMode()){ $('.draw-state').addClass('active-state'); }
	if(globalStateData.getPanMode()){ $('.pan-state').addClass('active-state'); }
	if(globalStateData.getTranslateMode()){	$('.translate-state').addClass('active-state'); }
	if(globalStateData.getTemplateMode()){ $('.template-state').addClass('active-state'); }
	if(globalStateData.getCommonPointMode()){ $('.common-state').addClass('active-state'); }
	if(globalStateData.getLineEditMode()){ $('.line-state').addClass('active-state'); }
	if(globalStateData.getShapeEditMode()){ $('.shape-state').addClass('active-state'); }
	if(globalStateData.getCurveMode()){ $('.curve-state').addClass('active-state'); }

}

function createPartsTable(){

	/* Get all rows from your 'table' but not the first one
	* that includes headers. */
	var rows = $('tr').not(':first');

	/* Create 'click' event handler for rows */
	rows.on('click', function(e) {
		/* Get current row */
		var row = $(this);

		rows.removeClass('highlight');
		row.addClass('highlight');
	});
}

function createButtons() {
    $("#loadBtn").click(function(){
                    // legacyParse.ingest(prompt(
                    //                 "Enter legacy string: ",
                    //                 "R2, U4, ..."
                    //             ));

                    parse(prompt(
                                "Enter legacy string: ",
                                "R2, U4, ..."
                        )
                    );
                });

    $("#saveBtn").click(function(){
                    saveModel();
                });

	$("#shapeLabelControl").click(function(){
		// alert("Hi this doesn't work yet but thanks for clicking")
		getSelectedShape()
				.metadata
				.setName(
					prompt("enter new name", "living room")
				);
		drawShapeObjs();
	});



	$("#drawModeControl").click(function(){
                    globalStateData.setDrawMode(true);
					globalStateData.setPanMode(false);
					globalStateData.setTranslateMode(false);
					globalStateData.setTemplateMode(false);
					globalStateData.setCommonPointMode(false);
					globalStateData.setShapeEditMode(false);
					globalStateData.setCurveMode(false);

					updateState();
                });
	$("#translateModeControl").click(function(){
					globalStateData.setDrawMode(false);
					globalStateData.setPanMode(false);
					globalStateData.setTranslateMode(true);
					globalStateData.setTemplateMode(false);
					globalStateData.setCommonPointMode(false);
					globalStateData.setShapeEditMode(false);
					globalStateData.setCurveMode(false);

					updateState();
                });
	$("#panModeControl").click(function(){
					globalStateData.setDrawMode(false);
					globalStateData.setPanMode(true);
					globalStateData.setTranslateMode(false);
					globalStateData.setTemplateMode(false);
					globalStateData.setCommonPointMode(false);
					globalStateData.setShapeEditMode(false);
					globalStateData.setCurveMode(false);

					updateState();
                });
	$("#templateModeControl").click(function(){
					globalStateData.setDrawMode(false);
					globalStateData.setPanMode(false);
					globalStateData.setTranslateMode(false);
					globalStateData.setTemplateMode(true);
					globalStateData.setCommonPointMode(false);
					globalStateData.setShapeEditMode(false);
					globalStateData.setCurveMode(false);

					updateState();
                });
	$("#commonPointControl").click(function(){
					globalStateData.setDrawMode(false);
					globalStateData.setPanMode(false);
					globalStateData.setTranslateMode(false);
					globalStateData.setTemplateMode(false);
					globalStateData.setCommonPointMode(true);
					globalStateData.setShapeEditMode(false);
					globalStateData.setCurveMode(false);

					updateState();
                });
	$("#editModeControl").click(function(){
					globalStateData.setDrawMode(false);
					globalStateData.setPanMode(false);
					globalStateData.setTranslateMode(false);
					globalStateData.setTemplateMode(false);
					globalStateData.setCommonPointMode(false);
					globalStateData.setShapeEditMode(true);
					globalStateData.setCurveMode(false);

					updateState();
	            });

    $("#curveBtn").click(function(){
					globalStateData.setDrawMode(true);
					globalStateData.setPanMode(false);
					globalStateData.setTranslateMode(false);
					globalStateData.setTemplateMode(false);
					globalStateData.setCommonPointMode(false);
					globalStateData.setShapeEditMode(false);
					globalStateData.setCurveMode(true);

					updateState();
				});
	$("#autoZoom").click(function(){
		if(globalStateData.getNumShapes() > 0) {
			// declare all these so we don't have to type out such long things
			var height = globalStateData.getHeight();
			var width = globalStateData.getWidth();
			var top = globalStateData.getTopCoordinate();
			var bottom = globalStateData.getBottomCoordinate();
			var rightmost = globalStateData.getRightmostCoordinate();
			var leftmost = globalStateData.getLeftmostCoordinate();

			//pan to make top and leftmost at the top and the left
			globalStateData.setXOffset((-1) * leftmost);
			globalStateData.setYOffset((-1) * top);

			// again so we don't have to type out such long things
			xOffset = globalStateData.getXOffset();
			yOffset = globalStateData.getYOffset();

			// check if we need to zoom in (if the height is greater than the bottom coordinate drawn or width greater than rightmost coordinate drawn)
			//if(height / (globalStateData.getZoomDeg()+.1) > bottom && width / (globalStateData.getZoomDeg()+.1) > rightmost) {
			if(((height / (globalStateData.getZoomDeg()+.1)) - yOffset) > bottom && ((width / (globalStateData.getZoomDeg()+.1)) - xOffset) > rightmost) {
				// loop until the next zoom will move a coordinate off the screen
				while(((height / (globalStateData.getZoomDeg()+.1)) - yOffset) > bottom && ((width / (globalStateData.getZoomDeg()+.1)) - xOffset) > rightmost) {
					globalStateData.zoomIn();
				}
			}
			// check if we need to zoom out (if the height is less than the bottom coordinate drawn or width less than rightmost coordinate drawn)
			else if(((height / (globalStateData.getZoomDeg()-.1)) - yOffset) < bottom || ((width / (globalStateData.getZoomDeg()-.1)) - xOffset) < rightmost) {
				// loop until all the coordinates are on the screen
				while(((height / (globalStateData.getZoomDeg()-.1)) - yOffset) < bottom || ((width / (globalStateData.getZoomDeg()-.1)) - xOffset) < rightmost) {
					globalStateData.zoomOut();
				}
			}

			// reposition the shapes to be in a good position after zooming
			globalStateData.setXOffset((-1) * leftmost * globalStateData.getZoomDeg());
			globalStateData.setYOffset((-1) * top * globalStateData.getZoomDeg());
			drawShapeObjs();
		}
	})

	$("#drawCircBtn").click(function(){
						drawCircleObj(prompt(
								"Enter dimensions (x,y,r,startangle,endangle) of circle: ",
								"20"
							)
						);
	                });

    $("#drawRectBtn").click(function(){
	                    drawRectObj(prompt(
		                        "Enter dimensions of square: ",
		                        "20x30"
	                        )
	                    );
	                });

    $("#drawTriBtn").click(function(){
	                    drawTriObj(prompt(
		                        "Enter height and length of triangle: ",
		                        "20x30"
		                    )
	                    );
	                });
}
