document.getElementById("bet-form").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get the input values
    const betDescription = document.getElementById("bet-description").value;
    const betDate = document.getElementById("bet-date").value;
    const betAmount = document.getElementById("bet-amount").value;
    const phoneNumbers = document.getElementById("phone-numbers").value.split(',').map(num => num.trim());

    // Ensure exactly two phone numbers are provided
    if (phoneNumbers.length !== 2) {
        alert("Please enter exactly two phone numbers, separated by a comma.");
        return;
    }

    // Create a bet object with two phone numbers
    const betData = {
        description: betDescription,
        endDate: betDate,
        amount: parseFloat(betAmount),
        phoneNumber1: phoneNumbers[0],
        phoneNumber2: phoneNumbers[1]
    };

    // Send the POST request to the backend API
    fetch('https://35.197.112.245/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        body: JSON.stringify(betData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to create the bet');
        }
        return response.json();
    })
    .then(data => {
        const outputDiv = document.getElementById("output");
        outputDiv.innerHTML = `
            <h3>Bet Created and Stored!</h3>
            <p><strong>Description:</strong> ${data.description}</p>
            <p><strong>End Date:</strong> ${data.endDate}</p>
            <p><strong>Amount:</strong> $${data.amount}</p>
            <p><strong>Phone Number 1:</strong> ${data.phoneNumber1}</p>
            <p><strong>Phone Number 2:</strong> ${data.phoneNumber2}</p>
        `;

        // Show the "Create Another Bet" button and hide the form
        document.getElementById("new-bet-button").style.display = "block";
        document.getElementById("bet-form").style.display = "none";
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while creating the bet.');
    });
});

document.getElementById("new-bet-button").addEventListener("click", function() {
    // Reset the form and output
    document.getElementById("bet-form").reset();
    document.getElementById("output").innerHTML = "";

    // Show the form again and hide the "Create Another Bet" button
    document.getElementById("bet-form").style.display = "block";
    document.getElementById("new-bet-button").style.display = "none";
});