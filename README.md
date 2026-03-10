# Nest Thermostat Sensor Feature

Adds a custom thermostat card feature for Home Assistant that shows:

- the thermostat's current temperature
- the current temperature for each Nest remote sensor
- one-tap switching between the active temperature sensors

This feature is designed to work with the thermostat sensor-switching backend changes in [`ha-nest-protect`](https://github.com/rdsharma/ha-nest-protect-thermostat-switching).

## Installation

1. Add this repository to HACS as a `Dashboard` repository.
2. Install it from HACS.
3. Add the feature to a thermostat card.

## Recommended Thermostat Card

This keeps the built-in thermostat dial and standard HVAC range control, while the custom feature renders Nest-aware controls for:

- Normal vs Eco
- fan timer duration and start/stop
- thermostat and remote sensor temperatures
- one-tap sensor switching

```yaml
type: thermostat
entity: climate.living_room
features:
  - type: climate-hvac-modes
    hvac_modes:
      - heat_cool
      - heat
      - cool
      - "off"
  - type: custom:nest-thermostat-sensor-feature
    select_entity: select.living_room_active_temperature_sensor
    layout: compact
```

## Minimal Example

```yaml
type: thermostat
entity: climate.living_room
features:
  - type: custom:nest-thermostat-sensor-feature
    select_entity: select.living_room_active_temperature_sensor
```

## Notes

- The feature reads the thermostat's own current temperature from the climate entity.
- It reads the remote sensor temperatures from the linked `select` entity attributes exposed by the custom Nest Protect backend.
- Remote sensor temperatures are converted to the thermostat card's displayed unit when needed.
- When the thermostat supports them, the feature also renders Nest-aware `Normal/Eco` and fan timer controls.
- The fan timer controls use the companion `nest_protect.set_fan_timer` backend service.
- `layout: compact` is recommended and is intended to be used with the built-in HVAC thermostat feature.
- `layout: grid` is available if you prefer larger sensor tiles.
- This feature extends the thermostat card, but it does not patch the default thermostat card globally. You still need to add it in the card configuration.
