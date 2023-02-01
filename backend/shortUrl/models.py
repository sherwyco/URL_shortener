from django.db import models
from .utils import generate_code
from django.core.validators import URLValidator
from django.core.exceptions import ValidationError


def validate_url(url):
    validator = URLValidator()
    try:
        validator(url)
    except ValidationError as exception:
        raise exception


class ShortUrl(models.Model):
    original_url = models.TextField(null=False, validators=[validate_url])
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

    class Meta:
        ordering = ['-id']

    def __str__(self):
        return self.id
