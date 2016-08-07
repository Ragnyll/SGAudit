# SGAudit
The program to audit the participation of siggame members in its various services

SGAudit is a three part applicaton.
  The first is the SIG-Game api, which will list all the information SIG-Game needs.
  The second is SG-Attend, which keeps track of members attendance.
  The third part is SG-Auditor, which audits members access to SIG-Game services

## Run Instructions ##
```pip install -r requirements.txt```
Go to SGAudit and
  ```python manage.py runserver```

## attendance ##
```python -m SimpleHTTPServer 8001```
