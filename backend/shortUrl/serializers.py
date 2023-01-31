from rest_framework import serializers
from .models import ShortUrl


# create class to serializer model
class ShortUrlSerializer(serializers.ModelSerializer):

    class Meta:
        model = ShortUrl
        fields = ('id', 'original_url', 'short_code', 'created_at')
