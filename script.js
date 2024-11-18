let dorks = []; // Array to store dorks dynamically loaded from dorks.txt

// Load dorks from dorks.txt
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
const generateQueries = (input) => {
    return dorks
        .map(dork => `${input} ${dork}`) // Combine input with every dork
        .join("\n"); // Join all into a single string
};

// Section 1: Search by Domain Word
document.getElementById("showOutput1").addEventListener("click", () => {
    const input = document.getElementById("domainWord").value.trim();
    if (input) {
        document.getElementById("output1").value = generateQueries(input);
    }
});

document.getElementById("clearOutput1").addEventListener("click", () => {
    document.getElementById("output1").value = "";
});

// Section 2: Search by Domain TLD
document.getElementById("showOutput2").addEventListener("click", () => {
    const input = document.getElementById("domainTLD").value.trim();
    if (input) {
        document.getElementById("output2").value = generateQueries(input);
    }
});

document.getElementById("clearOutput2").addEventListener("click", () => {
    document.getElementById("output2").value = "";
});

// Section 3: Search by Organization
document.getElementById("showOutput3").addEventListener("click", () => {
    const input = document.getElementById("organization").value.trim();
    if (input) {
        document.getElementById("output3").value = generateQueries(input);
    }
});

document.getElementById("clearOutput3").addEventListener("click", () => {
    document.getElementById("output3").value = "";
});
