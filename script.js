/* =====================================================
   WORLD CURRENCY EXCHANGE
   COMPLETE JAVASCRIPT
===================================================== */


/* =====================================================
   CURRENCY DATA
===================================================== */

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


/* =====================================================
   FALLBACK EXCHANGE RATES
   Relative to 1 USD
===================================================== */

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


/* =====================================================
   GLOBAL RATE VARIABLE
===================================================== */

let exchangeRates = {
    ...fallbackRates
};


/* =====================================================
   PAGE ELEMENTS
===================================================== */

const loginPage =
    document.getElementById("loginPage");

const registerPage =
    document.getElementById("registerPage");

const mainPage =
    document.getElementById("mainPage");


/* =====================================================
   CHECK LOGIN
===================================================== */

function checkLogin() {

    const loggedIn =
        localStorage.getItem("currencyLoggedIn");

    if (loggedIn === "true") {

        showMainPage();

    } else {

        showLoginPage();

    }

}


/* =====================================================
   SHOW LOGIN
===================================================== */

function showLoginPage() {

    loginPage.classList.remove("hidden");

    registerPage.classList.add("hidden");

    mainPage.classList.add("hidden");

}


/* =====================================================
   SHOW REGISTER
===================================================== */

function showRegisterPage() {

    loginPage.classList.add("hidden");

    registerPage.classList.remove("hidden");

    mainPage.classList.add("hidden");

}


/* =====================================================
   SHOW MAIN PAGE
===================================================== */

function showMainPage() {

    loginPage.classList.add("hidden");

    registerPage.classList.add("hidden");

    mainPage.classList.remove("hidden");

}


/* =====================================================
   REGISTER
===================================================== */

const registerForm =
    document.getElementById("registerForm");


registerForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const name =
            document.getElementById(
                "registerName"
            ).value.trim();


        const email =
            document.getElementById(
                "registerEmail"
            ).value.trim();


        const password =
            document.getElementById(
                "registerPassword"
            ).value;


        if (password.length < 6) {

            showRegisterMessage(
                "Password must contain at least 6 characters.",
                "red"
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


        showRegisterMessage(
            "✓ Registration successful. You can now login.",
            "green"
        );


        setTimeout(
            function() {

                document.getElementById(
                    "loginEmail"
                ).value = email;

                showLoginPage();

            },
            1200
        );

    }
);


/* =====================================================
   REGISTER MESSAGE
===================================================== */

function showRegisterMessage(
    message,
    color
) {

    const element =
        document.getElementById(
            "registerMessage"
        );

    element.textContent = message;

    element.style.color =
        color === "green"
            ? "#16823b"
            : "#d62828";

}


/* =====================================================
   LOGIN
===================================================== */

const loginForm =
    document.getElementById("loginForm");


loginForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const email =
            document.getElementById(
                "loginEmail"
            ).value.trim();


        const password =
            document.getElementById(
                "loginPassword"
            ).value;


        const savedUser =
            localStorage.getItem(
                "currencyUser"
            );


        /* DEMO ACCOUNT */

        if (
            email === "admin@gmail.com" &&
            password === "admin123"
        ) {

            localStorage.setItem(
                "currencyLoggedIn",
                "true"
            );

            showMainPage();

            loadExchangeRates();

            return;
        }


        /* REGISTERED USER */

        if (!savedUser) {

            showLoginMessage(
                "No account found. Please register first.",
                "red"
            );

            return;

        }


        const user =
            JSON.parse(savedUser);


        if (
            email === user.email &&
            password === user.password
        ) {

            localStorage.setItem(
                "currencyLoggedIn",
                "true"
            );


            showLoginMessage(
                "✓ Login successful.",
                "green"
            );


            setTimeout(
                function() {

                    showMainPage();

                    loadExchangeRates();

                },
                500
            );

        } else {

            showLoginMessage(
                "❌ Invalid email or password.",
                "red"
            );

        }

    }
);


/* =====================================================
   LOGIN MESSAGE
===================================================== */

