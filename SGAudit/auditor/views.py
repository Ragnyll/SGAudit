from auditor.models import *
from auditor.serializers import *
from django.contrib.auth.models import User, Group
from rest_framework import generics, permissions, routers, serializers, viewsets
from oauth2_provider.ext.rest_framework import TokenHasReadWriteScope, TokenHasScope


class team_list(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

class team_detail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

class member_list(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]
    queryset = Member.objects.all()
    serializer_class = MemberSerializer

class member_detail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]
    queryset = Member.objects.all()
    serializer_class = MemberSerializer

class alias_list(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]
    queryset = Alias.objects.all()
    serializer_class = AliasSerializer

class alias_detail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]
    queryset = Alias.objects.all()
    serializer_class = AliasSerializer

class service_list(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

class service_detail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

class endpoints_list(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]
    queryset = Endpoint.objects.all()
    serializer_class = EndpointSerializer

class endpoint_detail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]
    queryset = Endpoint.objects.all()
    serializer_class = EndpointSerializer

class meetings_list(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]
    queryset = Meeting.objects.all()
    serializer_class = MeetingSerializer

class meeting_detail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]
    queryset = Meeting.objects.all()
    serializer_class = MeetingSerializer
