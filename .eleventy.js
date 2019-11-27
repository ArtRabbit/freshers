const { DateTime } = require("luxon");
const CleanCSS = require("clean-css");
const UglifyJS = require("uglify-es");
const htmlmin = require("html-minifier");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const blockPlugin = require("markdown-it-custom-block");
const figurePlugin = require("markdown-it-implicit-figures");


module.exports = function(eleventyConfig) {
  

  eleventyConfig.addPlugin(eleventyNavigationPlugin);
	
  eleventyConfig.addNunjucksShortcode("arimage", function(image, alt, caption, link) {
  	var linkStart = '';
  	var linkEnd = '';
  	if ( link != undefined ) {
  		if ( link != '' ) {
  			linkStart = `<a href="${link}" target="_blank" rel="noopener noreferrer">`;
  			linkEnd = `</a>`;
  		}
  	}
  	var captionOutput = '';
  	if ( caption != undefined ) {
  		if (caption != '') {
  		  captionOutput = `<figcaption>${caption}</figcaption>`;
  		}
  	}
  	if ( image.indexOf('https://') > -1 ) {
  		return `<figure>
				${linkStart}
					<img src="${image}" alt="${alt}" >
				${linkEnd}
				${captionOutput}
			</figure>`;
  		
  	}
  	var uploadRegEx = /img\/uploads/gi;
  	var srcRegEx = /\/src\//gi;
  	var newImage = image.replace(uploadRegEx,'img/processed');
  	newImage = newImage.replace(srcRegEx,'/');
  	var newImageParts = newImage.split('.');
  	
  	return `<figure>
				${linkStart}
					<img srcset="${newImageParts[0]}-355.jgp 355w, ${newImageParts[0]}-640.jpg 640w, ${newImageParts[0]}-1200.jpg 1200w, ${newImageParts[0]}-1440.jpg 1440w"
						 sizes="(max-width: 697px) 100vw, 697px"
						 src="${newImageParts[0]}-355.jgp" alt="${alt}" >
				${linkEnd}
				${captionOutput}
			</figure>`;
  });

  eleventyConfig.addFilter("imgSuffix", (imgStr, suffix)=> {
  	const uploadRegEx = /img\/uploads/gi;
  	const srcRegEx = /\/src\//gi;
	const i = imgStr.lastIndexOf('.');
	const imgPath = imgStr.substring(0, i);
	let newImgPath = imgPath.replace(uploadRegEx,'img/processed');
	newImgPath = newImgPath.replace(srcRegEx,'/');
	const ext = imgStr.substring(i + 1);
	
	return `${newImgPath}-${suffix}.${ext}`;
  });

	
  // Date formatting (human readable)
  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj).toFormat("dd LLL yyyy");
  });

  // Date formatting (machine readable)
  eleventyConfig.addFilter("machineDate", dateObj => {
    return DateTime.fromJSDate(dateObj).toFormat("yyyy-MM-dd");
  });

  // Minify CSS
  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
  });

  // Minify JS
  eleventyConfig.addFilter("jsmin", function(code) {
    let minified = UglifyJS.minify(code);
    if (minified.error) {
      console.log("UglifyJS error: ", minified.error);
      return code;
    }
    return minified.code;
  });

  // Minify HTML output
  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    if (outputPath.indexOf(".html") > -1) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }
    return content;
  });


  // Don't process folders with static assets e.g. images
  eleventyConfig.addPassthroughCopy( "src/favicon.ico" );
  eleventyConfig.addPassthroughCopy( "src/favicon-32x32.png" );
  eleventyConfig.addPassthroughCopy( "src/favicon-16x16.png" );
  eleventyConfig.addPassthroughCopy( "src/apple-touch-icon.png" );
  eleventyConfig.addPassthroughCopy( "src/android-chrome-512x512.png" );
  eleventyConfig.addPassthroughCopy( "src/android-chrome-256x256.png" );
  eleventyConfig.addPassthroughCopy( "src/android-chrome-192x192.png" );
  eleventyConfig.addPassthroughCopy( "src/safari-pinned-tab.svg" );
  eleventyConfig.addPassthroughCopy( "src/manifest.json" );
  eleventyConfig.addPassthroughCopy( "src/service-worker.js" );

  eleventyConfig.addPassthroughCopy( { "src/static/img" : "/static/img" } );
  eleventyConfig.addPassthroughCopy( { "src/admin" : "admin" } );
  eleventyConfig.addPassthroughCopy( { "src/_includes/assets/" : "/_includes/assets" } );

  /* Markdown Plugins */
  let markdownIt = require("markdown-it");
  let markdownItAnchor = require("markdown-it-anchor");
  let options = {
    html: true,
    breaks: true,
    linkify: true
  };
  let opts = {
    permalink: false
  };
    	  

  const regExBlock = /^s?(\S+)\s?"([^"]*)"/;
  eleventyConfig.setLibrary("md", markdownIt(options)
    .use(markdownItAnchor, opts)
    .use(blockPlugin, {
		amazon (content) {
		  const contents = regExBlock.exec(content);		  
		  if (Array.isArray(contents)) {
    	  	var link = contents[1];
    	  	var asin = contents[2];    	  	
		  	return `<a class="book" href="${link}" target="_blank">
    	 	 		<img border="0" src="//ws-eu.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=${asin}&Format=_SL250_&ID=AsinImage&MarketPlace=GB&ServiceVersion=20070822&WS=1&tag=artrabbit-21&language=en_GB" >
    	  		</a>`;
		  }
		  return;
		},
		youtube (content) {
		  //console.log(content);
		  
		  const contents = regExBlock.exec(content);
		  if (Array.isArray(contents)) {
    	  	id = contents[1];
    	  	alt = contents[2];
		  	return `<div class="video-container youtube" data-id="${id}">
					<img src="https://i.ytimg.com/vi/${id}/hqdefault.jpg" alt="${alt}">
					<a tabindex="0" href="https://www.youtube.com/watch/${id}" role="button" aria-label="Play video" class="play"></a>
				</div>`;
		  }
		  return;
		}
    })
    .use(figurePlugin, {
		dataType: false, 
		figcaption: true, 
		tabindex: true, 
		link: true
    })
  );
  
  return {
    templateFormats: ["md", "njk", "html", "liquid"],

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about it.
    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for URLs (it does not affect your file structure)
    pathPrefix: "/",

    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    passthroughFileCopy: true,
    dir: {
      input: "./src",
      includes: "/_includes",
      data: "/_data",
      output: "_site"
    }
  };
};
