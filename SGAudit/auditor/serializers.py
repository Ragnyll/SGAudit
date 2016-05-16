from rest_framework import serializers
from auditor.models import *


class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ('id', 'name', 'members','services_used')

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = ('id', 'name', 'is_competitor', 'default_email', 'on_teams', 'services_used')

class AliasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alias
        fields = ('id', 'email', 'service_name', 'username', 'from_Member')

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ('id', 'name', 'base_url', 'key')

class EndpointSerializer(serializers.ModelSerializer):
    class Meta:
        model = Endpoint
        fields = ('id', 'name', 'url', 'from_Service')

class MeetingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meeting
        fields = ('id', 'date','duration', 'members_attending')
