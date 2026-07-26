class PreviewManager {
  constructor() {
    this.iframe = null;
    this.url = null;
  }

  attach(iframe) {
    this.iframe = iframe;

    if (this.url) {
      this.iframe.src = this.url;
    }
  }

  update(url) {
    this.url = url;

    if (this.iframe) {
      this.iframe.src = url;
    }
  }

  clear() {
    if (this.iframe) {
      this.iframe.src = "about:blank";
    }

    this.url = null;
  }
}

export default new PreviewManager();