function showLoginMessage(
    message,
    color
) {

    const element =
        document.getElementById(
            "loginMessage"
        );

    element.textContent = message;

    element.style.color =
        color === "green"
            ? "#16823b"
            : "#d62828";

}


/* =====================================================
   SHOW REGISTER BUTTON
===================================================== */

document.getElementById(
    "showRegister"
).addEventListener(
    "click",
    showRegisterPage
);


/* =====================================================
   SHOW LOGIN BUTTON
===================================================== */

document.getElementById(
    "showLogin"
).addEventListener(
    "click",
    showLoginPage
);


/* =====================================================
   LOGOUT
===================================================== */

document.getElementById(
    "logoutBtn"
).addEventListener(
    "click",
    function() {

        localStorage.removeItem(
            "currencyLoggedIn"
        );

        showLoginPage();

        document.getElementById(
            "loginPassword"
        ).value = "";

    }
);


/* =====================================================
   CONVERTER ELEMENTS
===================================================== */

const amountInput =
    document.getElementById("amount");

const fromCurrency =
    document.getElementById("fromCurrency");

const toCurrency =
    document.getElementById("toCurrency");

const convertBtn =
    document.getElementById("convertBtn");

const conversionResult =
    document.getElementById(
        "conversionResult"
    );


/* =====================================================
   FLAG UPDATE
===================================================== */

function updateFlags() {

    const from =
        fromCurrency.value;

    const to =
        toCurrency.value;


    document.getElementById(
        "fromFlag"
    ).textContent =
        currencies[from].flag;


    document.getElementById(
        "toFlag"
    ).textContent =
        currencies[to].flag;

}


fromCurrency.addEventListener(
    "change",
    updateFlags
);


toCurrency.addEventListener(
    "change",
    updateFlags
);


/* =====================================================
   CONVERT CURRENCY
===================================================== */

convertBtn.addEventListener(
    "click",
    function() {

        const amount =
            parseFloat(
                amountInput.value
            );


        if (
            isNaN(amount) ||
            amount < 0
        ) {

            conversionResult.innerHTML = `
                <div class="result-card">
                    <p style="color:#d62828;">
                        ❌ Please enter a valid amount.
                    </p>
                </div>
            `;

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


        const result =
            (amount / fromRate)
            * toRate;


        const oneUnit =
            toRate / fromRate;


        conversionResult.innerHTML = `

            <div class="result-card">

                <div>
                    ${currencies[from].flag}
                    ${from}
                </div>

                <div class="main-result">

                    ${formatNumber(amount)}
                    ${from}

                    =

                    ${formatNumber(result)}
                    ${to}

                    ${currencies[to].flag}

                </div>

                <p class="rate-text">

                    1 ${from}
                    =
                    ${formatNumber(oneUnit)}
                    ${to}

                </p>

            </div>

        `;

    }
);


/* =====================================================
   FORMAT NUMBER
===================================================== */

function formatNumber(number) {

    return Number(number).toLocaleString(
        "en-US",
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 4
        }
    );

}


/* =====================================================
   SWAP CURRENCIES
===================================================== */

document.getElementById(
    "swapBtn"
).addEventListener(
    "click",
    function() {

        const oldFrom =
            fromCurrency.value;


        fromCurrency.value =
            toCurrency.value;


        toCurrency.value =
            oldFrom;


        updateFlags();

    }
);


/* =====================================================
   LIVE EXCHANGE RATES
===================================================== */

