from django.db import models

class Team(models.Model):
    name = models.CharField(max_length=32, default="")
    members = models.ManyToManyField('Member')
    
    def __str__(self):
        return str(self.name)

class Member(models.Model):
    name = models.CharField(max_length=32, default="")
    # default is_competitor to True to prevent access off the bat
    is_competitor = models.BooleanField(default=True)
    default_email = models.CharField(max_length=64, default="")
    on_teams = models.ManyToManyField('Team')

    def __str__(self):
        return str(self.name)

class Alias(models.Model):
    email = models.CharField(max_length=64, default="")
    # used for when a Member's have a bunch of different credentials for a bunch of different services
    service_name = models.CharField(max_length=64, default="")
    username = models.CharField(max_length=64, default="")
    from_Member = models.ForeignKey('Member', on_delete=models.CASCADE)

    def __str__(self):
        return str(self.username)


class Service(models.Model):
    name = models.CharField(max_length=64, default="")
    base_url = models.CharField(max_length=128, default="")
    key = models.CharField(max_length=128, default="")

    def __str__(self):
        return(self.name)

class endpoint(models.Model):
    name = models.CharField(max_length=64, default="")
    url = models.CharField(max_length=128, default="")
    from_Service = models.ForeignKey('Service', on_delete=models.CASCADE)

    def __str__(self):
        return(self.name)
