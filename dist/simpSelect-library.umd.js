(function(T,e){typeof exports=="object"&&typeof module!="undefined"?e(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],e):(T=typeof globalThis!="undefined"?globalThis:T||self,e(T.MyComponentLib={},T.Vue))})(this,function(T,e){"use strict";const H={noSearch:"No matches for",searchText:"Search",title:"Select",selected:"Selected:",all:"all",ok:"Ok",cancel:"Cancel",selectAll:"Select all",resetAll:"Reset all",empty:"Empty"},U="SimpleSel",r=(a,t=!1,l=U)=>`${l}${t?"--":"__"}${a}`,q=a=>JSON.parse(JSON.stringify(a)),V=a=>{var t;return(t=a[0])!=null&&t.isOptgroupSelect?[].concat(...a.map(l=>l.items.map(n=>n))):q(a)},D=(a,t,l)=>{if(!a&&!t)return!0;if(!a&&t||a&&!t||!a||!t)return!1;const n=Array.isArray(a),o=Array.isArray(t);return!n&&o||n&&!o?!1:n&&o?J(a,t,l):!n&&!o?F(a,t):!1};function J(a,t,l){const n=a.slice().sort((c,d)=>c[l].localeCompare(d[l])),o=t.slice().sort((c,d)=>c[l].localeCompare(d[l]));if(n.length!==o.length)return!1;for(let c=0;c<n.length;c++)if(n[c].id!==o[c].id)return!1;return!0}const F=(a,t)=>{const l=Object.keys(a),n=Object.keys(t);if(l.length!==n.length)return!1;for(const o of l){const c=a[o],d=t[o],k=j(c)&&j(d);if(k&&!F(c,d)||!k&&c!==d)return!1}return!0};function j(a){return a!=null&&typeof a=="object"}const z=a=>a.toLowerCase(),I=Symbol(),E=Symbol(),W=["type","tabindex","placeholder"],K=e.defineComponent({__name:"Search",props:{searchTypeInput:{default:"search"},isDropdown:{type:Boolean,default:!1}},emits:[""],setup(a){const t=e.ref(""),l=e.inject(I),n=e.inject(E),o=e.ref(null),c=r("search"),d=e.computed(()=>n!=null&&n.isLocalOpen.value?0:-1);e.watch(t,f=>{n==null||n.setSearchText(f)}),e.watch(()=>n==null?void 0:n.isLocalOpen.value,f=>{f||(t.value="")}),e.watch(()=>n==null?void 0:n.isLocalOpen.value,f=>{f&&setTimeout(()=>{var m;(m=o.value)==null||m.focus()},20)});const k=e.computed(()=>{var m;let f=((m=l==null?void 0:l.locale)==null?void 0:m.searchText)||"";if((l==null?void 0:l.isCloneTitleToSearch)&&(n==null?void 0:n.localSelected.value)){if(Array.isArray(n.localSelected.value)&&!n.localSelected.value.length)return f;f=n.titleText.value.fullString}return f});return(f,m)=>e.withDirectives((e.openBlock(),e.createElementBlock("input",{ref_key:"$input",ref:o,"onUpdate:modelValue":m[0]||(m[0]=B=>t.value=B),class:e.normalizeClass([e.unref(c),{[e.unref(r)("top",!0,e.unref(c))]:!f.isDropdown,[e.unref(r)("dropdown",!0,e.unref(c))]:f.isDropdown}]),type:f.searchTypeInput,tabindex:d.value,placeholder:k.value,autocomplete:"off","aria-autocomplete":"none",inputmode:"none"},null,10,W)),[[e.vModelDynamic,t.value]])}}),Z=["tabindex","onKeydown"],G=e.defineComponent({__name:"Top",emits:["setIsLocalOpen"],setup(a){const t=e.inject(I),l=e.inject(E),n=e.computed(()=>t!=null&&t.disabled||l!=null&&l.isLocalOpen.value?-1:0),o=()=>{l==null||l.setIsLocalOpen()},c=e.computed(()=>{const d={fullString:(t==null?void 0:t.titleMain)||(t==null?void 0:t.locale.title)||"",result:(t==null?void 0:t.titleMain)||(t==null?void 0:t.locale.title)||""};if(!(l!=null&&l.localSelected.value))return d;if(Array.isArray(l.localSelected.value)){const k=l.localSelected.value.length;if(k&&!(t!=null&&t.isOnlyPlaceholder)){const f=l.localSelected.value.map(m=>m[t.keyTitle]);d.fullString=f.join(t==null?void 0:t.sepChars),(t==null?void 0:t.countShowSelected)&&t.countShowSelected<k?d.result=`${t==null?void 0:t.locale.selected} ${k}`:d.result=f.join(t==null?void 0:t.sepChars)}t.options.length&&k===t.options.length&&(d.result+=` <span >(${t==null?void 0:t.locale.all})<span>`)}else d.fullString=l.localSelected.value[t.keyTitle],d.result=l.localSelected.value[t.keyTitle];return l.setTitleText(d),d});return(d,k)=>{var f,m,B,S,C,h,u,_,p;return e.openBlock(),e.createElementBlock("div",{class:e.normalizeClass([e.unref(r)("top")])},[(f=e.unref(t))!=null&&f.isRemoveTop?e.createCommentVNode("",!0):(e.openBlock(),e.createElementBlock("div",{key:0,class:e.normalizeClass([e.unref(r)("top_body")]),tabindex:n.value,onClick:k[0]||(k[0]=s=>d.$emit("setIsLocalOpen")),onKeydown:e.withKeys(e.withModifiers(o,["stop","prevent"]),["enter"])},[(e.openBlock(),e.createBlock(e.resolveDynamicComponent(e.unref(l).componentTitle),{locale:e.unref(t).locale,"local-selected":e.unref(l).localSelected.value,"title-res":c.value,"count-show-selected":(m=e.unref(t))==null?void 0:m.countShowSelected,"is-only-placeholder":(B=e.unref(t))==null?void 0:B.isOnlyPlaceholder,"sep-chars":e.unref(t).sepChars,options:e.unref(t).options},null,8,["locale","local-selected","title-res","count-show-selected","is-only-placeholder","sep-chars","options"])),!((S=e.unref(t))!=null&&S.isLoading)&&!((C=e.unref(t))!=null&&C.isAlwaysOpen)?(e.openBlock(),e.createBlock(e.resolveDynamicComponent(e.unref(l).componentArrowIcon),{key:0})):e.createCommentVNode("",!0),(h=e.unref(t))!=null&&h.isLoading?(e.openBlock(),e.createBlock(e.resolveDynamicComponent(e.unref(l).componentLoading),{key:1})):e.createCommentVNode("",!0)],42,Z)),((u=e.unref(t))==null?void 0:u.isSearch)&&!e.unref(t).isSearchInDropdown&&!((_=e.unref(t))!=null&&_.isFloat)?(e.openBlock(),e.createBlock(K,{key:1,"search-type-input":(p=e.unref(t))==null?void 0:p.searchTypeInput,"is-dropdown":!1},null,8,["search-type-input"])):e.createCommentVNode("",!0)],2)}}}),Q={class:"SimpleSel__group_title"},X={class:"SimpleSel__group"},Y=["tabindex","data-sel-opt-checked","onKeyup","onClick"],P=["tabindex","data-sel-opt-checked","onKeyup","onClick"],v=e.defineComponent({__name:"BodyList",setup(a){const t=e.inject(I),l=e.inject(E),n=e.ref(V(t.options)),o=e.ref(null),c=e.ref([]),d=C=>{const h=n.value.length;if(C.key==="ArrowUp"){if(o.value===null){o.value=h-1;return}o.value=o.value-1>=0?o.value-1:h-1;return}if(C.key==="ArrowDown"){if(o.value===null){o.value=0;return}o.value=o.value+1<h?o.value+1:0;return}},k=()=>{o.value===null&&(o.value=0)};e.watch(o,C=>{if(!C&&C!==0)return;const h=c.value[C];h&&h.focus()});const f=(C,h)=>{t!=null&&t.multiple||l==null||l.setIsLocalOpen(!1),l.setToggleOption(h)},m=e.computed(()=>{var u,_;const C=((u=l==null?void 0:l.searchText)==null?void 0:u.value.trim())||"";if(!C)return t.options;const h=p=>{var y;let s=!1;return(y=t.searchFieldsKeys)==null||y.forEach(O=>{O in p&&z(p[O]).includes(C)&&(s=!0)}),s};return(_=t==null?void 0:t.options[0])!=null&&_.isOptgroupSelect?t.options.map(p=>{const s=p.items.filter(h);return{...p,items:s}}):t.options.filter(h)}),B=(C,h,u)=>{h.disabled||u&&u.disabled||f(C,h)},S=r("group_items");return(C,h)=>(e.openBlock(),e.createElementBlock("ul",{class:e.normalizeClass([e.unref(r)("list")]),tabindex:0,onKeydown:d,onKeyup:e.withKeys(k,["enter"])},[m.value.length?(e.openBlock(!0),e.createElementBlock(e.Fragment,{key:1},e.renderList(m.value,(u,_)=>{var p,s;return e.openBlock(),e.createElementBlock(e.Fragment,{key:_},[u.isOptgroupSelect?(e.openBlock(),e.createElementBlock("li",{key:0,class:e.normalizeClass([e.unref(S)])},[e.createElementVNode("div",Q,e.toDisplayString(u.label),1),e.createElementVNode("ul",X,[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(u.items,(y,O)=>{var $,b;return e.openBlock(),e.createElementBlock("li",{key:y.valueOf()+"_"+O,ref_for:!0,ref_key:"itemsOption",ref:c,tabindex:_===o.value?0:-1,"data-sel-opt-checked":($=e.unref(l))!=null&&$.getSelected(y)?"true":"false",class:e.normalizeClass([["SimpleSel__list_item"],{"SimpleSel__list_item--disabled":y.disabled||u.disabled,"SimpleSel__list_item--checked":(b=e.unref(l))==null?void 0:b.getSelected(y)}]),onKeyup:e.withKeys(e.withModifiers(L=>B(L,y,u),["prevent","stop"]),["enter"]),onClick:e.withModifiers(L=>B(L,y,u),["prevent"])},[e.unref(t)?(e.openBlock(),e.createBlock(e.resolveDynamicComponent(e.unref(l).componentItemListItem),{key:0,item:y},null,8,["item"])):e.createCommentVNode("",!0)],42,Y)}),128))])],2)):(e.openBlock(),e.createElementBlock("li",{key:u.valueOf()+"_"+u,ref_for:!0,ref_key:"itemsOption",ref:c,tabindex:_===o.value?0:-1,"data-sel-opt-checked":(p=e.unref(l))!=null&&p.getSelected(u)?"true":"false",class:e.normalizeClass([["SimpleSel__list_item"],{"SimpleSel__list_item--checked":(s=e.unref(l))==null?void 0:s.getSelected(u),"SimpleSel__list_item--disabled":u.disabled}]),onKeyup:e.withKeys(e.withModifiers(y=>B(y,u),["prevent","stop"]),["enter"]),onClick:e.withModifiers(y=>B(y,u),["prevent"])},[e.unref(t)?(e.openBlock(),e.createBlock(e.resolveDynamicComponent(e.unref(l).componentItemListItem),{key:0,item:u},null,8,["item"])):e.createCommentVNode("",!0)],42,P))],64)}),128)):(e.openBlock(),e.createElementBlock("li",{key:0,class:e.normalizeClass([e.unref(S)])},[(e.openBlock(),e.createBlock(e.resolveDynamicComponent(e.unref(l).componentItemListItemEmpty)))],2))],34))}}),ee=e.defineComponent({__name:"Body",setup(a){const t=e.inject(I),l=e.inject(E),n=e.ref(null),o=e.ref([]),c=e.ref(),d=r("body_open",!0),k=p=>{var y;const s=p.target;!((y=l==null?void 0:l.$wrapper)!=null&&y.value)||!l.$wrapper.value.contains(s)&&s!==l.$wrapper.value&&(l==null||l.setIsLocalOpen(!1),(t==null?void 0:t.isConfirmInMulti)&&t.isConfirmInMultiOkClickOutside?l.updateOutsideModels("clickOutside"):l.resetSelectedByDontConfirm())},f=p=>{p.key==="Escape"&&(l==null||l.setIsLocalOpen(!1),l==null||l.resetSelectedByDontConfirm())},m=p=>{var y;const s=p.relatedTarget;s&&!((y=l==null?void 0:l.$wrapper.value)!=null&&y.contains(s))&&(l==null||l.setIsLocalOpen(!1))};e.watch(()=>l==null?void 0:l.isLocalOpen.value,p=>{var s;t!=null&&t.isFloat&&((s=document==null?void 0:document.body)==null||s.classList.toggle(d,p)),p&&(!(l!=null&&l.isFirstOpened.value)&&(t==null?void 0:t.isScrollToCheckedFirst)&&!(t!=null&&t.isScrollToCheckedAlways)&&B(),t!=null&&t.isScrollToCheckedAlways&&B()),typeof window!="undefined"&&(p?(document==null||document.addEventListener("click",k),document==null||document.addEventListener("keyup",f),document==null||document.addEventListener("focusout",m)):(document==null||document.removeEventListener("click",k),document==null||document.removeEventListener("keyup",f),document==null||document.removeEventListener("focusout",m)))},{immediate:!0});const B=()=>{if(c.value){const p=c.value.querySelector('[data-sel-opt-checked="true"]');p&&(c.value.scrollTop=p.offsetTop)}};e.watch(n,p=>{if(!p&&p!==0)return;const s=o.value[p];s&&s.focus()});const S=()=>{l==null||l.setIsLocalOpen(!1),l.updateOutsideModels("ok")},C=()=>{l==null||l.setIsLocalOpen(!1),l==null||l.resetSelectedByDontConfirm()},h=()=>{l==null||l.selectAll(!!(t!=null&&t.selectAllAfterClose))},u=()=>{l==null||l.resetAll(!!(t!=null&&t.resetAllAfterClose))},_=r("body");return(p,s)=>{var y,O,$,b,L,M,N;return e.openBlock(),e.createElementBlock("div",{ref_key:"$body",ref:c,class:e.normalizeClass([e.unref(_),{[e.unref(r)("toggle_open",!0,e.unref(_))]:!((y=e.unref(t))!=null&&y.isAlwaysOpen),[e.unref(r)("body-always_open",!0)]:(O=e.unref(t))==null?void 0:O.isAlwaysOpen}])},[(($=e.unref(t))==null?void 0:$.isSearch)&&e.unref(t).isSearchInDropdown?(e.openBlock(),e.createBlock(K,{key:0,"search-type-input":(b=e.unref(t))==null?void 0:b.searchTypeInput,"is-dropdown":!0},null,8,["search-type-input"])):e.createCommentVNode("",!0),((L=e.unref(t))==null?void 0:L.selectAll)||((M=e.unref(t))==null?void 0:M.resetAll)?(e.openBlock(),e.createBlock(e.resolveDynamicComponent(e.unref(l).componentSelectAllControls),{key:1,select:h,reset:u,locale:e.unref(t).locale},null,8,["locale"])):e.createCommentVNode("",!0),e.createVNode(v),(N=e.unref(t))!=null&&N.isConfirmInMulti?(e.openBlock(),e.createBlock(e.resolveDynamicComponent(e.unref(l).componentBottomControl),{key:2,confirm:S,cancellation:C,locale:e.unref(t).locale},null,8,["locale"])):e.createCommentVNode("",!0)],2)}}}),te=e.defineComponent({__name:"BodyListItem",props:{item:{}},setup(a){const t=r("list_item_body"),l=e.inject(I);return(n,o)=>{var c,d;return e.openBlock(),e.createElementBlock("div",{class:e.normalizeClass([e.unref(t)])},[((c=e.unref(l))==null?void 0:c.multiple)||((d=e.unref(l))==null?void 0:d.isSimpleShowCheckbox)?(e.openBlock(),e.createElementBlock("span",{key:0,class:e.normalizeClass([e.unref(r)("list_item_icon")])},null,2)):e.createCommentVNode("",!0),e.createTextVNode(" "+e.toDisplayString(n.item[e.unref(l).keyTitle]||""),1)],2)}}}),le=["title","innerHTML"],ne=e.defineComponent({__name:"TopTitle",props:{locale:{},localSelected:{},titleRes:{},countShowSelected:{},isOnlyPlaceholder:{type:Boolean},sepChars:{},options:{}},setup(a){const t=a,l=e.computed(()=>{const n={placeholder:!1,fill:!1,full:!1},o=V(t.options);return!t.localSelected||Array.isArray(t.localSelected)&&!t.localSelected.length?(n.placeholder=!0,n):(n.fill=!0,Array.isArray(t.localSelected)&&o.length===t.localSelected.length&&(n.full=!0),n)});return(n,o)=>(e.openBlock(),e.createElementBlock("div",{title:n.titleRes.fullString,class:e.normalizeClass([e.unref(r)("title"),{[e.unref(r)("title--placeholder")]:l.value.placeholder,[e.unref(r)("title--fill")]:l.value.fill,[e.unref(r)("title--full")]:l.value.full}]),innerHTML:n.titleRes.result||""},null,10,le))}}),oe=e.defineComponent({__name:"BottomControls",props:{confirm:{type:Function},cancellation:{type:Function},locale:{}},setup(a){const t=e.inject(E),l=r("bottom_controls"),n=r("bottom_control");return(o,c)=>(e.openBlock(),e.createElementBlock("div",{class:e.normalizeClass([e.unref(l)])},[(e.openBlock(),e.createBlock(e.resolveDynamicComponent(e.unref(t).componentBottomControlOk),{"class-init":e.unref(n),callback:o.confirm,locale:o.locale},null,8,["class-init","callback","locale"])),(e.openBlock(),e.createBlock(e.resolveDynamicComponent(e.unref(t).componentBottomControlNo),{"class-init":e.unref(n),callback:o.cancellation,locale:o.locale},null,8,["class-init","callback","locale"]))],2))}}),se=e.defineComponent({__name:"BottomControlsOk",props:{callback:{type:Function},classInit:{},locale:{}},setup(a){return(t,l)=>{var n;return e.openBlock(),e.createElementBlock("button",{class:e.normalizeClass([t.classInit,e.unref(r)("ok",!0,t.classInit)]),onClick:l[0]||(l[0]=(...o)=>t.callback&&t.callback(...o))},e.toDisplayString((n=t.locale)==null?void 0:n.ok),3)}}}),ce=e.defineComponent({__name:"BottomControlsNo",props:{callback:{type:Function},classInit:{},locale:{}},setup(a){return(t,l)=>{var n;return e.openBlock(),e.createElementBlock("button",{class:e.normalizeClass([t.classInit,e.unref(r)("no",!0,t.classInit)]),onClick:l[0]||(l[0]=(...o)=>t.callback&&t.callback(...o))},e.toDisplayString((n=t.locale)==null?void 0:n.cancel),3)}}}),ae=e.defineComponent({__name:"SelectAllControls",props:{select:{type:Function},reset:{type:Function},locale:{}},setup(a){const t=e.inject(I),l=e.inject(E),n=r("controls"),o=r("control");return(c,d)=>{var k,f;return e.openBlock(),e.createElementBlock("div",{class:e.normalizeClass([e.unref(n)])},[(k=e.unref(t))!=null&&k.selectAll?(e.openBlock(),e.createBlock(e.resolveDynamicComponent(e.unref(l).componentSelectAllControlsSelect),{key:0,locale:c.locale,"class-init":e.unref(o),callback:c.select,"selected-count":e.unref(l).selectedCount.value},null,8,["locale","class-init","callback","selected-count"])):e.createCommentVNode("",!0),(f=e.unref(t))!=null&&f.resetAll?(e.openBlock(),e.createBlock(e.resolveDynamicComponent(e.unref(l).componentSelectAllControlsReset),{key:1,locale:c.locale,"class-init":e.unref(o),callback:c.reset,"selected-count":e.unref(l).selectedCount.value},null,8,["locale","class-init","callback","selected-count"])):e.createCommentVNode("",!0)],2)}}}),re=[e.createElementVNode("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"},null,-1)],ie=e.defineComponent({__name:"SelectAllControlSelect",props:{callback:{type:Function},classInit:{},locale:{},selectedCount:{}},setup(a){const t=a,l=()=>{t.callback()};return(n,o)=>{var c;return e.openBlock(),e.createElementBlock("button",{class:e.normalizeClass([n.classInit,e.unref(r)("select_all",!0,n.classInit),{[e.unref(r)("select_all-disabled",!0,n.classInit)]:n.selectedCount.isMultiSelectedAll==="yes"}]),onClick:l},[(e.openBlock(),e.createElementBlock("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:e.normalizeClass([e.unref(r)("select_all__icon")])},re,2)),e.createTextVNode(" "+e.toDisplayString((c=n.locale)==null?void 0:c.selectAll),1)],2)}}}),de=[e.createElementVNode("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"},null,-1)],pe=e.defineComponent({__name:"SelectAllControlReset",props:{callback:{type:Function},classInit:{},locale:{},selectedCount:{}},setup(a){const t=a,l=()=>{t.callback()};return(n,o)=>{var c;return e.openBlock(),e.createElementBlock("button",{class:e.normalizeClass([n.classInit,e.unref(r)("reset_all",!0,n.classInit),{[e.unref(r)("reset_all-disabled",!0,n.classInit)]:n.selectedCount.countChecked===0}]),onClick:l},[(e.openBlock(),e.createElementBlock("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:e.normalizeClass([e.unref(r)("reset_all__icon")])},de,2)),e.createTextVNode(" "+e.toDisplayString((c=n.locale)==null?void 0:c.resetAll),1)],2)}}}),fe=["disabled","multiple"],me=["label","disabled"],ue=["selected","disabled","value"],ke=["selected","disabled","value"],ye=e.defineComponent({__name:"NativeSelect",emits:["changeHandler"],setup(a,{emit:t}){const l=t,n=e.inject(I),o=e.inject(E),c=k=>{l("changeHandler",k)},d=r("select_init");return(k,f)=>(e.openBlock(),e.createElementBlock("select",{tabindex:-1,disabled:e.unref(n).disabled,class:e.normalizeClass([e.unref(d),e.unref(r)("native",!0,e.unref(d))]),multiple:e.unref(n).multiple,onChange:e.withModifiers(c,["prevent"])},[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(e.unref(n).options,(m,B)=>(e.openBlock(),e.createElementBlock(e.Fragment,{key:B},[m.isOptgroupSelect?(e.openBlock(),e.createElementBlock("optgroup",{key:0,label:m.label,disabled:m.disabled},[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(m.items,(S,C)=>(e.openBlock(),e.createElementBlock("option",{key:S.valueOf()+"_"+C,selected:e.unref(o).getSelected(S),disabled:S.disabled,value:S.value},e.toDisplayString(S[e.unref(n).keyTitle]),9,ue))),128))],8,me)):(e.openBlock(),e.createElementBlock("option",{key:m.valueOf()+"_"+B,selected:e.unref(o).getSelected(m),disabled:m.disabled,value:m.value},e.toDisplayString(m[e.unref(n).keyTitle]),9,ke))],64))),128))],42,fe))}}),he=e.defineComponent({__name:"TopIconArrow",setup(a){return(t,l)=>(e.openBlock(),e.createElementBlock("span",{class:e.normalizeClass([e.unref(r)("icon")])},null,2))}}),Ce=e.defineComponent({__name:"Loader",setup(a){const t=r("loader_wrap"),l=r("loader");return(n,o)=>(e.openBlock(),e.createElementBlock("div",{class:e.normalizeClass([e.unref(t)])},[e.createElementVNode("div",{class:e.normalizeClass([e.unref(l)])},null,2)],2))}}),_e=e.defineComponent({__name:"BodyListItemEmpty",props:{item:{}},setup(a){const t=r("list_item_body"),l=e.inject(I);return(n,o)=>{var c;return e.openBlock(),e.createElementBlock("div",{class:e.normalizeClass([e.unref(t)])},e.toDisplayString((c=e.unref(l).locale)==null?void 0:c.empty),3)}}}),Be=["data-count-all","data-count-checked","data-count-checked-full","data-check-all-multi"],x=e.defineComponent({__name:"SimpSelect",props:e.mergeModels({options:{},disabled:{type:Boolean,default:!1},multiple:{type:Boolean,default:!1},countShowSelected:{default:2},sepChars:{default:","},isRemoveTop:{type:Boolean,default:!1},locale:{default:()=>H},titleMain:{default:""},isOnlyPlaceholder:{type:Boolean,default:!1},isAlwaysOpen:{type:Boolean,default:!1},isSearch:{type:Boolean,default:!0},isCloneTitleToSearch:{type:Boolean,default:!0},searchTypeInput:{default:"search"},isSearchInDropdown:{type:Boolean,default:!1},searchFieldsKeys:{default:()=>["name"]},isConfirmInMulti:{type:Boolean,default:!1},isConfirmInMultiOkClickOutside:{type:Boolean,default:!1},keyValue:{default:"value"},keyTitle:{default:"name"},isSimpleShowCheckbox:{type:Boolean,default:!1},selectAll:{type:Boolean,default:!1},selectAllAfterClose:{type:Boolean,default:!0},resetAll:{type:Boolean,default:!1},resetAllAfterClose:{type:Boolean,default:!0},isUp:{type:Boolean,default:!1},isLoading:{type:Boolean,default:!1},isNative:{type:Boolean,default:!1},isFloat:{type:Boolean,default:!1},isScrollToCheckedFirst:{type:Boolean,default:!0},isScrollToCheckedAlways:{type:Boolean,default:!1}},{modelValue:{default:null},modelModifiers:{}}),emits:e.mergeModels(["callbackOpen","callbackClose"],["update:modelValue"]),setup(a,{expose:t,emit:l}){const n=e.useSlots(),o=a;e.provide(I,e.readonly(o));const c=l,d=e.useModel(a,"modelValue"),k=e.ref(null),f=e.ref(!1),m=e.computed(()=>V(o.options)),B=e.computed(()=>{const i={countChecked:0,countCheckedFull:0,isMultiSelectedAll:"no"};if(!s.value)return i;if(Array.isArray(s.value))i.countChecked=s.value.length,i.countCheckedFull=s.value.filter(g=>g[o.keyValue]).length,s.value.length===m.value.length&&(i.isMultiSelectedAll="yes");else return i.countChecked=1,s.value[o.keyValue]&&(i.countCheckedFull=1),i;return i}),S=e.ref(""),C=i=>{if(!i){S.value="";return}S.value=z(i)},h=e.ref({fullString:o.titleMain,result:o.titleMain}),u=i=>{h.value=i},_=e.ref(!1),p=i=>{o.disabled||(i===!0||i===!1?_.value=i:_.value=!_.value)};e.watch(_,i=>{f.value||e.nextTick(()=>{f.value=!0}),c(i?"callbackOpen":"callbackClose")});const s=e.ref(null);e.watch(d,()=>{D(d.value,s.value,o.keyValue)||(s.value=d.value)},{immediate:!0,deep:!0});const y=i=>{const g=i.target;if(o.multiple){const w=[];for(let A=0;A<g.options.length;A++){const R=g.options[A];R.selected&&w.push(R.value)}s.value=V(o.options).filter(A=>w.includes(A[o.keyValue]))}else s.value=V(o.options).filter(w=>w[o.keyValue]===g.value);e.nextTick(()=>{b()})},O=i=>{if(!o.multiple){s.value=i;return}if(!s.value||Array.isArray(s.value)&&!s.value.length){s.value=[i];return}Array.isArray(s.value)||(s.value?s.value=[s.value]:s.value=[]),s.value.some(w=>i[o.keyValue]===w[o.keyValue])?s.value=s.value.filter(w=>i[o.keyValue]!==w[o.keyValue]):s.value.push(i)};e.onBeforeMount(()=>{b()}),e.watch(s,()=>{o.isConfirmInMulti||b()},{deep:!0});const $=()=>{D(d.value,s.value,o.keyValue)||(d.value=s.value)},b=()=>{$()},L=()=>{s.value=d.value},M=i=>{s.value=o.multiple?[]:null,i&&e.nextTick(()=>{b(),_.value=!1})},N=i=>{s.value=V(o.options),i&&e.nextTick(()=>{b(),_.value=!1})},be=i=>s.value?Array.isArray(s.value)?s.value.some(g=>i[o.keyValue]===g[o.keyValue]):s.value[o.keyValue].toString()===i[o.keyValue].toString():!1;return e.provide(E,{isLocalOpen:_,setIsLocalOpen:p,localSelected:s,$wrapper:k,searchText:S,setSearchText:C,titleText:h,setTitleText:u,getSelected:be,setToggleOption:O,updateOutsideModels:b,resetSelectedByDontConfirm:L,resetAll:M,selectAll:N,isFirstOpened:f,selectedCount:B,componentItemListItem:n.itemListItem||te,componentItemListItemEmpty:n.itemListItemEmpty||_e,componentTitle:n.title||ne,componentBottomControl:n.bottomControl||oe,componentBottomControlOk:n.bottomControlOk||se,componentBottomControlNo:n.bottomControlNo||ce,componentSelectAllControls:n.selectControls||ae,componentSelectAllControlsSelect:n.selectControlsSelect||ie,componentSelectAllControlsReset:n.selectControlsReset||pe,componentArrowIcon:n.arrowIcon||he,componentLoading:n.loading||Ce}),t({setIsLocalOpen:p}),(i,g)=>(e.openBlock(),e.createElementBlock("div",{ref_key:"$wrapper",ref:k,"data-count-all":m.value.length,"data-count-checked":B.value.countChecked,"data-count-checked-full":B.value.countCheckedFull,"data-check-all-multi":B.value.isMultiSelectedAll,class:e.normalizeClass([["SimpleSel"],{[e.unref(r)("multi",!0)]:i.multiple,[e.unref(r)("single",!0)]:!i.multiple,[e.unref(r)("body-always_open",!0)]:i.isAlwaysOpen,[e.unref(r)("float",!0)]:i.isFloat&&!i.isNative,[e.unref(r)("disabled",!0)]:i.disabled,[e.unref(r)("open",!0)]:_.value,[e.unref(r)("up",!0)]:i.isUp,[e.unref(r)("loading",!0)]:i.isLoading}])},[o.isNative?(e.openBlock(),e.createBlock(ye,{key:0,modelValue:d.value,"onUpdate:modelValue":g[0]||(g[0]=w=>d.value=w),onChangeHandler:y},null,8,["modelValue"])):e.createCommentVNode("",!0),e.createVNode(G,{onSetIsLocalOpen:p}),o.isNative?e.createCommentVNode("",!0):(e.openBlock(),e.createBlock(ee,{key:1}))],10,Be))}}),Se={install:function(a){a.component("SimpSelect",x)}};T.SimpSelect=x,T.useSelect=Se,Object.defineProperties(T,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
