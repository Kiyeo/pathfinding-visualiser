(this["webpackJsonpalgorithm-visualiser"]=this["webpackJsonpalgorithm-visualiser"]||[]).push([[0],{15:function(e,t,n){},16:function(e,t,n){},17:function(e,t,n){},18:function(e,t,n){"use strict";n.r(t);var r=n(1),i=n(0),o=n.n(i),c=n(9),a=n.n(c),u=(n(8),n(4)),s=n(3),l=n(2),d=(n(15),Object(i.forwardRef)((function(e,t){var n=e.row,i=e.col,o=e.isWall,c=e.isStart,a=e.isFinish,u=e.handlePointerDownForNode,s=e.handlePointerEnterForNode,l=e.handleTouchMoveForNode,d=e.handlePointerUpForNode,f=e.displayWeight,h=e.isShowWeight,v=a?"node-finish":c?"node-start":o?"node-wall":"";return Object(r.jsx)("div",{id:"".concat(n,"-").concat(i),onPointerDown:function(){return u(n,i)},onMouseEnter:function(){return s(n,i)},onTouchMove:function(e){return l(e)},onPointerUp:function(){return d()},onDragStart:function(e){e.preventDefault(),e.stopPropagation()},ref:t,className:"node ".concat(v),children:c||a||f===1/0||h&&!o?"":f})})));n(16);function f(e){var t=e.type,n=e.handleFunction,i=e.disable,o=e.title,c=e.disabledTitle,a=e.isVisualising,u=e.isPostVisualise,s=t.replace("-"," ").replace(/(^\w{1})|(\s{1}\w{1})/g,(function(e){return e.toUpperCase()})),l="visualise"===t&&u&&!a?"Revisualise":"visualise"===t&&a?"Visualising":s,d="restore"===t&&i?c:"toggle-weights"!==t||i?"toggle-weights"===t&&i?c:"":o,f=a?"".concat(t," visualising loading"):u?"".concat(t," notify"):t;return Object(r.jsxs)("button",{shape:"round",title:d,className:f,disabled:i,onClick:function(){return n()},children:[a&&Object(r.jsx)("i",{className:"spinner"}),l]})}var h=n(5);function v(e,t,n,r){n.isVisited=!1,n.isWall=!1;var i=b(n,e),o=0,c=[];t.distance=0,t.cumulativeWeight=0,t.isWall=!1;for(var a=function(e){var t,n=[],r=Object(h.a)(e);try{for(r.s();!(t=r.n()).done;){var i,o=t.value,c=Object(h.a)(o);try{for(c.s();!(i=c.n()).done;){var a=i.value;n.push(a)}}catch(u){c.e(u)}finally{c.f()}}}catch(u){r.e(u)}finally{r.f()}return n}(e);;){g(a);var u=a.shift();if(!u.isWall){if(u.distance===1/0)return c;if(u.isVisited=!0,c.push(u),r&&i.length>1){var s,l=Object(h.a)(i);try{for(l.s();!(s=l.n()).done;){var d=s.value,f=d.row,v=d.col;u.row===f&&u.col===v&&u.isVisited&&o++}}catch(p){l.e(p)}finally{l.f()}if(o===i.length)return i.filter((function(e){return e.isVisited=!1})),c}else if(u===n)return c;w(u,e,r)}}}function g(e){e.sort((function(e,t){return e.distance-t.distance}))}function w(e,t,n){var r,i=b(e,t),o=Object(h.a)(i);try{for(o.s();!(r=o.n()).done;){var c=r.value;n?(c.distace===1/0||c.distance>c.displayWeight+e.cumulativeWeight)&&(c.distance=c.displayWeight+e.cumulativeWeight,c.cumulativeWeight=c.distance,c.previousNode=e):(c.distance=e.distance+1,c.previousNode=e)}}catch(a){o.e(a)}finally{o.f()}}function b(e,t){for(var n=[],r=e.row,i=e.col,o=[[0,1],[1,0],[0,-1],[-1,0]],c=t.length,a=t[0].length,u=0;u<o.length;u++){var s=o[u],l=r+s[0],d=i-s[1];l>=0&&l<c&&d>=0&&d<a&&!t[l][d].isWall&&n.push(t[l][d])}return n.filter((function(e){return!e.isVisited}))}n(17);var p,j,m,O,W,y,N,F=function(){var e=Object(i.useRef)(),t=Object(i.useRef)(),n=Object(i.useCallback)((function(){for(var n=[],r=0;r<p;r++){for(var i=[],c=0;c<j;c++)i.push(o(r,c)),r===O&&c===W&&(e.current={row:r,col:c}),r===y&&c===N&&(t.current={row:r,col:c});n.push(i)}return n}),[]),o=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{row:O,col:W},o=arguments.length>5&&void 0!==arguments[5]?arguments[5]:{row:y,col:N};return{row:e,col:t,isWall:n,isStart:e===i.row&&t===i.col,isFinish:e===o.row&&t===o.col,isVisited:!1,distance:1/0,previousNode:null,displayWeight:r,cumulativeWeight:r,isShowCumulativeWeight:!1}},c=Object(i.useState)((function(){return n()})),a=Object(l.a)(c,2),h=a[0],g=a[1],w=Object(i.useState)(!1),b=Object(l.a)(w,2),F=b[0],x=b[1],T=Object(i.useState)(!1),S=Object(l.a)(T,2),M=S[0],P=S[1],R=Object(i.useRef)([]),V=Object(i.useRef)([]),C=Object(i.useRef)(!1),E=Object(i.useRef)(!1),L=Object(i.useRef)([]),k=Object(i.useState)(!1),D=Object(l.a)(k,2),U=D[0],H=D[1],z=Object(i.useState)(!1),A=Object(l.a)(z,2),B=A[0],I=A[1],J=Object(i.useState)(!1),X=Object(l.a)(J,2),Y=X[0],G=X[1],q=Object(i.useRef)([]),K=Object(i.useRef)(!1),Q=Object(i.useRef)(!1);Object(i.useLayoutEffect)((function(){function e(){setTimeout((function(){window.innerHeight>500?10===(p=10*Math.floor(.003*window.innerHeight))&&(p+=5):p=10,j=10*Math.floor(.003*window.innerWidth),m=2,O=Math.floor(.5*p),W=Math.floor(.25*j),y=Math.floor(.5*p),N=Math.floor(.75*j),g(n())}),500)}return window.addEventListener("resize",(function(){window.innerHeight>480&&e()})),e(),function(){return window.removeEventListener("resize",(function(){window.innerHeight>480&&e()}))}}),[n]);var Z=function(n,r){if(U||F){var i=n===e.current.row&&r===e.current.col,o=n===t.current.row&&r===t.current.col,c=!i&&!o;B&&c||Y&&c?ie(h,n,r):F||M||!c||re(h,n,r)}},$=Object(i.useState)(null),_=Object(l.a)($,2),ee=_[0],te=_[1],ne=function(){H(!1),I(!1),G(!1)},re=function(e,t,n){var r=e.slice(),i=r[t][n],o=Object(s.a)(Object(s.a)({},i),{},{displayWeight:i.displayWeight,isShowWeight:!1,isWall:!i.isWall});r[t][n]=o,g(r)},ie=function(n,r,i){var o=n.slice(),c=o[r][i],a=B?e.current:t.current,l=B?"isStart":"isFinish",d=Object(s.a)(Object(s.a)({},c),{},Object(u.a)({},l,!0)),f=o[a.row][a.col],h=null===f.displayWeight&&E.current&&!f.isWall?Math.ceil(10*Math.random()):f.displayWeight,v=Object(s.a)(Object(s.a)({},f),{},Object(u.a)({displayWeight:h},l,!1));o[r][i]=d,o[a.row][a.col]=v,E.current&&(q.current[a.row][a.col]=v),B?e.current={row:r,col:i}:t.current={row:r,col:i},g(o)},oe=function(t){var n=0;if(t[0].isStart)for(var r=function(e){n=e,L.current.push(setTimeout((function(){var n=t[e];V.current["".concat(n.row,"-").concat(n.col)].className="node node-shortest-path"}),50*e))},i=0;i<t.length;i++)r(i);else{var o=e.current.row,c=e.current.col;V.current["".concat(o,"-").concat(c)].className="node node-start"}L.current.push(setTimeout((function(){x(!1),P(!0)}),55*n))},ce=function(){M&&ae(),x(!0);var n=h[e.current.row][e.current.col],r=h[t.current.row][t.current.col];R.current=v(h,n,r,E.current);var i=function(e){for(var t=[],n=e;null!==n;)t.unshift(n),n=n.previousNode;return t}(r);!function(e,t){for(var n=function(n){if(n===e.length)return L.current.push(setTimeout((function(){oe(t)}),5*n)),{v:void 0};L.current.push(setTimeout((function(){var t=e[n],r=V.current["".concat(t.row,"-").concat(t.col)];E.current&&(r.innerText="".concat(t.cumulativeWeight)),r.className="node node-visited"}),5*n))},r=0;r<=e.length;r++){var i=n(r);if("object"===typeof i)return i.v}}(R.current,i)},ae=function(){for(var n=M?e.current:{row:O,col:W},r=M?t.current:{row:y,col:N},i=0;i<R.current.length;i++){var o=R.current[i],c=V.current["".concat(o.row,"-").concat(o.col)];o.row===n.row&&o.col===n.col?(c.innerText="",c.className="node node-start"):o.row===r.row&&o.col===r.col?(c.innerText="",c.className="node node-finish"):((F||M)&&E.current?c.innerText="".concat(o.displayWeight):c.innerText="",c.className="node")}},ue=function(n,r){for(var i=[],c=e.current.row,a=e.current.col,u=t.current.row,s=t.current.col,l=0;l<p;l++){for(var d=[],f=0;f<j;f++){var h=V.current["".concat(l,"-").concat(f)];if(l===c&&f===a)d.push(o(c,a,!1,null,{row:c,col:a},{row:u,col:s})),h.innerText="",h.className="node node-start";else if(l===u&&f===s)d.push(o(u,s,!1,null,{row:c,col:a},{row:u,col:s})),h.innerText="",h.className="node node-finish";else{var v=n[l][f],w=Q.current?q.current[l][f].displayWeight:K.current?null:r?v.displayWeight:Math.random()>.5?Math.ceil(10*Math.random()):1;d.push(o(l,f,v.isWall,w,{row:c,col:a},{row:u,col:s})),h.className=v.isWall?"node node-wall":"node"}}i.push(d)}return g(i),i};return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("div",{className:"galaxy-fold-open-your-device",style:{display:"none"}}),Object(r.jsxs)("div",{className:"App",children:[Object(r.jsxs)("div",{className:"button-container",children:[Object(r.jsx)(f,{type:"reset",handleFunction:function(){return function(){E.current=!1,L.current.forEach((function(e){clearTimeout(e)})),C.current=!0,x(!1),H(!1),P(!1);var e=n();g(e),ae(),q.current=[]}()}}),Object(r.jsx)(f,{type:"restore",handleFunction:function(){return function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];L.current.forEach((function(e){clearTimeout(e)})),x(!1),H(!1),P(!1),ae(),ue(h,e)}(h)},disable:!(F||M),disabledTitle:"Restores state before the visualisation"}),Object(r.jsx)(f,{type:"toggle-weights",handleFunction:function(){return E.current=!E.current,K.current=!K.current,void(K.current?ue(h,!1):(Q.current=!0,ue(h,!1),Q.current=!1))},disable:!q.current.length||F||M}),Object(r.jsx)(f,{type:"generate-weights",handleFunction:function(){return function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];E.current=t,K.current=!1;var r=ue(e,n);E.current&&(q.current=r)}(h,!0)},disable:F||M,title:"Generates random weights to each node. Click to toggle.",disabledTitle:"Can only reassign random weights on restore"}),Object(r.jsx)(f,{type:"visualise",handleFunction:function(){return ce()},disable:F,isVisualising:F,isPostVisualise:M})]}),Object(r.jsx)("div",{className:"grid",onPointerUp:function(){ne()},onMouseLeave:function(){window.addEventListener("mouseup",(function(){return ne()}))},title:M?"Click 'Restore' to adjust start, finish and wall nodes":void 0,style:{margin:"auto",display:"grid",marginTop:"1rem",gridTemplateColumns:"repeat(".concat(j,", ").concat(m,"rem)"),gridTemplateRows:"repeat(".concat(p,", ").concat(m,"rem)"),gap:"1px",width:"".concat(j*m+.06*j,"rem"),touchAction:"none",fontFamily:"Alcubierre",fontSize:"1rem",color:"black",cursor:F?"progress":"pointer"},children:h.map((function(n){return n.map((function(n){var i=n.row,o=n.col,c=n.isWall,a=n.isStart,u=n.isFinish,s=n.isVisited,l=n.displayWeight,f=n.cumulativeWeight,v=n.isShowCumulativeWeight;return Object(r.jsx)(d,{ref:function(e){return V.current["".concat(i,"-").concat(o)]=e},handlePointerDownForNode:function(n,r){return function(n,r){H(!0);var i=n===e.current.row&&r===e.current.col,o=n===t.current.row&&r===t.current.col,c=!F&&!M;i&&c?I(!0):o&&c?G(!0):c&&re(h,n,r)}(n,r)},handlePointerEnterForNode:function(e,t){return Z(e,t)},handleTouchMoveForNode:function(e){return function(e,t){var n=t?e.clientX:e.touches[0].clientX,r=t?e.clientY:e.touches[0].clientY,i=document.elementFromPoint(n,r),o=i.id.split("-"),c=Number(o[0]),a=Number(o[1]);i.classList.contains("node")&&ee!==i&&(te(i),Z(c,a))}(e,!1)},handlePointerUpForNode:function(){return ne()},row:i,col:o,isWall:c,isStart:a,isFinish:u,isVisited:s,displayWeight:l,cumulativeWeight:f,isShowWeight:v},"".concat(i,"-").concat(o))}))}))})]})]})},x=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,19)).then((function(t){var n=t.getCLS,r=t.getFID,i=t.getFCP,o=t.getLCP,c=t.getTTFB;n(e),r(e),i(e),o(e),c(e)}))};a.a.render(Object(r.jsx)(o.a.StrictMode,{children:Object(r.jsx)(F,{})}),document.getElementById("root")),x()},8:function(e,t,n){}},[[18,1,2]]]);
//# sourceMappingURL=main.feb2e444.chunk.js.map