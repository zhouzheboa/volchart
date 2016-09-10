 var  teamTimer = 0;
 var labelBodyTimer = 0;
 $(function(){
      //第一步背景变亮
      $(".labelCloudBody").addClass("active").show();          
      teamTimer = setTimeout(function(){
          	clearTimeout(teamTimer);
          	      //第二步展现团队信息
          	      $("#teamInfo").addClass("active");
                  //第三步延迟3s 去掉整体背景active
		    labelBodyTimer = setTimeout(function(){
		    	    clearTimeout(labelBodyTimer); 

	          	    $(".labelCloudBody").removeClass("active");
				    //第四步展现客户画像
                    $("#headPortrait").addClass("active");
                    renderLabelCloudData(1);
                    
		      },2500)    

          },1000)
          
})
//渲染标签云数据
function  renderLabelCloudData(selectedVal){
	   var itemData = labelDataArr[selectedVal];
	    //面部区域
        $(cloudMap["face"]["id"]).empty().jQCloud(
        	joinJsonData(itemData[cloudMap["face"]["key"]]),
			{
				rotate: true,
				colorArr:cloudMap["colorArr"],
				animateClass: cloudMap["animateClass"]
		});
		//左耳朵区域
		$(cloudMap["leftEar"]["id"]).empty().jQCloud(
			itemData[cloudMap["leftEar"]["key"]],
			{
				rotate:false,
				colorArr : cloudMap["colorArr"],
				animateClass:cloudMap["animateClass"]
		});
		//右耳朵区域
		$(cloudMap["rightEar"]["id"]).empty().jQCloud(
			itemData[cloudMap["rightEar"]["key"]],
			{
				rotate:false,
				colorArr :  cloudMap["colorArr"],
				animateClass:cloudMap["animateClass"]
		});
		//颈部区域
		$(cloudMap["neck"]["id"]).empty().jQCloud(
			itemData[cloudMap["neck"]["key"]],
			{
				shape: "rectangular",
				rotate:false,
				colorArr : cloudMap["colorArr"],
				animateClass:cloudMap["animateClass"]
		});
		
		//胸部样式
		$(cloudMap["chest"]["id"]).empty().jQCloud(
			itemData[cloudMap["chest"]["key"]],
			{
				shape: "rectangular",
				rotate:false,
				colorArr : cloudMap["colorArr"],
				animateClass:cloudMap["animateClass"]
		});
}
function joinJsonData(dataArr){
	var jsonObjArr = [];
	var dataItem;
	for (var i = 0 ,len =dataArr.length; i < len; i++) {
		 dataItem = dataArr[i];
		jsonObjArr.push("{text: '" + dataItem[0] + "', weight: '" + dataItem[1] + "',html: {'class': 'span_list',onmouseover:'on_mouseover(this,event)',onmouseout:'on_mouseout()'}}");
	}
	return eval("[" + jsonObjArr.join(",") + "]");
}

//鼠标mouseover 操作
 function on_mouseover(e, ev) {
		var txt = $(e).html();
		ev = ev || event;
		var html =  "";
		$.each(data, function(i, item) {
			if(txt == item[0]){
				html = item[0]+"<br />曝光数"+item[1]+"<br />"+item[2];
				return;
			}
		});
		$(".append_div").remove();
		$(".ui-tag-cloud").after("<div class='append_div' style='left:" + ev.clientX + "px; top:" + ev.clientY + "px; '>" + html + "</div>");
}
//鼠标mouseout 操作
function on_mouseout() {
	$(".append_div").remove();
}