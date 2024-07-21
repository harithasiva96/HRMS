import unittest 
from app import app,db,login 
from models import HR, Employee, Designation 
from flask import jsonify 
from unittest.mock import patch,MagicMock 
from sqlalchemy import select 


 

# Login Test cases 

class TestLogin(unittest.TestCase): 

 

    def setUp(self): 

        # Set up the app and test client 
        self.app = app 
        self.client = self.app.test_client() 
        self.app.config['TESTING'] = True 
        self.app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db' 
        self.app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False 

        # Create the database and add a test user 
        with self.app.app_context(): 
            db.create_all() 
            user = HR(user_name='username', email='user@gmail.com.com') 
            user.set_password('password')  # Set the password for the test user 
            db.session.add(user) 
            db.session.commit() 

 

    def tearDown(self): 
        # Drop the database 
        with self.app.app_context(): 
            db.session.remove() 
            db.drop_all() 

    def test_login_successful(self): 

        response = self.client.post('/login', json={ 
            'user_name': 'username', 
            'password': 'password' 

        }) 

        self.assertEqual(response.status_code, 200) 
        self.assertEqual(response.json, {'message': 'Login successful.'}) 


    def test_missing_username(self): 

        # Test login with missing user_name field 
        response = self.client.post('/login', json={ 
            'password': 'password' 

        }) 

        self.assertEqual(response.status_code, 400) 
        self.assertEqual(response.json, {'message': 'Missing user_name or password.'}) 

 

    def test_missing_password(self): 

        # Test login with missing user_name field 
        response = self.client.post('/login', json={ 
            'user_name': 'username' 

        }) 

        self.assertEqual(response.status_code, 400) 
        self.assertEqual(response.json, {'message': 'Missing user_name or password.'}) 

 

    def test_wrong_uname(self): 

        response = self.client.post('/login', json={ 
            'user_name': 'wronguser', 
            'password': 'password' 

        }) 

        self.assertEqual(response.status_code, 401) 
        self.assertEqual(response.json, {'message': 'Incorrect user_name or password. Please try again.'}) 

 

    def test_wrong_password(self): 

        response = self.client.post('/login', json={ 
            'user_name': 'username', 
            'password': 'wrongpassword' 

        }) 

        self.assertEqual(response.status_code, 401) 
        self.assertEqual(response.json, {'message': 'Incorrect user_name or password. Please try again.'}) 


    def test_failure(self): 

        response = self.client.post('/login', json={ 
           'user_name': 'wronguser', 
            'password': 'wrongpassword' 

        }) 

        self.assertEqual(response.status_code, 401) 
        self.assertEqual(response.json, {'message': 'Incorrect user_name or password. Please try again.'}) 

 

# Logout Test cases 

class TestLogout(unittest.TestCase): 

 
    def setUp(self): 

        self.app = app 
        self.client = self.app.test_client() 
        self.app.config['TESTING'] = True 
        self.app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db' 
        self.app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False 

        # Create the database and add a test user 

        with self.app.app_context(): 
            db.create_all() 
            user = HR(user_name='username', email='user@gmail.com') 
            user.set_password('password')  # Set the password for the test user 
            db.session.add(user) 
            db.session.commit() 

 

    def tearDown(self): 
       # Drop the database 
        with self.app.app_context(): 
            db.drop_all() 

    def test_logout_successful(self): 

        response = self.client.post('/logout', json={ 
            'user_name': 'username', 
            'password': 'password' 

        }) 

        self.assertEqual(response.status_code, 200) 
        self.assertEqual(response.json, {'message': 'Logged out successfully.'}) 


# Add Designation Test cases 

