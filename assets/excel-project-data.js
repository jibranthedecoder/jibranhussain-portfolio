(function () {
  window.PORTFOLIO_PROJECTS = window.PORTFOLIO_PROJECTS || [];
  window.PORTFOLIO_ECOSYSTEMS = window.PORTFOLIO_ECOSYSTEMS || [];

  const excelEcosystem = {
    id: "excel-tools",
    title: "Excel / Calculation Tools",
    description: "Spreadsheet-based tools converted into clearer browser-based calculators and portfolio case studies.",
  };

  const excelProject = {
    slug: "excel-critical-point-calculator",
    title: "Excel Critical Point Calculator",
    category: "Spreadsheet calculation tools",
    ecosystem: "excel-tools",
    status: "build",
    statusLabel: "Built",
    github: "https://github.com/jibranthedecoder/excel-critical-point-calculator",
    summary: "An Excel break-even calculation task converted into an interactive HTML calculator with editable inputs, profit table, and critical point output.",
    intro: "A spreadsheet-to-web project focused on turning Excel calculation logic into a clearer browser-based calculator.",
    problem: "A spreadsheet can calculate correctly but still be hard to present as portfolio evidence. The useful engineering work is showing the formula logic, input assumptions, calculated outputs, and break-even result in a clean interface.",
    overview: "The original Excel task calculated production amount, net sales, fixed costs, variable costs, total costs, profit, profit percentage, and the critical point. The portfolio version converts the model into an interactive HTML calculator with responsive layout and automatic recalculation.",
    technologies: ["Excel", "HTML", "CSS", "JavaScript", "Break-even analysis", "Responsive UI"],
    skills: ["Spreadsheet logic", "Formula translation", "Interactive calculator design", "Data presentation", "Technical documentation"],
    outcomes: [
      "Converted an Excel critical point worksheet into a browser-based calculator.",
      "Added editable inputs for production amount, selling price, fixed costs, and variable costs.",
      "Displayed the critical point, profit table, and profit percentage in a clearer portfolio format."
    ]
  };

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
  upsertProject(excelProject);
}());
