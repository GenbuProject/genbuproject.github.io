javascript:var _scriptElem=document.createElement("script");_scriptElem.src="https://genbuproject.github.io/Programs/DOM Extender/DOM Extender v3.4.js";_scriptElem.addEventListener("load",function(){window.initUtilBtns=function(){var a=new DOM("$.compose-form"),c=new DOM("Div",{id:"utilBtn",children:[new DOM("Div",{id:"utilBtn__tokenHolder",children:[new DOM("Input",{id:"utilBtn__tokenHolder__input--accessToken",classes:["search__input"],attributes:{Type:"Text",Value:localStorage.getItem("com.GenbuProject.UtilBtns.accessToken")||"",PlaceHolder:"\u30a2\u30af\u30bb\u30b9\u30c8\u30fc\u30af\u30f3"}}),new DOM("Button",{id:"utilBtn__tokenHolder__button--auth",classes:["button","utilBtn__button"],text:"\u8a8d\u8a3c",events:{click:function(){localStorage.setItem("com.GenbuProject.UtilBtns.accessToken",document.getElementById("utilBtn__tokenHolder__input--accessToken").value)}}})]})]}),e=new Style({"#utilBtn":{"Padding-Top":"10px"},"#utilBtn > *":{"Margin-Bottom":"1em"},"#utilBtn__tokenHolder":{Display:"Flex"},"#utilBtn__tokenHolder__input--accessToken":{Flex:1}});a.appendChild(c);a.appendChild(e);[{id:"utilBtn__button--goji",text:"\uff7a\uff9e\uff7c\uff9e\uff93\uff98\uff68\uff68\uff68\uff68\uff68\uff68!!!",onclick:function(b,d){b.value="#\u8aa4\u5b57\u306b\u6deb\u5922\u53a8\r\n:goji:";d.click()}},{id:"utilBtn__button--harukin",text:"\u306f\u308b\u304d\u3093\u713c\u5374",onclick:function(b,d){b.value=":harukin: :harukin: :harukin: :harukin: :harukin: :harukin:\r\n\ud83d\udd25 \ud83d\udd25 \ud83d\udd25 \ud83d\udd25 \ud83d\udd25 \ud83d\udd25";d.click()}},{id:"utilBtn__button--tootRate",text:"\u30c8\u30a5\u30fc\u30c8\u7387\u6295\u7a3f",onclick:function(b,d){var a=JSON.parse(DOM.xhr({type:"GET",url:"/api/v1/instance"}).response),c=JSON.parse(DOM.xhr({type:"GET",url:"/api/v1/accounts/verify_credentials",params:{access_token:localStorage.getItem("com.GenbuProject.UtilBtns.accessToken")}}).response);b.value=["\u300a\u30c8\u30a5\u30fc\u30c8\u7387\u300b","@"+c.username+" \u3055\u3093\u306e","\u30c8\u30a5\u30fc\u30c8\u7387\u306f"+(c.statuses_count/a.stats.status_count*100).toFixed(2)+"%\u3067\u3059\uff01","(Tooted from UtilBtns v3)"].join("\r\n");d.click()}}].forEach(function(b){var a=new DOM("$Textarea.autosuggest-textarea__textarea"),e=new DOM('$.compose-form__publish-button-wrapper:Not([ID="utilBtn"]) > Button');c.appendChild(new DOM("Button",{id:b.id,classes:["button","button--block","utilBtn__button"],text:b.text,events:{click:function(){b.onclick(a,e)}}}))})}});document.body.appendChild(_scriptElem);window.addEventListener("DOMNodeInserted",function(a){"#text"!==a.target.nodeName&&a.target.classList.contains("drawer")&&a.target.querySelector("Div.compose-form")&&initUtilBtns()});