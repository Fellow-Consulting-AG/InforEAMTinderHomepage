if (typeof infor == "undefined") {
    infor = {};
}

if (typeof infor.companyon == "undefined") {
    infor.companyon = {};
}

infor.companyon.client = {};
infor.companyon.client.listeningMessageTypes = {};
infor.companyon.client.drillbackSelector = "a.companyon-drillbacklink";
infor.companyon.client.favoritesSelector = "a.companyon-favoritelink";
var MsgType = {
    'ContextDimensionChanged': 'contextDimensionChanged'
};

/** 
* Message Handler for post messages
**/
infor.companyon.client.messageReceiver = function (e) {
    infor.companyon.client.executeMessage(e.data);
}

infor.companyon.client.executeMessage = function (msg) {

    if (msg == null) {
        return;
    }

    try {
        msg = $.parseJSON(msg);
    } catch (e) {
        // ignore any errors during the parsing of the JSON message and return from the message handler
        // TODO: Once the client side logging is made available to core products, we can use the client side 
        // logging to log this message.
        return;
    }
    var type = msg.type;
    var data = msg.data;


    if (type == null) { return; }

    var registeredHandlers = infor.companyon.client.listeningMessageTypes[type] || [];
    var wildCardHandlers = infor.companyon.client.listeningMessageTypes["*"] || [];
    var allHandlers = {};
    $.extend(allHandlers, registeredHandlers, wildCardHandlers);
    $.each(allHandlers, function (index, elem) {
        var registeredHandler = elem.handler;
        try {
            registeredHandler(data, type);
        } catch (e) {
            //ignore any errors during the execution of the handler and continue to the next handler
        }
    });
    allHandlers = {};
}

infor.companyon.client.sendRelayMessage = function (type, data) {
        // Send a proxy message to the top window and the message shall inturn be routed back to the 
        // application sharepoint site iframe from the top window

        var proxyMessage = {
            type: type,
            data: data
        }
        infor.companyon.client.sendMessage("prepareRelayProxyMessage", proxyMessage);
}

/**
*  send a message to the  parent window.
*
*/
infor.companyon.client.sendMessageToParent = function (type, data) {

    var message = {
        type: type,
        data: data
    }
    var encodedMessage = JSON.stringify(message);

    var targetWindow = null;

    

        if (window.postMessage != null) {
            // Send a proxy message to the top window and the message shall inturn be routed back to the 
            // application sharepoint site iframe from the top window
            var proxyMessage = {
                type: "workspaceProxyMessage",
                data: message
            }
            var encodedProxyMessage = JSON.stringify(proxyMessage);
            if (window.parent != window) {
                window.parent.postMessage(encodedProxyMessage, "*");
            }
            //window.parent.postMessage(encodedMessage, "*");
        } 
    
}

infor.companyon.client.getMobileOperatingSystem = function () {
	var userAgent = navigator.userAgent || navigator.vendor || window.opera;

	// Windows Phone must come first because its UA also contains "Android"
   	if (/windows phone/i.test(userAgent)) {
    	return "Windows Phone";
 	}

   	if (/android/i.test(userAgent)) {
   		return "Android";
   	}

	// iOS detection
 	if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
     	return "iOS";
 	}

	return "unknown";
}

