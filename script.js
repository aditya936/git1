// Load dorks dynamically from dorks.txt
let dorks = [];
fetch('dorks.txt')
    .then(response => {
        if (!response.ok) throw new Error("Failed to load dorks.txt");
        return response.text();
    })
    .then(data => {
        dorks = data.split("\n").map(line => line.trim()).filter(line => line); // Parse dorks into an array
    })
    .catch(error => console.error("Error loading dorks:", error));

// Utility to generate DORK queries
const generateQueries = (input, type) => {
    if (!input) return ""; // Return empty if no input provided

    switch (type) {
        case "domainWord": // Section 1
            return dorks
                .map(dork => `/\\(?:https?:\\/\\/\\)?(?:www\\.)?(?:[\\w-]+\\.)?${input}\\.[a-z]{2,}/ ${dork}`)
                .join("\n");

        case "domainTLD": // Section 2
            return dorks
                .map(dork => `/.+\\.${input}/ ${dork}`)
                .join("\n");

        case "organization": // Section 3
            return dorks
                .map(dork => `org:${input} ${dork}`)
                .join("\n");

        default:
            return "";
    }
};

// Section 1: Search by Domain Word
document.getElementById("showOutput1").addEventListener("click", () => {
    const input = document.getElementById("domainWord").value.trim();
    document.getElementById("output1").value = generateQueries(input, "domainWord");
});

document.getElementById("clearOutput1").addEventListener("click", () => {
    document.getElementById("output1").value = "";
});

// Section 2: Search by Domain TLD
document.getElementById("showOutput2").addEventListener("click", () => {
    const input = document.getElementById("domainTLD").value.trim();
    document.getElementById("output2").value = generateQueries(input, "domainTLD");
});

document.getElementById("clearOutput2").addEventListener("click", () => {
    document.getElementById("output2").value = "";
});

// Section 3: Search by Organization
document.getElementById("showOutput3").addEventListener("click", () => {
    const input = document.getElementById("organization").value.trim();
    document.getElementById("output3").value = generateQueries(input, "organization");
});

document.getElementById("clearOutput3").addEventListener("click", () => {
    document.getElementById("output3").value = "";
});
