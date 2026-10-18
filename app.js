(function () {
  "use strict";

  const STORAGE_KEY = "greenread-records";

  const sensorForm = document.getElementById("sensor-form");
  const errorBanner = document.getElementById("form-error-panel");
  const recordsList = document.getElementById("records-list");
  const queueCount = document.getElementById("queue-count");
  const emptyState = document.getElementById("empty-state");
  const btnClearAll = document.getElementById("btn-clear-all");

  const inputName = document.getElementById("bay-name");
  const inputPh = document.getElementById("ph");
  const inputEc = document.getElementById("ec");
  const inputTemp = document.getElementById("temp");
  const inputHm = document.getElementById("hm");

  let records = loadRecords();

  render();

  function loadRecords() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Failed to load records from your data store", error);
      return [];
    }
  }

  function saveRecords() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    } catch (error) {
      console.error("Failed to write to your data store", error);
    }
  }

  function evaluateRisk(ph, ec, temp, hm) {
    if (ph >= 12 || ec >= 120 || temp >= 200 || hm >= 80) {
      return { level: "critical", label: "Critical" };
    }

    if (ph >= 10 || ec >= 90 || temp >= 160 || hm > 50) {
      return { level: "elevated", label: "Elevated" };
    }

    return { level: "normal", label: "Normal" };
  }

  function validateInput(data) {
    const errors = [];

    if (!data.name.trim()) {
      errors.push("Bay Name is a required Field");
    }
    if (isNaN(data.ph) || data.ph < 0 || data.ph > 14) {
      errors.push("pH must be a number and between 0 to 14");
    }
    if (isNaN(data.ec) || data.ec < 40 || data.ec > 150) {
      errors.push(
        "Electrical Conductivity must be a number and between 40 to 150 S/m",
      );
    }
    if (isNaN(data.temp) || data.temp < 0 || data.temp > 240) {
      errors.push("Temp must be a number and between 0 to 240 C");
    }
    if (isNaN(data.hm) || data.hm < 0 || data.hm > 100) {
      errors.push("Humidity must be a number and between 0 to 100 %");
    }

    return errors;
  }

  sensorForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = {
      id: crypto.randomUUID(),
      name: inputName.value,
      ph: parseFloat(inputPh.value),
      ec: parseFloat(inputEc.value),
      temp: parseFloat(inputTemp.value),
      hm: parseFloat(inputHm.value),
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const validationErrors = validateInput(formData);

    if (validationErrors.length > 0) {
      displayError(validationErrors.join(" "));
      return;
    }

    hideError();

    formData.risk = evaluateRisk(
      formData.ph,
      formData.ec,
      formData.temp,
      formData.hm,
    );

    records.unshift(formData);

    saveRecords();

    render();

    sensorForm.reset();

    inputName.focus();
  });

  recordsList.addEventListener("click", function (event) {
    const target = event.target;
    if (target.classList.contains("btn-discharge")) {
      const recordId = target.dataset.id;
      records = records.filter(function (record) {
        return record.id !== recordId;
      });
      saveRecords();
      render();
    }
  });

  btnClearAll.addEventListener("click", (event) => {
    if (records.length === 0) return;
    if (confirm("Are you sure you want to delete all sensor records?")) {
      records = [];
      saveRecords();
      render();
    }
  });

  function render() {
    queueCount.textContent = records.length;

    if (records.length === 0) {
      emptyState.classList.remove("hidden");
      recordsList.innerHTML = "";
      return;
    }

    emptyState.classList.add("hidden");

    const fragment = document.createDocumentFragment();

    records.forEach(function (rec) {
      const li = document.createElement("li");
      li.className = "sensor-card status-" + rec.risk.level;

      li.innerHTML = `<div class="card-top">
            <div>
                <div class="bay-name-text">${escapeHtml(rec.name)} </div>
                <div class="timestamp">Logged at ${rec.timestamp} </div> 
                <span class="risk-badge ${rec.risk.level}">${rec.risk.label}</span>            
            </div>
            <div class="sensor-stats">
            <div class="stat-item"><span>pH</span>${rec.ph}</div>
            <div class="stat-item"><span>Conductivity</span>${rec.ec} S/m</div>
            <div class="stat-item"><span>Temperature</span>${rec.temp} C</div>
            <div class="stat-item"><span>Humidity</span>${rec.hm}%</div>
            </div>
            <button class="btn btn-outline-danger btn-sm btn-discharge" data-id="${rec.id}">Remove Bay </button>        
        </div>`;

      fragment.appendChild(li);
    });

    recordsList.innerHTML = "";
    recordsList.appendChild(fragment);
  }

  function displayError(message) {
    errorBanner.textContent = message;
    errorBanner.classList.remove("hidden");
  }

  function hideError() {
    errorBanner.textContent = "";
    errorBanner.classList.add("hidden");
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
})();