/**
*  send a message to the infor app container.
*
*/
infor.companyon.client.sendMessage = function (type, data, target) {

    var message = {
        type: type,
        data: data
    }
    var encodedMessage = JSON.stringify(message);

    try {
        var osName = infor.companyon.client.getMobileOperatingSystem();

        if (osName == "iOS" && webkit.messageHandlers) {
            webkit.messageHandlers.callbackHandler.postMessage(encodedMessage);
        }

        if (osName == "Android" && InforGoAndroid) {
            InforGoAndroid.getLoadedPageInfo(encodedMessage);
        }
    } catch(e) {
        //ignore error. This will occur only if the application is accessed in mobile mode of the browser in desktop.
    }

    var targetWindow = null;

    if (infor.companyon.containerWindow === true) {

        //client is part of the main window, so use the current window to send the message
        //if ie7, use the companyon function to send the message

        if (window.postMessage != null) {
            window.postMessage(encodedMessage, "*");
        } else {

            //workaround for ie7, might be able to call the messagereceiver directly in all cases!
            if (typeof infor.companyon.messageReceiver == "function") {
                infor.companyon.messageReceiver({ data: encodedMessage });
            }

        }

    } else {

        // The below logic was being used for drillbacks in dashboards where we allowed drillbacks from pop-up windows
        if (window.opener != null) {
            //cannot call postMessage on opener directly, call a JS function
            //http://blogs.msdn.com/b/ieinternals/archive/2009/09/16/bugs-in-ie8-support-for-html5-postmessage-sessionstorage-and-localstorage.aspx

            try {
                window.opener.infor.companyon.client.sendMessageProxy(encodedMessage);
                window.opener.focus();
                window.opener.document.focus();
            }
            catch (e) {
                //ignore errors;
            }
            return;
        }
        if (arguments.length == 3) {
            var encodedProxyMessage = JSON.stringify(message);
            arguments[2].postMessage(encodedProxyMessage, "*");
        }
        else
            if (window.postMessage != null) {
                // Send a proxy message to the top window and the message shall inturn be routed back to the 
                // application sharepoint site iframe from the top window
                var proxyMessage = {
                    type: "workspaceProxyMessage",
                    data: message
                }
                var encodedProxyMessage = JSON.stringify(proxyMessage);
                if (window.top != window) {
                    window.top.postMessage(encodedProxyMessage, "*");
                }
                window.parent.postMessage(encodedMessage, "*");
            } else {

                // for IE7
                // workaround - if the frame is not there, wait until it is created in the parentpage (usually happens during initValues message)

                function testFrameAndSend() {

                    var frame = window.parent.frames["inforCommFrame"];
                    if (frame != null) {
                        frame.sendMessage(encodedMessage, infor.companyon.client.sharePointUrl);
                    } else {
                        setTimeout(testFrameAndSend, 100);
                    }
                }
                testFrameAndSend();
            }
    }
}

/**
* to be called from popup windows, opened from the same domain
*/
infor.companyon.client.sendMessageProxy = function (encodedMessage) {
    var messageObject = $.evalJSON(encodedMessage);
    infor.companyon.client.sendMessage(messageObject.type, messageObject.data);

}

/** 
* Send "prepareApplicationDrillback" message to handle the drillback execution
**/
infor.companyon.client.sendPrepareDrillbackMessage = function (href) {
    var data = {
        link: href
    }
    infor.companyon.client.sendMessage("prepareApplicationDrillback", data);
    infor.companyon.client.sendMessage('syndication.complete', {});
}

/**
* Send Height Adjustment message . This is specifically provided in infor-companyon-client to 
* deal with different versions.
*/

infor.companyon.client.adjustHeight = function (height) {
    infor.companyon.client.sendMessage(window.name, { 'height': height + "px" });
    infor.companyon.client.sendMessage(MsgType.ContextDimensionChanged, { 'height': height, 'iframeName': window.name });

}

/** 
* Send prepareFavoriteContext to handle the shortcut execution
**/
infor.companyon.client.sendPrepareFavoritesMessage = function (href) {
    var data = {
        link: href
    }
    infor.companyon.client.sendMessage("prepareFavoriteContext", data);
}

//to be called from Silverlight because you cannot call a javascript methods with dots from Silverlight
function inforCompanyOnPrepareFavorites(href) {
    infor.companyon.client.sendPrepareFavoritesMessage(href);
}

/** 
* Function to retrieve the query string parameter value for a given key from the URL in the current window
**/
infor.companyon.client.getValueQuerystring = function (key) {
    var key = key.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + key + "=([^&#]*)");
    var qs = regex.exec(window.location.href);

    var value = null;
    if (qs != null) {
        value = qs[1];
    }
    return value;
}

