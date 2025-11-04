import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Settings, FileText, Lock, LogOut, Menu, X } from 'lucide-react';

type MenuSection = 'profile' | 'settings' | 'surveys' | 'security';

const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [activeSection, setActiveSection] = useState<MenuSection>('profile');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Profile form state
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login', { state: { from: '/profile' } });
        return;
      }
      setUser(user);
      setEmail(user.email || '');
      
      // Fetch additional profile data from your database if you have a profiles table
      // const { data: profile } = await supabase
      //   .from('profiles')
      //   .select('*')
      //   .eq('id', user.id)
      //   .single();
      // if (profile) {
      //   setFullName(profile.full_name || '');
      //   setCompany(profile.company || '');
      // }
    } catch (error) {
      console.error('Error fetching user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      // Update profile in your database
      // const { error } = await supabase
      //   .from('profiles')
      //   .update({
      //     full_name: fullName,
      //     company: company,
      //   })
      //   .eq('id', user.id);
      
      // if (error) throw error;
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile');
    } finally {
      setSaving(false);
    }
  };

  const menuItems = [
    { id: 'profile' as MenuSection, label: 'Profile', icon: User },
    { id: 'surveys' as MenuSection, label: 'My Surveys', icon: FileText },
    { id: 'security' as MenuSection, label: 'Security', icon: Lock },
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
            <div className="space-y-4">
              <Button variant="outline" onClick={() => {
                // Implement password reset
                alert('Password reset email will be sent');
              }}>
                Change Password
              </Button>
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
              <div className="bg-muted/50 rounded-lg p-6">
                <h3 className="font-semibold mb-2">Account Actions</h3>
                <Button 
                  variant="destructive" 
                  onClick={handleLogout}
                  className="mt-2"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
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
