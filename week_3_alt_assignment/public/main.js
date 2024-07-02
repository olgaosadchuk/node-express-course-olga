document.getElementById('guessButton').addEventListener('click', () => {
    const guessInput = document.getElementById('guessInput');
    const resultMessage = document.getElementById('resultMessage');
    const userGuess = guessInput.value;

    fetch(`/guess?number=${userGuess}`)
        .then(response => response.json())
        .then(data => {
            resultMessage.textContent = data.message;
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
