class BatteryEnt extends Polymer.Element {
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
			.good {
				color: var(--label-badge-green);
			}
			.warning {
				color: var(--label-badge-yellow);
			}
			.critical {
				color: var(--label-badge-red);
			}
		</style>
		<div class="iconContainer">
			<ha-icon
				class$="[[_config.batteryLevel]]"
				icon=[[_config.icon]]
			></ha-icon>
		</div>
		<div class="flex">
			<div class="info">
				[[displayName()]]
			</div>
			<div class="state">
				[[roundedState(stateObj.state)]] [[displayUnit()]]
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
		};
	}

	setConfig(config) {
		this._config = config;
	}

	roundedState(state) {
		return Math.round(state);
	}

	displayName() {
		return this._config.name || this.stateObj.attributes.friendly_name;
	}
	
	displayUnit() {
		return this._config.unit || this.stateObj.attributes.unit_of_measurement;
	}

	setIcon() {
		const state = parseInt(this.stateObj.state, 10);
		const roundedLevel = Math.round(state / 10) * 10;
		switch (roundedLevel) {
			case 100:
				this._config.icon = 'mdi:battery'; // mdi:battery should have an alias of mdi:battery-100, doesn't work in current HASS
				break;
			case 0:
				this._config.icon = 'mdi:battery-outline'; // mdi:battery-outline should have an alias of mdi:battery-0, doesn't work in current HASS
				break;
			default:
				this._config.icon = 'mdi:battery-' + roundedLevel;
		}
	}

	setColor() {
		const state = parseInt(this.stateObj.state, 10);
		const warningLevel = this._config.warning || 35;
		const criticalLevel = this._config.critical || 16;

		if (state > warningLevel) {
			this._config.batteryLevel = 'good';
		}
		else if (state > criticalLevel) {
			this._config.batteryLevel = 'warning';
		}
		else {
			this._config.batteryLevel = 'critical';
		}
	}

	set hass(hass) {
		this._hass = hass;
		this.stateObj = this._config.entity in hass.states ? hass.states[this._config.entity] : null;
		this.setIcon();
		this.setColor();
	}

	stopPropagation(ev) {
		ev.stopPropagation();
	}
}

customElements.define('custom-battery', BatteryEnt);