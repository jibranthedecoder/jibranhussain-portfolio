(function () {
  window.PORTFOLIO_PROJECTS = window.PORTFOLIO_PROJECTS || [];
  window.PORTFOLIO_ECOSYSTEMS = window.PORTFOLIO_ECOSYSTEMS || [];

  const siemensProject = {
    slug: "chemical-process-automation-system",
    title: "Chemical Process Automation System",
    category: "Siemens TIA / Process automation",
    ecosystem: "siemens-tia",
    status: "build",
    statusLabel: "Built",
    github: "https://github.com/jibranthedecoder/siemens-complete-automation-project",
    system: "Siemens",
    languages: ["FBD", "GRAPH"],
    summary: "A complete academic industrial automation case study for chemical solution preparation and dosing using Siemens S7-1500, TIA Portal, GRAPH, WinCC HMI, PID Compact, PLCSIM Advanced, and SIMIT.",
    intro: "A full Siemens automation workflow from P&ID-based process analysis and functional specification to hardware selection, PLC programming, HMI development, PID control, and simulation validation.",
    problem: "The process had to coordinate batch preparation and continuous dosing safely: water, NaOH, and powder feeding, mixing, transfer to a storage tank, controlled pump dosing, sensor scaling, alarms, and manual/automatic/test modes.",
    overview: "The solution uses a Siemens S7-1500 PLC architecture with modular FB/FC blocks for motors, valves, sensor scaling, operating modes, emergency stop, faults, HMI handling, GRAPH sequence control, and PID Compact flow control. The implementation was validated with PLCSIM Advanced and SIMIT by changing simulated process values and checking sequence progress, device behavior, and sensor response.",
    why: "This project demonstrates a complete automation engineering chain instead of isolated PLC code: specification, hardware planning, reusable logic, sequence control, HMI interaction, PID behavior, and simulation-based verification.",
    visual: "GRAPH batch sequence, SIMIT simulation, TIA Selection Tool hardware list, and TIA Portal program print evidence",
    technologies: [
      "Siemens TIA Portal V16",
      "Siemens S7-1500",
      "Siemens GRAPH",
      "WinCC Basic",
      "PID Compact",
      "PLCSIM Advanced",
      "SIMIT",
      "PROFINET",
      "FBD",
      "HMI",
      "TIA Selection Tool"
    ],
    skills: [
      "P&ID interpretation",
      "Functional specification",
      "Hardware selection",
      "PLC architecture",
      "Reusable FB/FC design",
      "GRAPH sequence control",
      "Analog sensor scaling",
      "PID flow control",
      "HMI development",
      "Simulation validation",
      "Fault handling"
    ],
    outcomes: [
      "Created a process automation specification for chemical solution preparation and dosing based on a P&ID.",
      "Selected Siemens S7-1500 hardware and I/O modules using TIA Selection Tool.",
      "Implemented modular PLC logic with reusable motor, valve, sensor, mode, fault, HMI, and sequence blocks.",
      "Built a GRAPH-based batch sequence covering water filling, NaOH dosing, powder feeding, mixing, storage transfer, and process dosing.",
      "Integrated PID Compact for controlled process flow using simulated process values.",
      "Validated the automation behavior with PLCSIM Advanced and SIMIT simulation evidence."
    ],
    nextSteps: [
      "Add the strongest screenshots from GRAPH, SIMIT, hardware selection, and HMI to the portfolio case page.",
      "Publish Finnish and English README refinements in the Siemens project repository.",
      "Add a concise simulation validation table for tested states, expected behavior, and observed result."
    ],
    evidence: [
      "TIA Portal program print PDF",
      "Functional specification PDF",
      "TIA Selection Tool hardware order list PDF",
      "SIMIT/PLCSIM simulation PDF",
      "TIA Portal project archive (.zap16)"
    ]
  };

  const index = window.PORTFOLIO_PROJECTS.findIndex((project) => project.slug === siemensProject.slug);
  if (index >= 0) {
    window.PORTFOLIO_PROJECTS[index] = { ...window.PORTFOLIO_PROJECTS[index], ...siemensProject };
  } else {
    window.PORTFOLIO_PROJECTS.push(siemensProject);
  }
}());
