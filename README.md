# Assignment 2A | GreenRead

## Github Repo

    https://github.com/ajacob2G502/ASGN_2

### Section 4.1

Starting State - When the page is loaded, the user will see an input form window and an output window for the information inputed into the form window. At the top will be the usual logo and name but will also include the total amount of entries in the system.

Action 1 - There will be an input field with various form rows to supply the amount of information requested by the user stories. Once this information is submitted, the use of JavaScript will allow the information to be displayed in the output window without reloading the page.

Action 2 - When the user hits submit, the inputed information will be ran through the JS code so that it can be properly categorized and styled to be placed in the output field.

Action 3 - The information will be placed in a container in the output field. This field will be dynamic so that new submitted inputs will dynamically be adjusted with the previous inputs.

Action 4 - The outputs will be sorted based on the specifications given in the user stories. The user will be able to manually remove individual nodes from the output window, or purge the entire window after a double check confirmation.

Terminal State - Since the inputed information is locally stored, reloading the page will keep the output containers so that the user can close and open the page at their convienience. The input form will remain blank after each submission and the output field will dynamically update with new user inputs.

### Section 4.2

Gulf of Execution | Typing numeric sensor metrics (pH, ElectricalConductivity[EC], Temp, Humidity)

    <label>pH (0-14)</label> | <input min, max, placeholder>

Gulf of Evaluation | Ingesting sensor values after clicking "Record Reading"

    if (ph < 0 || ph > 14){
    } else if (ph < 6 || ph > 8){
    } else{
    }

System Constraint | E.g. Water pH Boundaries (0.0 <= pH <= 14.0)

    <input type="number" min="0" max="14" step="0.1">

Visual Feedback State | Real-Time Input Error / Out-of-Bounds

    .normal {
        border: 2px solid green;
    }

    .hazard {
        border: 2px solid red;
    }

Error Recovery | Accidental or test data submissions

    <button onclick="clearReadings()">

    function clearReadings() {
        document.getElementById("ph").value = "";
    }

### Section 4.3

    - <body> [STATIC] (CSS: display: flex; flex-direction: column; min-height: 100vh)

        - <header class="portal-header"> [STATIC] (CSS: display: block)

            - <div class="header-content"> [STATIC] (CSS: display: flex; justify-content: space-between; align-items: center)

                - <div class="brand"> [STATIC] (CSS: display: flex; align-items: center)

                    - <span class="brand-icon"> [STATIC] (Text: 🩺)

                    - <h1> [STATIC] (Text: "GreenRead Sensor Logger")

                        - <span class="brand-sub"> [STATIC] (Text: "Sensor Logger")

                    - <div class="header-status"> [STATIC] (Text: "Active Queue:")

                        - <span id="queue-count" class="badge-count"> [DYNAMIC] (Text: Initial value "0"; updated by JavaScript)

    - <main class="portal-container"> [STATIC] (CSS: display: grid; grid-template-columns: 380px 1fr; gap: 2rem)

        - <aside class="panel form-panel"> [STATIC] (CSS: display: block)

            - <h2 class="panel-title"> [STATIC] (Text: "Record Sensor Data")

            - <div id="form-error-panel" class="alert alert-danger hidden"> [DYNAMIC] (Displays validation errors; CSS: display: block when visible)

            - <form id="sensor-form"> [STATIC] (Event: submit — if handled in app.js)

                - <div class="form-group"> [STATIC] (CSS: display: flex; flex-direction: column)

                    - <label for="bay-name"> [STATIC] (Text: "Bay Name")

                    - <input id="bay-name"> [STATIC] (type: text; required)

                - <div class="form-row"> [STATIC] (CSS: display: flex; gap: 1rem)

                    - <div class="form-group"> [STATIC]

                        - <label for="ph"> [STATIC] (Text: "pH (0-14)")

                        - <input id="ph"> [STATIC] (type: number; min: 0; max: 14; required)

                    - <div class="form-group"> [STATIC]

                        - <label for="ec"> [STATIC] (Text: "ElectricalConductivity")

                        - <input id="ec"> [STATIC] (type: number; min: 40; max: 150; required)

                - <div class="form-row"> [STATIC] (CSS: display: flex; gap: 1rem)

                    - <div class="form-group"> [STATIC]

                        - <label for="temp"> [STATIC] (Text: "Temp (C)")

                        - <input id="temp"> [STATIC] (type: number; min: 30; max: 240;
                        required)

                    - <div class="form-group"> [STATIC]

                        - <label for="hm"> [STATIC] (Text: "Humidity")

                        - <input id="hm"> [STATIC] (type: number; min: 50; max: 100; required)

                - <button id="btn-submit"> [STATIC] (type: submit; Event: submit on the form; button triggers form submission)

    - <section class="panel records-panel"> [STATIC] (CSS: display: block)

        - <div class="records-header"> [STATIC] (CSS: display: flex; justify-content: space-between; align-items: center)

            - <h2 class="panel-title"> [STATIC] (Text: "Records Queue")

            - <button id="btn-clear-all"> [STATIC] (type: button by default; Event: click — if handled in app.js; Text: "Purge Queue")

        - <div id="empty-state" class="empty-state"> [STATIC] (CSS: display: block initially; hidden when records exist)

            - <span class="empty-icon"> [STATIC] (Text: 📋)

            - <p> [STATIC] (Text: "No active sensor records.")

        - <ul id="records-list" class="records-grid"> [DYNAMIC] (CSS: display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); Event: aria-live="polite" announces updates)

            - <li class="bay-card status-hazard|status-warning|status-normal"> [DYNAMIC] (Injected by JavaScript; CSS: display: flex; flex-direction: column; left border color indicates risk status)

                - <div class="card-top"> [DYNAMIC] (CSS: display: flex; justify-content: space-between; align-items: flex-start)

                    - <div> [DYNAMIC] (Bay information grouping)

                        - <span class="bay-name-text"> [DYNAMIC] (Bay name)

                        - <span class="timestamp"> [DYNAMIC] (Record timestamp)

                    - <span class="risk-badge hazard|warning|normal"> [DYNAMIC] (Risk classification)

                - <div class="sensor-stats"> [DYNAMIC] (CSS: display: grid; grid-template-columns: 1fr 1fr)

                    - <div class="stat-item"> [DYNAMIC] (Vital measurement)

                        - <span> [DYNAMIC] (Measurement label)

                        - Text node [DYNAMIC] (Measurement value)

                    - Additional sensor-statistic elements [DYNAMIC] (Generated by JavaScript)

    - <footer class="portal-footer"> [STATIC] (CSS: display: block; text-align: center)

        - <p> [STATIC] (Text)

### Section 4.4

    const sensorLoggingSchema = {
        id: "String", //Unique identifier for the bay
        ph: "Number", //Recorded pH
        ec: "Number", //Recorded EC
        temperature: "Number", //Recorded temp
        humidity: "Number", //Recorded humidity
    }
