# Account Management & Activation Guide

## Overview
Bible Nation now includes a comprehensive account management system with activation requirements, deactivation capabilities, and soft/permanent delete options for administrators.

## User Account Status Flow

### 1. **New Account Signup**
- When users sign up, their account is created with `isActive: false`
- Users receive a congratulations message informing them their account is pending activation
- Admin receives a real-time notification about the new account
- Users CANNOT log in until their account is activated by an administrator

### 2. **Account Activation**
Administrators can activate pending accounts from the Admin Dashboard:
- Navigate to **Admin Dashboard → Users** tab
- Inactive accounts are marked with an orange "Inactive" badge
- Click the **"Activate"** button (green with checkmark icon)
- Account status changes to "Active" (green badge)
- User can now log in successfully

### 3. **Account Deactivation**
Administrators can temporarily deactivate user accounts:
- Click the **"Deactivate"** button for active accounts
- Confirmation dialog appears to prevent accidental deactivation
- Account status changes to "Inactive"
- User cannot log in (receives "pending activation" error)
- Account can be reactivated at any time

### 4. **Soft Delete (Move to Trash)**
Administrators can soft delete accounts (reversible):
- Click the **Archive icon** button
- Confirmation dialog appears
- Account is marked with `deletedAt` timestamp and becomes inactive
- Account appears with red "Deleted" badge
- User cannot log in (receives "account deleted" error)
- Account can be **restored** later

### 5. **Permanent Delete**
For soft-deleted accounts only:
- Click the **Trash icon** button (red)
- Strong confirmation dialog appears
- Account is permanently removed from the database
- This action CANNOT be undone
- All user data is lost

### 6. **Account Restoration**
For soft-deleted accounts:
- Click the **"Restore"** button
- Account is reactivated immediately
- `deletedAt` is cleared
- Account status returns to "Active"
- User can log in again

## Account Status Badges

| Badge | Color | Meaning |
|-------|-------|---------|
| **Active** | Green | Account is active and user can log in |
| **Inactive** | Orange | Account pending activation or deactivated |
| **Deleted** | Red | Account is soft deleted (can be restored) |

## Demo Credentials

### Pre-Activated Demo Account
The demo user account is automatically created as **ACTIVE** for testing:
- **Email:** demo@biblenation.com
- **Password:** demo123
- **Status:** Active (can log in immediately)

### Admin Account
- **Email:** admin@biblenation.com
- **Password:** admin123
- **Always Active:** Admin accounts are always active

## Login Error Messages

Users will receive specific error messages based on their account status:

1. **Account Pending Activation:**
   - "Your account is pending activation. Please contact the administrator."

2. **Account Deleted:**
   - "This account has been deleted. Please contact support."

3. **Invalid Credentials:**
   - "Invalid email or password"

## Admin Dashboard Actions

### For Inactive Accounts:
- ✅ **Activate** - Enable account for login
- 🗄️ **Soft Delete** - Move to trash (reversible)

### For Active Accounts:
- ❌ **Deactivate** - Temporarily disable login
- 🗄️ **Soft Delete** - Move to trash (reversible)

### For Deleted Accounts:
- ↩️ **Restore** - Reactivate and restore access
- 🗑️ **Permanently Delete** - Remove forever (irreversible)

## Best Practices

### When to Activate
- Review new user information
- Verify email address legitimacy
- Check for spam or bot signups
- Activate genuine users promptly

### When to Deactivate
- Suspicious account activity
- User request for temporary suspension
- Policy violations (temporary)
- Account under investigation

### When to Soft Delete
- User account closure request
- Inactive accounts cleanup
- Policy violations
- Keep option to restore data

### When to Permanently Delete
- User exercising "right to be forgotten"
- Confirmed spam/bot accounts
- Legal requirements
- Final cleanup of old soft-deleted accounts

## Testing the System

### Test New Signup Flow:
1. Create a new account (use a test email)
2. Notice the activation warning in the success dialog
3. Try to log in → Should fail with "pending activation" message
4. Log in as admin
5. See the new account notification
6. Navigate to Users tab
7. Find the new account (orange "Inactive" badge)
8. Click "Activate"
9. Log out and log in with the new account → Success!

### Test Deactivation:
1. As admin, deactivate the demo user
2. Log out
3. Try to log in as demo user → Should fail
4. Log back in as admin
5. Reactivate the demo user

### Test Soft Delete & Restore:
1. As admin, soft delete a user account
2. Account shows red "Deleted" badge
3. User cannot log in
4. Click "Restore"
5. Account is active again

### Test Permanent Delete:
1. Soft delete an account first
2. Click the permanent delete icon (trash)
3. Confirm in the dialog
4. Account is permanently removed from the system

## Technical Implementation

### Database Fields (localStorage)
```javascript
{
  id: string,
  email: string,
  name: string,
  role: 'user' | 'admin',
  createdAt: string,
  isActive: boolean,        // NEW: Controls login access
  deletedAt: string | null, // NEW: Soft delete timestamp
  subscriptionStatus: string,
  password: string
}
```

### Login Validation
The login function now checks:
1. Correct email and password
2. `deletedAt === null` (not soft deleted)
3. `isActive === true` (account is active)

## Security Considerations

1. **Admin Only:** All account management functions require admin role
2. **Confirmation Dialogs:** Destructive actions require confirmation
3. **Audit Trail:** Consider implementing logging for all admin actions
4. **Two-Factor:** Consider adding 2FA for admin actions
5. **Email Notifications:** Consider notifying users of status changes

## Future Enhancements

- [ ] Email notifications when account is activated
- [ ] Account status history/audit log
- [ ] Bulk activation/deactivation
- [ ] Auto-activation based on email verification
- [ ] Scheduled automatic cleanup of old deleted accounts
- [ ] Export user data before permanent deletion
- [ ] Admin notes/reasons for status changes
- [ ] Self-service account deletion request
