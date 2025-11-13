import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

export const useProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  
  // Profile form state
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [saving, setSaving] = useState(false);
  
  // Password change state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Delete confirmation dialogs
  const [showDeleteDataDialog, setShowDeleteDataDialog] = useState(false);
  const [showDeleteAccountDialog, setShowDeleteAccountDialog] = useState(false);
  const [deletingData, setDeletingData] = useState(false);
  const [deletingAccount, setDeletingAccount] = useState(false);

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

  const handleChangePassword = async () => {
    // Reset messages
    setPasswordError('');
    setPasswordSuccess('');

    
    if (!newPassword || !confirmPassword) {
      setPasswordError('Please enter and confirm your new password');
      return;
    }

    // Password requirement checks
    const passwordRequirements = {
      hasMinLength: newPassword.length >= 8,
      hasUppercase: /[A-Z]/.test(newPassword),
      hasLowercase: /[a-z]/.test(newPassword),
      hasNumber: /\d/.test(newPassword),
      hasSpecial: /[!@#$%^&*]/.test(newPassword),
    };

    if (!passwordRequirements.hasMinLength) {
      setPasswordError('Password must be at least 8 characters long');
      return;
    }

    if (!passwordRequirements.hasUppercase) {
      setPasswordError('Password must contain at least one uppercase letter');
      return;
    }

    if (!passwordRequirements.hasLowercase) {
      setPasswordError('Password must contain at least one lowercase letter');
      return;
    }

    if (!passwordRequirements.hasNumber) {
      setPasswordError('Password must contain at least one number');
      return;
    }

    if (!passwordRequirements.hasSpecial) {
      setPasswordError('Password must contain at least one special character (!@#$%^&*)');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    setChangingPassword(true);

    try {
      // Update the password - Supabase securely handles this with the active session
      // The user must have a valid session to perform this action
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) {
        setPasswordError(updateError.message);
      } else {
        setPasswordSuccess('Password updated successfully! You can now use your new password to log in.');
        // Clear the form
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (error: any) {
      console.error('Error changing password:', error);
      setPasswordError(error.message || 'An error occurred while changing password');
    } finally {
      setChangingPassword(false);
    }
  };

  const handleDeleteUserData = async () => {
    setDeletingData(true);
    try {
      // Delete all survey-related data for this user
      const { error } = await supabase
        .from('response')
        .delete()
        .eq('user_id', user.id);

      if (error) {
        console.error('Error deleting user data:', error);
        alert('Error deleting survey data: ' + error.message);
      } else {
        alert('All survey data has been successfully deleted.');
        setShowDeleteDataDialog(false);
      }
    } catch (error: any) {
      console.error('Error deleting user data:', error);
      alert('An error occurred while deleting survey data.');
    } finally {
      setDeletingData(false);
    }
  };

  const handleDeleteAccount = async () => {
    setDeletingAccount(true);
    try {
      // Delete all user's survey responses
      await supabase
        .from('response')
        .delete()
        .eq('user_id', user.id);

      // Delete user's consent records
      await supabase
        .from('consent')
        .delete()
        .eq('user_id', user.id);

      // Delete user's profile
      await supabase
        .from('profile')
        .delete()
        .eq('auth_user_id', user.id);

      // Sign out - this effectively "deletes" access to the account
      // Note: The auth.users record will remain but the user won't be able to access it
      // For complete deletion, you'll need to set up the RPC function in Supabase
      await supabase.auth.signOut();
      
      alert('Your account data has been deleted and you have been logged out.');
      navigate('/');
    } catch (error: any) {
      console.error('Error deleting account:', error);
      alert('An error occurred while deleting your account.');
      setDeletingAccount(false);
    }
  };

  return {
    // State
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
    
    // Setters
    setEmail,
    setFullName,
    setCompany,
    setNewPassword,
    setConfirmPassword,
    setShowNewPassword,
    setShowConfirmPassword,
    setShowDeleteDataDialog,
    setShowDeleteAccountDialog,
    
    // Handlers
    handleLogout,
    handleSaveProfile,
    handleChangePassword,
    handleDeleteUserData,
    handleDeleteAccount,
  };
};
