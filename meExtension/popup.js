$(document).ready(function(){
	$("#confirm").on("click", function(){
		chrome.tabs.create({"url": "http://www.epicgames.com/fortnite/en-US/battle-pass/season-4"})
	})
});