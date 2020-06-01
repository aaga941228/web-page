class Course {
  constructor(name, filename) {
    this.name = name;
    this.filename = filename;
  }

  template() {
    return `
      <div class="col-12 col-md-4 col-xl-3">
        <img class="card-img-top image-fit" data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail"  alt="Thumbnail [100%x225]" style="height: 225px; width: 100%; display: block;" src="/statics/assets/images/certificates/${this.filename}" data-holder-rendered="true">
        <div class="card-body">
          <p class="card-text">${this.name}</p>
          <div class="btn-group">
            <button type="button" class="btn btn-sm btn-outline-secondary"><a href="/statics/assets/images/certificates/${this.filename}" target="_blank">View</a></button>
          </div>
        </div>
      </div>
    `;
  }

  render(node) {
    node.innerHTML += this.template();
  }
}
