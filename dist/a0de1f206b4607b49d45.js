(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{414:function(t,n,s){"use strict";s.d(n,"b",function(){return r}),s.d(n,"a",function(){return o});var e=s(355),r=function(t){var n=new FileReader;return new Promise(function(s){try{n.readAsDataURL(t),n.onloadend=function(){s(n.result)}}catch(t){throw new Error("Ошибка при чтении файла")}})},o=function(t){var n=e.a.defaults.baseURL;return"".concat(n,"/").concat(t)}},428:function(t,n,s){},456:function(t,n,s){"use strict";var e=s(428);s.n(e).a},481:function(t,n,s){"use strict";s.r(n);var e=function(){var t=this,n=t.$createElement,s=t._self._c||n;return s("div",{staticClass:"works-new__item",class:{"works-new__active":t.isActive}},[s("div",{staticClass:"works-new__preview"},[s("img",{attrs:{src:t.imageSrc}}),s("div",{staticClass:"works-new__tags"},[s("tags",{attrs:{tags:t.tags}})],1)]),s("div",{staticClass:"works-new__body"},[s("div",{staticClass:"works-new__label"},[s("div",{staticClass:"works-new__title"},[t._v(t._s(t.work.title))]),s("div",{staticClass:"works-new__desc"},[t._v(t._s(t.work.description))])]),s("a",{staticClass:"works-new__link",attrs:{href:"//"+t.work.link,target:"_blank"}},[t._v(t._s(t.work.link))]),s("div",{staticClass:"works-new__controls"},[s("button",{staticClass:"works-new__control",on:{click:function(n){return t.$emit("edit")}}},[s("div",{staticClass:"works-new__control-text"},[t._v("Править")]),s("icon",{staticClass:"works-new__icon works-icon__accept",attrs:{name:"Pencil"}})],1),s("button",{staticClass:"works-new__control",on:{click:function(n){return t.$emit("delete")}}},[s("div",{staticClass:"works-new__control-text"},[t._v("Удалить")]),s("icon",{staticClass:"works-new__icon works-icon__delete",attrs:{name:"Cross"}})],1)])])])};e._withStripped=!0;var r=s(414),o={components:{Icon:function(){return s.e(0).then(s.bind(null,95))},Tags:function(){return s.e(10).then(s.bind(null,489))}},props:{work:{type:Object,default:function(){return{}}},isActive:{type:Boolean,default:!1}},computed:{imageSrc:function(){return Object(r.a)(this.work.photo)},tags:function(){return this.work.techs.split(",")}}},i=(s(456),s(31)),a=Object(i.a)(o,e,[],!1,null,"702051f4",null);a.options.__file="src/admin/components/WorkItem.vue";n.default=a.exports}}]);