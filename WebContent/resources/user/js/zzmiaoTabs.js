$(function() {
	var lis = $(".zzmiao-tabsLi"),
		divs = $(".zzmiaoTabsContent");
	divs.css("display", "none");
	for(var i = 0; i < lis.length; i++) {
		lis[i].id = i;
		lis[i].onclick = function() {
			$(".zzmiaoMain").css("display", "none");
			var that = this;
			for(var j = 0; j < divs.length; j++) {
				
				divs[j].style.display = "none";
			}
			divs[that.id].style.display = "block";
		}
	}
});

