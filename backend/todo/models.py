from django.db import models

# Create your models here.

class Todo(models.Model):
    name = models.CharField(max_length=100, blank=False, null=False)
    checked = models.BooleanField(default=False) # 作成したtodoが完了したかどうか

    def __str__(self):
        return self.name