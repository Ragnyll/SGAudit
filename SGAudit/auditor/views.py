from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from rest_framework import status
from auditor.models import *
from auditor.serializers import *

class JSONResponse(HttpResponse):
    """
    An HttpResponse that renders its content into JSON.
    """
    def __init__(self, data, **kwargs):
        content = JSONRenderer().render(data)
        kwargs['content_type'] = 'application/json'
        super(JSONResponse, self).__init__(content, **kwargs)

@api_view(['GET', 'POST'])
def team_list(request):
    if request.method == 'GET':
        teams = Team.objects.all()
        serializer = TeamSerializer(teams, many=True)
        return JSONResponse(serializer.data)

    elif request.method == 'POST':
        serializer = TeamSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
def team_detail(request, pk):
    # Retrieve a single team
    try:
        team = Team.objects.get(id=pk)
    except Team.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = TeamSerializer(team)
        return JSONResponse(serializer.data)

@csrf_exempt
def member_list(request):
    if request.method == 'GET':
        members = Member.objects.all()
        serializer = MemberSerializer(members, many=True)
        return JSONResponse(serializer.data)

@csrf_exempt
def member_detail(request, pk):
    # Retrieve a single member
    try:
        member = Member.objects.get(id=pk)
    except Member.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = MemberSerializer(member)
        return JSONResponse(serializer.data)


@csrf_exempt
def alias_list(request):
    if request.method == 'GET':
        aliases = Alias.objects.all()
        serializer = AliasSerializer(aliases, many=True)
        return JSONResponse(serializer.data)

@csrf_exempt
def alias_detail(request, pk):
    # Retrieve a single member
    try:
        alias = Alias.objects.get(id=pk)
    except Alias.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = AliasSerializer(alias)
        return JSONResponse(serializer.data)

@csrf_exempt
def service_list(request):
    if request.method == 'GET':
        services = Service.objects.all()
        serializer = ServiceSerializer(services, many=True)
        return JSONResponse(serializer.data)

@csrf_exempt
def service_detail(request, pk):
    # Retrieve a single member
    try:
        service = Service.objects.get(id=pk)
    except Service.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = ServiceSerializer(service)
        return JSONResponse(serializer.data)

@csrf_exempt
def endpoints_list(request):
    if request.method == 'GET':
        endpoints = Endpoint.objects.all()
        serializer = EndpointSerializer(endpoints, many=True)
        return JSONResponse(serializer.data)

@csrf_exempt
def endpoint_detail(request, pk):
    # Retrieve a single member
    try:
        endpoint = Endpoint.objects.get(id=pk)
    except Endpoint.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = EndpointSerializer(endpoint)
        return JSONResponse(serializer.data)