class TestAddDesignation(unittest.TestCase): 

    def setUp(self): 

        self.app = app 
        self.client = self.app.test_client() 
        self.app.config['TESTING'] = True 
        self.app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db' 
        self.app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False 

        # Create the database and add a test user 

        with self.app.app_context(): 
            db.create_all() 


    def tearDown(self): 
        # Drop the database 
        with self.app.app_context(): 
            db.session.remove() 
            db.drop_all() 

    # Successfull designation case 

    def test_designation_successful(self): 

        response = self.client.post('/designation', json={ 
            'designation_name': 'Software developer trainee', 
            'max_permitted_leave': 12 

        }) 

        self.assertEqual(response.status_code, 201) 
        self.assertEqual(response.json, 'Designation inserted') 

 

        # with self.app.app_context(): 
        #     designation = Designation.query.filter_by(designation_name='Software developer trainee').first() 
        #     self.assertIsNotNone(designation) 
        #     self.assertEqual(designation.max_permitted_leave, 12) 

 

    # No input in Designation field 
    def test_missing_designation(self): 
        response = self.client.post('/designation', json={ 
            'max_permitted_leave': 12 

        }) 

        self.assertEqual(response.status_code, 400) 
        self.assertEqual(response.json, {'message': 'Missing designation_name or max_permitted_leave.'}) 

 
    # No input in max_permitted leave field 
    def test_missing_leave(self): 
        response = self.client.post('/designation', json={ 
            'designation_name': 'Software developer trainee' 

        }) 

        self.assertEqual(response.status_code, 400) 
        self.assertEqual(response.json, {'message': 'Missing designation_name or max_permitted_leave.'}) 

 

    # No input in either field. 

    def test_missing_credentials(self): 
        response = self.client.post('/designation', json={ 

 

 

        }) 

        self.assertEqual(response.status_code, 400) 
        self.assertEqual(response.json, {'message': 'Missing designation_name or max_permitted_leave.'}) 

 

    # Input already existing designtaion 

    def test_existing_designation(self): 

        self.client.post('/designation', json={ 
            'designation_name': 'HR Manager', 
            'max_permitted_leave': 15 

        }) 

        response = self.client.post('/designation', json={ 

            'designation_name': 'HR Manager', 
            'max_permitted_leave': 20 

        }) 

        self.assertEqual(response.status_code, 400) 
        self.assertEqual(response.json, {'message': 'Designation already exists.'}) 

 

class TestAddEmployee(unittest.TestCase): 

    def setUp(self): 

        app.config['TESTING'] = True 
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db' 
        app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False 
        self.client = app.test_client() 

        with app.app_context(): 
            db.create_all() 


            # # Add sample designations 
            db.session.add_all([ 
                Designation(designation_name='Intern', max_permitted_leave=10), 
                Designation(designation_name='HR', max_permitted_leave=20), 
                Designation(designation_name='Manager', max_permitted_leave=28) 

            ]) 

            db.session.commit() 

    def tearDown(self): 
        with app.app_context(): 
            db.session.remove() 
            db.drop_all() 

 
    # Successfull employee add case 
    def test_employee_successful(self): 
        response = self.client.post('/addemployee', json={ 
            'employee_name': 'Michale', 
            'email': 'mic@gmail.com', 
            'total_leaves_used' : 5, 
            'phone_number' : '9876543210', 
            'address': 'Glads Villa, California', 
            'designation_name':'HR' 

        }) 

        self.assertEqual(response.status_code,201) 
        self.assertEqual(response.json, {'message': 'Employee added successfully'}) 

    def test_wrong_designation(self): 

        response = self.client.post('/addemployee', json={ 
            'employee_name': 'Michale', 
            'email': 'mic@gmail.com', 
            'total_leaves_used' : 5, 
            'phone_number' : '9876543210', 
            'address': 'Glads Villa, California', 
            'designation_name':'CEO' 


        }) 

        self.assertEqual(response.status_code,400) 
        self.assertEqual(response.json, {'error':'Invalid designation_name' }) 

 

    def test_exceed_leave(self): 

        response = self.client.post('/addemployee', json={ 
            'employee_name': 'Michale', 
            'email': 'mic@gmail.com', 
            'total_leaves_used' : 25, 
            'phone_number' : '9876543210', 
            'address': 'Glads Villa, California', 
            'designation_name':'HR' 

        }) 

        self.assertEqual(response.status_code,400) 
        self.assertEqual(response.json, {'message':'Total leaves used cannot exceed max permitted leaves' }) 

    def test_no_input(self): 
        response = self.client.post('/addemployee', json={ 

 

        }) 

        self.assertEqual(response.status_code,400) 
        self.assertEqual(response.json, {"error": "Invalid input" }) 

 

    def test_missing_anyfield(self): 
        response = self.client.post('/addemployee', json={ 
            'employee_name': '', 
            'email': 'mic@gmail.com', 
            'total_leaves_used' : 2, 
            'phone_number' : '9876543210', 
            'address': 'Glads Villa, California', 
            'designation_name':'HR' 
 

        }) 

        self.assertEqual(response.status_code,400) 
        self.assertEqual(response.json, {'error': 'Missing required fields'}) 

 

    def test_phone_number(self): 
        response = self.client.post('/addemployee', json={ 
            'employee_name': 'Michale', 
            'email': 'mic@gmail.com', 
            'total_leaves_used' : 2, 
            'phone_number' : '9876543210000', 
            'address': 'Glads Villa, California', 
            'designation_name':'HR' 


        }) 

        self.assertEqual(response.status_code,400) 
        self.assertEqual(response.json, {'error': 'Phone number should contain 10 digits and shouldnt exceed it.'}) 
 

    def test_email(self): 

        response = self.client.post('/addemployee', json={ 
            'employee_name': 'Michale', 
            'email': 'micgmailcom', 
            'total_leaves_used' : 2, 
            'phone_number' : '9876543210', 
            'address': 'Glads Villa, California', 
            'designation_name':'HR' 

 

        }) 

        self.assertEqual(response.status_code,400) 

        self.assertEqual(response.json, {'error':'Format of email is not correct'}) 

 

 

 

 

