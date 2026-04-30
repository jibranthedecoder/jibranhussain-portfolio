(function () {
  window.PORTFOLIO_PROJECTS = window.PORTFOLIO_PROJECTS || [];

  const webotsProjects = [
    {
      slug: "line-following-robot",
      title: "Line Following Robot",
      category: "Mobile robotics",
      ecosystem: "webots-robotics",
      status: "build",
      statusLabel: "Built",
      github: "https://github.com/jibranthedecoder/webots-line-following-robot",
      summary: "A Webots e-puck robot simulation where a PD controller was tuned to follow a line quickly and stably using three ground sensors.",
      intro: "A robotics simulation project focused on sensor feedback, PD control, speed tuning, and measured performance.",
      problem: "A line-following robot must react quickly to the track while staying stable. Too little correction makes the robot slow, while too much speed or gain causes oscillation, motor saturation, or unstable behavior.",
      overview: "The robot was simulated in Webots using an e-puck model with three ground sensors. The controller used the middle sensor as the process value and applied PD control to adjust left and right wheel speeds. The tuning process compared base speed, proportional gain, derivative gain, and setpoint values to find a stable compromise between speed and path length.",
      why: "This project shows practical controller tuning, sensor-based feedback control, and the trade-off between speed and stability in mobile robotics.",
      visual: "Webots simulation, line track, controller code, tuning table, and final performance result",
      technologies: ["Webots", "Python", "e-puck robot", "Ground sensors", "PD control", "Motor speed saturation"],
      skills: ["Controller tuning", "Sensor feedback", "Robot simulation", "Performance testing", "Technical reporting"],
      outcomes: [
        "Tuned the robot to complete the track in 33.38 seconds with a 2.61 m path length.",
        "Selected base_speed = 5.6, Kp = 7.0, Kd = 0.85, and SP = 4.5 as the best stable compromise.",
        "Documented the trade-off between faster movement and stable line-following behavior."
      ],
      nextSteps: [
        "Keep the GitHub evidence package up to date.",
        "Add a short comparison between the final PD controller and a simpler P-only controller.",
        "Use this page structure as the template for the next Webots projects."
      ]
    },
    {
      slug: "dead-reckoning-navigation",
      title: "Dead Reckoning Navigation Robot",
      category: "Mobile robotics",
      ecosystem: "webots-robotics",
      status: "build",
      statusLabel: "Built",
      github: "https://github.com/jibranthedecoder/webots-dead-reckoning-navigation",
      summary: "A Webots e-puck navigation project using wheel odometry, heading correction, and a state machine to drive through target points and return to the origin.",
      intro: "A robotics navigation project focused on wheel-encoder odometry, pose estimation, heading correction, and state-machine control.",
      problem: "Dead reckoning navigation accumulates error because the robot estimates its pose from wheel movement alone. Wheel radius error, wheel slip, model uncertainty, and heading drift can all move the robot away from the intended target path.",
      overview: "The robot starts at the origin, drives through green, blue, and red target squares, and returns to the origin using a semicircular path. The controller updates the robot pose from wheel encoder measurements, rotates toward each target, drives forward with heading correction, and uses a state machine to separate each navigation phase.",
      why: "This project shows practical odometry-based robot navigation, state-machine design, and the limitations of dead reckoning when there is no external position feedback.",
      visual: "Webots simulation, target-point navigation, wheel odometry, and final origin error measurement",
      technologies: ["Webots", "Python", "e-puck robot", "Wheel encoders", "Odometry", "State machine"],
      skills: ["Pose estimation", "Dead reckoning", "Heading correction", "Path planning", "Robot simulation", "Technical reporting"],
      outcomes: [
        "Navigated through green, blue, and red target points and returned near the origin.",
        "Reached the final origin position with an estimated error of about 0.0196 m.",
        "Implemented a readable movement state machine for rotate, linear, tangent, circular, and stop phases."
      ],
      nextSteps: [
        "Keep the repository evidence package up to date.",
        "Add a short comparison between odometry-only navigation and sensor-corrected navigation.",
        "Use the same portfolio structure for the next Webots robotics project."
      ]
    }
  ];

  function upsertProject(project) {
    const existingIndex = window.PORTFOLIO_PROJECTS.findIndex((item) => item.slug === project.slug);
    if (existingIndex >= 0) {
      window.PORTFOLIO_PROJECTS[existingIndex] = {
        ...window.PORTFOLIO_PROJECTS[existingIndex],
        ...project,
      };
      return;
    }

    const lastWebotsIndex = window.PORTFOLIO_PROJECTS.reduce((lastIndex, item, index) => {
      return item.ecosystem === "webots-robotics" ? index : lastIndex;
    }, -1);

    if (lastWebotsIndex >= 0) {
      window.PORTFOLIO_PROJECTS.splice(lastWebotsIndex + 1, 0, project);
    } else {
      window.PORTFOLIO_PROJECTS.push(project);
    }
  }

  webotsProjects.forEach(upsertProject);
}());
