const JSON_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
};

const METHOD_HEADERS = {
  Allow: 'GET, POST, OPTIONS',
};

const OPENAI_RESPONSES_URL = 'https://api.openai.com/v1/responses';
const DEFAULT_MODEL = 'gpt-4.1-mini';
const MAX_MESSAGE_LENGTH = 1200;

const PORTFOLIO_CONTEXT = {
  owner: 'Jibran Hussain',
  focus: 'Electrical and automation engineering portfolio with automation, robotics, PLC, process control, monitoring, electrical design, and engineering case-study projects.',
  projects: [
    {
      slug: 'smart-conveyor',
      title: 'Smart Conveyor System',
      category: 'Material handling automation',
      ecosystem: 'Siemens / TIA Portal',
      status: 'In Progress',
      summary: 'A controls case study focused on sequence design, failure handling, interlocks, diagnostics, jam recovery, and maintainable PLC behavior.',
      technologies: ['PLC logic', 'Sensors', 'Interlocks', 'Motor control', 'Diagnostics'],
      skills: ['Sequencing', 'State logic', 'Troubleshooting mindset', 'Documentation'],
      outcomes: [
        'Simulated jam recovery flow reduced operator reset steps from 5 to 2.',
        'Improved fault visibility with dedicated blocked, jammed, and reset states.',
        'Mapped sensor dependencies so sequence decisions are traceable instead of timing-only.',
      ],
    },
    {
      slug: 'tank-pid',
      title: 'Tank PID Control Lab',
      category: 'Process control',
      ecosystem: 'CODESYS / OpenPLC',
      status: 'Roadmap',
      summary: 'A process-control route focused on loop behavior, PID tuning, overshoot, settling time, disturbance response, trends, and technical reporting.',
      technologies: ['PID control', 'Analog signals', 'Trend logging', 'Simulation'],
      skills: ['Control analysis', 'Loop tuning', 'Testing', 'Technical reporting'],
    },
    {
      slug: 'smart-hvac',
      title: 'Smart HVAC Automation',
      category: 'Building automation',
      ecosystem: 'CODESYS / OpenPLC',
      status: 'Roadmap',
      summary: 'HVAC control concept built around schedules, environmental logic, alarms, occupancy logic, abnormal-sensor handling, and safe fallback states.',
      technologies: ['HVAC control', 'Scheduling', 'Monitoring', 'Alarms'],
      skills: ['Building automation', 'Operational logic', 'Documentation', 'System clarity'],
    },
    {
      slug: 'motor-control-center',
      title: 'Motor Control Center Study',
      category: 'Electrical power and drives',
      ecosystem: 'Electrical Design',
      status: 'Built',
      summary: 'MCC-focused study for coordinated motor logic, permissives, electrical awareness, ready states, trips, feedback signals, and reset paths.',
      technologies: ['Motor starters', 'Drive logic', 'Permissives', 'Feedback signals', 'Electrical control'],
      skills: ['Electrical awareness', 'Controls integration', 'Status design', 'Reliability thinking'],
      outcomes: [
        'Built a permissive matrix that separates command, trip, and feedback conditions.',
        'Improved fault visibility with dedicated ready, blocked, tripped, and reset states.',
        'Documented start-blocking logic so maintenance checks can follow the signal path.',
      ],
    },
    {
      slug: 'remote-monitoring-dashboard',
      title: 'Remote Monitoring Dashboard',
      category: 'Industrial visibility',
      ecosystem: 'Python Tools',
      status: 'Roadmap',
      summary: 'SCADA-style monitoring study for alarms, trends, maintenance visibility, operator-readable status, and information hierarchy.',
      technologies: ['Dashboards', 'Trend data', 'Alarms', 'Remote status'],
      skills: ['Information hierarchy', 'HMI thinking', 'Operational UX', 'System clarity'],
    },
    {
      slug: 'safety-interlock-system',
      title: 'Safety Interlock System',
      category: 'Machine safety',
      ecosystem: 'Siemens / TIA Portal',
      status: 'Roadmap',
      summary: 'Safety-focused logic study around permissives, safe states, emergency stops, restart criteria, blocked conditions, and explicit interlock behavior.',
      technologies: ['Interlocks', 'Permissives', 'Emergency states', 'Restart logic'],
      skills: ['Safety awareness', 'Structured logic', 'Documentation', 'State design'],
    },
    {
      slug: 'line-following-robot',
      title: 'Line Following Robot',
      category: 'Mobile robotics',
      ecosystem: 'Webots / Robotics',
      status: 'Built',
      github: 'https://github.com/jibranthedecoder/webots-line-following-robot',
      summary: 'A Webots e-puck robot simulation where a PD controller was tuned to follow a line quickly and stably using three ground sensors.',
      technologies: ['Webots', 'Python', 'e-puck robot', 'Ground sensors', 'PD control', 'Motor speed saturation'],
      skills: ['Controller tuning', 'Sensor feedback', 'Robot simulation', 'Performance testing', 'Technical reporting'],
      outcomes: [
        'Completed the track in 33.38 seconds with a 2.61 m path length.',
        'Selected base_speed = 5.6, Kp = 7.0, Kd = 0.85, and SP = 4.5 as the best stable compromise.',
        'Documented the trade-off between faster movement and stable line-following behavior.',
      ],
    },
    {
      slug: 'dead-reckoning-navigation',
      title: 'Dead Reckoning Navigation Robot',
      category: 'Mobile robotics',
      ecosystem: 'Webots / Robotics',
      status: 'Built',
      github: 'https://github.com/jibranthedecoder/webots-dead-reckoning-navigation',
      summary: 'A Webots e-puck navigation project using wheel odometry, heading correction, and a state machine to drive through target points and return to the origin.',
      technologies: ['Webots', 'Python', 'e-puck robot', 'Wheel encoders', 'Odometry', 'State machine'],
      skills: ['Pose estimation', 'Dead reckoning', 'Heading correction', 'Path planning', 'Robot simulation', 'Technical reporting'],
      outcomes: [
        'Navigated through green, blue, and red target points and returned near the origin.',
        'Reached the final origin position with an estimated error of about 0.0196 m.',
        'Implemented a readable movement state machine for rotate, linear, tangent, circular, and stop phases.',
      ],
    },
    {
      slug: 'maze-solving-robot',
      title: 'Maze Solving Robot',
      category: 'Mobile robotics',
      ecosystem: 'Webots / Robotics',
      status: 'Built',
      github: 'https://github.com/jibranthedecoder/webots-maze-solving-robot',
      summary: 'A Webots maze robot using three distance sensors, heading information, PID wall following, encoder-based turns, and state-machine navigation.',
      technologies: ['Webots', 'Python', 'Thymio-style robot', 'Distance sensors', 'PID control', 'State machine'],
      skills: ['Maze navigation', 'Sensor logic', 'PID wall following', 'Encoder-based turning', 'Finite-state machine', 'Robot simulation'],
      outcomes: [
        'Implemented a maze controller using three distance sensors and a heading device.',
        'Used PID wall following to keep the robot stable while moving through the labyrinth.',
        'Separated navigation behavior into forward, turn, dead-end, and end states.',
      ],
    },
    {
      slug: 'pick-place-robot-cell',
      title: 'Pick and Place Robot Cell',
      category: 'Robotics',
      ecosystem: 'Webots / Robotics',
      status: 'Roadmap',
      summary: 'Cell-level control concept around motion coordination, sequence timing, detection logic, recovery paths, safety zones, and operator interaction.',
      technologies: ['Robot cell', 'Sensors', 'State control', 'Cell sequencing'],
      skills: ['Sequence design', 'Coordination', 'Recovery planning', 'Automation structure'],
    },
    {
      slug: 'quality-inspection-vision-station',
      title: 'Quality Inspection Vision Station',
      category: 'Inspection systems',
      ecosystem: 'Python Tools',
      status: 'Roadmap',
      summary: 'Inspection workflow concept combining pass/fail logic, reject handling, traceable inspection flow, and operator feedback states.',
      technologies: ['Vision systems', 'Inspection flow', 'Reject logic', 'Operator feedback'],
      skills: ['Workflow design', 'Quality thinking', 'Traceability', 'System logic'],
    },
    {
      slug: 'smart-energy-metering-system',
      title: 'Smart Energy Metering System',
      category: 'Energy systems',
      ecosystem: 'Electrical Design',
      status: 'Roadmap',
      summary: 'Energy-use monitoring study focused on load behavior, reporting, trend insight, and engineering-readable consumption information.',
      technologies: ['Metering', 'Power data', 'Reporting', 'Monitoring'],
      skills: ['Energy awareness', 'Data interpretation', 'System thinking', 'Documentation'],
    },
    {
      slug: 'packaging-line-automation',
      title: 'Packaging Line Automation',
      category: 'Production systems',
      ecosystem: 'Siemens / TIA Portal',
      status: 'Roadmap',
      summary: 'Production-line control concept for synchronization, downtime handling, stage-to-stage dependencies, and operator intervention logic.',
      technologies: ['Line control', 'Synchronization', 'Downtime states', 'Operator logic'],
      skills: ['Production thinking', 'Coordination', 'Troubleshooting', 'Documentation'],
    },
    {
      slug: 'virtual-commissioning-project',
      title: 'Virtual Commissioning Project',
      category: 'Simulation',
      ecosystem: 'TwinCAT / Beckhoff',
      status: 'Roadmap',
      summary: 'Simulation-first study for validating sequence logic, fault scenarios, timing issues, operator problems, and pre-commissioning behavior.',
      technologies: ['Simulation', 'Validation', 'Testing', 'Commissioning'],
      skills: ['Verification', 'Scenario planning', 'Reliability thinking', 'Analysis'],
    },
    {
      slug: 'predictive-maintenance-system',
      title: 'Predictive Maintenance System',
      category: 'Reliability engineering',
      ecosystem: 'Python Tools',
      status: 'Roadmap',
      summary: 'Condition-monitoring concept for early fault indicators, maintenance triggers, reliability planning, and data-informed decisions.',
      technologies: ['Condition monitoring', 'Maintenance triggers', 'Analytics', 'Reliability'],
      skills: ['Maintenance thinking', 'Monitoring', 'Reliability', 'Data-informed decisions'],
    },
  ],
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...JSON_HEADERS,
      ...METHOD_HEADERS,
    },
  });
}

