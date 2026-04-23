async function searchWord() {
    const input = document.getElementById("searchInput").value.trim();
    const resultBox = document.getElementById("searchResult");

    if (!input) {
        resultBox.innerHTML = "<p>Type something first</p>";
        return;
    }

    try {
        const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${input}`);
        if (!res.ok) throw new Error("Word not found");

        const data = await res.json();
        const wordData = data[0];
        const meaning = wordData.meanings[0];
        const definition = meaning.definitions[0];

        const audio = wordData.phonetics.find(p => p.audio)?.audio;

        resultBox.innerHTML = `
            <h2>${wordData.word}</h2>
            <p><strong>Part of speech:</strong>${meaning.partOfSpeech}</p>
            <p><strong>Definition:</strong>${meaning.definition}</p>
            <p><strong>Example:</strong>${meaning.example || "No exaple available"}</p>
            <p><strong>Synonyms:</strong>${meaning.synonyms?.join(",") || "None"}</p>
            ${audio ? `<audio controls src= "${audio}"></audio>` : "<p>No audio available</p>"}

        `;
    }

    catch (err) {
        resultBox.innerHTML =`<p>Word not found</p>`;
    }
}