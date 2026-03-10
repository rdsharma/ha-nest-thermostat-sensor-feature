const FEATURE_TYPE = "nest-thermostat-sensor-feature";
const FEATURE_NAME = `${FEATURE_TYPE}`;
const EDITOR_NAME = `${FEATURE_TYPE}-editor`;
const CUSTOM_TYPE = `custom:${FEATURE_TYPE}`;
const THERMOSTAT_OPTION = "Thermostat";
const PRESET_NONE = "none";
const PRESET_ECO = "eco";
const FAN_OFF = "off";
const FAN_ON = "on";
const HVAC_LABELS = {
  off: "Off",
  heat: "Heat",
  cool: "Cool",
  heat_cool: "Heat/Cool",
  auto: "Auto",
};
const FAN_TIMER_OPTIONS = [
  { minutes: 15, label: "15 min" },
  { minutes: 30, label: "30 min" },
  { minutes: 45, label: "45 min" },
  { minutes: 60, label: "1 hr" },
  { minutes: 120, label: "2 hr" },
  { minutes: 240, label: "4 hr" },
];

const CSS = `
  :host {
    display: block;
  }

  .wrap {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-top: 6px;
  }

  .controls {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .control-group {
    display: flex;
    flex-direction: column;
    gap: 7px;
    padding: 9px 11px;
    border-radius: 14px;
    background: color-mix(in srgb, var(--card-background-color) 94%, var(--primary-background-color));
    border: 1px solid var(--divider-color);
  }

  .control-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  .control-title {
    color: var(--secondary-text-color);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-size: 0.7rem;
  }

  .control-value {
    color: var(--primary-text-color);
    font-size: 0.84rem;
    font-weight: 600;
  }

  .segmented {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
  }

  .segment-button,
  .action-button,
  .choice-button {
    border: 1px solid var(--divider-color);
    border-radius: 12px;
    background: transparent;
    color: var(--primary-text-color);
    padding: 9px 11px;
    font: inherit;
    cursor: pointer;
    transition: border-color 120ms ease, background 120ms ease;
  }

  .segment-button.active,
  .action-button.primary,
  .choice-button.active {
    border-color: var(--primary-color);
    background: color-mix(in srgb, var(--primary-color) 14%, var(--card-background-color));
    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--primary-color) 45%, transparent);
  }

  .segment-button:disabled,
  .action-button:disabled,
  .choice-button:disabled {
    opacity: 0.6;
    cursor: default;
  }

  .choice-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(88px, 1fr));
    gap: 8px;
  }

  .choice-button {
    text-align: center;
  }

  .choice-button.stop {
    border-style: dashed;
  }

  .control-hint {
    color: var(--secondary-text-color);
    font-size: 0.78rem;
    line-height: 1.3;
  }

  .chips {
    display: flex;
    overflow-x: auto;
    scrollbar-width: none;
    gap: 8px;
    padding-bottom: 2px;
    scroll-snap-type: x proximity;
  }

  .chips::-webkit-scrollbar {
    display: none;
  }

  .chips.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(132px, 1fr));
    overflow: visible;
  }

  .summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    color: var(--secondary-text-color);
    font-size: 0.82rem;
    line-height: 1.3;
  }

  .summary-label {
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-size: 0.7rem;
  }

  .summary-value {
    color: var(--primary-text-color);
    font-weight: 600;
  }

  .chip {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    min-width: 138px;
    min-height: 58px;
    padding: 9px 11px;
    border-radius: 16px;
    border: 1px solid var(--divider-color);
    background: color-mix(in srgb, var(--card-background-color) 88%, var(--primary-background-color));
    color: var(--primary-text-color);
    cursor: pointer;
    text-align: left;
    transition: border-color 120ms ease, background 120ms ease, transform 120ms ease;
    scroll-snap-align: start;
  }

  .chip:hover {
    border-color: var(--primary-color);
    transform: translateY(-1px);
  }

  .chip.active {
    border-color: var(--primary-color);
    background: color-mix(in srgb, var(--primary-color) 14%, var(--card-background-color));
    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--primary-color) 45%, transparent);
  }

  .chip:disabled {
    opacity: 0.6;
    cursor: default;
    transform: none;
  }

  .name {
    font-size: 0.88rem;
    font-weight: 600;
    line-height: 1.2;
  }

  .temp {
    font-size: 1.02rem;
    letter-spacing: -0.02em;
    line-height: 1.1;
  }

  .meta {
    font-size: 0.68rem;
    color: var(--secondary-text-color);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .status {
    font-size: 0.84rem;
    color: var(--secondary-text-color);
  }

  .editor {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .label {
    font-size: 0.9rem;
    font-weight: 600;
  }

  select,
  input {
    padding: 10px 12px;
    border-radius: 12px;
    border: 1px solid var(--divider-color);
    background: var(--card-background-color);
    color: var(--primary-text-color);
    font: inherit;
  }

  .hint {
    color: var(--secondary-text-color);
    font-size: 0.84rem;
    line-height: 1.4;
  }

  @media (max-width: 600px) {
    .chip {
      min-width: 128px;
    }

    .summary {
      flex-direction: column;
      align-items: flex-start;
      gap: 2px;
    }

    .choice-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
`;

