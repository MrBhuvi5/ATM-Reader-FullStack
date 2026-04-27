const state = {
    atmId: null,
    customerId: null,
    customerName: null,
    balance: 0,
    apiUrl: '/api',
    activeInput: null
};

// --- MOCK DATA FOR DEMO ---
const mockAtms = [
    { atmId: 'iob0001', branchName: 'Indian Overseas Bank', area: 'Agathiyar Nagar', city: 'Chennai', reserveStatus: 500000 },
    { atmId: 'iob0002', branchName: 'Indian Overseas Bank', area: 'Anna Nagar', city: 'Chennai', reserveStatus: 100000 },
    { atmId: 'iob0005', branchName: 'Indian Overseas Bank', area: 'Villivakkam', city: 'Chennai', reserveStatus: 55000 }
];

const mockUsers = [
    { customerId: 123, pin: '1234', name: 'Nobody', balance: 50000 },
    { customerId: 321, pin: '0000', name: 'Demo', balance: 25000 }
];
// --------------------------

const panel = document.getElementById('main-panel');

// Utility to switch views with animation
function navigateTo(renderFunc) {
    panel.classList.replace('view-enter', 'view-exit');
    if (!panel.classList.contains('view-exit')) {
        panel.classList.add('view-exit');
    }
    
    setTimeout(() => {
        panel.innerHTML = renderFunc();
        panel.classList.replace('view-exit', 'view-enter');
        
        // Attach post-render listeners if defined
        const eventDefiner = document.getElementById('event-definer');
        if(eventDefiner) eventDefiner.click();
        
    }, 300);
}

// ================= VIEWS =================

function renderWelcome() {
    return `
        <h1>InfinityMoney</h1>
        <p class="subtitle">Welcome to the future of banking</p>
        
        <div class="action-grid" style="margin-top: 30px;">
            <div class="action-card" onclick="navigateTo(renderSearchLocation)">
                <div class="action-icon">📍</div>
                <div class="action-title">Find ATM</div>
            </div>
            <div class="action-card" onclick="navigateTo(renderEnterAtmId)">
                <div class="action-icon">🏦</div>
                <div class="action-title">Login to ATM</div>
            </div>
            <div class="action-card" onclick="navigateTo(renderCheckReserve)" style="grid-column: span 2;">
                <div class="action-icon">💰</div>
                <div class="action-title">Check Cash Reserve</div>
            </div>
        </div>
    `;
}

function renderSearchLocation() {
    return `
        <div class="header-with-back">
            <button class="back-btn" onclick="navigateTo(renderWelcome)">←</button>
            <h1 style="margin:0; flex-grow:1; text-align:left;">Find ATM</h1>
        </div>
        
        <div class="form-group">
            <label>Bank</label>
            <select id="bankChoice">
                <option value="1">IOB - Indian Overseas Bank</option>
                <option value="2">ICICI</option>
                <option value="3">Canara Bank</option>
                <option value="4">State Bank of India</option>
            </select>
        </div>
        
        <div class="form-group">
            <label>Location (City or Area)</label>
            <input type="text" id="location" placeholder="e.g. Chennai" onkeydown="if(event.key === 'Enter') searchAtms()">
        </div>
        
        <button onclick="searchAtms()">Search</button>
        <div id="search-msg" class="error-message"></div>
        
        <div class="atm-list" id="atm-results"></div>
    `;
}

function renderEnterAtmId() {
    return `
        <div class="header-with-back">
            <button class="back-btn" onclick="navigateTo(renderWelcome)">←</button>
            <h1 style="margin:0; flex-grow:1; text-align:left;">Enter ATM ID</h1>
        </div>
        
        <div class="form-group">
            <input type="text" id="atmIdInput" placeholder="e.g. iob123" style="text-align:center; font-size: 1.2rem;" onkeydown="if(event.key === 'Enter') validateAtmId()">
        </div>
        
        <button onclick="validateAtmId()">Continue</button>
        <div id="atm-msg" class="error-message"></div>
    `;
}

