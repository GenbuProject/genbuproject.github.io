javascript:var _scriptElem=document.createElement("script");_scriptElem.src="https://genbuproject.github.io/Programs/DOM Extender/DOM Extender v3.4.js"_scriptElem.addEventListener("load",function(){window.initUtilBtns=function(){var a=new DOM("$Textarea.autosuggest-textarea__textarea"),c=new DOM("$.compose-form__publish-button-wrapper > Button:Not(.utilBtn__button)"),f=new DOM("$.compose-form"),d=new DOM("Div",{id:"utilBtn"}),g=new Style({".compose-form__publish-button-wrapper":{Overflow:"Initial !Important"},".compose-form__publish-button-wrapper > Button":{Display:"Inline-Block !Important",Width:"Auto !Important","Margin-Right":"0.5em"},".compose-form__publish-button-wrapper > Button:Last-Child":{"Margin-Right":"Auto"},"#utilBtn":{"Padding-Top":"10px"},"#utilBtn > *":{"Margin-Bottom":"1em"}});f.appendChild(d);d.appendChild(g);(new DOM("$.compose-form__publish-button-wrapper")).insertBefore(new DOM("Button",{id:"utilBtn__button--risa",classes:["button","button--block","utilBtn__button"],text:"\u308a\u3055\u59c9",events:{click:function(){a.value="@RISA ";a.focus()}}}),c);[{id:"utilBtn__button--goji",text:"\uff7a\uff9e\uff7c\uff9e\uff93\uff98\uff68\uff68\uff68\uff68\uff68\uff68!!!",onclick:function(){a.value="#\u8aa4\u5b57\u306b\u6deb\u5922\u53a8\r\n:goji:";c.click()}},{id:"utilBtn__button--harukin",text:"\u306f\u308b\u304d\u3093\u713c\u5374",onclick:function(){var e=Math.random.randomInt(1,7),b="";switch(Math.random.randomInt(1,2)){case 1:b=":harukin: ";break;case 2:b=":harukin_old: "}switch(e){default:a.value=[b.repeat(e),"\ud83d\udd25 ".repeat(e)].join("\r\n");break;case 7:a.value=(b+"\ud83d\udc95\r\n").repeat(6)}c.click()}}].forEach(function(a){d.appendChild(new DOM("Button",{id:a.id,classes:["button","button--block","utilBtn__button"],text:a.text,events:{click:a.onclick}}))})}});document.body.appendChild(_scriptElem);window.addEventListener("DOMNodeInserted",function(a){"#text"!==a.target.nodeName&&a.target.classList.contains("drawer")&&a.target.querySelector("Div.compose-form")&&initUtilBtns()});