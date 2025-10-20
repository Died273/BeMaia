import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "@/lib/supabase";
import BeMaiaLogo from "@/assets/logo.svg";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    password: "",
    confirmPassword: "",
    company: "",
    role: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const navigate = useNavigate();

  // Password requirement checks (re-computed on each render based on current input)
  const passwordValue = formData.password || "";
  const passwordRequirements = {
    hasMinLength: passwordValue.length >= 8,
    hasUppercase: /[A-Z]/.test(passwordValue),
    hasLowercase: /[a-z]/.test(passwordValue),
    hasNumber: /\d/.test(passwordValue),
    hasSpecial: /[!@#$%^&*]/.test(passwordValue),
  };
  const allPasswordValid = Object.values(passwordRequirements).every(Boolean);
  const passwordsMatch = formData.password.length > 0 && formData.password === formData.confirmPassword;
  const canSubmit =
    allPasswordValid &&
    passwordsMatch &&
    !!formData.company &&
    !!formData.role &&
    !!formData.firstName &&
    !!formData.email &&
    acceptTerms &&
    !isLoading;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCompanyChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      company: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    
    if (!formData.company) {
      alert("Please select your company!");
      return;
    }

    if (!formData.role) {
      alert("Please select your role!");
      return;
    }
    
    if (!acceptTerms) {
      alert("Please accept the terms and conditions!");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Sign up with Supabase
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            username: formData.firstName,        // Changed from first_name
            company_id: Number(1),                       // Changed from company
            role: formData.role,                 // This one is correct
          }
        }
      });

      if (error) {
        alert(`Signup failed: ${error.message}`);
        setIsLoading(false);
        return;
      }

      // Success - user created
      alert('Account created successfully! Please check your email to verify your account.');
      navigate('/login');
      
    } catch (error) {
      console.error('Signup error:', error);
      alert('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img
            src={BeMaiaLogo}
            alt="BeMaia Logo"
            className="w-20 h-16 transition-transform duration-200 hover:scale-105"
          />
        </div>

        {/* Signup Card */}
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold text-foreground">
              Create your account
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Join BeMaia and get started today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* First Name Field */}
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm font-medium">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="h-11"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="h-11"
                />
              </div>

              {/* Company Field */}
              <div className="space-y-2">
                <Label htmlFor="company" className="text-sm font-medium">
                  Company
                </Label>
                <Select value={formData.company} onValueChange={handleCompanyChange}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select your company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tech-corp">Tech Corp</SelectItem>
                    <SelectItem value="innovate-labs">Innovate Labs</SelectItem>
                    <SelectItem value="digital-solutions">Digital Solutions</SelectItem>
                    <SelectItem value="future-tech">Future Tech</SelectItem>
                    <SelectItem value="smart-systems">Smart Systems</SelectItem>
                    <SelectItem value="data-dynamics">Data Dynamics</SelectItem>
                    <SelectItem value="cloud-ventures">Cloud Ventures</SelectItem>
                    <SelectItem value="ai-enterprises">AI Enterprises</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Role Field */}
              <div className="space-y-2">
                <Label htmlFor="role" className="text-sm font-medium">
                  Role
                </Label>
                <Select value={formData.role} onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ceo">CEO</SelectItem>
                    <SelectItem value="cto">CTO</SelectItem>
                    <SelectItem value="developer">Developer</SelectItem>
                    <SelectItem value="designer">Designer</SelectItem>
                    <SelectItem value="product-manager">Product Manager</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="hr">HR</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="h-11 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {/* Live password requirements */}
                <ul className="mt-2 space-y-1 text-sm" aria-live="polite">
                  <li className={passwordRequirements.hasMinLength ? "text-green-600" : "text-red-500"}>
                    <span aria-label={passwordRequirements.hasMinLength ? "fulfilled" : "not fulfilled"} role="img" className="mr-2">
                      {passwordRequirements.hasMinLength ? "✅" : "❌"}
                    </span>
                    Minimum 8 characters
                  </li>
                  <li className={passwordRequirements.hasUppercase ? "text-green-600" : "text-red-500"}>
                    <span aria-label={passwordRequirements.hasUppercase ? "fulfilled" : "not fulfilled"} role="img" className="mr-2">
                      {passwordRequirements.hasUppercase ? "✅" : "❌"}
                    </span>
                    At least one uppercase letter
                  </li>
                  <li className={passwordRequirements.hasLowercase ? "text-green-600" : "text-red-500"}>
                    <span aria-label={passwordRequirements.hasLowercase ? "fulfilled" : "not fulfilled"} role="img" className="mr-2">
                      {passwordRequirements.hasLowercase ? "✅" : "❌"}
                    </span>
                    At least one lowercase letter
                  </li>
                  <li className={passwordRequirements.hasNumber ? "text-green-600" : "text-red-500"}>
                    <span aria-label={passwordRequirements.hasNumber ? "fulfilled" : "not fulfilled"} role="img" className="mr-2">
                      {passwordRequirements.hasNumber ? "✅" : "❌"}
                    </span>
                    At least one number
                  </li>
                  <li className={passwordRequirements.hasSpecial ? "text-green-600" : "text-red-500"}>
                    <span aria-label={passwordRequirements.hasSpecial ? "fulfilled" : "not fulfilled"} role="img" className="mr-2">
                      {passwordRequirements.hasSpecial ? "✅" : "❌"}
                    </span>
                    At least one special character (e.g., !@#$%^&*)
                  </li>
                </ul>
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className="h-11 pr-10"
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
                {formData.confirmPassword.length > 0 && (
                  <p
                    className={`mt-2 text-sm ${passwordsMatch ? "text-green-600" : "text-red-500"}`}
                    aria-live="polite"
                  >
                    {passwordsMatch ? "Passwords match ✅" : "Passwords do not match ❌"}
                  </p>
                )}
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start space-x-2">
                <input
                  id="acceptTerms"
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded mt-1"
                />
                <Label htmlFor="acceptTerms" className="text-sm text-muted-foreground leading-relaxed">
                  I agree to the{" "}
                  <Link
                    to="/terms"
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full h-11 font-semibold"
                variant="hero"
                disabled={!canSubmit}
              >
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Additional Links */}
        <div className="mt-8 text-center">
          <Link
            to="/"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