function renderCheckReserve(initialAtmId = '') {
    const autoCheck = initialAtmId ? `<div id="event-definer" style="display:none" onclick="checkReserveStatus()"></div>` : '';
    return `
        <div class="header-with-back">
            <button class="back-btn" onclick="navigateTo(renderWelcome)">←</button>
            <h1 style="margin:0; flex-grow:1; text-align:left;">Check Cash Reserve</h1>
        </div>
        
        <p class="subtitle" style="margin-bottom: 20px;">Find how much cash is available in an ATM.</p>
        
        <div class="form-group">
            <input type="text" id="reserveAtmIdInput" placeholder="Enter ATM ID (e.g. iob123)" style="text-align:center; font-size: 1.2rem;" value="${initialAtmId}" onkeydown="if(event.key === 'Enter') checkReserveStatus()">
        </div>
        
        <button onclick="checkReserveStatus()">Check Status</button>
        <div id="reserve-msg" class="error-message"></div>
        <div id="reserve-result" style="margin-top: 20px;"></div>
        ${autoCheck}
    `;
}

function renderLogin() {
    state.activeInput = 'customerIdInput';
    return `
        <div class="header-with-back">
            <button class="back-btn" onclick="navigateTo(renderWelcome)">←</button>
            <h1 style="margin:0; flex-grow:1; text-align:left;">Welcome</h1>
        </div>
        <p class="subtitle">ATM: ${state.atmId.toUpperCase()}</p>
        
        <div class="form-group">
            <label>Customer ID</label>
            <input type="number" id="customerIdInput" placeholder="Enter ID" onfocus="state.activeInput = this.id" onkeydown="if(event.key === 'Enter') document.getElementById('pinInput').focus()">
        </div>
        <div class="form-group">
            <label>PIN (4 digits)</label>
            <input type="password" id="pinInput" placeholder="••••" maxlength="4" onfocus="state.activeInput = this.id" onkeydown="if(event.key === 'Enter') performLogin()">
        </div>
        
        <div id="login-msg" class="error-message"></div>

        <div class="keypad">
            <button class="key" onclick="appendKeypad('1')">1</button>
            <button class="key" onclick="appendKeypad('2')">2</button>
            <button class="key" onclick="appendKeypad('3')">3</button>
            <button class="key" onclick="appendKeypad('4')">4</button>
            <button class="key" onclick="appendKeypad('5')">5</button>
            <button class="key" onclick="appendKeypad('6')">6</button>
            <button class="key" onclick="appendKeypad('7')">7</button>
            <button class="key" onclick="appendKeypad('8')">8</button>
            <button class="key" onclick="appendKeypad('9')">9</button>
            <button class="key action" onclick="clearKeypad()">CLR</button>
            <button class="key" onclick="appendKeypad('0')">0</button>
            <button class="key action" onclick="backspaceKeypad()">⌫</button>
            <button class="key" style="background:var(--success); grid-column: span 3;" onclick="performLogin()">OK</button>
        </div>
        <div id="event-definer" style="display:none" onclick="document.getElementById('customerIdInput').focus()"></div>
    `;
}

function renderDashboard() {
    return `
        <div style="display:flex; justify-content:space-between; margin-bottom: 20px;">
            <div>
                <h2 style="font-size:1.2rem;">Hi, ${state.customerName}</h2>
                <div style="font-size:0.8rem; color:var(--text-muted)">ATM: ${state.atmId.toUpperCase()}</div>
            </div>
            <button class="btn-danger" style="width:auto; padding: 8px 16px; margin:0;" onclick="logout()">Exit</button>
        </div>

        <div class="balance-card">
            <div class="balance-label">Available Balance</div>
            <div class="balance-amount">₹ <span id="balanceDisplay">${state.balance.toFixed(2)}</span></div>
        </div>

        <div class="action-grid">
            <div class="action-card" onclick="navigateTo(() => renderTransaction('withdraw'))">
                <div class="action-icon">💸</div>
                <div class="action-title">Withdraw</div>
            </div>
            <div class="action-card" onclick="navigateTo(() => renderTransaction('deposit'))">
                <div class="action-icon">📥</div>
                <div class="action-title">Deposit</div>
            </div>
        </div>
    `;
}

