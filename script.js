/* =====================================================
   BLOOD DATA
===================================================== */

const bloodGroups = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-"
];


const bloodStock = [
  {
    group: "A+",
    units: 42,
    capacity: 60,
    updated: "Today, 9:10 AM"
  },

  {
    group: "A-",
    units: 9,
    capacity: 40,
    updated: "Today, 9:10 AM"
  },

  {
    group: "B+",
    units: 51,
    capacity: 60,
    updated: "Today, 8:45 AM"
  },

  {
    group: "B-",
    units: 6,
    capacity: 40,
    updated: "Today, 8:45 AM"
  },

  {
    group: "AB+",
    units: 18,
    capacity: 30,
    updated: "Today, 8:20 AM"
  },

  {
    group: "AB-",
    units: 3,
    capacity: 25,
    updated: "Today, 8:20 AM"
  },

  {
    group: "O+",
    units: 64,
    capacity: 80,
    updated: "Today, 9:30 AM"
  },

  {
    group: "O-",
    units: 11,
    capacity: 45,
    updated: "Today, 9:30 AM"
  }
];


const donors = [
  {
    id: "NBB-1041",
    name: "Chenna Neeraj",
    group: "O+",
    city: "Vijayawada",
    lastDonation: "12 Jun 2026",
    donations: 8,
    available: true
  },

  {
    id: "NBB-1042",
    name: "Sri Lakshmi Rao",
    group: "B+",
    city: "Guntur",
    lastDonation: "02 Jul 2026",
    donations: 5,
    available: true
  },

  {
    id: "NBB-1043",
    name: "Ayesha Khan",
    group: "A-",
    city: "Vijayawada",
    lastDonation: "28 Jul 2026",
    donations: 3,
    available: false
  },

  {
    id: "NBB-1044",
    name: "Rahul Verma",
    group: "O-",
    city: "Hyderabad",
    lastDonation: "19 May 2026",
    donations: 11,
    available: true
  },

  {
    id: "NBB-1045",
    name: "Divya Prasad",
    group: "AB+",
    city: "Eluru",
    lastDonation: "05 Aug 2026",
    donations: 2,
    available: false
  },

  {
    id: "NBB-1046",
    name: "Karthik Reddy",
    group: "B-",
    city: "Tenali",
    lastDonation: "22 Apr 2026",
    donations: 7,
    available: true
  },

  {
    id: "NBB-1047",
    name: "Meena Sharma",
    group: "A+",
    city: "Vijayawada",
    lastDonation: "30 Jun 2026",
    donations: 6,
    available: true
  },

  {
    id: "NBB-1048",
    name: "Joseph Fernandes",
    group: "AB-",
    city: "Machilipatnam",
    lastDonation: "14 Mar 2026",
    donations: 4,
    available: true
  }
];


/* =====================================================
   COMPATIBILITY
===================================================== */

const compatibility = {

  "A+": {
    receiveFrom: "A+, A-, O+, O-",
    donateTo: "A+, AB+"
  },

  "A-": {
    receiveFrom: "A-, O-",
    donateTo: "A+, A-, AB+, AB-"
  },

  "B+": {
    receiveFrom: "B+, B-, O+, O-",
    donateTo: "B+, AB+"
  },

  "B-": {
    receiveFrom: "B-, O-",
    donateTo: "B+, B-, AB+, AB-"
  },

  "AB+": {
    receiveFrom: "Everyone",
    donateTo: "AB+"
  },

  "AB-": {
    receiveFrom: "AB-, A-, B-, O-",
    donateTo: "AB+, AB-"
  },

  "O+": {
    receiveFrom: "O+, O-",
    donateTo: "O+, A+, B+, AB+"
  },

  "O-": {
    receiveFrom: "O-",
    donateTo: "Everyone"
  }

};


/* =====================================================
   PAGE NAVIGATION
===================================================== */

