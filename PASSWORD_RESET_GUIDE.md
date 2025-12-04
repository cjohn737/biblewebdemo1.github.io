# Password Reset & Account Detection Guide

## 🆕 New Features

### 1. Existing Account Detection
**Location:** Signup Page

When users try to create an account with an email that already exists, they will receive a clear notification:

- ❌ **Error Message:** "An account with this email already exists"
- 📋 **Description:** "Please use a different email or sign in to your existing account."
- ⏱️ **Duration:** 5 seconds (extended toast notification)

**How it works:**
1. User enters email during signup
2. System checks against existing accounts
3. If match found, displays error message
4. User can either:
   - Use a different email
   - Click "Sign in" to go to login page

---

### 2. Forgot Password Flow
**Location:** Login Page → "Forgot password?" link

A complete password reset system with email verification using 6-digit codes.

#### Step 1: Request Reset Code
- Click "Forgot password?" on login page
- Enter your email address
- System validates email exists
- Generates 6-digit reset code
- Code is "sent" to email (displayed in console & toast for demo)

#### Step 2: Verify Code
- Enter the 6-digit code received
- Code is valid for 5 minutes
- Option to resend code if needed
- Can change email if entered incorrectly

#### Step 3: Reset Password
- Create new password (minimum 6 characters)
- Confirm new password
- Password is updated securely
- Redirected to login page

---

## 🧪 Demo Account for Testing

### Demo User Credentials
```
Email: demo@biblenation.com
Password: demo123
```

**Account Details:**
- **Name:** Demo User
- **Role:** User (not admin)
- **Subscription:** Free tier
- **Created:** Automatically on first app load
- **Purpose:** Testing password reset and account features

### Admin Account (for comparison)
```
Email: admin@biblenation.com
Password: admin123
```

**Note:** Admin password cannot be reset in demo mode for security.

---

## 📧 Password Reset Testing Guide

### Test Scenario 1: Successful Password Reset

1. **Navigate to Login Page**
   - Click "Sign In" from header
   
2. **Start Password Reset**
   - Click "Forgot password?" link
   
3. **Enter Demo Email**
   ```
   Email: demo@biblenation.com
   ```
   - Click "Send Reset Code"
   
4. **Check for Reset Code**
   - Look in browser console for: `🔐 Password Reset Code: XXXXXX`
   - Also displayed in toast notification
   - Example: `Demo: Your reset code is 123456`
   
5. **Enter Verification Code**
   - Type the 6-digit code
   - Click "Verify Code"
   
6. **Set New Password**
   ```
   New Password: newdemo456
   Confirm: newdemo456
   ```
   - Click "Reset Password"
   
7. **Login with New Password**
   ```
   Email: demo@biblenation.com
   Password: newdemo456
   ```

### Test Scenario 2: Expired Code

1. Follow steps 1-4 from Scenario 1
2. Wait for 5+ minutes
3. Try to verify the code
4. System displays: "Reset code has expired. Please request a new one."
5. Redirected back to email entry step

### Test Scenario 3: Invalid Code

1. Follow steps 1-4 from Scenario 1
2. Enter wrong code: `999999`
3. System displays: "Invalid reset code. Please try again."
4. Can try again with correct code

### Test Scenario 4: Resend Code

1. Follow steps 1-4 from Scenario 1
2. On code entry screen, click "Didn't receive the code? Resend"
3. New code generated and displayed
4. Previous code becomes invalid
5. Must use new code to proceed

### Test Scenario 5: Non-existent Email

1. Click "Forgot password?" on login
2. Enter email not in system: `notfound@example.com`
3. Click "Send Reset Code"
4. System displays: "No account found with this email address"
5. User remains on email entry screen

---

## 🔒 Security Features

### Password Reset
- ✅ **6-digit random code** (100,000 - 999,999)
- ✅ **5-minute expiration** on reset codes
- ✅ **One-time use codes** (invalidated after use)
- ✅ **Email validation** (must be registered)
- ✅ **Password strength** (minimum 6 characters)
- ✅ **Confirmation matching** (must type password twice)

### Account Creation
- ✅ **Duplicate detection** (prevents multiple accounts)
- ✅ **Email validation** (proper format required)
- ✅ **Password requirements** (6+ characters)
- ✅ **Immediate feedback** (clear error messages)

---

## 💾 Data Storage (Demo Mode)

### LocalStorage Keys
- `bible_nation_users` - Array of all user accounts
- `bible_nation_reset_code` - Temporary reset code data
- `bible_nation_user` - Currently logged in user

