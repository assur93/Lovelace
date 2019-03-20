class ImgLink extends HTMLElement {
  set hass(hass) {
    if (!this.config.url) {
      this.config.url = "#";
    } 
    this.innerHTML =`
      <style>
        a {
          align-items: center;
          color: var(--primary-color);
          text-decoration-line: none;
        }
        div {
          flex: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        div .main {
          display: flex;
        }
      </style>
      <div class="main">	      
          
          <a href="${this.config.url}" target="_blank">
		  <img src="${this.config.image}">
		  </a>
        
      </div>
    `;
  }
  setConfig(config) {
    this.config = config;
  }

  getCardSize() {
    return 1;
  }
}
customElements.define('img-link', ImgLink);