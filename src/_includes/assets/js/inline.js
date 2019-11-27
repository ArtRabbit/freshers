var scrollPos = 0;
var header = document.querySelector('#header');


function checkPosition() {
  var windowY = window.scrollY;
  if ( windowY >= 70 ) {
  	header.classList.add("scrolling"); 
  } else {
  	header.classList.remove("scrolling"); 
  }
  scrollPos = windowY;
}

function debounce(func, wait = 10, immediate = true) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

window.addEventListener('scroll', debounce(checkPosition));


if(!document.getElementsByClassName) {
	// IE8 support
	var getElementsByClassName = function(node, classname) {
		var a = [];
		var re = new RegExp('(^| )'+classname+'( |$)');
		var els = node.getElementsByTagName("*");
		for(var i=0,j=els.length; i<j; i++)
			if(re.test(els[i].className))a.push(els[i]);
		return a;
	}
	var videos = getElementsByClassName(document.body,"youtube");
}
else {
	var videos = document.getElementsByClassName("youtube");
}

var nb_videos = videos.length;
for (var i=0; i<nb_videos; i++) {
	// Based on the YouTube ID, we can easily find the thumbnail image
	var videoId = videos[i].getAttribute("data-id");
	videos[i].onclick = function() {
		// Create an iFrame with autoplay set to true
		var iframe = document.createElement("iframe");
		var iframe_url = "https://www.youtube-nocookie.com/embed/" + videoId + "?autoplay=1&autohide=1";
		if (this.getAttribute("data-params")) iframe_url+='&'+this.getAttribute("data-params");
		iframe.setAttribute("src",iframe_url);
		iframe.setAttribute("frameborder",'0');
		iframe.setAttribute("allow","autoplay");

		// The height and width of the iFrame should be the same as parent
		iframe.style.width  = this.style.width;
		iframe.style.height = this.style.height;

		// Replace the YouTube thumbnail with YouTube Player
		this.replaceChild(iframe, this.childNodes[1]);
		return false;
	}
}

if ('serviceWorker' in navigator) {

  navigator.serviceWorker
	.register('/service-worker.js', { scope: '/' })
	.then(function(registration) {
	  //console.log("Service Worker Registered");
	})
	.catch(function(err) {
	  console.log("Service Worker Failed to Register", err);
	})

}


if (window.netlifyIdentity) {
  window.netlifyIdentity.on("init", user => {
    if (!user) {
      window.netlifyIdentity.on("login", () => {
        document.location.href = "/admin/";
      });
    }
  });
}



