(self.webpackChunkgenerador=self.webpackChunkgenerador||[]).push([[358],{3358:function(ft){ft.exports=function(){"use strict";function N(r){return(N="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a})(r)}function B(r,a){return(B=Object.setPrototypeOf||function(s,f){return s.__proto__=f,s})(r,a)}function ct(){if("undefined"==typeof Reflect||!Reflect.construct||Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(r){return!1}}function X(r,a,o){return(X=ct()?Reflect.construct:function(f,R,L){var O=[null];O.push.apply(O,R);var $=new(Function.bind.apply(f,O));return L&&B($,L.prototype),$}).apply(null,arguments)}function y(r){return function(r){if(Array.isArray(r))return se(r)}(r)||function(r){if("undefined"!=typeof Symbol&&null!=r[Symbol.iterator]||null!=r["@@iterator"])return Array.from(r)}(r)||function(r,a){if(r){if("string"==typeof r)return se(r,a);var o=Object.prototype.toString.call(r).slice(8,-1);if("Object"===o&&r.constructor&&(o=r.constructor.name),"Map"===o||"Set"===o)return Array.from(r);if("Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o))return se(r,a)}}(r)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function se(r,a){(null==a||a>r.length)&&(a=r.length);for(var o=0,s=new Array(a);o<a;o++)s[o]=r[o];return s}var vt=Object.hasOwnProperty,Ie=Object.setPrototypeOf,Tt=Object.isFrozen,_t=Object.getPrototypeOf,At=Object.getOwnPropertyDescriptor,T=Object.freeze,S=Object.seal,Et=Object.create,xe="undefined"!=typeof Reflect&&Reflect,K=xe.apply,ue=xe.construct;K||(K=function(a,o,s){return a.apply(o,s)}),T||(T=function(a){return a}),S||(S=function(a){return a}),ue||(ue=function(a,o){return X(a,y(o))});var r,yt=g(Array.prototype.forEach),ke=g(Array.prototype.pop),W=g(Array.prototype.push),Z=g(String.prototype.toLowerCase),gt=g(String.prototype.match),C=g(String.prototype.replace),bt=g(String.prototype.indexOf),St=g(String.prototype.trim),_=g(RegExp.prototype.test),fe=(r=TypeError,function(){for(var a=arguments.length,o=new Array(a),s=0;s<a;s++)o[s]=arguments[s];return ue(r,o)});function g(r){return function(a){for(var o=arguments.length,s=new Array(o>1?o-1:0),f=1;f<o;f++)s[f-1]=arguments[f];return K(r,a,s)}}function l(r,a,o){o=o||Z,Ie&&Ie(r,null);for(var s=a.length;s--;){var f=a[s];if("string"==typeof f){var R=o(f);R!==f&&(Tt(a)||(a[s]=R),f=R)}r[f]=!0}return r}function x(r){var o,a=Et(null);for(o in r)K(vt,r,[o])&&(a[o]=r[o]);return a}function J(r,a){for(;null!==r;){var o=At(r,a);if(o){if(o.get)return g(o.get);if("function"==typeof o.value)return g(o.value)}r=_t(r)}return function(f){return console.warn("fallback value for",f),null}}var Fe=T(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","section","select","shadow","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),ce=T(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","filter","font","g","glyph","glyphref","hkern","image","line","lineargradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),pe=T(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Ot=T(["animate","color-profile","cursor","discard","fedropshadow","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),me=T(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover"]),Dt=T(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Pe=T(["#text"]),Ue=T(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","face","for","headers","height","hidden","high","href","hreflang","id","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","pattern","placeholder","playsinline","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","xmlns","slot"]),de=T(["accent-height","accumulate","additive","alignment-baseline","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),He=T(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Q=T(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Nt=S(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Lt=S(/<%[\w\W]*|[\w\W]*%>/gm),Mt=S(/^data-[\-\w.\u00B7-\uFFFF]/),wt=S(/^aria-[\-\w]+$/),Ct=S(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),It=S(/^(?:\w+script|data):/i),xt=S(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),kt=S(/^html$/i),Ft=function(){return"undefined"==typeof window?null:window},Pt=function(a,o){if("object"!==N(a)||"function"!=typeof a.createPolicy)return null;var s=null,f="data-tt-policy-suffix";o.currentScript&&o.currentScript.hasAttribute(f)&&(s=o.currentScript.getAttribute(f));var R="dompurify"+(s?"#"+s:"");try{return a.createPolicy(R,{createHTML:function(O){return O},createScriptURL:function(O){return O}})}catch(L){return console.warn("TrustedTypes policy "+R+" could not be created."),null}};return function ze(){var r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Ft(),a=function(e){return ze(e)};if(a.version="2.3.10",a.removed=[],!r||!r.document||9!==r.document.nodeType)return a.isSupported=!1,a;var o=r.document,s=r.document,f=r.DocumentFragment,R=r.HTMLTemplateElement,L=r.Node,O=r.Element,j=r.NodeFilter,$=r.NamedNodeMap,Ht=void 0===$?r.NamedNodeMap||r.MozNamedAttrMap:$,zt=r.HTMLFormElement,Gt=r.DOMParser,ee=r.trustedTypes,te=O.prototype,Bt=J(te,"cloneNode"),Wt=J(te,"nextSibling"),jt=J(te,"childNodes"),he=J(te,"parentNode");if("function"==typeof R){var ve=s.createElement("template");ve.content&&ve.content.ownerDocument&&(s=ve.content.ownerDocument)}var b=Pt(ee,o),Ge=b?b.createHTML(""):"",Te=s.implementation,$t=s.createNodeIterator,Yt=s.createDocumentFragment,Vt=s.getElementsByTagName,qt=o.importNode,Be={};try{Be=x(s).documentMode?s.documentMode:{}}catch(i){}var D={};a.isSupported="function"==typeof he&&Te&&void 0!==Te.createHTMLDocument&&9!==Be;var z,m,_e=Nt,Ae=Lt,Xt=Mt,Kt=wt,Zt=It,We=xt,Ee=Ct,p=null,je=l({},[].concat(y(Fe),y(ce),y(pe),y(me),y(Pe))),d=null,$e=l({},[].concat(y(Ue),y(de),y(He),y(Q))),c=Object.seal(Object.create(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Y=null,ye=null,Ye=!0,ge=!0,Ve=!1,F=!1,k=!1,be=!1,Se=!1,P=!1,ae=!1,ne=!1,qe=!0,Re=!0,V=!1,U={},H=null,Xe=l({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Ke=null,Ze=l({},["audio","video","img","source","image","track"]),Oe=null,Je=l({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),De="http://www.w3.org/1998/Math/MathML",Ne="http://www.w3.org/2000/svg",I="http://www.w3.org/1999/xhtml",ie=I,Le=!1,Jt=["application/xhtml+xml","text/html"],Qt="text/html",G=null,er=s.createElement("form"),Qe=function(e){return e instanceof RegExp||e instanceof Function},Me=function(e){G&&G===e||((!e||"object"!==N(e))&&(e={}),e=x(e),z=z=-1===Jt.indexOf(e.PARSER_MEDIA_TYPE)?Qt:e.PARSER_MEDIA_TYPE,m="application/xhtml+xml"===z?function(t){return t}:Z,p="ALLOWED_TAGS"in e?l({},e.ALLOWED_TAGS,m):je,d="ALLOWED_ATTR"in e?l({},e.ALLOWED_ATTR,m):$e,Oe="ADD_URI_SAFE_ATTR"in e?l(x(Je),e.ADD_URI_SAFE_ATTR,m):Je,Ke="ADD_DATA_URI_TAGS"in e?l(x(Ze),e.ADD_DATA_URI_TAGS,m):Ze,H="FORBID_CONTENTS"in e?l({},e.FORBID_CONTENTS,m):Xe,Y="FORBID_TAGS"in e?l({},e.FORBID_TAGS,m):{},ye="FORBID_ATTR"in e?l({},e.FORBID_ATTR,m):{},U="USE_PROFILES"in e&&e.USE_PROFILES,Ye=!1!==e.ALLOW_ARIA_ATTR,ge=!1!==e.ALLOW_DATA_ATTR,Ve=e.ALLOW_UNKNOWN_PROTOCOLS||!1,F=e.SAFE_FOR_TEMPLATES||!1,k=e.WHOLE_DOCUMENT||!1,P=e.RETURN_DOM||!1,ae=e.RETURN_DOM_FRAGMENT||!1,ne=e.RETURN_TRUSTED_TYPE||!1,Se=e.FORCE_BODY||!1,qe=!1!==e.SANITIZE_DOM,Re=!1!==e.KEEP_CONTENT,V=e.IN_PLACE||!1,Ee=e.ALLOWED_URI_REGEXP||Ee,ie=e.NAMESPACE||I,e.CUSTOM_ELEMENT_HANDLING&&Qe(e.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(c.tagNameCheck=e.CUSTOM_ELEMENT_HANDLING.tagNameCheck),e.CUSTOM_ELEMENT_HANDLING&&Qe(e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(c.attributeNameCheck=e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),e.CUSTOM_ELEMENT_HANDLING&&"boolean"==typeof e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements&&(c.allowCustomizedBuiltInElements=e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),F&&(ge=!1),ae&&(P=!0),U&&(p=l({},y(Pe)),d=[],!0===U.html&&(l(p,Fe),l(d,Ue)),!0===U.svg&&(l(p,ce),l(d,de),l(d,Q)),!0===U.svgFilters&&(l(p,pe),l(d,de),l(d,Q)),!0===U.mathMl&&(l(p,me),l(d,He),l(d,Q))),e.ADD_TAGS&&(p===je&&(p=x(p)),l(p,e.ADD_TAGS,m)),e.ADD_ATTR&&(d===$e&&(d=x(d)),l(d,e.ADD_ATTR,m)),e.ADD_URI_SAFE_ATTR&&l(Oe,e.ADD_URI_SAFE_ATTR,m),e.FORBID_CONTENTS&&(H===Xe&&(H=x(H)),l(H,e.FORBID_CONTENTS,m)),Re&&(p["#text"]=!0),k&&l(p,["html","head","body"]),p.table&&(l(p,["tbody"]),delete Y.tbody),T&&T(e),G=e)},et=l({},["mi","mo","mn","ms","mtext"]),tt=l({},["foreignobject","desc","title","annotation-xml"]),tr=l({},["title","style","font","a","script"]),oe=l({},ce);l(oe,pe),l(oe,Ot);var we=l({},me);l(we,Dt);var rr=function(e){var t=he(e);(!t||!t.tagName)&&(t={namespaceURI:I,tagName:"template"});var n=Z(e.tagName),u=Z(t.tagName);return e.namespaceURI===Ne?t.namespaceURI===I?"svg"===n:t.namespaceURI===De?"svg"===n&&("annotation-xml"===u||et[u]):Boolean(oe[n]):e.namespaceURI===De?t.namespaceURI===I?"math"===n:t.namespaceURI===Ne?"math"===n&&tt[u]:Boolean(we[n]):e.namespaceURI===I&&!(t.namespaceURI===Ne&&!tt[u]||t.namespaceURI===De&&!et[u])&&!we[n]&&(tr[n]||!oe[n])},M=function(e){W(a.removed,{element:e});try{e.parentNode.removeChild(e)}catch(t){try{e.outerHTML=Ge}catch(n){e.remove()}}},rt=function(e,t){try{W(a.removed,{attribute:t.getAttributeNode(e),from:t})}catch(n){W(a.removed,{attribute:null,from:t})}if(t.removeAttribute(e),"is"===e&&!d[e])if(P||ae)try{M(t)}catch(n){}else try{t.setAttribute(e,"")}catch(n){}},at=function(e){var t,n;if(Se)e="<remove></remove>"+e;else{var u=gt(e,/^[\r\n\t ]+/);n=u&&u[0]}"application/xhtml+xml"===z&&(e='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+e+"</body></html>");var E=b?b.createHTML(e):e;if(ie===I)try{t=(new Gt).parseFromString(E,z)}catch(h){}if(!t||!t.documentElement){t=Te.createDocument(ie,"template",null);try{t.documentElement.innerHTML=Le?"":E}catch(h){}}var v=t.body||t.documentElement;return e&&n&&v.insertBefore(s.createTextNode(n),v.childNodes[0]||null),ie===I?Vt.call(t,k?"html":"body")[0]:k?t.documentElement:v},nt=function(e){return $t.call(e.ownerDocument||e,e,j.SHOW_ELEMENT|j.SHOW_COMMENT|j.SHOW_TEXT,null,!1)},ar=function(e){return e instanceof zt&&("string"!=typeof e.nodeName||"string"!=typeof e.textContent||"function"!=typeof e.removeChild||!(e.attributes instanceof Ht)||"function"!=typeof e.removeAttribute||"function"!=typeof e.setAttribute||"string"!=typeof e.namespaceURI||"function"!=typeof e.insertBefore)},q=function(e){return"object"===N(L)?e instanceof L:e&&"object"===N(e)&&"number"==typeof e.nodeType&&"string"==typeof e.nodeName},w=function(e,t,n){!D[e]||yt(D[e],function(u){u.call(a,t,n,G)})},it=function(e){var t;if(w("beforeSanitizeElements",e,null),ar(e)||_(/[\u0080-\uFFFF]/,e.nodeName))return M(e),!0;var n=m(e.nodeName);if(w("uponSanitizeElement",e,{tagName:n,allowedTags:p}),e.hasChildNodes()&&!q(e.firstElementChild)&&(!q(e.content)||!q(e.content.firstElementChild))&&_(/<[/\w]/g,e.innerHTML)&&_(/<[/\w]/g,e.textContent)||"select"===n&&_(/<template/i,e.innerHTML))return M(e),!0;if(!p[n]||Y[n]){if(!Y[n]&&lt(n)&&(c.tagNameCheck instanceof RegExp&&_(c.tagNameCheck,n)||c.tagNameCheck instanceof Function&&c.tagNameCheck(n)))return!1;if(Re&&!H[n]){var u=he(e)||e.parentNode,E=jt(e)||e.childNodes;if(E&&u)for(var h=E.length-1;h>=0;--h)u.insertBefore(Bt(E[h],!0),Wt(e))}return M(e),!0}return e instanceof O&&!rr(e)||("noscript"===n||"noembed"===n)&&_(/<\/no(script|embed)/i,e.innerHTML)?(M(e),!0):(F&&3===e.nodeType&&(t=C(t=e.textContent,_e," "),t=C(t,Ae," "),e.textContent!==t&&(W(a.removed,{element:e.cloneNode()}),e.textContent=t)),w("afterSanitizeElements",e,null),!1)},ot=function(e,t,n){if(qe&&("id"===t||"name"===t)&&(n in s||n in er))return!1;if((!ge||ye[t]||!_(Xt,t))&&(!Ye||!_(Kt,t)))if(!d[t]||ye[t]){if(!(lt(e)&&(c.tagNameCheck instanceof RegExp&&_(c.tagNameCheck,e)||c.tagNameCheck instanceof Function&&c.tagNameCheck(e))&&(c.attributeNameCheck instanceof RegExp&&_(c.attributeNameCheck,t)||c.attributeNameCheck instanceof Function&&c.attributeNameCheck(t))||"is"===t&&c.allowCustomizedBuiltInElements&&(c.tagNameCheck instanceof RegExp&&_(c.tagNameCheck,n)||c.tagNameCheck instanceof Function&&c.tagNameCheck(n))))return!1}else if(!Oe[t]&&!_(Ee,C(n,We,""))&&("src"!==t&&"xlink:href"!==t&&"href"!==t||"script"===e||0!==bt(n,"data:")||!Ke[e])&&(!Ve||_(Zt,C(n,We,"")))&&n)return!1;return!0},lt=function(e){return e.indexOf("-")>0},st=function(e){var t,n,u,E;w("beforeSanitizeAttributes",e,null);var v=e.attributes;if(v){var h={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:d};for(E=v.length;E--;){var A=(t=v[E]).name,Ce=t.namespaceURI;if(n="value"===A?t.value:St(t.value),u=m(A),h.attrName=u,h.attrValue=n,h.keepAttr=!0,h.forceKeepAttr=void 0,w("uponSanitizeAttribute",e,h),n=h.attrValue,!h.forceKeepAttr&&(rt(A,e),h.keepAttr)){if(_(/\/>/i,n)){rt(A,e);continue}F&&(n=C(n,_e," "),n=C(n,Ae," "));var ut=m(e.nodeName);if(ot(ut,u,n)){if(b&&"object"===N(ee)&&"function"==typeof ee.getAttributeType&&!Ce)switch(ee.getAttributeType(ut,u)){case"TrustedHTML":n=b.createHTML(n);break;case"TrustedScriptURL":n=b.createScriptURL(n)}try{Ce?e.setAttributeNS(Ce,A,n):e.setAttribute(A,n),ke(a.removed)}catch(ir){}}}}w("afterSanitizeAttributes",e,null)}},nr=function i(e){var t,n=nt(e);for(w("beforeSanitizeShadowDOM",e,null);t=n.nextNode();)w("uponSanitizeShadowNode",t,null),!it(t)&&(t.content instanceof f&&i(t.content),st(t));w("afterSanitizeShadowDOM",e,null)};return a.sanitize=function(i,e){var t,n,u,E,v;if((Le=!i)&&(i="\x3c!--\x3e"),"string"!=typeof i&&!q(i)){if("function"!=typeof i.toString)throw fe("toString is not a function");if("string"!=typeof(i=i.toString()))throw fe("dirty is not a string, aborting")}if(!a.isSupported){if("object"===N(r.toStaticHTML)||"function"==typeof r.toStaticHTML){if("string"==typeof i)return r.toStaticHTML(i);if(q(i))return r.toStaticHTML(i.outerHTML)}return i}if(be||Me(e),a.removed=[],"string"==typeof i&&(V=!1),V){if(i.nodeName){var h=m(i.nodeName);if(!p[h]||Y[h])throw fe("root node is forbidden and cannot be sanitized in-place")}}else if(i instanceof L)1===(n=(t=at("\x3c!----\x3e")).ownerDocument.importNode(i,!0)).nodeType&&"BODY"===n.nodeName||"HTML"===n.nodeName?t=n:t.appendChild(n);else{if(!P&&!F&&!k&&-1===i.indexOf("<"))return b&&ne?b.createHTML(i):i;if(!(t=at(i)))return P?null:ne?Ge:""}t&&Se&&M(t.firstChild);for(var le=nt(V?i:t);u=le.nextNode();)3===u.nodeType&&u===E||it(u)||(u.content instanceof f&&nr(u.content),st(u),E=u);if(E=null,V)return i;if(P){if(ae)for(v=Yt.call(t.ownerDocument);t.firstChild;)v.appendChild(t.firstChild);else v=t;return d.shadowroot&&(v=qt.call(o,v,!0)),v}var A=k?t.outerHTML:t.innerHTML;return k&&p["!doctype"]&&t.ownerDocument&&t.ownerDocument.doctype&&t.ownerDocument.doctype.name&&_(kt,t.ownerDocument.doctype.name)&&(A="<!DOCTYPE "+t.ownerDocument.doctype.name+">\n"+A),F&&(A=C(A,_e," "),A=C(A,Ae," ")),b&&ne?b.createHTML(A):A},a.setConfig=function(i){Me(i),be=!0},a.clearConfig=function(){G=null,be=!1},a.isValidAttribute=function(i,e,t){G||Me({});var n=m(i),u=m(e);return ot(n,u,t)},a.addHook=function(i,e){"function"==typeof e&&(D[i]=D[i]||[],W(D[i],e))},a.removeHook=function(i){if(D[i])return ke(D[i])},a.removeHooks=function(i){D[i]&&(D[i]=[])},a.removeAllHooks=function(){D={}},a}()}()}}]);