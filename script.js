/* =====================================
   FAKEMINDSPLINTER
   MAIN JAVASCRIPT
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    // AUTOMATIC FOOTER YEAR

    const yearElements = document.querySelectorAll(".year");

    yearElements.forEach(function (element) {
        element.textContent = new Date().getFullYear();
    });


    // PAGE NAVIGATION

    const pages = document.querySelectorAll(".page");

    const navigationButtons =
        document.querySelectorAll("[data-page]");

    const navLinks =
        document.querySelectorAll(".nav-link");


    function showPage(pageId) {

        // Hide all pages

        pages.forEach(function (page) {
            page.classList.remove("active");
        });

        // Display selected page

        const selectedPage = document.getElementById(pageId);

        if (!selectedPage) {
            return;
        }

        selectedPage.classList.add("active");

        // Update navigation appearance

        navLinks.forEach(function (link) {

            link.classList.toggle(
                "active",
                link.dataset.page === pageId
            );

        });

        // Return to the top

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    // CONNECT ALL PAGE BUTTONS

    navigationButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            showPage(button.dataset.page);

        });

    });


    // LEARNING PROGRESS TRACKER

    const progressCount =
        document.getElementById("progress-count");

    const progressBar =
        document.getElementById("progress-bar");

    const languageButtons =
        document.querySelectorAll("[data-language]");

    const resetButton =
        document.getElementById("reset-progress");

    const storageKey =
        "fakeMindSplinterProgress";


    // GET SAVED PROGRESS

    function getProgress() {

        try {

            const savedProgress = JSON.parse(
                localStorage.getItem(storageKey) || "[]"
            );

            return Array.isArray(savedProgress)
                ? savedProgress
                : [];

        } catch (error) {

            return [];

        }

    }


    // UPDATE PROGRESS

    function updateProgress() {

        if (!progressCount || !progressBar) {
            return;
        }

        const progress = getProgress();

        const completed = progress.length;

        const percentage = (completed / 9) * 100;

        progressCount.textContent = completed;

        progressBar.style.width = percentage + "%";

    }


    // TRACK LEARNING BUTTONS

    languageButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const language = button.dataset.language;

            const progress = getProgress();

            if (!progress.includes(language)) {

                progress.push(language);

                try {

                    localStorage.setItem(
                        storageKey,
                        JSON.stringify(progress)
                    );

                } catch (error) {

                    // The learning link still works.

                }

            }

            updateProgress();

        });

    });


    // RESET PROGRESS

    if (resetButton) {

        resetButton.addEventListener("click", function () {

            try {

                localStorage.removeItem(storageKey);

            } catch (error) {

                // Keep the website functional.

            }

            updateProgress();

        });

    }


    // INITIALISE WEBSITE

    updateProgress();

    showPage("home");

});