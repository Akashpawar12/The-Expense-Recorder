let expenseList = document.getElementById("expenseList");
let totalAmount = document.getElementById("totalAmount");

// Load expenses from local storage
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
updateExpenseList();

function addExpense() {
    let name = document.getElementById("expenseName").value.trim();
    let amount = document.getElementById("expenseAmount").value.trim();
    let category = document.getElementById("expenseCategory").value;

    if (name === "" || amount === "") {
        alert("Please enter a valid expense name and amount!");
        return;
    }

    let expense = {
        id: Date.now(),
        name: name,
        amount: parseFloat(amount),
        category: category
    };

    expenses.push(expense);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    
    updateExpenseList();
    document.getElementById("expenseName").value = "";
    document.getElementById("expenseAmount").value = "";
}

function updateExpenseList() {
    expenseList.innerHTML = "";
    let total = 0;

    expenses.forEach(expense => {
        let li = document.createElement("li");
        li.innerHTML = `<span>${expense.name} - ₹${expense.amount} (${expense.category})</span> 
            <button class="delete-btn" onclick="deleteExpense(${expense.id})">Delete</button>`;

        expenseList.appendChild(li);
        total += expense.amount;
    });

    totalAmount.innerText = total;
}

function deleteExpense(id) {
    expenses = expenses.filter(expense => expense.id !== id);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    updateExpenseList();
}
