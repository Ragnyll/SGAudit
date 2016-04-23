from rest_framework import serializers
from snippets.models import *


class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ('name', 'members')

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = ('name', 'is_competitor', 'default_email', 'on_teams')

class AliasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alias
        fields = ('email', 'service_name', 'username', 'from_Member')

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ('name', 'base_url', 'key')

class EndpointSerializer(serializers.ModelSerializer):
    class Meta:
        model = Endpoint
        fields = ('name', 'url', 'from_Service')