class TestUpdateDesignation(unittest.TestCase): 

    def setUp(self): 
        # Create a test client 
        self.client = app.test_client() 
        self.client.testing = True 
        # Create a context for the test database 
        self.app_context = app.app_context() 
        self.app_context.push() 
        # Set up the database for the tests 

        with self.app_context: 
            db.create_all() 

            # Add some test data to the database 

            db.session.add_all([ 
                Designation(designation_id=1, designation_name="Manager", max_permitted_leave=15), 
                Designation(designation_id=2, designation_name="Developer", max_permitted_leave=10), 
                Designation(designation_id=3, designation_name="Tester", max_permitted_leave=5) 

            ]) 

            db.session.commit() 

 

    def tearDown(self): 

        # Clean up the database after each test 

        with self.app_context: 
            db.session.remove() 
            db.drop_all() 
        self.app_context.pop() 


    def test_update_designation_success(self): 

        response = self.client.put('/updatedesignation/1', json={ 
            'designation_name': 'Senior Manager', 
            'max_permitted_leave': 20 

        }) 

        self.assertEqual(response.status_code, 200) 
        self.assertEqual(response.get_json(), {'message': 'Designation updated'}) 

 

    def test_missing_designation(self): 
        response = self.client.put('/updatedesignation/1', json={ 
            'designation_name':'HR' 
 

        }) 

        self.assertEqual(response.status_code, 400) 
        self.assertEqual(response.get_json(), {"error": "Missing required fields"}) 

 

    def test_missing_leave(self): 
        response = self.client.put('/updatedesignation/1', json={ 
            'designation_name':'', 
            'max_permitted_leave': 15 


        }) 

        self.assertEqual(response.status_code, 400) 
        self.assertEqual(response.get_json(), {"error": "Missing required fields"}) 

 

 

class TestUpdateEmployee(unittest.TestCase): 

    def setUp(self): 
        # Create a test client 
        self.client = app.test_client() 
        self.client.testing = True 
        # Create a context for the test database 
        self.app_context = app.app_context() 
        self.app_context.push() 

 
        # Set up the database for the tests 
        with self.app_context: 
            db.create_all() 
            # Add some test data to the database 
            db.session.add_all([ 
                Designation(designation_id=1, designation_name="Manager", max_permitted_leave=15), 
                Designation(designation_id=2, designation_name="Developer", max_permitted_leave=10), 
                Designation(designation_id=3, designation_name="Tester", max_permitted_leave=5), 
                Employee(employee_id=3, employee_name="Michale", email="mic@gmail.com", total_leaves_used=5, phone_number="1234567890", address="Glad fields, California", designation_id=2), 
                Employee(employee_id=2, employee_name="Rahel", email="rah@gmail.com", total_leaves_used=2, phone_number="0987654321", address="Forks, Washington", designation_id=1), 

 

            ]) 

            db.session.commit() 

    def tearDown(self): 
        # Clean up the database after each test 
        with self.app_context: 
            db.session.remove() 
            db.drop_all() 
        self.app_context.pop() 

 

    def test_update_employee_success(self): 
        response = self.client.put('/updateemployee/3', json={ 
            'employee_name': 'Michale', 
            'email': 'mic@gmail.com', 
            'total_leaves_used' : 2, 
            'phone_number' : '9876543210', 
            'address': 'Glad fields, California', 
            'designation_name':'Developer' 
 

        }) 

        self.assertEqual(response.status_code, 200) 
        self.assertEqual(response.get_json(), {'message': 'Employee updated successfully'}) 

 

    def test_leave(self): 

        response = self.client.put('/updateemployee/2', json={ 
            'employee_name': 'Michale', 
            'email': 'rah@gmail.com', 
            'total_leaves_used' : 25, 
            'phone_number' : '9807654321', 
            'address': 'Forks, Washington', 
            'designation_name':'Manager' 

        }) 

        self.assertEqual(response.status_code, 400) 
        self.assertEqual(response.get_json(), {"error": "Total leaves used cannot exceed max permitted leaves"}) 

 

    def test_missing_field(self): 

        response = self.client.put('/updateemployee/2', json={ 
            'employee_name': 'Michale', 
            'email': 'rah@gmail.com', 
            # 'total_leaves_used' : 2, 
            'phone_number' : '9807654321', 
            'address': 'Forks, Washington', 
            'designation_name':'Manager' 


        }) 

        self.assertEqual(response.status_code, 400) 
        self.assertEqual(response.get_json(), {"error": "Missing required fields"}) 



 

 

