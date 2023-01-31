from django.db import models
from .code_generator import generate_code


class ShortUrl(models.Model):
    original_url = models.TextField(null=False)
    short_code = models.CharField(max_length=10, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        # check if code already exists in db, if so keep generating a code
        code_generated = ''
        while True:
            code_generated = generate_code()
            short_code_exist = ShortUrl.objects.filter(
                short_code=code_generated).exists()
            if not short_code_exist:
                break
        self.short_code = code_generated
        super(ShortUrl, self).save(*args, **kwargs)

    def __str__(self):
        return self.id
