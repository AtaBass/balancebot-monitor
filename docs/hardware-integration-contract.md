# Proposed hardware integration contract

Status: proposal pending agreement with the electronics/control teams. No physical
hardware or specification PDF is available. The app monitors/evaluates; the glove
remains the movement controller. No movement command API exists here.

| Field               | Requirement               | Unit / meaning                                                         |
| ------------------- | ------------------------- | ---------------------------------------------------------------------- |
| timestamp           | Required normalized field | Robot sample time, Unix epoch milliseconds; hardware clock mapping TBD |
| tiltAngleDeg        | Required                  | Finite degrees; axis, sign and reference zero TBD                      |
| charging            | Required                  | Boolean indicating charging; electrical criterion TBD                  |
| batteryLevelPercent | Optional                  | Finite 0–100 percent; omit when unsupported                            |

JSON is a candidate envelope, not a mandated wire format. Adapters translate BLE
packets or Wi-Fi messages into these types, reject missing/nonfinite/wrong-type
values, and attach source and phone monotonic receipt time. Do not substitute zero,
false, or phone receipt time for missing robot fields. Do not infer battery state
from charging. No sensor fields beyond the agreed telemetry are required.

Target update frequency is **1 Hz**. Valid telemetry missing for **more than 2 s**
is an interruption even if the radio remains connected. Exactly 2 s does not yet
exceed the requirement. Before the first packet, use connection time as watchdog
anchor. Invalid packets do not reset it. Use monotonic phone time for elapsed
intervals; wall-clock changes and robot-clock offsets must not mask outages.

Lifecycle: disconnected -> connecting -> connected; unexpected loss may enter
reconnecting or error, followed by connected/disconnected. Provider methods are
asynchronous; errors have code, message and recoverability. Subscribe before
connect, unsubscribe on teardown, and dispose terminally. Mock connect/disconnect
are idempotent. Future adapters must serialize concurrent lifecycle operations.
The UI distinguishes transport state, stale sample and absence of any sample.
Retained stale samples must be visibly marked and excluded from valid evaluation.

TBD: BLE versus Wi-Fi, device discovery/identity, UUIDs or endpoints, framing,
packet size, authentication, encryption, sequence numbers, duplicate/out-of-order
policy, robot clock synchronization, retries/backoff, disconnect timeout, supported
OS versions, permissions, background suspension policy, tilt convention and
charging semantics. Reconnect should not silently resume a test with an unrecorded
data gap. Evaluation consequences of gaps must be agreed against the specification;
Stage 1 does not invent automatic failure rules.

Stage 3 adds the watchdog and deterministic simulator; actual radio integration
requires a separately agreed hardware milestone. This contract is independent of
microcontroller vendor.
