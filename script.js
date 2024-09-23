let expenses = [];

// Function to handle form submission and add an expense
document.getElementById('expense-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const description = document.getElementById('description').value;
    const amount = document.getElementById('amount').value;
    const category = document.getElementById('category').value;
    
    // Validate input
    if (description === '' || amount === '' || category === '') {
        alert('Please fill in all fields');
        return;
    }
    
    // Create expense object
    const expense = {
        description,
        amount: parseFloat(amount),
        category,
    };
    
    // Add expense to the array
    expenses.push(expense);
    
    // Clear input fields
    document.getElementById('description').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('category').value = 'Food'; // Reset to default
    
    // Update the expense list and total
    displayExpenses(expenses);
    updateTotalExpense(expenses);
});

// Function to display expenses
function displayExpenses(expenseArray) {
    const expenseList = document.getElementById('expense-list');
    
    // Clear existing list items
    expenseList.innerHTML = '';
    
    // Add new items
    expenseArray.forEach((expense, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${expense.description} - $${expense.amount.toFixed(2)} (${expense.category})</span>
            <button onclick="deleteExpense(${index})">Delete</button>
        `;
        expenseList.appendChild(li);
    });
}

// Function to delete an expense
function deleteExpense(index) {
    expenses.splice(index, 1);
    displayExpenses(expenses);
    updateTotalExpense(expenses);
}

// Function to clear all expenses
document.getElementById('clear-btn').addEventListener('click', function() {
    expenses = [];
    displayExpenses(expenses);
    updateTotalExpense(expenses);
});

// Function to filter expenses by category
function filterExpenses(category) {
    if (category === 'all') {
        displayExpenses(expenses);
        updateTotalExpense(expenses);
    } else {
        const filteredExpenses = expenses.filter(expense => expense.category === category);
        displayExpenses(filteredExpenses);
        updateTotalExpense(filteredExpenses);
    }
}

// Function to calculate and update the total expense
function updateTotalExpense(expenseArray) {
    const total = expenseArray.reduce((acc, expense) => acc + expense.amount, 0);
    document.getElementById('total-expense').textContent = total.toFixed(2);
}
