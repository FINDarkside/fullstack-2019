(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{15:function(e,n,t){e.exports=t(43)},21:function(e,n,t){},43:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),c=t(14),u=t.n(c),o=(t(21),t(7)),i=t(3),s=t.n(i),l=t(5),m=t(2),f=t(4),v=t.n(f),p="/api/persons",d=function(){return v.a.get(p)},b=function(e){return v.a.post(p,e)},E=function(e,n){return v.a.put("".concat(p,"/").concat(e),n)},h=function(e){return v.a.delete("".concat(p,"/").concat(e))},k=function(e){var n=e.notifications;return n.length?r.a.createElement("div",{className:"notification-container"},n.map(function(e,n){return r.a.createElement("div",{key:n},r.a.createElement("div",{className:e.success?"notification success":"notification error"},e.message))})):null},j=function(e){var n=e.search,t=e.setSearch;return r.a.createElement("div",null,"Rajaa n\xe4ytett\xe4vi\xe4 ",r.a.createElement("input",{value:n,onChange:function(e){return t(e.target.value)}}))},w=function(e){var n=e.persons,t=e.removePerson;return r.a.createElement("div",null,n.map(function(e){return r.a.createElement("div",{key:e.name},e.name," ",e.number,r.a.createElement("button",{onClick:function(){return t(e)}},"Delete"))}))},O=function(e){var n=e.addPerson,t=Object(a.useState)(""),c=Object(m.a)(t,2),u=c[0],o=c[1],i=Object(a.useState)(""),s=Object(m.a)(i,2),l=s[0],f=s[1];return r.a.createElement("form",{onSubmit:function(e){e.preventDefault(),n({name:u,number:l}),o(""),f("")}},r.a.createElement("div",null,"nimi: ",r.a.createElement("input",{onChange:function(e){return o(e.target.value)},value:u})),r.a.createElement("div",null,"numero: ",r.a.createElement("input",{onChange:function(e){return f(e.target.value)},value:l})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"lis\xe4\xe4")))},x=function(){var e=Object(a.useState)([]),n=Object(m.a)(e,2),t=n[0],c=n[1],u=Object(a.useState)([]),i=Object(m.a)(u,2),f=i[0],v=i[1],p=Object(a.useState)(""),x=Object(m.a)(p,2),g=x[0],P=x[1];Object(a.useEffect)(function(){Object(l.a)(s.a.mark(function e(){var n;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d();case 2:n=e.sent,console.log(n),c(n.data);case 5:case"end":return e.stop()}},e)}))()},[]);var S=t.filter(function(e){return-1!==e.name.toLowerCase().indexOf(g.toLowerCase())}),y=function(){var e=Object(l.a)(s.a.mark(function e(n){var a,r;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!(a=t.find(function(e){return e.name===n.name}))){e.next=15;break}if(!window.confirm("".concat(n.name," on jo luettelossa, korvataanko vanha numero uudella?"))){e.next=14;break}return e.prev=3,e.next=6,E(a.id,n);case 6:r=e.sent,c(t.map(function(e){return e.id===a.id?r.data:e})),L("P\xe4ivitettiin henkil\xf6n ".concat(n.name," numero"),!0),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(3),L("Henkil\xf6 ".concat(n.name," on jo poistettu "),!1);case 14:return e.abrupt("return");case 15:return e.next=17,b(n).then(function(e){c([].concat(Object(o.a)(t),[e.data]))});case 17:L("Lis\xe4ttiin ".concat(n.name),!0);case 18:case"end":return e.stop()}},e,null,[[3,11]])}));return function(n){return e.apply(this,arguments)}}(),C=function(){var e=Object(l.a)(s.a.mark(function e(n){return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!window.confirm("Poistetaanko henkilo ".concat(n.name))){e.next=11;break}return e.prev=1,e.next=4,h(n.id);case 4:c(t.filter(function(e){return e.id!==n.id})),L("Poistettiin ".concat(n.name),!0),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1),L("Henkil\xf6 ".concat(n.name," on jo poistettu "),!1);case 11:case"end":return e.stop()}},e,null,[[1,8]])}));return function(n){return e.apply(this,arguments)}}(),L=function(e,n){var t={message:e,success:n};v([].concat(Object(o.a)(f),[t])),setTimeout(function(){return N(t)},2e3)},N=function(e){v(f.filter(function(n){return n!==e}))};return r.a.createElement("div",null,r.a.createElement("h2",null,"Puhelinluettelo"),r.a.createElement(k,{notifications:f}),r.a.createElement(j,{search:g,setSearch:P}),r.a.createElement("h3",null,"Lis\xe4\xe4 henkil\xf6"),r.a.createElement(O,{addPerson:y}),r.a.createElement("h2",null,"Numerot"),r.a.createElement(w,{persons:S,removePerson:C}))};u.a.render(r.a.createElement(x,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.abd85b13.chunk.js.map