function renderTransaction(type) {
    const isWithdraw = type === 'withdraw';
    const title = isWithdraw ? 'Withdraw Cash' : 'Deposit Cash';
    return `
        <div class="header-with-back">
            <button class="back-btn" onclick="navigateTo(renderDashboard)">←</button>
            <h1 style="margin:0; flex-grow:1; text-align:left;">${title}</h1>
        </div>
        
        <p class="subtitle" style="margin-bottom: 10px;">Multiples of 100, 200, 500 only.</p>
        
        <div class="form-group">
            <input type="number" id="amountInput" placeholder="₹ 0" style="text-align:center; font-size: 1.5rem;" onfocus="state.activeInput = this.id" onkeydown="if(event.key === 'Enter') submitTransaction('${type}')">
        </div>
        
        <div id="txn-msg" class="error-message"></div>

        <div class="keypad">
            <button class="key" onclick="appendKeypad('1')">1</button>
            <button class="key" onclick="appendKeypad('2')">2</button>
            <button class="key" onclick="appendKeypad('3')">3</button>
            <button class="key" onclick="appendKeypad('4')">4</button>
            <button class="key" onclick="appendKeypad('5')">5</button>
            <button class="key" onclick="appendKeypad('6')">6</button>
            <button class="key" onclick="appendKeypad('7')">7</button>
            <button class="key" onclick="appendKeypad('8')">8</button>
            <button class="key" onclick="appendKeypad('9')">9</button>
            <button class="key action" onclick="clearKeypad()">CLR</button>
            <button class="key" onclick="appendKeypad('0')">0</button>
            <button class="key action" onclick="backspaceKeypad()">⌫</button>
            <button class="key" style="background:var(--success); grid-column: span 3;" onclick="submitTransaction('${type}')">OK</button>
        </div>
        <div id="event-definer" style="display:none" onclick="document.getElementById('amountInput').focus()"></div>
    `;
}

// ================= LOGIC =================

async function searchAtms() {
    const bankChoice = document.getElementById('bankChoice').value;
    const location = document.getElementById('location').value.toLowerCase();
    const msg = document.getElementById('search-msg');
    const results = document.getElementById('atm-results');
    
    msg.innerText = "Searching...";
    msg.className = "success-message";
    results.innerHTML = "";
    
    setTimeout(() => {
        const found = mockAtms.filter(a => a.area.toLowerCase().includes(location) || a.city.toLowerCase().includes(location));
        
        if (found.length > 0) {
            msg.innerText = "";
            found.forEach(atm => {
                const div = document.createElement('div');
                div.className = 'atm-item';
                div.innerHTML = `
                    <h4>${atm.atmId.toUpperCase()}</h4>
                    <p>${atm.branchName} - ${atm.area}, ${atm.city}</p>
                `;
                div.onclick = () => {
                    navigateTo(() => renderCheckReserve(atm.atmId));
                };
                results.appendChild(div);
            });
        } else {
            msg.innerText = "No ATMs found in this location";
            msg.className = "error-message";
        }
    }, 500); // Simulate network delay
}

async function validateAtmId() {
    const input = document.getElementById('atmIdInput').value;
    const msg = document.getElementById('atm-msg');
    if (!input) return;
    
    msg.innerText = "Validating...";
    msg.className = "success-message";
    
    setTimeout(() => {
        const atm = mockAtms.find(a => a.atmId.toLowerCase() === input.toLowerCase());
        if (atm) {
            state.atmId = atm.atmId;
            navigateTo(renderLogin);
        } else {
            msg.innerText = "Invalid ATM ID. Please try again.";
            msg.className = "error-message";
        }
    }, 500);
}

