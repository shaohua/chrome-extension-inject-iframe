chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
  	if (document.readyState === "complete") {
  		clearInterval(readyStateCheckInterval);

  		// ----------------------------------------------------------
  		// This part of the script triggers when page is done loading
  		console.log("Hello. This message was sent from scripts/inject.js");
  		// ----------------------------------------------------------

      var checkChange = function(){
        var flag = false;
        var names = document.querySelectorAll('.item-name-container');
        var forEach = Array.prototype.forEach;
        forEach.call(names, function(nameItem){
          if(nameItem.getAttribute('name') === 'test') {
            flag = true;
          }
        });
        window.parent.postMessage(flag + '', '*');
        console.log('flag: ', flag);
      };



      // select the target node
      var target = document.querySelector('body');

      // create an observer instance
      var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          // console.log(mutation.type);
          checkChange();
        });
      });

      // configuration of the observer:
      var config = { attributes: true, childList: true, characterData: true };

      // pass in the target node, as well as the observer options
      observer.observe(target, config);

      // later, you can stop observing
      // observer.disconnect();

  	}
	}, 10);
});
