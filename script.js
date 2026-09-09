/* =========================================
   WORLD CURRENCY EXCHANGE
   COMPLETE JAVASCRIPT
========================================= */

"use strict";


/* =========================================
   STORAGE KEYS
========================================= */

const USERS_KEY = "wce_users";
const CURRENT_USER_KEY = "wce_currentUser";


/* =========================================
   REMOVE OLD AUTO-FILL STORAGE
   Does NOT remove registered users.
========================================= */

localStorage.removeItem("email");
localStorage.removeItem("password");

sessionStorage.removeItem("email");
sessionStorage.removeItem("password");


/* =========================================
   STORAGE FUNCTIONS
========================================= */

function getUsers() {

    try {

        const users =
            localStorage.getItem(USERS_KEY);

        return users
            ? JSON.parse(users)
            : [];

    } catch (error) {

        console.error(
            "Unable to read users:",
            error
        );

        return [];
    }
}


function saveUsers(users) {

    localStorage.setItem(
        USERS_KEY,
        JSON.stringify(users)
    );
}


function getCurrentUser() {

    try {

        const user =
            sessionStorage.getItem(
                CURRENT_USER_KEY
            );

        return user
            ? JSON.parse(user)
            : null;

    } catch (error) {

        return null;
    }
}


function setCurrentUser(user) {

    sessionStorage.setItem(
        CURRENT_USER_KEY,
        JSON.stringify(user)
    );
}


function logoutUser() {

    sessionStorage.removeItem(
        CURRENT_USER_KEY
    );

    window.location.href = "login.html";
}


/* =========================================
   MESSAGE FUNCTION
========================================= */

function showMessage(
    element,
    message,
    type
) {

    if (!element) {
        return;
    }

    element.textContent = message;

    element.className =
        "form-message " + type;
}


/* =========================================
   EMAIL VALIDATION
========================================= */

function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(email);
}


/* =========================================
   PASSWORD VALIDATION
========================================= */

function isStrongPassword(password) {

    return (
        password.length >= 8 &&
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /[0-9]/.test(password)
    );
}


/* =========================================
   REGISTER
========================================= */

const registerForm =
    document.getElementById(
        "registerForm"
    );

if (registerForm) {

    const nameInput =
        document.getElementById(
            "registerName"
        );

    const emailInput =
        document.getElementById(
            "registerEmail"
        );

    const passwordInput =
        document.getElementById(
            "registerPassword"
        );

    const confirmInput =
        document.getElementById(
            "confirmPassword"
        );

    const termsInput =
        document.getElementById(
            "terms"
        );

    const message =
        document.getElementById(
            "registerMessage"
        );


    registerForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const name =
                nameInput.value.trim();

            const email =
                emailInput.value
                    .trim()
                    .toLowerCase();

            const password =
                passwordInput.value;

            const confirmPassword =
                confirmInput.value;


            if (name.length < 2) {

                showMessage(
                    message,
                    "Please enter your full name.",
                    "error"
                );

                nameInput.focus();

                return;
            }


            if (!isValidEmail(email)) {

                showMessage(
                    message,
                    "Please enter a valid email address.",
                    "error"
                );

                emailInput.focus();

                return;
            }


            if (!isStrongPassword(password)) {

                showMessage(
                    message,
                    "Password must contain at least 8 characters, one uppercase letter, one lowercase letter and one number.",
                    "error"
                );

                passwordInput.focus();

                return;
            }


            if (password !== confirmPassword) {

                showMessage(
                    message,
                    "Passwords do not match.",
                    "error"
                );

                confirmInput.focus();

                return;
            }


            if (!termsInput.checked) {

                showMessage(
                    message,
                    "Please accept the Terms & Conditions.",
                    "error"
                );

                return;
            }


            const users = getUsers();


            const existingUser =
                users.find(
                    user =>
                        user.email === email
                );


            if (existingUser) {

                showMessage(
                    message,
                    "An account with this email already exists.",
                    "error"
                );

                emailInput.focus();

                return;
            }


            const newUser = {

                id:
                    Date.now()
                    .toString(),

                name: name,

                email: email,

                password: password
            };


            users.push(newUser);

            saveUsers(users);


            showMessage(
                message,
                "Account created successfully. Redirecting to login...",
                "success"
            );


            registerForm.reset();


            setTimeout(
                function () {

                    window.location.href =
                        "login.html";

                },
                1200
            );

        }
    );
}


/* =========================================
   LOGIN
========================================= */

const loginForm =
    document.getElementById(
        "loginForm"
    );