function showPage(pageName) {

  const pages = document.querySelectorAll(".page");

  pages.forEach(page => {
    page.classList.add("hidden");
  });


  const selectedPage = document.getElementById(pageName);

  if (selectedPage) {
    selectedPage.classList.remove("hidden");
  }


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


/* =====================================================
   STOCK LEVEL
===================================================== */

function getStockLevel(item) {

  const percentage =
    (item.units / item.capacity) * 100;


  if (percentage < 25) {

    return {
      label: "Critical",
      className: "critical",
      percentage
    };

  }


  if (percentage < 55) {

    return {
      label: "Low",
      className: "low",
      percentage
    };

  }


  return {
    label: "Adequate",
    className: "ok",
    percentage
  };

}


/* =====================================================
   DISPLAY BLOOD STOCK
===================================================== */

function loadBloodStock() {

  const table =
    document.getElementById("stock-table");

  if (!table) return;


  table.innerHTML = "";


  bloodStock.forEach(item => {

    const level =
      getStockLevel(item);


    const row =
      document.createElement("tr");


    row.innerHTML = `

      <td>
        <span class="blood-group">
          ${item.group}
        </span>
      </td>

      <td>
        ${item.units} / ${item.capacity}
      </td>

      <td>

        <div class="progress">

          <div
            class="progress-bar"
            style="width:${Math.min(
              100,
              level.percentage
            )}%"
          ></div>

        </div>

      </td>

      <td>

        <span class="status ${level.className}">
          ${level.label}
        </span>

      </td>

      <td>
        ${item.updated}
      </td>

    `;


    table.appendChild(row);

  });


  const total =
    bloodStock.reduce(
      (sum, item) => sum + item.units,
      0
    );


  const description =
    document.getElementById(
      "stock-description"
    );


  if (description) {

    description.textContent =
      `${total} tested units currently in storage across all blood groups.`;

  }

}


/* =====================================================
   COMPATIBILITY BUTTONS
===================================================== */

function createCompatibilityButtons() {

  const container =
    document.getElementById(
      "blood-buttons"
    );

  if (!container) return;


  container.innerHTML = "";


  bloodGroups.forEach(group => {

    const button =
      document.createElement("button");


    button.className =
      "blood-btn";


    button.textContent =
      group;


    button.onclick = function () {

      updateCompatibility(group);

    };


    container.appendChild(button);

  });


  updateCompatibility("O+");

}


/* =====================================================
   UPDATE COMPATIBILITY
===================================================== */

function updateCompatibility(group) {

  const data =
    compatibility[group];


  document.getElementById(
    "receive-result"
  ).textContent =
    data.receiveFrom;


  document.getElementById(
    "donate-result"
  ).textContent =
    data.donateTo;


  const buttons =
    document.querySelectorAll(
      "#blood-buttons .blood-btn"
    );


  buttons.forEach(button => {

    button.classList.toggle(
      "active",
      button.textContent === group
    );

  });

}


/* =====================================================
   DONOR FILTER BUTTONS
===================================================== */

function createGroupButtons() {

  const container =
    document.getElementById(
      "group-buttons"
    );

  if (!container) return;


  container.innerHTML = "";


  const groups = [
    "All",
    ...bloodGroups
  ];


  groups.forEach(group => {

    const button =
      document.createElement("button");


    button.className =
      "blood-btn";


    button.textContent =
      group;


    button.onclick = function () {

      filterDonors(group);

    };


    container.appendChild(button);

  });


  filterDonors("All");

}


/* =====================================================
   FILTER DONORS
===================================================== */

let selectedGroup = "All";


function filterDonors(group) {

  selectedGroup = group;


  const searchInput =
    document.getElementById(
      "donor-search"
    );


  const searchText =
    searchInput
      ? searchInput.value
          .trim()
          .toLowerCase()
      : "";


  const filtered =
    donors.filter(donor => {

      const matchesSearch =

        !searchText ||

        donor.name
          .toLowerCase()
          .includes(searchText) ||

        donor.city
          .toLowerCase()
          .includes(searchText) ||

        donor.id
          .toLowerCase()
          .includes(searchText);


      const matchesGroup =

        group === "All" ||

        donor.group === group;


      return (
        matchesSearch &&
        matchesGroup
      );

    });


  displayDonors(filtered);


  const buttons =
    document.querySelectorAll(
      "#group-buttons .blood-btn"
    );


  buttons.forEach(button => {

    button.classList.toggle(
      "active",
      button.textContent === group
    );

  });

}


/* =====================================================
   DISPLAY DONORS
===================================================== */

function displayDonors(list) {

  const table =
    document.getElementById(
      "donor-table"
    );


  if (!table) return;


  table.innerHTML = "";


  if (list.length === 0) {

    table.innerHTML = `

      <tr>

        <td colspan="7"
            style="text-align:center;padding:30px">

          No donors match your search.

        </td>

      </tr>

    `;

    return;

  }


  list.forEach(donor => {

    const row =
      document.createElement("tr");


    row.innerHTML = `

      <td>
        ${donor.id}
      </td>

      <td>
        <strong>${donor.name}</strong>
      </td>

      <td>
        <span class="blood-group">
          ${donor.group}
        </span>
      </td>

      <td>
        ${donor.city}
      </td>

      <td>
        ${donor.lastDonation}
      </td>

      <td>
        ${donor.donations}
      </td>

      <td>

        <span class="status ${
          donor.available
            ? "ok"
            : "resting"
        }">

          ${
            donor.available
              ? "Available"
              : "Resting"
          }

        </span>

      </td>

    `;


    table.appendChild(row);

  });

}


/* =====================================================
   DONOR SEARCH
===================================================== */

function setupDonorSearch() {

  const input =
    document.getElementById(
      "donor-search"
    );


  if (!input) return;


  input.addEventListener(
    "input",
    function () {

      filterDonors(
        selectedGroup
      );

    }
  );

}


/* =====================================================
   DONOR FORM
===================================================== */

function setupDonorForm() {

  const form =
    document.getElementById(
      "donor-form"
    );


  if (!form) return;


  form.addEventListener(
    "submit",
    function(event) {

      event.preventDefault();


      alert(
        "Registration submitted successfully!\n\n" +
        "Our coordinator will contact you within 24 hours."
      );


      form.reset();

    }
  );

}


/* =====================================================
   CURRENT YEAR
===================================================== */

function setCurrentYear() {

  const year =
    document.getElementById(
      "year"
    );


  if (year) {

    year.textContent =
      new Date().getFullYear();

  }

}


/* =====================================================
   INITIALIZE
===================================================== */

document.addEventListener(
  "DOMContentLoaded",
  function() {

    loadBloodStock();

    createCompatibilityButtons();

    createGroupButtons();

    setupDonorSearch();

    setupDonorForm();

    setCurrentYear();

  }
);