const formatTemperature = (value, unit) => {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return "--";
  }

  const number = Number(value);
  const rounded = Math.round(number * 10) / 10;
  const normalized = Number.isInteger(rounded) ? rounded.toFixed(0) : rounded.toFixed(1);
  return `${normalized}${unit}`;
};

const convertTemperature = (value, fromUnit, toUnit) => {
  if (value === null || value === undefined) {
    return null;
  }
  if (!fromUnit || !toUnit || fromUnit === toUnit) {
    return Number(value);
  }
  if (fromUnit === "\u00b0C" && toUnit === "\u00b0F") {
    return (Number(value) * 9) / 5 + 32;
  }
  if (fromUnit === "\u00b0F" && toUnit === "\u00b0C") {
    return ((Number(value) - 32) * 5) / 9;
  }
  return Number(value);
};

const stopEvent = (ev) => {
  ev.stopPropagation();
};

const fireEvent = (node, type, detail) => {
  node.dispatchEvent(
    new CustomEvent(type, {
      detail,
      bubbles: true,
      composed: true,
    }),
  );
};

class NestThermostatSensorFeature extends HTMLElement {
  static getStubConfig() {
    return {
      type: CUSTOM_TYPE,
      select_entity: "",
      layout: "compact",
    };
  }

  static async getConfigElement() {
    return document.createElement(EDITOR_NAME);
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._config = {};
    this._busyOption = null;
    this._busyAction = false;
  }

  setConfig(config) {
    this._config = { type: CUSTOM_TYPE, ...(config || {}) };
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    this._render();
  }

  set stateObj(stateObj) {
    this._stateObj = stateObj;
    this._render();
  }

  _buildEntries() {
    const climate = this._stateObj;
    const selectState = this._hass?.states?.[this._config.select_entity];

    if (!climate || !selectState) {
      return [];
    }

    const targetUnit =
      climate.attributes.temperature_unit ||
      this._hass?.config?.unit_system?.temperature ||
      "\u00b0C";
    const sensorUnit = selectState.attributes.sensor_temperature_unit || "\u00b0C";
    const sensorOptions = Array.isArray(selectState.attributes.sensor_options)
      ? selectState.attributes.sensor_options
      : [];

    const entries = [
      {
        key: THERMOSTAT_OPTION,
        option: THERMOSTAT_OPTION,
        label: this._config.thermostat_label || THERMOSTAT_OPTION,
        temperature: climate.attributes.current_temperature ?? null,
        active: selectState.state === THERMOSTAT_OPTION,
      },
    ];

    for (const sensor of sensorOptions) {
      entries.push({
        key: sensor.sensor_id || sensor.option || sensor.name,
        option: sensor.option || sensor.name,
        label: sensor.name || sensor.option || sensor.sensor_id,
        temperature: convertTemperature(sensor.temperature, sensorUnit, targetUnit),
        active: selectState.state === (sensor.option || sensor.name),
      });
    }

    const activeEntry =
      entries.find((entry) => entry.active) ||
      entries.find((entry) => entry.option === selectState.state) ||
      entries[0];

    return { entries, targetUnit, selectState, activeEntry };
  }

  async _handleSelect(option, ev) {
    stopEvent(ev);
    if (!this._hass || !this._config.select_entity || this._busyOption) {
      return;
    }

    this._busyOption = option;
    this._render();

    try {
      await this._hass.callService("select", "select_option", {
        entity_id: this._config.select_entity,
        option,
      });
    } finally {
      this._busyOption = null;
      this._render();
    }
  }

