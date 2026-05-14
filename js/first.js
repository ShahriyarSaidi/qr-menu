document.addEventListener("DOMContentLoaded", function () {
  const copyButton = document.querySelector(".password-copy-icon");
  const passwordDiv = document.querySelector(".password");
  const toast = document.querySelector(".copy-toast");

  if (copyButton && passwordDiv) {
    copyButton.addEventListener("click", async function () {
      const fullText = passwordDiv.textContent.trim();
      const password = fullText.replace("Sifre:", "").trim();

      try {
        await navigator.clipboard.writeText(password);

        // Toast göstər
        toast.classList.add("show");

        setTimeout(() => {
          toast.classList.remove("show");
        }, 2000);

      } catch (err) {
        console.error("Kopyalama alınmadı:", err);
      }
    });
  }
});