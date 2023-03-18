const toastInfo = [
    {
        title: "Low Battery",
        content: "Your battery will be critically low in three hours.",
        top: 10,
        left: 10,
        errorType: "bi-exclamation-triangle-fill",
    },
    {
        title: "Folder Access",
        content: "You don't have permission to access 'C:/Document/My Pictures'",
        top: 70,
        left: 30,
        errorType: "bi-x-circle-fill",
    },
    {
        title: "xxx.exe Message",
        content: "A fetal error occurred while trying to sysprep the machine.",
        top: 61,
        left: 54,
        errorType: "bi-exclamation-circle-fill",
    },
    {
        title: "File and Folder Rename",
        content: "Can't rename 'Pictures' because a file or folder with that name already exists.",
        top: 30,
        left: 76,
        errorType: "bi-x-circle-fill",
    },
    {
        title: "Error Details",
        content: "The following information was found for this error:",
        subcontent: "Code: 0xC004C8<br/>Description: The active server determined that the specified product key could not be used.",
        top: 13,
        left: 48,
        errorType: "bi-exclamation-circle-fill",
    },
    {
        title: "Network",
        content: "The network cable might be unplugged.",
        top: 50,
        left: 40,
        errorType: "bi-exclamation-triangle-fill",
    },
    {
        title: "Security Warning",
        content: "Allowing active content such as script and ActiveX controls can be useful.But active content might also harm your computer.",
        top: 0,
        left: 36,
        errorType: "bi-exclamation-triangle-fill",
    },
    {
        title: "xxx.exe - Dll Initialization Failed",
        content: "The application failed to initialize because the window station is being shut down.",
        top: 60,
        left: 3,
        errorType: "bi-x-circle-fill",
    },
    {
        title: "Remove Fabrikam",
        content: "Program removal failure",
        subcontent: "You must restart Windows to completely remove the program.",
        top: 69,
        left: 72,
        errorType: "bi-x-circle-fill",
    },
    {
        title: "Fabrikam Antivirus",
        content: "For the tenth time today, your virus signatures are out of date!",
        subcontent: "What's your problem?",
        top: 39,
        left: 9,
        errorType: "bi-exclamation-triangle-fill",
    },
    {
        title: "System error",
        content: "Unexpected error. This request is not supported by network.",
        top: 6,
        left: 71,
        errorType: "bi-exclamation-triangle-fill",
    },
    {
        title: "System Backup",
        content: "You don't have privilege to perform a system backup",
        subcontent: "To perform this task, contact the administrator of this computer.",
        top: 0,
        left: 0,
        errorType: "bi-x-circle-fill",
    },
];


function ToastsDisplay() {
    const container = document.getElementById("error-messages-wrapper");
    const cleaner = document.getElementById("error-message-cleaner");
    let animationFinishedCounter = 0;

    [...toastInfo].map((info) => {
        let toastEl = document.createElement("div");
        toastEl.className = "toast-container";
        toastEl.style.top = `${info.top}%`;
        toastEl.style.left = `${info.left}%`;
        toastEl.style.animationDelay = Math.random() * 1 + "s";
        toastEl.style.zIndex = 0;

        toastEl.innerHTML = `
            <div
                class="toast"
                id="toast"
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
            >
                <div class="toast-header justify-content-between">
                    <div>
                        <strong class="text-uppercase">${info.title}</strong>
                    </div>
                    <button
                        type="button"
                        class="btn-close"
                        aria-label="Close"
                    ></button>
                </div>
                <div class="toast-body vstack">
                    <div class="hstack">
                        <i class="bi fs-2 me-2 ${info.errorType}"></i>
                        <div class="vstack">
                            <span>${info.content}</span>
                            <small class="${info.subcontent === undefined ? "visually-hidden" : ""}">${info.subcontent}</small>
                        </div>
                    </div>
                    <button 
                        type="button" 
                        class="btn btn-transparent border border-secondary align-self-end py-1 mt-2" 
                        aria-label="Close"
                    >
                        close
                    </button>
                </div>
            </div>
        `
        container.appendChild(toastEl);
        executeToast()

        toastEl.addEventListener("animationend", () => {
            animationFinishedCounter += 1;

            if (animationFinishedCounter === toastInfo.length) {
                cleaner.classList.remove("visually-hidden");
            }
        })
    });
    onMessageAllCleaned(cleaner, container)
}

function executeToast() {
    const options = {
        animation: true,
        autohide: false,
    };

    const toastEls = document.querySelectorAll(".toast");
    toastEls.forEach((toastEl) => {
        const toast = new bootstrap.Toast(toastEl, options);
        toast.show();

        const dismissButtons = toastEl.querySelectorAll('button[aria-label="Close"]');
        dismissButtons.forEach(dismissButton => {
            dismissButton.onclick = () => {
                toast.hide();
            }
        })
    })
}

function onMessageAllCleaned(cleaner, container) {
    const errorMessages = document.querySelectorAll(".toast");
    let amountOfDismissMessage = 0

    errorMessages.forEach(errorMessage => {
        errorMessage.addEventListener("hidden.bs.toast", () => {
            amountOfDismissMessage += 1;

            // while message all dismissed
            if (amountOfDismissMessage === toastInfo.length) {
                const bannerTexts = document.querySelectorAll(".error-text");
                const siteSectionText = document.querySelector(".site-section-text");
                const siteSectionImage = document.querySelector(".site-section-img");

                bannerTexts.forEach(bannerText => {
                    bannerText.setAttribute("data-text-animation", "hiding");
                })

                siteSectionText.style.transform = "translateY(0)";
                siteSectionImage.style.transform = "translateY(0)";

                cleaner.classList.add('visually-hidden');

                container.remove();
            }
        })
    })
}