function empty(status = 204) {
  return new Response(null, {
    status,
    headers: METHOD_HEADERS,
  });
}

function sanitize(value, maxLength = MAX_MESSAGE_LENGTH) {
  return String(value || '')
    .trim()
    .replace(/\r\n/g, '\n')
    .slice(0, maxLength);
}

function readEnvString(env, key, maxLength = 4000) {
  return sanitize(env?.[key], maxLength);
}

function getRuntimeConfig(env) {
  return {
    openaiApiKey: readEnvString(env, 'OPENAI_API_KEY', 4096),
    openaiModel: readEnvString(env, 'OPENAI_MODEL', 100) || DEFAULT_MODEL,
  };
}

function getRequestMessage(body) {
  return sanitize(body?.message, MAX_MESSAGE_LENGTH);
}

async function createOpenAIResponse(runtimeConfig, message) {
  const response = await fetch(OPENAI_RESPONSES_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${runtimeConfig.openaiApiKey}`,
      'Content-Type': 'application/json',
      'User-Agent': 'jibranhussain-portfolio/1.0',
    },
    body: JSON.stringify({
      model: runtimeConfig.openaiModel,
      temperature: 0.2,
      input: [
        {
          role: 'system',
          content: [
            "You are the official portfolio assistant for Jibran Hussain's engineering portfolio.",
            'Answer only from the provided portfolio context.',
            'Do not invent projects, dates, employers, qualifications, private information, or links.',
            'If the context does not contain the answer, say that the information is not available in the portfolio data.',
            'Keep answers concise, professional, and recruiter-friendly.',
            'When useful, mention project slugs as relative paths like /projects/line-following-robot/.',
          ].join(' '),
        },
        {
          role: 'user',
          content: `Portfolio context:\n${JSON.stringify(PORTFOLIO_CONTEXT, null, 2)}\n\nQuestion:\n${message}`,
        },
      ],
    }),
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const message = payload?.error?.message || `OpenAI API request failed with status ${response.status}`;
    throw new Error(message);
  }

  return payload;
}

function extractOutputText(payload) {
  if (typeof payload?.output_text === 'string' && payload.output_text.trim()) {
    return payload.output_text.trim();
  }

  const textParts = [];

  for (const item of payload?.output || []) {
    for (const content of item?.content || []) {
      if (content?.type === 'output_text' && typeof content.text === 'string') {
        textParts.push(content.text);
      }
    }
  }

  return textParts.join('\n').trim();
}

export async function onRequestGet(context) {
  const runtimeConfig = getRuntimeConfig(context.env);

  return json({
    ok: Boolean(runtimeConfig.openaiApiKey),
    route: '/api/portfolio-assistant',
    runtime: 'cloudflare-pages-functions',
    model: runtimeConfig.openaiModel,
    projectsAvailable: PORTFOLIO_CONTEXT.projects.length,
    message: runtimeConfig.openaiApiKey
      ? 'Portfolio assistant endpoint is configured. Submit with POST and a JSON message field.'
      : 'Portfolio assistant endpoint is available, but OPENAI_API_KEY is not configured for this deployment.',
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const runtimeConfig = getRuntimeConfig(env);

  if (!runtimeConfig.openaiApiKey) {
    return json(
      {
        ok: false,
        message: 'Portfolio assistant is not configured. Add OPENAI_API_KEY to Cloudflare Pages environment variables.',
      },
      503
    );
  }

  const contentType = sanitize(request.headers.get('Content-Type'), 100).toLowerCase();
  if (!contentType.includes('application/json')) {
    return json({ ok: false, message: 'Invalid request format. Use application/json.' }, 415);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, message: 'Invalid JSON request body.' }, 400);
  }

  const message = getRequestMessage(body);

  if (message.length < 2) {
    return json({ ok: false, message: 'Please send a question in the message field.' }, 400);
  }

  try {
    const payload = await createOpenAIResponse(runtimeConfig, message);
    const answer = extractOutputText(payload);

    return json({
      ok: true,
      route: '/api/portfolio-assistant',
      model: runtimeConfig.openaiModel,
      answer: answer || 'OpenAI returned a response, but no text output was found.',
    });
  } catch (error) {
    console.error('Portfolio assistant endpoint failed.', error);
    return json(
      {
        ok: false,
        message: 'Portfolio assistant request failed. Check Cloudflare Function logs and OpenAI configuration.',
      },
      502
    );
  }
}

export async function onRequestOptions() {
  return empty(204);
}