  async _handlePreset(presetMode, ev) {
    stopEvent(ev);
    if (!this._hass || !this._stateObj || this._busyAction) {
      return;
    }

    this._busyAction = true;
    this._render();

    try {
      await this._hass.callService("climate", "set_preset_mode", {
        entity_id: this._stateObj.entity_id,
        preset_mode: presetMode,
      });
    } finally {
      this._busyAction = false;
      this._render();
    }
  }

  async _handleHvacMode(hvacMode, ev) {
    stopEvent(ev);
    if (!this._hass || !this._stateObj || this._busyAction) {
      return;
    }

    this._busyAction = true;
    this._render();

    try {
      await this._hass.callService("climate", "set_hvac_mode", {
        entity_id: this._stateObj.entity_id,
        hvac_mode: hvacMode,
      });
    } finally {
      this._busyAction = false;
      this._render();
    }
  }

  async _handleFanTimer(durationMinutes, ev) {
    stopEvent(ev);
    if (!this._hass || !this._config.select_entity || this._busyAction) {
      return;
    }

    this._busyAction = true;
    this._render();

    try {
      await this._hass.callService("nest_protect", "set_fan_timer", {
        select_entity: this._config.select_entity,
        duration_minutes: durationMinutes,
      });
    } finally {
      this._busyAction = false;
      this._render();
    }
  }

  _buildClimateControls() {
    const climate = this._stateObj;
    const selectState = this._hass?.states?.[this._config.select_entity];
    if (!climate || !selectState) {
      return null;
    }

    const presetModes = Array.isArray(climate.attributes.preset_modes)
      ? climate.attributes.preset_modes
      : [];
    const hvacModes = Array.isArray(climate.attributes.hvac_modes)
      ? climate.attributes.hvac_modes
      : [];
    const fanModes = Array.isArray(climate.attributes.fan_modes)
      ? climate.attributes.fan_modes
      : [];
    const services = this._hass?.services || {};

    return {
      supportsHvac: hvacModes.length > 0,
      hvacModes,
      hvacMode: climate.state,
      supportsPreset:
        presetModes.includes(PRESET_NONE) && presetModes.includes(PRESET_ECO),
      presetMode: climate.attributes.preset_mode || PRESET_NONE,
      supportsFanTimer:
        fanModes.includes(FAN_ON) &&
        fanModes.includes(FAN_OFF) &&
        Boolean(selectState.attributes.thermostat_id) &&
        Boolean(services.nest_protect?.set_fan_timer),
      fanMode: climate.attributes.fan_mode || FAN_OFF,
    };
  }

  _renderControls(container, controls) {
    if (!controls || (!controls.supportsPreset && !controls.supportsFanTimer)) {
      return;
    }

    const controlsRoot = document.createElement("div");
    controlsRoot.className = "controls";

    if (controls.supportsHvac) {
      const hvacGroup = document.createElement("div");
      hvacGroup.className = "control-group";

      const header = document.createElement("div");
      header.className = "control-header";

      const title = document.createElement("div");
      title.className = "control-title";
      title.textContent = "HVAC";

      const value = document.createElement("div");
      value.className = "control-value";
      value.textContent = HVAC_LABELS[controls.hvacMode] || controls.hvacMode;
      header.append(title, value);

      const grid = document.createElement("div");
      grid.className = "choice-grid";

      for (const hvacMode of controls.hvacModes) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = `choice-button${controls.hvacMode === hvacMode ? " active" : ""}`;
        button.disabled = this._busyAction;
        button.textContent = HVAC_LABELS[hvacMode] || hvacMode;
        button.addEventListener("click", this._handleHvacMode.bind(this, hvacMode));
        button.addEventListener("pointerdown", stopEvent);
        button.addEventListener("mousedown", stopEvent);
        grid.append(button);
      }

      hvacGroup.append(header, grid);
      controlsRoot.append(hvacGroup);
    }

    if (controls.supportsPreset) {
      const presetGroup = document.createElement("div");
      presetGroup.className = "control-group";

      const header = document.createElement("div");
      header.className = "control-header";

      const title = document.createElement("div");
      title.className = "control-title";
      title.textContent = "Mode";

      const value = document.createElement("div");
      value.className = "control-value";
      value.textContent = controls.presetMode === PRESET_ECO ? "Eco" : "Normal";
      header.append(title, value);

      const segmented = document.createElement("div");
      segmented.className = "segmented";

      for (const [presetMode, label] of [
        [PRESET_NONE, "Normal"],
        [PRESET_ECO, "Eco"],
      ]) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = `segment-button${controls.presetMode === presetMode ? " active" : ""}`;
        button.disabled = this._busyAction;
        button.textContent = label;
        button.addEventListener("click", this._handlePreset.bind(this, presetMode));
        button.addEventListener("pointerdown", stopEvent);
        button.addEventListener("mousedown", stopEvent);
        segmented.append(button);
      }

