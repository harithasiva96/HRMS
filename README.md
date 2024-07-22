# HRMS
- Login credentials: username: HR@innovations, password: password@innov
- To register a new HR , use Thunderclient and its endpoint is: http://127.0.0.1:5000/register
    example: {"user_name":"HR@innovations","password":"password@innov","email": "hr@innovations.com"}
- Activate Flask virtual envirinment: `. .venv/bin/activate`
- Run Flask : `flask --app app run --debug`
- `requirement.txt` is attached to install required packages for flask
- Run React code : `npm run dev`
- Create a database for processing testcases
- Setup the database in app.py of flask.
- To run testcases: `python3 test_hrms.py`
- Coverage report: `pip install coverage`

                   `python3 -m coverage run -m unittest test_hrms.py`

                   `python3 -m coverage report`

                   `python3 -m coverage html`  
