from django.conf.urls import url
from auditor import views

urlpatterns = [
    url(r'^teams/$', views.team_list),
     url(r'^teams/(?P<pk>[0-9]+)/$', views.team_detail),
]
