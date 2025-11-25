import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { User, Settings, FileText, Lock, LogOut, Menu, X, Eye, EyeOff, Trash2, AlertTriangle, ChevronRight, Download } from 'lucide-react';
import { useProfile } from '@/hooks/useProfile';

type MenuSection = 'profile' | 'settings' | 'surveys' | 'security';

const Profile = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<MenuSection>('profile');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showMyDataSection, setShowMyDataSection] = useState(false);
  
  const {
    loading,
    user,
    email,
    fullName,
    company,
    saving,
    newPassword,
    confirmPassword,
    passwordError,
    passwordSuccess,
    changingPassword,
    showNewPassword,
    showConfirmPassword,
    showDeleteDataDialog,
    showDeleteAccountDialog,
    deletingData,
    deletingAccount,
    setFullName,
    setCompany,
    setNewPassword,
    setConfirmPassword,
    setShowNewPassword,
    setShowConfirmPassword,
    setShowDeleteDataDialog,
    setShowDeleteAccountDialog,
    handleLogout,
    handleSaveProfile,
    handleChangePassword,
    handleDeleteUserData,
    handleDeleteAccount,
  } = useProfile();

  const menuItems = [
    { id: 'profile' as MenuSection, label: 'Profile', icon: User },
    { id: 'surveys' as MenuSection, label: 'My Surveys', icon: FileText },
    { id: 'security' as MenuSection, label: 'Password', icon: Lock },
    { id: 'settings' as MenuSection, label: 'Settings', icon: Settings },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="text-primary text-lg">Loading...</div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Profile Information</h2>
              <p className="text-muted-foreground">Manage your personal information</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  disabled
                  className="bg-muted"
                />
                <p className="text-sm text-muted-foreground">Email cannot be changed</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Enter your company name"
                />
              </div>

              <Button onClick={handleSaveProfile} disabled={saving}>
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>
        );

      case 'surveys':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">My Surveys</h2>
              <p className="text-muted-foreground">View and manage your survey responses</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-8 text-center">
              <FileText className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No surveys completed yet</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => navigate('/questionnaire')}
              >
                Take a Survey
              </Button>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Security</h2>
              <p className="text-muted-foreground">Manage your password and security settings</p>
            </div>
            
            <div className="space-y-4 max-w-md">
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                
                {/* Password Requirements */}
                {newPassword.length > 0 && (
                  <ul className="mt-2 space-y-1 text-sm" aria-live="polite">
                    <li className={newPassword.length >= 8 ? "text-green-600" : "text-red-500"}>
                      <span aria-label={newPassword.length >= 8 ? "fulfilled" : "not fulfilled"} role="img" className="mr-2">
                        {newPassword.length >= 8 ? "✅" : "❌"}
                      </span>
                      Minimum 8 characters
                    </li>
                    <li className={/[A-Z]/.test(newPassword) ? "text-green-600" : "text-red-500"}>
                      <span aria-label={/[A-Z]/.test(newPassword) ? "fulfilled" : "not fulfilled"} role="img" className="mr-2">
                        {/[A-Z]/.test(newPassword) ? "✅" : "❌"}
                      </span>
                      At least one uppercase letter
                    </li>
                    <li className={/[a-z]/.test(newPassword) ? "text-green-600" : "text-red-500"}>
                      <span aria-label={/[a-z]/.test(newPassword) ? "fulfilled" : "not fulfilled"} role="img" className="mr-2">
                        {/[a-z]/.test(newPassword) ? "✅" : "❌"}
                      </span>
                      At least one lowercase letter
                    </li>
                    <li className={/\d/.test(newPassword) ? "text-green-600" : "text-red-500"}>
                      <span aria-label={/\d/.test(newPassword) ? "fulfilled" : "not fulfilled"} role="img" className="mr-2">
                        {/\d/.test(newPassword) ? "✅" : "❌"}
                      </span>
                      At least one number
                    </li>
                    <li className={/[!@#$%^&*]/.test(newPassword) ? "text-green-600" : "text-red-500"}>
                      <span aria-label={/[!@#$%^&*]/.test(newPassword) ? "fulfilled" : "not fulfilled"} role="img" className="mr-2">
                        {/[!@#$%^&*]/.test(newPassword) ? "✅" : "❌"}
                      </span>
                      At least one special character (e.g., !@#$%^&*)
                    </li>
                  </ul>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {confirmPassword.length > 0 && (
                  <p
                    className={`mt-2 text-sm ${newPassword === confirmPassword ? "text-green-600" : "text-red-500"}`}
                    aria-live="polite"
                  >
                    {newPassword === confirmPassword ? "Passwords match ✅" : "Passwords do not match ❌"}
                  </p>
                )}
              </div>

              {passwordError && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                  <p className="text-sm text-destructive">{passwordError}</p>
                </div>
              )}

              {passwordSuccess && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-sm text-green-700">{passwordSuccess}</p>
                </div>
              )}

              <Button 
                onClick={handleChangePassword} 
                disabled={changingPassword}
                className="w-full sm:w-auto"
              >
                {changingPassword ? 'Changing Password...' : 'Change Password'}
              </Button>

              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Security Note:</strong> Your password will be updated immediately. Make sure you remember your new password.
                </p>
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Settings</h2>
              <p className="text-muted-foreground">Manage your account preferences</p>
            </div>
            
            <div className="space-y-4">
              {/* My Data Expandable Section */}
              <div className="border border-border rounded-lg">
                <button
                  onClick={() => setShowMyDataSection(!showMyDataSection)}
                  className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors rounded-lg"
                >
                  <span className="text-lg font-semibold text-foreground">Data Management</span>
                  <ChevronRight 
                    className={`w-5 h-5 text-muted-foreground transition-transform ${showMyDataSection ? 'rotate-90' : ''}`} 
                  />
                </button>
                
                {showMyDataSection && (
                  <div className="border-t border-border p-4 space-y-4">
                    {/* Request Data Section */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <div className="flex items-start gap-4">
                        <Download className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground mb-2">Request Your Data</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Request a copy of all your personal data stored in our system. We'll send it to you via email.
                          </p>
                          <Button 
                            variant="outline" 
                            onClick={() => {
                              const subject = encodeURIComponent('Data Request');
                              const body = encodeURIComponent(
                                `Hello,\n\nI would like to request a copy of all my personal data stored in your system.\n\nThank you.`
                              );
                              window.location.href = `mailto:info@bemaia.nl?subject=${subject}&body=${body}`;
                            }}
                            className="border-blue-300 text-blue-700 hover:bg-blue-100"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Request Data
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Delete User Data Section */}
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                      <div className="flex items-start gap-4">
                        <AlertTriangle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground mb-2">Delete Survey Data</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            This will permanently delete all your survey responses. This action cannot be undone.
                          </p>
                          <Button 
                            variant="outline" 
                            onClick={() => setShowDeleteDataDialog(true)}
                            className="border-orange-300 text-orange-700 hover:bg-orange-100"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Survey Data
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Delete Account Section */}
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                      <div className="flex items-start gap-4">
                        <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground mb-2">Delete Account</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            This will permanently delete your entire account, including all survey data, profile information, and settings. This action cannot be undone.
                          </p>
                          <Button 
                            variant="destructive" 
                            onClick={() => setShowDeleteAccountDialog(true)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Account
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Delete User Data Confirmation Dialog */}
            <AlertDialog open={showDeleteDataDialog} onOpenChange={setShowDeleteDataDialog}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete all your survey responses. You will not be able to recover this data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel disabled={deletingData}>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteUserData}
                    disabled={deletingData}
                    className="bg-orange-600 hover:bg-orange-700"
                  >
                    {deletingData ? 'Deleting...' : 'Delete Survey Data'}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {/* Delete Account Confirmation Dialog */}
            <AlertDialog open={showDeleteAccountDialog} onOpenChange={setShowDeleteAccountDialog}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete your account?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete your entire account, including all survey data, profile information, and settings. 
                    This action cannot be undone and you will be immediately logged out.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel disabled={deletingAccount}>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteAccount}
                    disabled={deletingAccount}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    {deletingAccount ? 'Deleting...' : 'Delete Account Permanently'}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
            <Button
              variant="outline"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-full"
            >
              {mobileMenuOpen ? <X className="w-4 h-4 mr-2" /> : <Menu className="w-4 h-4 mr-2" />}
              {mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            </Button>
          </div>

          {/* Sidebar */}
          <aside className={`
            lg:block lg:w-64 bg-white rounded-lg shadow-sm p-6 h-fit
            ${mobileMenuOpen ? 'block' : 'hidden'}
          `}>
            <div className="space-y-2">
              <div className="mb-6">
                <h1 className="text-xl font-bold text-foreground">My Account</h1>
                <p className="text-sm text-muted-foreground">{email}</p>
              </div>
              
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left
                      ${activeSection === item.id
                        ? 'bg-primary text-white'
                        : 'hover:bg-muted text-foreground'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}

              <div className="pt-4 mt-4 border-t">
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  Logout
                </Button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 bg-white rounded-lg shadow-sm p-6 lg:p-8">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Profile;