async function loadExchangeRates() {

    const status =
        document.getElementById(
            "ratesStatus"
        );


    status.textContent =
        "Loading exchange rates...";


    try {

        /*
         * Free public API.
         */

        const response =
            await fetch(
                "https://open.er-api.com/v6/latest/USD"
            );


        if (!response.ok) {

            throw new Error(
                "Network error"
            );

        }


        const data =
            await response.json();


        if (
            data &&
            data.rates
        ) {

            Object.keys(
                fallbackRates
            ).forEach(
                function(currency) {

                    if (
                        data.rates[currency]
                    ) {

                        exchangeRates[currency] =
                            data.rates[currency];

                    }

                }
            );


            status.textContent =
                "✓ Exchange rates updated successfully.";


            displayRates();

        } else {

            throw new Error(
                "Invalid API response"
            );

        }

    }

    catch (error) {

        /*
         * If internet/API is unavailable,
         * use fallback rates.
         */

        exchangeRates = {
            ...fallbackRates
        };


        status.textContent =
            "Using reference exchange rates. Live rates are temporarily unavailable.";

        displayRates();

    }

}


/* =====================================================
   DISPLAY EXCHANGE RATES
===================================================== */

function displayRates() {

    const container =
        document.getElementById(
            "ratesContainer"
        );


    container.innerHTML = "";


    const currenciesToShow = [
        "INR",
        "EUR",
        "GBP",
        "JPY",
        "KWD",
        "CNY",
        "CAD",
        "AUD",
        "AED"
    ];


    currenciesToShow.forEach(
        function(currency) {

            const rate =
                exchangeRates[currency];


            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "rate-card";


            card.innerHTML = `

                <div class="rate-flag">
                    ${currencies[currency].flag}
                </div>

                <h3>
                    ${currency}
                </h3>

                <p>
                    ${currencies[currency].name}
                </p>

                <div class="rate-value">
                    1 USD =
                    ${formatNumber(rate)}
                    ${currency}
                </div>

            `;


            container.appendChild(card);

        }
    );

}


/* =====================================================
   CONTACT FORM
===================================================== */

const contactForm =
    document.getElementById(
        "contactForm"
    );


contactForm.addEventListener(
    "submit",
    function(event) {

        const name =
            document.getElementById(
                "contactName"
            ).value.trim();


        const email =
            document.getElementById(
                "contactEmail"
            ).value.trim();


        const message =
            document.getElementById(
                "contactMessage"
            ).value.trim();


        if (
            name.length < 2 ||
            !email ||
            message.length < 5
        ) {

            event.preventDefault();

            showContactResult(
                "❌ Please enter all details correctly.",
                false
            );

            return;
        }


        /*
         * Put visitor email into Reply-To.
         */

        document.getElementById(
            "replyTo"
        ).value = email;


        /*
         * IMPORTANT:
         *
         * We DO NOT call:
         *
         * event.preventDefault()
         *
         * here.
         *
         * The browser must submit the form
         * to FormSubmit.
         */


        const sendButton =
            document.getElementById(
                "sendMessageBtn"
            );


        sendButton.disabled = true;

        sendButton.textContent =
            "Sending Message...";


        /*
         * Show message on current page.
         */

        showContactResult(
            `
                <div class="contact-success">

                    <h4>
                        ✓ Message Submitted
                    </h4>

                    <p>
                        Thank you,
                        <strong>
                            ${escapeHTML(name)}
                        </strong>.
                    </p>

                    <p>
                        Your message is being
                        sent to:
                    </p>

                    <p>
                        <strong>
                            ambatinagendrareddy@gmail.com
                        </strong>
                    </p>

                </div>
            `,
            true
        );

    }
);


/* =====================================================
   CONTACT RESULT
===================================================== */

function showContactResult(
    message,
    success
) {

    const result =
        document.getElementById(
            "contactResult"
        );


    result.innerHTML =
        success
            ? message
            : `<div style="
                    color:#d62828;
                    padding:15px;
                    background:#fff0f0;
                    border-radius:8px;
                ">
                    ${message}
               </div>`;

}


/* =====================================================
   ESCAPE HTML
===================================================== */

function escapeHTML(value) {

    return value
        .replace(/&/g, "&amp;")
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


/* =====================================================
   INITIALIZE
===================================================== */

updateFlags();

checkLogin();

if (
    localStorage.getItem(
        "currencyLoggedIn"
    ) === "true"
) {

    loadExchangeRates();

}