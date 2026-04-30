(function () {
  window.PORTFOLIO_PROJECTS = window.PORTFOLIO_PROJECTS || [];

  const lineFollowingProject = {
    slug: "line-following-robot",
    title: "Line Following Robot",
    category: "Mobile robotics",
    ecosystem: "webots-robotics",
    status: "build",
    statusLabel: "Built",
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
      "Add annotated screenshots from the Webots simulation.",
      "Publish the controller code and report as project evidence.",
      "Compare the PD controller with a simpler P-only controller in the project notes."
    ]
  };

  const alreadyExists = window.PORTFOLIO_PROJECTS.some((project) => project.slug === lineFollowingProject.slug);
  if (!alreadyExists) {
    const webotsIndex = window.PORTFOLIO_PROJECTS.findIndex((project) => project.ecosystem === "webots-robotics");
    if (webotsIndex >= 0) {
      window.PORTFOLIO_PROJECTS.splice(webotsIndex, 0, lineFollowingProject);
    } else {
      window.PORTFOLIO_PROJECTS.push(lineFollowingProject);
    }
  }
}());
