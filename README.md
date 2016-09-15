# SGAudit
The program to audit the participation of SIG-Game members in its various services

SGAudit is a three part applicaton.
  The first is the SIG-Game api, known as SGAudit which maintains a db of all members and information.
  The second is SG-Attend, which keeps track of members attendance.
  The third part is SG-Auditor, which audits members access to SIG-Game services

## Run Instructions ##
This Django application runs of Python 2.7.
```
  pip install -r requirements.txt
```

### Running the Django Server and the Authorizing Applications ###
After the requirements have been installed, from SGAudit/ run
`python manage.py createsuperuser` and create an admin account. Then run:
`python manage.py runserver`.

Assuming this application is being run off localhost go to the following
address (otherwise just change localhost with whatever domain it is being run
off of):

`http://localhost:8000/o/applications` is where you will register client
applications that utilize this api.

Here you will be prompted for your username and password. Use the
credentials when you ran createsuperuser earlier and use the following data
entries:
```
  Name: The name of the application that will use this api
  Client Type: confidential
  Authorization Grant Type: Resource owner password based.
  Save
```
Record the client_id and client_secret in some external notepad, you will need
those in the next step.

Next you're gonna want an auth token for the client application. In order to get
that run the below curl command and replace <user_name> , <password>, client_id,
an client_secret with the corresponding credentials (you should have received
client_id and client_secret in the previous step):
```
  curl -X POST -d "grant_type=password&username=<user_name>&password=<password>" -u"<client_id>:<client_secret>" http://localhost:8000/o/token/ > token.txt
```
This curl command will output your application token to token.txt. Whenever a
client application makes requests to the api the auth token should be in the
request header.

Cool. The Djano Rest API is now fully running and secure.

#### The API docs ####
The docs have a nice little tool accessible at http://localhost:8000/docs .a
Once again localhost is only relevant if you are using localhost.
is a nice explanation of the database relations and the what is needed for
every api call. There is also a little tool inside it to run test api calls.
You will need the key granted by your token to run these though.

If you want to turn off the api docs go into `SGAudit/settings.py` and set
```
REST_FRAMEWORK_DOCS = {
    'HIDE_DOCS': False
}
```
to `True`. The only reason I could see why hiding the docs would be useful is if
you are paranoid about someone knowing your database structure. They can't
really run tests to get data back without an oauth token anyway.

### References ####
If you need to look at any of the resources and documentation for this that I
did check out the below links:

[Django Rest Framework](http://www.django-rest-framework.org/api-guide/generic-views/)
: This is probably the single most useful page of the DRF docs. The rest is
a painful read, that while useful, will probably give you Headaches.

[Oauth2](http://django-oauth-toolkit.readthedocs.io/en/latest/rest-framework/rest-framework.html)
: This is the simplest Oauth2 tutorial/explanation that I found. It's also super
specific to DRF, which makes it super useful.

[DRFDocs](http://drfdocs.com/)
: Thank goodness, this is the simplest package documentation site that I have
ever used. It's really easy, doesn't take much to set up, and looks hella nice.
It may be nice to reference if you feel like changing `/docs` styles and layout.


## Attendance ##
  ```
    python -m SimpleHTTPServer 8001
  ```
It is important that the server runs off port 8001, as the CORS headers
will only allow requests from localhost:8001.

The port that SGAudit accepts reqeust from can be changed in ```settings.py```

## Auditor ##
Has yet to be started
