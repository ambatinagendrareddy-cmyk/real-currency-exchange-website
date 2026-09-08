/* =========================================================
   WORLD CURRENCY EXCHANGE
   COMPLETE JAVASCRIPT
========================================================= */


/* =========================================================
   CURRENCY INFORMATION
========================================================= */

const currencies = {

    USD: {
        name: "US Dollar",
        flag: "🇺🇸"
    },

    INR: {
        name: "Indian Rupee",
        flag: "🇮🇳"
    },

    EUR: {
        name: "Euro",
        flag: "🇪🇺"
    },

    GBP: {
        name: "British Pound",
        flag: "🇬🇧"
    },

    JPY: {
        name: "Japanese Yen",
        flag: "🇯🇵"
    },

    KWD: {
        name: "Kuwaiti Dinar",
        flag: "🇰🇼"
    },

    CNY: {
        name: "Chinese Yuan",
        flag: "🇨🇳"
    },

    CAD: {
        name: "Canadian Dollar",
        flag: "🇨🇦"
    },

    AUD: {
        name: "Australian Dollar",
        flag: "🇦🇺"
    },

    AED: {
        name: "UAE Dirham",
        flag: "🇦🇪"
    }

};


/* =========================================================
   FALLBACK RATES
   USD IS THE BASE CURRENCY
========================================================= */

const fallbackRates = {

    USD: 1,

    INR: 83.50,

    EUR: 0.92,

    GBP: 0.79,

    JPY: 149.50,

    KWD: 0.307,

    CNY: 7.24,

    CAD: 1.36,

    AUD: 1.53,

    AED: 3.6725

};


let exchangeRates = {
    ...fallbackRates
};


/* =========================================================
   LOGIN PAGE ELEMENTS
========================================================= */

const loginForm =
    document.getElementById("loginForm");

const loginName =
    document.getElementById("loginName");

const loginEmail =
    document.getElementById("loginEmail");

const loginPassword =
    document.getElementById("loginPassword");

const loginMessage =
    document.getElementById("loginMessage");


/* =========================================================
   LOGIN
========================================================= */

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                loginName.value.trim();

            const email =
                loginEmail.value
                    .trim()
                    .toLowerCase();

            const password =
                loginPassword.value.trim();


            /* NAME */

            if (name.length < 2) {

                showLoginMessage(
                    "Please enter your full name.",
                    "error"
                );

                loginName.focus();

                return;
            }


            /* EMAIL */

            if (!validateEmail(email)) {

                showLoginMessage(
                    "Please enter a valid email address.",
                    "error"
                );

                loginEmail.focus();

                return;
            }


            /* PASSWORD */

            if (password.length < 6) {

                showLoginMessage(
                    "Password must contain at least 6 characters.",
                    "error"
                );

                loginPassword.focus();

                return;
            }


            /* =================================================
               DEMO ADMIN ACCOUNT
            ================================================= */

            if (
                email === "admin@gmail.com" &&
                password === "admin123"
            ) {

                saveLogin(
                    name,
                    email
                );


                showLoginMessage(
                    "Login successful! Opening application...",
                    "success"
                );


                setTimeout(
                    function () {

                        window.location.href =
                            "index.html";

                    },
                    700
                );


                return;
            }


            /* =================================================
               REGISTERED USER
            ================================================= */

            let registeredUser = null;


            try {

                registeredUser =
                    JSON.parse(
                        localStorage.getItem(
                            "currencyUser"
                        )
                    );

            } catch (error) {

                registeredUser = null;
            }


            if (
                registeredUser &&
                registeredUser.email === email &&
                registeredUser.password === password
            ) {

                saveLogin(
                    registeredUser.name,
                    registeredUser.email
                );


                showLoginMessage(
                    "Login successful! Opening application...",
                    "success"
                );


                setTimeout(
                    function () {

                        window.location.href =
                            "index.html";

                    },
                    700
                );


                return;
            }


            /* INVALID */

            showLoginMessage(
                "Invalid email or password.",
                "error"
            );

        }
    );
}


/* =========================================================
   SAVE LOGIN
========================================================= */

