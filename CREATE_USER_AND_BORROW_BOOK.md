# 📚 Complete Guide: Create New User & Borrow a Book

**Goal:** Create a brand new user account and successfully borrow a book by selecting a branch.

**Time Required:** 5 minutes

---

## ✅ Prerequisites (Verify First)

Before starting, make sure:

1. **Backend is running**
   ```bash
   # In terminal 1, you should see:
   INFO:     Uvicorn running on http://127.0.0.1:8000
   INFO:     Application startup complete.
   ```

2. **Frontend is running**
   ```bash
   # In terminal 2, you should see:
   ➜  Local:   http://127.0.0.1:5173/
   ```

3. **Browser is open to:** http://127.0.0.1:5173

---

## 🎯 Step 1: Create New User Account

### Click "Register" Button
1. On the login page, look for the text: **"Don't have an account?"**
2. Click the blue **"Register"** link

### Fill Registration Form
Enter the following information:

| Field | Value |
|-------|-------|
| **Name** | `TestUser2` (or any name) |
| **Email** | `testuser2@example.com` (must be unique) |
| **Password** | `password123` |
| **Role** | Select "User" (should be default) |

### Submit Registration
1. Click the blue **"Create Account"** button
2. **Wait 2-3 seconds** for processing
3. You should see:
   - ✅ Green toast: **"Account created successfully! Logging you in..."**
   - Page redirects to **User Dashboard**
   - Your email shown in **top right corner**

---

## 🎯 Step 2: Browse Books on Dashboard

You should now see the **Library Catalog** with multiple books displayed.

### Verify You're Logged In
Look at **top right corner** - should show:
```
testuser2@navikentz.com
User
```

### Find a Book to Borrow
Scroll through the books and find one you want to borrow. For example:
- **"The Cosmic Odyssey"** by Neil Tyson
- **"Culinary Mastery"** by Julia Child
- **"Deep Learning with Python"** by Francois Chollet

---

## 🎯 Step 3: Check Book Availability

### Click "Check Availability" Button
On any book card, click the blue **"Check Availability"** button.

### Expected Result
The button should change to show a list of branches:

```
SELECT BRANCH

📍 North Delhi        ✓ 3 Available
📍 South Delhi        ✓ 10 Available
```

**If you don't see branches:**
- ❌ **Problem:** Book not stocked in any branch
- ✅ **Solution:** Try a different book

**If you see "Not stocked in any branch":**
- Try another book from the catalog

---

## 🎯 Step 4: Select Branch to Borrow

### Click on a Branch (IMPORTANT)
Click on the **blue branch** that shows available copies.

For example, click on:
```
📍 North Delhi  ✓ 3 Available
```

### Expected Result After Clicking
**You should see:**

1. ✅ **Green toast notification** at the top:
   ```
   ✅ Book borrowed successfully!
   ```

2. ✅ **Branch list disappears**

3. ✅ **Button changes back** to "Check Availability"

---

## 🎯 Step 5: Verify the Book Was Borrowed

