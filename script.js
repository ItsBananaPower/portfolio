function toggleProject(element) {
    const content = element.querySelector(".project-content");
    const arrow = element.querySelector(".arrow");

    if (content.classList.contains("open")) {
        content.style.maxHeight = null;
        content.classList.remove("open");
        arrow.style.transform = "rotate(0deg)";
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
        content.classList.add("open");
        arrow.style.transform = "rotate(180deg)";
    }
}
