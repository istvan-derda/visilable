import uuid from "uuid-random";

let all_batches
let i = 0;

export async function fetchAllBatches() {
    let batches_dto = await fetch("https://visilable-backend.herokuapp.com/toRate").then(response => response.json())
    all_batches = batches_dto.batches
}

export function saveLabeledCombinations(labeledCombinations) {
    for (let labeledCombination of labeledCombinations) {
        saveLabeledCombination(labeledCombination)
    }
}

function saveLabeledCombination({userId, designId, backgroundColor, visibilityScore}) {
    fetch("https://visilable-backend.herokuapp.com/submitRating", {
        method: "POST",
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "ratings": [
                {
                    "user_id": userId, "design_id": designId, "background_color": backgroundColor.replace("#", ""), "rating": visibilityScore
                }
            ]
        })
    })
}

export function hasNextToCheck() {
    return all_batches.length > i + 1
}

export function getNextToCheck() {
    let nextToCheck = all_batches[i]
    i++;
    return nextToCheck.background_colors.map(color => ({id: uuid(), designId: nextToCheck.design_id, background: color}))
}