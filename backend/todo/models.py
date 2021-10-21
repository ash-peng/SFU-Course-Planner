from django.db import models

# Create your models here.
class Todo(models.Model):
    number = models.CharField(max_length=10)
    title = models.CharField(max_length=100, blank=True, null=True)
    prerequisites = models.TextField(blank=True, null=True)
    units = models.IntegerField(blank=True, null=True)
    completed = models.BooleanField(default=False)
    grade = models.CharField(max_length=10, blank=True, null=True)

    def _str_(self):
        return self.number + ' ' + self.title