if (loginForm) {

    const emailInput =
        document.getElementById(
            "loginEmail"
        );

    const passwordInput =
        document.getElementById(
            "loginPassword"
        );

    const message =
        document.getElementById(
            "loginMessage"
        );


    /*
       Force fields empty when login page opens.
       This prevents our JavaScript from restoring
       previous login details.
    */

    emailInput.value = "";
    passwordInput.value = "";


    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const email =
                emailInput.value
                    .trim()
                    .toLowerCase();

            const password =
                passwordInput.value;


            if (!isValidEmail(email)) {

                showMessage(
                    message,
                    "Please enter a valid email address.",
                    "error"
                );

                emailInput.focus();

                return;
            }


            if (!password) {

                showMessage(
                    message,
                    "Please enter your password.",
                    "error"
                );

                passwordInput.focus();

                return;
            }


            const users = getUsers();


            const user =
                users.find(
                    account =>
                        account.email === email &&
                        account.password === password
                );


            if (!user) {

                showMessage(
                    message,
                    "Invalid email or password.",
                    "error"
                );

                passwordInput.value = "";

                passwordInput.focus();

                return;
            }


            /*
               Store only the current session.
               No separate email/password storage.
            */

            setCurrentUser({
                id: user.id,
                name: user.name,
                email: user.email
            });


            showMessage(
                message,
                "Login successful. Opening dashboard...",
                "success"
            );


            loginForm.reset();


            setTimeout(
                function () {

                    window.location.href =
                        "index.html";

                },
                700
            );

        }
    );
}


/* =========================================
   FORGOT / PASSWORD RESET
========================================= */

const forgotForm =
    document.getElementById(
        "forgotForm"
    );

if (forgotForm) {

    const emailInput =
        document.getElementById(
            "resetEmail"
        );

    const passwordInput =
        document.getElementById(
            "newPassword"
        );

    const confirmInput =
        document.getElementById(
            "newPasswordConfirm"
        );

    const message =
        document.getElementById(
            "forgotMessage"
        );


    forgotForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const email =
                emailInput.value
                    .trim()
                    .toLowerCase();

            const password =
                passwordInput.value;

            const confirmPassword =
                confirmInput.value;


            if (!isValidEmail(email)) {

                showMessage(
                    message,
                    "Please enter a valid registered email.",
                    "error"
                );

                emailInput.focus();

                return;
            }


            if (!isStrongPassword(password)) {

                showMessage(
                    message,
                    "New password must contain at least 8 characters, one uppercase letter, one lowercase letter and one number.",
                    "error"
                );

                passwordInput.focus();

                return;
            }


            if (password !== confirmPassword) {

                showMessage(
                    message,
                    "New passwords do not match.",
                    "error"
                );

                confirmInput.focus();

                return;
            }


            const users = getUsers();


            const userIndex =
                users.findIndex(
                    user =>
                        user.email === email
                );


            if (userIndex === -1) {

                showMessage(
                    message,
                    "No account was found with this email address.",
                    "error"
                );

                return;
            }


            users[userIndex].password =
                password;


            saveUsers(users);


            showMessage(
                message,
                "Password updated successfully. Redirecting to login...",
                "success"
            );


            forgotForm.reset();


            setTimeout(
                function () {

                    window.location.href =
                        "login.html";

                },
                1200
            );

        }
    );
}


/* =========================================
   PASSWORD SHOW / HIDE
========================================= */

const passwordToggles =
    document.querySelectorAll(
        ".password-toggle"
    );


passwordToggles.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const targetId =
                    button.dataset.target;

                const input =
                    document.getElementById(
                        targetId
                    );


                if (!input) {
                    return;
                }


                if (
                    input.type ===
                    "password"
                ) {

                    input.type = "text";

                    button.textContent = "🙈";

                    button.setAttribute(
                        "aria-label",
                        "Hide password"
                    );

                } else {

                    input.type = "password";

                    button.textContent = "👁";

                    button.setAttribute(
                        "aria-label",
                        "Show password"
                    );
                }

            }
        );

    }
);


/* =========================================
   LOGOUT
========================================= */

const logoutButtons =
    document.querySelectorAll(
        "#logoutBtn, .logout-btn, [data-logout]"
    );


logoutButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                logoutUser();

            }
        );

    }
);


/* =========================================
   PROTECTED DASHBOARD
========================================= */

const protectedPage =
    document.body.dataset.protected ===
    "true";


if (protectedPage) {

    const currentUser =
        getCurrentUser();


    if (!currentUser) {

        window.location.replace(
            "login.html"
        );

    } else {

        const userNameElements =
            document.querySelectorAll(
                "#userName, .user-name, [data-user-name]"
            );


        userNameElements.forEach(
            function (element) {

                element.textContent =
                    currentUser.name;

            }
        );
    }
}


