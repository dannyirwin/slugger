(this.webpackJsonpslugger=this.webpackJsonpslugger||[]).push([[0],{10:function(n,t,e){},12:function(n,t,e){"use strict";e.r(t);var i=e(1),o=e.n(i),s=e(4),r=e.n(s),a=(e(9),e(10),e(0));function c(){return Object(a.jsx)("header",{children:Object(a.jsx)("h1",{children:"Slugger!"})})}function l(){return Object(a.jsx)("section",{className:"side",children:"This project was built as a daily warm up and tutorial series"})}var h=e(3),u={numOfCells:16,responsiveSize:!0,gameSize:6e4,backgroundColor:"#c3faa2",fps:5};function d(){var n=Object(i.useRef)();return Object(i.useEffect)((function(){!function(n){var t=n.getContext("2d"),e=u.numOfCells,i=u.responsiveSize?r():u.gameSize,o=i/e,s=u.backgroundColor;function r(){var n=window.innerWidth<window.innerHeight?window.innerWidth:window.innerHeight;return console.log(window.innerWidth,window.innerHeight,n),.9*n}function a(){n.height=i,n.width=i}function c(){t.fillStyle=s,t.fillRect(0,0,i,i),t.fillStyle="rgba(255,255,255, 0.2)";for(var n=0;n<e;n+=2)for(var r=0;r<e;r+=2)t.fillRect(n*o,r*o,o,o),t.fillRect((n+1)*o,(r+1)*o,o,o)}function l(n){return[Math.floor(n[0]*o+.5*o),Math.floor(n[1]*o+.5*o)]}function d(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"salmon",i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Math.floor(e/2),s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:Math.floor(e/2);return{color:n,direction:"north",bellyPositions:[],isDigesting:!1,segmentPositions:[[i,s],[i,s+1],[i,s+2]],update:function(){this.checkCollision(),this.moveSlug(),this.handleDigestion(),this.drawSlug(),this.drawBelly()},drawSlug:function(){t.strokeStyle=this.color,t.lineWidth=.8*o,t.lineCap="round",t.lineJoin="round",t.beginPath(),this.segmentPositions.forEach((function(n,e){var i=l(n);0===e?t.moveTo(i[0],i[1]):t.lineTo(i[0],i[1])})),t.stroke()},drawBelly:function(){this.isDigesting&&(t.fillStyle=this.color,this.bellyPositions.forEach((function(n){n=l(n),t.beginPath(),t.arc(n[0],n[1],.5*o,0,2*Math.PI),t.fill()})))},moveSlug:function(){this.segmentPositions.pop(),this.segmentPositions.unshift(this.findNextPosition())},findNextPosition:function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.direction,t=this.segmentPositions[0],e=[];switch(n){case"north":e[0]=t[0],e[1]=t[1]-1;break;case"west":e[0]=t[0]-1,e[1]=t[1];break;case"south":e[0]=t[0],e[1]=t[1]+1;break;case"east":e[0]=t[0]+1,e[1]=t[1];break;default:console.error("ERROR: expected 'north' 'south' 'east' or 'west' but got "+n)}return e},checkCollision:function(){var n=this.findNextPosition(),t=Object(h.a)(this.segmentPositions);t.pop();var i=t.some((function(t){return t[0]===n[0]&&t[1]===n[1]})),o=n[0]<0||n[0]>e-1||n[1]<0||n[1]>e-1,s=n[0]===x.position[0]&&n[1]===x.position[1];i||o?(w=!0,g()):s&&this.handleEatSnack()},handleEatSnack:function(){this.bellyPositions.push(x.position),this.isDigesting=!0,x.handleEaten()},handleMovementInput:function(n){var t=this.findNextPosition(n);!this.segmentPositions.some((function(n){return n[0]===t[0]&&n[1]===t[1]}))&&(this.direction=n)},handleDigestion:function(){var n=this;this.isDigesting&&Object(h.a)(this.bellyPositions).forEach((function(t){var e=n.segmentPositions[n.segmentPositions.length-1];t[0]===e[0]&&t[1]===e[1]&&(n.segmentPositions.push(t),n.bellyPositions.shift(),0===n.bellyPositions.length&&(n.isDigesting=!1))}))}}}function f(){var n={color:arguments.length>0&&void 0!==arguments[0]?arguments[0]:"#66b8ff",position:[0,0],randomizePosition:function(){var n=[k.findNextPosition()].concat(k.segmentPositions),t=Math.floor(Math.random()*e),i=Math.floor(Math.random()*e);n.length-2===Math.pow(e,2)?g("You WIN!"):n.some((function(n){return n[0]===t&&n[1]===i}))?this.randomizePosition():this.position=[t,i]},drawSnack:function(){var n=l(this.position);t.fillStyle=this.color,t.beginPath(),t.arc(n[0],n[1],.3*o,0,2*Math.PI),t.fill()},handleEaten:function(){x=f()}};return n.randomizePosition(),n}function g(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Game Over";w=!0,k=d(),x=f(),c(),alert(n)}var m,b,v,w=!0,p=1e3/u.fps;function j(n){b=window.performance.now(),requestAnimationFrame(P)}function P(){m=window.performance.now(),(v=m-b)>p&&(b=m-v%p,c(),k.update(),x.drawSnack()),!w&&requestAnimationFrame(P)}function O(){a(),c(),j()}var k=d(),x=f();window.addEventListener("load",O),document.addEventListener("keydown",(function(n){switch(n.key.toLocaleLowerCase()){case" ":w&&P();break;case"p":!(w=!w)&&requestAnimationFrame(P);break;case"w":case"arrowup":k.handleMovementInput("north");break;case"s":case"arrowdown":k.handleMovementInput("south");break;case"a":case"arrowleft":k.handleMovementInput("west");break;case"d":case"arrowright":k.handleMovementInput("east")}}))}(n.current)})),Object(a.jsx)("canvas",{ref:n})}function f(){navigator.userAgent.match(/Android/i)||navigator.userAgent.match(/webOS/i)||navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)||navigator.userAgent.match(/iPod/i)||navigator.userAgent.match(/BlackBerry/i)||navigator.userAgent.match(/Windows Phone/i);return Object(a.jsxs)("section",{className:"side",children:[Object(a.jsx)("h2",{children:"How To Play"}),"Control the slug and eat as many snacks as possible! Careful not to run into the edge or yourself as you grow.",Object(a.jsxs)("ul",{children:[Object(a.jsx)("li",{children:"Use WSAD or your arrow keys to control the slug"}),Object(a.jsx)("li",{children:'Begin the game by pressing "p"'})]})]})}function g(){return Object(a.jsxs)("main",{children:[Object(a.jsx)(f,{}),Object(a.jsx)(d,{}),Object(a.jsx)(l,{})]})}var m=function(){return Object(a.jsxs)("div",{className:"App",children:[Object(a.jsx)(c,{}),Object(a.jsx)(g,{})]})},b=function(n){n&&n instanceof Function&&e.e(3).then(e.bind(null,13)).then((function(t){var e=t.getCLS,i=t.getFID,o=t.getFCP,s=t.getLCP,r=t.getTTFB;e(n),i(n),o(n),s(n),r(n)}))};r.a.render(Object(a.jsx)(o.a.StrictMode,{children:Object(a.jsx)(m,{})}),document.getElementById("root")),b()},9:function(n,t,e){}},[[12,1,2]]]);
//# sourceMappingURL=main.ee47065b.chunk.js.map