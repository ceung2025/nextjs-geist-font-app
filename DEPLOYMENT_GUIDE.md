# MEDTOOLS.ID Authentication System - Deployment Guide

## 🚀 How to Connect to Your Published Website (https://creator.medtools.id/)

### Option 1: Subdomain Integration (Recommended)
Deploy this authentication system as a subdomain of your main website:

**Setup:**
1. Deploy this Next.js app to Vercel/Netlify/Railway
2. Configure custom domain: `auth.creator.medtools.id` or `workspace.creator.medtools.id`
3. Update your main website to link to the auth subdomain

**Benefits:**
- Same domain for better SEO and user experience
- Shared cookies and session management
- Professional appearance

### Option 2: Separate Domain with Integration
Deploy on a separate domain but integrate with your main site:

**Setup:**
1. Deploy to any hosting platform
2. Use iframe or redirect integration
3. Configure CORS for cross-domain communication

---

## 📁 File Management System

### Adding Files for Users
1. **Login as Admin**: Use `admin@test.com` / `admin123`
2. **Access Admin Panel**: Go to `/admin` after login
3. **Upload Files**: 
   - Select file (PDF, DOCX, images, etc.)
   - Add description for users
   - Click "Upload File"
4. **Manage Files**: View, delete, or update file descriptions

### File Storage
- Files are stored in `/uploads` directory
- Metadata stored as `.meta.json` files
- Automatic file size calculation and modification dates

---

## 🔐 OAuth Setup (Google & Microsoft)

### Google OAuth Setup
1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Create Project** or select existing one
3. **Enable Google+ API**
4. **Create OAuth 2.0 Credentials**:
   - Application type: Web application
   - Authorized redirect URIs: `https://your-domain.com/api/auth/callback/google`
5. **Copy Client ID and Secret** to `.env.local`

### Microsoft OAuth Setup
1. **Go to Azure Portal**: https://portal.azure.com/
2. **Navigate to Azure Active Directory** > App registrations
3. **Create New Registration**:
   - Name: MEDTOOLS.ID Auth
   - Redirect URI: `https://your-domain.com/api/auth/callback/azure-ad`
4. **Copy Application (client) ID and create Client Secret**
5. **Add to `.env.local`**

### Environment Variables
```env
# Production URLs
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-production-secret-here

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Microsoft OAuth
MICROSOFT_CLIENT_ID=your-microsoft-client-id
MICROSOFT_CLIENT_SECRET=your-microsoft-client-secret
MICROSOFT_TENANT_ID=common
```

---

## 🌐 Integration with creator.medtools.id

### Method 1: Direct Link Integration
Add authentication links to your main website:

```html
<!-- Add to your main website -->
<a href="https://auth.creator.medtools.id" class="auth-button">
  Access Creator WorkSpace
</a>
```

### Method 2: Iframe Integration
Embed the login form directly:

```html
<iframe 
  src="https://auth.creator.medtools.id/login" 
  width="100%" 
  height="600px"
  frameborder="0">
</iframe>
```

### Method 3: API Integration
Use the authentication APIs from your main site:

```javascript
// Check if user is authenticated
fetch('https://auth.creator.medtools.id/api/auth/session')
  .then(response => response.json())
  .then(data => {
    if (data.email) {
      // User is authenticated
      showPrivateContent();
    } else {
      // Redirect to login
      window.location.href = 'https://auth.creator.medtools.id/login';
    }
  });
```

---

## 🔧 Deployment Options

### Vercel (Recommended)
1. **Connect GitHub**: Link your repository
2. **Environment Variables**: Add all OAuth credentials
3. **Custom Domain**: Configure your subdomain
4. **Deploy**: Automatic deployment on push

### Railway
1. **Connect Repository**: Link GitHub repo
2. **Add Environment Variables**: OAuth credentials
3. **Custom Domain**: Configure subdomain
4. **Deploy**: One-click deployment

### Netlify
1. **Connect Git**: Link repository
2. **Build Settings**: 
   - Build command: `npm run build`
   - Publish directory: `.next`
3. **Environment Variables**: Add OAuth credentials
4. **Custom Domain**: Configure subdomain

---

## 👥 User Management

### Adding New Users (Manual)
Edit `src/data/users.json`:
```json
[
  {
    "email": "doctor@medtools.id",
    "password": "secure_password"
  },
  {
    "email": "admin@medtools.id", 
    "password": "admin_password"
  }
]
```

### OAuth Users
- Google/Microsoft users are automatically registered
- No manual user creation needed
- Can restrict by email domain in NextAuth config

---

## 🛡️ Security Features

### Current Security
- JWT-based authentication
- HTTP-only cookies
- Session validation
- File access protection
- Admin-only file management

### Production Security Recommendations
1. **Use HTTPS**: Always use SSL certificates
2. **Strong Secrets**: Generate cryptographically secure secrets
3. **Domain Restrictions**: Limit OAuth to specific domains
4. **File Validation**: Validate uploaded file types
5. **Rate Limiting**: Add rate limiting to prevent abuse

---

## 📊 Monitoring & Analytics

### User Access Tracking
- Login attempts and successes
- File access logs
- OAuth provider usage
- Admin actions

### File Usage Analytics
- Most accessed files
- Download statistics
- User engagement metrics

---

## 🔄 Maintenance

### Regular Tasks
1. **Update Dependencies**: Keep packages updated
2. **Monitor Logs**: Check for errors or security issues
3. **Backup Files**: Regular backup of uploaded files
4. **Review Users**: Remove inactive users
5. **Update OAuth Credentials**: Rotate secrets periodically

### File Management
- Clean up old/unused files
- Organize files by categories
- Update file descriptions
- Monitor storage usage

---

## 📞 Support & Troubleshooting

### Common Issues
1. **OAuth Not Working**: Check redirect URIs and credentials
2. **File Upload Fails**: Check file size limits and permissions
3. **Session Expires**: Verify JWT secret and token expiration
4. **CORS Errors**: Configure proper domain settings

### Getting Help
- Check browser console for errors
- Verify environment variables
- Test OAuth credentials in provider consoles
- Review server logs for detailed error messages

---

This authentication system is now ready for production deployment and integration with your MEDTOOLS.ID Creator Team website!
