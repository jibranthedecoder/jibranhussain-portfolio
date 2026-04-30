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
      technologies: ["Webots", "Python", "e-puck robot", "Ground sensors", "PD control", "Motor speed saturation"],
      skills: ["Controller tuning", "Sensor feedback", "Robot simulation", "Performance testing", "Technical reporting"],
      outcomes: [
        "Tuned the robot to complete the track in 33.38 seconds with a 2.61 m path length.",
        "Selected base_speed = 5.6, Kp = 7.0, Kd = 0.85, and SP = 4.5 as the best stable compromise.",
        "Documented the trade-off between faster movement and stable line-following behavior."
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
      technologies: ["Webots", "Python", "e-puck robot", "Wheel encoders", "Odometry", "State machine"],
      skills: ["Pose estimation", "Dead reckoning", "Heading correction", "Path planning", "Robot simulation", "Technical reporting"],
      outcomes: [
        "Navigated through green, blue, and red target points and returned near the origin.",
        "Reached the final origin position with an estimated error of about 0.0196 m.",
        "Implemented a readable movement state machine for rotate, linear, tangent, circular, and stop phases."
      ]
    },
    {
      slug: "maze-solving-robot",
      title: "Maze Solving Robot",
      category: "Mobile robotics",
      ecosystem: "webots-robotics",
      status: "build",
      statusLabel: "Built",
      github: "https://github.com/jibranthedecoder/webots-maze-solving-robot",
      summary: "A Webots maze robot using three distance sensors, heading information, PID wall following, encoder-based turns, and state-machine navigation.",
      intro: "A robotics simulation project focused on maze navigation, sensor-based decisions, PID wall following, and finite-state machine control.",
      problem: "A maze-solving robot must make movement decisions from limited local sensor data. It has to keep a stable distance from walls, detect blocked paths and open turns, handle dead ends, and stop when the maze end condition is reached.",
      overview: "The robot uses left, front, and right distance sensors to classify the local maze situation. While driving forward, it applies PID wall-distance correction. When a wall or opening is detected, it changes state and performs calibrated turns using wheel encoder feedback.",
      technologies: ["Webots", "Python", "Thymio-style robot", "Distance sensors", "PID control", "State machine"],
      skills: ["Maze navigation", "Sensor logic", "PID wall following", "Encoder-based turning", "Finite-state machine", "Robot simulation"],
      outcomes: [
        "Implemented a maze controller using three distance sensors and a heading device.",
        "Used PID wall following to keep the robot stable while moving through the labyrinth.",
        "Separated navigation behavior into forward, turn, dead-end, and end states."
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
