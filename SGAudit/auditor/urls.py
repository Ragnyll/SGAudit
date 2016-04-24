from django.conf.urls import url
from auditor import views

urlpatterns = [
    url(r'^teams/$', views.team_list),
]
