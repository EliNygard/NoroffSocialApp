export class PostFormComponent extends HTMLElement {
  constructor() {
    super();
    // omit shadow dom to be able to use tailwind in the component, using light DOM instead
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <form class="flex flex-col gap-2 mt-6 sm:text-lg" name="postForm" enctype="multipart/form-data">
        <h1 class="text-lg mb-6 sm:text-xl">
        ${this.getAttribute("heading") || "Write post"}
        </h1>

        <label for="title">Post title</label>
        <input required type="text" id="title" name="title" class="p-2 mb-2 border rounded text-stone-700" />

        <label for="body" class="mt-3">Post content</label>
        <textarea name="body" id="body" class="p-2 mb-4 border rounded text-stone-700"></textarea>
        <button type="submit" class="mt-3 btn btn-primary btn-primary-hover max-w-3xl sm:max-w-44">
          ${this.getAttribute("button-text") || "Submit"}
        </button>
      </form>
    `;
  }

  get form() {
    return this.querySelector("form");
  }
}

customElements.define("post-form", PostFormComponent);
