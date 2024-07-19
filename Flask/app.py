import flask
from models import *
from flask import jsonify, session
from flask import request
from models import Designation, get_session, init_db
from flask_cors import CORS,cross_origin
from sqlalchemy import desc
import datetime as dt

app = flask.Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://postgres:password@localhost:5432/hrms"
app.config['SECRET_KEY'] = 'haritha' 
# db = SQLAlchemy(app)
CORS(app)
db.init_app(app)
now = dt.datetime.now(dt.timezone.utc).isoformat()

@app.route("/")
def home():
    return "Hello, world"

@app.route('/register', methods=['POST'])
@cross_origin()
def register():
    data = request.json

    if not data or not isinstance(data, dict):
        return jsonify({'message': 'Invalid input data format.'}), 400
    
    user_name = data.get('user_name')
    password = data.get('password')
    email = data.get('email')

    if not user_name or not password or not email:
        return jsonify({'message': 'All fields (user_name, password, email) are required.'}), 400
    user_exists = HR.query.filter_by(user_name=user_name).first()
    email_exists = HR.query.filter_by(email=email).first()
    if user_exists:
        return jsonify({'message': 'Username already exists. Please choose a different username.'}), 400
    if email_exists:
        return jsonify({'message': 'Email already registered. Please use a different email address.'}), 400

    
    new_user = HR(user_name=user_name, email=email)
    new_user.set_password(password)  
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'Registered successfully.'}), 201


# Login 
@app.route('/login', methods=['POST'])
def login(): 
    input = request.json 
    user_name = input.get('user_name')
    password = input.get('password') 
    user = HR.query.filter_by(user_name=user_name).first()
    if user and user.check_password(password): 
         session['user_id'] = user.user_id 
         session['user_name'] = user.user_name
         return jsonify({'message': 'Login successful.'}), 200
    else: 
        return jsonify({'message': 'Incorrect user_name or password. Please try again.'}), 401


    

# Login home page
@app.route('/loginhome', methods=['GET'])
def loginHome(): 
    if 'user_id' in session:
        return jsonify({'message': f'Welcome {session["user_name"]}! This is your Home page.'}), 200
    else: return jsonify({'message': 'Unauthorized access. Please log in first.'}), 401
    
# Logout   
@app.route('/logout', methods=['POST'])
def logout(): 
    session.clear() 
    return jsonify({'message': 'Logged out successfully.'}), 200


# Add designations
@app.route('/designation', methods=['POST'])
def insertDesignation():
  
    input=request.get_json()
    designation_name=input.get('designation_name')
    max_permitted_leave = input.get('max_permitted_leave')
    print(max_permitted_leave)
    new_designation=Designation(designation_name=designation_name, max_permitted_leave=  max_permitted_leave )
    db.session.add(new_designation)
    db.session.commit()
    return jsonify("Designation inserted")


# list of designations and permitted leave for each.
@app.route("/designations")
def listDesignation():
    designationList = db.select(Designation).order_by(Designation.designation_id).filter(Designation.deleted_at == None)
    designation = db.session.execute(designationList).scalars()
    result = []
    for item in designation:
      details = {"designation_id" : item.designation_id,
         "designation_name" : item.designation_name,
         "max_permitted_leave" : item.max_permitted_leave
         }
      result.append(details)
    return jsonify(result)


# Update designation 
@app.route('/updatedesignation/<int:designation_id>', methods=['PUT'])
def updateDesignation(designation_id):
    input = request.get_json()
    designation_name = input.get('designation_name')
    max_permitted_leave = input.get('max_permitted_leave')
    
    designation = Designation.query.get(designation_id)
    
    if designation is None:
        return jsonify({"error": "Designation not found"}), 404
    
    if designation_name is not None:
        designation.designation_name = designation_name
    if max_permitted_leave is not None:
        designation.max_permitted_leave = max_permitted_leave

    db.session.commit()
    return jsonify({"message": "Designation updated"}), 200


# Delete designation
@app.route('/deletedesignation/<int:designation_id>', methods=['POST'])
def deleteDesignation(designation_id):
    designation=Designation.query.get(designation_id)
    now = dt.datetime.now(dt.timezone.utc).isoformat()
    designation.deleted_at=now
    db.session.commit()
    return jsonify("Removed employee successfully")




# Add employee and their details.
@app.route("/addemployee",methods=['POST'])

