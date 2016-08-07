# SGAudit
The program to audit the participation of siggame members in its various services

SGAudit is a three part applicaton.
  The first is the SIG-Game api, known as SGAudit which maintains a db of all members and information. 
  The second is SG-Attend, which keeps track of members attendance.
  The third part is SG-Auditor, which audits members access to SIG-Game services

## Run Instructions ##
```pip install -r requirements.txt```

Go to SGAudit and
  ```python manage.py runserver```
  Attendance and Audit require this to be up and running.
## Attendance ##
  ```python -m SimpleHTTPServer 8001```
  It is important that the server runs off port 8001, as the CORS headers will only allow requests from localhost:8001.
  
  The port that SGAudit accepts reqeust from can be changed in ```settings.py```
  
## Auditor ##
Has yet to be started