async function checkReserveStatus() {
    const input = document.getElementById('reserveAtmIdInput').value;
    const msg = document.getElementById('reserve-msg');
    const resultDiv = document.getElementById('reserve-result');
    if (!input) return;
    
    msg.innerText = "Checking...";
    msg.className = "success-message";
    resultDiv.innerHTML = '';
    
    setTimeout(() => {
        const atm = mockAtms.find(a => a.atmId.toLowerCase() === input.toLowerCase());
        if (atm) {
            msg.innerText = "";
            let displayStatus = atm.reserveStatus > 100000 ? "100000+" : atm.reserveStatus;
            resultDiv.innerHTML = `
                <div class="balance-card" style="margin-top: 10px;">
                    <div class="balance-label">${atm.atmId.toUpperCase()} Reserve Status</div>
                    <div class="balance-amount">₹ ${displayStatus}</div>
                    <div style="font-size:0.8rem; color:var(--text-muted); margin-top:10px;">
                        ${atm.branchName} <br> ${atm.area}, ${atm.city}
                    </div>
                </div>
            `;
        } else {
            msg.innerText = "ATM ID not found in records.";
            msg.className = "error-message";
        }
    }, 500);
}

function appendKeypad(num) {
    if (!state.activeInput) return;
    const input = document.getElementById(state.activeInput);
    if (!input) return;
    if (state.activeInput === 'pinInput' && input.value.length >= 4) return;
    if (state.activeInput === 'amountInput' && input.value === '0') input.value = '';
    input.value += num;
}

function clearKeypad() {
    if (!state.activeInput) return;
    const input = document.getElementById(state.activeInput);
    if (input) input.value = '';
}

function backspaceKeypad() {
    if (!state.activeInput) return;
    const input = document.getElementById(state.activeInput);
    if (input) input.value = input.value.slice(0, -1);
}

async function performLogin() {
    const customerId = document.getElementById('customerIdInput').value;
    const pin = document.getElementById('pinInput').value;
    const msg = document.getElementById('login-msg');
    
    if (!customerId || !pin) {
        msg.innerText = "Please enter Customer ID and PIN";
        return;
    }
    
    msg.innerText = "Authenticating...";
    msg.className = "success-message";
    
    setTimeout(() => {
        const user = mockUsers.find(u => u.customerId === parseInt(customerId) && u.pin === pin);
        if (user) {
            state.customerId = user.customerId;
            state.customerName = user.name;
            fetchBalance();
        } else {
            msg.innerText = "Invalid Customer ID or PIN";
            msg.className = "error-message";
            state.activeInput = 'pinInput';
            clearKeypad();
        }
    }, 800);
}

async function fetchBalance() {
    const user = mockUsers.find(u => u.customerId === state.customerId);
    if (user) {
        state.balance = user.balance;
        navigateTo(renderDashboard);
    }
}



async function submitTransaction(type) {
    const amountStr = document.getElementById('amountInput').value;
    const amount = parseInt(amountStr);
    const msg = document.getElementById('txn-msg');
    
    if (!amount || amount <= 0) {
        msg.innerText = "Enter a valid amount";
        msg.className = "error-message";
        return;
    }
    
    if (amount % 100 !== 0) {
        msg.innerText = "Only multiples of 100, 200, 500 allowed";
        msg.className = "error-message";
        return;
    }
    
    msg.innerText = "Processing...";
    msg.className = "success-message";
    
    setTimeout(() => {
        const user = mockUsers.find(u => u.customerId === state.customerId);
        const atm = mockAtms.find(a => a.atmId === state.atmId);
        
        if (type === 'withdraw') {
            if (amount > user.balance) {
                msg.innerText = "Insufficient balance!";
                msg.className = "error-message";
                return;
            }
            if (atm && amount > atm.reserveStatus) {
                msg.innerText = "ATM does not have enough cash reserve!";
                msg.className = "error-message";
                return;
            }
            user.balance -= amount;
            if (atm) atm.reserveStatus -= amount;
        } else {
            user.balance += amount;
            if (atm) atm.reserveStatus += amount;
        }
        
        state.balance = user.balance;
        msg.innerText = "Transaction Successful!";
        msg.className = "success-message";
        setTimeout(() => {
            navigateTo(renderDashboard);
        }, 1500);
    }, 1000);
}

function logout() {
    state.customerId = null;
    state.customerName = null;
    state.balance = 0;
    navigateTo(renderWelcome);
}

// Initialize App
window.onload = () => {
    panel.classList.add('view-enter');
    panel.innerHTML = renderWelcome();
};
