class Course {
  constructor(name, filename) {
    this.name = name;
    this.filename = filename;
  }

  template() {
    return `
      <div class="course">
        <a href="/statics/assets/images/certificates/${this.filename}" class="link">
          <img
          src="/statics/assets/images/certificates/${this.filename}"
          alt="${this.name}"
          loading="lazy"
          />
          <h4 class="courses-subtitle">${this.name}</h4>
        </a>
      </div>
    `;
  }

  render(node) {
    node.innerHTML += this.template();
  }
}
