from django.db import models

class Team(models.Model):
    name = models.CharField(max_length=32, default="")

    def __str__(self):
        return str(self.name)

class Member(models.Model):
    name = models.CharField(max_length=32, default="")
    # default is_competitor to True to prevent access off the bat
    is_competitor = models.BooleanField(default=True)
    default_email = models.CharField(max_length=64, default="")

    def __str__(self):
        return str(self.name)

class Alias(models.Model):
    email = CharField(max_length=64, default="")
    # used for when a Member's have a bunch of different credentials for a bunch of different services
    service_name = CharField(max_length=64, default="")
    username = CharField(max_length=64, default="")

    def __str__(self):
        return str(self.username)
