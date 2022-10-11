import alignCenter from "./icons/alignCenter";
import alignLeft from "./icons/alignLeft";
import alignRight from "./icons/alignRight";
import justify from "./icons/justify";
import markup from "./content-editor.template.html?raw";

const template = document.createElement("template");

template.innerHTML = `${markup
  .replace("${alignLeft}", alignLeft)
  .replace("${alignRight}", alignRight)
  .replace("${alignCenter}", alignCenter)
  .replace("${justify}", justify)}`;

export class StupidContentEditor extends HTMLElement {
  inputField!: HTMLDivElement;
  boldButton!: HTMLButtonElement;
  selectElement!: HTMLSelectElement;
  italicButton!: HTMLButtonElement;
  alignLeft!: HTMLButtonElement;
  alignRight!: HTMLButtonElement;
  alignCenter!: HTMLButtonElement;
  justify!: HTMLButtonElement;
  static get observedAttributes() {
    return ["trustedhtml"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot!.appendChild(template.content.cloneNode(true));
  }
  connectedCallback(): void {
    this.inputField = this.shadowRoot!.querySelector(".input-field")!;
    this.boldButton = this.shadowRoot!.querySelector(".bold")!;
    this.selectElement = this.shadowRoot!.querySelector("select")!;
    this.italicButton = this.shadowRoot!.querySelector(".italic")!;
    this.alignLeft = this.shadowRoot!.querySelector(".alignLeft")!;
    this.alignRight = this.shadowRoot!.querySelector(".alignRight")!;
    this.alignCenter = this.shadowRoot!.querySelector(".alignCenter")!;
    this.justify = this.shadowRoot!.querySelector(".justify")!;
    this.setupListeners();
  }
  action(command: string, value: string | undefined = undefined) {
    document.execCommand(command, false, value);
  }

  setupListeners() {
    this.selectElement.onchange = this.selectFont.bind(this);
    this.boldButton.onclick = () => this.toggleSetting("bold", this.boldButton);
    this.italicButton.onclick = () =>
      this.toggleSetting("italic", this.italicButton);

    this.alignRight.onclick = () => this.alignText("justifyRight");
    this.alignLeft.onclick = () => this.alignText("justifyLeft");
    this.alignCenter.onclick = () => this.alignText("justifyCenter");
    this.justify.onclick = () => this.alignText("justifyFull");

    this.inputField.onpaste = (clipBoardEvent) => {
      clipBoardEvent.preventDefault();
      document.execCommand(
        "insertText",
        false,
        clipBoardEvent.clipboardData?.getData("text/plain")
      );
    };
  }

  attributeChangedCallback(name: string, _: string, newValue: string) {
    if (name === "trustedhtml") {
      try {
        this.inputField.innerHTML = newValue;
      } catch {
        setTimeout(() => {
          this.inputField.innerHTML = newValue;
        }, 1000)
      }
    }
  }

  alignText(command: string) {
    document.execCommand(command, false, "");
  }

  selectFont() {
    this.action("fontName", this.selectElement.value);
  }

  toggleSetting(setting: "bold" | "italic", button: HTMLButtonElement) {
    button.classList.contains("active")
      ? button.classList.remove("active")
      : button.classList.add("active");
    this.action(setting);
  }
}
try {
  window.customElements.define("stupid-content-editor", StupidContentEditor);
} catch { }
