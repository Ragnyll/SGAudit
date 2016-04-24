from django.conf.urls import url
from auditor import views

urlpatterns = [
    url(r'^teams/$', views.team_list),
    url(r'^members/$', views.member_list),
    url(r'^aliases/$', views.alias_list),
]
