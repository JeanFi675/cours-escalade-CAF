// script.js
document.addEventListener("DOMContentLoaded", () => {
  const courses = [
    { category: "5 - 6 ans",               monitor: "Raphaël",      schedule: "Mardi 17:00 - 18:30" },
    { category: "5 - 6 ans",               monitor: "Stéphane",     schedule: "Mardi 17:00 - 18:30" },
    { category: "5 - 6 ans",               monitor: "Jérôme",       schedule: "Mercredi 18:00 - 19:30" },
    { category: "5 - 6 ans",               monitor: "Raphaël",      schedule: "Mercredi 15:00 - 16:30" },
    { category: "Adulte (Perfectionnement)", monitor: "Clémentine",   schedule: "Mardi 20:00 - 22:00" },
    { category: "Adulte (Perfectionnement)", monitor: "Jérôme",       schedule: "Jeudi 20:00 - 22:00" },
    { category: "Adultes (Loisir)",         monitor: "Raphaël",      schedule: "Mardi 20:00 - 22:00" },
    { category: "Adultes (Loisir)",         monitor: "Stéphane",     schedule: "Mardi 20:00 - 22:00" },
    { category: "Adultes (Loisir)",         monitor: "Clémentine",   schedule: "Jeudi 19:30 - 21:30" },
    { category: "Collégiens Confirmés",     monitor: "Nicolas",      schedule: "Lundi 17:00 - 19:00" },
    { category: "Collégiens Confirmés",     monitor: "Clémentine",   schedule: "Mercredi 16:00 - 18:00" },
    { category: "Collégiens Confirmés",     monitor: "Raphaël",      schedule: "Vendredi 17:30 - 19:30" },
    { category: "Collégiens Confirmés",     monitor: "Nicolas",      schedule: "Vendredi 17:30 - 19:30" },
    { category: "Collégiens Confirmés",     monitor: "Raphaël",      schedule: "Samedi 10:00 - 12:00" },
    { category: "Collégiens Débutants",     monitor: "Clémentine",   schedule: "Lundi 17:00 - 19:00" },
    { category: "Collégiens Débutants",     monitor: "Raphaël",      schedule: "Samedi 08:00 - 10:00" },
    { category: "Lycéens",                 monitor: "A déterminer", schedule: "Samedi 10:00 - 12:00" },
    { category: "Primaires Confirmés",      monitor: "Raphaël",      schedule: "Mardi 18:30 - 20:00" },
    { category: "Primaires Confirmés",      monitor: "Stéphane",     schedule: "Mardi 18:30 - 20:00" },
    { category: "Primaires Confirmés",      monitor: "Hugo",         schedule: "Mercredi 18:00 - 19:30" },
    { category: "Primaires Confirmés",      monitor: "Raphaël",      schedule: "Mercredi 18:00 - 19:30" },
    { category: "Primaires Confirmés",      monitor: "Clémentine",   schedule: "Mercredi 18:00 - 19:30" },
    { category: "Primaires Confirmés",      monitor: "David",        schedule: "Vendredi 17:00 - 18:30" },
    { category: "Primaires Débutants",      monitor: "Clémentine",   schedule: "Mardi 18:30 - 20:00" },
    { category: "Primaires Débutants",      monitor: "Raphaël",      schedule: "Mercredi 16:30 - 18:00" },
    { category: "Primaires Débutants",      monitor: "David",        schedule: "Vendredi 18:30 - 20:00" },
    { category: "Primaires Débutants",      monitor: "A déterminer", schedule: "Samedi 08:30 - 10:00" }
  ];

  const categoryFilter  = document.getElementById("categoryFilter");
  const monitorFilter   = document.getElementById("monitorFilter");
  const tableContainer  = document.getElementById("coursesTableContainer");
  const tableBody       = document.querySelector("#coursesTable tbody");

  function populateCategories() {
    const cats = [...new Set(courses.map(c => c.category))];
    cats.forEach(cat => {
      const opt = document.createElement("option");
      opt.value = cat;
      opt.textContent = cat;
      categoryFilter.appendChild(opt);
    });
  }

  function populateMonitors(cat) {
    monitorFilter.innerHTML = '<option value="all">Tous les moniteurs</option>';
    const mons = [...new Set(
      courses.filter(c => c.category === cat).map(c => c.monitor.trim())
    )];
    mons.forEach(m => {
      const opt = document.createElement("option");
      opt.value = m;
      opt.textContent = m;
      monitorFilter.appendChild(opt);
    });
    monitorFilter.disabled = false;
  }

  function updateTable() {
    const cat = categoryFilter.value;
    const mon = monitorFilter.value;
    if (!cat) {
      tableContainer.classList.add("hidden");
      tableBody.innerHTML = "";
      monitorFilter.disabled = true;
      return;
    }
    let list = courses.filter(c => c.category === cat);
    if (mon !== "all") list = list.filter(c => c.monitor.trim() === mon);

    tableBody.innerHTML = "";
    if (!list.length) {
      const tr = document.createElement("tr");
      tr.innerHTML = '<td colspan="3">Aucun cours trouvé.</td>';
      tableBody.appendChild(tr);
    } else {
      list.forEach(c => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${c.category}</td><td>${c.monitor}</td><td>${c.schedule}</td>`;
        tableBody.appendChild(tr);
      });
    }
    tableContainer.classList.remove("hidden");
  }

  categoryFilter.addEventListener("change", () => {
    if (categoryFilter.value) {
      populateMonitors(categoryFilter.value);
      updateTable();
    } else {
      monitorFilter.value = "all";
      updateTable();
    }
  });
  monitorFilter.addEventListener("change", updateTable);

  populateCategories();
});
