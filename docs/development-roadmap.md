# Seven-stage roadmap

1. **Foundation (current):** Expo/TypeScript configuration, five routes, shared theme,
   domain contracts, fixture adapter, initial Zustand boundary, tests and docs.
2. **Modern UI and 3D:** Replace placeholders with accessible dashboards; prototype
   on-device GL compatibility, create a simple robot visualization driven by typed
   props, document model axes/scale, and preserve a 2D fallback. No invented data.
3. **Telemetry and data:** Deterministic simulator, mode composition, connection
   watchdog, telemetry buffering and data management. Prove adapter interchangeability.
4. **Camera detection:** Select a device-compatible camera/vision implementation,
   permissions and lifecycle, robot/marker detection and confidence/validity output.
5. **Motion and measurement:** Calibrate camera, derive direction and motion from
   observations, estimate world displacement/travel/turning with uncertainty.
6. **Evaluation:** Trace the authoritative specification into versioned rules for
   Static Balance, Robot Guidance, Charging and Integrated Task; test timing,
   evidence sufficiency and invalid-data cases. Do not guess thresholds.
7. **Evidence and reporting:** Local storage, video/timestamp alignment, append-only
   finalized results, automatic reports and history, retention/export policies.

Each stage extends existing contracts, adds focused tests and records compatibility
decisions. Hardware transport selection, calibration setup, formal acceptance
thresholds and task durations remain open. No later-stage engine is included now.
