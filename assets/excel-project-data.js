(function () {
  window.PORTFOLIO_PROJECTS = window.PORTFOLIO_PROJECTS || [];
  window.PORTFOLIO_ECOSYSTEMS = window.PORTFOLIO_ECOSYSTEMS || [];

  const excelEcosystem = {
    id: "excel-tools",
    title: "Excel / Calculation Tools",
    description: "Spreadsheet-based tools converted into clearer browser-based calculators, analysis pages, and portfolio case studies.",
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
      title: "Excel Election Seat Allocation",
      category: "Spreadsheet data analysis",
      ecosystem: "excel-tools",
      status: "build",
      statusLabel: "Built",
      github: "https://github.com/jibranthedecoder/excel-election-seat-allocation",
      summary: "An Excel-based election result analysis project focused on vote data sorting, group totals, comparative figures, ranking logic, and seat allocation.",
      intro: "A spreadsheet data-analysis project that studies how candidate vote data can be converted into ranked election results and seat allocation outputs.",
      problem: "Election result data requires careful sorting, grouping, ranking, and comparative figure logic. The challenge is to turn a larger table of candidates and votes into a clear list of elected candidates and supporting visual summaries.",
      overview: "The project uses spreadsheet-style logic to explain election seat allocation. It focuses on candidate vote data, party or list grouping, total votes, comparative figures, ranking, selected candidates, and supporting charts.",
      technologies: ["Excel", "HTML", "CSS", "Election analysis", "D'Hondt method", "Charts"],
      skills: ["Data sorting", "Ranking logic", "Comparative figures", "Chart interpretation", "Spreadsheet analysis", "Technical documentation"],
      outcomes: [
        "Organized election result material into a presentable data-analysis project.",
        "Documented a calculation workflow for grouping votes, ranking candidates, and allocating seats.",
        "Added chart-based visual evidence to explain the calculated result."
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
