document.addEventListener("DOMContentLoaded", function () {

    const dialog = document.getElementById("certificateDialog");
    const frame = document.getElementById("certificateFrame");
    const downloadLink = document.getElementById("certificateDownload");
    const closeButton = document.getElementById("closeCertificate");

    // Check that all viewer elements exist
    if (!dialog || !frame || !downloadLink || !closeButton) {
        console.error("Certificate viewer elements are missing.");
        return;
    }

    // Open certificate when a View Certificate button is clicked
    document.addEventListener("click", function (event) {

        const button = event.target.closest(".certificate-view-btn");

        if (!button) return;

        const certificatePath = button.getAttribute("data-certificate");

        if (!certificatePath) {
            alert("Certificate file path is missing.");
            return;
        }

        // Set the PDF file in the viewer
        frame.src = certificatePath;

        // Set the download button
        downloadLink.href = certificatePath;

        // Set a suitable download filename
        downloadLink.setAttribute(
            "download",
            certificatePath.split("/").pop()
        );

        // Open the certificate viewer
        if (typeof dialog.showModal === "function") {
            dialog.showModal();
        } else {
            window.open(certificatePath, "_blank");
        }

    });

    // Close certificate viewer
    closeButton.addEventListener("click", function () {
        dialog.close();
        frame.src = "";
    });

    // Close viewer when clicking outside the content
    dialog.addEventListener("click", function (event) {

        if (event.target === dialog) {
            dialog.close();
            frame.src = "";
        }

    });

    // Clear the PDF when the dialog closes
    dialog.addEventListener("close", function () {
        frame.src = "";
    });

});