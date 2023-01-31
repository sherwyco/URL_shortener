from django.db import models


class ShortUrl(models.Model):
    original_url = models.TextField(null=False)
    short_code = models.CharField(max_length=10, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.id