### Reset Code Structure
```json
{
  "email": "demo@biblenation.com",
  "code": "123456",
  "timestamp": 1699564800000
}
```

**Expiration Logic:**
- Code valid for: 5 minutes (300,000 milliseconds)
- Calculation: `Date.now() - timestamp > 300000`
- Automatic cleanup: Code removed after successful reset

---

## 🎯 User Experience Features

### Visual Feedback
- 📱 **Toast Notifications:** Success, error, and info messages
- 🎨 **Color-coded Alerts:** Blue (info), Green (success), Red (error)
- ⏱️ **Loading States:** Buttons show processing status
- ✨ **Smooth Transitions:** Between reset steps

### Error Prevention
- 🔒 **Disabled Buttons:** Until required fields filled
- ✏️ **Input Validation:** Real-time format checking
- 🔢 **Code Formatting:** Auto-limits to 6 digits
- 🚫 **Submit Prevention:** Invalid data blocked

### User Guidance
- 📍 **Step Indicators:** Clear progress through flow
- 🔙 **Back Navigation:** Can return to previous steps
- 🔄 **Alternative Actions:** Resend, change email, etc.
- 💡 **Help Text:** Contextual instructions

---

## 🐛 Troubleshooting

### "No account found with this email"
**Solution:** Make sure you're using one of the demo accounts:
- `demo@biblenation.com`
- `admin@biblenation.com`
- Or create a new account first

### "Reset code has expired"
**Solution:** Request a new code by:
- Clicking "Resend" on code entry screen
- Or starting the reset process again

### "Invalid reset code"
**Solution:** 
- Check the console for the correct code
- Look for toast notification showing the code
- Make sure you're entering all 6 digits

### Reset code not appearing
**Solution:**
1. Open browser console (F12)
2. Look for message starting with 🔐
3. Also check toast notifications at top-right

### Can't reset admin password
**Expected Behavior:** Admin password reset is disabled in demo mode for security purposes. Use demo user account instead.

---

## 🔄 Complete Flow Diagram

```
Login Page
    ↓
[Forgot Password?]
    ↓
Enter Email → Validate → Generate Code
    ↓                         ↓
Not Found              Code Sent (5min validity)
    ↓                         ↓
Error Message          Enter Code Screen
                              ↓
                       [Resend Code] or [Verify]
                              ↓
                    Valid? → New Password Screen
                    Invalid? → Try Again
                              ↓
                    Set New Password → Confirm
                              ↓
                    Password Updated → Login
```

---

## 📝 Notes for Production

This is a **demo implementation**. For production:

1. **Real Email Service:**
   - Integrate SendGrid, AWS SES, or similar
   - Send actual emails with reset links/codes
   - Don't display codes in console

2. **Enhanced Security:**
   - Hash reset codes in database
   - Use longer codes or UUIDs
   - Implement rate limiting
   - Add CAPTCHA for abuse prevention

3. **Better UX:**
   - Email verification on signup
   - Multi-factor authentication
   - Password strength meter
   - Breach detection (Have I Been Pwned API)

4. **Backend Integration:**
   - Server-side validation
   - Secure password hashing (bcrypt)
   - Database storage
   - Audit logging

---

## ✅ Testing Checklist

- [ ] Create account with existing email → Shows error
- [ ] Request reset code for demo@biblenation.com → Receives code
- [ ] Enter correct code → Proceeds to password reset
- [ ] Enter wrong code → Shows error, can retry
- [ ] Wait 5+ minutes → Code expires
- [ ] Resend code → Gets new valid code
- [ ] Reset password successfully → Can login with new password
- [ ] Try reset for non-existent email → Shows error
- [ ] Navigate back/forth through reset flow → Works smoothly
- [ ] Test all demo accounts → All functional

---

## 🎓 Summary

**New Capabilities:**
1. ✨ Duplicate account detection during signup
2. 🔐 Complete password reset system
3. 📧 Email verification with 6-digit codes
4. ⏱️ Time-limited reset codes (5 minutes)
5. 🔄 Code resend functionality
6. 👤 Demo user account for testing

**User Benefits:**
- Can't accidentally create duplicate accounts
- Can recover forgotten passwords
- Clear error messages and guidance
- Secure and time-limited reset process

**Developer Benefits:**
- Full password reset flow implemented
- Demo account ready for testing
- Console logging for debugging
- LocalStorage-based demo system
