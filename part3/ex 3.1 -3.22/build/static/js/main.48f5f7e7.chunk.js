(this.webpackJsonppart1=this.webpackJsonppart1||[]).push([[0],{37:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var c=t(14),r=t.n(c),o=t(3),a=t(2),u=t(4),i=t.n(u),s="/api/persons",d=function(){return i.a.get(s).then((function(e){return e.data}))},l=function(e){return i.a.post(s,e).then((function(e){return e.data}))},f=function(e,n){return i.a.put("".concat(s,"/").concat(e),n).then((function(e){return e.data}))},j=function(e){return i.a.delete("".concat(s,"/").concat(e)).then((function(e){return e.data}))},h=(t(37),t(0)),b=function(e){var n=e.handleClick,t=e.text;return Object(h.jsx)("button",{onClick:n,children:t})},m=function(e){var n=e.newText,t=e.setTextChange;return Object(h.jsx)("input",{value:n,onChange:function(e){return t(e.target.value)}})},O=function(e){var n=e.message;return null===n?null:Object(h.jsx)("div",{className:"confirmation",children:n})},x=function(){var e=Object(a.useState)([]),n=Object(o.a)(e,2),t=n[0],c=n[1],r=Object(a.useState)(""),u=Object(o.a)(r,2),i=u[0],s=u[1],x=Object(a.useState)(""),p=Object(o.a)(x,2),v=p[0],w=p[1],g=Object(a.useState)(""),T=Object(o.a)(g,2),C=T[0],k=T[1],S=Object(a.useState)(null),y=Object(o.a)(S,2),D=y[0],E=y[1];Object(a.useEffect)((function(){return d().then((function(e){return c(e)}))}),[]);var I=t.filter((function(e){return-1!==e.name.toLowerCase().indexOf(C.toLowerCase())})),J=I.length>0?I:t;return Object(h.jsxs)("div",{children:[Object(h.jsx)("h2",{children:"phonebook"}),Object(h.jsx)(O,{message:D}),Object(h.jsxs)("div",{children:["filter shown with ",Object(h.jsx)(m,{newText:C,setTextChange:k})]}),Object(h.jsx)("h2",{children:"add a new"}),Object(h.jsxs)("form",{onSubmit:function(e){e.preventDefault();var n={name:i,number:v},r=t.filter((function(e){return e.name===i})),o=r[0];r.length>0?o.number!==v?window.confirm("".concat(i," is already added to phonebook, replace the old number with a new one? "))?f(o.id,n).then((function(e){c(t.map((function(n){return n.id!==o.id?n:e}))),E("Changed ".concat(i,"'s number to ").concat(v)),setTimeout((function(){E(null)}),5e3),s(""),w("")})).catch((function(e){E(e.response.data.error),setTimeout((function(){E(null)}),5e3)})):console.log("Choosed no"):alert("".concat(i," is already added to phonebook")):l(n).then((function(e){c(t.concat(e)),E("Added ".concat(i)),setTimeout((function(){E(null)}),5e3),s(""),w("")})).catch((function(e){E(e.response.data.error),setTimeout((function(){E(null)}),5e3)}))},children:[Object(h.jsxs)("div",{children:["name: ",Object(h.jsx)(m,{newText:i,setTextChange:s})]}),Object(h.jsxs)("div",{children:["number: ",Object(h.jsx)(m,{newText:v,setTextChange:w})]}),Object(h.jsx)("div",{children:Object(h.jsx)("button",{type:"submit",children:"add"})})]}),Object(h.jsx)("h2",{children:"Numbers"}),Object(h.jsx)("ul",{children:J.map((function(e){return Object(h.jsxs)("li",{children:[e.name," ",e.number,Object(h.jsx)(b,{text:"delete",handleClick:function(){return function(e){var n=t.find((function(n){return n.id===e}));window.confirm("Delete ".concat(n.name," ?"))&&j(e).then((function(){return c(t.filter((function(n){return n.id!==e})))})).catch((function(e){E("Information of ".concat(n.name," has already been removed from server")),setTimeout((function(){E(null)}),5e3)}))}(e.id)}})]},e.name)}))})]})};r.a.render(Object(h.jsx)(x,{}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.48f5f7e7.chunk.js.map