### Go to "My Books" Page
1. Click **"My Books"** in the top navigation bar
2. You should see your newly borrowed book listed with:
   - ✅ Book title
   - ✅ Author name
   - ✅ Issue date (today's date)
   - ✅ Due date (14 days from today)
   - ✅ "Return" button

---

## ✨ Success!
If you've completed all steps and see the book in "My Books", **congratulations!** You've successfully:
- ✅ Created a new user account
- ✅ Logged in with that account
- ✅ Browsed available books
- ✅ Selected a branch
- ✅ Borrowed a book

---

## 🆘 Troubleshooting

### Issue: Nothing Happens When I Click Branch

**Solution:**

1. **Hard refresh browser**
   ```
   Mac: Cmd+Shift+R
   Windows/Linux: Ctrl+Shift+R
   ```

2. **Open DevTools to see errors**
   ```
   Press F12
   Go to Console tab
   Try clicking branch again
   Look for error messages
   ```

3. **Log out and back in**
   ```
   Click logout (top right)
   Log back in with your new account
   Try again immediately
   ```

---

### Issue: "Email already registered"

**Cause:** Email address is already used  
**Solution:** Use a different email:
```
testuser3@example.com
testuser4@example.com
newemail@test.com
```

---

### Issue: "Not stocked in any branch"

**Cause:** That book doesn't have inventory in any branch  
**Solution:** Try a different book

Available books with inventory:
- The Cosmic Odyssey
- Culinary Mastery
- Empire of the Caesars
- Deep Learning with Python
- The Whispering Woods
- Financial Freedom
- Mindful Meditation
- The Art of War
- Gardening 101

---

### Issue: Can't see branches after clicking "Check Availability"

**Cause:** Availability data not loading  
**Solution:**
1. Check backend is running
2. Open console (F12)
3. Look for error message
4. Try different book
5. Refresh page and try again

---

### Issue: Toast notification doesn't appear

**Cause:** Either success or error occurred, but notification didn't show  
**Solution:**
1. Open DevTools (F12)
2. Go to Console tab
3. Click branch again
4. Look for messages like:
   ```
   🔄 Attempting to borrow book
   ✅ Successfully borrowed book
   or
   ❌ Error borrowing book
   ```

---

## 📋 Complete Checklist

Before you start, verify:

- [ ] Backend running (terminal 1 shows "Uvicorn running")
- [ ] Frontend running (terminal 2 shows "Local: http://127.0.0.1:5173")
- [ ] Browser open to http://127.0.0.1:5173
- [ ] On login page (not already logged in)

During registration:

- [ ] Fill all fields (Name, Email, Password, Role)
- [ ] Email is unique (not used before)
- [ ] Password is at least 8 characters
- [ ] Role is set to "User"
- [ ] Click "Create Account"
- [ ] Wait for "Account created" toast

During borrowing:

- [ ] You're logged in (email visible top right)
- [ ] Dashboard showing books
- [ ] Click "Check Availability" on a book
- [ ] Branches appear in list
- [ ] Click blue branch (has available copies)
- [ ] See "Book borrowed successfully!" toast
- [ ] Go to "My Books" to verify

---

## 🎓 What Each Screen Should Look Like

### Screen 1: Login Page
```
Smart Library logo
"Create a New Account" heading (or "Library Login")
Fields: Name, Email, Password
Button: "Create Account" (blue)
Link: "Already have an account? Sign In"
```

### Screen 2: User Dashboard (After Login)
```
Top bar with: Smart Library | Catalog | My Books | your@email.com | User
Heading: "Library Catalog"
Grid of books with:
  - Book icon
  - Title
  - Author
  - Description
  - "Check Availability" button
```

### Screen 3: Branch Selection
```
Book card showing:
"SELECT BRANCH"
Branch 1: 📍 North Delhi ✓ 3 Available (clickable)
Branch 2: 📍 South Delhi ✓ 10 Available (clickable)
"Cancel" link at bottom
```

### Screen 4: After Successful Borrow
```
Green toast at top: ✅ Book borrowed successfully!
Book card back to: "Check Availability" button
(Branch selection hidden)
```

### Screen 5: My Books Page
```
Table/List showing:
- Book title
- Author
- Issue date
- Due date
- Fine (0 if on time)
- Return button
```

---

## 💡 Pro Tips

1. **First time might be slow:** The AI model loads on first search, making it take 2-5 seconds initially. Subsequent operations are faster.

2. **Token expires after 30 minutes:** If you get 401 errors after 30 min of inactivity, log out and back in.

3. **Multiple books at once:** You can borrow multiple different books, but only one copy of each book at a time.

4. **Return books anytime:** Go to "My Books" and click "Return" to return a book.

5. **Late fees:** If you keep a book past the due date, you'll be charged ₹100 per day late fee.

---

## 🔧 If You Get Stuck

1. **Check Console (F12)** for error messages
2. **Check Backend Terminal** for request logs
3. **Read FIX_401_BORROW_BOOKS.md** for auth issues
4. **Read DEBUG_BRANCH_SELECTION.md** for selection issues
5. **Hard refresh browser** (Cmd+Shift+R / Ctrl+Shift+R)
6. **Log out and back in** completely
7. **Restart both servers** if persistent issues

---

## ✅ Expected Timeline

| Step | Time | What Happens |
|------|------|--------------|
| Registration | 30 sec | Form fills, account created |
| Login | 10 sec | Redirected to dashboard |
| Browse books | 1 min | Scroll and find book |
| Check availability | 2 sec | Branches appear |
| Click branch | 2 sec | Toast shows success |
| Verify in My Books | 1 min | See borrowed book listed |
| **TOTAL** | **~5 min** | Complete workflow |

---

**Last Updated:** April 12, 2026  
**Status:** ✅ Complete & Tested