/** 
* Function to register a handler for a given message type in a given namespace. The array of 
* registered messagetypes is updated and a message (of type workspaceClientSubscribe) is sent to the Workspace.
**/
infor.companyon.client.registerMessageHandler = function (messageType, handler, namespace) {
    if (messageType == null || handler == null) {
        return;
    }

    var handlers = infor.companyon.client.listeningMessageTypes[messageType] || [];

    handlers.push({
        handler: handler,
        namespace: namespace
    });

    infor.companyon.client.listeningMessageTypes[messageType] = handlers;
    
    if (arguments.length == 4) {
        
        infor.companyon.client.sendMessageToParent("workspaceClientSubscribe", {
            messageType: messageType,
            iframeName: window.name
        });
    }
    else {
        //inform the parent about this message type
        infor.companyon.client.sendMessage("workspaceClientSubscribe", {
            messageType: messageType,
            iframeName: window.name
        });
    }
}

/** 
* Function to unregister a handler for a given message type in a given namespace. Currently, we do not
* send a message to Workspace to cleanup the subscription.
**/
infor.companyon.client.unRegisterMessageHandler = function (messageType, namespace) {
    if (messageType == null) {
        return;
    }

    var handlers = infor.companyon.client.listeningMessageTypes[messageType] || [];
    var newHandlers = [];
    $.each(handlers, function (index, elem) {
        if (elem.namespace != namespace) {
            newHandlers.push(elem);
        }
    });

    infor.companyon.client.listeningMessageTypes[messageType] = newHandlers;
}

// bind and unbind were the function names for message handler registration. Hence they are still being
// maintained for backward compatibility.
infor.companyon.client.bind = infor.companyon.client.registerMessageHandler;
infor.companyon.client.unbind = infor.companyon.client.unRegisterMessageHandler;

//// New Function which needs to be called for Environment Information
infor.companyon.client.getEnvironmentInformation = function (callback) {
    var randomNumber = infor.companyon.client.getRandomNumber();
    var data = {};
    data.MessageId = randomNumber;
    //// Step 1: Un-register
    infor.companyon.client.unRegisterMessageHandler("processEnvironmentInformation_" + randomNumber);

    //// Step 2: Register Handler
    infor.companyon.client.registerMessageHandler("processEnvironmentInformation_" + randomNumber, function (data) {

        callback(data);
    });

    //// Step 3: sendMessage
    infor.companyon.client.sendMessage("getEnvironmentInformation", data);
}

//// New Function which needs to be called for Entity Information Information
infor.companyon.client.getEntityInformation = function (data, callback) {
    var randomNumber = infor.companyon.client.getRandomNumber();
    data.MessageId = randomNumber;
    //// Step 1: Un-register
    infor.companyon.client.unRegisterMessageHandler("processEntityInformation_" + randomNumber);

    //// Step 2: Register Handler
    infor.companyon.client.registerMessageHandler("processEntityInformation_" + randomNumber, function (data) {
        callback(data);
    });

    //// Step 3: sendMessage
    infor.companyon.client.sendMessage("getEntityInformation", data);
}

infor.companyon.client.getRandomNumber = function () {
    var randomId = "" + new Date().getTime() + (Math.floor(Math.random() * 10000));
    return randomId;
}

infor.companyon.client.getInforMingleHomeUrl = function (callback) {
    var randomNumber = infor.companyon.client.getRandomNumber();
    var data = {};
    data.MessageId = randomNumber;
    //// Step 1: Un-register
    infor.companyon.client.unRegisterMessageHandler("processInforMingleHomeUrl_" + randomNumber);

    //// Step 2: Register Handler
    infor.companyon.client.registerMessageHandler("processInforMingleHomeUrl_" + randomNumber, function (data) {
        callback(data);
    });

    //// Step 3: sendMessage
    infor.companyon.client.sendMessage("getInforMingleHomeUrl", data);
}


infor.companyon.client.relayMessage = function (data) {

    infor.companyon.client.executeMessage(JSON.stringify(data));
    var frames = $('iframe');

    for (var ct = 0; ct < frames.length; ct++) {
        //var target = frames[ct].get(0).contentWindow;
        var fr = $('iframe[name="' + $(frames[ct]).attr('name') + '"]');
        infor.companyon.client.sendMessage("relayFrameMessage", data, fr.get(0).contentWindow);
    }
}

