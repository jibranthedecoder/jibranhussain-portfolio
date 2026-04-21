window.PORTFOLIO_PROJECTS = [
  {
    slug: "smart-conveyor",
    title: "Smart Conveyor System",
    category: "Material handling automation",
    status: "build",
    statusLabel: "In-progress",
    summary: "A project focused on how machines move products step by step, and what happens when something goes wrong.",
    intro: "A controls case study built to show how I think about sequence design, failure handling, and maintainable PLC behavior.",
    problem: "Conveyors seem simple until flow stops. The real work is handling blocked paths, conflicting signals, and getting the system running again without causing more issues.",
    overview: "This project is structured as a real engineering case study, not a generic student card. The focus is on operating states, clear permissives, fault response, and restart behavior that would make sense to an operator or maintenance technician.",
    why: "This project helped me think more clearly about sequences, conditions, and how machines behave in real situations.",
    visual: "Sequence map, I/O overview, and operator state visuals",
    technologies: ["PLC logic", "Sensors", "Interlocks", "Motor control", "Diagnostics"],
    skills: ["Sequencing", "State logic", "Troubleshooting mindset", "Documentation"],
    outcomes: [
      "Simulated jam recovery flow reduced operator reset steps from 5 to 2.",
      "Improved fault visibility with dedicated blocked, jammed, and reset states.",
      "Mapped sensor dependencies so sequence decisions are traceable instead of timing-only."
    ],
    nextSteps: [
      "Build the first TwinCAT implementation pass.",
      "Add a simple HMI state view.",
      "Publish project documentation to GitHub when the logic package is ready."
    ]
  },
  {
    slug: "tank-pid",
    title: "Tank PID Control Lab",
    category: "Process control",
    status: "roadmap",
    statusLabel: "Roadmap",
    summary: "A study project where I worked with process control and tried to understand how systems react over time.",
    intro: "A process-control route focused on explaining loop behavior clearly instead of treating PID as a buzzword.",
    problem: "Control is not just tuning numbers. You need to see how the system reacts, why it overshoots, and how different settings change behavior.",
    overview: "The goal is to compare tuning approaches, show the loop on trends, and connect control decisions back to process behavior and operator impact.",
    why: "This helped me understand control behavior instead of just applying formulas.",
    visual: "Trend views, tuning comparison, and loop commentary",
    technologies: ["PID control", "Analog signals", "Trend logging", "Simulation"],
    skills: ["Control analysis", "Loop tuning", "Testing", "Technical reporting"],
    outcomes: [
      "Compare conservative and aggressive tuning outcomes.",
      "Explain overshoot, settling time, and disturbance response with evidence.",
      "Turn raw behavior into a readable engineering case study."
    ],
    nextSteps: [
      "Refine the simulated process model.",
      "Build annotated trend screenshots.",
      "Publish a concise technical report."
    ]
  },
  {
    slug: "smart-hvac",
    title: "Smart HVAC Automation",
    category: "Building automation",
    status: "roadmap",
    statusLabel: "Roadmap",
    summary: "HVAC control concept built around schedules, environmental logic, alarms, and safe fallback states.",
    intro: "A building-automation study focused on calm, maintainable operating logic.",
    problem: "HVAC systems need more than temperature control. They need schedules, alarm handling, fallback behavior, and operator-readable states.",
    overview: "This project will focus on ventilation and comfort control with explicit scheduling, occupancy logic, and abnormal-sensor handling.",
    why: "It shows whether I can structure control logic for a system that runs continuously and has to stay understandable over time.",
    visual: "Operating modes, alarm states, and environmental logic",
    technologies: ["HVAC control", "Scheduling", "Monitoring", "Alarms"],
    skills: ["Building automation", "Operational logic", "Documentation", "System clarity"],
    outcomes: [
      "Define mode switching and occupancy behavior cleanly.",
      "Document abnormal conditions and fallback operation.",
      "Create a case study that reads like engineering work, not marketing."
    ],
    nextSteps: [
      "Design a mode-state map.",
      "Add operator-facing dashboard concepts.",
      "Connect the project to a stronger HMI view."
    ]
  },
  {
    slug: "motor-control-center",
    title: "Motor Control Center Study",
    category: "Electrical power and drives",
    status: "build",
    statusLabel: "Built",
    summary: "MCC-focused study for coordinated motor logic, permissives, electrical awareness, and fault status handling.",
    intro: "A project route where electrical engineering and automation logic meet in a way that actually reflects industrial work.",
    problem: "Motor systems depend on clean command structure, permissives, trips, and feedback. If those layers are unclear, operation and maintenance both suffer.",
    overview: "The emphasis here is on how a control system should reason about ready states, start conditions, stop commands, trips, and reset paths for multiple motor-driven functions.",
    why: "This kind of project reflects the type of technical work I want to grow into: practical electrical systems with strong control logic behind them.",
    visual: "MCC architecture, signal matrix, and fault-state logic",
    technologies: ["Motor starters", "Drive logic", "Permissives", "Feedback signals", "Electrical control"],
    skills: ["Electrical awareness", "Controls integration", "Status design", "Reliability thinking"],
    outcomes: [
      "Built a permissive matrix that separates command, trip, and feedback conditions.",
      "Improved fault visibility with dedicated ready, blocked, tripped, and reset states.",
      "Documented start-blocking logic so maintenance checks can follow the signal path."
    ],
    nextSteps: [
      "Add a motor permissive matrix.",
      "Create clearer device-state visuals.",
      "Publish the documentation pack alongside implementation notes."
    ]
  },
  {
    slug: "remote-monitoring-dashboard",
    title: "Remote Monitoring Dashboard",
    category: "Industrial visibility",
    status: "roadmap",
    statusLabel: "Roadmap",
    summary: "SCADA-style monitoring study for alarms, trends, maintenance visibility, and operator-readable status.",
    intro: "A monitoring concept built around signal usefulness rather than visual noise.",
    problem: "Dashboards often fail because they show too much and explain too little.",
    overview: "This project is about presenting plant state, alarms, and maintenance insight with clear hierarchy instead of decorative clutter.",
    why: "Good automation is also good communication. A system needs to explain itself clearly to the people operating it.",
    visual: "Alarm hierarchy, trend layout, and summary dashboard",
    technologies: ["Dashboards", "Trend data", "Alarms", "Remote status"],
    skills: ["Information hierarchy", "HMI thinking", "Operational UX", "System clarity"],
    outcomes: [
      "Prioritize high-value alarms and states.",
      "Separate operator and maintenance views intelligently.",
      "Document why every displayed element earns its place."
    ],
    nextSteps: [
      "Create dashboard wireframes.",
      "Link the monitoring view to a real automation case study.",
      "Add rationale notes for each screen section."
    ]
  },
  {
    slug: "safety-interlock-system",
    title: "Safety Interlock System",
    category: "Machine safety",
    status: "roadmap",
    statusLabel: "Roadmap",
    summary: "Safety-focused logic study around permissives, safe states, emergency stops, and restart conditions.",
    intro: "A future route focused on disciplined system behavior rather than casual control design.",
    problem: "Interlock logic must stay explicit. Ambiguity in safe-state behavior becomes operational risk very quickly.",
    overview: "The project will frame safety-related state control, restart criteria, and blocked conditions with the seriousness they require.",
    why: "It shows disciplined thinking around machine behavior and safety-aware system design.",
    visual: "Permissive map, safe-state transitions, and restart logic",
    technologies: ["Interlocks", "Permissives", "Emergency states", "Restart logic"],
    skills: ["Safety awareness", "Structured logic", "Documentation", "State design"],
    outcomes: [
      "Define blocked and ready states clearly.",
      "Describe restart conditions after emergency events.",
      "Build a case-study route with explicit technical language."
    ],
    nextSteps: [
      "Draft a safety-state diagram.",
      "Add signal and reset requirements.",
      "Connect the case study to a more realistic machine concept."
    ]
  },
  {
    slug: "pick-place-robot-cell",
    title: "Pick and Place Robot Cell",
    category: "Robotics",
    status: "roadmap",
    statusLabel: "Roadmap",
    summary: "Cell-level control concept around motion coordination, sequence timing, detection logic, and recovery paths.",
    intro: "A robotics case-study route centered on clear sequence definition and fault awareness.",
    problem: "Robot cells fail when motion, detection, and cell state management are not tightly coordinated.",
    overview: "The aim is to define cell states, operator interaction, and recovery behavior in a way that remains readable as complexity grows.",
    why: "It demonstrates planning discipline for multi-stage automation rather than isolated code snippets.",
    visual: "Cell-state sequence, safety zones, and operator interaction flow",
    technologies: ["Robot cell", "Sensors", "State control", "Cell sequencing"],
    skills: ["Sequence design", "Coordination", "Recovery planning", "Automation structure"],
    outcomes: [
      "Outline cell modes and transitions clearly.",
      "Model safe operator interactions.",
      "Prepare the route for future simulation visuals."
    ],
    nextSteps: [
      "Build the first state flow.",
      "Add fault-recovery scenarios.",
      "Prepare a simulation-ready project narrative."
    ]
  },
  {
    slug: "quality-inspection-vision-station",
    title: "Quality Inspection Vision Station",
    category: "Inspection systems",
    status: "roadmap",
    statusLabel: "Roadmap",
    summary: "Inspection workflow concept combining pass/fail logic, reject handling, and operator feedback states.",
    intro: "A machine-vision case-study route focused on inspection flow and traceable logic.",
    problem: "Inspection systems need more than image processing. They need clear status handling, reject logic, and operator feedback.",
    overview: "The route is designed to show how inspection results move through machine states and how rejects, retries, and operator actions are handled.",
    why: "It shows workflow discipline and traceability thinking in a production environment.",
    visual: "Pass/fail flow, reject routing, and operator response states",
    technologies: ["Vision systems", "Inspection flow", "Reject logic", "Operator feedback"],
    skills: ["Workflow design", "Quality thinking", "Traceability", "System logic"],
    outcomes: [
      "Define pass, fail, and reject conditions clearly.",
      "Structure operator feedback states cleanly.",
      "Prepare a reusable case-study format for later visuals."
    ],
    nextSteps: [
      "Map the inspection state flow.",
      "Add a reject-station interface concept.",
      "Document why each state exists."
    ]
  },
  {
    slug: "smart-energy-metering-system",
    title: "Smart Energy Metering System",
    category: "Energy systems",
    status: "roadmap",
    statusLabel: "Roadmap",
    summary: "Energy-use monitoring study focused on load behavior, reporting, and engineering-readable consumption insight.",
    intro: "A system concept for making electrical usage data more useful operationally.",
    problem: "Raw power data becomes valuable only when it can explain patterns, exceptions, and operational opportunities.",
    overview: "The project will frame how electrical consumption should be monitored, summarized, and translated into useful engineering insight.",
    why: "It reflects both electrical awareness and the ability to turn data into operational understanding.",
    visual: "Load summary, trend insight, and reporting states",
    technologies: ["Metering", "Power data", "Reporting", "Monitoring"],
    skills: ["Energy awareness", "Data interpretation", "System thinking", "Documentation"],
    outcomes: [
      "Track meaningful usage patterns.",
      "Summarize system load in a usable format.",
      "Translate readings into actions instead of raw numbers."
    ],
    nextSteps: [
      "Define the reporting format.",
      "Add trend and alert logic.",
      "Pair the project with a stronger dashboard case study."
    ]
  },
  {
    slug: "packaging-line-automation",
    title: "Packaging Line Automation",
    category: "Production systems",
    status: "roadmap",
    statusLabel: "Roadmap",
    summary: "Production-line control concept for synchronization, downtime handling, and operator intervention logic.",
    intro: "A line-control case study focused on multi-stage coordination rather than isolated machine logic.",
    problem: "Packaging systems become fragile when line stages are not synchronized clearly and downtime states are not handled properly.",
    overview: "This project is about coordinated machine behavior, blocking conditions, and how operator intervention should fit into the line sequence.",
    why: "It shows production thinking and how automation logic scales across connected stages.",
    visual: "Line-state coordination, downtime paths, and intervention logic",
    technologies: ["Line control", "Synchronization", "Downtime states", "Operator logic"],
    skills: ["Production thinking", "Coordination", "Troubleshooting", "Documentation"],
    outcomes: [
      "Define stage-to-stage dependencies clearly.",
      "Model downtime and restart paths.",
      "Build a stronger multi-machine narrative."
    ],
    nextSteps: [
      "Add line-state visuals.",
      "Create downstream-block and upstream-starve scenarios.",
      "Turn the concept into a documented case study."
    ]
  },
  {
    slug: "virtual-commissioning-project",
    title: "Virtual Commissioning Project",
    category: "Simulation",
    status: "roadmap",
    statusLabel: "Roadmap",
    summary: "Simulation-first study for validating sequence logic and fault scenarios before live deployment.",
    intro: "A case-study route focused on verification before hardware risk increases.",
    problem: "Commissioning becomes more reliable when logic and failure modes are explored before the system is live.",
    overview: "The project will focus on how simulation and virtual commissioning can expose failure states, timing issues, and operator problems early.",
    why: "It demonstrates verification thinking instead of waiting for the plant floor to expose every weakness.",
    visual: "Simulation flow, fault scenarios, and pre-commissioning validation",
    technologies: ["Simulation", "Validation", "Testing", "Commissioning"],
    skills: ["Verification", "Scenario planning", "Reliability thinking", "Analysis"],
    outcomes: [
      "Create a framework for testing before deployment.",
      "Model abnormal conditions and expected responses.",
      "Use simulation as engineering evidence."
    ],
    nextSteps: [
      "Choose the simulation environment.",
      "Define scenario coverage.",
      "Pair the route with one of the PLC logic projects."
    ]
  },
  {
    slug: "predictive-maintenance-system",
    title: "Predictive Maintenance System",
    category: "Reliability engineering",
    status: "roadmap",
    statusLabel: "Roadmap",
    summary: "Condition-monitoring concept for early fault indicators, maintenance triggers, and reliability planning.",
    intro: "A project direction that connects my maintenance background with data-informed engineering decisions.",
    problem: "Condition data becomes useful only when it informs maintenance action at the right time and with the right confidence.",
    overview: "The project will frame how machine-condition indicators can support maintenance planning, not just dashboard decoration.",
    why: "It connects practical maintenance thinking with automation and monitoring design.",
    visual: "Condition signals, maintenance triggers, and reliability view",
    technologies: ["Condition monitoring", "Maintenance triggers", "Analytics", "Reliability"],
    skills: ["Maintenance thinking", "Monitoring", "Reliability", "Data-informed decisions"],
    outcomes: [
      "Identify useful early warning indicators.",
      "Translate signals into trigger logic.",
      "Frame the work as operationally useful engineering."
    ],
    nextSteps: [
      "Choose target machine indicators.",
      "Define the trigger model.",
      "Connect the project to a monitoring dashboard."
    ]
  }
];
