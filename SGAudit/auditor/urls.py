from django.conf.urls import url
from snippets import views

urlpatterns = [
    url(r'^teams/$', views.team_list),
]