$(function () {

    //Don't do anything if an app iframe is already present. This is only needed for SharePoint based applications
    if (infor.companyon.iframeId != null) {
        return;
    }

    if (window.postMessage != null) {

        if (window.attachEvent) {
            window.attachEvent("onmessage", infor.companyon.client.messageReceiver)
        } else if (window.addEventListener) {
            window.addEventListener("message", infor.companyon.client.messageReceiver, false);
        }
    }

    // drillback click handler
    if ('undefined' === typeof ($('body').live)) {
        $('body').on({
            click: function () {
                event.preventDefault();
                var href = $(this).attr("href");
                // infor.companyon.client.sendPrepareDrillbackMessage(href);

            }
        }, infor.companyon.client.drillbackSelector);

        $('body').on({
            click: function () {
                event.preventDefault();
                var href = $(this).attr("href");
                //infor.companyon.client.sendPrepareFavoritesMessage(href);

            }
        }, infor.companyon.client.favoritesSelector);

    }
    else
        if ('function' === typeof ($(infor.companyon.client.drillbackSelector).live)) {
            $(infor.companyon.client.drillbackSelector).live("click", function (event) {
                event.preventDefault();
                var href = $(this).attr("href");
                infor.companyon.client.sendPrepareDrillbackMessage(href);
                return false;
            });
            $(infor.companyon.client.favoritesSelector).live("click", function (event) {
                event.preventDefault();
                var href = $(this).attr("href");
                infor.companyon.client.sendPrepareFavoritesMessage(href);
                return false;
            });
        }

    // shortcut/favorite click handler


    //no need to send initclient when in a popup
    if (window.opener == null) {
        // Once this message is received by Workspace, it is assumed that the application is ready for receiving messages
        infor.companyon.client.sendMessage("initClient", window.name);
    }
    infor.companyon.client.registerMessageHandler("relayFrameMessage", infor.companyon.client.relayMessage);

});

infor.companyon.client.sendMobileMessage = function(type, data) {
	var msgData;
	// Since the message was stringified try and parse it back to an object
	try {
		msgData = $.parseJSON(data);
	} catch (e) {
		// ignore any errors during the parsing of the JSON message and use the default data instead
		msgData = data;
	}

	infor.companyon.client.listeningMessageTypes[type][0].handler(msgData);
}

// code to detect the scroll in inforGo App and send the message to the App.
var lastY;
var lastMsg;
var mosName = infor.companyon.client.getMobileOperatingSystem();
var msg;

$(window).on('touchstart', function(e) {
    lastY = e.originalEvent.touches ? e.originalEvent.touches[0].pageY : e.pageY;
});

$(window).on('touchmove', function (e) {
    try {
		var currentY = e.originalEvent.touches ? e.originalEvent.touches[0].pageY : e.pageY;
        if (Math.abs(currentY - lastY) < 15) { return; }
		if (currentY > lastY) {
			msg = { type: "scrolledDown", data: {} };
			if(lastMsg != msg.type){
				lastMsg = msg.type;
				var encodeMsg = JSON.stringify(msg);
				
				if(mosName == "iOS" && webkit.messageHandlers) {
					webkit.messageHandlers.callbackHandler.postMessage(encodeMsg);
				}
				else if (mosName == "Android" && InforGoAndroid) {
					InforGoAndroid.getLoadedPageInfo(encodeMsg);
				}
			}
		} else {
			msg = { type: "scrolledUp", data: {} };
			if (lastMsg != msg.type) {
				lastMsg = msg.type;
				var encodeMessage = JSON.stringify(msg);
				
				if(mosName == "iOS" && webkit.messageHandlers) {
					webkit.messageHandlers.callbackHandler.postMessage(encodeMessage);
				}
				else if (mosName == "Android" && InforGoAndroid) {
					InforGoAndroid.getLoadedPageInfo(encodeMessage);
				}
			}
		}
    } catch (e) {
        console.log("From Companyon error occured is " +e);
    }
});
