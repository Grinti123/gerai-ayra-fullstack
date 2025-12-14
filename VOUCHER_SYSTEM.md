# Voucher & Discount System Documentation

## Overview
This system provides comprehensive voucher and discount functionality for the Gerai Ayra e-commerce platform.

## Features

### 1. **Voucher Types**
- **Percentage Discount**: Discount based on percentage (e.g., 10% off)
- **Fixed Amount Discount**: Fixed amount off (e.g., Rp.50,000 off)

### 2. **Voucher Attributes**
- **Code**: Unique voucher code (automatically converted to uppercase)
- **Description**: User-friendly description of the voucher
- **Discount Value**: Percentage or fixed amount
- **Minimum Purchase**: Minimum cart amount required
- **Maximum Discount**: Cap on discount amount (for percentage vouchers)
- **Usage Limit**: Maximum number of times voucher can be used
- **Validity Period**: Start and end dates for voucher validity
- **Product/Category Restrictions**: Limit voucher to specific products or categories

### 3. **User Features**
- View all available vouchers
- Apply voucher codes manually
- Select vouchers from a list
- See discount applied in real-time
- Remove applied vouchers
- Clear error messages for invalid vouchers

## API Endpoints

### Public Endpoints

#### Apply Voucher
```
POST /api/voucher/apply
Body: {
  code: string,
  cartAmount: number
}
Response: {
  success: boolean,
  message: string,
  voucher: {
    code: string,
    description: string,
    discountType: string,
    discountValue: number,
    discountAmount: number
  }
}
```

#### List Active Vouchers
```
GET /api/voucher/list
Response: {
  success: boolean,
  vouchers: Array
}
```

#### Mark Voucher as Used
```
POST /api/voucher/use
Body: {
  code: string
}
```

### Admin Endpoints (Require Authentication)

#### Create Voucher
```
POST /api/voucher/create
Headers: { token: admin_token }
Body: {
  code: string,
  description: string,
  discountType: 'percentage' | 'fixed',
  discountValue: number,
  minPurchase: number,
  maxDiscount: number,
  usageLimit: number,
  validFrom: Date,
  validUntil: Date,
  applicableProducts: Array,
  applicableCategories: Array
}
```

#### Update Voucher
```
POST /api/voucher/update
Headers: { token: admin_token }
Body: { id: string, ...updates }
```

#### Delete Voucher
```
POST /api/voucher/delete
Headers: { token: admin_token }
Body: { id: string }
```

#### Get All Vouchers
```
GET /api/voucher/all
Headers: { token: admin_token }
```

## Frontend Components

### 1. **VoucherInput**
- Input field for entering voucher codes
- Apply button with loading state
- Keyboard support (Enter to apply)
- Error handling and validation

### 2. **VoucherList**
- Displays all available vouchers
- Shows voucher details (discount, validity, restrictions)
- Click to apply voucher
- Collapsible interface

### 3. **CartTotal** (Enhanced)
- Integrates voucher functionality
- Shows discount breakdown
- Real-time total calculation
- Remove voucher option

## Usage Examples

### Creating a Voucher (Admin)
```javascript
const newVoucher = {
  code: "WELCOME10",
  description: "Welcome discount - 10% off",
  discountType: "percentage",
  discountValue: 10,
  minPurchase: 100000,
  maxDiscount: 50000,
  usageLimit: 100,
  validFrom: new Date(),
  validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
};

// POST to /api/voucher/create with admin token
```

### Applying a Voucher (User)
```javascript
// User enters code "WELCOME10" in the cart
// System validates:
// 1. Code exists and is active
// 2. Current date is within validity period
// 3. Usage limit not exceeded
// 4. Cart amount meets minimum purchase
// 5. Calculates discount amount
// 6. Applies discount to cart total
```

## Sample Vouchers
See `backend/sampleVouchers.js` for sample voucher data that can be used for testing.

## Validation Rules

1. **Code Validation**
   - Must be unique
   - Automatically converted to uppercase
   - Required field

2. **Date Validation**
   - validFrom must be before validUntil
   - Current date must be between validFrom and validUntil

3. **Usage Validation**
   - usedCount must not exceed usageLimit
   - null usageLimit means unlimited uses

4. **Amount Validation**
   - Cart amount must meet minPurchase requirement
   - Discount cannot exceed cart amount
   - maxDiscount caps percentage discounts

## Integration with Order System

When an order is placed with a voucher:
1. Voucher is validated again
2. Discount is applied to order total
3. Voucher usage count is incremented
4. Voucher code is stored with order for reference

## Future Enhancements

- User-specific vouchers
- First-time customer vouchers
- Referral vouchers
- Bundle vouchers (buy X get Y)
- Tiered discounts
- Voucher analytics dashboard
- Auto-apply best voucher
- Voucher notifications

## Testing

To test the voucher system:
1. Start the backend server
2. Create sample vouchers using the admin panel or API
3. Add items to cart
4. Apply voucher codes
5. Verify discount calculations
6. Complete checkout process

## Troubleshooting

**Voucher not applying:**
- Check if voucher is active
- Verify validity dates
- Ensure cart meets minimum purchase
- Check usage limit

**Discount amount incorrect:**
- For percentage: check maxDiscount cap
- For fixed: ensure it doesn't exceed cart amount
- Verify discount calculation logic

## Security Considerations

- Admin endpoints protected with authentication
- Voucher codes case-insensitive for user convenience
- Usage limits prevent abuse
- Validity periods auto-enforced
- Server-side validation for all voucher operations
