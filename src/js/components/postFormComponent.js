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
    <form class="flex flex-col gap-2 mt-6 mb-6 sm:text-lg" name="postForm" enctype="multipart/form-data">
        <h1 class="text-lg mb-6 sm:text-xl">
        ${this.getAttribute("heading") || "Write post"}
        </h1>

        <label for="title">Post title</label>
        <input required type="text" id="title" name="title" class="mb-2 form-input" />

        <label for="body" class="mt-3">Post content</label>
        <textarea name="body" id="body" class="mb-4 form-input"></textarea>

        <label for="img-url">Add Image</label>
        <input type="text" id="img-url" name="img-url" class="mb-4 form-input">

        <label for="img-alt">Add a descriptive image text</label>
        <input type="text" id="img-alt" name="img-alt" class="mb-4 form-input">

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
