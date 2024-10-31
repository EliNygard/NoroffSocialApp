export class CustomButton extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    const button = document.createElement("a");
    
    button.textContent = this.getAttribute("text") || "Button";
    button.href = this.getAttribute("href") || "#";

    shadow.appendChild(button);
  }

  static get observedAttributes() {
    return ["text", "href"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "text") {
      this.shadowRoot.querySelector("a").textContent = newValue;
    } else if (name === "href") {
      this.shadowRoot.querySelector("a").href = newValue;
    }
  }
}

customElements.define("custom-button", CustomButton);
