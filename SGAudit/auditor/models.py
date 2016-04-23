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
