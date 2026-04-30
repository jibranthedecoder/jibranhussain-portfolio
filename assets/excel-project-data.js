(function () {
  window.PORTFOLIO_PROJECTS = window.PORTFOLIO_PROJECTS || [];
  window.PORTFOLIO_ECOSYSTEMS = window.PORTFOLIO_ECOSYSTEMS || [];

  const excelEcosystem = {
    id: "excel-tools",
    title: "Excel / Data Analysis Tools",
    description: "Spreadsheet-based calculators, validated data analysis pages, and interactive result explorers.",
  };

  const excelProjects = [
    {
      slug: "excel-critical-point-calculator",
      title: "Excel Critical Point Calculator",
      category: "Spreadsheet calculation tools",
      ecosystem: "excel-tools",
      status: "build",
      statusLabel: "Built",
      github: "https://github.com/jibranthedecoder/excel-critical-point-calculator",
      summary: "An Excel break-even calculation task converted into an interactive HTML calculator with editable inputs, profit table, and critical point output.",
      intro: "A spreadsheet-to-web project focused on turning Excel calculation logic into a clearer browser-based calculator.",
      problem: "A spreadsheet can calculate correctly but still be hard to present clearly. The useful engineering work is showing the formula logic, input assumptions, calculated outputs, and break-even result in a clean interface.",
      overview: "The original Excel task calculated production amount, net sales, fixed costs, variable costs, total costs, profit, profit percentage, and the critical point. The web version converts the model into an interactive HTML calculator with responsive layout and automatic recalculation.",
      technologies: ["Excel", "HTML", "CSS", "JavaScript", "Break-even analysis", "Responsive UI"],
      skills: ["Spreadsheet logic", "Formula translation", "Interactive calculator design", "Data presentation", "Technical documentation"],
      outcomes: [
        "Converted an Excel critical point worksheet into a browser-based calculator.",
        "Added editable inputs for production amount, selling price, fixed costs, and variable costs.",
        "Displayed the critical point, profit table, and profit percentage in a clearer project format."
      ]
    },
    {
      slug: "excel-election-seat-allocation",
      title: "Excel Election Seat Allocation Explorer",
      category: "Spreadsheet data analysis",
      ecosystem: "excel-tools",
      status: "build",
      statusLabel: "Built",
      github: "https://github.com/jibranthedecoder/excel-election-seat-allocation",
      summary: "An Excel/data-analysis project that recalculates election seat allocation from candidate vote data using party totals, candidate ranking, and D'Hondt comparative figures.",
      intro: "A validated spreadsheet data-analysis project turned into an interactive result explorer for inspecting seat allocation, party totals, and elected candidates.",
      problem: "A simple personal-vote ranking is not enough for seat allocation. The result depends on party/list total votes, the candidate's rank inside that party/list, and the D'Hondt comparative figure.",
      overview: "The project starts from candidate vote data, cleans it into CSV, calculates party totals, creates D'Hondt comparative figures, selects the top 20 candidates, and presents the result through an interactive HTML explorer.",
      technologies: ["Excel", "CSV", "HTML", "CSS", "JavaScript", "D'Hondt method", "Data validation"],
      skills: ["Data cleaning", "Sorting and ranking logic", "Comparative figures", "Spreadsheet analysis", "Result validation", "Interactive data presentation"],
      outcomes: [
        "Rebuilt the calculation around party/list totals instead of personal-vote division.",
        "Created cleaned candidate data and processed result CSV files.",
        "Built an interactive explorer with search, party filtering, elected-only view, and sortable result logic."
      ]
    },
    {
      slug: "excel-stopping-distance-curve-fit",
      title: "Excel Stopping Distance Curve Fit",
      category: "Spreadsheet data analysis",
      ecosystem: "excel-tools",
      status: "build",
      statusLabel: "Built",
      github: "https://github.com/jibranthedecoder/excel-stopping-distance-curve-fit",
      summary: "An Excel measurement-analysis project converted into an interactive stopping-distance explorer with road-surface filtering, polynomial curve fitting, and 150 km/h extrapolation.",
      intro: "A spreadsheet-to-web project that turns vehicle stopping-distance measurements into an interactive curve-fitting and extrapolation tool.",
      problem: "Stopping distance grows nonlinearly with speed, and the original spreadsheet analysis needed a clearer way to show measured points, fitted curves, and extrapolated results such as 150 km/h wet-road stopping distance.",
      overview: "The project uses reaction-distance and braking-distance measurements for dry, wet, snowy, and icy road surfaces. The web version calculates stopping distance, fits a second-degree polynomial curve to the selected surface, draws the measurement points, and estimates stopping distance at a custom speed.",
      technologies: ["Excel", "HTML", "CSS", "JavaScript", "Canvas", "Polynomial curve fitting", "Data visualization"],
      skills: ["Measurement analysis", "Curve fitting", "Extrapolation", "Spreadsheet logic", "Interactive visualization", "Technical documentation"],
      outcomes: [
        "Converted an Excel measurement-analysis worksheet into an interactive browser tool.",
        "Added road-surface filtering for dry, wet, snowy, and icy conditions.",
        "Implemented polynomial curve fitting and custom-speed stopping-distance prediction."
      ]
    }
  ];

  function upsertEcosystem(ecosystem) {
    const index = window.PORTFOLIO_ECOSYSTEMS.findIndex((item) => item.id === ecosystem.id);
    if (index >= 0) {
      window.PORTFOLIO_ECOSYSTEMS[index] = { ...window.PORTFOLIO_ECOSYSTEMS[index], ...ecosystem };
    } else {
      window.PORTFOLIO_ECOSYSTEMS.push(ecosystem);
    }
  }

  function upsertProject(project) {
    const index = window.PORTFOLIO_PROJECTS.findIndex((item) => item.slug === project.slug);
    if (index >= 0) {
      window.PORTFOLIO_PROJECTS[index] = { ...window.PORTFOLIO_PROJECTS[index], ...project };
    } else {
      window.PORTFOLIO_PROJECTS.push(project);
    }
  }

  upsertEcosystem(excelEcosystem);
  excelProjects.forEach(upsertProject);
}());
