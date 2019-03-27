class Masimax extends Polymer.Element {
	static get template() {
		return Polymer.html`
		<style>
			:host {
				display: flex;
				align-items: center;
			}
			.flex {
				flex: 1;
				margin-left: 15px;
				margin-right: 10px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				min-width: 0;
			}
			.iconContainer {
				position: relative;
				margin-left: 10px;
				display: inline-block;
				width: 40px;
				border-radius: 50%;
				height: 40px;
				text-align: center;
				background-size: cover;
				line-height: 40px;
			}
			
		</style>
		<div class="iconContainer">
			<ha-icon icon='[[icon]]' style="color: [[color]]">
		    </ha-icon>
		</div>
		<div class="flex">
			<div class="info">
				[[displayName()]]
			</div>
			<div class="state">
				[[displayState()]]
			</div>
		</div>
		`
	}

	static get properties() {
		return {
			_hass: Object,
			_config: Object,
			stateObj: { type: Object, value: null },
			value: Number,
			color: { type: String, value: 'rgb(0,0,160)'},
			icon: { type: String, value: 'mdi:door-open'}
		};
	}

	setConfig(config) {
		this._config = config;
		this.color = config.color || "rgb(0,0,160)";
		this.icon = config.icon || "mdi:door-open";
	}

	roundedState(state) {
		return Math.round(state);
	}

	displayName() {
		return this._config.name || this.stateObj.attributes.friendly_name;
	}
	
	displayState() {
		return this._config.state || "Abierta";
	}

	set hass(hass) {
		this._hass = hass;
		this.stateObj = this._config.entity in hass.states ? hass.states[this._config.entity] : null;
	}

	stopPropagation(ev) {
		ev.stopPropagation();
	}
}

customElements.define('custom-line', Masimax);