document.addEventListener("DOMContentLoaded", function() {

  // Liste mise à jour des cours
  let courses = [
    { id: 1,  category: "5 - 6 ans",               monitor: "Raphaël",      schedule: "Mardi 17:00 - 18:30" },
    { id: 2,  category: "5 - 6 ans",               monitor: "Stéphane",     schedule: "Mardi 17:00 - 18:30" },
    { id: 3,  category: "5 - 6 ans",               monitor: "Jérôme",       schedule: "Mercredi 18:00 - 19:30" },
    { id: 4,  category: "5 - 6 ans",               monitor: "Raphaël",      schedule: "Mercredi 15:00 - 16:30" },
    { id: 5,  category: "Adulte (Perfectionnement)", monitor: "Clémentine",   schedule: "Mardi 20:00 - 22:00" },
    { id: 6,  category: "Adulte (Perfectionnement)", monitor: "Jérôme",       schedule: "Jeudi 20:00 - 22:00" },
    { id: 7,  category: "Adultes (Loisir)",         monitor: "Raphaël",      schedule: "Mardi 20:00 - 22:00" },
    { id: 8,  category: "Adultes (Loisir)",         monitor: "Stéphane",     schedule: "Mardi 20:00 - 22:00" },
    { id: 9,  category: "Adultes (Loisir)",         monitor: "Clémentine",   schedule: "Jeudi 19:30 - 21:30" },
    { id: 10, category: "Collégiens Confirmés",     monitor: "Nicolas",      schedule: "Lundi 17:00 - 19:00" },
    { id: 11, category: "Collégiens Confirmés",     monitor: "Clémentine",   schedule: "Mercredi 16:00 - 18:00" },
    { id: 12, category: "Collégiens Confirmés",     monitor: "Raphaël",      schedule: "Vendredi 17:30 - 19:30" },
    { id: 13, category: "Collégiens Confirmés",     monitor: "Nicolas",      schedule: "Vendredi 17:30 - 19:30" },
    { id: 14, category: "Collégiens Confirmés",     monitor: "Raphaël",      schedule: "Samedi 10:00 - 12:00" },
    { id: 15, category: "Collégiens Débutants",     monitor: "Clémentine",   schedule: "Lundi 17:00 - 19:00" },
    { id: 16, category: "Collégiens Débutants",     monitor: "Raphaël",      schedule: "Samedi 08:00 - 10:00" },
    { id: 17, category: "Lycéens",                monitor: "A déterminer", schedule: "Samedi 10:00 - 12:00" },
    { id: 18, category: "Primaires Confirmés",      monitor: "Raphaël",      schedule: "Mardi 18:30 - 20:00" },
    { id: 19, category: "Primaires Confirmés",      monitor: "Stéphane",     schedule: "Mardi 18:30 - 20:00" },
    { id: 20, category: "Primaires Confirmés",      monitor: "Hugo",         schedule: "Mercredi 18:00 - 19:30" },
    { id: 21, category: "Primaires Confirmés",      monitor: "Raphaël",      schedule: "Mercredi 18:00 - 19:30" },
    { id: 22, category: "Primaires Confirmés",      monitor: "Clémentine",   schedule: "Mercredi 18:00 - 19:30" },
    { id: 23, category: "Primaires Confirmés",      monitor: "David",        schedule: "Vendredi 17:00 - 18:30" },
    { id: 24, category: "Primaires Débutants",      monitor: "Clémentine",   schedule: "Mardi 18:30 - 20:00" },
    { id: 25, category: "Primaires Débutants",      monitor: "Raphaël",      schedule: "Mercredi 16:30 - 18:00" },
    { id: 26, category: "Primaires Débutants",      monitor: "David",        schedule: "Vendredi 18:30 - 20:00" },
    { id: 27, category: "Primaires Débutants",      monitor: "A déterminer", schedule: "Samedi 08:30 - 10:00" }
  ];

  // Références aux éléments du DOM
  const categoryFilter = document.getElementById("categoryFilter");
  const monitorFilter  = document.getElementById("monitorFilter");
  const coursesTableContainer = document.getElementById("coursesTableContainer");
  const coursesTableBody = document.querySelector("#coursesTable tbody");

  // Extraction des valeurs uniques pour les filtres
  function getUniqueMonitors() {
    const monitorsSet = new Set();
    courses.forEach(course => {
      course.monitor.split(",").forEach(m => {
        monitorsSet.add(m.trim());
      });
    });
    return Array.from(monitorsSet);
  }

  function getUniqueCategories() {
    const categoriesSet = new Set(courses.map(course => course.category));
    return Array.from(categoriesSet);
  }

  // Remplir les menus déroulants avec la catégorie puis le moniteur
  function populateFilters() {
    // Catégorie
    categoryFilter.innerHTML = '<option value="">-- Sélectionnez une catégorie --</option>';
    getUniqueCategories().forEach(category => {
      let option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
    });

    // Moniteur avec une option pour tous les moniteurs
    monitorFilter.innerHTML = '<option value="all">Tous les moniteurs</option>';
    getUniqueMonitors().forEach(monitor => {
      let option = document.createElement("option");
      option.value = monitor;
      option.textContent = monitor;
      monitorFilter.appendChild(option);
    });
  }

  // Mise à jour du tableau des cours selon les filtres
  function updateCoursesTable() {
    // On affiche le tableau dès qu'au moins un filtre est actif
    if (categoryFilter.value === "" && monitorFilter.value === "all") {
      coursesTableContainer.classList.add("hidden");
      coursesTableBody.innerHTML = "";
      return;
    }
    // Filtrage : si une catégorie est sélectionnée, on l'applique, sinon on affiche toutes les catégories.
    // De même, si un moniteur spécifique est sélectionné, on filtre sinon on affiche tous les moniteurs.
    const filteredCourses = courses.filter(course => {
      const matchCategory = (categoryFilter.value === "" || course.category === categoryFilter.value);
      const monitors = course.monitor.split(",").map(m => m.trim());
      const matchMonitor = (monitorFilter.value === "all" || monitors.includes(monitorFilter.value));
      return matchCategory && matchMonitor;
    });

    // Génération du contenu du tableau
    coursesTableBody.innerHTML = "";
    if (filteredCourses.length === 0) {
      const tr = document.createElement("tr");
      const td = document.createElement("td");
      td.colSpan = 3;
      td.textContent = "Aucun cours trouvé.";
      tr.appendChild(td);
      coursesTableBody.appendChild(tr);
    } else {
      filteredCourses.forEach(course => {
        const tr = document.createElement("tr");
        const tdCategory = document.createElement("td");
        tdCategory.textContent = course.category;
        const tdMonitor = document.createElement("td");
        tdMonitor.textContent = course.monitor;
        const tdSchedule = document.createElement("td");
        tdSchedule.textContent = course.schedule;
        tr.appendChild(tdCategory);
        tr.appendChild(tdMonitor);
        tr.appendChild(tdSchedule);
        coursesTableBody.appendChild(tr);
      });
    }
    coursesTableContainer.classList.remove("hidden");
  }

  // Mise à jour du tableau lors du changement de filtre
  categoryFilter.addEventListener("change", updateCoursesTable);
  monitorFilter.addEventListener("change", updateCoursesTable);

  // Initialisation
  populateFilters();

});
