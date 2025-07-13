#!/usr/bin/env python3
"""
Backend API Testing Script for 3D Solar System Portfolio Application
Tests FastAPI endpoints with MongoDB integration
"""

import requests
import json
import sys
import time
from datetime import datetime
from typing import Dict, Any, List

# Configuration - Read from frontend .env file
import os
from pathlib import Path

# Load frontend .env to get the correct backend URL
frontend_env_path = Path("/app/frontend/.env")
if frontend_env_path.exists():
    with open(frontend_env_path, 'r') as f:
        for line in f:
            if line.startswith('REACT_APP_BACKEND_URL='):
                BACKEND_URL = line.split('=', 1)[1].strip()
                break
else:
    BACKEND_URL = "http://localhost:8001"  # fallback

API_BASE = f"{BACKEND_URL}/api"

class BackendTester:
    def __init__(self):
        self.test_results = []
        self.session = requests.Session()
        
    def log_test(self, test_name: str, success: bool, message: str, details: Dict[Any, Any] = None):
        """Log test results"""
        result = {
            "test": test_name,
            "success": success,
            "message": message,
            "timestamp": datetime.now().isoformat(),
            "details": details or {}
        }
        self.test_results.append(result)
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status}: {test_name} - {message}")
        if details and not success:
            print(f"   Details: {details}")
    
    def test_server_health(self) -> bool:
        """Test if the backend server is responding"""
        try:
            response = self.session.get(f"{API_BASE}/", timeout=10)
            if response.status_code == 200:
                data = response.json()
                expected_message = "Hello World"
                if data.get("message") == expected_message:
                    self.log_test("Server Health Check", True, f"Server responding correctly with: {data}")
                    return True
                else:
                    self.log_test("Server Health Check", False, f"Unexpected response: {data}", {"expected": expected_message})
                    return False
            else:
                self.log_test("Server Health Check", False, f"HTTP {response.status_code}", {"response": response.text})
                return False
        except requests.exceptions.RequestException as e:
            self.log_test("Server Health Check", False, f"Connection failed: {str(e)}")
            return False
    
    def test_cors_headers(self) -> bool:
        """Test CORS configuration"""
        try:
            # Test preflight request
            headers = {
                'Origin': 'http://localhost:3000',
                'Access-Control-Request-Method': 'POST',
                'Access-Control-Request-Headers': 'Content-Type'
            }
            response = self.session.options(f"{API_BASE}/status", headers=headers, timeout=10)
            
            cors_headers = {
                'Access-Control-Allow-Origin': response.headers.get('Access-Control-Allow-Origin'),
                'Access-Control-Allow-Methods': response.headers.get('Access-Control-Allow-Methods'),
                'Access-Control-Allow-Headers': response.headers.get('Access-Control-Allow-Headers'),
                'Access-Control-Allow-Credentials': response.headers.get('Access-Control-Allow-Credentials')
            }
            
            # Check if CORS is properly configured
            if cors_headers['Access-Control-Allow-Origin'] in ['*', 'http://localhost:3000']:
                self.log_test("CORS Configuration", True, "CORS headers properly configured", cors_headers)
                return True
            else:
                self.log_test("CORS Configuration", False, "CORS not properly configured", cors_headers)
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test("CORS Configuration", False, f"CORS test failed: {str(e)}")
            return False
    
    def test_create_status_check(self) -> Dict[str, Any]:
        """Test POST /api/status endpoint"""
        try:
            test_data = {
                "client_name": "3D Solar System Test Client"
            }
            
            response = self.session.post(
                f"{API_BASE}/status",
                json=test_data,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                
                # Validate response structure
                required_fields = ["id", "client_name", "timestamp"]
                missing_fields = [field for field in required_fields if field not in data]
                
                if missing_fields:
                    self.log_test("Create Status Check", False, f"Missing fields: {missing_fields}", data)
                    return None
                
                # Validate data types and values
                if (isinstance(data["id"], str) and 
                    data["client_name"] == test_data["client_name"] and
                    isinstance(data["timestamp"], str)):
                    
                    self.log_test("Create Status Check", True, "Status check created successfully", data)
                    return data
                else:
                    self.log_test("Create Status Check", False, "Invalid response data types", data)
                    return None
            else:
                self.log_test("Create Status Check", False, f"HTTP {response.status_code}", {"response": response.text})
                return None
                
        except requests.exceptions.RequestException as e:
            self.log_test("Create Status Check", False, f"Request failed: {str(e)}")
            return None
    
    def test_get_status_checks(self) -> List[Dict[str, Any]]:
        """Test GET /api/status endpoint"""
        try:
            response = self.session.get(f"{API_BASE}/status", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                if isinstance(data, list):
                    # Validate each status check in the list
                    valid_items = 0
                    for item in data:
                        if all(field in item for field in ["id", "client_name", "timestamp"]):
                            valid_items += 1
                    
                    if valid_items == len(data):
                        self.log_test("Get Status Checks", True, f"Retrieved {len(data)} status checks", {"count": len(data)})
                        return data
                    else:
                        self.log_test("Get Status Checks", False, f"Invalid items in response: {len(data) - valid_items}/{len(data)}")
                        return None
                else:
                    self.log_test("Get Status Checks", False, "Response is not a list", {"type": type(data).__name__})
                    return None
            else:
                self.log_test("Get Status Checks", False, f"HTTP {response.status_code}", {"response": response.text})
                return None
                
        except requests.exceptions.RequestException as e:
            self.log_test("Get Status Checks", False, f"Request failed: {str(e)}")
            return None
    
    def test_data_persistence(self) -> bool:
        """Test that data persists between requests"""
        try:
            # Create a unique status check
            unique_client = f"Persistence Test {int(time.time())}"
            test_data = {"client_name": unique_client}
            
            # Create the status check
            create_response = self.session.post(
                f"{API_BASE}/status",
                json=test_data,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if create_response.status_code != 200:
                self.log_test("Data Persistence", False, "Failed to create test data")
                return False
            
            created_item = create_response.json()
            created_id = created_item["id"]
            
            # Wait a moment then retrieve all status checks
            time.sleep(1)
            get_response = self.session.get(f"{API_BASE}/status", timeout=10)
            
            if get_response.status_code != 200:
                self.log_test("Data Persistence", False, "Failed to retrieve data")
                return False
            
            all_items = get_response.json()
            
            # Check if our created item exists in the retrieved list
            found_item = None
            for item in all_items:
                if item["id"] == created_id and item["client_name"] == unique_client:
                    found_item = item
                    break
            
            if found_item:
                self.log_test("Data Persistence", True, "Data persisted correctly in MongoDB", {"created_id": created_id})
                return True
            else:
                self.log_test("Data Persistence", False, "Created item not found in database", {"created_id": created_id, "total_items": len(all_items)})
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test("Data Persistence", False, f"Request failed: {str(e)}")
            return False
    
    def test_error_handling(self) -> bool:
        """Test error handling for invalid requests"""
        try:
            # Test invalid JSON
            response = self.session.post(
                f"{API_BASE}/status",
                data="invalid json",
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            # Should return 4xx error for invalid JSON
            if 400 <= response.status_code < 500:
                self.log_test("Error Handling - Invalid JSON", True, f"Properly handled invalid JSON with HTTP {response.status_code}")
            else:
                self.log_test("Error Handling - Invalid JSON", False, f"Unexpected status code: {response.status_code}")
                return False
            
            # Test missing required field
            response = self.session.post(
                f"{API_BASE}/status",
                json={},  # Missing client_name
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if 400 <= response.status_code < 500:
                self.log_test("Error Handling - Missing Field", True, f"Properly handled missing field with HTTP {response.status_code}")
                return True
            else:
                self.log_test("Error Handling - Missing Field", False, f"Unexpected status code: {response.status_code}")
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test("Error Handling", False, f"Request failed: {str(e)}")
            return False
    
    def test_mongodb_connection(self) -> bool:
        """Test MongoDB connection by performing database operations"""
        try:
            # This is tested implicitly through the CRUD operations
            # If we can create and retrieve data, MongoDB is working
            
            # Create a test item
            test_data = {"client_name": "MongoDB Connection Test"}
            create_response = self.session.post(
                f"{API_BASE}/status",
                json=test_data,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if create_response.status_code == 200:
                # Try to retrieve it
                get_response = self.session.get(f"{API_BASE}/status", timeout=10)
                if get_response.status_code == 200:
                    self.log_test("MongoDB Connection", True, "MongoDB connection and operations working")
                    return True
                else:
                    self.log_test("MongoDB Connection", False, "Failed to retrieve from MongoDB")
                    return False
            else:
                self.log_test("MongoDB Connection", False, "Failed to write to MongoDB")
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test("MongoDB Connection", False, f"Database operation failed: {str(e)}")
            return False
    
    def run_all_tests(self) -> Dict[str, Any]:
        """Run all backend tests"""
        print("🚀 Starting Backend API Tests for 3D Solar System Portfolio")
        print("=" * 60)
        
        # Test server health first
        if not self.test_server_health():
            print("\n❌ Server is not responding. Stopping tests.")
            return self.generate_report()
        
        # Run all tests
        tests = [
            self.test_cors_headers,
            self.test_create_status_check,
            self.test_get_status_checks,
            self.test_data_persistence,
            self.test_mongodb_connection,
            self.test_error_handling
        ]
        
        for test in tests:
            try:
                test()
            except Exception as e:
                self.log_test(test.__name__, False, f"Test execution failed: {str(e)}")
        
        return self.generate_report()
    
    def generate_report(self) -> Dict[str, Any]:
        """Generate final test report"""
        total_tests = len(self.test_results)
        passed_tests = sum(1 for result in self.test_results if result["success"])
        failed_tests = total_tests - passed_tests
        
        report = {
            "summary": {
                "total_tests": total_tests,
                "passed": passed_tests,
                "failed": failed_tests,
                "success_rate": f"{(passed_tests/total_tests*100):.1f}%" if total_tests > 0 else "0%"
            },
            "results": self.test_results,
            "critical_issues": [result for result in self.test_results if not result["success"]],
            "timestamp": datetime.now().isoformat()
        }
        
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        print(f"Total Tests: {total_tests}")
        print(f"Passed: {passed_tests}")
        print(f"Failed: {failed_tests}")
        print(f"Success Rate: {report['summary']['success_rate']}")
        
        if report["critical_issues"]:
            print("\n🚨 CRITICAL ISSUES:")
            for issue in report["critical_issues"]:
                print(f"  - {issue['test']}: {issue['message']}")
        else:
            print("\n✅ All tests passed!")
        
        return report

def main():
    """Main function to run backend tests"""
    tester = BackendTester()
    report = tester.run_all_tests()
    
    # Save report to file
    with open("/app/backend_test_report.json", "w") as f:
        json.dump(report, f, indent=2)
    
    print(f"\n📄 Detailed report saved to: /app/backend_test_report.json")
    
    # Exit with appropriate code
    if report["summary"]["failed"] > 0:
        sys.exit(1)
    else:
        sys.exit(0)

if __name__ == "__main__":
    main()