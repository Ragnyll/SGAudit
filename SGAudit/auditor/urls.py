from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from auditor import views

urlpatterns = [

        url(r'^teams/$', views.team_list.as_view()),
        url(r'^teams/(?P<pk>[0-9]+)/$', views.team_detail.as_view()),

        url(r'^members/$', views.member_list.as_view()),
        url(r'^members/(?P<pk>[0-9]+)/$', views.member_detail.as_view()),

        url(r'^aliases/$', views.alias_list.as_view()),
        url(r'^aliases/(?P<pk>[0-9]+)/$', views.alias_detail.as_view()),

        url(r'^services/$', views.service_list.as_view()),
        url(r'^services/(?P<pk>[0-9]+)/$', views.service_detail.as_view()),

        url(r'^endpoints/$', views.endpoints_list.as_view()),
        url(r'^endpoints/(?P<pk>[0-9]+)/$', views.endpoint_detail.as_view()),

        url(r'^meetings/$', views.meetings_list.as_view()),
        url(r'^meetings/(?P<pk>[0-9]+)/$', views.meeting_detail.as_view()),

]

urlpatterns = format_suffix_patterns(urlpatterns)
