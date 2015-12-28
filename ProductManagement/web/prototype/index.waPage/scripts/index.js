
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var button2 = {};	// @Button
	var documentEvent = {};	// @document
	var button1 = {};	// @Button
// @endregion// @endlock

// eventHandlers// @lock

	button2.click = function button2_click (event)// @startlock
	{// @endlock
		if(WAF.directory.logout()){   // if logout
			// hide logout stuff
			$("#button2").hide();
			$("#text1").hide();
			
			
			// show login stuff
			
			$("#textInput1").show();
			$("#textInput2").show();
			$("#button1").show();
			
			WAF.sources.user.query("ID < 0");
		}
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		    WAF.sources.user.query("ID < 0");
		 
		$("#text1").hide();
		$("#button2").hide();
		
	};// @lock

    

	button1.click = function button1_click (event)// @startlock
	{// @endlock
		var theLogin = $("#textInput1").val();
		var thePassword = $("#textInput2").val();
		
		if(WAF.directory.loginByPassword(theLogin, thePassword )){          // if login
			WAF.sources.user.all();
			location.assign("http://127.0.0.1:8083/app/index.html");
			
			//hide login stuff
			
			$("#textInput1").hide();
			$("#label1").hide();
			$("#textInput2").hide();
			$("#label2").hide();
			$("#button1").hide();
			
			
			
			$("#text1").html(WAF.directory.currentUser().fullName);
			$("#text1").css("top", "35px");
			$("#text1").show();
			
			$("#button2").css("top", "35px");
			$("#button2").show();
			
		}
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("button2", "click", button2.click, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
	WAF.addListener("button1", "click", button1.click, "WAF");
// @endregion
};// @endlock
