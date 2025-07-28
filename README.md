# MEDTOOLS.ID - Creator Team WorkSpace Authentication System

A secure, modern authentication system built with Next.js for the MEDTOOLS.ID Creator Team WorkSpace. Features email/password authentication, OAuth integration (Google & Microsoft), and protected file access management.

## 🏥 Features

- **MEDTOOLS.ID Themed Design** - Professional medical branding
- **Multiple Authentication Methods** - Email/password + Google + Microsoft OAuth
- **File Management System** - Admin panel for uploading and managing private files
- **Protected File Access** - Secure file viewing for authenticated users
- **Session Management** - JWT-based authentication with secure cookies
- **Responsive Design** - Works perfectly on all devices
- **Admin Panel** - Complete file management interface

## 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set Up Environment Variables**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your OAuth credentials
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Open Application**
   - Visit [http://localhost:8000](http://localhost:8000)
   - Use demo credentials: `user@example.com` / `password123`

## 🔐 Demo Accounts

### User Account
- **Email:** user@example.com
- **Password:** password123

### Admin Account (File Management)
- **Email:** admin@test.com
- **Password:** admin123

## 📁 File Management

### For Admins
1. Login with admin credentials
2. Go to `/admin`
3. Upload files with descriptions
4. Manage existing files

### For Users
1. Login with any account
2. Go to `/private`
3. Click "Load Private Files"
4. View protected documents

## 🌐 OAuth Setup

### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create project and enable Google+ API
3. Create OAuth 2.0 credentials
4. Add redirect URI: `https://your-domain.com/api/auth/callback/google`
5. Update `.env.local` with credentials

### Microsoft OAuth
1. Go to [Azure Portal](https://portal.azure.com/)
2. Navigate to Azure Active Directory > App registrations
3. Create new registration
4. Add redirect URI: `https://your-domain.com/api/auth/callback/azure-ad`
5. Update `.env.local` with credentials

## 🚀 Deployment

### Vercel (Recommended)
1. Connect GitHub repository
2. Add environment variables
3. Deploy automatically

### Railway
1. Connect repository
2. Add environment variables
3. One-click deployment

### Netlify
1. Connect Git repository
2. Configure build settings
3. Add environment variables

## 🔧 Environment Variables

```env
# JWT Secret
JWT_SECRET=your_jwt_secret_here

# NextAuth Configuration
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your_nextauth_secret_here

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Microsoft OAuth
MICROSOFT_CLIENT_ID=your_microsoft_client_id
MICROSOFT_CLIENT_SECRET=your_microsoft_client_secret
MICROSOFT_TENANT_ID=common
```

## 📖 Documentation

- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Complete deployment and integration guide
- **[integration-example.html](./integration-example.html)** - Live integration examples

## 🛡️ Security Features

- JWT-based authentication
- HTTP-only cookies
- Session validation
- Protected API endpoints
- Admin-only file management
- OAuth integration

## 🎨 Design

- Professional MEDTOOLS.ID branding
- Medical-themed interface
- Responsive Tailwind CSS design
- Modern UI components
- Clean typography and spacing

## 📱 Routes

- `/` - Homepage with MEDTOOLS.ID theme
- `/login` - Authentication page with OAuth options
- `/private` - Protected file access area
- `/admin` - File management panel (admin only)

## 🔗 Integration with creator.medtools.id

This system can be integrated with your main website through:
1. **Subdomain deployment** (recommended)
2. **Direct link integration**
3. **API integration**
4. **Iframe embedding**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is built for MEDTOOLS.ID Creator Team WorkSpace.

## 🆘 Support

For issues or questions:
1. Check the deployment guide
2. Verify environment variables
3. Review browser console for errors
4. Check server logs

---

**Built with ❤️ for MEDTOOLS.ID Creator Team**
