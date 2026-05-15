(function () {
  window.PORTFOLIO_PROJECTS = window.PORTFOLIO_PROJECTS || [];
  window.PORTFOLIO_ECOSYSTEMS = window.PORTFOLIO_ECOSYSTEMS || [];

  const ecosystems = [
    {
      id: "excel-tools",
      title: "Excel / Data Analysis Tools",
      description: "Spreadsheet-based calculators, validated data analysis pages, and interactive result explorers.",
    },
  ];

  const projects = [
    {
      slug: "line-following-robot",
      title: "Line Following Robot",
      category: "Mobile robotics",
      ecosystem: "webots-robotics",
      status: "build",
      statusLabel: "Built",
      github: "https://github.com/jibranthedecoder/webots-line-following-robot",
      languages: ["Python"],
      system: "Webots",
      summary: "A Webots e-puck robot simulation where a PD controller was tuned to follow a line quickly and stably using three ground sensors.",
      intro: "A robotics simulation project focused on sensor feedback, PD control, speed tuning, and measured performance.",
      problem: "A line-following robot must react quickly to the track while staying stable. Too little correction makes the robot slow, while too much speed or gain causes oscillation, motor saturation, or unstable behavior.",
      overview: "The robot was simulated in Webots using an e-puck model with three ground sensors. The controller used the middle sensor as the process value and applied PD control to adjust left and right wheel speeds. The tuning process compared base speed, proportional gain, derivative gain, and setpoint values to find a stable compromise between speed and path length.",
      technologies: ["Webots", "Python", "e-puck robot", "Ground sensors", "PD control", "Motor speed saturation"],
      skills: ["Controller tuning", "Sensor feedback", "Robot simulation", "Performance testing", "Technical reporting"],
      outcomes: ["Tuned the robot to complete the track in 33.38 seconds with a 2.61 m path length.", "Selected base_speed = 5.6, Kp = 7.0, Kd = 0.85, and SP = 4.5 as the best stable compromise.", "Documented the trade-off between faster movement and stable line-following behavior."]
    },
    {
      slug: "dead-reckoning-navigation",
      title: "Dead Reckoning Navigation Robot",
      category: "Mobile robotics",
      ecosystem: "webots-robotics",
      status: "build",
      statusLabel: "Built",
      github: "https://github.com/jibranthedecoder/webots-dead-reckoning-navigation",
      languages: ["Python"],
      system: "Webots",
      summary: "A Webots e-puck navigation project using wheel odometry, heading correction, and a state machine to drive through target points and return to the origin.",
      intro: "A robotics navigation project focused on wheel-encoder odometry, pose estimation, heading correction, and state-machine control.",
      problem: "Dead reckoning navigation accumulates error because the robot estimates its pose from wheel movement alone. Wheel radius error, wheel slip, model uncertainty, and heading drift can all move the robot away from the intended target path.",
      overview: "The robot starts at the origin, drives through green, blue, and red target squares, and returns to the origin using a semicircular path. The controller updates the robot pose from wheel encoder measurements, rotates toward each target, drives forward with heading correction, and uses a state machine to separate each navigation phase.",
      technologies: ["Webots", "Python", "e-puck robot", "Wheel encoders", "Odometry", "State machine"],
      skills: ["Pose estimation", "Dead reckoning", "Heading correction", "Path planning", "Robot simulation", "Technical reporting"],
      outcomes: ["Navigated through green, blue, and red target points and returned near the origin.", "Reached the final origin position with an estimated error of about 0.0196 m.", "Implemented a readable movement state machine for rotate, linear, tangent, circular, and stop phases."]
    },
    {
      slug: "maze-solving-robot",
      title: "Maze Solving Robot",
      category: "Mobile robotics",
      ecosystem: "webots-robotics",
      status: "build",
      statusLabel: "Built",
      github: "https://github.com/jibranthedecoder/webots-maze-solving-robot",
      languages: ["Python"],
      system: "Webots",
      summary: "A Webots maze robot using three distance sensors, heading information, PID wall following, encoder-based turns, and state-machine navigation.",
      intro: "A robotics simulation project focused on maze navigation, sensor-based decisions, PID wall following, and finite-state machine control.",
      problem: "A maze-solving robot must make movement decisions from limited local sensor data. It has to keep a stable distance from walls, detect blocked paths and open turns, handle dead ends, and stop when the maze end condition is reached.",
      overview: "The robot uses left, front, and right distance sensors to classify the local maze situation. While driving forward, it applies PID wall-distance correction. When a wall or opening is detected, it changes state and performs calibrated turns using wheel encoder feedback.",
      technologies: ["Webots", "Python", "Thymio-style robot", "Distance sensors", "PID control", "State machine"],
      skills: ["Maze navigation", "Sensor logic", "PID wall following", "Encoder-based turning", "Finite-state machine", "Robot simulation"],
      outcomes: ["Implemented a maze controller using three distance sensors and a heading device.", "Used PID wall following to keep the robot stable while moving through the labyrinth.", "Separated navigation behavior into forward, turn, dead-end, and end states."]
    },
    {
      slug: "excel-critical-point-calculator",
      title: "Excel Critical Point Calculator",
      category: "Spreadsheet calculation tools",
      ecosystem: "excel-tools",
      status: "build",
      statusLabel: "Built",
      github: "https://github.com/jibranthedecoder/excel-critical-point-calculator",
      system: "Excel",
      summary: "An Excel break-even calculation task converted into an interactive HTML calculator with editable inputs, profit table, and critical point output.",
      intro: "A spreadsheet-to-web project focused on turning Excel calculation logic into a clearer browser-based calculator.",
      problem: "A spreadsheet can calculate correctly but still be hard to present clearly. The useful engineering work is showing the formula logic, input assumptions, calculated outputs, and break-even result in a clean interface.",
      overview: "The original Excel task calculated production amount, net sales, fixed costs, variable costs, total costs, profit, profit percentage, and the critical point. The web version converts the model into an interactive HTML calculator with responsive layout and automatic recalculation.",
      technologies: ["Excel", "Break-even analysis", "Responsive UI"],
      skills: ["Spreadsheet logic", "Formula translation", "Interactive calculator design", "Data presentation", "Technical documentation"],
      outcomes: ["Converted an Excel critical point worksheet into a browser-based calculator.", "Added editable inputs for production amount, selling price, fixed costs, and variable costs.", "Displayed the critical point, profit table, and profit percentage in a clearer project format."]
    },
    {
      slug: "excel-election-seat-allocation",
      title: "Excel Election Seat Allocation Explorer",
      category: "Spreadsheet data analysis",
      ecosystem: "excel-tools",
      status: "build",
      statusLabel: "Built",
      github: "https://github.com/jibranthedecoder/excel-election-seat-allocation",
      system: "Excel",
      summary: "An Excel/data-analysis project that recalculates election seat allocation from candidate vote data using party totals, candidate ranking, and D'Hondt comparative figures.",
      intro: "A validated spreadsheet data-analysis project turned into an interactive result explorer for inspecting seat allocation, party totals, and elected candidates.",
      problem: "A simple personal-vote ranking is not enough for seat allocation. The result depends on party/list total votes, the candidate's rank inside that party/list, and the D'Hondt comparative figure.",
      overview: "The project starts from candidate vote data, cleans it into CSV, calculates party totals, creates D'Hondt comparative figures, selects the top 20 candidates, and presents the result through an interactive HTML explorer.",
      technologies: ["Excel", "CSV", "D'Hondt method", "Data validation"],
      skills: ["Data cleaning", "Sorting and ranking logic", "Comparative figures", "Spreadsheet analysis", "Result validation", "Interactive data presentation"],
      outcomes: ["Rebuilt the calculation around party/list totals instead of personal-vote division.", "Created cleaned candidate data and processed result CSV files.", "Built an interactive explorer with search, party filtering, elected-only view, and sortable result logic."]
    },
    {
      slug: "excel-stopping-distance-curve-fit",
      title: "Excel Stopping Distance Curve Fit",
      category: "Spreadsheet data analysis",
      ecosystem: "excel-tools",
      status: "build",
      statusLabel: "Built",
      github: "https://github.com/jibranthedecoder/excel-stopping-distance-curve-fit",
      system: "Excel",
      summary: "An Excel measurement-analysis project converted into an interactive stopping-distance explorer with road-surface filtering, polynomial curve fitting, and 150 km/h extrapolation.",
      intro: "A spreadsheet-to-web project that turns vehicle stopping-distance measurements into an interactive curve-fitting and extrapolation tool.",
      problem: "Stopping distance grows nonlinearly with speed, and the original spreadsheet analysis needed a clearer way to show measured points, fitted curves, and extrapolated results such as 150 km/h wet-road stopping distance.",
      overview: "The project uses reaction-distance and braking-distance measurements for dry, wet, snowy, and icy road surfaces. The web version calculates stopping distance, fits a second-degree polynomial curve to the selected surface, draws the measurement points, and estimates stopping distance at a custom speed.",
      technologies: ["Excel", "Polynomial curve fitting", "Data visualization"],
      skills: ["Measurement analysis", "Curve fitting", "Extrapolation", "Spreadsheet logic", "Interactive visualization", "Technical documentation"],
      outcomes: ["Converted an Excel measurement-analysis worksheet into an interactive browser tool.", "Added road-surface filtering for dry, wet, snowy, and icy conditions.", "Implemented polynomial curve fitting and custom-speed stopping-distance prediction."]
    },
    {
      slug: "chemical-process-automation-system",
      title: "Chemical Process Automation System",
      category: "Siemens TIA / Process automation",
      ecosystem: "siemens-tia",
      status: "build",
      statusLabel: "Built",
      github: "https://github.com/jibranthedecoder/siemens-complete-automation-project",
      system: "Siemens",
      languages: ["FBD"],
      summary: "A complete academic industrial automation case study for chemical solution preparation and dosing using Siemens S7-1500, TIA Portal, GRAPH, WinCC HMI, PID Compact, PLCSIM Advanced, and SIMIT.",
      intro: "A full Siemens automation workflow from P&ID-based process analysis and functional specification to hardware selection, PLC programming, HMI development, PID control, and simulation validation.",
      problem: "The process had to coordinate batch preparation and continuous dosing safely: water, NaOH, and powder feeding, mixing, transfer to a storage tank, controlled pump dosing, sensor scaling, alarms, and manual/automatic/test modes.",
      overview: "The solution uses a Siemens S7-1500 PLC architecture with modular FB/FC blocks for motors, valves, sensor scaling, operating modes, emergency stop, faults, HMI handling, GRAPH sequence control, and PID Compact flow control. The implementation was validated with PLCSIM Advanced and SIMIT by changing simulated process values and checking sequence progress, device behavior, and sensor response.",
      why: "This project demonstrates a complete automation engineering chain instead of isolated PLC code: specification, hardware planning, reusable logic, sequence control, HMI interaction, PID behavior, and simulation-based verification.",
      visual: "GRAPH batch sequence, SIMIT simulation, TIA Selection Tool hardware list, and TIA Portal program print evidence",
      technologies: ["Siemens TIA Portal V16", "Siemens S7-1500", "Siemens GRAPH", "WinCC Basic", "PID Compact", "PLCSIM Advanced", "SIMIT", "PROFINET", "FBD", "HMI", "TIA Selection Tool"],
      skills: ["P&ID interpretation", "Functional specification", "Hardware selection", "PLC architecture", "Reusable FB/FC design", "GRAPH sequence control", "Analog sensor scaling", "PID flow control", "HMI development", "Simulation validation", "Fault handling"],
      outcomes: ["Created a process automation specification for chemical solution preparation and dosing based on a P&ID.", "Selected Siemens S7-1500 hardware and I/O modules using TIA Selection Tool.", "Implemented modular PLC logic with reusable motor, valve, sensor, mode, fault, HMI, and sequence blocks.", "Built a GRAPH-based batch sequence covering water filling, NaOH dosing, powder feeding, mixing, storage transfer, and process dosing.", "Integrated PID Compact for controlled process flow using simulated process values.", "Validated the automation behavior with PLCSIM Advanced and SIMIT simulation evidence."],
      nextSteps: ["Add the strongest screenshots from GRAPH, SIMIT, hardware selection, and HMI to the portfolio case page.", "Publish Finnish and English README refinements in the Siemens project repository.", "Add a concise simulation validation table for tested states, expected behavior, and observed result."],
      evidence: ["TIA Portal program print PDF", "Functional specification PDF", "TIA Selection Tool hardware order list PDF", "SIMIT/PLCSIM simulation PDF", "TIA Portal project archive (.zap16)"]
    }
  ];

  function upsertEcosystem(ecosystem) {
    const index = window.PORTFOLIO_ECOSYSTEMS.findIndex((item) => item.id === ecosystem.id);
    if (index >= 0) window.PORTFOLIO_ECOSYSTEMS[index] = { ...window.PORTFOLIO_ECOSYSTEMS[index], ...ecosystem };
    else window.PORTFOLIO_ECOSYSTEMS.push(ecosystem);
  }

  function upsertProject(project) {
    const index = window.PORTFOLIO_PROJECTS.findIndex((item) => item.slug === project.slug);
    if (index >= 0) window.PORTFOLIO_PROJECTS[index] = { ...window.PORTFOLIO_PROJECTS[index], ...project };
    else window.PORTFOLIO_PROJECTS.push(project);
  }

  ecosystems.forEach(upsertEcosystem);
  projects.forEach(upsertProject);
  window.PORTFOLIO_DATA_READY = true;
  window.dispatchEvent(new CustomEvent('portfolio:data-ready'));
}());
