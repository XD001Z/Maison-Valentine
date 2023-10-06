document.addEventListener("DOMContentLoaded", () => {
    const cancel = document.getElementById("popup");
    cancel.addEventListener("click", () => {
        const result = confirm("Do you really want to cancel your subscription?");
        console.log(result)
        if (result) {
            window.location.href = '/subscription/cancel';
        }
    });
});