class TestListDesignations(unittest.TestCase): 

 

    def setUp(self): 
        self.client = app.test_client() 
        with app.app_context(): 
            db.create_all() 
            db.session.add_all([ 
                Designation(designation_id=1, designation_name='Intern', max_permitted_leave=10), 
                Designation(designation_id=2, designation_name='HR', max_permitted_leave=20), 
                Designation(designation_id=3, designation_name='Manager', max_permitted_leave=30) 

            ]) 

            db.session.commit() 

 

    def tearDown(self): 
        with app.app_context(): 
            db.session.remove() 
            db.drop_all() 

 

    def test_list_designation_successfull(self): 

        response = self.client.get('/designations') 
        self.assertEqual(response.status_code, 200) 
        expected_json = [ 

            {"designation_id": 1, "designation_name": "Intern", "max_permitted_leave": 10}, 
            {"designation_id": 2, "designation_name": "HR", "max_permitted_leave": 20}, 
            {"designation_id": 3, "designation_name": "Manager", "max_permitted_leave": 30} 

        ] 

        self.assertEqual(response.get_json(), expected_json) 

 

    def test_no_designations(self): 
        with app.app_context(): 
            Designation.query.delete() 
            db.session.commit() 
        response = self.client.get('/designations') 
        self.assertEqual(response.status_code, 200) 
        self.assertEqual(response.get_json(), []) 

 

 

class TestListEmployee(unittest.TestCase): 

    def setUp(self): 
        self.client = app.test_client() 
        with app.app_context(): 
            db.create_all() 
 
            db.session.add_all([ 

                Designation(designation_id=1, designation_name='Intern', max_permitted_leave=10), 
                Designation(designation_id=2, designation_name='HR', max_permitted_leave=20), 
                Designation(designation_id=3, designation_name='Manager', max_permitted_leave=30) 

            ]) 

            db.session.commit() 

            db.session.add_all([ 

                Employee(employee_id=1, employee_name='Alice', email='alice@example.com', total_leaves_used=5, phone_number='1234567890', address='123 Wonderland', designation_id=1), 
                Employee(employee_id=2, employee_name='Bob', email='bob@example.com', total_leaves_used=7, phone_number='0987654321', address='456 Neverland', designation_id=2), 
                Employee(employee_id=3, employee_name='Charlie', email='charlie@example.com', total_leaves_used=10, phone_number='1122334455', address='789 Dreamland', designation_id=3) 

            ]) 

            db.session.commit() 

 

    def tearDown(self): 

        with app.app_context(): 
            db.session.remove() 
            db.drop_all() 

 

    def test_list_employee_successful(self): 
        response = self.client.get('/employee') 
        self.assertEqual(response.status_code, 200) 
        data = response.get_json() 
        self.assertIsNotNone(data)  

        expected_json = [ 

             { 

                "employee_id": 1, "employee_name": "Alice", "email": "alice@example.com", 
                "total_leaves_used": 5, "phone_number": "1234567890", "address": "123 Wonderland", 
                "designation_name": "Intern", "max_permitted_leave": 10 

            }, 

            { 

                "employee_id": 2, "employee_name": "Bob", "email": "bob@example.com", 
                "total_leaves_used": 7, "phone_number": "0987654321", "address": "456 Neverland", 
                "designation_name": "HR", "max_permitted_leave": 20 

            }, 

            { 

                "employee_id": 3, "employee_name": "Charlie", "email": "charlie@example.com", 
                "total_leaves_used": 10, "phone_number": "1122334455", "address": "789 Dreamland", 
                "designation_name": "Manager", "max_permitted_leave": 30 

            } 

        ] 

        self.assertCountEqual(data, expected_json) 


    def test_no_employees(self): 

        # Clear all Employee records 
        with app.app_context(): 
            Employee.query.delete() 
            db.session.commit()  

        response = self.client.get('/employee') 
        self.assertEqual(response.status_code, 404) 
        self.assertEqual(response.get_json(), {"message": "No employees found"}) 


 

