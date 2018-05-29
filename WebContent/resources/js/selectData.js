/*所在县区-中心校-select*/
			var temp;
			$.getJSON("resources/js/selectData.json", function(data) {
				temp = data;
				addPlace();
			});
			//赋值县区
			var addPlace = function() {
				$.each(temp, function(i, place) {
					$(".countydistrict").append('<option value="' + i + '">' + place.place + '</option>');
				});
				addSchool();
			};
			//赋值学校
			var addSchool = function() {
				if ($(".examineecenterschool option").length != 0) {
					$(".examineecenterschool option").remove();
				}
				var n = $(".countydistrict option:selected").val();
				if (n == "") {
					$(".examineecenterschool").append('<option value="">请选择中心学校</option>');
				} else {
					$.each(temp[n].school, function(i, school) {
						$(".examineecenterschool").append('<option value="' + i + '">' + school + '</option>');
					});
				}
			};
			$(".countydistrict").change(function() {
				addSchool();
			});
	
	