/* =========================================
   CURRENCY CONVERTER
========================================= */

const converterForm =
    document.getElementById(
        "converterForm"
    );


if (converterForm) {

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

    const result =
        document.getElementById(
            "result"
        );


    /*
       Demo rates based on USD.
       These values are for frontend demonstration.
    */

    const rates = {

        USD: 1,

        INR: 95.50,

        EUR: 0.92,

        GBP: 0.78,

        JPY: 147.00,

        KWD: 0.308,

        CNY: 14,

        CAD: 1.36,

        AUD: 1.51
    };


    converterForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const amount =
                Number(
                    amountInput.value
                );


            const from =
                fromCurrency.value;


            const to =
                toCurrency.value;


            if (
                !Number.isFinite(amount) ||
                amount <= 0
            ) {

                result.textContent =
                    "Please enter an amount greater than 0.";

                return;
            }


            if (!rates[from] || !rates[to]) {

                result.textContent =
                    "Currency rate is unavailable.";

                return;
            }


            /*
               Convert:
               Source currency -> USD -> Target currency
            */

            const amountInUSD =
                amount / rates[from];


            const convertedAmount =
                amountInUSD * rates[to];


            const formatted =
                convertedAmount.toLocaleString(
                    "en-IN",
                    {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    }
                );


            result.innerHTML =
                `
                <strong>
                    ${amount.toLocaleString("en-IN", {
                        maximumFractionDigits: 2
                    })}
                    ${from}
                </strong>

                &nbsp; = &nbsp;

                <strong>
                    ${formatted}
                    ${to}
                </strong>
                `;

        }
    );
}


/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuButton =
    document.getElementById(
        "menuBtn"
    );

const navMenu =
    document.getElementById(
        "navMenu"
    );


if (menuButton && navMenu) {

    menuButton.addEventListener(
        "click",
        function () {

            navMenu.classList.toggle(
                "active"
            );

        }
    );


    navMenu
        .querySelectorAll("a")
        .forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        navMenu.classList.remove(
                            "active"
                        );

                    }
                );

            }
        );
}


/* =========================================
   LOGIN PAGE: CLEAR FIELDS WHEN RETURNING
========================================= */

window.addEventListener(
    "pageshow",
    function () {

        const loginEmail =
            document.getElementById(
                "loginEmail"
            );

        const loginPassword =
            document.getElementById(
                "loginPassword"
            );


        if (loginEmail && loginPassword) {

            loginEmail.value = "";

            loginPassword.value = "";

        }

    }
);
/* =========================================
   CONTACT FORM
========================================= */

const contactForm =
    document.getElementById("contactForm");

if (contactForm) {

    const contactName =
        document.getElementById("contactName");

    const contactEmail =
        document.getElementById("contactEmail");

    const contactSubject =
        document.getElementById("contactSubject");

    const contactMessage =
        document.getElementById("contactMessage");

    const contactMessageBox =
        document.getElementById("contactMessageBox");


    contactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                contactName.value.trim();

            const email =
                contactEmail.value.trim();

            const subject =
                contactSubject.value.trim();

            const message =
                contactMessage.value.trim();


            if (name.length < 2) {

                showMessage(
                    contactMessageBox,
                    "Please enter your full name.",
                    "error"
                );

                contactName.focus();

                return;
            }


            if (!isValidEmail(email)) {

                showMessage(
                    contactMessageBox,
                    "Please enter a valid email address.",
                    "error"
                );

                contactEmail.focus();

                return;
            }


            if (subject.length < 3) {

                showMessage(
                    contactMessageBox,
                    "Please enter a subject.",
                    "error"
                );

                contactSubject.focus();

                return;
            }


            if (message.length < 10) {

                showMessage(
                    contactMessageBox,
                    "Please enter a message with at least 10 characters.",
                    "error"
                );

                contactMessage.focus();

                return;
            }


            /*
               Frontend demo:
               Save contact message locally.
            */

            const contactMessages =
                JSON.parse(
                    localStorage.getItem(
                        "wce_contactMessages"
                    ) || "[]"
                );


            contactMessages.push({

                id: Date.now(),

                name: name,

                email: email,

                subject: subject,

                message: message,

                date:
                    new Date().toISOString()

            });


            localStorage.setItem(
                "wce_contactMessages",
                JSON.stringify(
                    contactMessages
                )
            );


            showMessage(
                contactMessageBox,
                "Your message has been submitted successfully. Thank you for contacting us!",
                "success"
            );


            contactForm.reset();

        }
    );
}