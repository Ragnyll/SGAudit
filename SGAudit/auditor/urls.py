from django.conf.urls import url
from auditor import views

urlpatterns = [
    url(r'^teams/$', views.team_list),
    url(r'^teams/(?P<pk>[0-9]+)/$', views.team_detail),

    url(r'^members/$', views.member_list),
    url(r'^members/(?P<pk>[0-9]+)/$', views.member_detail),

    url(r'^aliases/$', views.alias_list),
    url(r'^aliases/(?P<pk>[0-9]+)/$', views.alias_detail),

    url(r'^services/$', views.service_list),
    url(r'^services/(?P<pk>[0-9]+)/$', views.service_detail),

    url(r'^endpoints/$', views.endpoints_list),
    url(r'^endpoints/(?P<pk>[0-9]+)/$', views.endpoint_detail),
]