      presetGroup.append(header, segmented);
      controlsRoot.append(presetGroup);
    }

    if (controls.supportsFanTimer) {
      const fanGroup = document.createElement("div");
      fanGroup.className = "control-group";

      const header = document.createElement("div");
      header.className = "control-header";

      const title = document.createElement("div");
      title.className = "control-title";
      title.textContent = "Fan";

      const value = document.createElement("div");
      value.className = "control-value";
      value.textContent = controls.fanMode === FAN_ON ? "Running" : "Off";
      header.append(title, value);

      const hint = document.createElement("div");
      hint.className = "control-hint";
      hint.textContent =
        controls.fanMode === FAN_ON
          ? "Tap a new duration to restart the timer, or stop the fan."
          : "Tap a duration to run the fan for that long.";

      const grid = document.createElement("div");
      grid.className = "choice-grid";

      for (const optionDef of FAN_TIMER_OPTIONS) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "choice-button";
        button.disabled = this._busyAction;
        button.textContent = optionDef.label;
        button.addEventListener("click", this._handleFanTimer.bind(this, optionDef.minutes));
        button.addEventListener("pointerdown", stopEvent);
        button.addEventListener("mousedown", stopEvent);
        grid.append(button);
      }

      const stopButton = document.createElement("button");
      stopButton.type = "button";
      stopButton.className = "choice-button stop";
      stopButton.disabled = this._busyAction || controls.fanMode !== FAN_ON;
      stopButton.textContent = "Stop";
      stopButton.addEventListener("click", this._handleFanTimer.bind(this, 0));
      stopButton.addEventListener("pointerdown", stopEvent);
      stopButton.addEventListener("mousedown", stopEvent);
      grid.append(stopButton);

      fanGroup.append(header, hint, grid);
      controlsRoot.append(fanGroup);
    }

    container.append(controlsRoot);
  }

  _render() {
    if (!this.shadowRoot) {
      return;
    }

    const style = `<style>${CSS}</style>`;

    if (!this._config?.select_entity) {
      this.shadowRoot.innerHTML = `${style}<div class="status">Select entity not configured.</div>`;
      return;
    }

    if (!this._hass || !this._stateObj) {
      this.shadowRoot.innerHTML = `${style}<div class="status">Waiting for thermostat state…</div>`;
      return;
    }

    const selectState = this._hass.states[this._config.select_entity];
    if (!selectState) {
      this.shadowRoot.innerHTML = `${style}<div class="status">Select entity not found: ${this._config.select_entity}</div>`;
      return;
    }

    const built = this._buildEntries();
    const entries = built.entries;
    const targetUnit = built.targetUnit;
    const activeEntry = built.activeEntry;
    const controls = this._buildClimateControls();
    const unavailable = selectState.state === "unavailable" || selectState.state === "unknown";
    const layout = this._config.layout === "grid" ? "grid" : "compact";

    this.shadowRoot.innerHTML = `${style}<div class="wrap"><div class="feature-body"></div></div>`;
    const body = this.shadowRoot.querySelector(".feature-body");
    this._renderControls(body, controls);

    body.insertAdjacentHTML(
      "beforeend",
      `<div class="summary"><div><div class="summary-label">Temperature Sensors</div><div class="summary-value">Using ${activeEntry?.label || selectState.state}</div></div><div>${formatTemperature(activeEntry?.temperature ?? null, targetUnit)}</div></div><div class="chips ${layout}"></div>`,
    );
    const chips = this.shadowRoot.querySelector(".chips");

    for (const entry of entries) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `chip${entry.active ? " active" : ""}`;
      button.disabled = unavailable || this._busyOption !== null;
      button.addEventListener("click", this._handleSelect.bind(this, entry.option));
      button.addEventListener("pointerdown", stopEvent);
      button.addEventListener("mousedown", stopEvent);

      const meta = document.createElement("div");
      meta.className = "meta";
      meta.textContent = entry.active ? "Active" : "Available";

      const name = document.createElement("div");
      name.className = "name";
      name.textContent = entry.label;

      const temp = document.createElement("div");
      temp.className = "temp";
      temp.textContent = formatTemperature(entry.temperature, targetUnit);

      button.append(meta, name, temp);
      chips.append(button);
    }
  }
}

class NestThermostatSensorFeatureEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._config = {};
  }

  setConfig(config) {
    this._config = config || {};
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    this._render();
  }

  _handleValueChanged(key, value) {
    const next = { ...this._config, type: CUSTOM_TYPE };

    if (value) {
      next[key] = value;
    } else {
      delete next[key];
    }

    this._config = next;
    fireEvent(this, "config-changed", { config: next });
    this._render();
  }

  _render() {
    if (!this.shadowRoot) {
      return;
    }

    const selectEntities = Object.keys(this._hass?.states || {})
      .filter((entityId) => {
        if (!entityId.startsWith("select.")) {
          return false;
        }
        const state = this._hass.states[entityId];
        return Array.isArray(state.attributes?.sensor_options);
      })
      .sort();

    this.shadowRoot.innerHTML = `${styleTag()}<div class="editor"></div>`;
    const root = this.shadowRoot.querySelector(".editor");

    const selectField = document.createElement("label");
    selectField.className = "field";

    const selectLabel = document.createElement("div");
    selectLabel.className = "label";
    selectLabel.textContent = "Active sensor select";

    const select = document.createElement("select");
    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "Choose a select entity";
    select.append(placeholder);
    for (const entityId of selectEntities) {
      const state = this._hass.states[entityId];
      const option = document.createElement("option");
      option.value = entityId;
      option.textContent = state.attributes.friendly_name
        ? `${state.attributes.friendly_name} (${entityId})`
        : entityId;
      if (entityId === this._config.select_entity) {
        option.selected = true;
      }
      select.append(option);
    }
    select.addEventListener("change", (ev) => {
      this._handleValueChanged("select_entity", ev.target.value);
    });

    const selectHint = document.createElement("div");
    selectHint.className = "hint";
    selectHint.textContent =
      selectEntities.length > 0
        ? "Choose the Nest Protect Active temperature sensor select entity linked to this thermostat."
        : "No compatible thermostat sensor select entities were found yet.";

    selectField.append(selectLabel, select, selectHint);
    root.append(selectField);

    const labelField = document.createElement("label");
    labelField.className = "field";

    const label = document.createElement("div");
    label.className = "label";
    label.textContent = "Thermostat label";

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Thermostat";
    input.value = this._config.thermostat_label || "";
    input.addEventListener("input", (ev) => {
      this._handleValueChanged("thermostat_label", ev.target.value.trim());
    });

    labelField.append(label, input);
    root.append(labelField);

    const layoutField = document.createElement("label");
    layoutField.className = "field";

    const layoutLabel = document.createElement("div");
    layoutLabel.className = "label";
    layoutLabel.textContent = "Layout";

    const layoutSelect = document.createElement("select");
    for (const [value, labelText] of [
      ["compact", "Compact row"],
      ["grid", "Grid"],
    ]) {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = labelText;
      if ((this._config.layout || "compact") === value) {
        option.selected = true;
      }
      layoutSelect.append(option);
    }
    layoutSelect.addEventListener("change", (ev) => {
      this._handleValueChanged("layout", ev.target.value);
    });

    const layoutHint = document.createElement("div");
    layoutHint.className = "hint";
    layoutHint.textContent =
      "Compact keeps the thermostat card shorter. The recommended setup uses only this custom feature and no built-in thermostat features.";

    layoutField.append(layoutLabel, layoutSelect, layoutHint);
    root.append(layoutField);
  }
}

const styleTag = () => `<style>${CSS}</style>`;

if (!customElements.get(FEATURE_NAME)) {
  customElements.define(FEATURE_NAME, NestThermostatSensorFeature);
}

if (!customElements.get(EDITOR_NAME)) {
  customElements.define(EDITOR_NAME, NestThermostatSensorFeatureEditor);
}

window.customCardFeatures = window.customCardFeatures || [];
if (!window.customCardFeatures.some((feature) => feature.type === FEATURE_TYPE)) {
  window.customCardFeatures.push({
    type: FEATURE_TYPE,
    name: "Nest Temperature Sensors",
    description: "Show thermostat and remote sensor temperatures and switch active Nest sensors.",
    supported: (stateObj) => stateObj?.entity_id?.startsWith("climate."),
    configurable: true,
  });
}

console.info(
  `%c NEST THERMOSTAT SENSOR FEATURE %c ${"loaded"} `,
  "color: white; background: #355c7d; font-weight: 700;",
  "color: #355c7d; background: white; font-weight: 700;",
);