def insertEmployee():
    input = request.get_json()
    print(input)
    
    if not input:
        return jsonify({"error": "Invalid input"}), 400
    
    
    
    employee_name = input.get('employee_name')
    email = input.get('email')
    total_leaves_used = input.get('total_leaves_used')
    phone_number = input.get('phone_number')
    address = input.get('address')
    designation_name = input.get('designation_name')
    # print(designation_name)
    # breakpoint()
    designation = db.session.query(Designation).filter_by(designation_name = designation_name).first()   
    # designation= Designation.query.filter_by(designation_name=designation_name).first()
    
    
    print(designation)
    designation_id =designation.designation_id
    max_permitted_leave = designation.max_permitted_leave

    #  # Validate `total_leaves_used`
    # if not isinstance(total_leaves_used, int) or total_leaves_used < 0:
    #     return jsonify({"error": "Invalid total leaves used"}), 400

    if int(total_leaves_used) > max_permitted_leave:
        return jsonify({"message": "Total leaves used cannot exceed max permitted leaves"}), 400

    employee = Employee(
        employee_name=employee_name,
        email=email,
        total_leaves_used=total_leaves_used, 
        phone_number=phone_number,
        address=address,
        designation_id=designation_id)
    db.session.add(employee)
    db.session.commit()  

    return jsonify({'message':"Employee added successfully"})


# List employee and their details
@app.route("/employee")
def listEmployee():
    employeeList = (
        db.session.query(
            Employee.employee_id,
            Employee.employee_name,
            Employee.email,
            Employee.total_leaves_used,
            Employee.phone_number,
            Employee.address,
            Designation.designation_name,
            Designation.max_permitted_leave
        ).filter(Employee.deleted_at == None)
        .join(Designation, Employee.designation_id == Designation.designation_id) 
    )
    employee = db.session.execute(employeeList).fetchall()
    ret = []
    for item in employee:
        details = {
            "employee_id": item.employee_id,
            "employee_name": item.employee_name,
            "email": item.email,
            "total_leaves_used": item.total_leaves_used ,
            "phone_number": item.phone_number,
            "address": item.address,
            "designation_name": item.designation_name,
            "max_permitted_leave" : item.max_permitted_leave,
        }
        ret.append(details)
    
    return jsonify(ret)



# Update employee detalis
@app.route("/updateemployee/<int:employee_id>", methods=['PUT'])
def updateEmployee(employee_id):
    input = request.get_json()
    employee = db.session.query(Employee).filter_by(employee_id=employee_id).first()

    employee_name = input.get('employee_name')
    email = input.get('email')
    total_leaves_used = input.get('total_leaves_used')
    phone_number = input.get('phone_number')
    address = input.get('address')
    designation_name = input.get('designation_name')
    print(input)
    # breakpoint()
    # if employee_name:
    #     existing_employee = db.session.query(Employee).filter_by(employee_name=employee_name).first()
    #     if existing_employee and existing_employee.employee_id != employee_id:
    #         return jsonify({"error": "An employee with this name already exists"}), 400
    employee.employee_name = employee_name
    
    # if email:
    #     if db.session.query(Employee).filter_by(email=email).first():
    #         return jsonify({"error": "An employee with this email already exists"}), 400
    employee.email = email
    
    if total_leaves_used is not None:
        employee.total_leaves_used = total_leaves_used
    # max_permitted_leave = designation.max_permitted_leave
    
    # Validate total_leaves_used
    # if employee.total_leaves_used > max_permitted_leave:
    #     return jsonify({"error": "Total leaves used cannot exceed max permitted leaves"}), 400
    
    if phone_number:
        employee.phone_number = phone_number
    
    if address:
        employee.address = address
    
    # if designation_name:
    designation = db.session.query(Designation).filter_by(designation_name=designation_name).first()
    #     if not designation:
    #         return jsonify({"error": "Designation does not exist"}), 404
    employee.designation_id = designation.designation_id
    
    
    db.session.commit()
    return jsonify({'message': "Employee updated successfully"}), 200






# Delete employee
@app.route('/deleteemployee/<int:employee_id>', methods=['POST'])
def deleteEmployee(employee_id):
    employee=Employee.query.get(employee_id)
    now = dt.datetime.now(dt.timezone.utc).isoformat()
    employee.deleted_at=now
    db.session.commit()
    return jsonify("Removed employee successfully")




# Employee card details
@app.route('/getemployeecard/<int:employee_id>', methods=['GET'])
def getEmployeeCard(employee_id):
    employee = (
        db.session.query(
            Employee.employee_id,
            Employee.employee_name,
            Employee.email,
            Employee.total_leaves_used,
            Employee.phone_number,
            Employee.address,
            Designation.designation_name 
        )
        .join(Designation, Employee.designation_id == Designation.designation_id)
        .filter(Employee.employee_id == employee_id).first() 
    )
    if not employee:
        return jsonify({"error": "Employee not found"}), 404
   
    details = {
            "employee_id": employee.employee_id,
            "employee_name": employee.employee_name,
            "email": employee.email,
            "total_leaves_used": employee.total_leaves_used,
            "phone_number": employee.phone_number,
            "address": employee.address,
            "designation_name": employee.designation_name
        }
        
    
    return jsonify(details)


with app.app_context():
    db.create_all()
if __name__ == '__main__':
    init_db()
    app.run(port=5000)


