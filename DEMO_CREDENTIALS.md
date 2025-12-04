# 🔑 Bible Nation - Demo Credentials

## Quick Access Accounts

### 👤 Demo User Account
```
Email: demo@biblenation.com
Password: demo123
```
**Use this account to test:**
- ✅ Password reset flow
- ✅ User features and functionality
- ✅ Personal page & settings
- ✅ Subscription upgrades
- ✅ Regular user experience

---

### 👨‍💼 Admin Account
```
Email: admin@biblenation.com
Password: admin123
```
**Use this account to test:**
- ✅ Admin dashboard
- ✅ User management
- ✅ Real-time notifications
- ✅ Account monitoring
- ✅ System statistics

**Note:** Admin password cannot be reset in demo mode.

---

## 🧪 Testing Features

### Create New Account
**Sign Up Page** → Create your own test account
- Any valid email format
- Password must be 6+ characters
- Duplicate email detection active
- Get welcome animation on success

### Password Reset Testing
1. Go to Login page
2. Click "Forgot password?"
3. Use: `demo@biblenation.com`
4. Check console for 6-digit code
5. Code also shown in toast notification
6. Code valid for 5 minutes

---

## 📊 Account Features Comparison

| Feature | Demo User | Admin | Custom Account |
|---------|-----------|-------|----------------|
| Login Access | ✅ | ✅ | ✅ |
| Password Reset | ✅ | ❌ | ✅ |
| Personal Page | ✅ | ✅ | ✅ |
| Settings | ✅ | ✅ | ✅ |
| Dashboard | ✅ | ✅ | ✅ |
| Admin Panel | ❌ | ✅ | ❌ |
| User Management | ❌ | ✅ | ❌ |
| Upgrade Account | ✅ | N/A | ✅ |
| Edit Profile | ✅ | ✅ | ✅ |

---

## 🚀 Quick Start Guide

### First Time Using Bible Nation?

1. **Try Admin Features:**
   ```
   Login → admin@biblenation.com / admin123
   Click your avatar → Admin Panel
   Explore user management & notifications
   ```

2. **Test User Experience:**
   ```
   Logout → Login as demo@biblenation.com / demo123
   Visit Personal Page to manage profile
   Go to Settings to customize appearance
   Try Dashboard features
   ```

3. **Test Password Reset:**
   ```
   Logout → Click "Forgot password?"
   Enter: demo@biblenation.com
   Check console or toast for 6-digit code
   Complete reset flow
   Login with new password
   ```

4. **Create Your Own Account:**
   ```
   Click "Sign up"
   Fill in your details
   Watch congratulations animation
   Start using Bible Nation!
   ```

---

## 💡 Pro Tips

### For Developers
- 🔍 Open browser console to see reset codes
- 📦 Check LocalStorage for user data
- 🔔 Admin gets real-time signup notifications
- 🔄 Data persists across sessions

### For Testers
- 🎨 Try different themes in Settings
- 📝 Update profile in Personal Page
- 👑 Test subscription upgrade flow
- 💬 Use AI chatbot features

### For Demos
- 🎬 Start with admin account to show full system
- 👥 Switch to demo user for user perspective
- 🔐 Demonstrate password reset flow
- ⚡ Show real-time admin notifications

---

## 🔒 Security Notes

- All demo data stored in browser LocalStorage
- Passwords stored in plain text (demo only!)
- Production should use proper encryption
- Reset codes expire after 5 minutes
- Duplicate accounts prevented automatically

---

## 📱 Responsive Testing

All accounts work on:
- 💻 Desktop browsers
- 📱 Mobile devices
- 🖥️ Tablets
- 🌐 All modern browsers

---

## 🆘 Need Help?

**Can't login?**
- Clear browser cache and LocalStorage
- Refresh the page
- Use exact credentials above

**Reset not working?**
- Use `demo@biblenation.com` (not admin)
- Check console for code
- Look for toast notifications
- Code expires in 5 minutes

**Account already exists?**
- Email is already registered
- Use "Sign in" instead
- Or use "Forgot password?" to reset

---

## 📖 Related Documentation

- `PASSWORD_RESET_GUIDE.md` - Complete reset flow documentation
- `PERSONAL_SETTINGS_GUIDE.md` - Personal page & settings guide
- `FEATURES.md` - Complete feature list
- `IMPLEMENTATION_SUMMARY.md` - Technical implementation details

---

**Last Updated:** Today
**Version:** 1.0.0
**Status:** ✅ All features operational
