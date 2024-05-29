(function(E,e){typeof exports=="object"&&typeof module!="undefined"?e(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],e):(E=typeof globalThis!="undefined"?globalThis:E||self,e(E.MyComponentLib={},E.Vue))})(this,function(E,e){"use strict";const K={noSearch:"No matches for",searchText:"Search",title:"Select",selected:"Selected:",all:"all",ok:"Ok",cancel:"Cancel",selectAll:"Select all",resetAll:"Reset all",empty:"Empty"},x="SimpleSel",i=(a,t=!1,l=x)=>`${l}${t?"--":"__"}${a}`,R=a=>JSON.parse(JSON.stringify(a)),T=a=>{var t;return(t=a[0])!=null&&t.isOptgroupSelect?[].concat(...a.map(l=>l.items.map(n=>n))):R(a)},A=(a,t,l)=>{if(!a&&!t)return!0;if(!a&&t||a&&!t||!a||!t)return!1;const n=Array.isArray(a),o=Array.isArray(t);return!n&&o||n&&!o?!1:n&&o?H(a,t,l):!n&&!o?N(a,t):!1};function H(a,t,l){const n=a.slice().sort((c,d)=>c[l].localeCompare(d[l])),o=t.slice().sort((c,d)=>c[l].localeCompare(d[l]));if(n.length!==o.length)return!1;for(let c=0;c<n.length;c++)if(n[c].id!==o[c].id)return!1;return!0}const N=(a,t)=>{const l=Object.keys(a),n=Object.keys(t);if(l.length!==n.length)return!1;for(const o of l){const c=a[o],d=t[o],u=D(c)&&D(d);if(u&&!N(c,d)||!u&&c!==d)return!1}return!0};function D(a){return a!=null&&typeof a=="object"}const I=Symbol(),L=Symbol(),U=["type","tabindex","placeholder"],j=e.defineComponent({__name:"Search",props:{searchTypeInput:{default:"search"},isDropdown:{type:Boolean,default:!1}},emits:[""],setup(a){const t=e.ref(""),l=e.inject(I),n=e.inject(L),o=e.ref(null),c=i("search"),d=e.computed(()=>n!=null&&n.isLocalOpen.value?0:-1);e.watch(t,f=>{n==null||n.setSearchText(f)}),e.watch(()=>n==null?void 0:n.isLocalOpen.value,f=>{f||(t.value="")}),e.watch(()=>n==null?void 0:n.isLocalOpen.value,f=>{f&&setTimeout(()=>{var k;(k=o.value)==null||k.focus()},20)});const u=e.computed(()=>{var k;let f=((k=l==null?void 0:l.locale)==null?void 0:k.searchText)||"";if((l==null?void 0:l.isCloneTitleToSearch)&&(n==null?void 0:n.localSelected.value)){if(Array.isArray(n.localSelected.value)&&!n.localSelected.value.length)return f;f=n.titleText.value.fullString}return f});return(f,k)=>e.withDirectives((e.openBlock(),e.createElementBlock("input",{ref_key:"$input",ref:o,"onUpdate:modelValue":k[0]||(k[0]=y=>t.value=y),class:e.normalizeClass([e.unref(c),{[e.unref(i)("top",!0,e.unref(c))]:!f.isDropdown,[e.unref(i)("dropdown",!0,e.unref(c))]:f.isDropdown}]),type:f.searchTypeInput,tabindex:d.value,placeholder:u.value,autocomplete:"off","aria-autocomplete":"none",inputmode:"none"},null,10,U)),[[e.vModelDynamic,t.value]])}}),q=["tabindex","onKeydown"],J=e.defineComponent({__name:"Top",emits:["setIsLocalOpen"],setup(a){const t=e.inject(I),l=e.inject(L),n=e.computed(()=>t!=null&&t.disabled||l!=null&&l.isLocalOpen.value?-1:0),o=()=>{l==null||l.setIsLocalOpen()},c=e.computed(()=>{const d={fullString:(t==null?void 0:t.titleMain)||(t==null?void 0:t.locale.title)||"",result:(t==null?void 0:t.titleMain)||(t==null?void 0:t.locale.title)||""};if(!(l!=null&&l.localSelected.value))return d;if(Array.isArray(l.localSelected.value)){const u=l.localSelected.value.length;if(u&&!(t!=null&&t.isOnlyPlaceholder)){const f=l.localSelected.value.map(k=>k[t.keyTitle]);d.fullString=f.join(t==null?void 0:t.sepChars),(t==null?void 0:t.countShowSelected)&&t.countShowSelected<u?d.result=`${t==null?void 0:t.locale.selected} ${u}`:d.result=f.join(t==null?void 0:t.sepChars)}t.options.length&&u===t.options.length&&(d.result+=` <span >(${t==null?void 0:t.locale.all})<span>`)}else d.fullString=l.localSelected.value[t.keyTitle],d.result=l.localSelected.value[t.keyTitle];return l.setTitleText(d),d});return(d,u)=>{var f,k,y,S,m,_,r,C,s;return e.openBlock(),e.createElementBlock("div",{class:e.normalizeClass([e.unref(i)("top")])},[(f=e.unref(t))!=null&&f.isRemoveTop?e.createCommentVNode("",!0):(e.openBlock(),e.createElementBlock("div",{key:0,class:e.normalizeClass([e.unref(i)("top_body")]),tabindex:n.value,onClick:u[0]||(u[0]=h=>d.$emit("setIsLocalOpen")),onKeydown:e.withKeys(e.withModifiers(o,["stop","prevent"]),["enter"])},[(e.openBlock(),e.createBlock(e.resolveDynamicComponent(e.unref(l).componentTitle),{locale:e.unref(t).locale,"local-selected":e.unref(l).localSelected.value,"title-res":c.value,"count-show-selected":(k=e.unref(t))==null?void 0:k.countShowSelected,"is-only-placeholder":(y=e.unref(t))==null?void 0:y.isOnlyPlaceholder,"sep-chars":e.unref(t).sepChars,options:e.unref(t).options},null,8,["locale","local-selected","title-res","count-show-selected","is-only-placeholder","sep-chars","options"])),!((S=e.unref(t))!=null&&S.isLoading)&&!((m=e.unref(t))!=null&&m.isAlwaysOpen)?(e.openBlock(),e.createBlock(e.resolveDynamicComponent(e.unref(l).componentArrowIcon),{key:0})):e.createCommentVNode("",!0),(_=e.unref(t))!=null&&_.isLoading?(e.openBlock(),e.createBlock(e.resolveDynamicComponent(e.unref(l).componentLoading),{key:1})):e.createCommentVNode("",!0)],42,q)),((r=e.unref(t))==null?void 0:r.isSearch)&&!e.unref(t).isSearchInDropdown&&!((C=e.unref(t))!=null&&C.isFloat)?(e.openBlock(),e.createBlock(j,{key:1,"search-type-input":(s=e.unref(t))==null?void 0:s.searchTypeInput,"is-dropdown":!1},null,8,["search-type-input"])):e.createCommentVNode("",!0)],2)}}}),W={class:"SimpleSel__group_title"},Z={class:"SimpleSel__group"},G=["tabindex","onKeyup","onClick"],Q=["tabindex","onKeyup","onClick"],X=e.defineComponent({__name:"BodyList",setup(a){const t=e.inject(I),l=e.inject(L),n=e.ref(T(t.options)),o=e.ref(null),c=e.ref([]),d=m=>{const _=n.value.length;if(m.key==="ArrowUp"){if(o.value===null){o.value=_-1;return}o.value=o.value-1>=0?o.value-1:_-1;return}if(m.key==="ArrowDown"){if(o.value===null){o.value=0;return}o.value=o.value+1<_?o.value+1:0;return}},u=()=>{o.value===null&&(o.value=0)};e.watch(o,m=>{if(!m&&m!==0)return;const _=c.value[m];_&&_.focus()});const f=(m,_)=>{t!=null&&t.multiple||l==null||l.setIsLocalOpen(!1),l.setToggleOption(_)},k=e.computed(()=>{var r,C;const m=((r=l==null?void 0:l.searchText)==null?void 0:r.value.trim())||"";if(!m)return t.options;const _=s=>{var O;let h=!1;return(O=t.searchFieldsKeys)==null||O.forEach(g=>{g in s&&s[g].includes(m)&&(h=!0)}),h};return(C=t==null?void 0:t.options[0])!=null&&C.isOptgroupSelect?t.options.map(s=>{const h=s.items.filter(_);return{...s,items:h}}):t.options.filter(_)}),y=(m,_,r)=>{_.disabled||r&&r.disabled||f(m,_)},S=i("group_items");return(m,_)=>(e.openBlock(),e.createElementBlock("ul",{class:e.normalizeClass([e.unref(i)("list")]),tabindex:0,onKeydown:d,onKeyup:e.withKeys(u,["enter"])},[k.value.length?(e.openBlock(!0),e.createElementBlock(e.Fragment,{key:1},e.renderList(k.value,(r,C)=>{var s;return e.openBlock(),e.createElementBlock(e.Fragment,{key:C},[r.isOptgroupSelect?(e.openBlock(),e.createElementBlock("li",{key:0,class:e.normalizeClass([e.unref(S)])},[e.createElementVNode("div",W,e.toDisplayString(r.label),1),e.createElementVNode("ul",Z,[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(r.items,(h,O)=>{var g;return e.openBlock(),e.createElementBlock("li",{key:h.valueOf()+"_"+O,ref_for:!0,ref_key:"itemsOption",ref:c,tabindex:C===o.value?0:-1,class:e.normalizeClass([["SimpleSel__list_item"],{"SimpleSel__list_item--disabled":h.disabled||r.disabled,"SimpleSel__list_item--checked":(g=e.unref(l))==null?void 0:g.getSelected(h)}]),onKeyup:e.withKeys(e.withModifiers(B=>y(B,h,r),["prevent","stop"]),["enter"]),onClick:e.withModifiers(B=>y(B,h,r),["prevent"])},[e.unref(t)?(e.openBlock(),e.createBlock(e.resolveDynamicComponent(e.unref(l).componentItemListItem),{key:0,item:h},null,8,["item"])):e.createCommentVNode("",!0)],42,G)}),128))])],2)):(e.openBlock(),e.createElementBlock("li",{key:r.valueOf()+"_"+r,ref_for:!0,ref_key:"itemsOption",ref:c,tabindex:C===o.value?0:-1,class:e.normalizeClass([["SimpleSel__list_item"],{"SimpleSel__list_item--checked":(s=e.unref(l))==null?void 0:s.getSelected(r),"SimpleSel__list_item--disabled":r.disabled}]),onKeyup:e.withKeys(e.withModifiers(h=>y(h,r),["prevent","stop"]),["enter"]),onClick:e.withModifiers(h=>y(h,r),["prevent"])},[e.unref(t)?(e.openBlock(),e.createBlock(e.resolveDynamicComponent(e.unref(l).componentItemListItem),{key:0,item:r},null,8,["item"])):e.createCommentVNode("",!0)],42,Q))],64)}),128)):(e.openBlock(),e.createElementBlock("li",{key:0,class:e.normalizeClass([e.unref(S)])},[(e.openBlock(),e.createBlock(e.resolveDynamicComponent(e.unref(l).componentItemListItemEmpty)))],2))],34))}}),Y=e.defineComponent({__name:"Body",setup(a){const t=e.inject(I),l=e.inject(L),n=e.ref(null),o=e.ref([]),c=i("body_open",!0),d=r=>{var s;const C=r.target;!((s=l==null?void 0:l.$wrapper)!=null&&s.value)||!l.$wrapper.value.contains(C)&&C!==l.$wrapper.value&&(l==null||l.setIsLocalOpen(!1),(t==null?void 0:t.isConfirmInMulti)&&t.isConfirmInMultiOkClickOutside?l.updateOutsideModels("clickOutside"):l.resetSelectedByDontConfirm())},u=r=>{r.key==="Escape"&&(l==null||l.setIsLocalOpen(!1),l==null||l.resetSelectedByDontConfirm())},f=r=>{var s;const C=r.relatedTarget;C&&!((s=l==null?void 0:l.$wrapper.value)!=null&&s.contains(C))&&(l==null||l.setIsLocalOpen(!1))};e.watch(()=>l==null?void 0:l.isLocalOpen.value,r=>{var C;t!=null&&t.isFloat&&((C=document==null?void 0:document.body)==null||C.classList.toggle(c,r)),typeof window!="undefined"&&(r?(document==null||document.addEventListener("click",d),document==null||document.addEventListener("keyup",u),document==null||document.addEventListener("focusout",f)):(document==null||document.removeEventListener("click",d),document==null||document.removeEventListener("keyup",u),document==null||document.removeEventListener("focusout",f)))},{immediate:!0}),e.watch(n,r=>{if(!r&&r!==0)return;const C=o.value[r];C&&C.focus()});const k=()=>{l==null||l.setIsLocalOpen(!1),l.updateOutsideModels("ok")},y=()=>{l==null||l.setIsLocalOpen(!1),l==null||l.resetSelectedByDontConfirm()},S=()=>{l==null||l.selectAll(!!(t!=null&&t.selectAllAfterClose))},m=()=>{l==null||l.resetAll(!!(t!=null&&t.resetAllAfterClose))},_=i("body");return(r,C)=>{var s,h,O,g,B,$,M;return e.openBlock(),e.createElementBlock("div",{class:e.normalizeClass([e.unref(_),{[e.unref(i)("toggle_open",!0,e.unref(_))]:!((s=e.unref(t))!=null&&s.isAlwaysOpen),[e.unref(i)("body-always_open",!0)]:(h=e.unref(t))==null?void 0:h.isAlwaysOpen}])},[((O=e.unref(t))==null?void 0:O.isSearch)&&e.unref(t).isSearchInDropdown?(e.openBlock(),e.createBlock(j,{key:0,"search-type-input":(g=e.unref(t))==null?void 0:g.searchTypeInput,"is-dropdown":!0},null,8,["search-type-input"])):e.createCommentVNode("",!0),((B=e.unref(t))==null?void 0:B.selectAll)||(($=e.unref(t))==null?void 0:$.resetAll)?(e.openBlock(),e.createBlock(e.resolveDynamicComponent(e.unref(l).componentSelectAllControls),{key:1,select:S,reset:m,locale:e.unref(t).locale},null,8,["locale"])):e.createCommentVNode("",!0),e.createVNode(X),(M=e.unref(t))!=null&&M.isConfirmInMulti?(e.openBlock(),e.createBlock(e.resolveDynamicComponent(e.unref(l).componentBottomControl),{key:2,confirm:k,cancellation:y,locale:e.unref(t).locale},null,8,["locale"])):e.createCommentVNode("",!0)],2)}}}),P=e.defineComponent({__name:"BodyListItem",props:{item:{}},setup(a){const t=i("list_item_body"),l=e.inject(I);return(n,o)=>{var c,d;return e.openBlock(),e.createElementBlock("div",{class:e.normalizeClass([e.unref(t)])},[((c=e.unref(l))==null?void 0:c.multiple)||((d=e.unref(l))==null?void 0:d.isSimpleShowCheckbox)?(e.openBlock(),e.createElementBlock("span",{key:0,class:e.normalizeClass([e.unref(i)("list_item_icon")])},null,2)):e.createCommentVNode("",!0),e.createTextVNode(" "+e.toDisplayString(n.item[e.unref(l).keyTitle]||""),1)],2)}}}),v=["title","innerHTML"],ee=e.defineComponent({__name:"TopTitle",props:{locale:{},localSelected:{},titleRes:{},countShowSelected:{},isOnlyPlaceholder:{type:Boolean},sepChars:{},options:{}},setup(a){const t=a,l=e.computed(()=>{const n={placeholder:!1,fill:!1,full:!1},o=T(t.options);return!t.localSelected||Array.isArray(t.localSelected)&&!t.localSelected.length?(n.placeholder=!0,n):(n.fill=!0,Array.isArray(t.localSelected)&&o.length===t.localSelected.length&&(n.full=!0),n)});return(n,o)=>(e.openBlock(),e.createElementBlock("div",{title:n.titleRes.fullString,class:e.normalizeClass([e.unref(i)("title"),{[e.unref(i)("title--placeholder")]:l.value.placeholder,[e.unref(i)("title--fill")]:l.value.fill,[e.unref(i)("title--full")]:l.value.full}]),innerHTML:n.titleRes.result||""},null,10,v))}}),te=e.defineComponent({__name:"BottomControls",props:{confirm:{type:Function},cancellation:{type:Function},locale:{}},setup(a){const t=e.inject(L),l=i("bottom_controls"),n=i("bottom_control");return(o,c)=>(e.openBlock(),e.createElementBlock("div",{class:e.normalizeClass([e.unref(l)])},[(e.openBlock(),e.createBlock(e.resolveDynamicComponent(e.unref(t).componentBottomControlOk),{"class-init":e.unref(n),callback:o.confirm,locale:o.locale},null,8,["class-init","callback","locale"])),(e.openBlock(),e.createBlock(e.resolveDynamicComponent(e.unref(t).componentBottomControlNo),{"class-init":e.unref(n),callback:o.cancellation,locale:o.locale},null,8,["class-init","callback","locale"]))],2))}}),le=e.defineComponent({__name:"BottomControlsOk",props:{callback:{type:Function},classInit:{},locale:{}},setup(a){return(t,l)=>{var n;return e.openBlock(),e.createElementBlock("button",{class:e.normalizeClass([t.classInit,e.unref(i)("ok",!0,t.classInit)]),onClick:l[0]||(l[0]=(...o)=>t.callback&&t.callback(...o))},e.toDisplayString((n=t.locale)==null?void 0:n.ok),3)}}}),ne=e.defineComponent({__name:"BottomControlsNo",props:{callback:{type:Function},classInit:{},locale:{}},setup(a){return(t,l)=>{var n;return e.openBlock(),e.createElementBlock("button",{class:e.normalizeClass([t.classInit,e.unref(i)("no",!0,t.classInit)]),onClick:l[0]||(l[0]=(...o)=>t.callback&&t.callback(...o))},e.toDisplayString((n=t.locale)==null?void 0:n.cancel),3)}}}),oe=e.defineComponent({__name:"SelectAllControls",props:{select:{type:Function},reset:{type:Function},locale:{}},setup(a){const t=e.inject(I),l=e.inject(L),n=i("controls"),o=i("control");return(c,d)=>{var u,f;return e.openBlock(),e.createElementBlock("div",{class:e.normalizeClass([e.unref(n)])},[(u=e.unref(t))!=null&&u.selectAll?(e.openBlock(),e.createBlock(e.resolveDynamicComponent(e.unref(l).componentSelectAllControlsSelect),{key:0,locale:c.locale,"class-init":e.unref(o),callback:c.select,"selected-count":e.unref(l).selectedCount.value},null,8,["locale","class-init","callback","selected-count"])):e.createCommentVNode("",!0),(f=e.unref(t))!=null&&f.resetAll?(e.openBlock(),e.createBlock(e.resolveDynamicComponent(e.unref(l).componentSelectAllControlsReset),{key:1,locale:c.locale,"class-init":e.unref(o),callback:c.reset,"selected-count":e.unref(l).selectedCount.value},null,8,["locale","class-init","callback","selected-count"])):e.createCommentVNode("",!0)],2)}}}),se=[e.createElementVNode("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"},null,-1)],ae=e.defineComponent({__name:"SelectAllControlSelect",props:{callback:{type:Function},classInit:{},locale:{},selectedCount:{}},setup(a){const t=a,l=()=>{t.callback()};return(n,o)=>{var c;return e.openBlock(),e.createElementBlock("button",{class:e.normalizeClass([n.classInit,e.unref(i)("select_all",!0,n.classInit),{[e.unref(i)("select_all-disabled",!0,n.classInit)]:n.selectedCount.isMultiSelectedAll==="yes"}]),onClick:l},[(e.openBlock(),e.createElementBlock("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:e.normalizeClass([e.unref(i)("select_all__icon")])},se,2)),e.createTextVNode(" "+e.toDisplayString((c=n.locale)==null?void 0:c.selectAll),1)],2)}}}),ce=[e.createElementVNode("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"},null,-1)],re=e.defineComponent({__name:"SelectAllControlReset",props:{callback:{type:Function},classInit:{},locale:{},selectedCount:{}},setup(a){const t=a,l=()=>{t.callback()};return(n,o)=>{var c;return e.openBlock(),e.createElementBlock("button",{class:e.normalizeClass([n.classInit,e.unref(i)("reset_all",!0,n.classInit),{[e.unref(i)("reset_all-disabled",!0,n.classInit)]:n.selectedCount.countChecked===0}]),onClick:l},[(e.openBlock(),e.createElementBlock("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:e.normalizeClass([e.unref(i)("reset_all__icon")])},ce,2)),e.createTextVNode(" "+e.toDisplayString((c=n.locale)==null?void 0:c.resetAll),1)],2)}}}),ie=["disabled","multiple"],pe=["label","disabled"],de=["selected","disabled","value"],fe=["selected","disabled","value"],me=e.defineComponent({__name:"NativeSelect",props:{modelValue:{default:null},modelModifiers:{}},emits:e.mergeModels(["changeHandler"],["update:modelValue"]),setup(a,{emit:t}){const l=t,n=e.inject(I),o=e.inject(L),c=e.useModel(a,"modelValue"),d=f=>{l("changeHandler",f)},u=i("select_init");return(f,k)=>e.withDirectives((e.openBlock(),e.createElementBlock("select",{"onUpdate:modelValue":k[0]||(k[0]=y=>c.value=y),tabindex:-1,disabled:e.unref(n).disabled,class:e.normalizeClass([e.unref(u),e.unref(i)("native",!0,e.unref(u))]),multiple:e.unref(n).multiple,onChange:e.withModifiers(d,["prevent"])},[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(e.unref(n).options,(y,S)=>(e.openBlock(),e.createElementBlock(e.Fragment,{key:S},[y.isOptgroupSelect?(e.openBlock(),e.createElementBlock("optgroup",{key:0,label:y.label,disabled:y.disabled},[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(y.items,(m,_)=>(e.openBlock(),e.createElementBlock("option",{key:m.valueOf()+"_"+_,selected:e.unref(o).getSelected(m),disabled:m.disabled,value:m.value},e.toDisplayString(m[e.unref(n).keyTitle]),9,de))),128))],8,pe)):(e.openBlock(),e.createElementBlock("option",{key:y.valueOf()+"_"+S,selected:e.unref(o).getSelected(y),disabled:y.disabled,value:y.value},e.toDisplayString(y[e.unref(n).keyTitle]),9,fe))],64))),128))],42,ie)),[[e.vModelSelect,c.value]])}}),ue=e.defineComponent({__name:"TopIconArrow",setup(a){return(t,l)=>(e.openBlock(),e.createElementBlock("span",{class:e.normalizeClass([e.unref(i)("icon")])},null,2))}}),ke=e.defineComponent({__name:"Loader",setup(a){const t=i("loader_wrap"),l=i("loader");return(n,o)=>(e.openBlock(),e.createElementBlock("div",{class:e.normalizeClass([e.unref(t)])},[e.createElementVNode("div",{class:e.normalizeClass([e.unref(l)])},null,2)],2))}}),ye=e.defineComponent({__name:"BodyListItemEmpty",props:{item:{}},setup(a){const t=i("list_item_body"),l=e.inject(I);return(n,o)=>{var c;return e.openBlock(),e.createElementBlock("div",{class:e.normalizeClass([e.unref(t)])},e.toDisplayString((c=e.unref(l).locale)==null?void 0:c.empty),3)}}}),Ce=["data-count-all","data-count-checked","data-count-checked-full","data-check-all-multi"],z=e.defineComponent({__name:"SimpSelect",props:e.mergeModels({options:{},disabled:{type:Boolean,default:!1},multiple:{type:Boolean,default:!1},countShowSelected:{default:2},sepChars:{default:","},isRemoveTop:{type:Boolean,default:!1},locale:{default:()=>K},titleMain:{default:""},isOnlyPlaceholder:{type:Boolean,default:!1},isAlwaysOpen:{type:Boolean,default:!1},isSearch:{type:Boolean,default:!0},isCloneTitleToSearch:{type:Boolean,default:!0},searchTypeInput:{default:"search"},isSearchInDropdown:{type:Boolean,default:!1},searchFieldsKeys:{default:()=>["name"]},isConfirmInMulti:{type:Boolean,default:!1},isConfirmInMultiOkClickOutside:{type:Boolean,default:!1},keyValue:{default:"value"},keyTitle:{default:"name"},isSimpleShowCheckbox:{type:Boolean,default:!1},selectAll:{type:Boolean,default:!1},selectAllAfterClose:{type:Boolean,default:!0},resetAll:{type:Boolean,default:!1},resetAllAfterClose:{type:Boolean,default:!0},isUp:{type:Boolean,default:!1},isLoading:{type:Boolean,default:!1},isNative:{type:Boolean,default:!1},isFloat:{type:Boolean,default:!1}},{modelValue:{default:null},modelModifiers:{}}),emits:e.mergeModels(["callbackOpen","callbackClose"],["update:modelValue"]),setup(a,{expose:t,emit:l}){const n=e.useSlots(),o=a;e.provide(I,e.readonly(o));const c=l,d=e.useModel(a,"modelValue"),u=e.ref(null),f=e.computed(()=>T(o.options)),k=e.computed(()=>{const p={countChecked:0,countCheckedFull:0,isMultiSelectedAll:"no"};if(!s.value)return p;if(Array.isArray(s.value))p.countChecked=s.value.length,p.countCheckedFull=s.value.filter(b=>b[o.keyValue]).length,s.value.length===f.value.length&&(p.isMultiSelectedAll="yes");else return p.countChecked=1,s.value[o.keyValue]&&(p.countCheckedFull=1),p;return p}),y=e.ref(""),S=p=>{y.value=p||""},m=e.ref({fullString:o.titleMain,result:o.titleMain}),_=p=>{m.value=p},r=e.ref(!1),C=p=>{o.disabled||(p===!0||p===!1?r.value=p:r.value=!r.value)};e.watch(r,p=>{c(p?"callbackOpen":"callbackClose")});const s=e.ref(null);e.watch(d,()=>{A(d.value,s.value,o.keyValue)||(s.value=d.value)},{immediate:!0,deep:!0});const h=p=>{const b=p.target;if(o.multiple){const w=[];for(let V=0;V<b.options.length;V++){const F=b.options[V];F.selected&&w.push(F.value)}s.value=T(o.options).filter(V=>w.includes(V[o.keyValue]))}else s.value=T(o.options).filter(w=>w[o.keyValue]===b.value);e.nextTick(()=>{B()})},O=p=>{if(!o.multiple){s.value=p;return}if(!s.value||Array.isArray(s.value)&&!s.value.length){s.value=[p];return}Array.isArray(s.value)||(s.value?s.value=[s.value]:s.value=[]),s.value.some(w=>p[o.keyValue]===w[o.keyValue])?s.value=s.value.filter(w=>p[o.keyValue]!==w[o.keyValue]):s.value.push(p)};e.onBeforeMount(()=>{B()}),e.watch(s,p=>{o.isConfirmInMulti||B()},{deep:!0});const g=()=>{A(d.value,s.value,o.keyValue)||(d.value=s.value)},B=()=>{g()},$=()=>{s.value=d.value},M=p=>{s.value=o.multiple?[]:null,p&&e.nextTick(()=>{B(),r.value=!1})},he=p=>{s.value=T(o.options),p&&e.nextTick(()=>{B(),r.value=!1})},Be=p=>s.value?Array.isArray(s.value)?s.value.some(b=>p[o.keyValue]===b[o.keyValue]):s.value[o.keyValue].toString()===p[o.keyValue].toString():!1;return e.provide(L,{isLocalOpen:r,setIsLocalOpen:C,localSelected:s,$wrapper:u,searchText:y,setSearchText:S,titleText:m,setTitleText:_,getSelected:Be,setToggleOption:O,updateOutsideModels:B,resetSelectedByDontConfirm:$,resetAll:M,selectAll:he,selectedCount:k,componentItemListItem:n.itemListItem||P,componentItemListItemEmpty:n.itemListItemEmpty||ye,componentTitle:n.title||ee,componentBottomControl:n.bottomControl||te,componentBottomControlOk:n.bottomControlOk||le,componentBottomControlNo:n.bottomControlNo||ne,componentSelectAllControls:n.selectControls||oe,componentSelectAllControlsSelect:n.selectControlsSelect||ae,componentSelectAllControlsReset:n.selectControlsReset||re,componentArrowIcon:n.arrowIcon||ue,componentLoading:n.loading||ke}),t({setIsLocalOpen:C}),(p,b)=>(e.openBlock(),e.createElementBlock("div",{ref_key:"$wrapper",ref:u,"data-count-all":f.value.length,"data-count-checked":k.value.countChecked,"data-count-checked-full":k.value.countCheckedFull,"data-check-all-multi":k.value.isMultiSelectedAll,class:e.normalizeClass([["SimpleSel"],{[e.unref(i)("multi",!0)]:p.multiple,[e.unref(i)("single",!0)]:!p.multiple,[e.unref(i)("body-always_open",!0)]:p.isAlwaysOpen,[e.unref(i)("float",!0)]:p.isFloat,[e.unref(i)("disabled",!0)]:p.disabled,[e.unref(i)("open",!0)]:r.value,[e.unref(i)("up",!0)]:p.isUp,[e.unref(i)("loading",!0)]:p.isLoading}])},[o.isNative?(e.openBlock(),e.createBlock(me,{key:0,modelValue:d.value,"onUpdate:modelValue":b[0]||(b[0]=w=>d.value=w),onChangeHandler:h},null,8,["modelValue"])):e.createCommentVNode("",!0),e.createVNode(J,{onSetIsLocalOpen:C}),o.isNative?e.createCommentVNode("",!0):(e.openBlock(),e.createBlock(Y,{key:1}))],10,Ce))}}),_e={install:function(a){a.component("SimpSelect",z)}};E.SimpSelect=z,E.useSelect=_e,Object.defineProperties(E,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
