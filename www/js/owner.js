$('#reposOwner').bind('pageinit', function (event) {
	loadRepos();
});

function loadRepos() {
    $.ajax("res/car.json").done(function(data) {
		console.log(data);
		$("#ownerDetail").append("<li><h4>Owner</h4><p>" + data.ownerName + "</p></li>" +
							 "<li><h4>Model</h4><p>" + data.model + "</p></li>"
							 );
		
        //$('#allRepos').listview('refresh');
    });
}