function addExpense() {
    const amount = document.getElementById('amount').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;
  
    if (amount && description && category) {
      const expense = { amount, description, category };
  
      let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
      expenses.push(expense);
  
      localStorage.setItem('expenses', JSON.stringify(expenses));
  
      displayExpenses();
      clearForm();
    } else {
      alert('Please fill in all fields.');
    }
  }
  
  function deleteExpense(index) {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    displayExpenses();
  }
  
  function displayExpenses() {
    const expenseList = document.getElementById('expenseList');
    expenseList.innerHTML = '';
  
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  
    expenses.forEach((expense, index) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        Amount: ${expense.amount}, Description: ${expense.description}, Category: ${expense.category}
        <button onclick="deleteExpense(${index})">Delete Expense</button>
        <button onclick="editExpense(${index})">Edit Expense</button>
      `;
      expenseList.appendChild(listItem);
    });
  }
  
  function editExpense(index) {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const selectedExpense = expenses[index];
  
    const newAmount = prompt('Enter new amount:', selectedExpense.amount);
    const newDescription = prompt('Enter new description:', selectedExpense.description);
    const newCategory = prompt('Enter new category:', selectedExpense.category);
  
    if (newAmount !== null && !isNaN(newAmount) && newDescription !== null && newCategory !== null) {
      expenses[index] = { amount: newAmount, description: newDescription, category: newCategory };
      localStorage.setItem('expenses', JSON.stringify(expenses));
      displayExpenses();
    }
  }
  
  function clearForm() {
    document.getElementById('amount').value = '';
    document.getElementById('description').value = '';
    document.getElementById('category').value = '';
  }
  
  displayExpenses();
  