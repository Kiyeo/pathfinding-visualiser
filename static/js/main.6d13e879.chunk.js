(this["webpackJsonpalgorithm-visualiser"]=this["webpackJsonpalgorithm-visualiser"]||[]).push([[0],{12:function(t,n,e){},13:function(t,n,e){},14:function(t,n,e){},15:function(t,n,e){"use strict";e.r(n);var r=e(0),c=e(1),o=e.n(c),i=e(6),a=e.n(i),s=(e(12),e(13),e(5)),u=(e(14),Object(c.forwardRef)((function(t,n){var e=t.row,c=t.col,o=t.isStart,i=t.isFinish?"node-finish":o?"node-start":"";return Object(r.jsx)("div",{id:"node-".concat(e,"-").concat(c),ref:n,className:"node ".concat(i)})}))),f=e(3);function l(t,n,e){var r=[];n.distance=0;for(var c=function(t){var n,e=[],r=Object(f.a)(t);try{for(r.s();!(n=r.n()).done;){var c,o=n.value,i=Object(f.a)(o);try{for(i.s();!(c=i.n()).done;){var a=c.value;e.push(a)}}catch(s){i.e(s)}finally{i.f()}}}catch(s){r.e(s)}finally{r.f()}return e}(t);;){d(c);var o=c.shift();if(!o.isWall){if(o.distance===1/0)return r;if(o.isVisited=!0,r.push(o),o===e)return r;v(o,t)}}}function d(t){t.sort((function(t,n){return t.distance-n.distance}))}function v(t,n){var e,r=function(t,n){var e=[],r=t.col,c=t.row;c>0&&e.push(n[c-1][r]);c<n.length-1&&e.push(n[c+1][r]);r>0&&e.push(n[c][r-1]);r<n[0].length-1&&e.push(n[c][r+1]);return e.filter((function(t){return!t.isVisited}))}(t,n),c=Object(f.a)(r);try{for(c.s();!(e=c.n()).done;){var o=e.value;o.distance=t.distance+1,o.previousNode=t}}catch(i){c.e(i)}finally{c.f()}}function h(){var t=Object(c.useState)([]),n=Object(s.a)(t,2),e=n[0],o=n[1],i=Object(c.useState)(!1),a=Object(s.a)(i,2),f=a[0],d=a[1],v=Object(c.useRef)([]),h=Object(c.useRef)([]);Object(c.useEffect)((function(){for(var t=[],n=0;n<20;n++){for(var e=[],r=0;r<50;r++)e.push(p(n,r));t.push(e)}o(t)}),[]);var j=function(t){for(var n=function(n){setTimeout((function(){var e=t[n];h.current["".concat(e.row,"-").concat(e.col)].className="node node-shortest-path"}),50*n)},e=0;e<t.length;e++)n(e);setTimeout((function(){return d(!1)}),1250)},b=function(){O(),d(!0);var t=e[10][15],n=e[5][35];v.current=l(e,t,n);var r=function(t){for(var n=[],e=t;null!==e;)n.unshift(e),e=e.previousNode;return n}(n);!function(t,n){for(var e=function(e){if(e===t.length)return setTimeout((function(){j(n)}),5*e),{v:void 0};setTimeout((function(){var n=t[e];h.current["".concat(n.row,"-").concat(n.col)].className="node node-visited"}),5*e)},r=0;r<=t.length;r++){var c=e(r);if("object"===typeof c)return c.v}}(v.current,r)},p=function(t,n){return{row:t,col:n,isStart:10===t&&15===n,isFinish:5===t&&35===n,isVisited:!1,distance:1/0,previousNode:null}},O=function(){for(var t=0;t<v.current.length;t++){var n=v.current[t];10===n.row&&15===n.col?h.current["".concat(n.row,"-").concat(n.col)].className="node node-start":5===n.row&&35===n.col?h.current["".concat(n.row,"-").concat(n.col)].className="node node-finish":h.current["".concat(n.row,"-").concat(n.col)].className="node"}};return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("button",{disabled:f,onClick:function(){return O()},children:"Reset"}),Object(r.jsx)("button",{disabled:f,onClick:function(){return b()},children:"Visualise Dijkstra's Algorithm"}),Object(r.jsx)("div",{className:"grid",children:e.map((function(t,n){return Object(r.jsx)("div",{children:t.map((function(t,n){var e=t.row,c=t.col,o=t.isStart,i=t.isFinish;return Object(r.jsx)(u,{ref:function(t){return h.current["".concat(e,"-").concat(c)]=t},row:e,col:c,isStart:o,isFinish:i},n)}))},n)}))})]})}var j=function(){return Object(r.jsx)("div",{className:"App",children:Object(r.jsx)(h,{})})},b=function(t){t&&t instanceof Function&&e.e(3).then(e.bind(null,16)).then((function(n){var e=n.getCLS,r=n.getFID,c=n.getFCP,o=n.getLCP,i=n.getTTFB;e(t),r(t),c(t),o(t),i(t)}))};a.a.render(Object(r.jsx)(o.a.StrictMode,{children:Object(r.jsx)(j,{})}),document.getElementById("root")),b()}},[[15,1,2]]]);
//# sourceMappingURL=main.6d13e879.chunk.js.map