function saveLogin(name, email) {

    localStorage.setItem(
        "currencyLoggedIn",
        "true"
    );

    localStorage.setItem(
        "currencyUserName",
        name
    );

    localStorage.setItem(
        "currencyUserEmail",
        email
    );
}


/* =========================================================
   LOGIN MESSAGE
========================================================= */

function showLoginMessage(
    message,
    type
) {

    if (!loginMessage) {
        return;
    }


    loginMessage.textContent =
        message;


    loginMessage.className =
        "login-message " + type;
}


/* =========================================================
   EMAIL VALIDATION
========================================================= */

function validateEmail(email) {

    const pattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(email);
}


/* =========================================================
   REGISTER SUPPORT
========================================================= */

const registerForm =
    document.getElementById(
        "registerForm"
    );


if (registerForm) {

    registerForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const nameElement =
                document.getElementById(
                    "registerName"
                );

            const emailElement =
                document.getElementById(
                    "registerEmail"
                );

            const passwordElement =
                document.getElementById(
                    "registerPassword"
                );


            if (
                !nameElement ||
                !emailElement ||
                !passwordElement
            ) {

                return;
            }


            const name =
                nameElement.value.trim();

            const email =
                emailElement.value
                    .trim()
                    .toLowerCase();

            const password =
                passwordElement.value.trim();


            if (name.length < 2) {

                alert(
                    "Please enter your full name."
                );

                return;
            }


            if (!validateEmail(email)) {

                alert(
                    "Please enter a valid email address."
                );

                return;
            }


            if (password.length < 6) {

                alert(
                    "Password must contain at least 6 characters."
                );

                return;
            }


            const user = {

                name: name,

                email: email,

                password: password

            };


            localStorage.setItem(
                "currencyUser",
                JSON.stringify(user)
            );


            alert(
                "Registration successful! Please login."
            );


            window.location.href =
                "login.html";

        }
    );
}


/* =========================================================
   MOBILE MENU
========================================================= */

const menuBtn =
    document.getElementById(
        "menubtn"
    );

const navMenu =
    document.getElementById(
        "navmenu"
    );


function toggleMenu() {

    if (
        !menuBtn ||
        !navMenu
    ) {

        return;
    }


    navMenu.classList.toggle(
        "active"
    );


    const isOpen =
        navMenu.classList.contains(
            "active"
        );


    if (isOpen) {

        menuBtn.textContent = "✕";

        menuBtn.setAttribute(
            "aria-expanded",
            "true"
        );

    } else {

        menuBtn.textContent = "☰";

        menuBtn.setAttribute(
            "aria-expanded",
            "false"
        );
    }
}


/*
   Supports:
   onclick="toggle()"
*/

function toggle() {

    toggleMenu();
}


/* =========================================================
   MENU BUTTON
========================================================= */

if (menuBtn) {

    menuBtn.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            /*
               Do not call toggleMenu here if
               inline onclick="toggle()" is active,
               otherwise it toggles twice.
            */

        }
    );
}


/* =========================================================
   CLOSE MOBILE MENU AFTER LINK CLICK
========================================================= */

if (navMenu) {

    const navLinks =
        navMenu.querySelectorAll(
            "a"
        );


    navLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    navMenu.classList.remove(
                        "active"
                    );


                    if (menuBtn) {

                        menuBtn.textContent =
                            "☰";

                        menuBtn.setAttribute(
                            "aria-expanded",
                            "false"
                        );
                    }

                }
            );

        }
    );
}


/* =========================================================
   LOGOUT
========================================================= */

const logoutBtn =
    document.getElementById(
        "logoutBtn"
    );


if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        function () {

            localStorage.removeItem(
                "currencyLoggedIn"
            );

            localStorage.removeItem(
                "currencyUserName"
            );

            localStorage.removeItem(
                "currencyUserEmail"
            );


            window.location.href =
                "login.html";

        }
    );
}


/* =========================================================
   CONVERTER ELEMENTS
========================================================= */

const amountInput =
    document.getElementById(
        "amount"
    );

const fromCurrency =
    document.getElementById(
        "fromCurrency"
    );

const toCurrency =
    document.getElementById(
        "toCurrency"
    );

const convertBtn =
    document.getElementById(
        "convertBtn"
    );

