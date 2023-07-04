/**
 * --------------------------------------------------------------------------
 * Tailstart Kit - Boilerplate v0.2.0: app.js
 * Licensed under MIT (https://github.com/mkfizi/tailstart-kit-boilerplate/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

'use strict';

let app = {
    name: 'Tailstart Kit - Boilerplate',
    version: '0.2.0',
};

app.elements = {
    darkModeToggle: document.getElementById('dark-mode-toggle'),
    footerYear: document.getElementById('footer-year'),
    footerAppName: document.getElementById('footer-app-name'),
    footerAppVersion: document.getElementById('footer-app-version'),
};

app.init = () => {
    app.view.init();
    app.event.init();
};

app.event = {
    init: () => {
        document.addEventListener('click', app.event.handleDocumentClick);
        window.addEventListener('resize', app.event.handleWindowResize);
    },

    handleDocumentClick: event => {
        const target = event.target;

        if (target.closest('[id="dark-mode-toggle"]')) {
            app.view.toggleDarkMode();
        } else if (target.closest('[id="navbar-menu-toggle"]')) {
            app.view.toggleNavbarMenu();
        }
    },

    handleWindowResize: () => {
        app.view.toggleViewportHeight();
    }
};

app.view = {
    init: () => {
        app.view.toggleViewportHeight();
        app.view.toggleAppInfo();
    },

    // Toggle the height of the viewport. This is a workaround fix for [viewport height issue on mobile browsers](https://stackoverflow.com/questions/37112218/css3-100vh-not-constant-in-mobile-browser) 
    toggleViewportHeight: () => {
        document.documentElement.style.setProperty('--vh', (window.innerHeight * 0.01) + 'px');
    },

    // Toggle dark mode based on value in 'localStorage.theme'
    toggleDarkMode: () => {
        app.util.toggleTransition();

        const isLightMode = localStorage.theme === 'light' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: light)').matches);
        localStorage.theme = isLightMode ? 'dark' : 'light';
        document.documentElement.classList.toggle('dark', isLightMode);
    },

    // Toogle footer data for year and app name
    toggleAppInfo: () => {
        if (app.elements.footerYear) {
            app.elements.footerYear.innerHTML = new Date().getFullYear();
        }

        if (app.elements.footerAppName) {
            app.elements.footerAppName.innerHTML = app.name;
        }

        if (app.elements.footerAppVersion) {
            app.elements.footerAppVersion.innerHTML = app.version;
        }
    }
};

app.util = {
    // Toggle CSS transitions for smoother element transitions
    toggleTransition: () => {
        const transitions = document.querySelectorAll('.transition, .transition-all, .transition-colors, .transition-opacity, .transition-shadow, .transition-transform');
        for (const transition of transitions) {
            transition.classList.add('transition-none');
            setTimeout(() => {
                transition.classList.remove('transition-none');
            }, 150);
        }
    }
};

app.init();