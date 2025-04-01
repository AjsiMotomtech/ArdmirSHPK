import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import AdminPanel from "@/components/admin/AdminPanel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Simple access code verification (in a real app, this would be server-side)
const ADMIN_ACCESS_CODE = "ardmir2024"; // This would be more secure in a real application

const Admin = () => {
  const [accessCode, setAccessCode] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [location, navigate] = useLocation();

  // Check if there's a stored auth state
  useEffect(() => {
    const storedAuth = sessionStorage.getItem("ardmir_admin_auth");
    if (storedAuth === "true") {
      setAuthenticated(true);
    }
  }, []);

  const verifyAccess = () => {
    setIsChecking(true);
    
    // Simulate a check delay for UX purposes
    setTimeout(() => {
      if (accessCode === ADMIN_ACCESS_CODE) {
        setAuthenticated(true);
        sessionStorage.setItem("ardmir_admin_auth", "true");
      } else {
        alert("Incorrect access code. Please try again.");
      }
      setIsChecking(false);
    }, 800);
  };

  const handleLogout = () => {
    setAuthenticated(false);
    sessionStorage.removeItem("ardmir_admin_auth");
    navigate("/");
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="bg-[#1a365d] text-white">
            <CardTitle className="text-xl">Ardmir Shpk Admin Access</CardTitle>
            <CardDescription className="text-gray-200">Enter your access code to continue</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <Input
                  type="password"
                  placeholder="Enter access code"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  className="w-full"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      verifyAccess();
                    }
                  }}
                />
              </div>
              <Button 
                className="w-full bg-[#e67e22] hover:bg-[#d35400] text-white"
                onClick={verifyAccess}
                disabled={isChecking}
              >
                {isChecking ? "Verifying..." : "Access Admin Panel"}
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate("/")}
              >
                Return to Website
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-[#1a365d] text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Ardmir Shpk Admin</h1>
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              className="text-white border-white hover:bg-[#2c4f84] hover:text-white hover:border-white"
              onClick={() => navigate("/")}
            >
              View Website
            </Button>
            <Button 
              variant="ghost" 
              className="text-white hover:text-white hover:bg-red-600"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
      
      <AdminPanel />
    </div>
  );
};

export default Admin;