const conversionResult =
    document.getElementById(
        "conversionResult"
    );

const swapBtn =
    document.getElementById(
        "swapBtn"
    );

const fromFlag =
    document.getElementById(
        "fromFlag"
    );

const toFlag =
    document.getElementById(
        "toFlag"
    );


/* =========================================================
   UPDATE FLAGS
========================================================= */

function updateFlags() {

    if (
        fromCurrency &&
        fromFlag
    ) {

        const from =
            currencies[
                fromCurrency.value
            ];


        if (from) {

            fromFlag.textContent =
                from.flag;
        }
    }


    if (
        toCurrency &&
        toFlag
    ) {

        const to =
            currencies[
                toCurrency.value
            ];


        if (to) {

            toFlag.textContent =
                to.flag;
        }
    }
}


/* =========================================================
   CURRENCY CONVERSION
========================================================= */

function convertCurrency() {

    if (
        !amountInput ||
        !fromCurrency ||
        !toCurrency ||
        !conversionResult
    ) {

        return;
    }


    const amount =
        parseFloat(
            amountInput.value
        );


    /* INVALID AMOUNT */

    if (
        Number.isNaN(amount) ||
        amount <= 0
    ) {

        conversionResult.textContent =
            "Please enter a valid amount.";

        conversionResult.className =
            "conversion-result error";

        return;
    }


    const from =
        fromCurrency.value;

    const to =
        toCurrency.value;


    const fromRate =
        exchangeRates[from];

    const toRate =
        exchangeRates[to];


    if (
        typeof fromRate !== "number" ||
        typeof toRate !== "number"
    ) {

        conversionResult.textContent =
            "Exchange rate is currently unavailable.";

        conversionResult.className =
            "conversion-result error";

        return;
    }


    /*
       Convert FROM currency to USD
    */

    const amountInUSD =
        amount / fromRate;


    /*
       Convert USD to TO currency
    */

    const result =
        amountInUSD * toRate;


    if (!Number.isFinite(result)) {

        conversionResult.textContent =
            "Unable to calculate the conversion.";

        conversionResult.className =
            "conversion-result error";

        return;
    }


    const formattedResult =
        result.toLocaleString(
            "en-US",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 4
            }
        );


    const formattedAmount =
        amount.toLocaleString(
            "en-US",
            {
                maximumFractionDigits: 4
            }
        );


    conversionResult.innerHTML =

        "<strong>" +
        formattedAmount +
        " " +
        from +
        "</strong>" +

        " = " +

        "<strong>" +
        formattedResult +
        " " +
        to +
        "</strong>";


    conversionResult.className =
        "conversion-result success";
}


/* =========================================================
   CONVERT BUTTON
========================================================= */

if (convertBtn) {

    convertBtn.addEventListener(
        "click",
        function () {

            convertCurrency();

        }
    );
}


/* =========================================================
   ENTER KEY CONVERSION
========================================================= */

if (amountInput) {

    amountInput.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter"
            ) {

                event.preventDefault();

                convertCurrency();
            }

        }
    );
}


/* =========================================================
   CURRENCY CHANGE
========================================================= */

if (fromCurrency) {

    fromCurrency.addEventListener(
        "change",
        function () {

            updateFlags();

        }
    );
}


if (toCurrency) {

    toCurrency.addEventListener(
        "change",
        function () {

            updateFlags();

        }
    );
}


/* =========================================================
   SWAP
========================================================= */

if (swapBtn) {

    swapBtn.addEventListener(
        "click",
        function () {

            if (
                !fromCurrency ||
                !toCurrency
            ) {

                return;
            }


            const oldFrom =
                fromCurrency.value;


            fromCurrency.value =
                toCurrency.value;


            toCurrency.value =
                oldFrom;


            updateFlags();


            if (
                amountInput &&
                amountInput.value
            ) {

                convertCurrency();
            }

        }
    );
}


/* =========================================================
   LOAD LIVE EXCHANGE RATES
========================================================= */