class TestGetEmployeeCard(unittest.TestCase): 

    def setUp(self): 
        self.client = app.test_client() 
        with app.app_context(): 
            db.create_all() 

            db.session.add_all([ 

                Designation(designation_id=1, designation_name='Intern', max_permitted_leave=10), 
                Designation(designation_id=2, designation_name='HR', max_permitted_leave=20), 
                Designation(designation_id=3, designation_name='Manager', max_permitted_leave=30) 

            ]) 

            db.session.commit() 

            db.session.add_all([ 

                Employee(employee_id=1, employee_name='Alice', email='alice@example.com', total_leaves_used=5, phone_number='1234567890', address='123 Wonderland', designation_id=1), 
                Employee(employee_id=2, employee_name='Bob', email='bob@example.com', total_leaves_used=7, phone_number='0987654321', address='456 Neverland', designation_id=2), 
                Employee(employee_id=3, employee_name='Charlie', email='charlie@example.com', total_leaves_used=10, phone_number='1122334455', address='789 Dreamland', designation_id=3) 

            ]) 

            db.session.commit() 

 

    def tearDown(self): 

        with app.app_context(): 
            db.session.remove() 
            db.drop_all() 

 
    def test_employeecard_successful(self): 

        response = self.client.get('/getemployeecard/1') 
        self.assertEqual(response.status_code, 200) 
        data = response.get_json() 
        self.assertEqual(data, { 

            "employee_id": 1, 
            "employee_name": "Alice", 
            "email": "alice@example.com", 
            "total_leaves_used": 5, 
            "phone_number": "1234567890", 
            "address": "123 Wonderland", 
            "designation_name": "Intern" 

        }) 



    def test_get_employee_card_not_found(self): 

        response = self.client.get('/getemployeecard/88')
        self.assertEqual(response.status_code, 404) 
        self.assertEqual(response.get_json(), {"error": "Employee not found"}) 

 

 

class TestDeleteDesignation(unittest.TestCase): 

    def setUp(self): 
        self.client = app.test_client() 
        with app.app_context(): 
            db.create_all() 

            db.session.add_all([ 

                Designation(designation_id=1, designation_name='Intern', max_permitted_leave=10), 
                Designation(designation_id=2, designation_name='HR', max_permitted_leave=20), 
                Designation(designation_id=3, designation_name='Manager', max_permitted_leave=30) 

            ]) 

            db.session.commit() 

 

    def tearDown(self): 

        with app.app_context(): 
            db.session.remove() 
            db.drop_all() 

 

    def test_delete_designation_successful(self): 

        response = self.client.post('/deletedesignation/1') 
        self.assertEqual(response.status_code, 200) 
        self.assertEqual(response.get_json(), {"message": "Removed employee successfully"}) 


    def test_no_designation(self): 

        response = self.client.post('/deletedesignation/88') 
        self.assertEqual(response.status_code, 404) 
        self.assertEqual(response.get_json(), {'message':'Designation not found'}) 



class TestDeleteEmployee(unittest.TestCase): 

    def setUp(self): 
        self.client = app.test_client() 
        with app.app_context(): 
            db.create_all() 

            db.session.add_all([ 

                Designation(designation_id=1, designation_name='Intern', max_permitted_leave=10), 
                Designation(designation_id=2, designation_name='HR', max_permitted_leave=20), 
                Designation(designation_id=3, designation_name='Manager', max_permitted_leave=30) 

            ]) 

            db.session.commit() 

            db.session.add_all([ 

                Employee(employee_id=1, employee_name='Alice', email='alice@example.com', total_leaves_used=5, phone_number='1234567890', address='123 Wonderland', designation_id=1), 
                Employee(employee_id=2, employee_name='Bob', email='bob@example.com', total_leaves_used=7, phone_number='0987654321', address='456 Neverland', designation_id=2), 
                Employee(employee_id=3, employee_name='Charlie', email='charlie@example.com', total_leaves_used=10, phone_number='1122334455', address='789 Dreamland', designation_id=3) 

            ]) 

            db.session.commit() 

 
    def tearDown(self): 

        with app.app_context(): 
            db.session.remove() 
            db.drop_all() 

 

    def test_delete_employee_successful(self): 

        response = self.client.post('/deleteemployee/1') 
        self.assertEqual(response.status_code, 200) 
        self.assertEqual(response.get_json(), {"message": "Removed Employee successfully"}) 

 

    def test_delete_invalid_employee(self): 

        response = self.client.post('/deleteemployee/88') 
        self.assertEqual(response.status_code, 404) 
        self.assertEqual(response.get_json(), {"error": "Employee not found"}) 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

if __name__ == "__main__": 

    unittest.main() 

 



