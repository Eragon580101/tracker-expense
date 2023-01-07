const addTransactionButton = document.querySelector(".submit");
const form = document.querySelector("form");
const ulIncome = document.querySelector(".income-list");
const ulExpense = document.querySelector(".expense-list");
const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const error = document.querySelector(".error");
const alert = document.querySelector('.alert')

let transactionsFromLocalStorage = localStorage.getItem("transactions")
  ? JSON.parse(localStorage.getItem("transactions"))
  : [];

const listTemplate = (id, Date, name, amount) => `<li data-id=${id}>
                                                        <p>${name}
                                                            <span>${Date}</span>
                                                        </p>
                                                        <p>Rs <span id="">${amount}</span></p>
                                                        <i class="fas fa-trash delete"></i>
                                                    </li>`;

const addTransactions = (transaction) => {
  if (transaction.amount > 0)
    ulIncome.innerHTML += listTemplate(
      transaction.id,
      transaction.time,
      transaction.source,
      transaction.amount
    );
  else
    ulExpense.innerHTML += listTemplate(
      transaction.id,
      transaction.time,
      transaction.source,
      Math.abs(transaction.amount)
    );
};

const storeTransactions = (transactions) => {
  localStorage.setItem("transactions", JSON.stringify(transactions));
};

const calculateTransactions = (transactions) => {
  const totalBalance = transactions.reduce(
    (acc, trans) => (acc += trans.amount),
    0
  );

  const totalIncome = transactions
    .filter((trans) => trans.amount > 0)
    .reduce((acc, trans) => (acc += trans.amount), 0);

  const totalExpense = transactions
    .filter((trans) => trans.amount < 0)
    .reduce((acc, trans) => (acc += trans.amount), 0);

  balance.innerHTML = totalBalance;
  expense.innerHTML = Math.abs(totalExpense);
  income.innerHTML = totalIncome;
};

const deleteTransaction = (id) => {
  transactionsFromLocalStorage = transactionsFromLocalStorage.filter(
    (trans) => Number(trans.id) !== Number(id)
  );
  storeTransactions(transactionsFromLocalStorage);
};

function init() {
  transactionsFromLocalStorage.forEach((trans) => addTransactions(trans));
  calculateTransactions(transactionsFromLocalStorage);
}

transactionsFromLocalStorage.length > 0 ? init() : "";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (form.source.value.trim() === "" || form.amount.valaue === ""){
        alert.classList.add('alert-error');
        alert.innerHTML = 'Please fill all the fields'
        showalert(1500);
        return
}
    if(alert.classList.contains('alert-error'))
        alert.classList.remove('alert-error');
  const time = new Date();
  const transaction = {
    id: (Math.random() * 1000000).toFixed(),
    source: form.source.value,
    amount: Number(form.amount.value),
    time: `${time.toLocaleTimeString()} ${time.toLocaleDateString()}`,
  };
  transactionsFromLocalStorage.push(transaction);
  storeTransactions(transactionsFromLocalStorage);
  addTransactions(transaction);
  calculateTransactions(transactionsFromLocalStorage);
  showalert(800)
});

ulExpense.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
    deleteTransaction(e.target.parentElement.getAttribute("data-id"));
  }
});
ulIncome.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
    deleteTransaction(e.target.parentElement.getAttribute("data-id"));
  }
});

function showalert(timeout) { 
    alert.classList.toggle('alert-show')
    setTimeout(()=>{
        alert.classList.toggle('alert-show') 
    },timeout)
 }
