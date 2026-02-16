// Authentication & User Management (localStorage prototype)
const CREDITS_PER_CONTACT = 5;
const CREDIT_PLANS = [
  { id: 'plan-2', price: 29, contacts: 2, credits: 10 },
  { id: 'plan-5', price: 59, contacts: 5, credits: 25 },
  { id: 'plan-10', price: 99, contacts: 10, credits: 50 }
];

function getStorage(key, def = null) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : def;
  } catch { return def; }
}
function setStorage(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

function getCurrentUser() {
  return getStorage('currentUser');
}
function setCurrentUser(user) {
  setStorage('currentUser', user);
}
function logout() {
  localStorage.removeItem('currentUser');
}

function getCustomers() {
  return getStorage('customers', []);
}
function getCustomer(id) {
  return getCustomers().find(c => c.id === id);
}
function saveCustomer(customer) {
  const customers = getCustomers();
  const i = customers.findIndex(c => c.id === customer.id);
  if (i >= 0) customers[i] = customer;
  else customers.push(customer);
  setStorage('customers', customers);
  return customer;
}

function getWorkersDB() {
  return getStorage('workersDB', []);
}
function getWorkerDB(id) {
  return getWorkersDB().find(w => w.id === id);
}
function saveWorkerDB(worker) {
  const workers = getWorkersDB();
  const i = workers.findIndex(w => w.id === worker.id);
  if (i >= 0) workers[i] = worker;
  else workers.push(worker);
  setStorage('workersDB', workers);
  return worker;
}

function getCustomerContacts(customerId) {
  const c = getCustomer(customerId);
  return (c && c.contacts) ? c.contacts : [];
}
function addCustomerContact(customerId, workerId, workerName) {
  const c = getCustomer(customerId);
  if (!c) return false;
  if (!c.contacts) c.contacts = [];
  c.contacts.push({ workerId, workerName, date: new Date().toISOString() });
  saveCustomer(c);
  return true;
}

function deductCredits(customerId, amount) {
  const c = getCustomer(customerId);
  if (!c || (c.credits || 0) < amount) return false;
  c.credits = (c.credits || 0) - amount;
  saveCustomer(c);
  return true;
}
function addCredits(customerId, amount) {
  const c = getCustomer(customerId);
  if (!c) return false;
  c.credits = (c.credits || 0) + amount;
  saveCustomer(c);
  return true;
}

function purchaseCredits(customerId, planId) {
  const plan = CREDIT_PLANS.find(p => p.id === planId);
  if (!plan) return false;
  return addCredits(customerId, plan.credits);
}

function createCustomer(email, name, password) {
  const customers = getCustomers();
  if (customers.some(c => c.email === email)) return null;
  const id = 'cust-' + Date.now();
  const customer = { id, email, name, password, credits: 0, contacts: [] };
  saveCustomer(customer);
  return customer;
}

function createWorker(email, name, password, kyc) {
  const workers = getWorkersDB();
  if (workers.some(w => w.email === email)) return null;
  const id = 'wrk-' + Date.now();
  const worker = {
    id, email, name, password,
    age: kyc?.age || 0, experience: kyc?.experience || 0, category: kyc?.category || '',
    hourlyRate: kyc?.hourlyRate || 0, kycVerified: !!(kyc?.age && kyc?.category),
    requests: [], specialty: kyc?.specialty || ''
  };
  saveWorkerDB(worker);
  return worker;
}

function loginCustomer(email, password) {
  const c = getCustomers().find(x => x.email === email && x.password === password);
  if (!c) return null;
  return { type: 'customer', id: c.id, email: c.email, name: c.name };
}

function loginWorker(email, password) {
  const w = getWorkersDB().find(x => x.email === email && x.password === password);
  if (!w) return null;
  return { type: 'worker', id: w.id, email: w.email, name: w.name };
}

function getContactRequests() {
  return getStorage('contactRequests', {});
}
function addContactRequest(workerId, customerId, customerName) {
  const req = getContactRequests();
  if (!req[workerId]) req[workerId] = [];
  req[workerId].push({ customerId, customerName, date: new Date().toISOString() });
  setStorage('contactRequests', req);
}

function contactWorker(customerId, workerId, workerName) {
  const c = getCustomer(customerId);
  if (!c || (c.credits || 0) < CREDITS_PER_CONTACT) return { ok: false, msg: 'Insufficient credits' };
  if (!deductCredits(customerId, CREDITS_PER_CONTACT)) return { ok: false, msg: 'Failed to deduct credits' };
  addCustomerContact(customerId, workerId, workerName);
  addContactRequest(workerId, customerId, c.name);
  const w = getWorkerDB(workerId);
  if (w) {
    if (!w.requests) w.requests = [];
    w.requests.push({ customerId, customerName: c.name, date: new Date().toISOString() });
    saveWorkerDB(w);
  }
  return { ok: true };
}
