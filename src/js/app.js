/**
 * --------------------------------------------------------------------------
 * Tailstart Kit - Boilerplate v0.2.0: app.js
 * Licensed under MIT (https://github.com/mkfizi/tailstart-kit-boilerplate/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

(function () {
    'use strict';

    const app = {};

    app.name = 'Tailstart Kit - Boilerplate';
    app.version = '0.2.0';

    app.element = {
        darkModeToggle: document.getElementById('dark-mode-toggle'),
        footerCurrentYear: document.getElementById('footer-year'),
        footerAppName: document.getElementById('footer-app-name'),
        footerAppVersion: document.getElementById('footer-app-version'),
    }
    
    app.view = {
        // Workaround fix to handle viewport height issue on mobile browsers
        viewportHeight: {
            // https://stackoverflow.com/questions/37112218/css3-100vh-not-constant-in-mobile-browser
            toggle: () => {
                document.documentElement.style.setProperty('--vh', (window.innerHeight * 0.01) + 'px');
            }
        },

        footer: {
            // Toggle footer content with current year, app name and version
            toggle: () => {
                if (app.element.footerCurrentYear) {
                    app.element.footerCurrentYear.innerHTML = new Date().getFullYear();
                }

                if (app.element.footerAppName) {
                    app.element.footerAppName.innerHTML = app.name;
                }
                
                if (app.element.footerAppVersion) {
                    app.element.footerAppVersion.innerHTML = app.version;
                }
            }
        },


        darkMode: {
            // Toggle dark mode
            toggle: () => {
                const isDarkMode = localStorage.theme === 'light' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: light)').matches);
                localStorage.theme = isDarkMode ? 'dark' : 'light';
                document.documentElement.classList.toggle('dark', isDarkMode);
            }
        },

        // Initialize view
        init: () => {
            app.view.viewportHeight.toggle();
            app.view.footer.toggle();
        }
    }

    app.event = {
        document: {
            // Handle document 'click event
            click: event => {
                const targetElement = event.target.closest('[id]');
                if (targetElement) {
                    const targetId = targetElement.getAttribute('id');
                    switch (targetId) {
                        case app.element.darkModeToggle.getAttribute('id'):
                            app.view.darkMode.toggle();
                            break;
                    }
                }
            }
        },

        window: {
            // Handle window 'resize' event
            resize: () => {
                app.view.viewportHeight.toggle();
            }
        },

        init: () => {
            document.addEventListener('click', app.event.document.click);
            window.addEventListener('resize', app.event.window.resize);
        }
    },

    app.init = () => {
        app.view.init();
        app.event.init();
    }

    app.init();
})();