async function loadLiveRates() {

    const rateStatus =
        document.getElementById(
            "rateStatus"
        );


    try {

        if (rateStatus) {

            rateStatus.textContent =
                "Loading live exchange rates...";
        }


        const response =
            await fetch(
                "https://open.er-api.com/v6/latest/USD"
            );


        if (!response.ok) {

            throw new Error(
                "Exchange rate request failed."
            );
        }


        const data =
            await response.json();


        if (
            !data ||
            !data.rates
        ) {

            throw new Error(
                "Invalid exchange rate data."
            );
        }


        exchangeRates = {

            USD: 1,

            INR:
                Number(data.rates.INR)
                || fallbackRates.INR,

            EUR:
                Number(data.rates.EUR)
                || fallbackRates.EUR,

            GBP:
                Number(data.rates.GBP)
                || fallbackRates.GBP,

            JPY:
                Number(data.rates.JPY)
                || fallbackRates.JPY,

            KWD:
                Number(data.rates.KWD)
                || fallbackRates.KWD,

            CNY:
                Number(data.rates.CNY)
                || fallbackRates.CNY,

            CAD:
                Number(data.rates.CAD)
                || fallbackRates.CAD,

            AUD:
                Number(data.rates.AUD)
                || fallbackRates.AUD,

            AED:
                Number(data.rates.AED)
                || fallbackRates.AED

        };


        displayExchangeRates();


        if (rateStatus) {

            rateStatus.textContent =
                "✓ Live exchange rates loaded successfully.";

        }


        /*
           Recalculate if amount is already entered.
        */

        if (
            amountInput &&
            amountInput.value
        ) {

            convertCurrency();
        }

    }

    catch (error) {

        console.warn(
            "Live exchange rates unavailable:",
            error
        );


        exchangeRates = {
            ...fallbackRates
        };


        displayExchangeRates();


        if (rateStatus) {

            rateStatus.textContent =
                "Using backup exchange rates. Live rates are temporarily unavailable.";

        }

    }

}


/* =========================================================
   DISPLAY EXCHANGE RATE CARDS
========================================================= */

function displayExchangeRates() {

    const ratesContainer =
        document.getElementById(
            "ratesContainer"
        );


    if (!ratesContainer) {

        return;
    }


    ratesContainer.innerHTML = "";


    Object.keys(currencies)
        .forEach(
            function (code) {

                const rate =
                    exchangeRates[code];


                if (
                    typeof rate !==
                    "number"
                ) {

                    return;
                }


                const card =
                    document.createElement(
                        "div"
                    );


                card.className =
                    "rate-card";


                const flag =
                    currencies[code].flag;

                const name =
                    currencies[code].name;


                card.innerHTML = `

                    <div class="rate-flag">
                        ${flag}
                    </div>

                    <h3>
                        ${code}
                    </h3>

                    <p>
                        ${name}
                    </p>

                    <strong>
                        1 USD =
                        ${rate.toFixed(4)}
                        ${code}
                    </strong>

                `;


                ratesContainer.appendChild(
                    card
                );

            }
        );
}


/* =========================================================
   CONTACT FORM
========================================================= */

const contactForm =
    document.getElementById(
        "contactForm"
    );


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function () {

            const sendMessageBtn =
                document.getElementById(
                    "sendMessageBtn"
                );


            const contactResult =
                document.getElementById(
                    "contactResult"
                );


            if (sendMessageBtn) {

                sendMessageBtn.textContent =
                    "Sending...";

                sendMessageBtn.disabled =
                    true;
            }


            if (contactResult) {

                contactResult.textContent =
                    "Sending your message...";
            }

        }
    );
}


/* =========================================================
   SMOOTH NAVIGATION
========================================================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(
        function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    const targetId =
                        this.getAttribute(
                            "href"
                        );


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {

                        return;
                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (target) {

                        event.preventDefault();


                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }
            );

        }
    );


/* =========================================================
   INITIALIZE
========================================================= */

function initializeApplication() {

    updateFlags();

    displayExchangeRates();

    loadLiveRates();

}


/* =========================================================
   PAGE LOAD
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateFlags();

        displayExchangeRates();

        /*
           Only load live rates when the
           currency application exists.
        */

        if (
            document.getElementById(
                "ratesContainer"
            )
        ) {

            loadLiveRates();

        }

    }
);