// document.getElementById("bet-form").addEventListener("submit", function(event) {
//     event.preventDefault();

//     // Get the input values
//     const betDescription = document.getElementById("bet-description").value;
//     const betDate = document.getElementById("bet-date").value;
//     const betAmount = document.getElementById("bet-amount").value;
//     const phoneNumbers = document.getElementById("phone-numbers").value;

//     // Display the input in a confirmation message
//     const outputDiv = document.getElementById("output");
//     outputDiv.innerHTML = `
//         <h3>Bet Created!</h3>
//         <p><strong>Description:</strong> ${betDescription}</p>
//         <p><strong>End Date:</strong> ${betDate}</p>
//         <p><strong>Amount:</strong> $${betAmount}</p>
//         <p><strong>Phone Numbers:</strong> ${phoneNumbers}</p>
//     `;

//     // Show the "Create Another Bet" button and hide the form
//     document.getElementById("new-bet-button").style.display = "block";
//     document.getElementById("bet-form").style.display = "none";
// });

// document.getElementById("new-bet-button").addEventListener("click", function() {
//     // Reset the form and output
//     document.getElementById("bet-form").reset();
//     document.getElementById("output").innerHTML = "";

//     // Show the form again and hide the "Create Another Bet" button
//     document.getElementById("bet-form").style = "visible";
//     document.getElementById("new-bet-button").style.display = "none";
// });
document.getElementById("bet-form").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get the input values
    const betDescription = document.getElementById("bet-description").value;
    const betDate = document.getElementById("bet-date").value;
    const betAmount = document.getElementById("bet-amount").value;
    const phoneNumbers = document.getElementById("phone-numbers").value;

    // Create a bet object
    const betData = {
        description: betDescription,
        endDate: betDate,
        amount: parseFloat(betAmount),
        phoneNumbers: phoneNumbers
    };

    // Send the POST request to the backend API
    fetch('http://localhost:8080/api/bets/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(betData)
    })
    .then(response => response.json())
    .then(data => {
        const outputDiv = document.getElementById("output");
        outputDiv.innerHTML = `
            <h3>Bet Created and Stored!</h3>
            <p><strong>Description:</strong> ${data.description}</p>
            <p><strong>End Date:</strong> ${data.endDate}</p>
            <p><strong>Amount:</strong> $${data.amount}</p>
            <p><strong>Phone Numbers:</strong> ${data.phoneNumbers}</p>
        `;

        // Show the "Create Another Bet" button and hide the form
        document.getElementById("new-bet-button").style.display = "block";
        document.getElementById("bet-form").style.display = "none";
    })
    .catch(error => console.error('Error:', error));
});

document.getElementById("new-bet-button").addEventListener("click", function() {
    // Reset the form and output
    document.getElementById("bet-form").reset();
    document.getElementById("output").innerHTML = "";

    // Show the form again and hide the "Create Another Bet" button
    document.getElementById("bet-form").style.display = "block";
    document.getElementById("new-bet-button").style.display = "none";
});