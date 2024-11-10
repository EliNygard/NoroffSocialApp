export class CustomButton extends HTMLElement {
  constructor() {
    super();

    const button = document.createElement("a");
    button.textContent = this.getAttribute("text") || "Button";
    button.href = this.getAttribute("href") || "#";

    this.appendChild(button);
  }

  static get observedAttributes() {
    return ["text", "href"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const button = this.querySelector("a");
    if (name === "text") {
      button.textContent = newValue;
    } else if (name === "href") {
      button.href = newValue;
    }
  }
}

customElements.define("custom-button", CustomButton);
