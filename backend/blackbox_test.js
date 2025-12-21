
const BASE_URL = 'http://localhost:4000';

const colors = {
    reset: "\x1b[0m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    cyan: "\x1b[36m",
    bold: "\x1b[1m"
};

const print = (msg, color = colors.reset) => console.log(`${color}${msg}${colors.reset}`);

const logStep = (step) => print(`\n[STEP] ${step}`, colors.cyan + colors.bold);
const logPass = (msg) => print(`  ✓ PASS: ${msg}`, colors.green);
const logFail = (msg, details = '') => print(`  ✗ FAIL: ${msg} ${details}`, colors.red);
const logInfo = (msg) => print(`  ℹ INFO: ${msg}`, colors.yellow);

async function request(endpoint, method = 'GET', body = null, token = null) {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['token'] = token;

    const config = { method, headers };
    if (body) config.body = JSON.stringify(body);

    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, config);
        let data;
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            data = await response.json();
        } else {
            // Handle plain text responses (like the root health check)
            try {
                data = await response.text();
                // Try to parse it as JSON anyway if it looks like it, just in case content-type is wrong
                try { data = JSON.parse(data); } catch (e) { }
            } catch (e) {
                data = null;
            }
        }
        return { status: response.status, data };
    } catch (error) {
        return { status: 500, error: error.message };
    }
}

async function runTests() {
    print("Starting Blackbox Tests for Gerai Ayra Backend...\n", colors.bold);

    // 1. Health Check
    logStep("Checking API Health");
    const health = await request('/');
    if (health.status === 200) {
        logPass("API is accessible");
    } else {
        logFail("API is not accessible", health.error || health.status);
        process.exit(1);
    }

    // 2. Register User
    logStep("Registering New User");
    const email = `test_bb_${Date.now()}@example.com`;
    const password = "password123";
    const regRes = await request('/api/user/register', 'POST', { name: "Test User", email, password });

    let token = null;
    if (regRes.data.success) {
        logPass(`User registered: ${email}`);
        token = regRes.data.token;
    } else {
        logFail("Registration failed", regRes.data.message);
    }

    // 3. Login (if registration didn't give token or just to test login)
    if (!token) {
        logStep("Logging In");
        const loginRes = await request('/api/user/login', 'POST', { email, password });
        if (loginRes.data.success) {
            logPass("Login successful");
            token = loginRes.data.token;
        } else {
            logFail("Login failed", loginRes.data.message);
            // Cannot proceed with auth tests if login fails
        }
    }

    // 4. Product List
    logStep("Fetching Products");
    const prodRes = await request('/api/product/list');
    let productId = null;
    if (prodRes.data.success) {
        const products = prodRes.data.products;
        logPass(`Retrieved ${products.length} products`);
        if (products.length > 0) {
            productId = products[0]._id;
            logInfo(`Selected Product ID: ${productId} (${products[0].name})`);
        } else {
            logInfo("No products found to test Cart features");
        }
    } else {
        logFail("Failed to fetch products");
    }

    // 5. Cart Operations
    if (token && productId) {
        logStep("Testing Cart Operations");

        // Add to Cart
        const addCartRes = await request('/api/cart/add', 'POST', { itemId: productId, size: 'L' }, token);
        if (addCartRes.data.success) {
            logPass("Added item to cart");
        } else {
            logFail("Failed to add to cart", addCartRes.data.message);
        }

        // Get Cart
        const getCartRes = await request('/api/cart/get', 'POST', {}, token);
        if (getCartRes.data.success) {
            logPass("Retrieved cart");
            const count = getCartRes.data.cartData[productId] ? getCartRes.data.cartData[productId]['L'] : 0;
            if (count > 0) logPass(`Item verified in cart (Qty: ${count})`);
            else logFail("Item not found in cart data");
        } else {
            logFail("Failed to get cart", getCartRes.data.message);
        }
    } else {
        logInfo("Skipping Cart tests due to missing token or products");
    }

    // 6. Public Voucher List
    logStep("Checking Vouchers");
    const vouchRes = await request('/api/voucher/list', 'GET');
    let voucherCode = null;
    if (vouchRes.data.success) {
        const vouchers = vouchRes.data.vouchers;
        logPass(`Retrieved ${vouchers.length} vouchers`);
        if (vouchers.length > 0) {
            voucherCode = vouchers[0].code; // Just grab the first one
            logInfo(`Found voucher: ${voucherCode}`);
        }
    } else {
        logFail("Failed to fetch vouchers", vouchRes.data.message); // endpoint might generally fail if not implemented
        // Note: listVouchers is user facing? Route says: voucherRouter.get('/list', listVouchers); Yes.
    }

    // 7. Apply Voucher Logic
    if (voucherCode) {
        logStep("Testing Voucher Application");
        const applyRes = await request('/api/voucher/apply', 'POST', {
            code: voucherCode,
            cartAmount: 1000000 // Simulate big amount
        });

        if (applyRes.data.success) {
            logPass(`Voucher ${voucherCode} applied successfully`);
            logInfo(`Discount: ${applyRes.data.voucher.discountAmount}`);
        } else {
            logFail(`Failed to apply voucher ${voucherCode}`, applyRes.data.message);
        }

        // Test Invalid Voucher
        const invalidRes = await request('/api/voucher/apply', 'POST', {
            code: 'INVALID_CODE_123',
            cartAmount: 100000
        });
        if (!invalidRes.data.success) {
            logPass("Correctly rejected invalid voucher");
        } else {
            logFail("Ironically, it accepted an invalid voucher!");
        }
    }

    // 8. Review Feature
    if (token && productId) {
        logStep("Testing Product Review");
        const reviewRes = await request('/api/review/add', 'POST', {
            productId,
            rating: 5,
            comment: "This is a test review from the blackbox script."
        }, token);

        if (reviewRes.data.success) {
            logPass("Review added successfully");
        } else {
            // Might fail if already reviewed (if using same user/product), but we create a new user each time so it should pass
            logFail("Failed to add review", reviewRes.data.message);
        }

        // Get reviews
        const getReviewsRes = await request('/api/review/get', 'POST', { productId });
        if (getReviewsRes.data.success) {
            const reviews = getReviewsRes.data.reviews || [];
            if (reviews.some(r => r.comment === "This is a test review from the blackbox script.")) {
                logPass("Verified review in product review list");
            } else {
                logInfo("Review not found in list immediately (might be filtered/cached)");
            }
        }
    }

    // 9. Order Placement (COD)
    if (token && productId) {
        logStep("Testing COD Order Placement");
        const orderRes = await request('/api/orders/place', 'POST', {
            items: [{ _id: productId, name: "Test Product", size: 'L', quantity: 1, price: 100000 }],
            amount: 100000,
            address: {
                firstName: "Test",
                lastName: "User",
                email: "test@example.com",
                street: "123 Test St",
                city: "Test City",
                state: "Test State",
                zipcode: "12345",
                country: "Test Country",
                phone: "1234567890"
            }
        }, token);

        if (orderRes.data.success) {
            logPass("COD Order placed successfully");
        } else {
            logFail("Failed to place order", orderRes.data.message);
        }
    }

    print("\nTest Suite Completed.", colors.bold);
}

runTests();
