(function(e,t){typeof exports=="object"&&typeof module<"u"?t(exports):typeof define=="function"&&define.amd?define(["exports"],t):(e=typeof globalThis<"u"?globalThis:e||self,t(e.StupidContentEditor={}))})(this,function(e){"use strict";var r=Object.defineProperty;var u=(e,t,o)=>t in e?r(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o;var s=(e,t,o)=>(u(e,typeof t!="symbol"?t+"":t,o),o);const t=`<svg height="25" width="25">
     <rect x="0" y="5" width="30" height="1" />
    <rect x="4.5" y="10.75" width="15" height="1" />
         <rect x="0" y="16.875" width="30" height="1" />
     <rect x="4.5" y="23" width="15" height="1" />
</svg>`,o=`<svg height="25" width="25">
     <rect x="0" y="5" width="30" height="1" />
    <rect x="0" y="10.75" width="12.5" height="1" />
         <rect x="0" y="16.875" width="30" height="1" />
     <rect x="0" y="23" width="12.5" height="1" />

</svg>`,c=`<svg height="25" width="25">
     <rect x="0" y="5" width="30" height="1" />
    <rect x="12.5" y="10.75" width="12.5" height="1" />
         <rect x="0" y="16.875" width="30" height="1" />
     <rect x="12.5" y="23" width="12.5" height="1" />

</svg>`,d=`<svg height="25" width="25">
     <rect x="0" y="5" width="30" height="1" />
    <rect x="0" y="10.75" width="25" height="1" />
         <rect x="0" y="16.875" width="30" height="1" />
     <rect x="0" y="23" width="25" height="1" />

</svg>`,g=`<style>
    :root {
        display: block;
    }

    main {
        display: grid;
        grid-template-columns: 1fr;
        height: 100%;
        grid-template-rows: 0fr 1fr;
        gap: 1rem;
        overflow: scroll;
        border-bottom: 1px solid black;
    }

    .active {
        background: gray;
    }

    .bold {
        font-weight: bolder;
    }

    .italic {
        font-style: italic;
    }

    .settings {
        display: grid;
        grid-template-columns: .5fr .5fr 2fr repeat(4, 0fr);
        gap: 0.5rem;
        padding: 1rem 0rem 0;
    }

    .settings>* {
        box-shadow: 0 0 5px rgba(0, 0, 0, .5);
    }

    .alignment {
        width: 35px;
        height: 35px;
        padding: 0;
    }

    .alignment>svg {
        width: 25px;
        height: 25px;
    }

    .input-field {
        border: 1px solid black;
        box-shadow: 0 0 5px rgba(0, 0, 0, .5);
        padding: 1rem;
    }
</style>
<main>
    <div class="settings">
        <button class="bold">B</button>
        <button class="italic">I</button>
        <select>
            <option value="monospace">monospace</option>
            <option value="Comic Sans MS">Comic Sans</option>
        </select>
        <button class="alignment alignLeft">\${alignLeft}</button>
        <button class="alignment alignCenter">\${alignCenter}</button>
        <button class="alignment alignRight">\${alignRight}</button>
        <button class="alignment justify">\${justify}</button>
    </div>
    <div class="input-field" contenteditable="true"></div>
</main>`,l=document.createElement("template");l.innerHTML=`${g.replace("${alignLeft}",o).replace("${alignRight}",c).replace("${alignCenter}",t).replace("${justify}",d)}`;class h extends HTMLElement{constructor(){super();s(this,"inputField");s(this,"boldButton");s(this,"selectElement");s(this,"italicButton");s(this,"alignLeft");s(this,"alignRight");s(this,"alignCenter");s(this,"justify");this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(l.content.cloneNode(!0))}static get observedAttributes(){return["trustedhtml"]}connectedCallback(){this.inputField=this.shadowRoot.querySelector(".input-field"),this.boldButton=this.shadowRoot.querySelector(".bold"),this.selectElement=this.shadowRoot.querySelector("select"),this.italicButton=this.shadowRoot.querySelector(".italic"),this.alignLeft=this.shadowRoot.querySelector(".alignLeft"),this.alignRight=this.shadowRoot.querySelector(".alignRight"),this.alignCenter=this.shadowRoot.querySelector(".alignCenter"),this.justify=this.shadowRoot.querySelector(".justify"),this.setupListeners()}action(i,n=void 0){document.execCommand(i,!1,n)}setupListeners(){this.selectElement.onchange=this.selectFont.bind(this),this.boldButton.onclick=()=>this.toggleSetting("bold",this.boldButton),this.italicButton.onclick=()=>this.toggleSetting("italic",this.italicButton),this.alignRight.onclick=()=>this.alignText("justifyRight"),this.alignLeft.onclick=()=>this.alignText("justifyLeft"),this.alignCenter.onclick=()=>this.alignText("justifyCenter"),this.justify.onclick=()=>this.alignText("justifyFull"),this.inputField.onpaste=i=>{var n;i.preventDefault(),document.execCommand("insertText",!1,(n=i.clipboardData)==null?void 0:n.getData("text/plain"))}}attributeChangedCallback(i,n,a){if(i==="trustedhtml")try{this.inputField.innerHTML=a}catch{setTimeout(()=>{this.inputField.innerHTML=a},1e3)}}alignText(i){document.execCommand(i,!1,"")}selectFont(){this.action("fontName",this.selectElement.value)}toggleSetting(i,n){n.classList.contains("active")?n.classList.remove("active"):n.classList.add("active"),this.action(i)}}try{window.customElements.define("stupid-content-editor",h)}catch{}e.StupidContentEditor=h,Object.defineProperties(e,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
