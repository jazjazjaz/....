// Helper function to calculate price
function calculatePrice(code) {
    const patterns = {
        '1112': 4,
        '1122': 6,
        '1233': 12,
        '1234': 24
    };
    return patterns[code] || (code.length === 4 ? 1 : 0);
}

// Helper function to get today's date in YYYY-MM-DD format
function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Save purchase record to localStorage
function savePurchase(code, price) {
    const date = getTodayDate();
    const purchases = JSON.parse(localStorage.getItem('purchases')) || [];
    purchases.push({ code, price, date });
    localStorage.setItem('purchases', JSON.stringify(purchases));
}

// Load purchase records from localStorage
function loadRecords() {
    const purchases = JSON.parse(localStorage.getItem('purchases')) || [];
    return purchases;
}

// Display purchase records
function displayRecords(records) {
    const recordsList = document.getElementById('records-list');
    recordsList.innerHTML = '';
    records.forEach(record => {
        const li = document.createElement('li');
        li.textContent = `${record.date} - Code: ${record.code}, Price: RM${record.price}`;
        recordsList.appendChild(li);
    });
}

// Display today's purchases
function displayTodayPurchases(records) {
    const todayList = document.getElementById('today-list');
    todayList.innerHTML = '';
    const todayRecords = records.filter(record => record.date === getTodayDate());
    todayRecords.forEach(record => {
        const li = document.createElement('li');
        li.textContent = `Code: ${record.code}, Price: RM${record.price}`;
        todayList.appendChild(li);
    });
}

// Event listeners for navigation
document.getElementById('show-purchase').addEventListener('click', () => {
    document.querySelectorAll('.page').forEach(page => page.style.display = 'none');
    document.getElementById('purchase').style.display = 'block';
});

document.getElementById('show-records').addEventListener('click', () => {
    document.querySelectorAll('.page').forEach(page => page.style.display = 'none');
    document.getElementById('records').style.display = 'block';
    displayRecords(loadRecords());
});

document.getElementById('show-today').addEventListener('click', () => {
    document.querySelectorAll('.page').forEach(page => page.style.display = 'none');
    document.getElementById('today').style.display = 'block';
    displayTodayPurchases(loadRecords());
});

// Handle purchase
document.getElementById('purchase-button').addEventListener('click', () => {
    const code = document.getElementById('purchase-code').value;
    const price = calculatePrice(code);
    if (price > 0) {
        savePurchase(code, price);
        alert(`Purchased code ${code} for RM${price}`);
        document.getElementById('purchase-code').value = '';
    } else {
        alert('Invalid code');
    }
});

// Initialize
document.getElementById('show-purchase').click(); // Show purchase page on load
