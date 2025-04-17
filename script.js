document.addEventListener("DOMContentLoaded", function() {
  let courses = [
    { id: 1, category: "5 - 6 ans", monitor: "Raphaël", schedule: "Mardi 17:00 - 18:30" },
    { id: 2, category: "5 - 6 ans", monitor: "Stéphane", schedule: "Mardi 17:00 - 18:30" },
    { id: 3, category: "5 - 6 ans", monitor: "Jérôme", schedule: "Mercredi 18:00 - 19:30" },
    { id: 4, category: "5 - 6 ans", monitor: "Raphaël", schedule: "Mercredi 15:00 - 16:30" },
    { id: 5, category: "Adulte (Perfectionnement)", monitor: "Clémentine", schedule: "Mardi 20:00 - 22:00" },
    { id: 6, category: "Adulte (Perfectionnement)", monitor: "Jérôme", schedule: "Jeudi 20:00 - 22:00" },
    { id: 7, category: "Adultes (Loisir)", monitor: "Raphaël", schedule: "Mardi 20:00 - 22:00" },
    { id: 8, category: "Adultes (Loisir)", monitor: "Stéphane", schedule: "Mardi 20:00 - 22:00" },
    { id: 9, category: "Adultes (Loisir)", monitor: "Clémentine", schedule: "Jeudi 19:30 - 21:30" },
    { id: 10, category: "Collégiens Confirmés", monitor: "Nicolas", schedule: "Lundi 17:00 - 19:00" },
    { id: 11, category: "Collégiens Confirmés", monitor: "Clémentine", schedule: "Mercredi 16:00 - 18:00" },
    { id: 12, category: "Collégiens Confirmés", monitor: "Raphaël", schedule: "Vendredi 17:30 - 19:30" },
    { id: 13, category: "Collégiens Confirmés", monitor: "Nicolas", schedule: "Vendredi 17:30 - 19:30" },
    { id: 14, category: "Collégiens Confirmés", monitor: "Raphaël", schedule: "Samedi 10:00 - 12:00" },
    { id: 15, category: "Collégiens Débutants", monitor: "Clémentine", schedule: "Lundi 17:00 - 19:00" },
    { id: 16, category: "Collégiens Débutants", monitor: "Raphaël", schedule: "Samedi 08:00 - 10:00" },
    { id: 17, category: "Lycéens", monitor: "A déterminer", schedule: "Samedi 10:00 - 12:00" },
    { id: 18, category: "Primaires Confirmés", monitor: "Raphaël", schedule: "Mardi 18:30 - 20:00" },
    { id: 19, category: "Primaires Confirmés", monitor: "Stéphane", schedule: "Mardi 18:30 - 20:00" },
    { id: 20, category: "Primaires Confirmés", monitor: "Hugo", schedule: "Mercredi 18:00 - 19:30" },
    { id: 21, category: "Primaires Confirmés", monitor: "Raphaël", schedule: "Mercredi 18:00 - 19:30" },
    { id: 22, category: "Primaires Confirmés", monitor: "Clémentine", schedule: "Mercredi 18:00 - 19:30" },
    { id: 23, category: "Primaires Confirmés", monitor: "David", schedule: "Vendredi 17:00 - 18:30" },
    { id: 24, category: "Primaires Débutants", monitor: "Clémentine", schedule: "Mardi 18:30 - 20:00" },
    { id: 25, category: "Primaires Débutants", monitor: "Raphaël", schedule: "Mercredi 16:30 - 18:00" },
    { id: 26, category: "Primaires Débutants", monitor: "David", schedule: "Vendredi 18:30 - 20:00" },
    { id: 27, category: "Primaires Débutants", monitor: "A déterminer", schedule: "Samedi 08:30 - 10:00" }
  ];

  const categoryFilter = document.getElementById("categoryFilter");
  const monitorFilter  = document.getElementById("monitorFilter");
  const tableContainer = document.getElementById("coursesTableContainer");
  const tableBody      = document.querySelector("#coursesTable tbody");

  function getMonitorsForCategory(cat) {
    const set = new Set();
    courses.filter(c => c.category === cat)
           .forEach(c => c.monitor.split(",").forEach(m => set.add(m.trim())));
    return Array.from(set);
  }

  function populateCategories() {
    categoryFilter.innerHTML = '<option value="">-- Sélectionnez une catégorie --</option>';
    Array.from(new Set(courses.map(c => c.category)))
         .forEach(cat => {
           const o = document.createElement('option');
           o.value = cat; o.textContent = cat;
           categoryFilter.appendChild(o);
         });
  }

  function updateTable() {
    if (!categoryFilter.value) {
      tableContainer.classList.add('hidden');
      tableBody.innerHTML = '';
      return;
    }
    const filtered = courses.filter(c => {
      const catOk = c.category === categoryFilter.value;
      const monOk = (monitorFilter.value === 'all' || c.monitor.split(',').map(m => m.trim()).includes(monitorFilter.value));
      return catOk && monOk;
    });
    tableBody.innerHTML = '';
    if (!filtered.length) {
      const tr = document.createElement('tr');
      const td = document.createElement('td'); td.colSpan = 3;
      td.textContent = 'Aucun cours trouvé.';
      tr.appendChild(td); tableBody.appendChild(tr);
    } else {
      filtered.forEach(c => {
        const tr = document.createElement('tr');
        ['category','monitor','schedule'].forEach(k => {
          const td = document.createElement('td');
          td.textContent = c[k]; tr.appendChild(td);
        });
        tableBody.appendChild(tr);
      });
    }
    tableContainer.classList.remove('hidden');
  }

  categoryFilter.addEventListener('change', () => {
    // mettre à jour liste moniteurs selon catégorie
    monitorFilter.innerHTML = '<option value="all">Tous les moniteurs</option>';
    if (categoryFilter.value) {
      getMonitorsForCategory(categoryFilter.value)
        .forEach(m => {
          const o = document.createElement('option');
          o.value = m; o.textContent = m;
          monitorFilter.appendChild(o);
        });
    }
    updateTable();
  });

  monitorFilter.addEventListener('change', updateTable);

  // initialisation categories
  populateCategories();
});
