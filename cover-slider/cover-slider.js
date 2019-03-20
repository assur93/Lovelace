class CoverSlider extends Polymer.Element {
  static get template() {
        return Polymer.html`
        <style>
            :host {
                display: flex;
                align-items: center;
            }

            .flex {
                flex: 1;
                display: flex;
                justify-content: space-between;
                align-items: center;
                min-width: 0;
            }

            ha-paper-slider {
                width: 100%;
            }
        </style>
        <div class="flex"
            on-click="stopPropagation">
            <ha-paper-slider
                min="[[min]]" 
                max="[[max]]"
                value="{{value}}"
                ignore-bar-touch
                on-change="selectedValue">
            </ha-paper-slider>
        </div>
        `
    }

  static get properties() {
    return {
      _hass: Object,
      _config: Object,
      showValue: { type: Boolean, value: false },
      stateObj: { type: Object, value: null },
      min: { type: Number, value: 0 },
      max: { type: Number, value: 100 },
      step: { type: Number, value: 5 },
      attribute: { type: String, value: 'position' },
      attribute_back: { type: String, value: 'current_position' },
      value: Number,
	  has_slider: { type: Boolean, value: 'true' }
    };
  }

  setConfig(config)
  {
    this._config = config;
    this.showValue = config.show_value || false;
	this.has_slider = config.has_slider || true;
	this.min = config.min || 0;
	this.max = config.max || 100;
	this.step = config.step || 5;
  }

  statusString(stateObj) {
    let l18n = this._hass.resources[this._hass.language];
    if(this.stateObj.attributes[this.attribute_back] === 0) {
      return l18n['state.cover.open'];
    } else if (this.stateObj.attributes[this.attribute_back] === 100) {
      return l18n['state.cover.closed'];
    } else {
      return Math.ceil(this.stateObj.attributes[this.attribute_back]).toString(10);
    }
  }

  set hass(hass) {
    this._hass = hass;
    this.stateObj = this._config.entity in hass.states ? hass.states[this._config.entity] : null;
    if(this.stateObj) {
      this.value = this.stateObj.attributes[this.attribute_back]
    }
  }

  selectedValue(ev) {
    const value = Math.ceil(parseInt(this.value, 10));
    const param = {entity_id: this.stateObj.entity_id };
    if(Number.isNaN(value)) return;
    if(value === 0) {
    } else {
      param[this.attribute] = value;
      this._hass.callService('cover', 'set_cover_position', param);
    }
  }
  
  open_cover(ev) {
    const param = {entity_id: this.stateObj.entity_id };
    this._hass.callService('cover', 'open_cover', param);
	this.stopPropagation(ev);
  }

  close_cover(ev) {
    const param = {entity_id: this.stateObj.entity_id };
    this._hass.callService('cover', 'close_cover', param);
	this.stopPropagation(ev);
  }
  
  stopPropagation(ev) {
    ev.stopPropagation();
  }
}

customElements.define('cover-slider', CoverSlider);