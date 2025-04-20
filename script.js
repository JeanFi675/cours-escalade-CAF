// script.js
document.addEventListener("DOMContentLoaded", function() {

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
    { category: "Lycéens",                  monitor: "Raphaël",      schedule: "Samedi 10:00 - 12:00" },
    { category: "Collégiens Débutants",     monitor: "Clémentine",   schedule: "Lundi 17:00 - 19:00" },
    { category: "Collégiens Débutants",     monitor: "Raphaël",      schedule: "Samedi 08:00 - 10:00" },
    { category: "Lycéens",                  monitor: "Clem / David / Nico", schedule: "Samedi 10:00 - 12:00" },
    { category: "Primaires Confirmés",      monitor: "Raphaël",      schedule: "Mardi 18:30 - 20:00" },
    { category: "Primaires Confirmés",      monitor: "Stéphane",     schedule: "Mardi 18:30 - 20:00" },
    { category: "Primaires Confirmés",      monitor: "Hugo",         schedule: "Mercredi 18:00 - 19:30" },
    { category: "Primaires Confirmés",      monitor: "Raphaël",      schedule: "Mercredi 18:00 - 19:30" },
    { category: "Primaires Confirmés",      monitor: "Clémentine",   schedule: "Mercredi 18:00 - 19:30" },
    { category: "Primaires Confirmés",      monitor: "David",        schedule: "Vendredi 17:00 - 18:30" },
    { category: "Primaires Débutants",      monitor: "Clémentine",   schedule: "Mardi 18:30 - 20:00" },
    { category: "Primaires Débutants",      monitor: "Raphaël",      schedule: "Mercredi 16:30 - 18:00" },
    { category: "Primaires Débutants",      monitor: "David",        schedule: "Vendredi 18:30 - 20:00" },
    { category: "Primaires Débutants",      monitor: "Clem / David / Nico", schedule: "Samedi 08:30 - 10:00" }
  ];

  const categoryFilter = document.getElementById("categoryFilter");
  const monitorFilter  = document.getElementById("monitorFilter");
  const coursesTableContainer = document.getElementById("coursesTableContainer");
  const coursesTableBody = document.querySelector("#coursesTable tbody");

  // Remplir le sélecteur de catégories
  function populateCategories() {
    const cats = [...new Set(courses.map(c => c.category))];
    cats.forEach(cat => {
      const opt = document.createElement("option");
      opt.value = cat;
      opt.textContent = cat;
      categoryFilter.appendChild(opt);
    });
  }

  // Mettre à jour le sélecteur de moniteurs selon la catégorie
  function populateMonitorsFor(category) {
    monitorFilter.innerHTML = '<option value="all">Tous les moniteurs</option>';
    const mons = [...new Set(
      courses
        .filter(c => c.category === category)
        .map(c => c.monitor.trim())
    )];
    mons.forEach(m => {
      const opt = document.createElement("option");
      opt.value = m;
      opt.textContent = m;
      monitorFilter.appendChild(opt);
    });
    monitorFilter.disabled = false;
  }

  // Afficher les cours selon filtres actifs
  function updateTable() {
    const cat = categoryFilter.value;
    const mon = monitorFilter.value;
    if (!cat) {
      coursesTableContainer.classList.add("hidden");
      coursesTableBody.innerHTML = "";
      monitorFilter.disabled = true;
      return;
    }

    let list = courses.filter(c => c.category === cat);
    if (mon !== "all") {
      list = list.filter(c => c.monitor.trim() === mon);
    }

    coursesTableBody.innerHTML = "";
    if (list.length === 0) {
      const tr = document.createElement("tr");
      tr.innerHTML = '<td colspan="3">Aucun cours trouvé.</td>';
      coursesTableBody.appendChild(tr);
    } else {
      list.forEach(c => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${c.category}</td><td>${c.monitor}</td><td>${c.schedule}</td>`;
        coursesTableBody.appendChild(tr);
      });
    }
    coursesTableContainer.classList.remove("hidden");
  }

  // Événements
  categoryFilter.addEventListener("change", () => {
    const cat = categoryFilter.value;
    if (cat) {
      populateMonitorsFor(cat);
      updateTable();
    } else {
      monitorFilter.value = "all";
      updateTable();
    }
  });

  monitorFilter.addEventListener("change", updateTable);

  // Initialisation
  populateCategories();
});
