// We retrieve the different html element
let button = document.getElementsByTagName("button")[0];
let adviceId = document.getElementById("adviceId");
let adviceContent = document.getElementById("adviceContent");

// Api call function
async function generateAdvice() {
	try {
		const response = await fetch("https://api.adviceslip.com/advice");
		return await response.json();
	} catch (error) {
		console.error(error);
	}
}

function displayAdvice(newAdvice) {
	adviceId.textContent = `advice #${newAdvice.id}`;
	adviceContent.textContent = `“${decodeURI(newAdvice.advice)}”`; // We use decode URI to avoid special characters

	// Once the 1.5 second cooldown is finished, we enable the button
	setTimeout(() => {
		button.classList.toggle("disabled");
	}, 1500);
}

button?.addEventListener("click", () => {
	generateAdvice().then(({ slip }) => {
		// We disable the button
		button.classList.toggle("disabled");
		displayAdvice(slip);
	});
});

// Api url https://api.adviceslip.com/advice
